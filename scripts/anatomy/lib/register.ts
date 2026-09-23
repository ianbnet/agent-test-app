/**
 * Point-set registration helpers: similarity / affine ICP and a light non-rigid
 * (iterative TPS) registration used to establish correspondences between bodies.
 */
import { KdTree } from "./kdtree";
import { ThinPlateSpline, solveInPlace } from "./tps";
import type { Vec3 } from "./mesh";

export type Mat4 = number[]; // column-major like three.js (16)

export function identity(): Mat4 {
  return [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1];
}

export function applyMat(m: Mat4, x: number, y: number, z: number, out: Vec3 = [0, 0, 0]): Vec3 {
  out[0] = m[0] * x + m[4] * y + m[8] * z + m[12];
  out[1] = m[1] * x + m[5] * y + m[9] * z + m[13];
  out[2] = m[2] * x + m[6] * y + m[10] * z + m[14];
  return out;
}

export function transformPoints(m: Mat4, pts: Float32Array): Float32Array {
  const out = new Float32Array(pts.length);
  const t: Vec3 = [0, 0, 0];
  for (let i = 0; i < pts.length; i += 3) {
    applyMat(m, pts[i], pts[i + 1], pts[i + 2], t);
    out[i] = t[0];
    out[i + 1] = t[1];
    out[i + 2] = t[2];
  }
  return out;
}

export function multiply(a: Mat4, b: Mat4): Mat4 {
  const o = new Array(16).fill(0);
  for (let r = 0; r < 4; r++)
    for (let c = 0; c < 4; c++) {
      let s = 0;
      for (let k = 0; k < 4; k++) s += a[k * 4 + r] * b[c * 4 + k];
      o[c * 4 + r] = s;
    }
  return o;
}

/** Least-squares affine map src->dst (N >= 4). */
export function fitAffine(src: ArrayLike<number>, dst: ArrayLike<number>, weights?: ArrayLike<number>): Mat4 {
  const n = src.length / 3;
  const AtA = new Float64Array(16);
  const AtB = new Float64Array(12);
  for (let i = 0; i < n; i++) {
    const w = weights ? weights[i] : 1;
    const row = [src[i * 3], src[i * 3 + 1], src[i * 3 + 2], 1];
    for (let r = 0; r < 4; r++) {
      for (let c = 0; c < 4; c++) AtA[r * 4 + c] += w * row[r] * row[c];
      for (let c = 0; c < 3; c++) AtB[r * 3 + c] += w * row[r] * dst[i * 3 + c];
    }
  }
  for (let r = 0; r < 4; r++) AtA[r * 4 + r] += 1e-9;
  solveInPlace(AtA, AtB, 4, 3);
  // AtB rows: coefficients for x, y, z, 1
  return [AtB[0], AtB[1], AtB[2], 0, AtB[3], AtB[4], AtB[5], 0, AtB[6], AtB[7], AtB[8], 0, AtB[9], AtB[10], AtB[11], 1];
}

/** Least-squares similarity transform (Umeyama). */
export function fitSimilarity(src: ArrayLike<number>, dst: ArrayLike<number>, allowScale = true): Mat4 {
  const n = src.length / 3;
  const ms = [0, 0, 0];
  const md = [0, 0, 0];
  for (let i = 0; i < n; i++)
    for (let k = 0; k < 3; k++) {
      ms[k] += src[i * 3 + k] / n;
      md[k] += dst[i * 3 + k] / n;
    }
  const S = new Array(9).fill(0);
  let varS = 0;
  for (let i = 0; i < n; i++) {
    const a = [src[i * 3] - ms[0], src[i * 3 + 1] - ms[1], src[i * 3 + 2] - ms[2]];
    const b = [dst[i * 3] - md[0], dst[i * 3 + 1] - md[1], dst[i * 3 + 2] - md[2]];
    varS += a[0] * a[0] + a[1] * a[1] + a[2] * a[2];
    for (let r = 0; r < 3; r++) for (let c = 0; c < 3; c++) S[r * 3 + c] += b[r] * a[c];
  }
  const { U, s, V } = svd3(S);
  let d = det3(U) * det3(V) < 0 ? -1 : 1;
  const D = [1, 1, d];
  // R = U D V^T
  const R = new Array(9).fill(0);
  for (let r = 0; r < 3; r++)
    for (let c = 0; c < 3; c++) {
      let acc = 0;
      for (let k = 0; k < 3; k++) acc += U[r * 3 + k] * D[k] * V[c * 3 + k];
      R[r * 3 + c] = acc;
    }
  const scale = allowScale ? (s[0] * D[0] + s[1] * D[1] + s[2] * D[2]) / (varS || 1) : 1;
  d = scale;
  const t = [0, 0, 0];
  for (let r = 0; r < 3; r++) t[r] = md[r] - d * (R[r * 3] * ms[0] + R[r * 3 + 1] * ms[1] + R[r * 3 + 2] * ms[2]);
  return [d * R[0], d * R[3], d * R[6], 0, d * R[1], d * R[4], d * R[7], 0, d * R[2], d * R[5], d * R[8], 0, t[0], t[1], t[2], 1];
}

