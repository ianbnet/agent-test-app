/**
 * Voxel utilities: solid voxelization, morphology via exact distance transforms,
 * and iso-surface extraction (naive surface nets) for generated anatomy.
 */
import type { Mesh, Vec3 } from "./mesh";

export class Grid {
  readonly nx: number;
  readonly ny: number;
  readonly nz: number;
  constructor(
    readonly origin: Vec3,
    readonly spacing: number,
    dims: Vec3,
  ) {
    this.nx = dims[0];
    this.ny = dims[1];
    this.nz = dims[2];
  }

  static fromBounds(min: Vec3, max: Vec3, spacing: number, pad = 2): Grid {
    const origin: Vec3 = [min[0] - pad * spacing, min[1] - pad * spacing, min[2] - pad * spacing];
    const dims: Vec3 = [
      Math.ceil((max[0] - min[0]) / spacing) + 2 * pad + 1,
      Math.ceil((max[1] - min[1]) / spacing) + 2 * pad + 1,
      Math.ceil((max[2] - min[2]) / spacing) + 2 * pad + 1,
    ];
    return new Grid(origin, spacing, dims);
  }

  get size() {
    return this.nx * this.ny * this.nz;
  }

  index(i: number, j: number, k: number) {
    return i + this.nx * (j + this.ny * k);
  }

  /** World position of voxel center. */
  pos(i: number, j: number, k: number): Vec3 {
    return [this.origin[0] + i * this.spacing, this.origin[1] + j * this.spacing, this.origin[2] + k * this.spacing];
  }

  cellOf(x: number, y: number, z: number): Vec3 {
    return [
      Math.round((x - this.origin[0]) / this.spacing),
      Math.round((y - this.origin[1]) / this.spacing),
      Math.round((z - this.origin[2]) / this.spacing),
    ];
  }

  /** Trilinear sample of a scalar field defined on this grid. */
  sample(field: Float32Array, x: number, y: number, z: number, outside = 1e3): number {
    const fx = (x - this.origin[0]) / this.spacing;
    const fy = (y - this.origin[1]) / this.spacing;
    const fz = (z - this.origin[2]) / this.spacing;
    const i = Math.floor(fx);
    const j = Math.floor(fy);
    const k = Math.floor(fz);
    if (i < 0 || j < 0 || k < 0 || i >= this.nx - 1 || j >= this.ny - 1 || k >= this.nz - 1) return outside;
    const tx = fx - i;
    const ty = fy - j;
    const tz = fz - k;
    const nx = this.nx;
    const nxy = this.nx * this.ny;
    const o = i + nx * j + nxy * k;
    const c000 = field[o];
    const c100 = field[o + 1];
    const c010 = field[o + nx];
    const c110 = field[o + nx + 1];
    const c001 = field[o + nxy];
    const c101 = field[o + nxy + 1];
    const c011 = field[o + nxy + nx];
    const c111 = field[o + nxy + nx + 1];
    const c00 = c000 + (c100 - c000) * tx;
    const c10 = c010 + (c110 - c010) * tx;
    const c01 = c001 + (c101 - c001) * tx;
    const c11 = c011 + (c111 - c011) * tx;
    const c0 = c00 + (c10 - c00) * ty;
    const c1 = c01 + (c11 - c01) * ty;
    return c0 + (c1 - c0) * tz;
  }
}

/** Mark voxels touched by the mesh surface (dense triangle sampling). */
export function rasterizeSurface(grid: Grid, mesh: Mesh, out?: Uint8Array, value = 1): Uint8Array {
  const vox = out ?? new Uint8Array(grid.size);
  const p = mesh.positions;
  const s = grid.spacing;
  const inv = 1 / s;
  const ox = grid.origin[0], oy = grid.origin[1], oz = grid.origin[2];
  const { nx, ny, nz } = grid;
  const mark = (x: number, y: number, z: number) => {
    const i = Math.round((x - ox) * inv);
    const j = Math.round((y - oy) * inv);
    const k = Math.round((z - oz) * inv);
    if (i < 0 || j < 0 || k < 0 || i >= nx || j >= ny || k >= nz) return;
    vox[i + nx * (j + ny * k)] = value;
  };
  for (let t = 0; t < mesh.indices.length; t += 3) {
    const a = mesh.indices[t] * 3;
    const b = mesh.indices[t + 1] * 3;
    const c = mesh.indices[t + 2] * 3;
    const ab = Math.hypot(p[b] - p[a], p[b + 1] - p[a + 1], p[b + 2] - p[a + 2]);
    const ac = Math.hypot(p[c] - p[a], p[c + 1] - p[a + 1], p[c + 2] - p[a + 2]);
    const bc = Math.hypot(p[c] - p[b], p[c + 1] - p[b + 1], p[c + 2] - p[b + 2]);
    const steps = Math.max(1, Math.ceil((Math.max(ab, ac, bc) * inv) * 2));
    for (let u = 0; u <= steps; u++) {
      for (let v = 0; v <= steps - u; v++) {
        const fu = u / steps;
        const fv = v / steps;
        const fw = 1 - fu - fv;
        mark(
          fw * p[a] + fu * p[b] + fv * p[c],
          fw * p[a + 1] + fu * p[b + 1] + fv * p[c + 1],
          fw * p[a + 2] + fu * p[b + 2] + fv * p[c + 2],
        );
      }
    }
  }
  return vox;
}

