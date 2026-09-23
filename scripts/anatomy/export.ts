/**
 * Writes a sex-specific model: one GLB (a merged mesh per render group, with a per-vertex
 * `_SID` structure index) plus a JSON manifest describing every structure.
 */
import { mkdirSync, writeFileSync } from "fs";
import path from "path";
import { Document, NodeIO } from "@gltf-transform/core";
import { EXTMeshoptCompression, KHRMeshQuantization } from "@gltf-transform/extensions";
import { quantize, reorder } from "@gltf-transform/functions";
import { MeshoptEncoder } from "meshoptimizer";
import type { GroupId, ModelManifest, Sex, StructureMeta, Vec3 } from "../../shared/anatomy";
import type { StructureSpec } from "./catalog";
import { bounds, centroid, computeNormals, ensureSimplifier, simplify, taubinSmooth, weld, type Mesh } from "./lib/mesh";
import { colorFor } from "./palette";

export interface BuiltStructure {
  spec: StructureSpec;
  mesh: Mesh;
  /** Set once the mesh has been welded, pre-smoothed and simplified. */
  prepared?: boolean;
}

/** Target simplification error (meters) per render group. */
const GROUP_ERROR: Record<GroupId, number> = {
  skin: 0.0005,
  muscle: 0.0006,
  tendon: 0.0005,
  bone: 0.0004,
  cartilage: 0.0003,
  ligament: 0.0004,
  artery: 0.00018,
  vein: 0.00018,
  heart: 0.0003,
  nerve: 0.00015,
  brain: 0.0004,
  eye: 0.0002,
  organ: 0.0005,
  lung: 0.0006,
  airway: 0.00025,
  gland: 0.0003,
  teeth: 0.0002,
  membrane: 0.0006,
};

/** Taubin iterations applied before simplification (removes sculpted micro-ridges that alias badly). */
const GROUP_PRESMOOTH: Partial<Record<GroupId, number>> = {
  muscle: 30,
  tendon: 10,
  membrane: 4,
};

/** Weld, pre-smooth and simplify a structure's mesh to its render group's error budget. */
export function prepareMesh(b: BuiltStructure, errorScale = 1): Mesh {
  if (b.prepared) return b.mesh;
  let m = weld(b.mesh, 1e-6);
  if (m.indices.length === 0) return m;
  const pre = GROUP_PRESMOOTH[b.spec.group];
  if (pre) m = taubinSmooth(m, pre);
  return simplify(m, { targetError: GROUP_ERROR[b.spec.group] * errorScale, ratio: 0 });
}

export interface ExportOptions {
  sex: Sex;
  outDir: string;
  /** Scales every group's simplification error (use > 1 to shrink files). */
  errorScale?: number;
}

