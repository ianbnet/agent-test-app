/**
 * Central and peripheral nervous system routed through the BodyParts3D body:
 * the spinal cord follows the measured vertebral canal; spinal nerves leave through the
 * intervertebral foramina; peripheral nerves follow their classic neurovascular pathways,
 * using the model's own arteries, bones and muscles as guides.
 */
import { bounds, centroid, mergeMeshes, principalAxes, type Mesh, type Vec3 } from "../lib/mesh";
import {
  add,
  along,
  center,
  centerline,
  dist,
  dot,
  ellipsoid,
  extreme,
  lerp,
  norm,
  scale,
  slicePath,
  sub,
  tube,
} from "../lib/tube";
import { generatedStructure, query, queryMesh } from "./context";
import { analyzeSpine, sacralForamina, type VertebraLevel } from "./spine";
import type { BuiltStructure } from "../export";
import type { Side } from "../../../shared/anatomy";

type Sgn = 1 | -1; // +1 = patient's left (+x), -1 = right

const memo = new Map<string, Mesh>();
function M(re: RegExp): Mesh {
  const key = re.source + re.flags;
  let m = memo.get(key);
  if (!m) {
    m = queryMesh(re);
    memo.set(key, m);
  }
  return m;
}
const sideWord = (s: Sgn) => (s > 0 ? "left" : "right");
const S = (s: Sgn, name: string) => M(new RegExp(`^${sideWord(s)} ${name}$`, "i"));

function nerve(conceptName: string, meshes: Mesh[], side?: Side): BuiltStructure {
  return generatedStructure(conceptName, mergeMeshes(meshes), {
    side,
    system: "nervous",
    group: "nerve",
    layer: 3,
    generator: "nerves",
  });
}

/** Directed centerline of a vessel/muscle from the end nearest `from`. */
function line(m: Mesh, from: Vec3, slices = 20): Vec3[] {
  return centerline(m, slices, from);
}

/** Taper helper: radius r0 at start to r1 at end. */
const taper = (r0: number, r1: number) => (t: number) => r0 + (r1 - r0) * t;

// ---------------------------------------------------------------------------
// Spinal cord, roots and cauda equina
// ---------------------------------------------------------------------------

const CORD_FRACTION: Record<string, [number, number]> = { C: [0, 0.27], T: [0.27, 0.83], L: [0.83, 0.94], S: [0.94, 1] };

interface SpineModel {
  levels: VertebraLevel[];
  cordPath: Vec3[];
  canalAt: (y: number) => { c: Vec3; half: [number, number] };
  /** Foramen exit points for each spinal nerve on a given side. */
  exits: (s: Sgn) => { label: string; p: Vec3; dir: Vec3 }[];
  cordSegment: (label: string) => Vec3;
}

function buildSpineModel(): SpineModel {
  const levels = analyzeSpine();
  const byLabel = new Map(levels.map((l) => [l.label, l]));
  const sorted = [...levels].sort((a, b) => b.canal[1] - a.canal[1]);
  const canalAt = (y: number) => {
    for (let i = 0; i < sorted.length - 1; i++) {
      const a = sorted[i];
      const b = sorted[i + 1];
      if (y <= a.canal[1] && y >= b.canal[1]) {
        const t = (a.canal[1] - y) / (a.canal[1] - b.canal[1]);
        return {
          c: lerp(a.canal, b.canal, t),
          half: [a.canalHalf[0] + (b.canalHalf[0] - a.canalHalf[0]) * t, a.canalHalf[1] + (b.canalHalf[1] - a.canalHalf[1]) * t] as [number, number],
        };
      }
    }
    const l = y > sorted[0].canal[1] ? sorted[0] : sorted[sorted.length - 1];
    return { c: [l.canal[0], y, l.canal[2]] as Vec3, half: l.canalHalf };
  };
  // Cord: from the foramen magnum to the conus medullaris at the L1/L2 disc.
  const medulla = M(/^medulla oblongata$/i);
  const mb = bounds(medulla);
  const c1 = byLabel.get("C1")!;
  const l1 = byLabel.get("L1")!;
  const l2 = byLabel.get("L2")!;
  const top: Vec3 = [0, mb.min[1] + 0.008, c1.canal[2] + 0.004];
  const conusY = (l1.yMin + l2.yMax) / 2;
  const ctrl: Vec3[] = [top];
  for (const l of sorted) {
    if (l.canal[1] < conusY) break;
    if (l.label === "C1") continue;
    ctrl.push([0, l.canal[1], l.canal[2]]);
  }
  ctrl.push([0, conusY, canalAt(conusY).c[2]]);
  // light smoothing of the measured canal centers
  const sm = ctrl.map((p, i) => (i === 0 || i === ctrl.length - 1 ? p : scale(add(add(ctrl[i - 1], ctrl[i + 1]), scale(p, 2)), 0.25)));
  const cordPath = sm;

  const cordSegment = (label: string) => {
    const region = label[0];
    const n = parseInt(label.slice(1), 10);
    const counts: Record<string, number> = { C: 8, T: 12, L: 5, S: 5 };
    const [a, b] = CORD_FRACTION[region];
    return along(cordPath, a + ((b - a) * (n - 0.5)) / counts[region]);
  };

  const exits = (s: Sgn) => {
    const out: { label: string; p: Vec3; dir: Vec3 }[] = [];
    const lv = (lab: string) => byLabel.get(lab)!;
    const gapY = (upper: VertebraLevel | null, lower: VertebraLevel) =>
      upper ? (upper.canal[1] + lower.canal[1]) / 2 - 0.004 : lower.yMax + 0.004;
    const make = (label: string, y: number, dir: Vec3) => {
      const { c, half } = canalAt(y);
      out.push({ label, p: [c[0] + s * (half[0] + 0.005), y, c[2] + half[1] * 0.35], dir: norm([s * dir[0], dir[1], dir[2]]) });
    };
    const cervical = ["C1", "C2", "C3", "C4", "C5", "C6", "C7"];
    make("C1", gapY(null, lv("C1")), [1, -0.2, 0.2]);
    for (let n = 2; n <= 7; n++) make(`C${n}`, gapY(lv(cervical[n - 2]), lv(cervical[n - 1])), [1, -0.35, 0.3]);
    make("C8", gapY(lv("C7"), lv("T1")), [1, -0.4, 0.25]);
    for (let n = 1; n <= 12; n++) make(`T${n}`, gapY(lv(`T${n}`), n < 12 ? lv(`T${n + 1}`) : lv("L1")), [1, -0.3, 0.2]);
    for (let n = 1; n <= 4; n++) make(`L${n}`, gapY(lv(`L${n}`), lv(`L${n + 1}`)), [0.8, -0.6, 0.35]);
    const l5 = lv("L5");
    make("L5", l5.yMin - 0.004, [0.6, -0.7, 0.4]);
    sacralForamina(s).forEach((p, i) => out.push({ label: `S${i + 1}`, p, dir: norm([s * 0.4, -0.5, 0.8]) }));
    return out;
  };
  return { levels, cordPath, canalAt, exits, cordSegment };
}

