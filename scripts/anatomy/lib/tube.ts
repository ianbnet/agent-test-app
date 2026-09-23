/**
 * Swept tubes along smooth 3D paths (nerves, cords, small vessels) plus small landmark helpers.
 */
import { bounds, principalAxes, type Mesh, type Vec3 } from "./mesh";

export const add = (a: Vec3, b: Vec3): Vec3 => [a[0] + b[0], a[1] + b[1], a[2] + b[2]];
export const sub = (a: Vec3, b: Vec3): Vec3 => [a[0] - b[0], a[1] - b[1], a[2] - b[2]];
export const scale = (a: Vec3, s: number): Vec3 => [a[0] * s, a[1] * s, a[2] * s];
export const dot = (a: Vec3, b: Vec3) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
export const cross = (a: Vec3, b: Vec3): Vec3 => [a[1] * b[2] - a[2] * b[1], a[2] * b[0] - a[0] * b[2], a[0] * b[1] - a[1] * b[0]];
export const len = (a: Vec3) => Math.hypot(a[0], a[1], a[2]);
export const norm = (a: Vec3): Vec3 => {
  const l = len(a) || 1;
  return [a[0] / l, a[1] / l, a[2] / l];
};
export const lerp = (a: Vec3, b: Vec3, t: number): Vec3 => [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t, a[2] + (b[2] - a[2]) * t];
export const dist = (a: Vec3, b: Vec3) => len(sub(a, b));
export const mirror = (a: Vec3): Vec3 => [-a[0], a[1], a[2]];

/** Centripetal Catmull-Rom through control points, resampled at ~uniform arc length. */
export function smoothPath(ctrl: Vec3[], step = 0.002): Vec3[] {
  if (ctrl.length < 2) return ctrl.slice();
  const pts = [ctrl[0], ...ctrl, ctrl[ctrl.length - 1]];
  const dense: Vec3[] = [];
  for (let i = 1; i < pts.length - 2; i++) {
    const p0 = pts[i - 1];
    const p1 = pts[i];
    const p2 = pts[i + 1];
    const p3 = pts[i + 2];
    const segLen = dist(p1, p2);
    const n = Math.max(2, Math.ceil(segLen / (step * 0.5)));
    const t0 = 0;
    const t1 = t0 + Math.pow(dist(p0, p1) || 1e-6, 0.5);
    const t2 = t1 + Math.pow(dist(p1, p2) || 1e-6, 0.5);
    const t3 = t2 + Math.pow(dist(p2, p3) || 1e-6, 0.5);
    for (let s = 0; s < n; s++) {
      const t = t1 + ((t2 - t1) * s) / n;
      const a1 = lerp(p0, p1, (t - t0) / (t1 - t0));
      const a2 = lerp(p1, p2, (t - t1) / (t2 - t1));
      const a3 = lerp(p2, p3, (t - t2) / (t3 - t2));
      const b1 = lerp(a1, a2, (t - t0) / (t2 - t0));
      const b2 = lerp(a2, a3, (t - t1) / (t3 - t1));
      dense.push(lerp(b1, b2, (t - t1) / (t2 - t1)));
    }
  }
  dense.push(ctrl[ctrl.length - 1]);
  // resample by arc length
  const out: Vec3[] = [dense[0]];
  let acc = 0;
  for (let i = 1; i < dense.length; i++) {
    acc += dist(dense[i - 1], dense[i]);
    if (acc >= step) {
      out.push(dense[i]);
      acc = 0;
    }
  }
  if (dist(out[out.length - 1], dense[dense.length - 1]) > step * 0.3) out.push(dense[dense.length - 1]);
  else out[out.length - 1] = dense[dense.length - 1];
  return out;
}

export interface TubeOptions {
  /** Radius at normalized arc length t in [0,1]; may return [rx, ry] for elliptical sections. */
  radius: number | ((t: number) => number | [number, number]);
  segments?: number;
  step?: number;
  /** Fixed direction used to orient the section's first axis (e.g. patient's left for the cord). */
  sideHint?: Vec3;
  caps?: boolean;
  /** Skip spline smoothing when the input is already dense. */
  raw?: boolean;
}

