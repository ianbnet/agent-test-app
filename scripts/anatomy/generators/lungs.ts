/**
 * Lungs are absent from BodyParts3D (only the bronchial tree and pulmonary vessels exist),
 * so we reconstruct them the way they form in the body: by filling the pleural cavities.
 * The thoracic wall (ribs, costal cartilages, intercostal muscles, sternum, vertebrae, diaphragm)
 * is voxelized, the mediastinal organs are carved out, and each cavity voxel is assigned to the
 * lobe whose segmental bronchus is nearest - which reproduces the fissures anatomically.
 */
import { bounds, mergeMeshes, samplePoints, taubinSmooth, type Mesh, type Vec3 } from "../lib/mesh";
import { KdTree } from "../lib/kdtree";
import {
  Grid,
  blurField,
  distanceToSet,
  floodExterior,
  close,
  labelComponents,
  maskToMeshSdf,
  opening,
  rasterizeSurface,
} from "../lib/voxel";
import { generatedStructure, query, queryMesh } from "./context";
import type { BuiltStructure } from "../export";

const LOBES = [
  { name: "superior lobe of lung", side: "right" as const, re: /right (apical|posterior|anterior) segmental bronchial tree/i },
  { name: "middle lobe of lung", side: "right" as const, re: /^(lateral|medial) segmental bronchial tree/i },
  { name: "inferior lobe of lung", side: "right" as const, re: /right (superior|medial basal|anterior basal|lateral basal|posterior basal) segmental bronchial tree/i },
  { name: "superior lobe of lung", side: "left" as const, re: /left (apical|posterior|anterior) segmental bronchial tree|lingular bronchial tree/i },
  { name: "inferior lobe of lung", side: "left" as const, re: /left (superior|medial basal|anterior basal|lateral basal|posterior basal) segmental bronchial tree/i },
];

