import { useEffect, useState } from "react";
import type { ConceptInfo, Relation } from "./types";

export type { ConceptInfo, Relation } from "./types";

export type KnowledgeBase = Record<string, ConceptInfo>;

let kbPromise: Promise<KnowledgeBase> | null = null;
let kbValue: KnowledgeBase | null = null;

/** The knowledge base is ~1 MB of text, so it loads in the background after the model. */
export function loadKnowledge(): Promise<KnowledgeBase> {
  if (!kbPromise) {
    kbPromise = Promise.all([import("./skeletal"), import("./muscular"), import("./cardiovascular"), import("./visceral")]).then(
      ([a, b, c, d]) => (kbValue = { ...a.skeletal, ...b.muscular, ...c.cardiovascular, ...d.visceral }),
    );
  }
  return kbPromise;
}

export function useKnowledge(): KnowledgeBase | null {
  const [kb, setKb] = useState<KnowledgeBase | null>(kbValue);
  useEffect(() => {
    if (!kb) loadKnowledge().then(setKb);
  }, [kb]);
  return kb;
}

export const RELATION_INFO: Record<Relation, { label: string; color: string; order: number }> = {
  "supplied-by": { label: "Blood supply", color: "#ff5a5f", order: 0 },
  "drained-by": { label: "Venous drainage", color: "#5b7cff", order: 1 },
  "innervated-by": { label: "Nerve supply", color: "#f7d046", order: 2 },
  "attaches-to": { label: "Attachments", color: "#e9dcc4", order: 3 },
  "acts-on": { label: "Acts on", color: "#ff9f5a", order: 4 },
  "articulates-with": { label: "Articulates with", color: "#d7c6a2", order: 5 },
  "branch-of": { label: "Branch of", color: "#ff8a8a", order: 6 },
  "gives-rise-to": { label: "Gives rise to", color: "#ffb3a7", order: 7 },
  "flows-to": { label: "Flows to", color: "#4fd1c5", order: 8 },
  "receives-from": { label: "Receives from", color: "#81e6d9", order: 9 },
  "controls": { label: "Controls", color: "#f6e05e", order: 10 },
  "secretes-into": { label: "Secretes into", color: "#b794f4", order: 11 },
  "part-of": { label: "Part of", color: "#a0aec0", order: 12 },
  "contains": { label: "Contains", color: "#a0aec0", order: 13 },
  "adjacent-to": { label: "Neighbours", color: "#90cdf4", order: 14 },
};
