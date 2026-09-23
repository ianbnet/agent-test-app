/**
 * Loaders for the two open datasets used to build the models:
 *  - BodyParts3D (DBCLS, CC BY 4.0): adult male, OBJ per anatomical element.
 *  - Human Reference Atlas 3D reference organs (HuBMAP, CC BY 4.0): Visible Human male/female GLBs.
 */
import { existsSync, readdirSync, readFileSync } from "fs";
import path from "path";
import { NodeIO } from "@gltf-transform/core";
import { readBp3dObj } from "./lib/obj";
import { bounds, centroid, type Mesh, type Vec3 } from "./lib/mesh";

export const CACHE_DIR = process.env.ANATOMY_CACHE ?? path.resolve(".cache/anatomy");
export const BP3D_DIR = path.join(CACHE_DIR, "isa_BP3D_4.0_obj_99");
export const HRA_DIR = path.join(CACHE_DIR, "hra");

export interface Bp3dElement {
  fj: string;
  rawName: string;
  bounds: { min: Vec3; max: Vec3 };
  vertexCount: number;
}

/** Scan BP3D OBJ headers (fast: reads only the header of each file). */
export function scanBp3d(): Bp3dElement[] {
  if (!existsSync(BP3D_DIR)) throw new Error(`BodyParts3D not found at ${BP3D_DIR}; run npm run anatomy:fetch`);
  const files = readdirSync(BP3D_DIR).filter((f) => f.endsWith(".obj"));
  const byId = new Map<string, Bp3dElement>();
  for (const f of files) {
    const fj = f.replace(/\.obj$/, "");
    const text = readFileSync(path.join(BP3D_DIR, f), "utf8");
    const head = text.slice(0, 1200);
    const name = (head.match(/# English name : (.*)/)?.[1] ?? "").trim();
    const b = head.match(/# Bounds\(mm\): \(([-\d.]+),([-\d.]+),([-\d.]+)\)-\(([-\d.]+),([-\d.]+),([-\d.]+)\)/);
    let vertexCount = 0;
    for (let i = text.indexOf("\nv "); i !== -1; i = text.indexOf("\nv ", i + 1)) vertexCount++;
    // convert bounds to app frame (meters, y up, z anterior)
    const bb = b ? b.slice(1).map(Number) : [0, 0, 0, 0, 0, 0];
    byId.set(fj, {
      fj,
      rawName: name,
      bounds: {
        min: [bb[0] / 1000, bb[2] / 1000, -bb[4] / 1000],
        max: [bb[3] / 1000, bb[5] / 1000, -bb[1] / 1000],
      },
      vertexCount,
    });
  }
  // Unnamed elements are the unlabelled right-hand twins of mirrored ("...M") left elements.
  for (const el of byId.values()) {
    if (el.rawName) continue;
    const twin = byId.get(`${el.fj}M`);
    if (twin?.rawName) {
      el.rawName = /\bleft\b/i.test(twin.rawName)
        ? twin.rawName.replace(/\bleft\b/i, "right").replace(/\bLeft\b/, "Right")
        : `Right ${twin.rawName.charAt(0).toLowerCase()}${twin.rawName.slice(1)}`;
    }
  }
  return [...byId.values()].sort((a, b) => a.fj.localeCompare(b.fj));
}

const bp3dCache = new Map<string, Mesh>();
export function loadBp3d(fj: string): Mesh {
  let m = bp3dCache.get(fj);
  if (!m) {
    m = readBp3dObj(path.join(BP3D_DIR, `${fj}.obj`));
    bp3dCache.set(fj, m);
  }
  return m;
}

export function clearBp3dCache() {
  bp3dCache.clear();
}

/** Load every mesh node of an HRA GLB, keyed by node name (VH_F_/VH_M_ prefix stripped). */
export async function loadHra(file: string): Promise<Map<string, Mesh>> {
  const p = path.join(HRA_DIR, file);
  if (!existsSync(p)) throw new Error(`HRA file missing: ${p}; run npm run anatomy:fetch`);
  const doc = await new NodeIO().read(p);
  const out = new Map<string, Mesh>();
  for (const node of doc.getRoot().listNodes()) {
    const mesh = node.getMesh();
    if (!mesh) continue;
    const world = node.getWorldMatrix();
    const positions: number[] = [];
    const indices: number[] = [];
    for (const prim of mesh.listPrimitives()) {
      if (prim.getMode() !== 4) continue; // triangles only
      const pos = prim.getAttribute("POSITION");
      if (!pos) continue;
      const base = positions.length / 3;
      const el: number[] = [];
      for (let i = 0; i < pos.getCount(); i++) {
        pos.getElement(i, el);
        const [x, y, z] = el;
        positions.push(
          world[0] * x + world[4] * y + world[8] * z + world[12],
          world[1] * x + world[5] * y + world[9] * z + world[13],
          world[2] * x + world[6] * y + world[10] * z + world[14],
        );
      }
      const idx = prim.getIndices();
      if (idx) {
        const arr = idx.getArray()!;
        for (let i = 0; i < arr.length; i++) indices.push(arr[i] + base);
      } else {
        for (let i = 0; i < pos.getCount(); i++) indices.push(base + i);
      }
    }
    if (!indices.length) continue;
    const name = node.getName().replace(/^VH_[FM]_/, "");
    const existing = out.get(name);
    const m = { positions: new Float32Array(positions), indices: new Uint32Array(indices) };
    if (existing) {
      // merge duplicate names
      const merged = {
        positions: new Float32Array(existing.positions.length + m.positions.length),
        indices: new Uint32Array(existing.indices.length + m.indices.length),
      };
      merged.positions.set(existing.positions);
      merged.positions.set(m.positions, existing.positions.length);
      merged.indices.set(existing.indices);
      const off = existing.positions.length / 3;
      for (let i = 0; i < m.indices.length; i++) merged.indices[existing.indices.length + i] = m.indices[i] + off;
      out.set(name, merged);
    } else out.set(name, m);
  }
  return out;
}

export function meshInfo(m: Mesh) {
  return { bounds: bounds(m), centroid: centroid(m) };
}
