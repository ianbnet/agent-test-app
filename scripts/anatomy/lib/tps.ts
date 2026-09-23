/**
 * 3D thin-plate spline (biharmonic kernel U(r) = r) mapping source points to target points.
 * Supports a per-point regularization weight so soft landmarks bend less.
 */
import { Grid } from "./voxel";
import type { Vec3 } from "./mesh";

export class ThinPlateSpline {
  private constructor(
    private readonly ctrl: Float64Array, // N*3 source control points
    private readonly w: Float64Array, // N*3 kernel weights
    private readonly a: Float64Array, // 4*3 affine coefficients
  ) {}

  get count() {
    return this.ctrl.length / 3;
  }

  /**
   * @param src source landmarks (N*3)
   * @param dst target landmarks (N*3)
   * @param lambda regularization per point (N) or scalar; larger = smoother / softer constraint
   */
  static fit(src: ArrayLike<number>, dst: ArrayLike<number>, lambda: number | ArrayLike<number> = 0): ThinPlateSpline {
    const n = src.length / 3;
    const m = n + 4;
    const A = new Float64Array(m * m);
    const B = new Float64Array(m * 3);
    for (let i = 0; i < n; i++) {
      const xi = src[i * 3], yi = src[i * 3 + 1], zi = src[i * 3 + 2];
      for (let j = i; j < n; j++) {
        const r = Math.hypot(xi - src[j * 3], yi - src[j * 3 + 1], zi - src[j * 3 + 2]);
        A[i * m + j] = r;
        A[j * m + i] = r;
      }
      A[i * m + i] = typeof lambda === "number" ? lambda : lambda[i];
      A[i * m + n] = 1;
      A[i * m + n + 1] = xi;
      A[i * m + n + 2] = yi;
      A[i * m + n + 3] = zi;
      A[n * m + i] = 1;
      A[(n + 1) * m + i] = xi;
      A[(n + 2) * m + i] = yi;
      A[(n + 3) * m + i] = zi;
      B[i * 3] = dst[i * 3];
      B[i * 3 + 1] = dst[i * 3 + 1];
      B[i * 3 + 2] = dst[i * 3 + 2];
    }
    solveInPlace(A, B, m, 3);
    const w = B.slice(0, n * 3);
    const a = B.slice(n * 3, n * 3 + 12);
    return new ThinPlateSpline(Float64Array.from(src), w, a);
  }

  apply(x: number, y: number, z: number, out: Vec3 = [0, 0, 0]): Vec3 {
    const a = this.a;
    let ox = a[0] + a[3] * x + a[6] * y + a[9] * z;
    let oy = a[1] + a[4] * x + a[7] * y + a[10] * z;
    let oz = a[2] + a[5] * x + a[8] * y + a[11] * z;
    const c = this.ctrl;
    const w = this.w;
    for (let i = 0, n = c.length; i < n; i += 3) {
      const r = Math.hypot(x - c[i], y - c[i + 1], z - c[i + 2]);
      ox += w[i] * r;
      oy += w[i + 1] * r;
      oz += w[i + 2] * r;
    }
    out[0] = ox;
    out[1] = oy;
    out[2] = oz;
    return out;
  }

  /** Transform an array of points in place (N*3). */
  applyAll(points: Float32Array | Float64Array) {
    const t: Vec3 = [0, 0, 0];
    for (let i = 0; i < points.length; i += 3) {
      this.apply(points[i], points[i + 1], points[i + 2], t);
      points[i] = t[0];
      points[i + 1] = t[1];
      points[i + 2] = t[2];
    }
  }
}

/** Gaussian elimination with partial pivoting, solving A X = B for k right-hand sides (B overwritten by X). */
export function solveInPlace(A: Float64Array, B: Float64Array, n: number, k: number) {
  for (let col = 0; col < n; col++) {
    let piv = col;
    let best = Math.abs(A[col * n + col]);
    for (let r = col + 1; r < n; r++) {
      const v = Math.abs(A[r * n + col]);
      if (v > best) {
        best = v;
        piv = r;
      }
    }
    if (best < 1e-14) continue;
    if (piv !== col) {
      for (let c = 0; c < n; c++) {
        const t = A[col * n + c];
        A[col * n + c] = A[piv * n + c];
        A[piv * n + c] = t;
      }
      for (let c = 0; c < k; c++) {
        const t = B[col * k + c];
        B[col * k + c] = B[piv * k + c];
        B[piv * k + c] = t;
      }
    }
    const inv = 1 / A[col * n + col];
    for (let r = col + 1; r < n; r++) {
      const f = A[r * n + col] * inv;
      if (f === 0) continue;
      const ro = r * n;
      const co = col * n;
      for (let c = col; c < n; c++) A[ro + c] -= f * A[co + c];
      for (let c = 0; c < k; c++) B[r * k + c] -= f * B[col * k + c];
    }
  }
  for (let row = n - 1; row >= 0; row--) {
    const d = A[row * n + row];
    for (let c = 0; c < k; c++) {
      let s = B[row * k + c];
      for (let j = row + 1; j < n; j++) s -= A[row * n + j] * B[j * k + c];
      B[row * k + c] = Math.abs(d) < 1e-14 ? 0 : s / d;
    }
  }
}

/**
 * A dense displacement field sampled on a grid, for fast warping of millions of vertices.
 */
export class DisplacementField {
  constructor(
    readonly grid: Grid,
    readonly dx: Float32Array,
    readonly dy: Float32Array,
    readonly dz: Float32Array,
  ) {}

  static fromFunction(grid: Grid, fn: (x: number, y: number, z: number, out: Vec3) => void): DisplacementField {
    const dx = new Float32Array(grid.size);
    const dy = new Float32Array(grid.size);
    const dz = new Float32Array(grid.size);
    const t: Vec3 = [0, 0, 0];
    for (let k = 0; k < grid.nz; k++)
      for (let j = 0; j < grid.ny; j++)
        for (let i = 0; i < grid.nx; i++) {
          const [x, y, z] = grid.pos(i, j, k);
          fn(x, y, z, t);
          const id = grid.index(i, j, k);
          dx[id] = t[0] - x;
          dy[id] = t[1] - y;
          dz[id] = t[2] - z;
        }
    return new DisplacementField(grid, dx, dy, dz);
  }

  apply(x: number, y: number, z: number, out: Vec3 = [0, 0, 0]): Vec3 {
    out[0] = x + this.grid.sample(this.dx, x, y, z, 0);
    out[1] = y + this.grid.sample(this.dy, x, y, z, 0);
    out[2] = z + this.grid.sample(this.dz, x, y, z, 0);
    return out;
  }

  applyAll(points: Float32Array) {
    const t: Vec3 = [0, 0, 0];
    for (let i = 0; i < points.length; i += 3) {
      this.apply(points[i], points[i + 1], points[i + 2], t);
      points[i] = t[0];
      points[i + 1] = t[1];
      points[i + 2] = t[2];
    }
  }
}
