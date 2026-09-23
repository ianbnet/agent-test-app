/**
 * Female archetype: the complete BodyParts3D-based model is re-posed and warped into the body of
 * the Visible Human Female (Human Reference Atlas, CC BY 4.0), whose real skin, pelvis,
 * lower-limb bones, knee cartilages, sternum, spinal discs and sex-specific organs (uterus,
 * uterine tubes, ovaries, mammary glands) are then used directly.
 *
 * Pipeline:
 *  1. Articulated re-posing of the male arms (shoulder & elbow rotations, soft skinning weights
 *     from the nearest bone) so they point like the female's A-pose.
 *  2. A thin-plate spline fitted to correspondences on the spine discs, pelvis, leg bones and
 *     sternum (affine ICP per bone), organs, arms (matched by position along/around the limb)
 *     and the body surface. Correspondences that disagree with more trusted neighbours, or
 *     whose displacements change faster than a Lipschitz bound allows, are dropped so the
 *     spline cannot fold.
 *  3. Replacement of male-specific structures and insertion of the female ones.
 */
import { bounds, centroid, computeNormals, mergeMeshes, principalAxes, samplePoints, type Mesh, type Vec3 } from "./lib/mesh";
import { KdTree } from "./lib/kdtree";
import { fitSimilarity, icp, transformPoints, type Mat4 } from "./lib/register";
import { ThinPlateSpline } from "./lib/tps";
import { add, cross, dist, dot, extreme, lerp, len, norm, scale, sub, tube } from "./lib/tube";
import { loadHra } from "./sources";
import { generatedStructure, queryMesh } from "./generators/context";
import { prepareMesh, type BuiltStructure } from "./export";
import { slug, titleCase, type StructureSpec } from "./catalog";
import type { GroupId, Layer, Side, SystemId } from "../../shared/anatomy";

type Pairs = { src: number[]; dst: number[]; lambda: number[] };

function addPairs(p: Pairs, src: ArrayLike<number>, dst: ArrayLike<number>, lambda: number) {
  for (let i = 0; i < src.length; i++) {
    p.src.push(src[i]);
    p.dst.push(dst[i]);
  }
  for (let i = 0; i < src.length / 3; i++) p.lambda.push(lambda);
}

const ORD12 = ["first", "second", "third", "fourth", "fifth", "sixth", "seventh", "eighth", "ninth", "tenth", "eleventh", "twelfth"];
/** Disc levels: [BodyParts3D name, HRA node name, catalog concept]. */
const DISCS: [RegExp, RegExp, string][] = [
  [/^intervertebral disk of axis$/i, /^intervertebral_disk_of_axis$/, "intervertebral-disc-below-axis"],
  ...["third", "fourth", "fifth", "sixth", "seventh"].map((o): [RegExp, RegExp, string] => [
    new RegExp(`^intervertebral disk of ${o} cervical vertebra$`, "i"),
    new RegExp(`^intervertebral_disk_of_${o}_cervical_vertebra$`),
    `intervertebral-disc-below-${o}-cervical`,
  ]),
  ...ORD12.map((o): [RegExp, RegExp, string] => [
    o === "twelfth" ? /^intervertebral disk$/i : new RegExp(`^intervertebral disk of ${o} thoracic vertebra$`, "i"),
    new RegExp(`^intervertebral_disk_of_${o}_thoracic_vertebra$`),
    `intervertebral-disc-below-${o}-thoracic`,
  ]),
  ...ORD12.slice(0, 5).map((o): [RegExp, RegExp, string] => [
    new RegExp(`^intervertebral disk of ${o} lumbar vertebra$`, "i"),
    new RegExp(`^intervertebral_disk_of_${o}_lumbar_vertebra$`),
    `intervertebral-disc-below-${o}-lumbar`,
  ]),
];

/** Five robust landmarks of a disc-like mesh: centroid and the extreme points along ±x and ±z. */
function discPoints(m: Mesh): number[] {
  const c = centroid(m);
  return [...c, ...extreme(m, [1, 0, 0]), ...extreme(m, [-1, 0, 0]), ...extreme(m, [0, 0, 1]), ...extreme(m, [0, 0, -1])];
}

export interface FemaleSources {
  files: Map<string, Map<string, Mesh>>;
  get(file: string, re: RegExp): Mesh;
  has(file: string, re: RegExp): boolean;
}

export async function loadFemaleSources(): Promise<FemaleSources> {
  const names = [
    "skin",
    "pelvis",
    "knee-l",
    "knee-r",
    "sternum",
    "manubrium",
    "intervertebral-disk",
    "heart",
    "lung",
    "liver",
    "kidney-l",
    "kidney-r",
    "urinary-bladder",
    "spleen",
    "trachea",
    "larynx",
    "eye-l",
    "eye-r",
    "uterus",
    "ovary-l",
    "ovary-r",
    "fallopian-tube-l",
    "fallopian-tube-r",
    "mammary-gland-l",
    "mammary-gland-r",
  ];
  const files = new Map<string, Map<string, Mesh>>();
  for (const n of names) files.set(n, await loadHra(`3d-vh-f-${n}.glb`));
  files.set("large-intestine", await loadHra("3d-sbu-f-large-intestine.glb"));
  const find = (file: string, re: RegExp) => {
    const f = files.get(file);
    if (!f) throw new Error(`HRA file not loaded: ${file}`);
    return [...f.entries()].filter(([k]) => re.test(k)).map(([, v]) => v);
  };
  return {
    files,
    get(file, re) {
      const hits = find(file, re);
      if (!hits.length) throw new Error(`no HRA node in ${file} matches ${re}`);
      return mergeMeshes(hits);
    },
    has(file, re) {
      return find(file, re).length > 0;
    },
  };
}

// ------------------------------------------------------------------------------------------
// Limb geometry helpers
// ------------------------------------------------------------------------------------------

interface LimbFrame {
  joints: Vec3[];
  cum: number[];
}

function limbFrame(joints: Vec3[]): LimbFrame {
  const cum = [0];
  for (let i = 1; i < joints.length; i++) cum.push(cum[i - 1] + dist(joints[i - 1], joints[i]));
  return { joints, cum };
}

