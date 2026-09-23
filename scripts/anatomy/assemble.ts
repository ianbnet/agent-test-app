/** Assembles the complete male model (BodyParts3D + generated structures) in BodyParts3D space. */
import { buildBp3dCatalog, type StructureSpec } from "./catalog";
import type { BuiltStructure } from "./export";
import { buildGenerated } from "./generate";
import { mergeMeshes, type Mesh } from "./lib/mesh";
import { loadBp3d, scanBp3d } from "./sources";

export function loadBp3dStructures(specs: StructureSpec[]): BuiltStructure[] {
  const built: BuiltStructure[] = [];
  for (const spec of specs) {
    if (spec.source.kind !== "bp3d") continue;
    const meshes: Mesh[] = spec.source.elements.map((fj) => loadBp3d(fj));
    built.push({ spec, mesh: mergeMeshes(meshes) });
  }
  return built;
}

export function loadBp3dMale(): BuiltStructure[] {
  const { structures } = buildBp3dCatalog(scanBp3d());
  return loadBp3dStructures(structures);
}

export async function buildMaleStructures(): Promise<BuiltStructure[]> {
  const t0 = Date.now();
  const built = loadBp3dMale();
  console.log(`[male] loaded ${built.length} BodyParts3D structures in ${((Date.now() - t0) / 1000).toFixed(1)}s`);
  const generated = await buildGenerated(built);
  return [...built, ...generated];
}
