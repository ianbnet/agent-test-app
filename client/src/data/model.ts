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
  /** Principal (longest) axis of each structure, xyz per index — muscle fibre direction. */
  axes: Float32Array;
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

/**
 * Hosts that only serve web file types (e.g. published Claude artifacts) get the GLBs as
 * base64 text; build with VITE_MODEL_FORMAT=b64 to load `<name>.glb.b64.txt` instead.
 */
const BASE64_MODELS = import.meta.env.VITE_MODEL_FORMAT === "b64";

async function loadGltf(loader: GLTFLoader, path: string, onProgress: (loaded: number, total: number) => void) {
  if (!BASE64_MODELS) return loader.loadAsync(assetUrl(path), (e) => onProgress(e.loaded, e.total));
  const res = await fetch(assetUrl(`${path}.b64.txt`));
  if (!res.ok || !res.body) throw new Error(`Could not load ${path} (${res.status})`);
  const total = Number(res.headers.get("content-length")) || 0;
  const reader = res.body.getReader();
  const chunks: Uint8Array[] = [];
  let received = 0;
  for (;;) {
    const { done, value } = await reader.read();
    if (done) break;
    chunks.push(value);
    received += value.length;
    if (total) onProgress(received, total);
  }
  const text = new TextDecoder().decode(await new Blob(chunks as BlobPart[]).arrayBuffer());
  const bin = atob(text.trim());
  const bytes = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);
  return loader.parseAsync(bytes.buffer, "");
}

async function fetchModel(sex: Sex, onProgress?: (fraction: number) => void): Promise<LoadedModel> {
  const manifestP = fetch(assetUrl(`models/${sex}.json`)).then((r) => {
    if (!r.ok) throw new Error(`Could not load ${sex} manifest (${r.status})`);
    return r.json() as Promise<ModelManifest>;
  });
  const loader = new GLTFLoader();
  loader.setMeshoptDecoder(MeshoptDecoder);
  // The compressed model needs a WebAssembly decoder. Hosts that forbid WebAssembly get the
  // same geometry uncompressed, split in two files (published only where it is needed).
  const wasm =
    MeshoptDecoder.supported &&
    (await MeshoptDecoder.ready.then(
      () => true,
      () => false,
    ));
  const files = wasm ? [`models/${sex}.glb`] : [`models/${sex}-raw-1.glb`, `models/${sex}-raw-2.glb`];
  const loaded = new Array<number>(files.length).fill(0);
  const totals = new Array<number>(files.length).fill(0);
  const scenes = await Promise.all(
    files.map((f, i) =>
      loadGltf(loader, f, (done, total) => {
        loaded[i] = done;
        totals[i] = total;
        const sum = totals.reduce((a, b) => a + b, 0);
        if (onProgress && sum && totals.every(Boolean)) onProgress(loaded.reduce((a, b) => a + b, 0) / sum);
      }),
    ),
  );
  const manifest = await manifestP;
  const groups: LoadedModel["groups"] = [];
  for (const gltf of scenes) gltf.scene.updateMatrixWorld(true);
  for (const gltf of scenes) gltf.scene.traverse((o) => {
    const mesh = o as THREE.Mesh;
    if (!mesh.isMesh) return;
    const entry = manifest.groups.find((g) => g.node === mesh.name || g.node === mesh.parent?.name);
    if (!entry) return;
    const geometry = mesh.geometry as THREE.BufferGeometry;
    geometry.computeBoundingSphere();
    groups.push({ group: entry.group, geometry, matrix: mesh.matrixWorld.clone() });
  });
  const anchors = computeAnchors(manifest, groups);
  const axes = computeAxes(manifest, groups);
  const byId = new Map(manifest.structures.map((s) => [s.id, s]));
  const byConcept = new Map<string, StructureMeta[]>();
  for (const s of manifest.structures) {
    const list = byConcept.get(s.concept);
    if (list) list.push(s);
    else byConcept.set(s.concept, [s]);
  }
  return { sex, manifest, groups, byId, byConcept, anchors, axes };
}

/** Longest principal axis per structure (power iteration on the vertex covariance). */
function computeAxes(manifest: ModelManifest, groups: LoadedModel["groups"]) {
  const n = manifest.structures.length;
  const cov = new Float64Array(n * 6);
  const cnt = new Uint32Array(n);
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
      const x = v.x - s.center[0];
      const y = v.y - s.center[1];
      const z = v.z - s.center[2];
      const o = k * 6;
      cov[o] += x * x;
      cov[o + 1] += x * y;
      cov[o + 2] += x * z;
      cov[o + 3] += y * y;
      cov[o + 4] += y * z;
      cov[o + 5] += z * z;
      cnt[k]++;
    }
  }
  const axes = new Float32Array(n * 3);
  for (let k = 0; k < n; k++) {
    const o = k * 6;
    let a = 0.3;
    let b = 1;
    let c = 0.2;
    for (let it = 0; it < 24; it++) {
      const na = cov[o] * a + cov[o + 1] * b + cov[o + 2] * c;
      const nb = cov[o + 1] * a + cov[o + 3] * b + cov[o + 4] * c;
      const nc = cov[o + 2] * a + cov[o + 4] * b + cov[o + 5] * c;
      const l = Math.hypot(na, nb, nc) || 1;
      a = na / l;
      b = nb / l;
      c = nc / l;
    }
    axes.set(cnt[k] ? [a, b, c] : [0, 1, 0], k * 3);
  }
  return axes;
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