export function generateLungs(): BuiltStructure[] {
  const t0 = Date.now();
  const wall = mergeMeshes([
    queryMesh(/\b(first|second|third|fourth|fifth|sixth|seventh|eighth|ninth|tenth|eleventh|twelfth) rib$/i),
    queryMesh(/costal cartilage$/i),
    queryMesh(/^(manubrium|body of sternum|xiphoid process)$/i),
    queryMesh(/thoracic vertebra$/i),
    queryMesh(/intervertebral disk of .*thoracic vertebra$|^intervertebral disk$/i),
    queryMesh(/intercostal muscle$/i),
    queryMesh(/^diaphragm$/i),
    queryMesh(/transversus thoracis$/i),
  ]);
  const mediastinum = mergeMeshes([
    queryMesh(/^(wall of (left |right )?(ventricle|atrium)|cavity of .*(ventricle|atrium))$/i),
    queryMesh(/^(ascending aorta|arch of aorta|descending thoracic aorta|pulmonary trunk|superior vena cava|brachiocephalic artery)$/i),
    queryMesh(/^(left|right) pulmonary artery$/i),
    queryMesh(/^(esophagus|trachea)$/i),
    queryMesh(/^(left main bronchus|right main bronchus proper)$/i),
    queryMesh(/lobe of thymus$/i),
    queryMesh(/brachiocephalic vein$|^azygos vein$/i),
    queryMesh(/inferior vena cava$/i),
  ]);

  const ribs = bounds(queryMesh(/\b(first|twelfth|seventh) rib$/i));
  const firstRib = bounds(queryMesh(/\bfirst rib$/i));
  const spacing = 0.002;
  const grid = Grid.fromBounds(
    [ribs.min[0] - 0.01, ribs.min[1] - 0.04, ribs.min[2] - 0.02],
    [ribs.max[0] + 0.01, firstRib.max[1] + 0.05, ribs.max[2] + 0.02],
    spacing,
    3,
  );
  const walls = rasterizeSurface(grid, wall);
  const med = rasterizeSurface(grid, mediastinum);
  // Carve the mediastinum generously (pleura + mediastinal fat) and keep a midline septum.
  const medDist = distanceToSet(grid, med);
  const capY = firstRib.max[1] + 0.022;
  // Close the thoracic inlet: above the first ribs, only the column inside the first-rib ring stays open.
  const ring = convexHull2D(
    [
      ...pointsXZ(queryMesh(/\bfirst rib$/i)),
      ...pointsXZ(queryMesh(/^(manubrium|first thoracic vertebra)$/i)),
    ],
  );
  // Above the first-rib plane the pleural cupula is a dome (~3 cm high) over each half of the ring.
  const plane = fitHeightPlane(queryMesh(/\bfirst rib$/i)); // y = a + b*z along the sloping inlet
  const cupula = (["left", "right"] as const).map((side) => {
    const half = ring.filter(([x]) => (side === "left" ? x > 0 : x < 0));
    const xs = half.map((p) => p[0]);
    const zs = half.map((p) => p[1]);
    return {
      cx: (Math.min(...xs) + Math.max(...xs)) / 2,
      cz: (Math.min(...zs) + Math.max(...zs)) / 2,
      rx: (Math.max(...xs) - Math.min(...xs)) / 2 + 0.004,
      rz: (Math.max(...zs) - Math.min(...zs)) / 2 + 0.002,
    };
  });
  const blocked = new Uint8Array(grid.size);
  for (let k = 0; k < grid.nz; k++)
    for (let j = 0; j < grid.ny; j++)
      for (let i = 0; i < grid.nx; i++) {
        const id = grid.index(i, j, k);
        const [x, y, z] = grid.pos(i, j, k);
        let outsideInlet = false;
        const h = y - (plane.a + plane.b * z);
        if (h > 0) {
          const c = cupula[x > 0 ? 0 : 1];
          const e = ((x - c.cx) / c.rx) ** 2 + (h / 0.03) ** 2 + ((z - c.cz) / c.rz) ** 2;
          outsideInlet = e > 1 || !insideHull(ring, x, z, -0.003);
        }
        if (walls[id] || medDist[id] < 0.004 || Math.abs(x) < 0.006 || y > capY || outsideInlet) blocked[id] = 1;
      }
  // Close small gaps in the wall so the outside flood cannot leak into the pleural cavities.
  const R = 0.009;
  const dBlocked = distanceToSet(grid, blocked);
  const thick = new Uint8Array(grid.size);
  for (let i = 0; i < thick.length; i++) thick[i] = dBlocked[i] <= R ? 1 : 0;
  const ext = floodExterior(grid, thick);
  const core = new Uint8Array(grid.size);
  for (let i = 0; i < core.length; i++) core[i] = !ext[i] && !thick[i] ? 1 : 0;
  // Keep the two big cavities (left/right), then grow them back out to the wall.
  const { labels, sizes } = labelComponents(grid, core);
  const order = sizes.map((s, i) => [s, i]).sort((a, b) => b[0] - a[0]);
  const keep = new Set(order.slice(0, 2).map((o) => o[1]));
  const seeds = new Uint8Array(grid.size);
  for (let i = 0; i < seeds.length; i++) seeds[i] = labels[i] >= 0 && keep.has(labels[i]) ? 1 : 0;
  const dSeed = distanceToSet(grid, seeds);
  const lung = new Uint8Array(grid.size);
  for (let i = 0; i < lung.length; i++) lung[i] = dSeed[i] <= R + spacing && !blocked[i] ? 1 : 0;

  // Label voxels by the nearest segmental bronchus.
  const pts: number[] = [];
  const lab: number[] = [];
  LOBES.forEach((lobe, li) => {
    for (const { mesh } of query(lobe.re)) {
      const s = samplePoints(mesh, Math.max(20, Math.round(mesh.indices.length / 6)), li + 7);
      for (let i = 0; i < s.length; i += 3) {
        pts.push(s[i], s[i + 1], s[i + 2]);
        lab.push(li);
      }
    }
  });
  const tree = new KdTree(Float32Array.from(pts));
  const lobeOf = new Int8Array(grid.size).fill(-1);
  for (let k = 0; k < grid.nz; k++)
    for (let j = 0; j < grid.ny; j++)
      for (let i = 0; i < grid.nx; i++) {
        const id = grid.index(i, j, k);
        if (!lung[id]) continue;
        const [x, y, z] = grid.pos(i, j, k);
        // restrict to the correct side of the body
        const candidates = x < 0 ? [0, 1, 2] : [3, 4];
        let best = tree.nearest(x, y, z);
        if (!candidates.includes(lab[best])) {
          // fall back: nearest among the correct side (slow path, rare)
          let bd = Infinity;
          for (let p = 0; p < lab.length; p++) {
            if (!candidates.includes(lab[p])) continue;
            const d = (pts[p * 3] - x) ** 2 + (pts[p * 3 + 1] - y) ** 2 + (pts[p * 3 + 2] - z) ** 2;
            if (d < bd) {
              bd = d;
              best = p;
            }
          }
        }
        lobeOf[id] = lab[best];
      }

  // Smooth the lobe partition: re-assign each voxel to the lobe with the largest blurred indicator,
  // turning the jagged Voronoi boundaries into smooth fissure surfaces.
  const lungSmooth = opening(grid, close(grid, lung, 0.014), 0.004);
  const blurred = LOBES.map((_, li) => {
    const f = new Float32Array(grid.size);
    for (let i = 0; i < f.length; i++) f[i] = lobeOf[i] === li ? 1 : 0;
    return blurField(grid, f, 5, 3);
  });
  for (let id = 0; id < grid.size; id++) {
    if (!lungSmooth[id]) {
      lobeOf[id] = -1;
      continue;
    }
    const [x] = grid.pos(id % grid.nx, 0, 0);
    const candidates = x < 0 ? [0, 1, 2] : [3, 4];
    let best = candidates[0];
    for (const c of candidates) if (blurred[c][id] > blurred[best][id]) best = c;
    lobeOf[id] = best;
  }

  const out: BuiltStructure[] = [];
  LOBES.forEach((lobe, li) => {
    const mask = new Uint8Array(grid.size);
    for (let k = 1; k < grid.nz - 1; k++)
      for (let j = 1; j < grid.ny - 1; j++)
        for (let i = 1; i < grid.nx - 1; i++) {
          const id = grid.index(i, j, k);
          if (lobeOf[id] !== li) continue;
          // leave a one-voxel fissure between neighbouring lobes
          const nb = [id - 1, id + 1, id - grid.nx, id + grid.nx, id - grid.nx * grid.ny, id + grid.nx * grid.ny];
          if (nb.some((n) => lobeOf[n] >= 0 && lobeOf[n] !== li && n < id)) continue;
          mask[id] = 1;
        }
    let mesh: Mesh = maskToMeshSdf(grid, mask, 3, 2);
    mesh = taubinSmooth(mesh, 15);
    out.push(
      generatedStructure(lobe.name, mesh, {
        side: lobe.side,
        system: "respiratory",
        group: "lung",
        layer: 3,
        generator: "lungs",
      }),
    );
  });
  console.log(`  lungs: ${out.length} lobes in ${((Date.now() - t0) / 1000).toFixed(1)}s`);
  return out;
}