/** 6-connected flood fill of zero voxels starting from the grid border. Returns 1 for exterior. */
export function floodExterior(grid: Grid, walls: Uint8Array): Uint8Array {
  const { nx, ny, nz } = grid;
  const ext = new Uint8Array(grid.size);
  const queue = new Int32Array(grid.size);
  let head = 0;
  let tail = 0;
  const push = (i: number, j: number, k: number) => {
    const id = i + nx * (j + ny * k);
    if (ext[id] || walls[id]) return;
    ext[id] = 1;
    queue[tail++] = id;
  };
  for (let i = 0; i < nx; i++)
    for (let j = 0; j < ny; j++) {
      push(i, j, 0);
      push(i, j, nz - 1);
    }
  for (let i = 0; i < nx; i++)
    for (let k = 0; k < nz; k++) {
      push(i, 0, k);
      push(i, ny - 1, k);
    }
  for (let j = 0; j < ny; j++)
    for (let k = 0; k < nz; k++) {
      push(0, j, k);
      push(nx - 1, j, k);
    }
  while (head < tail) {
    const id = queue[head++];
    const i = id % nx;
    const j = Math.floor(id / nx) % ny;
    const k = Math.floor(id / (nx * ny));
    if (i > 0) push(i - 1, j, k);
    if (i < nx - 1) push(i + 1, j, k);
    if (j > 0) push(i, j - 1, k);
    if (j < ny - 1) push(i, j + 1, k);
    if (k > 0) push(i, j, k - 1);
    if (k < nz - 1) push(i, j, k + 1);
  }
  return ext;
}

/** Solid voxelization: surface + everything not reachable from outside. */
export function voxelizeSolid(grid: Grid, meshes: Mesh[]): Uint8Array {
  const walls = new Uint8Array(grid.size);
  for (const m of meshes) rasterizeSurface(grid, m, walls);
  const ext = floodExterior(grid, walls);
  const solid = new Uint8Array(grid.size);
  for (let i = 0; i < solid.length; i++) solid[i] = ext[i] ? 0 : 1;
  return solid;
}

/** Connected components of set voxels (6-connectivity); returns labels and sizes. */
export function labelComponents(grid: Grid, vox: Uint8Array): { labels: Int32Array; sizes: number[] } {
  const { nx, ny, nz } = grid;
  const labels = new Int32Array(grid.size).fill(-1);
  const sizes: number[] = [];
  const queue = new Int32Array(grid.size);
  for (let start = 0; start < vox.length; start++) {
    if (!vox[start] || labels[start] !== -1) continue;
    const label = sizes.length;
    let head = 0;
    let tail = 0;
    queue[tail++] = start;
    labels[start] = label;
    while (head < tail) {
      const id = queue[head++];
      const i = id % nx;
      const j = Math.floor(id / nx) % ny;
      const k = Math.floor(id / (nx * ny));
      const nb = [
        i > 0 ? id - 1 : -1,
        i < nx - 1 ? id + 1 : -1,
        j > 0 ? id - nx : -1,
        j < ny - 1 ? id + nx : -1,
        k > 0 ? id - nx * ny : -1,
        k < nz - 1 ? id + nx * ny : -1,
      ];
      for (const n of nb) {
        if (n < 0 || !vox[n] || labels[n] !== -1) continue;
        labels[n] = label;
        queue[tail++] = n;
      }
    }
    sizes.push(tail);
  }
  return { labels, sizes };
}