function spinalCord(sp: SpineModel): Mesh {
  const yTop = sp.cordPath[0][1];
  const yBot = sp.cordPath[sp.cordPath.length - 1][1];
  const levelY = (lab: string) => sp.levels.find((l) => l.label === lab)!.canal[1];
  const profile: [number, number, number][] = [
    // [y, rx, rz] (half widths)
    [yTop, 0.0055, 0.0048],
    [levelY("C2"), 0.0058, 0.0042],
    [levelY("C5"), 0.0068, 0.0043],
    [levelY("T1"), 0.0055, 0.0041],
    [levelY("T4"), 0.0045, 0.0040],
    [levelY("T9"), 0.0045, 0.0040],
    [levelY("T12"), 0.0052, 0.0044],
    [yBot + 0.012, 0.004, 0.0036],
    [yBot, 0.0012, 0.0012],
  ];
  const radiusAtY = (y: number): [number, number] => {
    for (let i = 0; i < profile.length - 1; i++) {
      const [ya, rxa, rza] = profile[i];
      const [yb, rxb, rzb] = profile[i + 1];
      if (y <= ya && y >= yb) {
        const t = (ya - y) / (ya - yb || 1);
        return [rxa + (rxb - rxa) * t, rza + (rzb - rza) * t];
      }
    }
    return [0.0012, 0.0012];
  };
  const path = sp.cordPath;
  return tube(path, {
    radius: (t) => radiusAtY(along(path, t)[1]),
    segments: 16,
    sideHint: [1, 0, 0],
    step: 0.002,
  });
}

function caudaEquina(sp: SpineModel): Mesh[] {
  const conus = sp.cordPath[sp.cordPath.length - 1];
  const out: Mesh[] = [];
  for (const s of [1, -1] as Sgn[]) {
    const exits = sp.exits(s).filter((e) => /^L[2-5]|^S/.test(e.label));
    exits.forEach((e, i) => {
      const pts: Vec3[] = [add(conus, [s * 0.001 * (i % 3), 0.01, 0])];
      const spread = 0.0015 + 0.0006 * i;
      for (let y = conus[1] - 0.01; y > e.p[1] + 0.012; y -= 0.015) {
        const { c } = sp.canalAt(y);
        pts.push([c[0] + s * spread, y, c[2] - 0.001 * (i % 2)]);
      }
      pts.push(e.p);
      out.push(tube(pts, { radius: 0.0009, segments: 6, step: 0.003 }));
    });
  }
  // filum terminale down to the sacral hiatus
  const bottom = sp.canalAt(conus[1] - 0.12);
  out.push(tube([conus, ...[0.03, 0.06, 0.09].map((d) => sp.canalAt(conus[1] - d).c), bottom.c], { radius: 0.0005, segments: 5 }));
  return out;
}

function spinalNerves(sp: SpineModel, s: Sgn): { mesh: Mesh; stubEnds: Map<string, { p: Vec3; dir: Vec3 }> } {
  const meshes: Mesh[] = [];
  const stubEnds = new Map<string, { p: Vec3; dir: Vec3 }>();
  for (const e of sp.exits(s)) {
    const region = e.label[0];
    // intradural root from the cord segment to the foramen (C1-L1); lower roots are in the cauda equina
    if (region === "C" || region === "T" || e.label === "L1") {
      const seg = sp.cordSegment(e.label);
      const from: Vec3 = [seg[0] + s * 0.004, seg[1], seg[2]];
      const mid = lerp(from, e.p, 0.5);
      meshes.push(tube([from, [mid[0], (from[1] + e.p[1]) / 2 + 0.002, mid[2]], e.p], { radius: 0.0011, segments: 6 }));
    }
    // dorsal root ganglion in the foramen
    const size = region === "C" ? 0.0028 : region === "T" ? 0.0024 : 0.0033;
    meshes.push(ellipsoid(e.p, [size * 1.3, size, size], [norm(e.dir), [0, 1, 0], norm([e.dir[2], 0, -e.dir[0]])], 10));
    // spinal nerve stub (ventral ramus start)
    const stubLen = region === "S" ? 0.012 : 0.014;
    const end = add(e.p, scale(e.dir, stubLen));
    meshes.push(tube([e.p, end], { radius: region === "L" || region === "S" ? 0.0022 : 0.0017, segments: 7, caps: true }));
    stubEnds.set(e.label, { p: end, dir: e.dir });
  }
  return { mesh: mergeMeshes(meshes), stubEnds };
}

function sympatheticTrunk(sp: SpineModel, s: Sgn): Mesh {
  const pts: Vec3[] = [];
  const ganglia: Mesh[] = [];
  const sorted = [...sp.levels].sort((a, b) => b.body[1] - a.body[1]).filter((l) => l.label !== "C1");
  for (const l of sorted) {
    const region = l.label[0];
    // anterolateral on the bodies; over the rib heads in the thorax
    const lateral = region === "T" ? 0.024 : region === "C" ? 0.014 : 0.018;
    const ant = region === "T" ? -0.004 : 0.006;
    const p: Vec3 = [l.body[0] + s * lateral, l.body[1], l.body[2] + ant];
    pts.push(p);
    const big = l.label === "C2" || l.label === "T1";
    ganglia.push(ellipsoid(p, big ? [0.0028, 0.009, 0.0028] : [0.0022, 0.0035, 0.0022], undefined, 8));
  }
  // continue over the sacrum to the ganglion impar
  const sac = sacralForamina(s);
  for (const f of sac) pts.push([f[0] * 0.45, f[1], f[2] + 0.004]);
  return mergeMeshes([tube(pts, { radius: 0.0011, segments: 6, step: 0.003 }), ...ganglia]);
}

