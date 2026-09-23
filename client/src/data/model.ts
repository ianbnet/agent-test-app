import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { MeshoptDecoder } from "three/examples/jsm/libs/meshopt_decoder.module.js";
import type { GroupId, ModelManifest, Sex, StructureMeta } from "@shared/anatomy";

export interface LoadedModel {
  sex: Sex;
  manifest: ModelManifest;
  /** One merged mesh per render group; vertices carry a `_sid` structure index. */
  groups: { group: GroupId; geometry: THREE.BufferGeometry; matrix: THREE.Matrix4 }[];
  byId: Map<string, StructureMeta>;
  /** A point on each structure's surface near its centroid (for labels and arcs), xyz per index. */
  anchors: Float32Array;
  /** Structures sharing a knowledge-base concept (left/right twins, merged parts). */
  byConcept: Map<string, StructureMeta[]>;
}

const cache = new Map<Sex, Promise<LoadedModel>>();

function assetUrl(path: string) {
  // Relative URLs keep the bundle working from file:// and capacitor:// origins.
  return `${import.meta.env.BASE_URL}${path}`.replace(/\/{2,}/g, "/");
}

export function loadModel(sex: Sex, onProgress?: (fraction: number) => void): Promise<LoadedModel> {
  let p = cache.get(sex);
  if (!p) {
    p = fetchModel(sex, onProgress);
    p.catch(() => cache.delete(sex));
    cache.set(sex, p);
  }
  return p;
}

async function fetchModel(sex: Sex, onProgress?: (fraction: number) => void): Promise<LoadedModel> {
  const manifestP = fetch(assetUrl(`models/${sex}.json`)).then((r) => {
    if (!r.ok) throw new Error(`Could not load ${sex} manifest (${r.status})`);
    return r.json() as Promise<ModelManifest>;
  });
  const loader = new GLTFLoader();
  loader.setMeshoptDecoder(MeshoptDecoder);
  const gltf = await loader.loadAsync(assetUrl(`models/${sex}.glb`), (e) => {
    if (onProgress && e.total) onProgress(e.loaded / e.total);
  });
  const manifest = await manifestP;
  gltf.scene.updateMatrixWorld(true);
  const groups: LoadedModel["groups"] = [];
  gltf.scene.traverse((o) => {
    const mesh = o as THREE.Mesh;
    if (!mesh.isMesh) return;
    const entry = manifest.groups.find((g) => g.node === mesh.name || g.node === mesh.parent?.name);
    if (!entry) return;
    const geometry = mesh.geometry as THREE.BufferGeometry;
    geometry.computeBoundingSphere();
    groups.push({ group: entry.group, geometry, matrix: mesh.matrixWorld.clone() });
  });
  const anchors = computeAnchors(manifest, groups);
  const byId = new Map(manifest.structures.map((s) => [s.id, s]));
  const byConcept = new Map<string, StructureMeta[]>();
  for (const s of manifest.structures) {
    const list = byConcept.get(s.concept);
    if (list) list.push(s);
    else byConcept.set(s.concept, [s]);
  }
  return { sex, manifest, groups, byId, byConcept, anchors };
}

/** Surface vertex closest to each structure's centroid (centroids of curved parts float in space). */
function computeAnchors(manifest: ModelManifest, groups: LoadedModel["groups"]) {
  const n = manifest.structures.length;
  const anchors = new Float32Array(n * 3);
  const best = new Float32Array(n).fill(Infinity);
  const v = new THREE.Vector3();
  for (const g of groups) {
    const pos = g.geometry.getAttribute("position");
    const sid = g.geometry.getAttribute("_sid");
    if (!pos || !sid) continue;
    for (let i = 0; i < pos.count; i++) {
      const k = Math.round(sid.getX(i));
      const s = manifest.structures[k];
      if (!s) continue;
      v.fromBufferAttribute(pos, i).applyMatrix4(g.matrix);
      const d = (v.x - s.center[0]) ** 2 + (v.y - s.center[1]) ** 2 + (v.z - s.center[2]) ** 2;
      if (d < best[k]) {
        best[k] = d;
        anchors[k * 3] = v.x;
        anchors[k * 3 + 1] = v.y;
        anchors[k * 3 + 2] = v.z;
      }
    }
  }
  manifest.structures.forEach((s, k) => {
    if (best[k] === Infinity) anchors.set(s.center, k * 3);
  });
  return anchors;
}

export function anchorOf(model: LoadedModel, index: number, out = new THREE.Vector3()) {
  return out.fromArray(model.anchors, index * 3);
}

/** Pick the instance of a concept closest to a reference structure (same side first). */
export function nearestOfConcept(model: LoadedModel, concept: string, ref?: StructureMeta): StructureMeta[] {
  const list = model.byConcept.get(concept);
  if (!list) return [];
  if (!ref || list.length === 1) return list;
  if (ref.side) {
    const same = list.filter((s) => s.side === ref.side);
    if (same.length) return same;
  }
  // Midline reference: keep both sides (e.g. the aorta supplies left and right renal arteries).
  return list;
}
