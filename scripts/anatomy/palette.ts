/** Display colors for structures (medical-illustration palette). */
import type { GroupId } from "../../shared/anatomy";

const GROUP_COLORS: Record<GroupId, string> = {
  skin: "#e3b39a",
  muscle: "#b5473d",
  tendon: "#e6dccb",
  bone: "#e8dcc2",
  cartilage: "#a9cad6",
  ligament: "#d9cfb4",
  artery: "#cf3534",
  vein: "#3656b8",
  heart: "#a8332f",
  nerve: "#f0cc45",
  brain: "#e2aaa4",
  eye: "#f2f0ea",
  organ: "#cf8f7a",
  lung: "#e3a0a4",
  airway: "#dfe3e6",
  gland: "#d6a86a",
  teeth: "#f5f0e1",
  membrane: "#efd49a",
};

const CONCEPT_COLORS: [RegExp, string][] = [
  // heart
  [/^atrium-blood-pool$/, "#b9403c"],
  [/^ventricle-blood-pool$/, "#b9403c"],
  [/valve$/, "#eadbc6"],
  [/^papillary-muscles$/, "#9b2c2a"],
  // brain
  [/cerebral-white-matter|corpus-callosum|internal-capsule|fornix|optic-tract|optic-chiasm/, "#efe6dc"],
  [/thalamus|caudate|putamen|pallidus|amygdala|hippocampus|geniculate|colliculus|hypothalamus|mammillary/, "#c98f8c"],
  [/cerebellum/, "#d49a93"],
  [/pons|medulla|midbrain|peduncle/, "#dcb3a6"],
  [/pituitary|pineal/, "#c7865a"],
  [/choroid-plexus/, "#b2505a"],
  // eye
  [/^iris$/, "#4f6f8f"],
  [/^cornea$|^aqueous-humor$/, "#bfe0f0"],
  [/^lens$/, "#f3ecd4"],
  [/^retina$/, "#c9594a"],
  [/^choroid$/, "#5e2424"],
  [/^vitreous-body$/, "#dceef2"],
  [/^ciliary-body$/, "#6d3a32"],
  // digestive
  [/^liver-segment/, "#8a3527"],
  [/^gallbladder$/, "#4f8a45"],
  [/^biliary-tree$/, "#6f9a3c"],
  [/^stomach$/, "#d58a78"],
  [/^esophagus$/, "#c97a6a"],
  [/^(duodenum|jejunum|ileum)$/, "#e2a48c"],
  [/colon|^appendix$|^rectum$|taeniae/, "#c98a68"],
  [/^pancreas$/, "#e1b56a"],
  [/^pancreatic-duct$/, "#c9a24a"],
  [/^tongue$/, "#c35a58"],
  [/^gingiva$/, "#d9716d"],
  // other organs
  [/^spleen$/, "#7a2e4c"],
  [/^kidney$/, "#94383a"],
  [/^ureter$|^urethra$/, "#dcb07e"],
  [/^urinary-bladder$/, "#d8a386"],
  [/^thymus$/, "#d9b9a2"],
  [/^thyroid-gland$/, "#a4394c"],
  [/^adrenal-gland$/, "#d8a13c"],
  [/^lung|^lobe-of|^(superior|middle|inferior)-lobe/, "#e5a3a7"],
  [/^testis$|^epididymis$/, "#e2c4ae"],
  [/^prostate$|^seminal-vesicle$/, "#c98c7a"],
  [/^ductus-deferens$/, "#e3d2b0"],
  [/^penis$/, "#d8a08e"],
  [/^uterus$|^vagina$/, "#cf7d7a"],
  [/^ovary$/, "#e7b4a4"],
  [/^uterine-tube$/, "#e39a8f"],
  [/^mammary/, "#f1cfa8"],
  [/^spinal-cord$/, "#f1dca0"],
];

function hashString(s: string) {
  let h = 2166136261;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 16777619);
  }
  return h >>> 0;
}

function hexToRgb(hex: string): [number, number, number] {
  const n = parseInt(hex.slice(1), 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

function rgbToHex([r, g, b]: [number, number, number]) {
  const c = (v: number) => Math.max(0, Math.min(255, Math.round(v))).toString(16).padStart(2, "0");
  return `#${c(r)}${c(g)}${c(b)}`;
}

/** Slight deterministic lightness/hue variation so neighbouring structures stay distinguishable. */
function jitter(hex: string, key: string, amount: number) {
  const h = hashString(key);
  const t = ((h & 1023) / 1023 - 0.5) * 2; // -1..1
  const u = (((h >> 10) & 1023) / 1023 - 0.5) * 2;
  const [r, g, b] = hexToRgb(hex);
  const l = 1 + t * amount;
  return rgbToHex([r * l + u * amount * 40, g * l, b * l - u * amount * 20]);
}

export function colorFor(concept: string, group: GroupId, override?: string): string {
  if (override) return override;
  for (const [re, c] of CONCEPT_COLORS) if (re.test(concept)) return c;
  const base = GROUP_COLORS[group];
  if (group === "muscle") return jitter(base, concept, 0.12);
  if (group === "brain") return jitter(base, concept, 0.06);
  if (group === "bone") return jitter(base, concept, 0.025);
  return base;
}