// ---------------------------------------------------------------------------
// Upper limb
// ---------------------------------------------------------------------------

function upperLimb(sp: SpineModel, s: Sgn, stubs: Map<string, { p: Vec3; dir: Vec3 }>): BuiltStructure[] {
  const side = sideWord(s) as Side;
  const humerus = S(s, "humerus");
  const radius = S(s, "radius");
  const ulna = S(s, "ulna");
  const clavicle = S(s, "clavicle");
  const axA = S(s, "axillary artery");
  const brA = S(s, "brachial artery");
  const raA = S(s, "radial artery");
  const ulA = S(s, "ulnar artery");
  const scal = S(s, "scalenus anterior");
  const retin = M(new RegExp(`^flexor retinaculum of ${sideWord(s)} wrist$`, "i"));
  const pis = S(s, "pisiform");
  const lat: Vec3 = [s, 0, 0];
  const med: Vec3 = [-s, 0, 0];
  const post: Vec3 = [0, 0, -1];
  const ant: Vec3 = [0, 0, 1];

  const hb = bounds(humerus);
  const hPA = principalAxes(humerus.positions);
  const hTop = extreme(humerus, [0, 1, 0]);
  const hAxis = norm(hPA.axes[0][1] > 0 ? hPA.axes[0] : scale(hPA.axes[0], -1)); // pointing up
  const hAt = (f: number): Vec3 => add(hPA.center, scale(hAxis, hPA.extents[0] * (1 - 2 * f))); // f=0 top, 1 bottom
  const lowH = { positions: humerus.positions.filter((_, i, a) => a[i - (i % 3) + 1] < hb.min[1] + 0.035), indices: new Uint32Array(0) };
  const medEpi = extreme(lowH, [-s, 0, 0]);
  const latEpi = extreme(lowH, [s, 0, 0]);

  const axLine = line(axA, [0, 1.35, 0.1]);
  const brLine = line(brA, axLine[axLine.length - 1]);
  const raLine = line(raA, brLine[brLine.length - 1]);
  const ulLine = line(ulA, brLine[brLine.length - 1]);
  const retC = center(retin);
  const scalLow = extreme(scal, [0, -1, 0]);
  const clavMid = centroid(clavicle);
  const axEnd = axLine[axLine.length - 1];
  const axMid = along(axLine, 0.5);

  // brachial plexus: roots C5-T1 -> interscalene -> behind clavicle -> cords around the axillary artery
  const plexusMeshes: Mesh[] = [];
  const interscalene = add(scalLow, [s * 0.01, 0.012, -0.008]);
  const retroClav = add(clavMid, [0, -0.012, -0.016]);
  const cordEnds = {
    lateral: add(axEnd, [s * 0.006, 0, 0.004]),
    posterior: add(axEnd, [0, 0, -0.008]),
    medial: add(axEnd, [-s * 0.006, -0.002, 0]),
  };
  const rootCord: Record<string, keyof typeof cordEnds> = { C5: "lateral", C6: "lateral", C7: "posterior", C8: "medial", T1: "medial" };
  ["C5", "C6", "C7", "C8", "T1"].forEach((lab, i) => {
    const st = stubs.get(lab);
    if (!st) return;
    const dy = 0.012 - i * 0.006;
    plexusMeshes.push(
      tube([st.p, add(interscalene, [0, dy, 0]), add(retroClav, [0, dy * 0.6, 0]), add(axMid, [0, dy * 0.3, i % 2 ? -0.004 : 0.004]), cordEnds[rootCord[lab]]], {
        radius: 0.0022,
        segments: 8,
        step: 0.003,
      }),
    );
  });
  const out: BuiltStructure[] = [nerve("brachial plexus", plexusMeshes, side)];

  // musculocutaneous: through coracobrachialis, between biceps and brachialis, to lateral forearm
  const cb = centroid(S(s, "coracobrachialis"));
  const brachialis = centroid(S(s, "brachialis"));
  const radLine = line(radius, latEpi);
  out.push(
    nerve(
      "musculocutaneous nerve",
      [
        tube(
          [cordEnds.lateral, add(cb, scale(lat, 0.004)), add(add(brachialis, scale(ant, 0.014)), scale(lat, 0.004)), add(latEpi, [-s * 0.012, 0.01, 0.022]), add(along(radLine, 0.35), [s * 0.008, 0, 0.014]), add(along(radLine, 0.7), [s * 0.008, 0, 0.012])],
          { radius: taper(0.0018, 0.0009), segments: 7 },
        ),
      ],
      side,
    ),
  );

  // median: with the brachial artery, midline of forearm, carpal tunnel, lateral 3.5 digits
  const forearmMid = (t: number) => add(lerp(along(raLine, t), along(ulLine, t), 0.5), [0, 0, -0.008]);
  const mc = (n: number) => S(s, `${["first", "second", "third", "fourth", "fifth"][n - 1]} metacarpal bone`);
  const mcHead = (n: number) => extreme(mc(n), [0, -1, 0]);
  const palmar = (p: Vec3) => add(p, [0, 0, 0.006]);
  const brPts = [0.1, 0.35, 0.6, 0.85].map((t, i) => add(along(brLine, t), scale(i < 2 ? lat : med, 0.004)));
  const palmHub = palmar(lerp(extreme(mc(3), [0, 1, 0]), mcHead(3), 0.25));
  const medianMain = tube([cordEnds.lateral, ...brPts, add(brLine[brLine.length - 1], scale(med, 0.005)), ...[0.15, 0.4, 0.65, 0.85].map(forearmMid), add(retC, [0, 0, -0.004]), palmHub], {
    radius: taper(0.0026, 0.0018),
    segments: 8,
  });
  const medianDigits = [1, 2, 3, 4].map((n) => {
    const head = palmar(mcHead(n));
    const tip = extreme(M(new RegExp(`^distal phalanx of ${sideWord(s)} ${["thumb", "index finger", "middle finger", "ring finger"][n - 1]}$`, "i")), [0, -1, 0]);
    const tgt = n === 4 ? lerp(head, palmar(mcHead(3)), 0.35) : head;
    return tube([palmHub, tgt, palmar(lerp(tgt, tip, 0.6))], { radius: taper(0.0012, 0.0006), segments: 6 });
  });
  out.push(nerve("median nerve", [medianMain, ...medianDigits], side));

  // ulnar: medial arm, behind the medial epicondyle, with the ulnar artery, lateral to pisiform
  const ulnarMain = tube(
    [
      cordEnds.medial,
      add(along(brLine, 0.25), scale(med, 0.009)),
      add(add(along(brLine, 0.55), scale(med, 0.012)), scale(post, 0.01)),
      add(medEpi, [0, 0.005, -0.009]),
      add(along(ulLine, 0.25), [-s * 0.006, 0, -0.006]),
      add(along(ulLine, 0.55), [-s * 0.005, 0, -0.002]),
      add(along(ulLine, 0.9), [-s * 0.004, 0, 0]),
      add(centroid(pis), [s * 0.006, -0.002, 0.004]),
    ],
    { radius: taper(0.0024, 0.0017), segments: 8 },
  );
  const ulnarHub = add(centroid(pis), [s * 0.004, -0.014, 0.004]);
  const ulnarDigits = [5, 4].map((n) => {
    const head = palmar(mcHead(n));
    const tip = extreme(M(new RegExp(`^distal phalanx of ${sideWord(s)} ${n === 5 ? "little finger" : "ring finger"}$`, "i")), [0, -1, 0]);
    const tgt = n === 4 ? lerp(head, palmar(mcHead(5)), 0.35) : head;
    return tube([add(centroid(pis), [s * 0.006, -0.002, 0.004]), ulnarHub, tgt, palmar(lerp(tgt, tip, 0.6))], { radius: taper(0.0012, 0.0006), segments: 6 });
  });
  out.push(nerve("ulnar nerve", [ulnarMain, ...ulnarDigits], side));

  // radial: spiral groove around the posterior humerus, anterior to the lateral epicondyle
  const r = 0.016;
  const spiral: Vec3[] = [];
  for (let i = 0; i <= 6; i++) {
    const f = 0.18 + i * 0.07;
    const th = (i / 6) * Math.PI; // medial -> posterior -> lateral around the shaft
    spiral.push(add(hAt(f), scale([-s * Math.cos(th), 0, -Math.sin(th)], r)));
  }
  const radialMain = tube([cordEnds.posterior, add(along(axLine, 0.85), [0, -0.01, -0.012]), ...spiral, add(latEpi, [-s * 0.004, 0.03, 0.016]), add(latEpi, [-s * 0.008, 0.002, 0.018])], {
    radius: taper(0.0027, 0.0022),
    segments: 8,
  });
  const splitR = add(latEpi, [-s * 0.008, 0.002, 0.018]);
  const radialSuperficial = tube(
    [splitR, add(along(raLine, 0.2), [s * 0.006, 0, 0.004]), add(along(raLine, 0.55), [s * 0.007, 0, 0.002]), add(along(raLine, 0.8), [s * 0.009, 0, -0.006]), add(lerp(extreme(mc(1), [0, 1, 0]), extreme(mc(2), [0, 1, 0]), 0.5), [0, 0, -0.01])],
    { radius: taper(0.0013, 0.0008), segments: 6 },
  );
  const ulnLine = line(ulna, medEpi);
  const pin = (t: number) => add(lerp(along(radLine, t), along(ulnLine, t), 0.5), [0, 0, -0.012]);
  const radialDeep = tube([splitR, add(along(radLine, 0.08), [s * 0.004, 0, -0.012]), pin(0.3), pin(0.6), pin(0.9)], { radius: taper(0.0015, 0.0008), segments: 6 });
  out.push(nerve("radial nerve", [radialMain, radialSuperficial, radialDeep], side));

  // axillary: around the surgical neck of the humerus into the deltoid
  const neck = hAt(0.14);
  const ring: Vec3[] = [];
  for (let i = 0; i <= 6; i++) {
    const a = (-120 + i * 32) * (Math.PI / 180);
    ring.push(add(neck, [s * Math.sin(a) * 0.021, 0, Math.cos(a) * 0.021]));
  }
  out.push(nerve("axillary nerve", [tube([cordEnds.posterior, add(along(axLine, 0.9), [0, -0.012, -0.02]), ...ring.slice(1)], { radius: taper(0.002, 0.0012), segments: 7 })], side));
  void hTop;
  void dot;
  return out;
}