function limbCoords(f: LimbFrame, p: Vec3): { t: number; r: number; theta: number } {
  let best = { d: Infinity, t: 0, seg: 0, u: 0 };
  for (let i = 0; i < f.joints.length - 1; i++) {
    const a = f.joints[i];
    const ab = sub(f.joints[i + 1], a);
    const L = dot(ab, ab) || 1e-12;
    const u = Math.max(0, Math.min(1, dot(sub(p, a), ab) / L));
    const d = dist(p, add(a, scale(ab, u)));
    if (d < best.d) best = { d, t: (f.cum[i] + u * Math.sqrt(L)) / f.cum[f.cum.length - 1], seg: i, u };
  }
  const a = f.joints[best.seg];
  const b = f.joints[best.seg + 1];
  const axis = norm(sub(b, a));
  const radial = sub(p, add(a, scale(sub(b, a), best.u)));
  const ref = norm(sub([0, 0, 1], scale(axis, axis[2])));
  const side = norm(cross(axis, ref));
  return { t: best.t, r: best.d, theta: Math.atan2(dot(radial, side), dot(radial, ref)) };
}

/** Centroid of the vertices within the extreme `frac` of the extent along `axis`. */
function capCentroid(m: Mesh | Float32Array, axis: Vec3, frac: number): Vec3 {
  const P = m instanceof Float32Array ? m : m.positions;
  let mn = Infinity;
  let mx = -Infinity;
  for (let i = 0; i < P.length; i += 3) {
    const d = P[i] * axis[0] + P[i + 1] * axis[1] + P[i + 2] * axis[2];
    mn = Math.min(mn, d);
    mx = Math.max(mx, d);
  }
  let sx = 0;
  let sy = 0;
  let sz = 0;
  let n = 0;
  for (let i = 0; i < P.length; i += 3) {
    const d = P[i] * axis[0] + P[i + 1] * axis[1] + P[i + 2] * axis[2];
    if (d >= mx - (mx - mn) * frac) {
      sx += P[i];
      sy += P[i + 1];
      sz += P[i + 2];
      n++;
    }
  }
  return [sx / n, sy / n, sz / n];
}

function rotationBetween(a: Vec3, b: Vec3): number[] {
  const u = norm(a);
  const v = norm(b);
  const c = dot(u, v);
  const k = cross(u, v);
  const s = len(k);
  if (s < 1e-9) return [1, 0, 0, 0, 1, 0, 0, 0, 1];
  const n = scale(k, 1 / s);
  const t = 1 - c;
  // Rodrigues (row-major)
  return [
    c + n[0] * n[0] * t,
    n[0] * n[1] * t - n[2] * s,
    n[0] * n[2] * t + n[1] * s,
    n[1] * n[0] * t + n[2] * s,
    c + n[1] * n[1] * t,
    n[1] * n[2] * t - n[0] * s,
    n[2] * n[0] * t - n[1] * s,
    n[2] * n[1] * t + n[0] * s,
    c + n[2] * n[2] * t,
  ];
}
const rot = (R: number[], v: Vec3): Vec3 => [R[0] * v[0] + R[1] * v[1] + R[2] * v[2], R[3] * v[0] + R[4] * v[1] + R[5] * v[2], R[6] * v[0] + R[7] * v[1] + R[8] * v[2]];

const smoothstep = (a: number, b: number, x: number) => {
  const t = Math.max(0, Math.min(1, (x - a) / (b - a)));
  return t * t * (3 - 2 * t);
};

interface ArmSetup {
  s: 1 | -1;
  male: LimbFrame; // S, E, W, tip (original male)
  posed: LimbFrame; // after re-posing
  female: LimbFrame;
  R1: number[];
  R2: number[];
}

function armSetups(male: BuiltStructure[], femSkin: Mesh): ArmSetup[] {
  const bone = (re: RegExp) => mergeMeshes(male.filter((b) => re.test(b.spec.id)).map((b) => b.mesh));
  const out: ArmSetup[] = [];
  for (const s of [1, -1] as const) {
    const sl = s > 0 ? "l" : "r";
    const hum = bone(new RegExp(`^humerus-${sl}$`));
    const rad = bone(new RegExp(`^radius-${sl}$`));
    const uln = bone(new RegExp(`^ulna-${sl}$`));
    const tip = extreme(bone(new RegExp(`^phalanges-of-middle-finger-${sl}$`)), [0, -1, 0]);
    const S = capCentroid(hum, [0, 1, 0], 0.08);
    const E = capCentroid(hum, [0, -1, 0], 0.06);
    const W = lerp(capCentroid(rad, [0, -1, 0], 0.05), capCentroid(uln, [0, -1, 0], 0.05), 0.5);
    const maleArm = limbFrame([S, E, W, tip]);
    // female arm axis from clearly-arm skin vertices; joints placed at the male proportions
    const pts: number[] = [];
    for (let i = 0; i < femSkin.positions.length; i += 3) if (femSkin.positions[i] * s > 0.22) pts.push(femSkin.positions[i], femSkin.positions[i + 1], femSkin.positions[i + 2]);
    const arr = Float32Array.from(pts);
    let ax = principalAxes(arr).axes[0];
    if (ax[1] < 0) ax = scale(ax, -1);
    const tipF = extreme({ positions: arr, indices: new Uint32Array(0) }, scale(ax, -1));
    const Sf = add(capCentroid(arr, ax, 0.06), [-s * 0.012, -0.012, 0]);
    const dirF = norm(sub(tipF, Sf));
    const Lf = dist(Sf, tipF);
    const Lm = maleArm.cum[3];
    const Ef = add(Sf, scale(dirF, (maleArm.cum[1] / Lm) * Lf));
    const Wf = add(Sf, scale(dirF, (maleArm.cum[2] / Lm) * Lf));
    const femArm = limbFrame([Sf, Ef, Wf, tipF]);
    // rotations about the shoulder (upper arm) and elbow (forearm + hand)
    const R1 = rotationBetween(sub(E, S), sub(Ef, Sf));
    const E2 = add(S, rot(R1, sub(E, S)));
    const R2 = rotationBetween(sub(W, E), sub(Wf, Ef));
    const W2 = add(E2, rot(R2, sub(W, E)));
    const tip2 = add(E2, rot(R2, sub(tip, E)));
    out.push({ s, male: maleArm, posed: limbFrame([S, E2, W2, tip2]), female: femArm, R1, R2 });
  }
  return out;
}

