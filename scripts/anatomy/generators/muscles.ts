/**
 * Muscles missing from BodyParts3D, reconstructed as sheets under the skin of their
 * anatomical territory. Also splits the rectus abdominis out of the external oblique sheet
 * (BodyParts3D models it as part of that muscle's aponeurosis).
 */
import {
  bounds,
  compact,
  computeNormals,
  connectedComponents,
  subdivide,
  surfaceArea as surfaceAreaOf,
  taubinSmooth,
  vertexNeighbors,
  weld,
  type Mesh,
  type Vec3,
} from "../lib/mesh";
import { KdTree } from "../lib/kdtree";
import { extreme } from "../lib/tube";
import { generatedStructure, queryMesh } from "./context";
import type { BuiltStructure } from "../export";
import type { Side } from "../../../shared/anatomy";

type Sgn = 1 | -1;
const sideWord = (s: Sgn): Side => (s > 0 ? "left" : "right");

/** Split the rectus abdominis region out of each BodyParts3D external oblique sheet. */
export function splitRectus(built: BuiltStructure[]): BuiltStructure[] {
  const out: BuiltStructure[] = [];
  const pubis = bounds(queryMesh(/hip bone$/i));
  const xiph = bounds(queryMesh(/^xiphoid process$/i));
  const yLow = pubis.max[1] - 0.12; // ~pubic crest
  const yTop = xiph.max[1] + 0.03;
  const border = (y: number) => {
    const t = Math.max(0, Math.min(1, (y - yLow) / (yTop - yLow)));
    return 0.032 + t * 0.042; // linea semilunaris: ~3 cm from midline at the pubis, ~7.5 cm at the costal margin
  };
  for (const b of built) {
    if (b.spec.concept !== "external-oblique") continue;
    const m = b.mesh;
    const zMid = (bounds(m).min[2] + bounds(m).max[2]) / 2;
    const keep: number[] = [];
    const rect: number[] = [];
    for (let t = 0; t < m.indices.length; t += 3) {
      let cx = 0;
      let cy = 0;
      let cz = 0;
      for (let k = 0; k < 3; k++) {
        const o = m.indices[t + k] * 3;
        cx += m.positions[o] / 3;
        cy += m.positions[o + 1] / 3;
        cz += m.positions[o + 2] / 3;
      }
      const inRect = Math.abs(cx) < border(cy) && cz > zMid && cy > yLow - 0.02 && cy < yTop;
      (inRect ? rect : keep).push(m.indices[t], m.indices[t + 1], m.indices[t + 2]);
    }
    b.mesh = compact({ positions: m.positions, indices: Uint32Array.from(keep) });
    out.push(
      generatedStructure("rectus abdominis", compact({ positions: m.positions, indices: Uint32Array.from(rect) }), {
        side: b.spec.side,
        system: "muscular",
        group: "muscle",
        layer: 1,
        generator: "split-external-oblique",
      }),
    );
  }
  return out;
}

/**
 * A muscle sheet lying under the skin: the outer skin surface inside `region` is offset
 * inward by the subcutaneous thickness, and a second, deeper copy (tapering to zero at the
 * sheet's border) closes it into a solid.
 */