function det3(m: number[]) {
  return m[0] * (m[4] * m[8] - m[5] * m[7]) - m[1] * (m[3] * m[8] - m[5] * m[6]) + m[2] * (m[3] * m[7] - m[4] * m[6]);
}

/** SVD of a 3x3 matrix via eigen decomposition of A^T A (adequate for registration). */
function svd3(A: number[]): { U: number[]; s: number[]; V: number[] } {
  const AtA = new Array(9).fill(0);
  for (let r = 0; r < 3; r++) for (let c = 0; c < 3; c++) for (let k = 0; k < 3; k++) AtA[r * 3 + c] += A[k * 3 + r] * A[k * 3 + c];
  const { values, vectors } = jacobi(AtA);
  const order = [0, 1, 2].sort((a, b) => values[b] - values[a]);
  const V = new Array(9).fill(0);
  const s = [0, 0, 0];
  order.forEach((k, i) => {
    for (let r = 0; r < 3; r++) V[r * 3 + i] = vectors[r * 3 + k];
    s[i] = Math.sqrt(Math.max(0, values[k]));
  });
  const U = new Array(9).fill(0);
  for (let i = 0; i < 3; i++) {
    const v = [V[i], V[3 + i], V[6 + i]];
    const av = [0, 0, 0];
    for (let r = 0; r < 3; r++) av[r] = A[r * 3] * v[0] + A[r * 3 + 1] * v[1] + A[r * 3 + 2] * v[2];
    const l = Math.hypot(av[0], av[1], av[2]);
    if (l > 1e-12) for (let r = 0; r < 3; r++) U[r * 3 + i] = av[r] / l;
  }
  // repair degenerate columns
  for (let i = 0; i < 3; i++) {
    const l = Math.hypot(U[i], U[3 + i], U[6 + i]);
    if (l < 1e-9) {
      const a = [U[(i + 1) % 3], U[3 + ((i + 1) % 3)], U[6 + ((i + 1) % 3)]];
      const b = [U[(i + 2) % 3], U[3 + ((i + 2) % 3)], U[6 + ((i + 2) % 3)]];
      const c = [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];
      U[i] = c[0];
      U[3 + i] = c[1];
      U[6 + i] = c[2];
    }
  }
  return { U, s, V };
}