// ---------------------------------------------------------------------------
// Thorax: intercostals, phrenic, vagus
// ---------------------------------------------------------------------------

const ORD = ["first", "second", "third", "fourth", "fifth", "sixth", "seventh", "eighth", "ninth", "tenth", "eleventh", "twelfth"];

function ribPath(s: Sgn, n: number): Vec3[] {
  const rib = S(s, `${ORD[n - 1]} rib`);
  const rb = bounds(rib);
  const zc = (rb.min[2] + rb.max[2]) / 2;
  const bins = 22;
  const acc: { p: Vec3; minY: number; n: number }[] = Array.from({ length: bins }, () => ({ p: [0, 0, 0] as Vec3, minY: Infinity, n: 0 }));
  const angOf = (x: number, z: number) => Math.atan2(s * x, z - zc); // 0 = anterior, pi = posterior
  let amin = Infinity;
  let amax = -Infinity;
  for (let i = 0; i < rib.positions.length; i += 3) {
    const a = angOf(rib.positions[i], rib.positions[i + 2]);
    amin = Math.min(amin, a);
    amax = Math.max(amax, a);
  }
  for (let i = 0; i < rib.positions.length; i += 3) {
    const x = rib.positions[i];
    const y = rib.positions[i + 1];
    const z = rib.positions[i + 2];
    const a = angOf(x, z);
    const b = Math.min(bins - 1, Math.floor(((a - amin) / (amax - amin + 1e-9)) * bins));
    acc[b].p = add(acc[b].p, [x, y, z]);
    acc[b].n++;
    acc[b].minY = Math.min(acc[b].minY, y);
  }
  // ordered from posterior (largest angle) to anterior; hug the inferior border, slightly inside
  const pts = acc
    .map((b, i) => ({ i, b }))
    .filter(({ b }) => b.n > 0)
    .sort((u, v) => v.i - u.i)
    .map(({ b }) => {
      const c = scale(b.p, 1 / b.n);
      const inward = norm([-c[0], 0, zc - c[2]]);
      return add([c[0], b.minY + 0.002, c[2]], scale(inward, 0.004));
    });
  return pts;
}

