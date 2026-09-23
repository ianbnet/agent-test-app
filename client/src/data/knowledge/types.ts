/**
 * Knowledge-base schema for anatomical concepts. Keys are concept ids that match the
 * `concept` field of structures in the model manifests (left/right twins share one entry).
 */

export type Relation =
  | "supplied-by" // artery that delivers blood to this structure
  | "drained-by" // vein (or lymphatic) that drains it
  | "innervated-by" // nerve supplying it
  | "attaches-to" // muscle/tendon/ligament attachment (origin or insertion) on a bone or structure
  | "articulates-with" // bone-to-bone joint
  | "branch-of" // vessel/nerve arises from this parent
  | "gives-rise-to" // vessel/nerve branches into this child
  | "flows-to" // downstream in blood, air, food, urine, bile or CSF flow
  | "receives-from" // upstream in a flow
  | "part-of" // is a component of a larger structure
  | "contains"
  | "adjacent-to" // important spatial relationship (e.g. landmark, compression risk)
  | "acts-on" // muscle moves this bone/joint
  | "controls" // neural or hormonal control
  | "secretes-into"; // gland duct/secretion target

export interface Connection {
  /** A concept id from the manifest list (so the app can highlight it in 3D). */
  concept: string;
  relation: Relation;
  /** Short qualifier, e.g. "origin", "insertion", "via the hepatic portal vein". */
  note?: string;
}

export interface Fact {
  label: string;
  value: string;
}

export interface ConceptInfo {
  /** 1–3 sentence overview written for a first-year university biology/anatomy student. */
  summary: string;
  /** Latin / Terminologia Anatomica name when it differs meaningfully from the English. */
  latin?: string;
  /** What it does, as short bullet points. */
  functions?: string[];
  /** Quantitative or memorable facts (typical adult values; say "about"/"up to" where they vary). */
  facts?: Fact[];
  /** Muscles only. */
  origin?: string;
  insertion?: string;
  action?: string;
  innervation?: string;
  bloodSupply?: string;
  /** Graph edges to other concepts (ids must exist in the concept list). */
  connections?: Connection[];
  /** One or two sentences of clinical relevance. */
  clinical?: string;
  /** For sex-specific notes (e.g. pelvis, urethra, breast). */
  sexDifferences?: string;
}