function skinSheet(
  skin: Mesh,
  opts: {
    name: string;
    side: Sgn;
    region: (p: Vec3) => boolean;
    outward: (p: Vec3) => Vec3;
    fat: number;
    thickness: number;
    taper: number;
    /** Tissue the sheet must not sink into (e.g. the skull under the temporalis). */
    floor?: Mesh;
  },
): BuiltStructure | null {
  const nrm = computeNormals(skin);
  const P = skin.positions;
  const tris: number[] = [];
  for (let t = 0; t < skin.indices.length; t += 3) {
    let ok = true;
    for (let k = 0; k < 3 && ok; k++) {
      const v = skin.indices[t + k];
      const p: Vec3 = [P[v * 3], P[v * 3 + 1], P[v * 3 + 2]];
      const o = opts.outward(p);
      const ol = Math.hypot(o[0], o[1], o[2]) || 1;
      if (!opts.region(p) || (nrm[v * 3] * o[0] + nrm[v * 3 + 1] * o[1] + nrm[v * 3 + 2] * o[2]) / ol < 0.15) ok = false;
    }
    if (ok) tris.push(skin.indices[t], skin.indices[t + 1], skin.indices[t + 2]);
  }
  if (tris.length < 30) return null;
  // largest connected patch only
  const comps = connectedComponents(weld(compact({ positions: P, indices: Uint32Array.from(tris) }), 1e-6)).sort(
    (a, b) => b.indices.length - a.indices.length,
  );
  if (process.env.ANATOMY_DEBUG) console.log("   sheet", opts.name, tris.length / 3, comps.slice(0, 5).map((c) => c.indices.length / 3));
  // refine the (coarse) skin patch so the offset sheet is smooth
  let patch = comps[0];
  const edge = Math.sqrt((2 * Math.max(1e-9, surfaceAreaOf(patch))) / (patch.indices.length / 3));
  for (let it = 0; it < 3 && edge / 2 ** it > 0.004; it++) patch = subdivide(patch);
  patch = taubinSmooth(patch, 4);
  const n = patch.positions.length / 3;
  const pn = computeNormals(patch);
  // geodesic-ish distance from the patch border (Dijkstra over edges)
  const edgeCount = new Map<string, number>();
  for (let t = 0; t < patch.indices.length; t += 3)
    for (let k = 0; k < 3; k++) {
      const a = patch.indices[t + k];
      const b = patch.indices[t + ((k + 1) % 3)];
      const key = a < b ? `${a},${b}` : `${b},${a}`;
      edgeCount.set(key, (edgeCount.get(key) ?? 0) + 1);
    }
  const dist = new Float64Array(n).fill(Infinity);
  const { offsets, list } = vertexNeighbors(patch);
  const heap: [number, number][] = [];
  for (const [key, c] of edgeCount) {
    if (c !== 1) continue;
    for (const v of key.split(",").map(Number)) {
      dist[v] = 0;
      heap.push([0, v]);
    }
  }
  const pos = patch.positions;
  while (heap.length) {
    let bi = 0;
    for (let i = 1; i < heap.length; i++) if (heap[i][0] < heap[bi][0]) bi = i;
    const [d, v] = heap[bi];
    heap[bi] = heap[heap.length - 1];
    heap.pop();
    if (d > dist[v]) continue;
    for (let k = offsets[v]; k < offsets[v + 1]; k++) {
      const u = list[k];
      const nd = d + Math.hypot(pos[u * 3] - pos[v * 3], pos[u * 3 + 1] - pos[v * 3 + 1], pos[u * 3 + 2] - pos[v * 3 + 2]);
      if (nd < dist[u] && nd < opts.taper * 1.5) {
        dist[u] = nd;
        heap.push([nd, u]);
      }
    }
  }
  const floorTree = opts.floor ? new KdTree(opts.floor.positions) : null;
  const outer = new Float32Array(n * 3);
  const inner = new Float32Array(n * 3);
  const o2 = { d2: 0 };
  for (let v = 0; v < n; v++) {
    const t = Math.min(1, dist[v] / opts.taper);
    let maxTh = opts.thickness;
    let fat = opts.fat;
    if (floorTree) {
      floorTree.nearest(pos[v * 3], pos[v * 3 + 1], pos[v * 3 + 2], o2);
      const room = Math.sqrt(o2.d2) - 0.001;
      fat = Math.min(fat, room * 0.3);
      maxTh = Math.max(0.0008, Math.min(maxTh, room - fat));
    }
    const th = maxTh * (t * t * (3 - 2 * t));
    for (let k = 0; k < 3; k++) {
      outer[v * 3 + k] = pos[v * 3 + k] - pn[v * 3 + k] * fat;
      inner[v * 3 + k] = pos[v * 3 + k] - pn[v * 3 + k] * (fat + th);
    }
  }
  const positions = new Float32Array(n * 6);
  positions.set(outer, 0);
  positions.set(inner, n * 3);
  const indices = new Uint32Array(patch.indices.length * 2);
  for (let t = 0; t < patch.indices.length; t += 3) {
    indices[t] = patch.indices[t];
    indices[t + 1] = patch.indices[t + 1];
    indices[t + 2] = patch.indices[t + 2];
    const o = patch.indices.length + t;
    indices[o] = patch.indices[t] + n;
    indices[o + 1] = patch.indices[t + 2] + n;
    indices[o + 2] = patch.indices[t + 1] + n;
  }
  let mesh = weld({ positions, indices }, 1e-6);
  mesh = taubinSmooth(mesh, 6);
  return generatedStructure(opts.name, mesh, { side: sideWord(opts.side), system: "muscular", group: "muscle", layer: 1, generator: "skin-sheet" });
}