function intercostals(s: Sgn, stubs: Map<string, { p: Vec3; dir: Vec3 }>): Mesh {
  const meshes: Mesh[] = [];
  for (let n = 1; n <= 12; n++) {
    const st = stubs.get(`T${n}`);
    const path = ribPath(s, n);
    if (!st || path.length < 3) continue;
    const start = path.findIndex((p) => dist(p, st.p) > 0.02);
    const pts = [st.p, ...path.slice(Math.max(0, start))];
    // thoraco-abdominal nerves continue forward into the abdominal wall
    if (n >= 7) {
      const last = pts[pts.length - 1];
      pts.push(add(last, [-s * 0.03, -0.03 - (n - 7) * 0.006, 0.02]));
    }
    meshes.push(tube(pts, { radius: n === 12 ? 0.0014 : 0.0012, segments: 6, step: 0.003 }));
  }
  return mergeMeshes(meshes);
}

function phrenic(s: Sgn, stubs: Map<string, { p: Vec3; dir: Vec3 }>): Mesh {
  const scal = S(s, "scalenus anterior");
  const scLine = line(scal, [0, 2, 0.1]);
  const heart = M(s > 0 ? /^wall of ventricle$/i : /^wall of right atrium$/i);
  const heartSide = extreme(heart, [s, 0, 0.3]);
  const dia = M(/^diaphragm$/i);
  const dome = extreme({ positions: dia.positions.filter((_, i, a) => Math.abs(a[i - (i % 3)] - heartSide[0]) < 0.02), indices: new Uint32Array(0) }, [0, 1, 0]);
  const c4 = stubs.get("C4")!.p;
  const c3 = stubs.get("C3")!.p;
  const c5 = stubs.get("C5")!.p;
  const svcOrArch = s > 0 ? extreme(M(/^arch of aorta$/i), [1, 0, 0]) : extreme(M(/^superior vena cava$/i), [-1, 0, 0]);
  const main = tube(
    [c4, add(along(scLine, 0.25), [0, 0, 0.006]), add(along(scLine, 0.6), [0, 0, 0.007]), add(along(scLine, 0.95), [0, 0, 0.006]), add(svcOrArch, [s * 0.008, 0, 0.004]), add(heartSide, [s * 0.006, 0.02, 0]), add(heartSide, [s * 0.006, -0.02, 0]), add(dome, [0, 0.003, 0])],
    { radius: 0.0011, segments: 6 },
  );
  const roots = [c3, c5].map((c) => tube([c, add(along(scLine, 0.25), [0, 0, 0.006])], { radius: 0.0008, segments: 5 }));
  return mergeMeshes([main, ...roots]);
}

function vagus(s: Sgn): Mesh {
  const medulla = M(/^medulla oblongata$/i);
  const mc = centroid(medulla);
  const ijv = line(S(s, "internal jugular vein"), [0, 2, 0.1]);
  const cca = line(S(s, "common carotid artery"), [0, 2, 0.1]);
  const ica = line(S(s, "internal carotid artery"), [0, 0, 0.1]); // bottom -> top
  const eso = line(M(/^esophagus$/i), [0, 2, 0.1]);
  const bronchus = M(s > 0 ? /^left main bronchus$/i : /^right main bronchus proper$/i);
  const lungRoot = centroid(bronchus);
  const stomach = M(/^stomach$/i);
  const sb = bounds(stomach);
  const jugularForamen: Vec3 = [s * 0.03, mc[1] - 0.004, mc[2] + 0.004];
  const neck = [0.2, 0.5, 0.85].map((t) => add(lerp(along(ijv, t), along(cca, t), 0.5), [0, 0, -0.007]));
  const upperNeck = add(lerp(along(ica, 0.25), jugularForamen, 0.3), [s * 0.006, 0, -0.006]);
  const entry = s > 0 ? add(extreme(M(/^arch of aorta$/i), [1, 0.2, 0.4]), [0.006, 0.004, 0.002]) : add(extreme(S(-1, "subclavian artery"), [0.3, 0, 1]), [0, 0, 0.004]);
  const behindRoot = add(lungRoot, [-s * 0.012, 0, -0.018]);
  const esoPts = [0.55, 0.75, 0.92].map((t) => add(along(eso, t), [s * 0.004, 0, s > 0 ? 0.008 : -0.008]));
  const gastric = add(lerp([(sb.min[0] + sb.max[0]) / 2, sb.max[1] - 0.02, (sb.min[2] + sb.max[2]) / 2], extreme(stomach, [0, 1, 0]), 0.5), [0, 0, s > 0 ? 0.02 : -0.02]);
  const main = tube([add(mc, [s * 0.008, 0, 0.006]), jugularForamen, upperNeck, ...neck, entry, behindRoot, ...esoPts, gastric], {
    radius: taper(0.0018, 0.0012),
    segments: 7,
    step: 0.003,
  });
  // recurrent laryngeal nerve: loops under the subclavian (right) or aortic arch (left), ascends beside the trachea
  const trachea = line(M(/^trachea$/i), [0, 0, 0.1]);
  const hook = s > 0 ? add(extreme(M(/^arch of aorta$/i), [0.3, -1, 0]), [0, -0.006, 0]) : add(extreme(S(-1, "subclavian artery"), [0, -1, 0]), [0, -0.006, 0]);
  const rln = tube([entry, hook, add(along(trachea, 0.4), [s * 0.012, 0, -0.008]), add(along(trachea, 0.9), [s * 0.011, 0, -0.006])], { radius: 0.0008, segments: 5 });
  return mergeMeshes([main, rln]);
}

