/**
 * Data overlays: each one re-colours the body by a property (categorical or quantitative),
 * optionally animates vessels/nerves, and explains itself with a legend and source note.
 */
import type { StructureMeta } from "@shared/anatomy";
import type { ConceptInfo } from "./knowledge/types";
import type { LoadedModel } from "./model";
import { GROUP_LOOK, SYSTEMS, SYSTEM_BY_ID } from "./systems";

export type OverlayId =
  | "systems"
  | "tissue"
  | "oxygen"
  | "bloodflow"
  | "perfusion"
  | "metabolic"
  | "arterial"
  | "innervation"
  | "germ";

/** Animation channel per structure, read by the shader. */
export const ANIM = { none: 0, arterial: 1, venous: 2, nerve: 3 } as const;

export interface LegendItem {
  label: string;
  color: string;
  note?: string;
}

export type Legend =
  | { kind: "categorical"; items: LegendItem[] }
  | { kind: "scale"; min: number; max: number; unit: string; log?: boolean; stops: string[]; ticks: number[]; missing: string };

export interface OverlayResult {
  /** Colour per structure index (null = no data, drawn as a muted neutral). */
  colors: (string | null)[];
  anim?: Uint8Array;
  legend: Legend;
  /** Human-readable value for the info panel / tooltip. */
  value(s: StructureMeta): string | null;
}

export interface OverlayDef {
  id: OverlayId;
  label: string;
  short: string;
  description: string;
  source: string;
  needsKnowledge?: boolean;
  animated?: boolean;
  compute(model: LoadedModel, kb: Record<string, ConceptInfo> | null): OverlayResult;
}

export const NO_DATA = "#3a3f47";

// Perceptually ordered ramps that stay readable against the dark stage.
const HEAT = ["#2c3e91", "#5b3fa6", "#a23f9a", "#e0567a", "#f78c4c", "#fcd34d"];
const OXY = ["#2b3a8f", "#5b4fb3", "#9b4d9e", "#d24866", "#ef3f3f"];

function lerpHex(a: string, b: string, t: number) {
  const pa = parseInt(a.slice(1), 16);
  const pb = parseInt(b.slice(1), 16);
  const ch = (s: number) => {
    const x = (pa >> s) & 255;
    const y = (pb >> s) & 255;
    return Math.round(x + (y - x) * t);
  };
  return `#${((ch(16) << 16) | (ch(8) << 8) | ch(0)).toString(16).padStart(6, "0")}`;
}

export function ramp(stops: string[], t: number) {
  const x = Math.min(1, Math.max(0, t)) * (stops.length - 1);
  const i = Math.min(stops.length - 2, Math.floor(x));
  return lerpHex(stops[i], stops[i + 1], x - i);
}

// ─────────────────────────── organ-level physiology tables ───────────────────────────

type OrganKey =
  | "brain" | "heart" | "kidney" | "liver" | "gi" | "spleen" | "pancreas" | "muscle" | "skin" | "bone"
  | "lung" | "thyroid" | "adrenal" | "adipose" | "reproductive" | "eye";

const ORGAN_LABEL: Record<OrganKey, string> = {
  brain: "Brain & spinal cord",
  heart: "Heart",
  kidney: "Kidneys",
  liver: "Liver",
  gi: "Gut (portal circulation)",
  spleen: "Spleen",
  pancreas: "Pancreas",
  muscle: "Skeletal muscle",
  skin: "Skin",
  bone: "Bone",
  lung: "Lungs (bronchial supply)",
  thyroid: "Thyroid",
  adrenal: "Adrenal glands",
  adipose: "Adipose tissue",
  reproductive: "Reproductive organs",
  eye: "Eye",
};

function organOf(s: StructureMeta): OrganKey | null {
  const c = s.concept;
  if (s.group === "brain" || c === "spinal-cord" || c === "cauda-equina") return "brain";
  if (s.group === "heart" || /anterior-descending|circumflex-artery|coronary|cardiac-veins/.test(c)) return "heart";
  if (c === "kidney") return "kidney";
  if (c.startsWith("liver-") || c === "biliary-tree" || c === "gallbladder") return "liver";
  if (c === "pancreas" || c === "pancreatic-duct") return "pancreas";
  if (c === "spleen") return "spleen";
  if (s.system === "digestive" && s.group === "organ" && !/gingiva|tongue/.test(c)) return "gi";
  if (s.group === "muscle" || c === "tongue") return "muscle";
  if (s.group === "skin") return "skin";
  if (s.group === "bone") return "bone";
  if (s.group === "lung" || c === "bronchial-tree") return "lung";
  if (c === "thyroid-gland") return "thyroid";
  if (c === "adrenal-gland") return "adrenal";
  if (c === "breast-adipose-tissue") return "adipose";
  if (s.system === "reproductive") return "reproductive";
  if (s.group === "eye") return "eye";
  return null;
}

