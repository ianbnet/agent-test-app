/**
 * Per-vertex ambient occlusion baked against layered occluder sets, so each dissection layer
 * gets the contact shadows it would have when everything above it has been peeled away.
 */
import * as THREE from "three";
import { MeshBVH } from "three-mesh-bvh";
import type { Mesh } from "./mesh";

export interface AoOptions {
  rays?: number;
  /** Occlusion radius (m): only nearby geometry darkens a vertex. */
  radius?: number;
}

export function buildBvh(meshes: Mesh[]): MeshBVH | null {
  let nv = 0;
  let ni = 0;
  for (const m of meshes) {
    nv += m.positions.length / 3;
    ni += m.indices.length;
  }
  if (!ni) return null;
  const pos = new Float32Array(nv * 3);
  const idx = new Uint32Array(ni);
  let vo = 0;
  let io = 0;
  for (const m of meshes) {
    pos.set(m.positions, vo * 3);
    for (let i = 0; i < m.indices.length; i++) idx[io + i] = m.indices[i] + vo;
    vo += m.positions.length / 3;
    io += m.indices.length;
  }
  const g = new THREE.BufferGeometry();
  g.setAttribute("position", new THREE.BufferAttribute(pos, 3));
  g.setIndex(new THREE.BufferAttribute(idx, 1));
  return new MeshBVH(g, { targetLeafSize: 8 } as ConstructorParameters<typeof MeshBVH>[1]);
}

/** Cosine-weighted hemisphere directions in tangent space (Hammersley set). */
function hemisphere(n: number): Float32Array {
  const out = new Float32Array(n * 3);
  for (let i = 0; i < n; i++) {
    let bits = i;
    bits = ((bits << 16) | (bits >>> 16)) >>> 0;
    bits = (((bits & 0x55555555) << 1) | ((bits & 0xaaaaaaaa) >>> 1)) >>> 0;
    bits = (((bits & 0x33333333) << 2) | ((bits & 0xcccccccc) >>> 2)) >>> 0;
    bits = (((bits & 0x0f0f0f0f) << 4) | ((bits & 0xf0f0f0f0) >>> 4)) >>> 0;
    bits = (((bits & 0x00ff00ff) << 8) | ((bits & 0xff00ff00) >>> 8)) >>> 0;
    const u = (i + 0.5) / n;
    const v = bits / 4294967296;
    const r = Math.sqrt(u);
    const phi = 2 * Math.PI * v;
    out[i * 3] = r * Math.cos(phi);
    out[i * 3 + 1] = r * Math.sin(phi);
    out[i * 3 + 2] = Math.sqrt(Math.max(0, 1 - u));
  }
  return out;
}

/** Returns AO in [0, 1] per vertex (1 = fully open). */
export function bakeAo(mesh: Mesh, normals: Float32Array, bvh: MeshBVH, opts: AoOptions = {}): Float32Array {
  const rays = opts.rays ?? 20;
  const radius = opts.radius ?? 0.035;
  const dirs = hemisphere(rays);
  const nv = mesh.positions.length / 3;
  const ao = new Float32Array(nv);
  const ray = new THREE.Ray();
  const t = new THREE.Vector3();
  const b = new THREE.Vector3();
  const n = new THREE.Vector3();
  for (let v = 0; v < nv; v++) {
    n.set(normals[v * 3], normals[v * 3 + 1], normals[v * 3 + 2]);
    if (n.lengthSq() < 1e-8) {
      ao[v] = 1;
      continue;
    }
    n.normalize();
    // tangent frame with a per-vertex random twist to break up banding
    const helper = Math.abs(n.y) < 0.9 ? new THREE.Vector3(0, 1, 0) : new THREE.Vector3(1, 0, 0);
    t.crossVectors(helper, n).normalize();
    b.crossVectors(n, t);
    const twist = ((v * 2654435761) % 4096) / 4096 * Math.PI * 2;
    const c = Math.cos(twist);
    const s = Math.sin(twist);
    let occ = 0;
    const ox = mesh.positions[v * 3] + n.x * 0.0006;
    const oy = mesh.positions[v * 3 + 1] + n.y * 0.0006;
    const oz = mesh.positions[v * 3 + 2] + n.z * 0.0006;
    for (let k = 0; k < rays; k++) {
      const x = dirs[k * 3] * c - dirs[k * 3 + 1] * s;
      const y = dirs[k * 3] * s + dirs[k * 3 + 1] * c;
      const z = dirs[k * 3 + 2];
      ray.origin.set(ox, oy, oz);
      ray.direction.set(t.x * x + b.x * y + n.x * z, t.y * x + b.y * y + n.y * z, t.z * x + b.z * y + n.z * z);
      const hit = bvh.raycastFirst(ray, THREE.DoubleSide, 0, radius);
      if (hit) occ += 1 - (hit.distance / radius) ** 2;
    }
    ao[v] = 1 - occ / rays;
  }
  return ao;
}