function facial(s: Sgn): Mesh {
  const temporal = S(s, "temporal bone");
  const mand = M(/^mandible$/i);
  const zyg = S(s, "zygomatic bone");
  const maxilla = S(s, "maxilla");
  const mastoid = extreme(temporal, [s * 0.2, -1, -0.6]);
  const foramen = add(mastoid, [-s * 0.008, 0.004, 0.012]);
  const mb = bounds(mand);
  const ramus = extreme({ positions: mand.positions.filter((_, i, a) => a[i - (i % 3) + 1] > mb.min[1] + 0.035 && a[i - (i % 3)] * s > 0), indices: new Uint32Array(0) }, [s, 0, -0.2]);
  const pes = add(ramus, [s * 0.008, -0.004, -0.004]);
  const out = (p: Vec3, d = 0.008) => add(p, [s * d, 0, 0.002]);
  const branches: Vec3[][] = [
    [pes, out(extreme(zyg, [s * 0.5, 1, -0.3]), 0.01), add(out(extreme(zyg, [s * 0.5, 1, -0.3]), 0.01), [0, 0.025, 0.004])],
    [pes, out(extreme(zyg, [s, 0, 0.2]), 0.009), out(extreme(zyg, [s * 0.3, 0.3, 1]), 0.008)],
    [pes, out(extreme(maxilla, [s * 0.8, -0.2, 0.6]), 0.012), out(extreme(maxilla, [s * 0.4, -0.5, 1]), 0.012)],
    [pes, out(extreme(mand, [s * 0.8, -1, 0.2]), 0.007), out(extreme(mand, [s * 0.5, -0.4, 1]), 0.007)],
    [pes, add(extreme(mand, [s, -1, -0.6]), [s * 0.006, -0.012, 0]), add(extreme(mand, [s, -1, -0.6]), [s * 0.004, -0.04, 0.01])],
  ];
  return mergeMeshes([
    tube([foramen, lerp(foramen, pes, 0.5), pes], { radius: 0.0014, segments: 7 }),
    ...branches.map((b) => tube(b, { radius: taper(0.0009, 0.0005), segments: 5 })),
  ]);
}

// ---------------------------------------------------------------------------
// Lower limb
// ---------------------------------------------------------------------------

/** Center of the largest hole in a projection of `m` along `dir` (e.g. the obturator foramen). */
function projectedHole(m: Mesh, dir: Vec3, region: (p: Vec3) => boolean): Vec3 | null {
  const n = norm(dir);
  const u = norm(Math.abs(n[1]) < 0.9 ? [n[2], 0, -n[0]] : [1, 0, 0]);
  const v: Vec3 = [n[1] * u[2] - n[2] * u[1], n[2] * u[0] - n[0] * u[2], n[0] * u[1] - n[1] * u[0]];
  const pts: [number, number, number][] = [];
  for (let i = 0; i < m.positions.length; i += 3) {
    const p: Vec3 = [m.positions[i], m.positions[i + 1], m.positions[i + 2]];
    if (!region(p)) continue;
    pts.push([dot(p, u), dot(p, v), dot(p, n)]);
  }
  if (!pts.length) return null;
  const px = 0.001;
  const minU = Math.min(...pts.map((p) => p[0])) - 0.004;
  const minV = Math.min(...pts.map((p) => p[1])) - 0.004;
  const W = Math.ceil((Math.max(...pts.map((p) => p[0])) + 0.004 - minU) / px);
  const H = Math.ceil((Math.max(...pts.map((p) => p[1])) + 0.004 - minV) / px);
  const img = new Uint8Array(W * H);
  // splat the triangles of the region
  for (let t = 0; t < m.indices.length; t += 3) {
    const tri = [0, 1, 2].map((k) => {
      const o = m.indices[t + k] * 3;
      return [m.positions[o], m.positions[o + 1], m.positions[o + 2]] as Vec3;
    });
    if (!tri.every(region)) continue;
    const uv = tri.map((p) => [(dot(p, u) - minU) / px, (dot(p, v) - minV) / px]);
    const steps = 8;
    for (let a = 0; a <= steps; a++)
      for (let b = 0; b <= steps - a; b++) {
        const w0 = a / steps;
        const w1 = b / steps;
        const w2 = 1 - w0 - w1;
        const x = Math.round(uv[0][0] * w0 + uv[1][0] * w1 + uv[2][0] * w2);
        const y = Math.round(uv[0][1] * w0 + uv[1][1] * w1 + uv[2][1] * w2);
        if (x >= 0 && y >= 0 && x < W && y < H) img[x + W * y] = 1;
      }
  }
  const seen = new Uint8Array(W * H);
  const q: number[] = [];
  const push = (id: number) => {
    if (!seen[id] && !img[id]) {
      seen[id] = 1;
      q.push(id);
    }
  };
  for (let x = 0; x < W; x++) {
    push(x);
    push(x + W * (H - 1));
  }
  for (let y = 0; y < H; y++) {
    push(W * y);
    push(W - 1 + W * y);
  }
  while (q.length) {
    const id = q.pop()!;
    const x = id % W;
    const y = Math.floor(id / W);
    if (x > 0) push(id - 1);
    if (x < W - 1) push(id + 1);
    if (y > 0) push(id - W);
    if (y < H - 1) push(id + W);
  }
  let best: { n: number; su: number; sv: number } | null = null;
  const lab = new Uint8Array(W * H);
  for (let s0 = 0; s0 < W * H; s0++) {
    if (seen[s0] || img[s0] || lab[s0]) continue;
    const stack = [s0];
    lab[s0] = 1;
    let cnt = 0;
    let su = 0;
    let sv = 0;
    while (stack.length) {
      const id = stack.pop()!;
      const x = id % W;
      const y = Math.floor(id / W);
      cnt++;
      su += x;
      sv += y;
      for (const nb of [x > 0 ? id - 1 : -1, x < W - 1 ? id + 1 : -1, y > 0 ? id - W : -1, y < H - 1 ? id + W : -1]) {
        if (nb < 0 || seen[nb] || img[nb] || lab[nb]) continue;
        lab[nb] = 1;
        stack.push(nb);
      }
    }
    if (!best || cnt > best.n) best = { n: cnt, su, sv };
  }
  if (!best || best.n < 40) return null;
  const cu = minU + (best.su / best.n) * px;
  const cv = minV + (best.sv / best.n) * px;
  const depth = pts.reduce((a, p) => a + p[2], 0) / pts.length;
  return add(add(scale(u, cu), scale(v, cv)), scale(n, depth));
}

