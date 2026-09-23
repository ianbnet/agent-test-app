/**
 * Muscles missing from BodyParts3D, reconstructed as sheets under the skin of their
 * anatomical territory. Also splits the rectus abdominis out of the external oblique sheet
 * (BodyParts3D models it as part of that muscle's aponeurosis).
 */
import {
  bounds,
  centroid,
  compact,
  mergeMeshes,
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
import type { GroupId, Side } from "../../../shared/anatomy";

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
    /** 0 for a midline structure. */
    side: Sgn | 0;
    group?: GroupId;
    region: (p: Vec3) => boolean;
    outward: (p: Vec3) => Vec3;
    fat: number;
    thickness: number;
    taper: number;
    /** Tissue the sheet must not sink into (e.g. the skull under the temporalis). */
    floor?: Mesh;
    /** Keep secondary pieces of at least a quarter of the main patch. */
    multi?: boolean;
    /** Minimum cosine between skin normal and `outward` (default 0.15). */
    minFacing?: number;
    color?: string;
    layer?: 1 | 2;
  },
): BuiltStructure | null {
  const facing = (p: Vec3, nx: number, ny: number, nz: number) => {
    const o = opts.outward(p);
    const ol = Math.hypot(o[0], o[1], o[2]) || 1;
    return (nx * o[0] + ny * o[1] + nz * o[2]) / ol >= (opts.minFacing ?? 0.15);
  };
  // 1. coarse candidate: skin triangles touching the region
  const nrm = computeNormals(skin);
  const P = skin.positions;
  const cand: number[] = [];
  for (let t = 0; t < skin.indices.length; t += 3) {
    let touch = false;
    let face = true;
    for (let k = 0; k < 3; k++) {
      const v = skin.indices[t + k];
      const p: Vec3 = [P[v * 3], P[v * 3 + 1], P[v * 3 + 2]];
      if (opts.region(p)) touch = true;
      if (!facing(p, nrm[v * 3], nrm[v * 3 + 1], nrm[v * 3 + 2])) face = false;
    }
    if (touch && face) cand.push(skin.indices[t], skin.indices[t + 1], skin.indices[t + 2]);
  }
  if (cand.length < 9) return null;
  // 2. refine the (coarse) skin so thin straps get a clean outline, then trim to the region
  let fine = weld(compact({ positions: P, indices: Uint32Array.from(cand) }), 1e-6);
  const edge0 = Math.sqrt((2 * Math.max(1e-9, surfaceAreaOf(fine))) / (fine.indices.length / 3));
  for (let it = 0; it < 3 && edge0 / 2 ** it > 0.0025; it++) fine = subdivide(fine);
  const fn = computeNormals(fine);
  const FP = fine.positions;
  const tris: number[] = [];
  for (let t = 0; t < fine.indices.length; t += 3) {
    let ok = true;
    for (let k = 0; k < 3 && ok; k++) {
      const v = fine.indices[t + k];
      const p: Vec3 = [FP[v * 3], FP[v * 3 + 1], FP[v * 3 + 2]];
      if (!opts.region(p) || !facing(p, fn[v * 3], fn[v * 3 + 1], fn[v * 3 + 2])) ok = false;
    }
    if (ok) tris.push(fine.indices[t], fine.indices[t + 1], fine.indices[t + 2]);
  }
  if (tris.length < 30) return null;
  // 3. main patch plus any sizeable secondary pieces (e.g. both lips of a sphincter)
  const comps = connectedComponents(weld(compact({ positions: FP, indices: Uint32Array.from(tris) }), 1e-6)).sort(
    (a, b) => b.indices.length - a.indices.length,
  );
  if (process.env.ANATOMY_DEBUG) console.log("   sheet", opts.name, tris.length / 3, comps.slice(0, 5).map((c) => c.indices.length / 3));
  const keep = comps.filter((c) => c.indices.length >= comps[0].indices.length * (opts.multi ? 0.25 : 1));
  let patch = keep.length > 1 ? mergeMeshes(keep) : keep[0];
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
  return generatedStructure(opts.name, mesh, {
    side: opts.side ? sideWord(opts.side) : undefined,
    system: "muscular",
    group: opts.group ?? "muscle",
    layer: opts.layer ?? 1,
    generator: "skin-sheet",
    color: opts.color,
  });
}