export function generateMissingMuscles(built: BuiltStructure[]): BuiltStructure[] {
  const t0 = Date.now();
  const skin = built.find((b) => b.spec.group === "skin")!.mesh;
  const out: BuiltStructure[] = [];
  const hip = bounds(queryMesh(/hip bone$/i));
  const t7 = bounds(queryMesh(/^seventh thoracic vertebra$/i));
  const trunk = bounds(queryMesh(/^(body of sternum|twelfth thoracic vertebra)$/i));
  const zc = (trunk.min[2] + trunk.max[2]) / 2;
  const mand = queryMesh(/^mandible$/i);
  const skull = queryMesh(/^(frontal bone|parietal bone|left parietal bone|right parietal bone|left temporal bone|right temporal bone|sphenoid bone|left zygomatic bone|right zygomatic bone|left maxilla|right maxilla|mandible|occipital bone)$/i);
  for (const s of [1, -1] as Sgn[]) {
    const scap = bounds(queryMesh(new RegExp(`^${sideWord(s)} scapula$`, "i")));
    // Latissimus dorsi: from the T7-L5 spinous processes, thoracolumbar fascia and iliac crest,
    // sweeping up and laterally to the posterior axillary fold.
    const lat = skinSheet(skin, {
      name: "latissimus dorsi",
      side: s,
      outward: (p) => [p[0], 0, p[2] - zc],
      region: (p) => {
        const ax = p[0] * s;
        if (ax < 0.012 || ax > 0.15) return false;
        if (p[2] > zc + 0.015) return false; // back and flank only
        if (p[1] < hip.max[1] - 0.02 - Math.max(0, ax - 0.05) * 0.15) return false;
        // upper border: from T7 across the inferior angle of the scapula, then up to the axilla
        const t7y = t7.max[1] - 0.01;
        const angleY = scap.min[1] - 0.006;
        const upper = ax < 0.09 ? t7y + (angleY - t7y) * (ax / 0.09) : Math.min(angleY + (ax - 0.09) * 2.2, scap.min[1] + 0.11);
        return p[1] < upper;
      },
      fat: 0.005,
      thickness: 0.006,
      taper: 0.025,
    });
    if (lat) out.push(lat);

    // Temporalis: fan over the temporal fossa above the zygomatic arch.
    const zygM = queryMesh(new RegExp(`^${sideWord(s)} zygomatic bone$`, "i"));
    const zyg = bounds(zygM);
    const ear = bounds(queryMesh(/^external ear$/i));
    const tc: Vec3 = [s * 0.07, zyg.min[1] + 0.05, (ear.max[2] + (zyg.min[2] + zyg.max[2]) / 2) / 2];
    const temp = skinSheet(skin, {
      name: "temporalis",
      side: s,
      outward: () => [s, 0.25, 0],
      region: (p) => p[0] * s > 0.045 && ((p[1] - tc[1]) / 0.032) ** 2 + ((p[2] - tc[2]) / 0.03) ** 2 < 1,
      fat: 0.003,
      thickness: 0.009,
      taper: 0.018,
      floor: skull,
    });
    if (temp) out.push(temp);

    // Masseter: zygomatic arch to the lateral surface of the ramus and angle of the mandible.
    // gonion: lowest point of the ramus (posterior part of the mandible)
    const mb = bounds(mand);
    const ramusZ = mb.min[2] + (mb.max[2] - mb.min[2]) * 0.3;
    const angle = extreme(
      { positions: mand.positions.filter((_, i, a) => a[i - (i % 3) + 2] < ramusZ && a[i - (i % 3)] * s > 0), indices: new Uint32Array(0) },
      [s * 0.2, -1, 0],
    );
    const masseter = skinSheet(skin, {
      name: "masseter",
      side: s,
      outward: () => [s, 0, 0.25],
      region: (p) => {
        if (p[0] * s < 0.035) return false;
        const f = (p[1] - (angle[1] + 0.004)) / (zyg.min[1] + 0.006 - (angle[1] + 0.004));
        if (f < 0 || f > 1) return false;
        const zBack = angle[2] + 0.004 + f * 0.006;
        const zFront = angle[2] + 0.032 + f * 0.012;
        return p[2] > zBack && p[2] < zFront;
      },
      fat: 0.005,
      thickness: 0.011,
      taper: 0.012,
      floor: skull,
    });
    if (masseter) out.push(masseter);
  }
  console.log(`  missing muscles: ${out.length} in ${((Date.now() - t0) / 1000).toFixed(1)}s`);
  return out;
}