function lowerLimb(sp: SpineModel, s: Sgn, stubs: Map<string, { p: Vec3; dir: Vec3 }>): BuiltStructure[] {
  const side = sideWord(s) as Side;
  const femur = S(s, "femur");
  const tibia = S(s, "tibia");
  const fibula = S(s, "fibula");
  const hip = S(s, "hip bone");
  const psoas = S(s, "psoas major");
  const piri = S(s, "piriformis");
  const femA = S(s, "femoral artery");
  const popA = S(s, "popliteal artery");
  const ptA = S(s, "posterior tibial artery");
  const atA = S(s, "anterior tibial artery");
  const extIl = S(s, "external iliac artery");
  const fb = bounds(femur);
  const fPA = principalAxes(femur.positions);
  const fAxis = fPA.axes[0][1] > 0 ? fPA.axes[0] : scale(fPA.axes[0], -1);
  const fAt = (f: number): Vec3 => add(fPA.center, scale(fAxis, fPA.extents[0] * (1 - 2 * f)));
  const tPA = principalAxes(tibia.positions);
  const tAxis = tPA.axes[0][1] > 0 ? tPA.axes[0] : scale(tPA.axes[0], -1);
  const tAt = (f: number): Vec3 => add(tPA.center, scale(tAxis, tPA.extents[0] * (1 - 2 * f)));

  const psoasLine = line(psoas, [0, 2, 0]);
  const femLine = line(femA, [0, 2, 0.1]);
  const popLine = line(popA, [0, 2, 0]);
  const ptLine = line(ptA, [0, 2, 0]);
  const atLine = line(atA, [0, 2, 0]);
  const extLine = line(extIl, [0, 2, 0]);
  const out: BuiltStructure[] = [];

  // lumbar plexus roots L1-L4 inside psoas
  const inPsoas = (t: number, lateral: number) => add(along(psoasLine, t), [s * lateral, 0, -0.004]);
  const lpMeshes: Mesh[] = [];
  const femoralStart = inPsoas(0.35, 0.012);
  const obturatorStart = inPsoas(0.4, -0.012);
  for (const lab of ["L1", "L2", "L3", "L4"]) {
    const st = stubs.get(lab);
    if (!st) continue;
    lpMeshes.push(tube([st.p, add(st.p, scale(st.dir, 0.01)), lab === "L1" ? inPsoas(0.25, 0.02) : lerp(femoralStart, obturatorStart, lab === "L4" ? 0.6 : 0.3)], { radius: 0.0018, segments: 6 }));
  }
  // iliohypogastric/ilioinguinal along the iliac crest to the abdominal wall
  const crest = extreme(hip, [s * 0.6, 1, 0.3]);
  lpMeshes.push(tube([inPsoas(0.25, 0.02), add(crest, [-s * 0.01, 0.01, -0.03]), add(crest, [-s * 0.012, 0.004, 0.01]), add(extreme(hip, [s * 0.2, 0.3, 1]), [-s * 0.02, 0.01, 0.01])], { radius: 0.0011, segments: 5 }));
  out.push(nerve("lumbar plexus", lpMeshes, side));

  // femoral nerve: groove between psoas and iliacus, lateral to the femoral artery
  const inguinal = add(extLine[extLine.length - 1], [s * 0.012, 0, 0]);
  const hub = add(along(femLine, 0.1), [s * 0.012, 0, 0.002]);
  // descend with psoas only while above the inguinal ligament, then pass beneath it
  const psoasPts = [0.45, 0.55, 0.65, 0.75].map((t) => inPsoas(t, 0.014)).filter((p) => p[1] > inguinal[1] + 0.03);
  const femMain = tube([femoralStart, ...psoasPts, add(inguinal, [0, 0.02, -0.01]), inguinal, hub], { radius: 0.0028, segments: 8 });
  const muscleTargets = ["vastus lateralis", "rectus femoris", "vastus medialis", "sartorius"].map((mname) => {
    const mm = S(s, mname);
    const ml = line(mm, [0, 2, 0.2]);
    return tube([hub, along(ml, 0.18), along(ml, 0.35)], { radius: taper(0.0014, 0.0008), segments: 6 });
  });
  out.push(nerve("femoral nerve", [femMain, ...muscleTargets], side));

  // saphenous nerve: adductor canal with the femoral artery, medial knee and leg
  const tibTopMed = extreme({ positions: tibia.positions.filter((_, i, a) => a[i - (i % 3) + 1] > bounds(tibia).max[1] - 0.05), indices: new Uint32Array(0) }, [-s, 0, 0]);
  const medMall = extreme(tibia, [-s * 0.7, -1, 0]);
  out.push(
    nerve(
      "saphenous nerve",
      [
        tube(
          [hub, add(along(femLine, 0.35), [-s * 0.004, 0, 0.006]), add(along(femLine, 0.7), [-s * 0.006, 0, 0.006]), add(along(femLine, 0.98), [-s * 0.01, 0.01, 0.01]), add(tibTopMed, [-s * 0.012, 0.01, -0.006]), add(tAt(0.4), [-s * 0.028, 0, 0.004]), add(tAt(0.75), [-s * 0.022, 0, 0.006]), add(medMall, [-s * 0.004, 0.012, 0.012])],
          { radius: 0.0011, segments: 6 },
        ),
      ],
      side,
    ),
  );

  // obturator nerve: medial psoas, lateral pelvic wall, obturator foramen, adductors
  const hb = bounds(hip);
  const obt =
    projectedHole(hip, [s * 0.35, 0, 1], (p) => p[1] < hb.min[1] + 0.08 && p[2] > (hb.min[2] + hb.max[2]) / 2 - 0.02) ??
    [hb.min[0] * 0.5 + hb.max[0] * 0.5, hb.min[1] + 0.04, hb.max[2] - 0.04];
  const add1 = line(S(s, "adductor magnus"), [0, 2, 0.2]);
  out.push(
    nerve(
      "obturator nerve",
      [tube([obturatorStart, inPsoas(0.6, -0.018), add(obt, [-s * 0.012, 0.03, -0.01]), add(obt, [0, 0.004, 0]), add(obt, [s * 0.004, -0.01, 0.012]), add(along(add1, 0.2), [0, 0, 0.018]), add(along(add1, 0.4), [0, 0, 0.02])], { radius: taper(0.002, 0.0012), segments: 6 })],
      side,
    ),
  );

  // sacral plexus -> sciatic nerve below piriformis
  const pb = bounds(piri);
  const piriLow = extreme({ positions: piri.positions.filter((_, i, a) => { const x = a[i - (i % 3)]; const f = (x - pb.min[0]) / (pb.max[0] - pb.min[0]); return f > 0.35 && f < 0.65; }), indices: new Uint32Array(0) }, [0, -1, 0]);
  const sciaticExit = add(piriLow, [0, -0.006, -0.004]);
  const plexusPt = add(centroid(piri), [-s * 0.012, -0.01, 0.018]);
  const spMeshes: Mesh[] = [];
  for (const lab of ["L4", "L5", "S1", "S2", "S3"]) {
    const st = stubs.get(lab);
    if (!st) continue;
    spMeshes.push(tube([st.p, lerp(st.p, plexusPt, 0.5), plexusPt, sciaticExit], { radius: 0.0022, segments: 6 }));
  }
  out.push(nerve("sacral plexus", spMeshes, side));

  const trochanter = extreme(femur, [s, 0.6, -0.4]);
  const ischial = extreme(hip, [0, -1, -0.5]);
  const gluteal = add(lerp(trochanter, ischial, 0.5), [0, 0, -0.012]);
  const thigh = (f: number) => add(fAt(f), [-s * 0.004, 0, -0.03]);
  const split = thigh(0.7);
  out.push(
    nerve(
      "sciatic nerve",
      [tube([sciaticExit, gluteal, thigh(0.2), thigh(0.35), thigh(0.5), split], { radius: () => [0.0062, 0.0032], segments: 12, sideHint: [1, 0, 0] })],
      side,
    ),
  );

  // tibial nerve: popliteal fossa, deep posterior leg, behind the medial malleolus, plantar nerves
  const calc = S(s, "calcaneus");
  const mt1 = extreme(S(s, "first metatarsal bone"), [0, -0.3, 1]);
  const mt5 = extreme(S(s, "fifth metatarsal bone"), [s * 0.3, -0.3, 1]);
  const sole = (p: Vec3) => add(p, [0, -0.008, 0]);
  const behindMall = add(medMall, [-s * 0.002, 0.004, -0.014]);
  const plantarHub = add(centroid(calc), [-s * 0.012, -0.012, 0.03]);
  out.push(
    nerve(
      "tibial nerve",
      [
        tube([split, add(along(popLine, 0.35), [0, 0, -0.008]), add(along(popLine, 0.8), [0, 0, -0.008]), ...[0.15, 0.4, 0.65, 0.88].map((t) => add(along(ptLine, t), [0, 0, -0.006])), behindMall, plantarHub], { radius: taper(0.0038, 0.0022), segments: 8 }),
        tube([plantarHub, sole(lerp(plantarHub, mt1, 0.6)), sole(mt1)], { radius: taper(0.0016, 0.0009), segments: 6 }),
        tube([plantarHub, sole(lerp(plantarHub, mt5, 0.6)), sole(mt5)], { radius: taper(0.0014, 0.0008), segments: 6 }),
      ],
      side,
    ),
  );

  // common fibular nerve: biceps femoris border, around the fibular neck, deep & superficial branches
  const fibTop = extreme(fibula, [0, 1, 0]);
  const fibNeck = add(fibTop, [s * 0.006, -0.03, 0.002]);
  const latCondyle = extreme({ positions: femur.positions.filter((_, i, a) => a[i - (i % 3) + 1] < fb.min[1] + 0.05), indices: new Uint32Array(0) }, [s, 0, -0.5]);
  const deepEnd = add(lerp(extreme(S(s, "first metatarsal bone"), [0, 1, 0]), extreme(S(s, "second metatarsal bone"), [0, 1, 0]), 0.5), [0, 0.006, 0]);
  const fPA2 = principalAxes(fibula.positions);
  const fbAxis = fPA2.axes[0][1] > 0 ? fPA2.axes[0] : scale(fPA2.axes[0], -1);
  const fibAt = (f: number): Vec3 => add(fPA2.center, scale(fbAxis, fPA2.extents[0] * (1 - 2 * f)));
  out.push(
    nerve(
      "common fibular nerve",
      [
        tube([split, add(latCondyle, [s * 0.004, 0.02, -0.018]), add(fibTop, [s * 0.004, 0.004, -0.012]), add(fibNeck, [s * 0.008, 0, -0.004]), add(fibNeck, [s * 0.006, -0.004, 0.012])], { radius: 0.0024, segments: 7 }),
        tube([add(fibNeck, [s * 0.006, -0.004, 0.012]), ...[0.15, 0.45, 0.75, 0.95].map((t) => add(along(atLine, t), [s * 0.003, 0, 0.002])), deepEnd], { radius: taper(0.0016, 0.0009), segments: 6 }),
        tube([add(fibNeck, [s * 0.006, -0.004, 0.012]), add(fibAt(0.3), [s * 0.012, 0, 0.006]), add(fibAt(0.6), [s * 0.012, 0, 0.01]), add(fibAt(0.85), [s * 0.004, 0, 0.02]), add(centroid(S(s, "third metatarsal bone")), [0, 0.012, 0])], { radius: taper(0.0014, 0.0008), segments: 6 }),
      ],
      side,
    ),
  );
  void tAt;
  void sp;
  return out;
}