export function tube(ctrl: Vec3[], opts: TubeOptions): Mesh {
  const path = opts.raw ? ctrl : smoothPath(ctrl, opts.step ?? 0.002);
  const n = path.length;
  if (n < 2) return { positions: new Float32Array(0), indices: new Uint32Array(0) };
  const seg = opts.segments ?? 8;
  const tangents: Vec3[] = path.map((_, i) => norm(sub(path[Math.min(n - 1, i + 1)], path[Math.max(0, i - 1)])));
  // frames
  const normals: Vec3[] = [];
  let ref: Vec3 = Math.abs(tangents[0][1]) < 0.9 ? [0, 1, 0] : [1, 0, 0];
  for (let i = 0; i < n; i++) {
    const t = tangents[i];
    let nrm: Vec3;
    if (opts.sideHint) {
      nrm = sub(opts.sideHint, scale(t, dot(opts.sideHint, t)));
      if (len(nrm) < 1e-6) nrm = sub(ref, scale(t, dot(ref, t)));
    } else {
      nrm = sub(ref, scale(t, dot(ref, t)));
    }
    nrm = norm(nrm);
    normals.push(nrm);
    ref = nrm; // parallel transport approximation
  }
  const lengths = [0];
  for (let i = 1; i < n; i++) lengths.push(lengths[i - 1] + dist(path[i - 1], path[i]));
  const total = lengths[n - 1] || 1;
  const positions: number[] = [];
  const indices: number[] = [];
  for (let i = 0; i < n; i++) {
    const t = tangents[i];
    const a = normals[i];
    const b = cross(t, a);
    const rr = typeof opts.radius === "number" ? opts.radius : opts.radius(lengths[i] / total);
    const [rx, ry] = Array.isArray(rr) ? rr : [rr, rr];
    for (let s = 0; s < seg; s++) {
      const ang = (s / seg) * Math.PI * 2;
      const c = Math.cos(ang) * rx;
      const d = Math.sin(ang) * ry;
      positions.push(path[i][0] + a[0] * c + b[0] * d, path[i][1] + a[1] * c + b[1] * d, path[i][2] + a[2] * c + b[2] * d);
    }
  }
  for (let i = 0; i < n - 1; i++)
    for (let s = 0; s < seg; s++) {
      const a = i * seg + s;
      const b = i * seg + ((s + 1) % seg);
      const c = (i + 1) * seg + s;
      const d = (i + 1) * seg + ((s + 1) % seg);
      indices.push(a, c, b, b, c, d);
    }
  if (opts.caps !== false) {
    const startC = positions.length / 3;
    positions.push(...path[0]);
    const endC = positions.length / 3;
    positions.push(...path[n - 1]);
    for (let s = 0; s < seg; s++) {
      indices.push(startC, s, (s + 1) % seg);
      indices.push(endC, (n - 1) * seg + ((s + 1) % seg), (n - 1) * seg + s);
    }
  }
  return { positions: new Float32Array(positions), indices: new Uint32Array(indices) };
}

/** Ellipsoid mesh (for ganglia, nodes, glands). */
export function ellipsoid(center: Vec3, radii: Vec3, axes: [Vec3, Vec3, Vec3] = [[1, 0, 0], [0, 1, 0], [0, 0, 1]], seg = 12): Mesh {
  const positions: number[] = [];
  const indices: number[] = [];
  const rings = Math.max(4, Math.round(seg / 2));
  for (let i = 0; i <= rings; i++) {
    const v = (i / rings) * Math.PI;
    for (let j = 0; j < seg; j++) {
      const u = (j / seg) * Math.PI * 2;
      const lx = Math.sin(v) * Math.cos(u) * radii[0];
      const ly = Math.cos(v) * radii[1];
      const lz = Math.sin(v) * Math.sin(u) * radii[2];
      positions.push(
        center[0] + axes[0][0] * lx + axes[1][0] * ly + axes[2][0] * lz,
        center[1] + axes[0][1] * lx + axes[1][1] * ly + axes[2][1] * lz,
        center[2] + axes[0][2] * lx + axes[1][2] * ly + axes[2][2] * lz,
      );
    }
  }
  for (let i = 0; i < rings; i++)
    for (let j = 0; j < seg; j++) {
      const a = i * seg + j;
      const b = i * seg + ((j + 1) % seg);
      const c = (i + 1) * seg + j;
      const d = (i + 1) * seg + ((j + 1) % seg);
      indices.push(a, b, c, b, d, c);
    }
  return { positions: new Float32Array(positions), indices: new Uint32Array(indices) };
}