/** Keep only the largest connected component. */
export function largestComponent(grid: Grid, vox: Uint8Array): Uint8Array {
  const { labels, sizes } = labelComponents(grid, vox);
  if (sizes.length === 0) return vox;
  let best = 0;
  for (let i = 1; i < sizes.length; i++) if (sizes[i] > sizes[best]) best = i;
  const out = new Uint8Array(vox.length);
  for (let i = 0; i < vox.length; i++) out[i] = labels[i] === best ? 1 : 0;
  return out;
}

const INF = 1e20;

/** 1D squared distance transform (Felzenszwalb & Huttenlocher). */
function edt1d(f: Float64Array, n: number, d: Float64Array, v: Int32Array, z: Float64Array) {
  let k = 0;
  v[0] = 0;
  z[0] = -INF;
  z[1] = INF;
  for (let q = 1; q < n; q++) {
    let s = (f[q] + q * q - (f[v[k]] + v[k] * v[k])) / (2 * q - 2 * v[k]);
    while (s <= z[k]) {
      k--;
      s = (f[q] + q * q - (f[v[k]] + v[k] * v[k])) / (2 * q - 2 * v[k]);
    }
    k++;
    v[k] = q;
    z[k] = s;
    z[k + 1] = INF;
  }
  k = 0;
  for (let q = 0; q < n; q++) {
    while (z[k + 1] < q) k++;
    const dq = q - v[k];
    d[q] = dq * dq + f[v[k]];
  }
}

/** Exact Euclidean distance (in meters) from each voxel to the nearest set voxel. */
export function distanceToSet(grid: Grid, vox: Uint8Array): Float32Array {
  const { nx, ny, nz } = grid;
  const n = Math.max(nx, ny, nz);
  const g = new Float64Array(grid.size);
  for (let i = 0; i < g.length; i++) g[i] = vox[i] ? 0 : INF;
  const f = new Float64Array(n);
  const d = new Float64Array(n);
  const v = new Int32Array(n);
  const z = new Float64Array(n + 1);
  // x
  for (let k = 0; k < nz; k++)
    for (let j = 0; j < ny; j++) {
      const base = nx * (j + ny * k);
      for (let i = 0; i < nx; i++) f[i] = g[base + i];
      edt1d(f, nx, d, v, z);
      for (let i = 0; i < nx; i++) g[base + i] = d[i];
    }
  // y
  for (let k = 0; k < nz; k++)
    for (let i = 0; i < nx; i++) {
      for (let j = 0; j < ny; j++) f[j] = g[i + nx * (j + ny * k)];
      edt1d(f, ny, d, v, z);
      for (let j = 0; j < ny; j++) g[i + nx * (j + ny * k)] = d[j];
    }
  // z
  for (let j = 0; j < ny; j++)
    for (let i = 0; i < nx; i++) {
      for (let k = 0; k < nz; k++) f[k] = g[i + nx * (j + ny * k)];
      edt1d(f, nz, d, v, z);
      for (let k = 0; k < nz; k++) g[i + nx * (j + ny * k)] = d[k];
    }
  const out = new Float32Array(grid.size);
  for (let i = 0; i < out.length; i++) out[i] = Math.sqrt(g[i]) * grid.spacing;
  return out;
}

/** Signed distance: negative inside the solid, positive outside (voxel-center approximation). */
export function signedDistance(grid: Grid, solid: Uint8Array): Float32Array {
  const outside = new Uint8Array(solid.length);
  for (let i = 0; i < solid.length; i++) outside[i] = solid[i] ? 0 : 1;
  const dIn = distanceToSet(grid, outside); // for inside voxels: distance to nearest outside
  const dOut = distanceToSet(grid, solid); // for outside voxels: distance to nearest inside
  const sd = new Float32Array(solid.length);
  const h = grid.spacing * 0.5;
  for (let i = 0; i < sd.length; i++) sd[i] = solid[i] ? -(dIn[i] - h) : dOut[i] - h;
  return sd;
}

export function dilate(grid: Grid, vox: Uint8Array, radius: number): Uint8Array {
  const d = distanceToSet(grid, vox);
  const out = new Uint8Array(vox.length);
  for (let i = 0; i < out.length; i++) out[i] = d[i] <= radius ? 1 : 0;
  return out;
}