/** Share of resting cardiac output (%), Guyton & Hall Textbook of Medical Physiology, table 17-1. */
const CARDIAC_OUTPUT: Partial<Record<OrganKey, [number, string?]>> = {
  brain: [14],
  heart: [4],
  lung: [2, "bronchial arteries only — the lungs also receive the entire output of the right ventricle"],
  kidney: [22],
  liver: [27, "hepatic artery ~6% plus portal inflow ~21% from the gut and spleen"],
  gi: [21, "portal flow, which then passes through the liver"],
  spleen: [21, "part of the portal flow"],
  pancreas: [21, "part of the portal flow"],
  muscle: [15, "at rest; can exceed 80% during maximal exercise"],
  bone: [5],
  skin: [6, "in cool weather; rises many-fold with heat stress"],
  thyroid: [1],
  adrenal: [0.5],
};

/** Resting perfusion in mL/min per 100 g tissue (Guyton & Hall table 17-1). */
const PERFUSION: Partial<Record<OrganKey, number>> = {
  brain: 50,
  heart: 70,
  lung: 25,
  kidney: 360,
  liver: 95,
  gi: 40,
  spleen: 40,
  pancreas: 40,
  muscle: 4,
  bone: 3,
  skin: 3,
  thyroid: 160,
  adrenal: 300,
};

/** Specific metabolic rate in kcal per kg per day (Elia 1992; Wang et al. 2010). */
const METABOLIC: Partial<Record<OrganKey, [number, string?]>> = {
  heart: [440],
  kidney: [440],
  brain: [240],
  liver: [200],
  muscle: [13],
  adipose: [4.5],
  gi: [12, "average of the residual tissues"],
  spleen: [12, "average of the residual tissues"],
  pancreas: [12, "average of the residual tissues"],
  lung: [12, "average of the residual tissues"],
  skin: [12, "average of the residual tissues"],
  bone: [12, "average of the residual tissues"],
  thyroid: [12, "average of the residual tissues"],
  adrenal: [12, "average of the residual tissues"],
  reproductive: [12, "average of the residual tissues"],
};

function scaleOverlay(
  model: LoadedModel,
  get: (s: StructureMeta) => [number, string?] | undefined,
  opts: { min: number; max: number; unit: string; log?: boolean; stops: string[]; ticks: number[]; fmt: (v: number) => string },
): OverlayResult {
  const norm = (v: number) =>
    opts.log ? (Math.log(v) - Math.log(opts.min)) / (Math.log(opts.max) - Math.log(opts.min)) : (v - opts.min) / (opts.max - opts.min);
  const colors = model.manifest.structures.map((s) => {
    const v = get(s);
    return v ? ramp(opts.stops, norm(v[0])) : null;
  });
  return {
    colors,
    legend: { kind: "scale", min: opts.min, max: opts.max, unit: opts.unit, log: opts.log, stops: opts.stops, ticks: opts.ticks, missing: "No data" },
    value(s) {
      const v = get(s);
      if (!v) return null;
      return `${opts.fmt(v[0])}${v[1] ? ` — ${v[1]}` : ""}`;
    },
  };
}

function categorical(
  model: LoadedModel,
  items: LegendItem[],
  classify: (s: StructureMeta) => string | null,
  extra?: { anim?: (s: StructureMeta) => number; note?: (s: StructureMeta, label: string) => string | undefined },
): OverlayResult {
  const byLabel = new Map(items.map((i) => [i.label, i]));
  const labels = model.manifest.structures.map(classify);
  const present = new Set(labels.filter(Boolean));
  let anim: Uint8Array | undefined;
  if (extra?.anim) {
    anim = new Uint8Array(model.manifest.structures.length);
    model.manifest.structures.forEach((s, i) => (anim![i] = extra.anim!(s)));
  }
  return {
    colors: labels.map((l) => (l ? byLabel.get(l)?.color ?? null : null)),
    anim,
    legend: { kind: "categorical", items: items.filter((i) => present.has(i.label)) },
    value(s) {
      const l = labels[s.index];
      if (!l) return null;
      return extra?.note?.(s, l) ?? byLabel.get(l)?.note ?? l;
    },
  };
}

