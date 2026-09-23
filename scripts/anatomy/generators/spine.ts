/**
 * Measures the vertebral column of the BodyParts3D skeleton: canal centers (the vertebral
 * foramina), body centers and disc positions. Used to route the spinal cord and nerves.
 */
import { bounds, centroid, type Mesh, type Vec3 } from "../lib/mesh";
import { Grid, floodExterior, rasterizeSurface } from "../lib/voxel";
import { query, queryMesh } from "./context";

export interface VertebraLevel {
  label: string; // C1..L5
  canal: Vec3; // center of the vertebral foramen
  canalHalf: [number, number]; // half extents (x, z) of the foramen
  body: Vec3; // centroid of the vertebral body region
  yMin: number;
  yMax: number;
  halfWidth: number; // half width of the whole vertebra (transverse processes)
}

const NAMES: [string, RegExp][] = [
  ["C1", /^atlas$/i],
  ["C2", /^axis$/i],
  ...["third", "fourth", "fifth", "sixth", "seventh"].map((o, i): [string, RegExp] => [`C${i + 3}`, new RegExp(`^${o} cervical vertebra$`, "i")]),
  ...["first", "second", "third", "fourth", "fifth", "sixth", "seventh", "eighth", "ninth", "tenth", "eleventh", "twelfth"].map(
    (o, i): [string, RegExp] => [`T${i + 1}`, new RegExp(`^${o} thoracic vertebra$`, "i")],
  ),
  ...["first", "second", "third", "fourth", "fifth"].map((o, i): [string, RegExp] => [`L${i + 1}`, new RegExp(`^${o} lumbar vertebra$`, "i")]),
];

/** Find the vertebral foramen as the largest enclosed 2D hole in axial slices. */
function findCanal(m: Mesh): { center: Vec3; half: [number, number] } | null {
  const b = bounds(m);
  const spacing = 0.0007;
  const grid = Grid.fromBounds(b.min, b.max, spacing, 2);
  const vox = rasterizeSurface(grid, m);
  // The canal is open at both ends, so in 3D it belongs to the exterior; the bone interior does not.
  const ext3 = floodExterior(grid, vox);
  let best: { area: number; center: Vec3; half: [number, number] } | null = null;
  const { nx, ny, nz } = grid;
  const midX = (b.min[0] + b.max[0]) / 2;
  for (let f = 0.25; f <= 0.75001; f += 0.05) {
    const j = Math.round(((b.min[1] + (b.max[1] - b.min[1]) * f) - grid.origin[1]) / spacing);
    if (j < 0 || j >= ny) continue;
    const wall = new Uint8Array(nx * nz);
    for (let k = 0; k < nz; k++) for (let i = 0; i < nx; i++) wall[i + nx * k] = ext3[grid.index(i, j, k)] ? 0 : 1;
    const seen = new Uint8Array(nx * nz);
    const queue = new Int32Array(nx * nz);
    let h = 0;
    let t = 0;
    const push = (id: number) => {
      if (seen[id] || wall[id]) return;
      seen[id] = 1;
      queue[t++] = id;
    };
    for (let i = 0; i < nx; i++) {
      push(i);
      push(i + nx * (nz - 1));
    }
    for (let k = 0; k < nz; k++) {
      push(nx * k);
      push(nx - 1 + nx * k);
    }
    while (h < t) {
      const id = queue[h++];
      const i = id % nx;
      const k = Math.floor(id / nx);
      if (i > 0) push(id - 1);
      if (i < nx - 1) push(id + 1);
      if (k > 0) push(id - nx);
      if (k < nz - 1) push(id + nx);
    }
    // holes = unvisited non-wall pixels; label them
    const lab = new Int32Array(nx * nz).fill(-1);
    for (let s = 0; s < nx * nz; s++) {
      if (seen[s] || wall[s] || lab[s] >= 0) continue;
      let hh = 0;
      let tt = 0;
      queue[tt++] = s;
      lab[s] = s;
      let sx = 0;
      let sz = 0;
      let minI = Infinity;
      let maxI = -Infinity;
      let minK = Infinity;
      let maxK = -Infinity;
      while (hh < tt) {
        const id = queue[hh++];
        const i = id % nx;
        const k = Math.floor(id / nx);
        sx += i;
        sz += k;
        minI = Math.min(minI, i);
        maxI = Math.max(maxI, i);
        minK = Math.min(minK, k);
        maxK = Math.max(maxK, k);
        for (const n of [i > 0 ? id - 1 : -1, i < nx - 1 ? id + 1 : -1, k > 0 ? id - nx : -1, k < nz - 1 ? id + nx : -1]) {
          if (n < 0 || seen[n] || wall[n] || lab[n] >= 0) continue;
          lab[n] = s;
          queue[tt++] = n;
        }
      }
      const area = tt * spacing * spacing;
      const cxw = grid.origin[0] + (sx / tt) * spacing;
      if (area > 4e-5 && Math.abs(cxw - midX) < 0.006 && (!best || area > best.area)) {
        best = {
          area,
          center: [grid.origin[0] + (sx / tt) * spacing, grid.origin[1] + j * spacing, grid.origin[2] + (sz / tt) * spacing],
          half: [((maxI - minI + 3) * spacing) / 2, ((maxK - minK + 3) * spacing) / 2],
        };
      }
    }
  }
  return best ? { center: best.center, half: best.half } : null;
}

