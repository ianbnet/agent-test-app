/** Shared helpers for generators that derive new structures from BodyParts3D geometry. */
import { mergeMeshes, type Mesh } from "../lib/mesh";
import { loadBp3d, scanBp3d, type Bp3dElement } from "../sources";
import type { StructureSpec } from "../catalog";
import { slug, titleCase } from "../catalog";
import type { GroupId, Layer, Side, SystemId } from "../../../shared/anatomy";
import type { BuiltStructure } from "../export";

let index: Bp3dElement[] | null = null;
function elements() {
  if (!index) index = scanBp3d();
  return index;
}

/** BodyParts3D elements whose English name matches `re`. */
export function query(re: RegExp): { el: Bp3dElement; mesh: Mesh }[] {
  return elements()
    .filter((e) => re.test(e.rawName))
    .map((el) => ({ el, mesh: loadBp3d(el.fj) }));
}

export function queryMesh(re: RegExp): Mesh {
  const found = query(re);
  if (!found.length) throw new Error(`no BodyParts3D element matches ${re}`);
  return mergeMeshes(found.map((f) => f.mesh));
}

export function generatedStructure(
  conceptName: string,
  mesh: Mesh,
  opts: { side?: Side; system: SystemId; group: GroupId; layer: Layer; generator: string; color?: string; sex?: "male" | "female" },
): BuiltStructure {
  const concept = slug(conceptName);
  const spec: StructureSpec = {
    id: opts.side ? `${concept}-${opts.side === "left" ? "l" : "r"}` : concept,
    name: opts.side ? `${titleCase(opts.side)} ${conceptName}` : titleCase(conceptName),
    concept,
    conceptName: titleCase(conceptName),
    side: opts.side,
    system: opts.system,
    group: opts.group,
    layer: opts.layer,
    color: opts.color,
    source: { kind: "generated", generator: opts.generator },
    sex: opts.sex,
  };
  return { spec, mesh };
}