/** Centerline of an elongated mesh: slice along its principal axis and take section centroids. */
export function centerline(m: Mesh, slices = 20, start?: Vec3): Vec3[] {
  const pa = principalAxes(m.positions);
  const ax = pa.axes[0];
  const c = pa.center;
  const bins: { s: Vec3; n: number }[] = Array.from({ length: slices }, () => ({ s: [0, 0, 0] as Vec3, n: 0 }));
  const ext = pa.extents[0] || 1e-6;
  for (let i = 0; i < m.positions.length; i += 3) {
    const p: Vec3 = [m.positions[i], m.positions[i + 1], m.positions[i + 2]];
    const t = (dot(sub(p, c), ax) + ext) / (2 * ext);
    const b = Math.min(slices - 1, Math.max(0, Math.floor(t * slices)));
    bins[b].s = add(bins[b].s, p);
    bins[b].n++;
  }
  let out = bins.filter((b) => b.n > 0).map((b) => scale(b.s, 1 / b.n));
  if (start && dist(out[out.length - 1], start) < dist(out[0], start)) out = out.reverse();
  return out;
}

/** Vertex of `m` that maximizes dot(p, dir). */
export function extreme(m: Mesh, dir: Vec3): Vec3 {
  let best = -Infinity;
  let bi = 0;
  for (let i = 0; i < m.positions.length; i += 3) {
    const d = m.positions[i] * dir[0] + m.positions[i + 1] * dir[1] + m.positions[i + 2] * dir[2];
    if (d > best) {
      best = d;
      bi = i;
    }
  }
  return [m.positions[bi], m.positions[bi + 1], m.positions[bi + 2]];
}

export function nearestVertex(m: Mesh, p: Vec3): Vec3 {
  let best = Infinity;
  let bi = 0;
  for (let i = 0; i < m.positions.length; i += 3) {
    const d = (m.positions[i] - p[0]) ** 2 + (m.positions[i + 1] - p[1]) ** 2 + (m.positions[i + 2] - p[2]) ** 2;
    if (d < best) {
      best = d;
      bi = i;
    }
  }
  return [m.positions[bi], m.positions[bi + 1], m.positions[bi + 2]];
}

export function center(m: Mesh): Vec3 {
  const b = bounds(m);
  return [(b.min[0] + b.max[0]) / 2, (b.min[1] + b.max[1]) / 2, (b.min[2] + b.max[2]) / 2];
}

/** Point on polyline at normalized arc length t. */
export function along(path: Vec3[], t: number): Vec3 {
  const lens = [0];
  for (let i = 1; i < path.length; i++) lens.push(lens[i - 1] + dist(path[i - 1], path[i]));
  const target = Math.max(0, Math.min(1, t)) * lens[lens.length - 1];
  for (let i = 1; i < path.length; i++) {
    if (lens[i] >= target) {
      const f = (target - lens[i - 1]) / (lens[i] - lens[i - 1] || 1);
      return lerp(path[i - 1], path[i], f);
    }
  }
  return path[path.length - 1];
}

/** Sub-path between normalized arc lengths. */
export function slicePath(path: Vec3[], t0: number, t1: number, n = 12): Vec3[] {
  const out: Vec3[] = [];
  for (let i = 0; i <= n; i++) out.push(along(path, t0 + ((t1 - t0) * i) / n));
  return out;
}

/** Offset every point of a path by a constant vector. */
export function offsetPath(path: Vec3[], d: Vec3): Vec3[] {
  return path.map((p) => add(p, d));
}