function jacobi(Ain: number[]) {
  const A = Ain.slice();
  const V = [1, 0, 0, 0, 1, 0, 0, 0, 1];
  for (let sweep = 0; sweep < 60; sweep++) {
    const off = Math.abs(A[1]) + Math.abs(A[2]) + Math.abs(A[5]);
    if (off < 1e-18) break;
    for (const [p, q] of [
      [0, 1],
      [0, 2],
      [1, 2],
    ]) {
      const apq = A[p * 3 + q];
      if (Math.abs(apq) < 1e-20) continue;
      const theta = (A[q * 3 + q] - A[p * 3 + p]) / (2 * apq);
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

/**
 * Iterative closest point. `mode` controls the transform family.
 * Uses symmetric correspondences (src->dst and dst->src) for robustness to partial overlap.
 */
export function icp(
  src: Float32Array,
  dst: Float32Array,
  opts: { mode: "rigid" | "similarity" | "affine"; iterations?: number; init?: Mat4; trim?: number } = { mode: "similarity" },
): Mat4 {
  const treeDst = new KdTree(dst);
  let M = opts.init ?? identity();
  const iters = opts.iterations ?? 40;
  const trim = opts.trim ?? 0.9;
  for (let it = 0; it < iters; it++) {
    const cur = transformPoints(M, src);
    const treeCur = new KdTree(cur);
    const pairs: { s: Vec3; d: Vec3; e: number }[] = [];
    const o = { d2: 0 };
    for (let i = 0; i < cur.length; i += 3) {
      const j = treeDst.nearest(cur[i], cur[i + 1], cur[i + 2], o);
      pairs.push({ s: [src[i], src[i + 1], src[i + 2]], d: [dst[j * 3], dst[j * 3 + 1], dst[j * 3 + 2]], e: o.d2 });
    }
    // reverse correspondences expressed in source coordinates
    const inv = invertAffine(M);
    for (let i = 0; i < dst.length; i += 3) {
      const j = treeCur.nearest(dst[i], dst[i + 1], dst[i + 2], o);
      const sp = applyMat(inv, cur[j * 3], cur[j * 3 + 1], cur[j * 3 + 2]);
      pairs.push({ s: sp, d: [dst[i], dst[i + 1], dst[i + 2]], e: o.d2 });
    }
    pairs.sort((a, b) => a.e - b.e);
    const keep = pairs.slice(0, Math.max(8, Math.floor(pairs.length * trim)));
    const S = new Float64Array(keep.length * 3);
    const D = new Float64Array(keep.length * 3);
    keep.forEach((p, i) => {
      S.set(p.s, i * 3);
      D.set(p.d, i * 3);
    });
    const next =
      opts.mode === "affine" ? fitAffine(S, D) : fitSimilarity(S, D, opts.mode === "similarity");
    const delta = next.reduce((acc, v, i) => acc + Math.abs(v - M[i]), 0);
    M = next;
    if (delta < 1e-7) break;
  }
  return M;
}

export function invertAffine(m: Mat4): Mat4 {
  const a = [m[0], m[4], m[8], m[1], m[5], m[9], m[2], m[6], m[10]];
  const d = det3(a);
  const inv = [
    (a[4] * a[8] - a[5] * a[7]) / d,
    (a[2] * a[7] - a[1] * a[8]) / d,
    (a[1] * a[5] - a[2] * a[4]) / d,
    (a[5] * a[6] - a[3] * a[8]) / d,
    (a[0] * a[8] - a[2] * a[6]) / d,
    (a[2] * a[3] - a[0] * a[5]) / d,
    (a[3] * a[7] - a[4] * a[6]) / d,
    (a[1] * a[6] - a[0] * a[7]) / d,
    (a[0] * a[4] - a[1] * a[3]) / d,
  ];
  const t = [m[12], m[13], m[14]];
  const it = [
    -(inv[0] * t[0] + inv[1] * t[1] + inv[2] * t[2]),
    -(inv[3] * t[0] + inv[4] * t[1] + inv[5] * t[2]),
    -(inv[6] * t[0] + inv[7] * t[1] + inv[8] * t[2]),
  ];
  return [inv[0], inv[3], inv[6], 0, inv[1], inv[4], inv[7], 0, inv[2], inv[5], inv[8], 0, it[0], it[1], it[2], 1];
}

/**
 * Non-rigid registration of a source point set onto a target point set with
 * iterative TPS on a subset of control points (coarse-to-fine regularization).
 * Returns the deformed control points (src subset and where they map).
 */
export function nonRigid(
  src: Float32Array,
  dst: Float32Array,
  opts: { controls?: number; iterations?: number; lambdaStart?: number; lambdaEnd?: number } = {},
): { from: Float32Array; to: Float32Array } {
  const nCtrl = Math.min(opts.controls ?? 150, src.length / 3);
  const step = Math.max(1, Math.floor(src.length / 3 / nCtrl));
  const ctrlIdx: number[] = [];
  for (let i = 0; i < src.length / 3 && ctrlIdx.length < nCtrl; i += step) ctrlIdx.push(i);
  const from = new Float32Array(ctrlIdx.length * 3);
  ctrlIdx.forEach((v, i) => from.set(src.subarray(v * 3, v * 3 + 3), i * 3));
  const treeDst = new KdTree(dst);
  let cur = src.slice();
  let to = from.slice();
  const iters = opts.iterations ?? 8;
  const l0 = opts.lambdaStart ?? 0.05;
  const l1 = opts.lambdaEnd ?? 0.001;
  const o = { d2: 0 };
  for (let it = 0; it < iters; it++) {
    const lambda = l0 * Math.pow(l1 / l0, it / Math.max(1, iters - 1));
    // forward: closest target point for each current source point, averaged into control targets
    const treeCur = new KdTree(cur);
    const acc = new Float64Array(ctrlIdx.length * 3);
    const cnt = new Float64Array(ctrlIdx.length);
    const ctrlTree = new KdTree(Float32Array.from(ctrlIdx.flatMap((v) => [src[v * 3], src[v * 3 + 1], src[v * 3 + 2]])));
    const addPair = (srcI: number, tx: number, ty: number, tz: number) => {
      // assign displacement to the nearest control (in source space)
      const c = ctrlTree.nearest(src[srcI * 3], src[srcI * 3 + 1], src[srcI * 3 + 2]);
      acc[c * 3] += tx - cur[srcI * 3];
      acc[c * 3 + 1] += ty - cur[srcI * 3 + 1];
      acc[c * 3 + 2] += tz - cur[srcI * 3 + 2];
      cnt[c] += 1;
    };
    for (let i = 0; i < cur.length / 3; i++) {
      const j = treeDst.nearest(cur[i * 3], cur[i * 3 + 1], cur[i * 3 + 2], o);
      addPair(i, dst[j * 3], dst[j * 3 + 1], dst[j * 3 + 2]);
    }
    for (let j = 0; j < dst.length / 3; j++) {
      const i = treeCur.nearest(dst[j * 3], dst[j * 3 + 1], dst[j * 3 + 2], o);
      addPair(i, dst[j * 3], dst[j * 3 + 1], dst[j * 3 + 2]);
    }
    const target = new Float64Array(ctrlIdx.length * 3);
    for (let c = 0; c < ctrlIdx.length; c++) {
      const v = ctrlIdx[c];
      const k = cnt[c] || 1;
      target[c * 3] = cur[v * 3] + acc[c * 3] / k;
      target[c * 3 + 1] = cur[v * 3 + 1] + acc[c * 3 + 1] / k;
      target[c * 3 + 2] = cur[v * 3 + 2] + acc[c * 3 + 2] / k;
    }
    const tps = ThinPlateSpline.fit(from, target, lambda);
    cur = src.slice();
    tps.applyAll(cur);
    to = Float32Array.from(target);
  }
  return { from, to };
}