export async function exportModel(built: BuiltStructure[], opts: ExportOptions) {
  await ensureSimplifier();
  await MeshoptEncoder.ready;
  const errorScale = opts.errorScale ?? 1;

  // Normalize placement: feet on the floor (y = 0), body centered in x/z using the skin.
  const skin = built.find((b) => b.spec.group === "skin");
  const sb = bounds(skin ? skin.mesh : built[0].mesh);
  const offset: Vec3 = [-(sb.min[0] + sb.max[0]) / 2, -sb.min[1], -(sb.min[2] + sb.max[2]) / 2];

  const structures: StructureMeta[] = [];
  const perGroup = new Map<GroupId, { meshes: Mesh[]; sids: number[] }>();
  let totalTris = 0;
  for (const b of built) {
    const m = prepareMesh(b, errorScale);
    if (m.indices.length === 0) continue;
    const pos = (m.positions = m.positions.slice());
    for (let i = 0; i < pos.length; i += 3) {
      pos[i] += offset[0];
      pos[i + 1] += offset[1];
      pos[i + 2] += offset[2];
    }
    const bb = bounds(m);
    const index = structures.length;
    const tris = m.indices.length / 3;
    totalTris += tris;
    structures.push({
      index,
      id: b.spec.id,
      name: b.spec.name,
      concept: b.spec.concept,
      conceptName: b.spec.conceptName,
      side: b.spec.side,
      system: b.spec.system,
      group: b.spec.group,
      layer: b.spec.layer,
      color: colorFor(b.spec.concept, b.spec.group, b.spec.color),
      center: round3(centroid(m)),
      min: round3(bb.min),
      max: round3(bb.max),
      triangles: tris,
      source: b.spec.source.kind === "bp3d" ? "bodyparts3d" : b.spec.source.kind === "hra" ? "hra" : "generated",
    });
    let g = perGroup.get(b.spec.group);
    if (!g) perGroup.set(b.spec.group, (g = { meshes: [], sids: [] }));
    g.meshes.push(m);
    g.sids.push(index);
  }

  const doc = new Document();
  const buffer = doc.createBuffer();
  const scene = doc.createScene("anatomy");
  const groups: ModelManifest["groups"] = [];
  for (const [group, g] of perGroup) {
    let nv = 0;
    let ni = 0;
    for (const m of g.meshes) {
      nv += m.positions.length / 3;
      ni += m.indices.length;
    }
    const positions = new Float32Array(nv * 3);
    const normals = new Float32Array(nv * 3);
    const sid = new Float32Array(nv);
    const indices = new Uint32Array(ni);
    let vo = 0;
    let io = 0;
    g.meshes.forEach((m, k) => {
      const n = computeNormals(m);
      positions.set(m.positions, vo * 3);
      normals.set(n, vo * 3);
      sid.fill(g.sids[k], vo, vo + m.positions.length / 3);
      for (let i = 0; i < m.indices.length; i++) indices[io + i] = m.indices[i] + vo;
      vo += m.positions.length / 3;
      io += m.indices.length;
    });
    const prim = doc
      .createPrimitive()
      .setAttribute("POSITION", doc.createAccessor().setType("VEC3").setArray(positions).setBuffer(buffer))
      .setAttribute("NORMAL", doc.createAccessor().setType("VEC3").setArray(normals).setBuffer(buffer))
      .setAttribute("_SID", doc.createAccessor().setType("SCALAR").setArray(sid).setBuffer(buffer))
      .setIndices(doc.createAccessor().setType("SCALAR").setArray(indices).setBuffer(buffer));
    const node = doc.createNode(group).setMesh(doc.createMesh(group).addPrimitive(prim));
    scene.addChild(node);
    groups.push({ group, node: group, triangles: ni / 3, structures: g.meshes.length });
  }

  await doc.transform(
    reorder({ encoder: MeshoptEncoder, target: "size" }),
    quantize({ pattern: /^(POSITION|NORMAL)$/, quantizationVolume: "scene", quantizePosition: 14, quantizeNormal: 10 }),
  );
  doc.createExtension(KHRMeshQuantization).setRequired(true);
  doc
    .createExtension(EXTMeshoptCompression)
    .setRequired(true)
    .setEncoderOptions({ method: EXTMeshoptCompression.EncoderMethod.QUANTIZE });

  mkdirSync(opts.outDir, { recursive: true });
  const io = new NodeIO().registerExtensions([EXTMeshoptCompression, KHRMeshQuantization]).registerDependencies({
    "meshopt.encoder": MeshoptEncoder,
  });
  const glb = await io.writeBinary(doc);
  const glbPath = path.join(opts.outDir, `${opts.sex}.glb`);
  writeFileSync(glbPath, glb);

  const all = structures.reduce(
    (acc, s) => {
      for (let k = 0; k < 3; k++) {
        acc.min[k] = Math.min(acc.min[k], s.min[k]);
        acc.max[k] = Math.max(acc.max[k], s.max[k]);
      }
      return acc;
    },
    { min: [Infinity, Infinity, Infinity] as Vec3, max: [-Infinity, -Infinity, -Infinity] as Vec3 },
  );
  const manifest: ModelManifest = {
    version: 1,
    sex: opts.sex,
    height: round3([sb.max[1] - sb.min[1], 0, 0])[0],
    min: round3(all.min),
    max: round3(all.max),
    groups,
    structures,
  };
  writeFileSync(path.join(opts.outDir, `${opts.sex}.json`), JSON.stringify(manifest));
  console.log(
    `[${opts.sex}] ${structures.length} structures, ${totalTris.toLocaleString()} triangles, ${(glb.byteLength / 1e6).toFixed(2)} MB`,
  );
  for (const g of groups) console.log(`   ${g.group.padEnd(10)} ${String(g.structures).padStart(4)} structures ${g.triangles.toLocaleString().padStart(10)} tris`);
  return manifest;
}

function round3(v: Vec3): Vec3 {
  return [Math.round(v[0] * 1e4) / 1e4, Math.round(v[1] * 1e4) / 1e4, Math.round(v[2] * 1e4) / 1e4];
}