// ---------------------------------------------------------------------------

export function generateNervous(): BuiltStructure[] {
  const t0 = Date.now();
  const sp = buildSpineModel();
  const out: BuiltStructure[] = [];
  out.push(nerve("spinal cord", [spinalCord(sp)]));
  out.push(nerve("cauda equina", caudaEquina(sp)));
  for (const s of [1, -1] as Sgn[]) {
    const side = sideWord(s) as Side;
    const { mesh, stubEnds } = spinalNerves(sp, s);
    out.push(nerve("spinal nerves", [mesh], side));
    out.push(nerve("sympathetic trunk", [sympatheticTrunk(sp, s)], side));
    out.push(...upperLimb(sp, s, stubEnds));
    out.push(nerve("intercostal nerves", [intercostals(s, stubEnds)], side));
    out.push(nerve("phrenic nerve", [phrenic(s, stubEnds)], side));
    out.push(nerve("vagus nerve (CN X)", [vagus(s)], side));
    out.push(nerve("facial nerve (CN VII)", [facial(s)], side));
    out.push(...lowerLimb(sp, s, stubEnds));
  }
  console.log(`  nerves: ${out.length} structures in ${((Date.now() - t0) / 1000).toFixed(1)}s`);
  void query;
  void slicePath;
  void sub;
  return out;
}