/**
 * Re-pose the male arms. Skinning weights: "armness" from the nearest bone (arm bones vs the
 * rest, softened near the shoulder), and the upper-arm/forearm split blended across the elbow.
 */
function poseArms(male: BuiltStructure[], arms: ArmSetup[]): BuiltStructure[] {
  const armBone = /^(humerus|radius|ulna|scaphoid-bone|lunate-bone|triquetral-bone|pisiform-bone|trapezium-bone|trapezoid-bone|capitate-bone|hamate-bone|first-metacarpal|second-metacarpal|third-metacarpal|fourth-metacarpal|fifth-metacarpal|phalanges-of-(thumb|index-finger|middle-finger|ring-finger|little-finger))-[lr]$/;
  const bonePts: number[] = [];
  const boneLab: number[] = [];
  for (const b of male) {
    if (b.spec.group !== "bone") continue;
    const m = b.mesh;
    const isArm = armBone.test(b.spec.id);
    const label = isArm ? (b.spec.side === "left" ? 1 : 2) : 0;
    const step = Math.max(1, Math.floor(m.positions.length / 3 / 400));
    for (let i = 0; i < m.positions.length / 3; i += step) {
      bonePts.push(m.positions[i * 3], m.positions[i * 3 + 1], m.positions[i * 3 + 2]);
      boneLab.push(label);
    }
  }
  const tree = new KdTree(Float32Array.from(bonePts));
  const armFor = (label: number) => arms.find((a) => (label === 1 ? a.s > 0 : a.s < 0))!;
  const near: number[] = [];
  const out: BuiltStructure[] = [];
  for (const b of male) {
    const m = b.mesh;
    const P = new Float32Array(m.positions.length);
    for (let v = 0; v < m.positions.length / 3; v++) {
      const p: Vec3 = [m.positions[v * 3], m.positions[v * 3 + 1], m.positions[v * 3 + 2]];
      // soft armness from bone labels within a small neighbourhood
      near.length = 0;
      tree.radius(p[0], p[1], p[2], 0.03, near);
      let wArm = 0;
      let wTot = 0;
      let label = 0;
      if (near.length) {
        for (const k of near) {
          const d = Math.hypot(bonePts[k * 3] - p[0], bonePts[k * 3 + 1] - p[1], bonePts[k * 3 + 2] - p[2]);
          const w = 1 / (d + 0.004) ** 2;
          wTot += w;
          if (boneLab[k]) {
            wArm += w;
            label = boneLab[k];
          }
        }
      } else {
        const j = tree.nearest(p[0], p[1], p[2]);
        label = boneLab[j];
        wArm = label ? 1 : 0;
        wTot = 1;
      }
      let a = wTot ? wArm / wTot : 0;
      if (!label) {
        P.set(p, v * 3);
        continue;
      }
      const arm = armFor(label);
      const c = limbCoords(arm.male, p);
      // shoulder transition: soften armness close to the joint
      a *= smoothstep(-0.02, 0.1, c.t);
      const tE = arm.male.cum[1] / arm.male.cum[3];
      const wf = smoothstep(tE - 0.035, tE + 0.035, c.t);
      const S = arm.male.joints[0];
      const E = arm.male.joints[1];
      const E2 = arm.posed.joints[1];
      const p1 = add(S, rot(arm.R1, sub(p, S)));
      const p2 = add(E2, rot(arm.R2, sub(p, E)));
      const posed = lerp(p1, p2, wf);
      P.set(lerp(p, posed, a), v * 3);
    }
    out.push({ spec: b.spec, mesh: { positions: P, indices: m.indices }, prepared: b.prepared });
  }
  return out;
}

// ------------------------------------------------------------------------------------------
// Correspondences
// ------------------------------------------------------------------------------------------

/**
 * Correspondences between a male bone and its female counterpart: an affine ICP fit (robust
 * for every bone tested, typically 3–10 mm from the target surface), with each sample then
 * snapped onto the target surface when it is already within a few millimetres of it.
 */
function boneCorrespondences(src: Mesh, dst: Mesh, init: Mat4, n = 500, count = 60, label = ""): { from: Float32Array; to: Float32Array } {
  const sp = samplePoints(src, n, 11);
  const dp = samplePoints(dst, n * 2, 13);
  const aff = icp(sp, dp, { mode: "affine", init, iterations: 30, trim: 0.85 });
  const step = Math.max(1, Math.floor(sp.length / 3 / count));
  const idx: number[] = [];
  for (let i = 0; i < sp.length / 3; i += step) idx.push(i);
  const from = Float32Array.from(idx.flatMap((i) => [sp[i * 3], sp[i * 3 + 1], sp[i * 3 + 2]]));
  const to = transformPoints(aff, from);
  const dstTree = new KdTree(dst.positions);
  const o = { d2: 0 };
  let gap = 0;
  for (let i = 0; i < to.length; i += 3) {
    const j = dstTree.nearest(to[i], to[i + 1], to[i + 2], o);
    const d = Math.sqrt(o.d2);
    if (d < 0.008) for (let k = 0; k < 3; k++) to[i + k] = dst.positions[j * 3 + k];
    gap += d;
  }
  if (process.env.ANATOMY_DEBUG) console.log(`   bone ${label}: affine gap ${((gap / (to.length / 3)) * 1000).toFixed(1)} mm`);
  return { from, to };
}