const sub3 = (a: Vec3, b: Vec3): Vec3 => [a[0] - b[0], a[1] - b[1], a[2] - b[2]];
/** Distance from p to segment ab. */
function segDist(p: Vec3, a: Vec3, b: Vec3) {
  const ab = sub3(b, a);
  const ap = sub3(p, a);
  const t = Math.max(0, Math.min(1, (ap[0] * ab[0] + ap[1] * ab[1] + ap[2] * ab[2]) / (ab[0] ** 2 + ab[1] ** 2 + ab[2] ** 2)));
  return Math.hypot(ap[0] - ab[0] * t, ap[1] - ab[1] * t, ap[2] - ab[2] * t);
}

/**
 * Muscles of facial expression and the scalp (absent from BodyParts3D), laid under the skin of
 * the face from bony and soft-tissue landmarks: eyes, lips, zygomatic bones, mandible, skull.
 */
export function generateFacialMuscles(built: BuiltStructure[]): BuiltStructure[] {
  const t0 = Date.now();
  const skin = built.find((b) => b.spec.group === "skin")!.mesh;
  const out: BuiltStructure[] = [];
  const skull = queryMesh(/^(frontal bone|left parietal bone|right parietal bone|parietal bone|occipital bone|left temporal bone|right temporal bone|sphenoid bone|left zygomatic bone|right zygomatic bone|left maxilla|right maxilla|mandible|left nasal bone|right nasal bone)$/i);
  const teeth = queryMesh(/(upper|lower) .*secondary .*tooth$/i);
  const lip = queryMesh(/^lip$/i);
  const lb = bounds(lip);
  const mouth: Vec3 = [0, (lb.min[1] + lb.max[1]) / 2, lb.max[2] - 0.004];
  const mand = bounds(queryMesh(/^mandible$/i));
  const occ = queryMesh(/^occipital bone$/i);
  const inion = extreme(occ, [0, 0.15, -1]);
  const eyes = ([1, -1] as Sgn[]).map((s) => {
    const sc = queryMesh(new RegExp(`^${sideWord(s)} sclera$`, "i"));
    return { s, c: centroid(sc), b: bounds(sc), mesh: sc };
  });
  const browY = Math.max(...eyes.map((e) => e.b.max[1])) + 0.012;
  const eyeZ = Math.max(...eyes.map((e) => e.b.max[2]));
  const headTop = bounds(skin).max[1];
  const floorFace = mergeMeshes([skull, teeth, ...eyes.map((e) => e.mesh)]);
  const headC: Vec3 = [0, browY + 0.01, (eyeZ + inion[2]) / 2];

  // Epicranial aponeurosis (galea): tendinous cap joining the frontal and occipital bellies.
  const galea = skinSheet(skin, {
    name: "epicranial aponeurosis",
    side: 0,
    group: "tendon",
    color: "#c3ced3",
    outward: (p) => sub3(p, headC),
    region: (p) => p[1] > headTop - 0.2 && Math.abs(p[0]) < 0.068 && (p[2] > headC[2] ? p[1] > browY + 0.052 : p[1] > inion[1] + 0.038),
    fat: 0.004,
    thickness: 0.0016,
    taper: 0.01,
    floor: skull,
  });
  if (galea) out.push(galea);

  // Orbicularis oris: sphincter around the mouth (with a slit for the oral fissure).
  const oris = skinSheet(skin, {
    name: "orbicularis oris",
    side: 0,
    outward: () => [0, 0, 1],
    region: (p) => {
      if (p[2] < mouth[2] - 0.03) return false;
      const e = (p[0] / 0.031) ** 2 + ((p[1] - mouth[1]) / 0.022) ** 2;
      const slit = Math.abs(p[1] - mouth[1]) < 0.0016 && Math.abs(p[0]) < 0.023;
      return e < 1 && !slit;
    },
    fat: 0.0025,
    thickness: 0.0042,
    taper: 0.008,
    floor: floorFace,
    multi: true,
  });
  if (oris) out.push(oris);

  for (const eye of eyes) {
    const s = eye.s;
    const [ex, ey] = [eye.c[0], eye.c[1]];
    // Occipitofrontalis: frontal belly on the forehead + occipital belly over the back of the skull.
    const frontal = skinSheet(skin, {
      name: "occipitofrontalis",
      side: s,
      outward: () => [0, 0.3, 1],
      region: (p) => {
        const ax = p[0] * s;
        if (p[2] < eyeZ - 0.035 || ax < 0.003 || ax > 0.054) return false;
        // lower border follows the eyebrow arch, upper border curves into the galea
        const lower = browY - 0.004 + 9 * (ax - 0.026) ** 2;
        const upper = browY + 0.066 - 14 * (ax - 0.02) ** 2;
        return p[1] > lower && p[1] < upper;
      },
      fat: 0.003,
      thickness: 0.003,
      taper: 0.014,
      floor: skull,
      minFacing: -1,
    });
    const occipital = skinSheet(skin, {
      name: "occipitofrontalis",
      side: s,
      outward: () => [0, 0.2, -1],
      region: (p) => {
        const ax = p[0] * s;
        if (p[2] > inion[2] + 0.04 || ax < 0.008 || ax > 0.05) return false;
        return p[1] > inion[1] + 0.004 + 4 * (ax - 0.03) ** 2 && p[1] < inion[1] + 0.046 - 10 * (ax - 0.028) ** 2;
      },
      fat: 0.004,
      thickness: 0.003,
      taper: 0.012,
      floor: skull,
      minFacing: -0.2,
    });
    const bellies = [frontal, occipital].filter((b): b is BuiltStructure => !!b);
    if (bellies.length) out.push({ spec: bellies[0].spec, mesh: mergeMeshes(bellies.map((b) => b.mesh)) });

    // Orbicularis oculi: concentric sphincter around the orbit, open at the palpebral fissure.
    const oculi = skinSheet(skin, {
      name: "orbicularis oculi",
      side: s,
      outward: () => [s * 0.25, 0, 1],
      region: (p) => {
        if (p[2] < eye.b.max[2] - 0.02 || p[0] * s < 0.006) return false;
        const outer = ((p[0] - ex) / 0.031) ** 2 + ((p[1] - ey) / 0.026) ** 2;
        const inner = ((p[0] - ex) / 0.016) ** 2 + ((p[1] - ey - 0.001) / 0.0075) ** 2;
        return outer < 1 && inner > 1;
      },
      fat: 0.0012,
      thickness: 0.0025,
      taper: 0.007,
      floor: floorFace,
      minFacing: -0.1,
    });
    if (oculi) out.push(oculi);

    const corner = extreme(lip, [s, 0, 0]);
    const modiolus: Vec3 = [corner[0] + s * 0.004, corner[1] + 0.002, corner[2]];
    const zygM = queryMesh(new RegExp(`^${sideWord(s)} zygomatic bone$`, "i"));
    const malar = extreme(zygM, [s, 0.1, 0.8]);
    // Zygomaticus major: zygomatic bone to the angle of the mouth.
    const zyg = skinSheet(skin, {
      name: "zygomaticus major",
      side: s,
      outward: () => [s * 0.6, 0, 1],
      region: (p) => p[2] > modiolus[2] - 0.08 && segDist(p, [malar[0] - s * 0.004, malar[1] - 0.004, malar[2]], modiolus) < 0.0062,
      fat: 0.004,
      thickness: 0.004,
      taper: 0.005,
      floor: floorFace,
      multi: true,
      minFacing: -0.1,
    });
    if (zyg) out.push(zyg);
    // Levator labii superioris: infraorbital margin to the upper lip.
    const infraorbital: Vec3 = [ex - s * 0.002, eye.b.min[1] - 0.01, eye.b.max[2]];
    const upperLip: Vec3 = [s * 0.011, mouth[1] + 0.009, mouth[2]];
    const lls = skinSheet(skin, {
      name: "levator labii superioris",
      side: s,
      outward: () => [s * 0.2, 0, 1],
      region: (p) => p[2] > upperLip[2] - 0.035 && p[0] * s > 0.004 && segDist(p, infraorbital, upperLip) < 0.0065,
      fat: 0.004,
      thickness: 0.003,
      taper: 0.005,
      floor: floorFace,
      multi: true,
      minFacing: -0.1,
    });
    if (lls) out.push(lls);
    // Depressor anguli oris: triangular, from the mouth corner down to the mandible's lower border.
    const b1: Vec3 = [s * 0.026, mand.min[1] + 0.006, 0];
    const b2: Vec3 = [s * 0.05, mand.min[1] + 0.01, 0];
    const inTri = (p: Vec3) => {
      const cross = (a: Vec3, b: Vec3, c: Vec3) => (b[0] - a[0]) * (c[1] - a[1]) - (b[1] - a[1]) * (c[0] - a[0]);
      const d1 = cross(modiolus, b1, p);
      const d2 = cross(b1, b2, p);
      const d3 = cross(b2, modiolus, p);
      return !((d1 < 0 || d2 < 0 || d3 < 0) && (d1 > 0 || d2 > 0 || d3 > 0));
    };
    const dao = skinSheet(skin, {
      name: "depressor anguli oris",
      side: s,
      outward: () => [s * 0.4, -0.3, 1],
      region: (p) => p[2] > modiolus[2] - 0.05 && inTri(p),
      fat: 0.004,
      thickness: 0.003,
      taper: 0.005,
      floor: floorFace,
    });
    if (dao) out.push(dao);
  }
  console.log(`  facial muscles: ${out.length} in ${((Date.now() - t0) / 1000).toFixed(1)}s`);
  return out;
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
  const viscera = mergeMeshes(built.filter((b) => b.spec.layer === 3 && (b.spec.group === "organ" || b.spec.group === "lung")).map((b) => b.mesh));
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

    // Internal oblique and transversus abdominis: the deeper two layers of the anterolateral
    // abdominal wall, laid beneath the external oblique between the costal margin and iliac crest.
    const eo = built.find((b) => b.spec.concept === "external-oblique" && b.spec.side === sideWord(s));
    const rib10 = bounds(queryMesh(new RegExp(`^${sideWord(s)} tenth rib$`, "i")));
    if (eo) {
      const wall = (medial: number) => (p: Vec3) => {
        const ax = p[0] * s;
        if (ax < medial || p[2] < zc - 0.06) return false;
        return p[1] > hip.max[1] - 0.035 && p[1] < rib10.min[1] + 0.035;
      };
      const io = skinSheet(eo.mesh, {
        name: "internal oblique",
        side: s,
        layer: 2,
        outward: (p) => [p[0], 0, p[2] - zc],
        region: wall(0.06),
        fat: 0.005,
        thickness: 0.006,
        taper: 0.02,
        floor: viscera,
        minFacing: 0.1,
      });
      if (io) out.push(io);
      const ta = skinSheet(eo.mesh, {
        name: "transversus abdominis",
        side: s,
        layer: 2,
        outward: (p) => [p[0], 0, p[2] - zc],
        region: wall(0.055),
        fat: 0.012,
        thickness: 0.004,
        taper: 0.02,
        floor: viscera,
        minFacing: 0.1,
      });
      if (ta) out.push(ta);
    }
  }
  console.log(`  missing muscles: ${out.length} in ${((Date.now() - t0) / 1000).toFixed(1)}s`);
  return out;
}