let cached: VertebraLevel[] | null = null;

export function analyzeSpine(): VertebraLevel[] {
  if (cached) return cached;
  const levels: VertebraLevel[] = [];
  for (const [label, re] of NAMES) {
    const found = query(re);
    if (!found.length) continue;
    const m = found[0].mesh;
    const b = bounds(m);
    const canal = findCanal(m);
    const c = centroid(m);
    const canalCenter: Vec3 = canal ? canal.center : [c[0], (b.min[1] + b.max[1]) / 2, c[2] - 0.01];
    // body: vertices anterior to the canal
    let sx = 0;
    let sy = 0;
    let sz = 0;
    let n = 0;
    const zCut = canalCenter[2] + (canal ? canal.half[1] : 0.008) + 0.002;
    for (let i = 0; i < m.positions.length; i += 3) {
      if (m.positions[i + 2] > zCut && Math.abs(m.positions[i]) < 0.03) {
        sx += m.positions[i];
        sy += m.positions[i + 1];
        sz += m.positions[i + 2];
        n++;
      }
    }
    levels.push({
      label,
      canal: canalCenter,
      canalHalf: canal ? canal.half : [0.008, 0.007],
      body: n ? [sx / n, sy / n, sz / n] : [c[0], c[1], c[2] + 0.02],
      yMin: b.min[1],
      yMax: b.max[1],
      halfWidth: (b.max[0] - b.min[0]) / 2,
    });
  }
  // C1 has no body: place it in line with C2's dens
  const c1 = levels.find((l) => l.label === "C1");
  const c2 = levels.find((l) => l.label === "C2");
  if (c1 && c2) c1.body = [c2.body[0], c1.canal[1], c2.body[2]];
  cached = levels;
  return levels;
}

/** Sacral anterior foramina (S1-S4) approximated from the sacrum's anterior surface. */
export function sacralForamina(side: 1 | -1): Vec3[] {
  const s = queryMesh(/^sacrum$/i);
  const b = bounds(s);
  const out: Vec3[] = [];
  for (const f of [0.82, 0.62, 0.45, 0.3]) {
    const y = b.min[1] + (b.max[1] - b.min[1]) * f;
    let best: Vec3 | null = null;
    for (let i = 0; i < s.positions.length; i += 3) {
      const x = s.positions[i] * side;
      const yy = s.positions[i + 1];
      if (Math.abs(yy - y) > 0.006 || x < 0.012 || x > 0.03) continue;
      const p: Vec3 = [s.positions[i], yy, s.positions[i + 2]];
      if (!best || p[2] > best[2]) best = p;
    }
    if (best) out.push(best);
  }
  return out;
}
