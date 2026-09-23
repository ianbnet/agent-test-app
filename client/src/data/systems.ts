import type { GroupId, SystemId } from "@shared/anatomy";
import { LAYERS } from "@shared/anatomy";

export interface SystemInfo {
  id: SystemId;
  label: string;
  /** Swatch used in toggles, chips and the "Systems" overlay. */
  color: string;
  blurb: string;
}

export const SYSTEMS: SystemInfo[] = [
  { id: "integumentary", label: "Integumentary", color: "#e0b49a", blurb: "Skin and its appendages" },
  { id: "muscular", label: "Muscular", color: "#d2504a", blurb: "Skeletal muscles, tendons and fasciae" },
  { id: "skeletal", label: "Skeletal", color: "#e9dfc9", blurb: "Bones, cartilage, joints and ligaments" },
  { id: "nervous", label: "Nervous", color: "#f2c94c", blurb: "Brain, spinal cord, nerves and eye" },
  { id: "cardiovascular", label: "Cardiovascular", color: "#e8414f", blurb: "Heart, arteries and veins" },
  { id: "respiratory", label: "Respiratory", color: "#7fb2e6", blurb: "Airways and lungs" },
  { id: "digestive", label: "Digestive", color: "#e38b5c", blurb: "Alimentary canal and accessory organs" },
  { id: "urinary", label: "Urinary", color: "#e3c25c", blurb: "Kidneys, ureters, bladder and urethra" },
  { id: "reproductive", label: "Reproductive", color: "#d47fb8", blurb: "Gonads, ducts and genitalia" },
  { id: "endocrine", label: "Endocrine", color: "#9b7fe6", blurb: "Hormone-secreting glands" },
  { id: "lymphatic", label: "Lymphatic & immune", color: "#6fcf97", blurb: "Spleen, thymus and lymphoid organs" },
];

export const SYSTEM_BY_ID = Object.fromEntries(SYSTEMS.map((s) => [s.id, s])) as Record<SystemId, SystemInfo>;

export const LAYER_INFO = LAYERS.map((label, i) => ({
  index: i,
  label,
  short: ["Skin", "Superficial", "Deep", "Viscera", "Skeleton"][i],
  blurb: [
    "The intact body surface",
    "Muscles just beneath the skin and fascia, with superficial veins",
    "Deeper muscle layers and orbital structures",
    "Internal organs, vessels, nerves, brain and glands",
    "Bones, cartilages and ligaments",
  ][i],
}));

export interface GroupLook {
  label: string;
  roughness: number;
  metalness?: number;
  clearcoat?: number;
  clearcoatRoughness?: number;
  sheen?: number;
  /** Wrap-lighting term that fakes light bleeding through soft tissue. */
  wrap: number;
  /** Colour of cut surfaces when a section plane slices the structure. */
  cap?: string;
  /** Structures in this group are always somewhat see-through. */
  maxOpacity?: number;
}

export const GROUP_LOOK: Record<GroupId, GroupLook> = {
  skin: { label: "Skin", roughness: 0.52, sheen: 0.35, wrap: 0.45, cap: "#e8c592" },
  muscle: { label: "Muscle", roughness: 0.42, clearcoat: 0.28, clearcoatRoughness: 0.35, wrap: 0.3, cap: "#9c2a2a" },
  tendon: { label: "Tendon", roughness: 0.3, clearcoat: 0.5, clearcoatRoughness: 0.3, wrap: 0.2 },
  bone: { label: "Bone", roughness: 0.62, wrap: 0.12, cap: "#c69a6d" },
  cartilage: { label: "Cartilage", roughness: 0.28, clearcoat: 0.6, clearcoatRoughness: 0.2, wrap: 0.45 },
  ligament: { label: "Ligament", roughness: 0.35, clearcoat: 0.4, clearcoatRoughness: 0.3, wrap: 0.25 },
  artery: { label: "Artery", roughness: 0.3, clearcoat: 0.7, clearcoatRoughness: 0.18, wrap: 0.3, cap: "#6e0d16" },
  vein: { label: "Vein", roughness: 0.3, clearcoat: 0.7, clearcoatRoughness: 0.18, wrap: 0.3, cap: "#1a2350" },
  heart: { label: "Heart", roughness: 0.34, clearcoat: 0.55, clearcoatRoughness: 0.22, wrap: 0.3, cap: "#7a1f24" },
  nerve: { label: "Nerve", roughness: 0.4, clearcoat: 0.35, clearcoatRoughness: 0.3, wrap: 0.35 },
  brain: { label: "Brain", roughness: 0.45, clearcoat: 0.35, clearcoatRoughness: 0.35, wrap: 0.4, cap: "#d8b4a6" },
  eye: { label: "Eye", roughness: 0.12, clearcoat: 1, clearcoatRoughness: 0.05, wrap: 0.3 },
  organ: { label: "Organ", roughness: 0.34, clearcoat: 0.55, clearcoatRoughness: 0.22, wrap: 0.35 },
  lung: { label: "Lung", roughness: 0.55, clearcoat: 0.25, clearcoatRoughness: 0.4, wrap: 0.45, cap: "#c98a8a" },
  airway: { label: "Airway", roughness: 0.3, clearcoat: 0.5, clearcoatRoughness: 0.25, wrap: 0.35 },
  gland: { label: "Gland", roughness: 0.4, clearcoat: 0.45, clearcoatRoughness: 0.25, wrap: 0.35 },
  teeth: { label: "Teeth", roughness: 0.18, clearcoat: 0.8, clearcoatRoughness: 0.1, wrap: 0.15 },
  membrane: { label: "Membrane", roughness: 0.4, clearcoat: 0.3, clearcoatRoughness: 0.3, wrap: 0.5, maxOpacity: 0.55 },
};

/** Draw order: opaque groups render inside-out so large outer shells don't overdraw. */
export const GROUP_ORDER: GroupId[] = [
  "bone", "teeth", "cartilage", "ligament", "brain", "eye", "heart", "lung", "airway", "organ", "gland",
  "artery", "vein", "nerve", "tendon", "muscle", "membrane", "skin",
];
