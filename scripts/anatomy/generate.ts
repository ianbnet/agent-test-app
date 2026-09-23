import type { BuiltStructure } from "./export";
import { generateThyroid } from "./generators/glands";
import { generateLungs } from "./generators/lungs";
import { generateMissingMuscles, splitRectus } from "./generators/muscles";
import { generateNervous } from "./generators/nerves";

/** Structures absent from BodyParts3D, generated to fit the male body. */
export async function buildGenerated(male: BuiltStructure[]): Promise<BuiltStructure[]> {
  const out: BuiltStructure[] = [];
  out.push(...splitRectus(male));
  out.push(...generateMissingMuscles(male));
  out.push(...generateLungs());
  out.push(...generateNervous());
  out.push(generateThyroid());
  return out;
}