export function erode(grid: Grid, vox: Uint8Array, radius: number): Uint8Array {
  const inv = new Uint8Array(vox.length);
  for (let i = 0; i < inv.length; i++) inv[i] = vox[i] ? 0 : 1;
  const d = distanceToSet(grid, inv);
  const out = new Uint8Array(vox.length);
  for (let i = 0; i < out.length; i++) out[i] = vox[i] && d[i] > radius ? 1 : 0;
  return out;
}

/** Morphological closing (fills small gaps / holes). */
export function close(grid: Grid, vox: Uint8Array, radius: number): Uint8Array {
  return erode(grid, dilate(grid, vox, radius), radius);
}

export function opening(grid: Grid, vox: Uint8Array, radius: number): Uint8Array {
  return dilate(grid, erode(grid, vox, radius), radius);
}

/** Separable box blur of a scalar field (used to smooth binary masks before meshing). */
export function blurField(grid: Grid, field: Float32Array, radius: number, passes = 1): Float32Array {
  const { nx, ny, nz } = grid;
  let src = field.slice();
  let dst = new Float32Array(field.length);
  const r = Math.max(1, Math.round(radius));
  const blurAxis = (stride: number, len: number, count: (cb: (base: number) => void) => void) => {
    const buf = new Float32Array(len);
    count((base) => {
      for (let t = 0; t < len; t++) buf[t] = src[base + t * stride];
      let acc = 0;
      for (let t = -r; t <= r; t++) acc += buf[Math.min(len - 1, Math.max(0, t))];
      for (let t = 0; t < len; t++) {
        dst[base + t * stride] = acc / (2 * r + 1);
        const add = buf[Math.min(len - 1, t + r + 1)];
        const rem = buf[Math.max(0, t - r)];
        acc += add - rem;
      }
    });
    const tmp = src;
    src = dst;
    dst = tmp;
  };
  for (let p = 0; p < passes; p++) {
    blurAxis(1, nx, (cb) => {
      for (let k = 0; k < nz; k++) for (let j = 0; j < ny; j++) cb(nx * (j + ny * k));
    });
    blurAxis(nx, ny, (cb) => {
      for (let k = 0; k < nz; k++) for (let i = 0; i < nx; i++) cb(i + nx * ny * k);
    });
    blurAxis(nx * ny, nz, (cb) => {
      for (let j = 0; j < ny; j++) for (let i = 0; i < nx; i++) cb(i + nx * j);
    });
  }
  return src;
}

/**
 * Naive surface nets on a scalar field; surface where field crosses `iso`.
 * Inside is field < iso. Produces an outward-oriented triangle mesh.
 */
export function surfaceNets(grid: Grid, field: Float32Array, iso = 0): Mesh {
  const { nx, ny, nz } = grid;
  const s = grid.spacing;
  const [ox, oy, oz] = grid.origin;
  const vertIndex = new Int32Array(grid.size).fill(-1);
  const positions: number[] = [];
  const idx = (i: number, j: number, k: number) => i + nx * (j + ny * k);
  const corners = [
    [0, 0, 0],
    [1, 0, 0],
    [0, 1, 0],
    [1, 1, 0],
    [0, 0, 1],
    [1, 0, 1],
    [0, 1, 1],
    [1, 1, 1],
  ];
  const edges = [
    [0, 1],
    [2, 3],
    [4, 5],
    [6, 7],
    [0, 2],
    [1, 3],
    [4, 6],
    [5, 7],
    [0, 4],
    [1, 5],
    [2, 6],
    [3, 7],
  ];
  const val = new Float32Array(8);
  for (let k = 0; k < nz - 1; k++)
    for (let j = 0; j < ny - 1; j++)
      for (let i = 0; i < nx - 1; i++) {
        let mask = 0;
        for (let c = 0; c < 8; c++) {
          const v = field[idx(i + corners[c][0], j + corners[c][1], k + corners[c][2])] - iso;
          val[c] = v;
          if (v < 0) mask |= 1 << c;
        }
        if (mask === 0 || mask === 255) continue;
        let px = 0;
        let py = 0;
        let pz = 0;
        let cnt = 0;
        for (const [a, b] of edges) {
          const va = val[a];
          const vb = val[b];
          if (va < 0 === vb < 0) continue;
          const t = va / (va - vb);
          px += corners[a][0] + t * (corners[b][0] - corners[a][0]);
          py += corners[a][1] + t * (corners[b][1] - corners[a][1]);
          pz += corners[a][2] + t * (corners[b][2] - corners[a][2]);
          cnt++;
        }
        vertIndex[idx(i, j, k)] = positions.length / 3;
        positions.push(ox + (i + px / cnt) * s, oy + (j + py / cnt) * s, oz + (k + pz / cnt) * s);
      }
  const tris: number[] = [];
  // For each grid edge crossing the surface, emit a quad joining the 4 cells sharing that edge.
  for (let k = 1; k < nz - 1; k++)
    for (let j = 1; j < ny - 1; j++)
      for (let i = 1; i < nx - 1; i++) {
        const v0 = field[idx(i, j, k)] - iso;
        const in0 = v0 < 0;
        // edge along +x
        if (i < nx - 1) {
          const in1 = field[idx(i + 1, j, k)] - iso < 0;
          if (in0 !== in1) {
            const a = vertIndex[idx(i, j - 1, k - 1)];
            const b = vertIndex[idx(i, j, k - 1)];
            const c = vertIndex[idx(i, j, k)];
            const d = vertIndex[idx(i, j - 1, k)];
            emitQuad(tris, a, b, c, d, in0);
          }
        }
        if (j < ny - 1) {
          const in1 = field[idx(i, j + 1, k)] - iso < 0;
          if (in0 !== in1) {
            const a = vertIndex[idx(i - 1, j, k - 1)];
            const b = vertIndex[idx(i - 1, j, k)];
            const c = vertIndex[idx(i, j, k)];
            const d = vertIndex[idx(i, j, k - 1)];
            emitQuad(tris, a, b, c, d, in0);
          }
        }
        if (k < nz - 1) {
          const in1 = field[idx(i, j, k + 1)] - iso < 0;
          if (in0 !== in1) {
            const a = vertIndex[idx(i - 1, j - 1, k)];
            const b = vertIndex[idx(i, j - 1, k)];
            const c = vertIndex[idx(i, j, k)];
            const d = vertIndex[idx(i - 1, j, k)];
            emitQuad(tris, a, b, c, d, in0);
          }
        }
      }
  return { positions: new Float32Array(positions), indices: new Uint32Array(tris) };
}