// ─────────────────────────── vascular & neural territories ───────────────────────────

const ARTERIAL: { label: string; color: string; re: RegExp }[] = [
  { label: "Coronary arteries", color: "#ff5d73", re: /coronary|anterior-descending|circumflex-artery$/ },
  { label: "Pulmonary circulation", color: "#6c8cff", re: /^pulmonary/ },
  { label: "Brain (internal carotid & vertebral)", color: "#f9c74f", re: /cerebral|vertebrobasilar|internal-carotid|ophthalmic|basilar|vertebral-arter/ },
  { label: "Head & neck (external carotid, thyrocervical)", color: "#f8961e", re: /external-carotid|common-carotid|facial-arter|lingual|maxillary-arter|temporal-arter|occipital-arter|thyroid-arter|thyrocervical|cervical-arter|costocervical/ },
  { label: "Upper limb & shoulder (subclavian)", color: "#90be6d", re: /subclavian|axillary|brachial-arter|radial|ulnar|interosseous|humeral|scapular|thoracodorsal|thoraco-acromial|lateral-thoracic|collateral|hand|palmar|digital-arter/ },
  { label: "Chest & abdominal wall", color: "#43aa8b", re: /internal-thoracic|intercostal|epigastric|musculophrenic|subcostal/ },
  { label: "Thoracic viscera (aortic branches)", color: "#4d908e", re: /bronchial|esophageal|descending-thoracic/ },
  { label: "Foregut (celiac trunk)", color: "#c77dff", re: /celiac|hepatic-arter|gastric|splenic-arter|gastroduodenal/ },
  { label: "Midgut (superior mesenteric)", color: "#e76fcb", re: /superior-mesenteric|ileocolic|jejunal|ileal|middle-colic|right-colic/ },
  { label: "Hindgut (inferior mesenteric)", color: "#ff99c8", re: /inferior-mesenteric|sigmoid|superior-rectal|left-colic/ },
  { label: "Kidneys, adrenals & posterior wall", color: "#ffd166", re: /renal|suprarenal|phrenic|lumbar-arter|testicular|ovarian|abdominal-aorta|gonadal/ },
  { label: "Pelvis & gluteal region (internal iliac)", color: "#ef476f", re: /internal-iliac|gluteal|pudendal|obturator-arter|uterine|vesical|penis|vaginal|middle-rectal/ },
  { label: "Lower limb (external iliac → femoral)", color: "#06d6a0", re: /external-iliac|common-iliac|femoral|perforating|popliteal|genicular|tibial|fibular-arter|peroneal|dorsalis-pedis|foot|plantar/ },
  { label: "Aorta & great vessels", color: "#ff4040", re: /aorta|brachiocephalic-trunk/ },
];

function arterialTerritory(concept: string) {
  for (const t of ARTERIAL) if (t.re.test(concept)) return t;
  return null;
}

const NEURAL: { label: string; color: string; re: RegExp }[] = [
  { label: "Central nervous system", color: "#f5e6b8", re: /spinal cord|brain|cauda equina|medulla|cerebr/ },
  { label: "Cranial nerves", color: "#f2c94c", re: /\bcn\b|cranial|facial|trigeminal|mandibular|maxillary n|ophthalmic|oculomotor|trochlear|abducens|hypoglossal|glossopharyngeal|vagus|vagal|accessory|optic|lingual nerve|chorda|buccal nerve|recurrent laryngeal|laryngeal nerve/ },
  { label: "Cervical plexus (C1–C4)", color: "#56ccf2", re: /phrenic|cervical plexus|ansa cervicalis|\bc1\b|\bc2\b|suboccipital|great auricular/ },
  { label: "Brachial plexus (C5–T1)", color: "#2f80ed", re: /median|ulnar|radial|musculocutaneous|axillary|brachial plexus|thoracodorsal|long thoracic|suprascapular|subscapular|pectoral nerve|dorsal scapular|medial pectoral|lateral pectoral|nerve to subclavius|antebrachial/ },
  { label: "Thoracic spinal nerves", color: "#27ae60", re: /intercostal|thoracoabdominal|subcostal/ },
  { label: "Lumbar plexus (L1–L4)", color: "#f2994a", re: /femoral|obturator|genitofemoral|ilioinguinal|iliohypogastric|lumbar plexus|saphenous|lateral (femoral )?cutaneous/ },
  { label: "Sacral plexus (L4–S4)", color: "#eb5757", re: /sciatic|tibial|fibular|peroneal|gluteal|pudendal|sacral plexus|plantar|sural|nerve to (piriformis|obturator internus|quadratus)|levator ani nerve/ },
  { label: "Dorsal rami of spinal nerves", color: "#9b51e0", re: /dorsal rami|posterior rami|dorsal ramus|posterior ramus/ },
  { label: "Spinal nerves & roots", color: "#8fd3a8", re: /spinal nerve/ },
  { label: "Autonomic nerves", color: "#d98bdf", re: /sympathetic|parasympathetic|autonomic|splanchnic|enteric/ },
];