/** Match limb skin by (arc length along the limb, angle around it) on an unrolled cylinder. */
function matchLimb(mf: LimbFrame, ff: LimbFrame, maleSkin: Mesh, femSkin: Mesh, s: 1 | -1, tMin: number, rMax: number, pairs: Pairs, mask: Uint8Array, lambda: number) {
  const Lf = ff.cum[ff.cum.length - 1];
  const fPts: number[] = [];
  const fIdx: number[] = [];
  const P = femSkin.positions;
  for (let i = 0; i < P.length; i += 3) {
    if (P[i] * s <= 0) continue;
    const c = limbCoords(ff, [P[i], P[i + 1], P[i + 2]]);
    if (c.t < tMin * 0.8 || c.r > rMax * 1.3) continue;
    fPts.push(c.t * Lf, Math.cos(c.theta) * 0.04, Math.sin(c.theta) * 0.04);
    fIdx.push(i / 3);
  }
  const tree = new KdTree(Float32Array.from(fPts));
  const M = maleSkin.positions;
  const cand: number[] = [];
  for (let v = 0; v < M.length / 3; v++) {
    if (M[v * 3] * s <= 0) continue;
    const c = limbCoords(mf, [M[v * 3], M[v * 3 + 1], M[v * 3 + 2]]);
    if (c.r > rMax || c.t < tMin) continue;
    mask[v] = 1;
    cand.push(v);
  }
  const src: number[] = [];
  const dst: number[] = [];
  const step = Math.max(1, Math.floor(cand.length / 200));
  for (let k = 0; k < cand.length; k += step) {
    const v = cand[k];
    const p: Vec3 = [M[v * 3], M[v * 3 + 1], M[v * 3 + 2]];
    const c = limbCoords(mf, p);
    const j = tree.nearest(c.t * Lf, Math.cos(c.theta) * 0.04, Math.sin(c.theta) * 0.04);
    if (j < 0) continue;
    const fv = fIdx[j];
    src.push(...p);
    dst.push(P[fv * 3], P[fv * 3 + 1], P[fv * 3 + 2]);
  }
  addPairs(pairs, src, dst, lambda);
}

/**
 * Drop correspondences whose displacement disagrees with their neighbours' (median of the
 * displacements within `radius` in source space) by more than `tol`: conflicting constraints
 * make a thin-plate spline oscillate wildly.
 */
function rejectInconsistent(p: Pairs, radius: number, tol: number): Pairs {
  const n = p.lambda.length;
  const tree = new KdTree(Float32Array.from(p.src));
  const out: Pairs = { src: [], dst: [], lambda: [] };
  const near: number[] = [];
  let dropped = 0;
  for (let i = 0; i < n; i++) {
    near.length = 0;
    tree.radius(p.src[i * 3], p.src[i * 3 + 1], p.src[i * 3 + 2], radius, near);
    // judge a pair only by neighbours at least as trustworthy (bones are not outvoted by skin)
    const peers = near.filter((j) => p.lambda[j] <= p.lambda[i] * 1.5);
    near.length = 0;
    near.push(...peers);
    if (near.length >= 4) {
      const med = [0, 1, 2].map((k) => {
        const vals = near.map((j) => p.dst[j * 3 + k] - p.src[j * 3 + k]).sort((a, b) => a - b);
        return vals[vals.length >> 1];
      });
      const di = [0, 1, 2].map((k) => p.dst[i * 3 + k] - p.src[i * 3 + k]);
      if (Math.hypot(di[0] - med[0], di[1] - med[1], di[2] - med[2]) > tol) {
        dropped++;
        continue;
      }
    }
    out.src.push(p.src[i * 3], p.src[i * 3 + 1], p.src[i * 3 + 2]);
    out.dst.push(p.dst[i * 3], p.dst[i * 3 + 1], p.dst[i * 3 + 2]);
    out.lambda.push(p.lambda[i]);
  }
  void dropped;
  return out;
}

/**
 * Enforce a bound on how fast the displacement may change between correspondences:
 * |d_i - d_j| <= K |s_i - s_j| + eps. A displacement field with gradient below 1 cannot fold, so
 * pairs that violate the bound are removed, blaming the less trusted (higher lambda) member,
 * worst offenders first, until every pair is consistent with its neighbours.
 */
function enforceLipschitz(p: Pairs, K: number, radius: number, eps: number): Pairs {
  let cur = p;
  for (let round = 0; round < 40; round++) {
    const n = cur.lambda.length;
    const tree = new KdTree(Float32Array.from(cur.src));
    const blame = new Float32Array(n);
    const near: number[] = [];
    let violations = 0;
    for (let i = 0; i < n; i++) {
      near.length = 0;
      tree.radius(cur.src[i * 3], cur.src[i * 3 + 1], cur.src[i * 3 + 2], radius, near);
      for (const j of near) {
        if (j <= i) continue;
        const ds = Math.hypot(cur.src[i * 3] - cur.src[j * 3], cur.src[i * 3 + 1] - cur.src[j * 3 + 1], cur.src[i * 3 + 2] - cur.src[j * 3 + 2]);
        const dd = Math.hypot(
          cur.dst[i * 3] - cur.src[i * 3] - (cur.dst[j * 3] - cur.src[j * 3]),
          cur.dst[i * 3 + 1] - cur.src[i * 3 + 1] - (cur.dst[j * 3 + 1] - cur.src[j * 3 + 1]),
          cur.dst[i * 3 + 2] - cur.src[i * 3 + 2] - (cur.dst[j * 3 + 2] - cur.src[j * 3 + 2]),
        );
        const excess = dd - (K * ds + eps);
        if (excess <= 0) continue;
        violations++;
        const li = cur.lambda[i];
        const lj = cur.lambda[j];
        if (li > lj * 1.5) blame[i] += excess;
        else if (lj > li * 1.5) blame[j] += excess;
        else {
          blame[i] += excess;
          blame[j] += excess;
        }
      }
    }
    if (!violations) break;
    // drop the worst ~4% of blamed pairs (at least one) and recount
    const blamed = [...blame.keys()].filter((i) => blame[i] > 0).sort((a, b) => blame[b] - blame[a]);
    const drop = new Set(blamed.slice(0, Math.max(1, Math.ceil(blamed.length * 0.08))));
    const next: Pairs = { src: [], dst: [], lambda: [] };
    for (let i = 0; i < n; i++) {
      if (drop.has(i)) continue;
      next.src.push(cur.src[i * 3], cur.src[i * 3 + 1], cur.src[i * 3 + 2]);
      next.dst.push(cur.dst[i * 3], cur.dst[i * 3 + 1], cur.dst[i * 3 + 2]);
      next.lambda.push(cur.lambda[i]);
    }
    if (process.env.ANATOMY_DEBUG) console.log(`   lipschitz round ${round}: ${violations} violations, dropped ${drop.size}`);
    cur = next;
  }
  return cur;
}

