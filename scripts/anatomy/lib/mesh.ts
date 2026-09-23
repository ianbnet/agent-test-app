/**
 * Minimal indexed triangle-mesh toolkit used by the anatomy model pipeline.
 * All meshes are in meters in the app frame: +X = patient's left, +Y = up, +Z = anterior.
 */
import { MeshoptSimplifier } from "meshoptimizer";

export interface Mesh {
  positions: Float32Array;
  indices: Uint32Array;
}

export type Vec3 = [number, number, number];

export function vertexCount(m: Mesh) {
  return m.positions.length / 3;
}

export function triangleCount(m: Mesh) {
  return m.indices.length / 3;
}

export function cloneMesh(m: Mesh): Mesh {
  return { positions: m.positions.slice(), indices: m.indices.slice() };
}

export function mergeMeshes(meshes: Mesh[]): Mesh {
  let nv = 0;
  let ni = 0;
  for (const m of meshes) {
    nv += m.positions.length;
    ni += m.indices.length;
  }
  const positions = new Float32Array(nv);
  const indices = new Uint32Array(ni);
  let vo = 0;
  let io = 0;
  for (const m of meshes) {
    positions.set(m.positions, vo);
    const base = vo / 3;
    for (let i = 0; i < m.indices.length; i++) indices[io + i] = m.indices[i] + base;
    vo += m.positions.length;
    io += m.indices.length;
  }
  return { positions, indices };
}

export function bounds(m: Mesh | Float32Array): { min: Vec3; max: Vec3 } {
  const p = m instanceof Float32Array ? m : m.positions;
  const min: Vec3 = [Infinity, Infinity, Infinity];
  const max: Vec3 = [-Infinity, -Infinity, -Infinity];
  for (let i = 0; i < p.length; i += 3) {
    for (let k = 0; k < 3; k++) {
      const v = p[i + k];
      if (v < min[k]) min[k] = v;
      if (v > max[k]) max[k] = v;
    }
  }
  return { min, max };
}

export function transformPositions(m: Mesh, fn: (x: number, y: number, z: number, out: Vec3) => void): Mesh {
  const out = new Float32Array(m.positions.length);
  const t: Vec3 = [0, 0, 0];
  for (let i = 0; i < out.length; i += 3) {
    fn(m.positions[i], m.positions[i + 1], m.positions[i + 2], t);
    out[i] = t[0];
    out[i + 1] = t[1];
    out[i + 2] = t[2];
  }
  return { positions: out, indices: m.indices };
}

export function translate(m: Mesh, d: Vec3): Mesh {
  return transformPositions(m, (x, y, z, o) => {
    o[0] = x + d[0];
    o[1] = y + d[1];
    o[2] = z + d[2];
  });
}

export function mirrorX(m: Mesh): Mesh {
  const positions = m.positions.slice();
  for (let i = 0; i < positions.length; i += 3) positions[i] = -positions[i];
  const indices = m.indices.slice();
  for (let i = 0; i < indices.length; i += 3) {
    const t = indices[i + 1];
    indices[i + 1] = indices[i + 2];
    indices[i + 2] = t;
  }
  return { positions, indices };
}

/** Merge vertices closer than `eps` (spatial hashing); drops degenerate triangles. */
export function weld(m: Mesh, eps = 1e-5): Mesh {
  const n = m.positions.length / 3;
  const inv = 1 / eps;
  const map = new Map<string, number>();
  const remap = new Uint32Array(n);
  const out: number[] = [];
  for (let i = 0; i < n; i++) {
    const x = m.positions[i * 3];
    const y = m.positions[i * 3 + 1];
    const z = m.positions[i * 3 + 2];
    const key = `${Math.round(x * inv)},${Math.round(y * inv)},${Math.round(z * inv)}`;
    let idx = map.get(key);
    if (idx === undefined) {
      idx = out.length / 3;
      out.push(x, y, z);
      map.set(key, idx);
    }
    remap[i] = idx;
  }
  const idx: number[] = [];
  for (let i = 0; i < m.indices.length; i += 3) {
    const a = remap[m.indices[i]];
    const b = remap[m.indices[i + 1]];
    const c = remap[m.indices[i + 2]];
    if (a !== b && b !== c && a !== c) idx.push(a, b, c);
  }
  return { positions: new Float32Array(out), indices: new Uint32Array(idx) };
}