function neuralCategory(text: string) {
  const t = text.toLowerCase().replace(/-/g, " ");
  let best: (typeof NEURAL)[number] | null = null;
  let bestAt = Infinity;
  for (const n of NEURAL) {
    const m = n.re.exec(t);
    if (m && m.index < bestAt) {
      best = n;
      bestAt = m.index;
    }
  }
  return best;
}

// ─────────────────────────── germ layers ───────────────────────────

const GERM: LegendItem[] = [
  { label: "Ectoderm", color: "#5ab4f0", note: "Ectoderm — surface ectoderm or neural tube" },
  { label: "Neural crest", color: "#b58cf0", note: "Neural crest — migratory ectodermal cells" },
  { label: "Mesoderm", color: "#ef6f5e", note: "Mesoderm (paraxial, intermediate or lateral plate)" },
  { label: "Endoderm", color: "#f2c14e", note: "Endoderm — lining of the primitive gut tube and its outgrowths" },
];

function germLayer(s: StructureMeta): string | null {
  const c = s.concept;
  if (/sympathetic-trunk|spinal-nerves|cauda/.test(c)) return "Neural crest"; // ganglia & Schwann cells
  if (/mandible|maxilla|zygomatic|nasal-bone|lacrimal-bone|palatine|vomer|hyoid|inferior-nasal-concha|frontal-bone|incus|malleus|stapes|nasal-cartilages/.test(c))
    return "Neural crest";
  if (/adrenal/.test(c)) return "Mesoderm"; // cortex (medulla is neural crest)
  if (s.group === "teeth") return "Ectoderm";
  if (s.system === "nervous" && s.group !== "ligament") return "Ectoderm";
  if (s.group === "skin" || c === "mammary-gland" || c === "pituitary-gland" || c === "lacrimal-apparatus") return "Ectoderm";
  if (s.system === "digestive" && s.group === "organ" && c !== "gingiva") return "Endoderm";
  if (s.system === "digestive" && s.group === "gland") return "Endoderm";
  if (/thyroid-gland|thymus|trachea|bronch|lobe-of-lung|urinary-bladder|urethra|prostate|epiglottis/.test(c)) return "Endoderm";
  if (c === "gingiva") return "Ectoderm";
  return "Mesoderm";
}

// ─────────────────────────── oxygen saturation ───────────────────────────

/** Typical resting haemoglobin O2 saturation (%) of the blood inside or leaving a structure. */
function oxygen(s: StructureMeta): [number, string] | null {
  const c = s.concept;
  if (c === "cardiac-veins") return [30, "coronary sinus blood — the heart extracts ~70% of delivered O₂"];
  if (c === "internal-jugular-vein") return [65, "jugular venous blood leaving the brain"];
  if (c === "renal-vein") return [90, "the kidneys take little O₂ relative to their huge flow"];
  if (c === "hepatic-portal-system") return [85, "portal venous blood from the gut"];
  if (c === "hepatic-veins") return [65, "blood leaving the liver"];
  if (/^pulmonary-arter|pulmonary-trunk/.test(c)) return [75, "deoxygenated blood going to the lungs"];
  if (/^pulmonary-vein/.test(c)) return [98, "freshly oxygenated blood returning from the lungs"];
  if (/blood-pool/.test(c)) return s.side === "right" ? [75, "right heart: mixed venous blood"] : [98, "left heart: arterial blood"];
  if (s.group === "artery") return [98, "systemic arterial blood"];
  if (s.group === "vein") return [72, "systemic venous blood (mixed venous ~70–75%)"];
  return null;
}