/** Jacobian determinant of the spline (central differences). */
function jacobianDet(tps: ThinPlateSpline, p: Vec3, h = 0.003): number {
  const a: Vec3 = [0, 0, 0];
  const b: Vec3 = [0, 0, 0];
  const col = (k: number): Vec3 => {
    const d: Vec3 = [0, 0, 0];
    d[k] = h;
    tps.apply(p[0] + d[0], p[1] + d[1], p[2] + d[2], a);
    tps.apply(p[0] - d[0], p[1] - d[1], p[2] - d[2], b);
    return [(a[0] - b[0]) / (2 * h), (a[1] - b[1]) / (2 * h), (a[2] - b[2]) / (2 * h)];
  };
  const x = col(0);
  const y = col(1);
  const z = col(2);
  return dot(x, cross(y, z));
}

/**
 * Correspondences sitting where the spline folds or collapses (det J outside [0.25, 4]):
 * report the one in each cluster whose displacement deviates most from its neighbours'.
 */
function foldingPairs(tps: ThinPlateSpline, p: Pairs): Set<number> {
  const n = p.lambda.length;
  const bad = new Set<number>();
  const tree = new KdTree(Float32Array.from(p.src));
  const near: number[] = [];
  for (let i = 0; i < n; i++) {
    const q: Vec3 = [p.src[i * 3], p.src[i * 3 + 1], p.src[i * 3 + 2]];
    const det = jacobianDet(tps, q);
    if (det > 0.25 && det < 4) continue;
    near.length = 0;
    tree.radius(q[0], q[1], q[2], 0.05, near);
    // worst offender in the neighbourhood by deviation from the neighbourhood median displacement
    const med = [0, 1, 2].map((k) => {
      const vals = near.map((j) => p.dst[j * 3 + k] - p.src[j * 3 + k]).sort((u, v) => u - v);
      return vals[vals.length >> 1];
    });
    let worst = -1;
    let wd = -1;
    for (const j of near) {
      const dev = Math.hypot(p.dst[j * 3] - p.src[j * 3] - med[0], p.dst[j * 3 + 1] - p.src[j * 3 + 1] - med[1], p.dst[j * 3 + 2] - p.src[j * 3 + 2] - med[2]);
      if (dev > wd) {
        wd = dev;
        worst = j;
      }
    }
    if (worst >= 0) bad.add(worst);
  }
  return bad;
}

function thinPairs(src: number[], dst: number[], radius: number) {
  const keepS: number[] = [];
  const keepD: number[] = [];
  const grid = new Map<string, number[]>();
  for (let i = 0; i < src.length; i += 3) {
    const x = src[i];
    const y = src[i + 1];
    const z = src[i + 2];
    const cx = Math.floor(x / radius);
    const cy = Math.floor(y / radius);
    const cz = Math.floor(z / radius);
    let ok = true;
    for (let a = -1; a <= 1 && ok; a++)
      for (let b = -1; b <= 1 && ok; b++)
        for (let c = -1; c <= 1 && ok; c++) {
          const list = grid.get(`${cx + a},${cy + b},${cz + c}`);
          if (list) for (const k of list) if (Math.hypot(keepS[k] - x, keepS[k + 1] - y, keepS[k + 2] - z) < radius) ok = false;
        }
    if (!ok) continue;
    const idx = keepS.length;
    keepS.push(x, y, z);
    keepD.push(dst[i], dst[i + 1], dst[i + 2]);
    const key = `${cx},${cy},${cz}`;
    const l = grid.get(key) ?? [];
    l.push(idx);
    grid.set(key, l);
  }
  return { src: keepS, dst: keepD };
}