/** Drop vertices not referenced by any triangle. */
export function compact(m: Mesh): Mesh {
  const n = m.positions.length / 3;
  const remap = new Int32Array(n).fill(-1);
  let count = 0;
  for (let i = 0; i < m.indices.length; i++) {
    const v = m.indices[i];
    if (remap[v] === -1) remap[v] = count++;
  }
  const positions = new Float32Array(count * 3);
  for (let v = 0; v < n; v++) {
    const r = remap[v];
    if (r < 0) continue;
    positions[r * 3] = m.positions[v * 3];
    positions[r * 3 + 1] = m.positions[v * 3 + 1];
    positions[r * 3 + 2] = m.positions[v * 3 + 2];
  }
  const indices = new Uint32Array(m.indices.length);
  for (let i = 0; i < indices.length; i++) indices[i] = remap[m.indices[i]];
  return { positions, indices };
}

export function computeNormals(m: Mesh): Float32Array {
  const p = m.positions;
  const nrm = new Float32Array(p.length);
  const idx = m.indices;
  for (let i = 0; i < idx.length; i += 3) {
    const a = idx[i] * 3;
    const b = idx[i + 1] * 3;
    const c = idx[i + 2] * 3;
    const e1x = p[b] - p[a];
    const e1y = p[b + 1] - p[a + 1];
    const e1z = p[b + 2] - p[a + 2];
    const e2x = p[c] - p[a];
    const e2y = p[c + 1] - p[a + 1];
    const e2z = p[c + 2] - p[a + 2];
    // area-weighted face normal
    const nx = e1y * e2z - e1z * e2y;
    const ny = e1z * e2x - e1x * e2z;
    const nz = e1x * e2y - e1y * e2x;
    for (const v of [a, b, c]) {
      nrm[v] += nx;
      nrm[v + 1] += ny;
      nrm[v + 2] += nz;
    }
  }
  for (let i = 0; i < nrm.length; i += 3) {
    const l = Math.hypot(nrm[i], nrm[i + 1], nrm[i + 2]) || 1;
    nrm[i] /= l;
    nrm[i + 1] /= l;
    nrm[i + 2] /= l;
  }
  return nrm;
}

export function surfaceArea(m: Mesh): number {
  const p = m.positions;
  let area = 0;
  for (let i = 0; i < m.indices.length; i += 3) {
    const a = m.indices[i] * 3;
    const b = m.indices[i + 1] * 3;
    const c = m.indices[i + 2] * 3;
    const e1x = p[b] - p[a];
    const e1y = p[b + 1] - p[a + 1];
    const e1z = p[b + 2] - p[a + 2];
    const e2x = p[c] - p[a];
    const e2y = p[c + 1] - p[a + 1];
    const e2z = p[c + 2] - p[a + 2];
    area += 0.5 * Math.hypot(e1y * e2z - e1z * e2y, e1z * e2x - e1x * e2z, e1x * e2y - e1y * e2x);
  }
  return area;
}

/** Signed volume (positive for outward-oriented closed meshes). */
export function signedVolume(m: Mesh): number {
  const p = m.positions;
  let v = 0;
  for (let i = 0; i < m.indices.length; i += 3) {
    const a = m.indices[i] * 3;
    const b = m.indices[i + 1] * 3;
    const c = m.indices[i + 2] * 3;
    v +=
      (p[a] * (p[b + 1] * p[c + 2] - p[b + 2] * p[c + 1]) -
        p[a + 1] * (p[b] * p[c + 2] - p[b + 2] * p[c]) +
        p[a + 2] * (p[b] * p[c + 1] - p[b + 1] * p[c])) /
      6;
  }
  return v;
}