// ─────────────────────────── definitions ───────────────────────────

export const OVERLAYS: OverlayDef[] = [
  {
    id: "systems",
    label: "Body systems",
    short: "Systems",
    description: "Colours every structure by the organ system it belongs to.",
    source: "Classification: Terminologia Anatomica.",
    compute: (model) =>
      categorical(
        model,
        SYSTEMS.map((s) => ({ label: s.label, color: s.color })),
        (s) => SYSTEM_BY_ID[s.system].label,
      ),
  },
  {
    id: "tissue",
    label: "Tissue types",
    short: "Tissues",
    description: "Groups structures by tissue: muscle, bone, cartilage, vessels, nerves, glands and more.",
    source: "Histological classification of each structure.",
    compute: (model) => {
      const colors: Record<string, string> = {
        Skin: "#e7b99a", Muscle: "#d1453f", Tendon: "#e9dcc4", Bone: "#f1e7d0", Cartilage: "#8fc9d9", Ligament: "#c9b58f",
        Artery: "#ea3b43", Vein: "#3f5fd1", Heart: "#b7303a", Nerve: "#f3cf4a", Brain: "#e6b8b8", Eye: "#8fd3f0",
        Organ: "#e08a5d", Lung: "#e3a2b2", Airway: "#9dc7e8", Gland: "#b08ce3", Teeth: "#fbf6e8", Membrane: "#f5dc8a",
      };
      const items = Object.entries(colors).map(([label, color]) => ({ label, color }));
      return categorical(model, items, (s) => GROUP_LOOK[s.group].label);
    },
  },
  {
    id: "oxygen",
    label: "Blood oxygen & flow",
    short: "Oxygen",
    description:
      "Haemoglobin oxygen saturation in each vessel and heart chamber, with animated pulses travelling away from the heart in arteries and back in veins.",
    source: "Typical resting values: Guyton & Hall; West's Respiratory Physiology.",
    animated: true,
    compute: (model) => {
      const res = scaleOverlay(model, (s) => oxygen(s) ?? undefined, {
        min: 25, max: 100, unit: "% O₂ sat.", stops: OXY, ticks: [25, 50, 75, 100], fmt: (v) => `${v}% saturated`,
      });
      const anim = new Uint8Array(model.manifest.structures.length);
      model.manifest.structures.forEach((s, i) => {
        if (s.group === "artery") anim[i] = ANIM.arterial;
        else if (s.group === "vein") anim[i] = ANIM.venous;
      });
      return { ...res, anim };
    },
  },
  {
    id: "bloodflow",
    label: "Share of cardiac output",
    short: "Blood flow",
    description: "How the ~5 L/min resting cardiac output is divided between organs. The kidneys and liver take almost half.",
    source: "Guyton & Hall, Textbook of Medical Physiology, table 17-1 (resting adult).",
    compute: (model) =>
      scaleOverlay(model, (s) => {
        const o = organOf(s);
        const v = o ? CARDIAC_OUTPUT[o] : undefined;
        return v ? [v[0], v[1] ?? ORGAN_LABEL[o!]] : undefined;
      }, { min: 0.5, max: 27, unit: "% of cardiac output", log: true, stops: HEAT, ticks: [1, 3, 10, 27], fmt: (v) => `${v}% of cardiac output` }),
  },
  {
    id: "perfusion",
    label: "Perfusion per 100 g",
    short: "Perfusion",
    description: "Blood flow per unit mass. Kidneys and adrenals are the most richly perfused tissues; resting muscle and bone the least.",
    source: "Guyton & Hall, Textbook of Medical Physiology, table 17-1 (mL/min per 100 g).",
    compute: (model) =>
      scaleOverlay(model, (s) => {
        const o = organOf(s);
        const v = o ? PERFUSION[o] : undefined;
        return v !== undefined ? [v, ORGAN_LABEL[o!]] : undefined;
      }, { min: 3, max: 360, unit: "mL/min/100 g", log: true, stops: HEAT, ticks: [3, 10, 40, 100, 360], fmt: (v) => `${v} mL/min per 100 g` }),
  },
  {
    id: "metabolic",
    label: "Metabolic rate",
    short: "Metabolism",
    description:
      "Resting energy use per kilogram of tissue. Heart and kidneys burn ~35× more energy per kg than resting muscle; brain and liver together account for ~40% of resting energy expenditure.",
    source: "Elia M. (1992) Organ and tissue contribution to metabolic rate; Wang Z. et al. (2010) Am J Clin Nutr.",
    compute: (model) =>
      scaleOverlay(model, (s) => {
        const o = organOf(s);
        const v = o ? METABOLIC[o] : undefined;
        return v ? [v[0], v[1] ?? ORGAN_LABEL[o!]] : undefined;
      }, { min: 4, max: 440, unit: "kcal/kg/day", log: true, stops: HEAT, ticks: [4, 13, 50, 200, 440], fmt: (v) => `${v} kcal/kg/day` }),
  },
  {
    id: "arterial",
    label: "Arterial territories",
    short: "Blood supply",
    description: "Colours arteries by the trunk they branch from, and every other structure by the territory of its main supplying artery.",
    source: "Supply relationships from the Anatomica knowledge base (Gray's, Moore, Netter).",
    needsKnowledge: true,
    compute: (model, kb) =>
      categorical(
        model,
        ARTERIAL.map(({ label, color }) => ({ label, color })),
        (s) => {
          if (s.group === "vein") return null;
          if (s.group === "artery") return arterialTerritory(s.concept)?.label ?? null;
          const info = kb?.[s.concept];
          const sup = info?.connections?.find((c) => c.relation === "supplied-by" && arterialTerritory(c.concept));
          return sup ? arterialTerritory(sup.concept)!.label : null;
        },
        {
          anim: (s) => (s.group === "artery" ? ANIM.arterial : ANIM.none),
          note: (s, label) => {
            if (s.group === "artery") return label;
            const sup = kb?.[s.concept]?.connections?.find((c) => c.relation === "supplied-by");
            const name = sup ? model.byConcept.get(sup.concept)?.[0]?.conceptName : undefined;
            return name ? `${label} — via ${name.toLowerCase()}` : label;
          },
        },
      ),
  },
  {
    id: "innervation",
    label: "Nerve supply",
    short: "Innervation",
    description: "Colours nerves by plexus or origin, and muscles and organs by the nerves that supply them, with impulses flowing out from the spinal cord.",
    source: "Innervation from the Anatomica knowledge base (Gray's, Moore, Netter).",
    needsKnowledge: true,
    animated: true,
    compute: (model, kb) => {
      const text = (s: StructureMeta): string | null => {
        if (s.system === "nervous" && (s.group === "nerve" || s.group === "brain")) return s.conceptName;
        const info = kb?.[s.concept];
        if (!info) return null;
        if (info.innervation) return info.innervation;
        const inn = info.connections?.filter((c) => c.relation === "innervated-by").map((c) => c.concept.replace(/-/g, " "));
        return inn && inn.length ? inn.join(", ") : null;
      };
      return categorical(
        model,
        NEURAL.map(({ label, color }) => ({ label, color })),
        (s) => {
          const t = text(s);
          if (!t) return null;
          // Viscera run on autonomic supply even when a named cranial nerve (the vagus) carries it.
          if (["organ", "heart", "lung", "gland"].includes(s.group) && s.system !== "nervous") return "Autonomic nerves";
          return neuralCategory(t)?.label ?? null;
        },
        {
          anim: (s) => (s.group === "nerve" && s.concept !== "spinal-cord" ? ANIM.nerve : ANIM.none),
          note: (s, label) => {
            const t = text(s);
            return t && s.group !== "nerve" && s.group !== "brain" ? `${label} — ${t}` : label;
          },
        },
      );
    },
  },
  {
    id: "germ",
    label: "Embryonic germ layers",
    short: "Germ layers",
    description: "Which of the three primary germ layers (plus the neural crest) each structure mostly develops from.",
    source: "Langman's Medical Embryology; Larsen's Human Embryology. Mixed-origin organs show their dominant tissue.",
    compute: (model) => categorical(model, GERM, germLayer),
  },
];

export const OVERLAY_BY_ID = Object.fromEntries(OVERLAYS.map((o) => [o.id, o])) as Record<OverlayId, OverlayDef>;