export async function registerFemale(posed: BuiltStructure[], F: FemaleSources, arms: ArmSetup[]): Promise<ThinPlateSpline> {
  const t0 = Date.now();
  const pairs: Pairs = { src: [], dst: [], lambda: [] };
  const byId = (re: RegExp) => mergeMeshes(posed.filter((b) => re.test(b.spec.id)).map((b) => b.mesh));

  // spine discs, level by level
  const discSrc: number[] = [];
  const discDst: number[] = [];
  for (const [, hraRe, concept] of DISCS) {
    if (!F.has("intervertebral-disk", hraRe)) continue;
    const s = byId(new RegExp(`^${concept}$`));
    if (!s.indices.length) continue;
    discSrc.push(...discPoints(s));
    discDst.push(...discPoints(F.get("intervertebral-disk", hraRe)));
  }
  const global = fitSimilarity(discSrc, discDst, true);
  addPairs(pairs, discSrc, discDst, 1e-5);

  // pelvis, lower limb bones, sternum
  const boneMap: [RegExp, string, RegExp, number][] = [
    [/^hip-bone-r$/, "pelvis", /^(ilium|ischium|pubis)_compact_bone_R$/, 90],
    [/^hip-bone-l$/, "pelvis", /^(ilium|ischium|pubis)_compact_bone_L$/, 90],
    [/^sacrum$/, "pelvis", /^sacrum$/, 50],
    [/^femur-r$/, "knee-r", /^femur_R$/, 50],
    [/^femur-l$/, "knee-l", /^femur_L$/, 50],
    [/^tibia-r$/, "knee-r", /^tibia_R$/, 40],
    [/^tibia-l$/, "knee-l", /^tibia_L$/, 40],
    [/^fibula-r$/, "knee-r", /^fibula_R$/, 25],
    [/^fibula-l$/, "knee-l", /^fibula_L$/, 25],
    [/^patella-r$/, "knee-r", /^patella_R$/, 12],
    [/^patella-l$/, "knee-l", /^patella_L$/, 12],
  ];
  for (const [srcRe, file, dstRe, controls] of boneMap) {
    const c = boneCorrespondences(byId(srcRe), F.get(file, dstRe), global, 500, controls, String(srcRe));
    addPairs(pairs, c.from, c.to, 2e-5);
  }
  {
    const c = boneCorrespondences(byId(/^(manubrium-of-sternum|body-of-sternum)$/), mergeMeshes([F.get("sternum", /^sternum$/), F.get("manubrium", /^manubrium$/)]), global, 400, 40, "sternum");
    addPairs(pairs, c.from, c.to, 2e-5);
  }

  // organs: affine fits (soft)
  const organ = (src: Mesh, dst: Mesh, n = 24, lambda = 2e-3) => {
    if (!src.indices.length) return;
    const aff = icp(samplePoints(src, 300, 5), samplePoints(dst, 600, 7), { mode: "affine", init: global, iterations: 25, trim: 0.9 });
    const from = samplePoints(src, n, 17);
    addPairs(pairs, from, transformPoints(aff, from), lambda);
  };
  organ(byId(/^(ventricular-myocardium|atrium-[lr])$/), F.get("heart", /./));
  organ(byId(/^liver-segment/), F.get("liver", /capsule|segment|caudate|quadrate/));
  organ(byId(/^kidney-l$/), F.get("kidney-l", /capsule|cortex/));
  organ(byId(/^kidney-r$/), F.get("kidney-r", /capsule|cortex/));
  organ(byId(/^spleen$/), F.get("spleen", /./));
  organ(byId(/^urinary-bladder$/), F.get("urinary-bladder", /fundus|neck|trigone/));
  organ(byId(/lobe-of-lung/), F.get("lung", /bronchopulmonary_segm/), 60, 3e-4);
  organ(byId(/^trachea$/), F.get("trachea", /^trachea$/), 12);
  organ(byId(/^thyroid-cartilage$/), F.get("larynx", /thyroid_cartilage/), 8);
  organ(byId(/^sclera-l$/), F.get("eye-l", /sclera/), 8, 1e-4);
  organ(byId(/^sclera-r$/), F.get("eye-r", /sclera/), 8, 1e-4);
  organ(byId(/colon$/), F.get("large-intestine", /colon/), 24, 1e-3);

  // limbs by (t, theta); the posed male arm frame is used for the male side
  const maleSkin = byId(/^skin$/);
  const femSkin = F.get("skin", /skin/);
  const limbMask = new Uint8Array(maleSkin.positions.length / 3);
  for (const arm of arms) matchLimb(arm.posed, arm.female, maleSkin, femSkin, arm.s, 0.1, 0.075, pairs, limbMask, 2e-3);
  // legs share the same standing pose in both bodies, so they use the closest-point surface pass
  // trunk, legs, neck & head surface: closest points after an internal-only warp
  const pubicBones = byId(/^hip-bone-[lr]$/);
  const pb = bounds(pubicBones);
  const genitalTop = pb.min[1] + 0.09; // just above the pubic symphysis
  const pubicZ = pb.max[2] - 0.03;
  const tps0 = ThinPlateSpline.fit(pairs.src, pairs.dst, pairs.lambda);
  const femTree = new KdTree(femSkin.positions);
  const nrmF = computeNormals(femSkin);
  const nrmM = computeNormals(maleSkin);
  const tSrc: number[] = [];
  const tDst: number[] = [];
  const o = { d2: 0 };
  const w: Vec3 = [0, 0, 0];
  const step = Math.max(1, Math.floor(maleSkin.positions.length / 3 / 9000));
  for (let v = 0; v < maleSkin.positions.length / 3; v += step) {
    if (limbMask[v]) continue;
    const x = maleSkin.positions[v * 3];
    const y = maleSkin.positions[v * 3 + 1];
    const z = maleSkin.positions[v * 3 + 2];
    if (Math.abs(x) < 0.07 && y < genitalTop && y > genitalTop - 0.2 && z > pubicZ - 0.02) continue; // male external genitalia
    tps0.apply(x, y, z, w);
    const j = femTree.nearest(w[0], w[1], w[2], o);
    if (Math.sqrt(o.d2) > 0.05) continue;
    if (nrmM[v * 3] * nrmF[j * 3] + nrmM[v * 3 + 1] * nrmF[j * 3 + 1] + nrmM[v * 3 + 2] * nrmF[j * 3 + 2] < 0.3) continue;
    tSrc.push(x, y, z);
    tDst.push(femSkin.positions[j * 3], femSkin.positions[j * 3 + 1], femSkin.positions[j * 3 + 2]);
  }
  const thin = thinPairs(tSrc, tDst, 0.025);
  addPairs(pairs, thin.src, thin.dst, 2e-3);
  const clean = enforceLipschitz(rejectInconsistent(pairs, 0.03, 0.025), 0.75, 0.1, 0.004);
  let tps = ThinPlateSpline.fit(clean.src, clean.dst, clean.lambda);
  // Fold removal: drop correspondences where the spline's Jacobian degenerates, then refit.
  for (let pass = 0; pass < 4; pass++) {
    const bad = foldingPairs(tps, clean);
    if (process.env.ANATOMY_DEBUG) console.log(`   fold pass ${pass}: ${bad.size} suspicious pairs`);
    if (!bad.size) break;
    const keep: Pairs = { src: [], dst: [], lambda: [] };
    for (let i = 0; i < clean.lambda.length; i++) {
      if (bad.has(i)) continue;
      keep.src.push(clean.src[i * 3], clean.src[i * 3 + 1], clean.src[i * 3 + 2]);
      keep.dst.push(clean.dst[i * 3], clean.dst[i * 3 + 1], clean.dst[i * 3 + 2]);
      keep.lambda.push(clean.lambda[i]);
    }
    clean.src = keep.src;
    clean.dst = keep.dst;
    clean.lambda = keep.lambda;
    tps = ThinPlateSpline.fit(clean.src, clean.dst, clean.lambda);
  }
  console.log(`  [female] ${clean.lambda.length}/${pairs.lambda.length} correspondences kept, registration in ${((Date.now() - t0) / 1000).toFixed(1)}s`);
  return tps;
}