function emitQuad(tris: number[], a: number, b: number, c: number, d: number, flip: boolean) {
  if (a < 0 || b < 0 || c < 0 || d < 0) return;
  if (flip) tris.push(a, b, c, a, c, d);
  else tris.push(a, c, b, a, d, c);
}

/** Convert a binary mask to a smooth mesh: blur → surface nets at 0.5. */
export function maskToMesh(grid: Grid, mask: Uint8Array, blurRadius = 1, blurPasses = 1): Mesh {
  const f = new Float32Array(mask.length);
  for (let i = 0; i < f.length; i++) f[i] = mask[i] ? 0 : 1;
  const b = blurRadius > 0 ? blurField(grid, f, blurRadius, blurPasses) : f;
  return surfaceNets(grid, b, 0.5);
}

/**
 * Smoother variant: mesh the zero level of a (lightly blurred) signed distance field,
 * which places vertices sub-voxel accurately and avoids terracing.
 */
export function maskToMeshSdf(grid: Grid, mask: Uint8Array, blurRadius = 1, blurPasses = 1, offset = 0): Mesh {
  const sd = signedDistance(grid, mask);
  if (offset) for (let i = 0; i < sd.length; i++) sd[i] -= offset;
  const f = blurRadius > 0 ? blurField(grid, sd, blurRadius, blurPasses) : sd;
  return surfaceNets(grid, f, 0);
}

/**
 * Solid voxelization that tolerates small openings (eyes, nostrils, mouth in a skin shell):
 * walls are dilated by `radius` before the exterior flood, and the enclosed core is grown back.
 */
export function voxelizeSolidClosed(grid: Grid, meshes: Mesh[], radius: number): Uint8Array {
  const walls = new Uint8Array(grid.size);
  for (const m of meshes) rasterizeSurface(grid, m, walls);
  const dWall = distanceToSet(grid, walls);
  const thick = new Uint8Array(grid.size);
  for (let i = 0; i < thick.length; i++) thick[i] = dWall[i] <= radius ? 1 : 0;
  const ext = floodExterior(grid, thick);
  const core = new Uint8Array(grid.size);
  for (let i = 0; i < core.length; i++) core[i] = !ext[i] && !thick[i] ? 1 : 0;
  const dCore = distanceToSet(grid, core);
  const solid = new Uint8Array(grid.size);
  for (let i = 0; i < solid.length; i++) solid[i] = core[i] || walls[i] || dCore[i] <= radius + grid.spacing ? 1 : 0;
  return solid;
}
