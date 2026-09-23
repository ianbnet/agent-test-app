/**
 * Types shared by the anatomy model pipeline (scripts/anatomy) and the explorer client.
 */

export type Sex = "male" | "female";

export type SystemId =
  | "integumentary"
  | "muscular"
  | "skeletal"
  | "nervous"
  | "cardiovascular"
  | "respiratory"
  | "digestive"
  | "urinary"
  | "reproductive"
  | "endocrine"
  | "lymphatic";

export type GroupId =
  | "skin"
  | "muscle"
  | "tendon"
  | "bone"
  | "cartilage"
  | "ligament"
  | "artery"
  | "vein"
  | "heart"
  | "nerve"
  | "brain"
  | "eye"
  | "organ"
  | "lung"
  | "airway"
  | "gland"
  | "teeth"
  | "membrane";

/** Dissection layers, outermost first. */
export const LAYERS = ["Skin", "Superficial muscles", "Deep muscles", "Organs, vessels & nerves", "Skeleton"] as const;
export type Layer = 0 | 1 | 2 | 3 | 4;

export type Side = "left" | "right";

export type Vec3 = [number, number, number];

export interface StructureMeta {
  /** Index used in the geometry's `_sid` vertex attribute. */
  index: number;
  id: string;
  name: string;
  /** Knowledge-base key shared by left/right twins. */
  concept: string;
  conceptName: string;
  side?: Side;
  system: SystemId;
  group: GroupId;
  layer: Layer;
  /** Base display color (hex). */
  color: string;
  center: Vec3;
  min: Vec3;
  max: Vec3;
  triangles: number;
  /** Where the geometry came from (for attribution in the info panel). */
  source: "bodyparts3d" | "hra" | "generated";
}

export interface ModelManifest {
  version: number;
  sex: Sex;
  /** Standing height in meters (skin bounds). */
  height: number;
  min: Vec3;
  max: Vec3;
  /** Mesh node names in the GLB, one per render group. */
  groups: { group: GroupId; node: string; triangles: number; structures: number }[];
  structures: StructureMeta[];
}