/** Area-weighted surface centroid. */
export function centroid(m: Mesh): Vec3 {
  const p = m.positions;
  let cx = 0;
  let cy = 0;
  let cz = 0;
  let tot = 0;
  for (let i = 0; i < m.indices.length; i += 3) {
    const a = m.indices[i] * 3;
    const b = m.indices[i + 1] * 3;
    const c = m.indices[i + 2] * 3;
    const e1x = p[b] - p[a];
    const e1y = p[b + 1] - p[a + 1];
    const e1z = p[b + 2] - p[a + 2];
    const e2x = p[c] - p[a];
    const e2y = p[c + 1] - p[a + 1];
    const e2z = p[c + 2] - p[a + 2];
    const w = 0.5 * Math.hypot(e1y * e2z - e1z * e2y, e1z * e2x - e1x * e2z, e1x * e2y - e1y * e2x);
    cx += w * (p[a] + p[b] + p[c]) / 3;
    cy += w * (p[a + 1] + p[b + 1] + p[c + 1]) / 3;
    cz += w * (p[a + 2] + p[b + 2] + p[c + 2]) / 3;
    tot += w;
  }
  if (tot === 0) {
    const bb = bounds(m);
    return [(bb.min[0] + bb.max[0]) / 2, (bb.min[1] + bb.max[1]) / 2, (bb.min[2] + bb.max[2]) / 2];
  }
  return [cx / tot, cy / tot, cz / tot];
}

/** Uniformly sample `n` points on the surface (deterministic, area-weighted). */
export function samplePoints(m: Mesh, n: number, seed = 1): Float32Array {
  const p = m.positions;
  const nt = m.indices.length / 3;
  const cdf = new Float64Array(nt);
  let tot = 0;
  for (let t = 0; t < nt; t++) {
    const a = m.indices[t * 3] * 3;
    const b = m.indices[t * 3 + 1] * 3;
    const c = m.indices[t * 3 + 2] * 3;
    const e1x = p[b] - p[a];
    const e1y = p[b + 1] - p[a + 1];
    const e1z = p[b + 2] - p[a + 2];
    const e2x = p[c] - p[a];
    const e2y = p[c + 1] - p[a + 1];
    const e2z = p[c + 2] - p[a + 2];
    tot += 0.5 * Math.hypot(e1y * e2z - e1z * e2y, e1z * e2x - e1x * e2z, e1x * e2y - e1y * e2x);
    cdf[t] = tot;
  }
  const rand = mulberry32(seed);
  const out = new Float32Array(n * 3);
  for (let i = 0; i < n; i++) {
    const r = rand() * tot;
    let lo = 0;
    let hi = nt - 1;
    while (lo < hi) {
      const mid = (lo + hi) >> 1;
      if (cdf[mid] < r) lo = mid + 1;
      else hi = mid;
    }
    const a = m.indices[lo * 3] * 3;
    const b = m.indices[lo * 3 + 1] * 3;
    const c = m.indices[lo * 3 + 2] * 3;
    let u = rand();
    let v = rand();
    if (u + v > 1) {
      u = 1 - u;
      v = 1 - v;
    }
    for (let k = 0; k < 3; k++) out[i * 3 + k] = p[a + k] + u * (p[b + k] - p[a + k]) + v * (p[c + k] - p[a + k]);
  }
  return out;
}