// ------------------------------------------------------------------------------------------
// Female-specific structures
// ------------------------------------------------------------------------------------------

function hraStructure(
  conceptName: string,
  mesh: Mesh,
  opts: { side?: Side; system: SystemId; group: GroupId; layer: Layer; file: string; conceptId?: string },
): BuiltStructure {
  const concept = opts.conceptId ?? slug(conceptName);
  const spec: StructureSpec = {
    id: opts.side ? `${concept}-${opts.side === "left" ? "l" : "r"}` : concept,
    name: opts.side ? `${titleCase(opts.side)} ${conceptName}` : titleCase(conceptName),
    concept,
    conceptName: titleCase(conceptName),
    side: opts.side,
    system: opts.system,
    group: opts.group,
    layer: opts.layer,
    source: { kind: "hra", file: opts.file, nodes: [] },
    sex: "female",
  };
  return { spec, mesh };
}

/** Male structures replaced by real female data, or absent in the female. */
const REPLACED = /^(skin|hip-bone-[lr]|sacrum|femur-[lr]|tibia-[lr]|fibula-[lr]|patella-[lr]|body-of-sternum|manubrium-of-sternum|intervertebral-disc-.*|urethra)$/;

function femaleStructures(F: FemaleSources, warped: BuiltStructure[]): BuiltStructure[] {
  const out: BuiltStructure[] = [];
  const S = (s: 1 | -1) => (s > 0 ? "L" : "R");
  const side = (s: 1 | -1): Side => (s > 0 ? "left" : "right");
  out.push(hraStructure("skin", F.get("skin", /skin/), { system: "integumentary", group: "skin", layer: 0, file: "skin" }));
  out.push(hraStructure("sacrum", F.get("pelvis", /^sacrum$/), { system: "skeletal", group: "bone", layer: 4, file: "pelvis" }));
  out.push(hraStructure("coccyx", F.get("pelvis", /^coccyx$/), { system: "skeletal", group: "bone", layer: 4, file: "pelvis" }));
  out.push(hraStructure("body of sternum", F.get("sternum", /^sternum$/), { system: "skeletal", group: "bone", layer: 4, file: "sternum" }));
  out.push(hraStructure("manubrium of sternum", F.get("manubrium", /^manubrium$/), { system: "skeletal", group: "bone", layer: 4, file: "manubrium" }));
  for (const s of [1, -1] as const) {
    const knee = s > 0 ? "knee-l" : "knee-r";
    out.push(hraStructure("hip bone", F.get("pelvis", new RegExp(`^(ilium|ischium|pubis)_compact_bone_${S(s)}$`)), { side: side(s), system: "skeletal", group: "bone", layer: 4, file: "pelvis" }));
    for (const [name, node] of [
      ["femur", "femur"],
      ["tibia", "tibia"],
      ["fibula", "fibula"],
      ["patella", "patella"],
    ])
      out.push(hraStructure(name, F.get(knee, new RegExp(`^${node}_${S(s)}$`)), { side: side(s), system: "skeletal", group: "bone", layer: 4, file: knee }));
    out.push(hraStructure("menisci of knee", F.get(knee, new RegExp(`^meniscus_${S(s)}$`)), { side: side(s), system: "skeletal", group: "cartilage", layer: 4, file: knee }));
    out.push(
      hraStructure("articular cartilage of knee", F.get(knee, new RegExp(`^articular_cartilage_of_knee_${S(s)}$`)), { side: side(s), system: "skeletal", group: "cartilage", layer: 4, file: knee }),
    );
    out.push(hraStructure("ovary", F.get(s > 0 ? "ovary-l" : "ovary-r", /ovary/), { side: side(s), system: "reproductive", group: "organ", layer: 3, file: "ovary" }));
    out.push(hraStructure("uterine tube", F.get(s > 0 ? "fallopian-tube-l" : "fallopian-tube-r", /./), { side: side(s), system: "reproductive", group: "organ", layer: 3, file: "fallopian-tube" }));
    const mg = s > 0 ? "mammary-gland-l" : "mammary-gland-r";
    out.push(hraStructure("mammary gland", F.get(mg, new RegExp(`^(mammary_lobes|main_lactiferous_ducts|main_lactiferous_sinuses)_${S(s)}$`)), { side: side(s), system: "reproductive", group: "organ", layer: 1, file: mg }));
    out.push(hraStructure("breast adipose tissue", F.get(mg, new RegExp(`^fat_${S(s)}$`)), { side: side(s), system: "integumentary", group: "membrane", layer: 1, file: mg }));
  }
  for (const [, hraRe, concept] of DISCS) {
    if (!F.has("intervertebral-disk", hraRe)) continue;
    const male = warped.find((b) => b.spec.id === concept);
    if (!male) continue;
    out.push({ spec: { ...male.spec, source: { kind: "hra", file: "intervertebral-disk", nodes: [] } }, mesh: F.get("intervertebral-disk", hraRe) });
  }
  out.push(hraStructure("uterus", F.get("uterus", /./), { system: "reproductive", group: "organ", layer: 3, file: "uterus" }));

  // vagina and female urethra: generated between the real uterus/bladder and the vulva
  const cervixOs = centroid(F.get("uterus", /external_cervical_os/));
  const femSkin = F.get("skin", /skin/);
  const pubis = mergeMeshes([F.get("pelvis", /^pubis_compact_bone_L$/), F.get("pelvis", /^pubis_compact_bone_R$/)]);
  const symph = extreme({ positions: pubis.positions.filter((_, i, a) => Math.abs(a[i - (i % 3)]) < 0.02), indices: new Uint32Array(0) }, [0, -1, 0.3]);
  const skinNear = (target: Vec3) => {
    let best: Vec3 = target;
    let bd = Infinity;
    for (let i = 0; i < femSkin.positions.length; i += 3) {
      const x = femSkin.positions[i];
      if (Math.abs(x) > 0.012) continue;
      const p: Vec3 = [x, femSkin.positions[i + 1], femSkin.positions[i + 2]];
      const d = dist(p, target);
      if (d < bd) {
        bd = d;
        best = p;
      }
    }
    return best;
  };
  const introitus = add(skinNear([0, symph[1] - 0.035, symph[2] - 0.03]), [0, 0.006, 0]);
  const vaginaPath: Vec3[] = [cervixOs, lerp(cervixOs, introitus, 0.35), lerp(cervixOs, introitus, 0.7), introitus];
  out.push(
    hraStructure("vagina", tube(vaginaPath, { radius: () => [0.012, 0.005], segments: 14, sideHint: [1, 0, 0] }), {
      system: "reproductive",
      group: "organ",
      layer: 3,
      file: "generated",
    }),
  );
  const bladder = warped.find((b) => b.spec.id === "urinary-bladder")!.mesh;
  const neck = extreme(bladder, [0, -1, 0.2]);
  const meatus = add(skinNear([0, symph[1] - 0.022, symph[2] - 0.008]), [0, 0.004, -0.002]);
  out.push({
    spec: { ...warped.find((b) => b.spec.id === "urinary-bladder")!.spec, id: "urethra", name: "Urethra", concept: "urethra", conceptName: "Urethra", source: { kind: "generated", generator: "female-urethra" }, sex: "female" },
    mesh: tube([neck, lerp(neck, meatus, 0.5), meatus], { radius: 0.003, segments: 10 }),
  });
  return out;
}