export function lungBounds(lobes: BuiltStructure[]): { min: Vec3; max: Vec3 } {
  return bounds(mergeMeshes(lobes.map((l) => l.mesh)));
}

function pointsXZ(m: Mesh): [number, number][] {
  const out: [number, number][] = [];
  for (let i = 0; i < m.positions.length; i += 3) out.push([m.positions[i], m.positions[i + 2]]);
  return out;
}

/** Monotone-chain convex hull (counter-clockwise). */
function convexHull2D(points: [number, number][]): [number, number][] {
  const p = points.slice().sort((a, b) => a[0] - b[0] || a[1] - b[1]);
  const cross = (o: number[], a: number[], b: number[]) => (a[0] - o[0]) * (b[1] - o[1]) - (a[1] - o[1]) * (b[0] - o[0]);
  const lower: [number, number][] = [];
  for (const q of p) {
    while (lower.length >= 2 && cross(lower[lower.length - 2], lower[lower.length - 1], q) <= 0) lower.pop();
    lower.push(q);
  }
  const upper: [number, number][] = [];
  for (let i = p.length - 1; i >= 0; i--) {
    const q = p[i];
    while (upper.length >= 2 && cross(upper[upper.length - 2], upper[upper.length - 1], q) <= 0) upper.pop();
    upper.push(q);
  }
  return lower.slice(0, -1).concat(upper.slice(0, -1));
}

/** Point-in-convex-polygon with a signed margin (negative shrinks the hull). */
function insideHull(hull: [number, number][], x: number, z: number, margin = 0): boolean {
  for (let i = 0; i < hull.length; i++) {
    const a = hull[i];
    const b = hull[(i + 1) % hull.length];
    const ex = b[0] - a[0];
    const ez = b[1] - a[1];
    const len = Math.hypot(ex, ez) || 1;
    // for CCW hulls the interior is on the left: cross >= 0
    const c = (ex * (z - a[1]) - ez * (x - a[0])) / len;
    if (c < -margin) return false;
  }
  return true;
}

/** Least-squares plane y = a + b*z through a mesh's vertices. */
function fitHeightPlane(m: Mesh): { a: number; b: number } {
  let n = 0;
  let sz = 0;
  let sy = 0;
  let szz = 0;
  let szy = 0;
  for (let i = 0; i < m.positions.length; i += 3) {
    const y = m.positions[i + 1];
    const z = m.positions[i + 2];
    n++;
    sz += z;
    sy += y;
    szz += z * z;
    szy += z * y;
  }
  const b = (n * szy - sz * sy) / (n * szz - sz * sz);
  return { a: (sy - b * sz) / n, b };
}