export function mulberry32(seed: number) {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/** Vertex adjacency (CSR) for smoothing. */
export function vertexNeighbors(m: Mesh): { offsets: Uint32Array; list: Uint32Array } {
  const n = m.positions.length / 3;
  const sets: Set<number>[] = Array.from({ length: n }, () => new Set());
  for (let i = 0; i < m.indices.length; i += 3) {
    const a = m.indices[i];
    const b = m.indices[i + 1];
    const c = m.indices[i + 2];
    sets[a].add(b).add(c);
    sets[b].add(a).add(c);
    sets[c].add(a).add(b);
  }
  const offsets = new Uint32Array(n + 1);
  for (let i = 0; i < n; i++) offsets[i + 1] = offsets[i] + sets[i].size;
  const list = new Uint32Array(offsets[n]);
  for (let i = 0; i < n; i++) {
    let o = offsets[i];
    for (const v of sets[i]) list[o++] = v;
  }
  return { offsets, list };
}

/** Taubin λ|μ smoothing (volume preserving). */
export function taubinSmooth(m: Mesh, iterations = 10, lambda = 0.5, mu = -0.53): Mesh {
  const { offsets, list } = vertexNeighbors(m);
  let p = m.positions.slice();
  const tmp = new Float32Array(p.length);
  const n = p.length / 3;
  for (let it = 0; it < iterations * 2; it++) {
    const f = it % 2 === 0 ? lambda : mu;
    for (let v = 0; v < n; v++) {
      const s = offsets[v];
      const e = offsets[v + 1];
      if (e === s) {
        tmp[v * 3] = p[v * 3];
        tmp[v * 3 + 1] = p[v * 3 + 1];
        tmp[v * 3 + 2] = p[v * 3 + 2];
        continue;
      }
      let ax = 0;
      let ay = 0;
      let az = 0;
      for (let k = s; k < e; k++) {
        const u = list[k] * 3;
        ax += p[u];
        ay += p[u + 1];
        az += p[u + 2];
      }
      const inv = 1 / (e - s);
      tmp[v * 3] = p[v * 3] + f * (ax * inv - p[v * 3]);
      tmp[v * 3 + 1] = p[v * 3 + 1] + f * (ay * inv - p[v * 3 + 1]);
      tmp[v * 3 + 2] = p[v * 3 + 2] + f * (az * inv - p[v * 3 + 2]);
    }
    const t = p;
    p = tmp.slice();
    void t;
  }
  return { positions: p, indices: m.indices };
}

let simplifierReady: Promise<void> | null = null;
export async function ensureSimplifier() {
  if (!simplifierReady) simplifierReady = MeshoptSimplifier.ready;
  await simplifierReady;
}

/**
 * Simplify with meshoptimizer. `targetError` is an absolute distance in meters;
 * the result keeps at least `minTriangles` triangles when possible.
 */
export function simplify(m: Mesh, opts: { ratio?: number; targetError: number; minTriangles?: number; lockBorder?: boolean }): Mesh {
  const tri = m.indices.length / 3;
  if (tri < 64) return m;
  const targetCount = Math.max(
    Math.floor(((opts.ratio ?? 0) * m.indices.length) / 3) * 3,
    Math.min(m.indices.length, (opts.minTriangles ?? 0) * 3),
  );
  const flags: ("LockBorder" | "ErrorAbsolute")[] = ["ErrorAbsolute"];
  if (opts.lockBorder) flags.push("LockBorder");
  const [indices] = MeshoptSimplifier.simplify(m.indices, m.positions, 3, targetCount, opts.targetError, flags);
  return compact({ positions: m.positions, indices: new Uint32Array(indices) });
}

/** Split into connected components (by shared vertices). */
export function connectedComponents(m: Mesh): Mesh[] {
  const n = m.positions.length / 3;
  const parent = new Int32Array(n);
  for (let i = 0; i < n; i++) parent[i] = i;
  const find = (x: number): number => {
    while (parent[x] !== x) {
      parent[x] = parent[parent[x]];
      x = parent[x];
    }
    return x;
  };
  for (let i = 0; i < m.indices.length; i += 3) {
    const a = find(m.indices[i]);
    const b = find(m.indices[i + 1]);
    const c = find(m.indices[i + 2]);
    parent[b] = a;
    parent[find(c)] = a;
  }
  const groups = new Map<number, number[]>();
  for (let i = 0; i < m.indices.length; i += 3) {
    const r = find(m.indices[i]);
    let g = groups.get(r);
    if (!g) groups.set(r, (g = []));
    g.push(m.indices[i], m.indices[i + 1], m.indices[i + 2]);
  }
  return [...groups.values()].map((idx) => compact({ positions: m.positions, indices: new Uint32Array(idx) }));
}

/** Principal axes (eigenvectors of covariance, sorted by descending variance). */
export function principalAxes(points: Float32Array): { center: Vec3; axes: Vec3[]; extents: Vec3 } {
  const n = points.length / 3;
  let cx = 0;
  let cy = 0;
  let cz = 0;
  for (let i = 0; i < points.length; i += 3) {
    cx += points[i];
    cy += points[i + 1];
    cz += points[i + 2];
  }
  cx /= n;
  cy /= n;
  cz /= n;
  const C = [0, 0, 0, 0, 0, 0, 0, 0, 0];
  for (let i = 0; i < points.length; i += 3) {
    const d = [points[i] - cx, points[i + 1] - cy, points[i + 2] - cz];
    for (let r = 0; r < 3; r++) for (let c = 0; c < 3; c++) C[r * 3 + c] += d[r] * d[c];
  }
  for (let k = 0; k < 9; k++) C[k] /= n;
  const { vectors, values } = jacobiEigen3(C);
  const order = [0, 1, 2].sort((a, b) => values[b] - values[a]);
  const axes = order.map((k) => [vectors[0 * 3 + k], vectors[1 * 3 + k], vectors[2 * 3 + k]] as Vec3);
  const extents: Vec3 = [0, 0, 0];
  for (let i = 0; i < points.length; i += 3) {
    const d = [points[i] - cx, points[i + 1] - cy, points[i + 2] - cz];
    for (let a = 0; a < 3; a++) {
      const proj = Math.abs(d[0] * axes[a][0] + d[1] * axes[a][1] + d[2] * axes[a][2]);
      if (proj > extents[a]) extents[a] = proj;
    }
  }
  return { center: [cx, cy, cz], axes, extents };
}

/** Symmetric 3x3 eigen decomposition (row-major input). Returns column eigenvectors. */
export function jacobiEigen3(Ain: number[]): { values: number[]; vectors: number[] } {
  const A = Ain.slice();
  const V = [1, 0, 0, 0, 1, 0, 0, 0, 1];
  for (let sweep = 0; sweep < 50; sweep++) {
    const off = Math.abs(A[1]) + Math.abs(A[2]) + Math.abs(A[5]);
    if (off < 1e-15) break;
    for (const [p, q] of [
      [0, 1],
      [0, 2],
      [1, 2],
    ]) {
      const apq = A[p * 3 + q];
      if (Math.abs(apq) < 1e-18) continue;
      const app = A[p * 3 + p];
      const aqq = A[q * 3 + q];
      const theta = (aqq - app) / (2 * apq);
      const t = Math.sign(theta || 1) / (Math.abs(theta) + Math.sqrt(theta * theta + 1));
      const c = 1 / Math.sqrt(t * t + 1);
      const s = t * c;
      for (let k = 0; k < 3; k++) {
        const akp = A[k * 3 + p];
        const akq = A[k * 3 + q];
        A[k * 3 + p] = c * akp - s * akq;
        A[k * 3 + q] = s * akp + c * akq;
      }
      for (let k = 0; k < 3; k++) {
        const apk = A[p * 3 + k];
        const aqk = A[q * 3 + k];
        A[p * 3 + k] = c * apk - s * aqk;
        A[q * 3 + k] = s * apk + c * aqk;
      }
      for (let k = 0; k < 3; k++) {
        const vkp = V[k * 3 + p];
        const vkq = V[k * 3 + q];
        V[k * 3 + p] = c * vkp - s * vkq;
        V[k * 3 + q] = s * vkp + c * vkq;
      }
    }
  }
  return { values: [A[0], A[4], A[8]], vectors: V };
}

/** 1-to-4 midpoint subdivision (shared edge midpoints). */
export function subdivide(m: Mesh): Mesh {
  const pos = Array.from(m.positions);
  const mid = new Map<string, number>();
  const edgeMid = (a: number, b: number) => {
    const key = a < b ? `${a},${b}` : `${b},${a}`;
    let v = mid.get(key);
    if (v === undefined) {
      v = pos.length / 3;
      pos.push((pos[a * 3] + pos[b * 3]) / 2, (pos[a * 3 + 1] + pos[b * 3 + 1]) / 2, (pos[a * 3 + 2] + pos[b * 3 + 2]) / 2);
      mid.set(key, v);
    }
    return v;
  };
  const idx: number[] = [];
  for (let t = 0; t < m.indices.length; t += 3) {
    const a = m.indices[t];
    const b = m.indices[t + 1];
    const c = m.indices[t + 2];
    const ab = edgeMid(a, b);
    const bc = edgeMid(b, c);
    const ca = edgeMid(c, a);
    idx.push(a, ab, ca, ab, b, bc, ca, bc, c, ab, bc, ca);
  }
  return { positions: new Float32Array(pos), indices: new Uint32Array(idx) };
}