export async function buildFemale(male: BuiltStructure[]): Promise<BuiltStructure[]> {
  const t0 = Date.now();
  const F = await loadFemaleSources();
  // simplify once up front so the per-vertex spline evaluation stays affordable
  const prepared = male
    .filter((b) => b.spec.sex !== "male")
    .map((b) => ({ spec: b.spec, mesh: prepareMesh(b), prepared: true }));
  const femSkin = F.get("skin", /skin/);
  const arms = armSetups(prepared, femSkin);
  const posed = poseArms(prepared, arms);
  const tps = await registerFemale(posed, F, arms);
  const warped: BuiltStructure[] = [];
  const t: Vec3 = [0, 0, 0];
  for (const b of posed) {
    if (REPLACED.test(b.spec.id) && b.spec.id !== "urinary-bladder") {
      // keep discs/bladder specs for reference but not their geometry
      if (!/^intervertebral-disc-/.test(b.spec.id)) continue;
    }
    const P = new Float32Array(b.mesh.positions.length);
    for (let i = 0; i < P.length; i += 3) {
      tps.apply(b.mesh.positions[i], b.mesh.positions[i + 1], b.mesh.positions[i + 2], t);
      P[i] = t[0];
      P[i + 1] = t[1];
      P[i + 2] = t[2];
    }
    warped.push({ spec: b.spec, mesh: { positions: P, indices: b.mesh.indices }, prepared: true });
  }
  if (process.env.ANATOMY_DEBUG) debugStrain(posed, warped, tps);
  const female = femaleStructures(F, warped);
  const keep = warped.filter((b) => !REPLACED.test(b.spec.id));
  console.log(`  [female] assembled ${keep.length + female.length} structures in ${((Date.now() - t0) / 1000).toFixed(1)}s`);
  return [...keep, ...female];
}

/** Reports the structures (and body regions) the spline stretches the most. */
function debugStrain(posed: BuiltStructure[], warped: BuiltStructure[], tps: ThinPlateSpline) {
  const rows: { id: string; p99: number; max: number; at: Vec3 }[] = [];
  for (const w of warped) {
    const src = posed.find((b) => b.spec.id === w.spec.id);
    if (!src) continue;
    const ratios: number[] = [];
    let max = 0;
    let at: Vec3 = [0, 0, 0];
    const I = w.mesh.indices;
    for (let t = 0; t < I.length; t += 3)
      for (let e = 0; e < 3; e++) {
        const a = I[t + e];
        const b = I[t + ((e + 1) % 3)];
        const l0 = Math.hypot(src.mesh.positions[a * 3] - src.mesh.positions[b * 3], src.mesh.positions[a * 3 + 1] - src.mesh.positions[b * 3 + 1], src.mesh.positions[a * 3 + 2] - src.mesh.positions[b * 3 + 2]);
        if (l0 < 1e-5) continue;
        const l1 = Math.hypot(w.mesh.positions[a * 3] - w.mesh.positions[b * 3], w.mesh.positions[a * 3 + 1] - w.mesh.positions[b * 3 + 1], w.mesh.positions[a * 3 + 2] - w.mesh.positions[b * 3 + 2]);
        const r = l1 / l0;
        ratios.push(r);
        if (r > max) {
          max = r;
          at = [src.mesh.positions[a * 3], src.mesh.positions[a * 3 + 1], src.mesh.positions[a * 3 + 2]];
        }
      }
    ratios.sort((x, y) => x - y);
    rows.push({ id: w.spec.id, p99: ratios[Math.floor(ratios.length * 0.99)] ?? 0, max, at });
  }
  rows.sort((a, b) => b.max - a.max);
  console.log("  [debug] most stretched structures (edge length ratio):");
  for (const r of rows.slice(0, 25)) console.log(`    ${r.id.padEnd(40)} p99 ${r.p99.toFixed(2)} max ${r.max.toFixed(1)} at ${r.at.map((v) => v.toFixed(3)).join(",")}`);
  // Jacobian scan over the lower trunk and thighs
  const bad: string[] = [];
  for (let y = 0.55; y <= 1.1; y += 0.02)
    for (let x = -0.2; x <= 0.2; x += 0.02)
      for (let z = -0.15; z <= 0.15; z += 0.02) {
        const d = jacobianDet(tps, [x, y, z]);
        if (d < 0.3 || d > 3.5) bad.push(`${x.toFixed(2)},${y.toFixed(2)},${z.toFixed(2)}:${d.toFixed(2)}`);
      }
  console.log(`  [debug] ${bad.length} degenerate grid points in pelvis/thighs`, bad.slice(0, 40).join(" "));
}

void bounds;
void generatedStructure;
void queryMesh;
