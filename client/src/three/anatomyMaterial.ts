/**
 * Materials for the merged anatomy meshes. Every vertex carries `_sid`, the index of the
 * structure it belongs to; the shaders look up per-structure state (opacity, highlight,
 * ghosting, animation channel), colour and centre from small float textures, so showing,
 * fading, recolouring or exploding any of ~1000 structures is a texture upload, not a
 * scene-graph change. Structures that are hidden or belong to the other render pass are
 * collapsed in the vertex shader and cost no fragment work.
 */
import * as THREE from "three";
import type { GroupId } from "@shared/anatomy";
import { GROUP_LOOK } from "@/data/systems";

export const TEX_WIDTH = 1024;

export interface SharedUniforms {
  uState: THREE.IUniform<THREE.DataTexture>;
  uColor: THREE.IUniform<THREE.DataTexture>;
  uCenter: THREE.IUniform<THREE.DataTexture>;
  uExplode: THREE.IUniform<number>;
  uExplodeOrigin: THREE.IUniform<THREE.Vector3>;
  uTime: THREE.IUniform<number>;
  uAccent: THREE.IUniform<THREE.Color>;
  uCapOn: THREE.IUniform<number>;
  uCapNormal: THREE.IUniform<THREE.Vector3>;
  uAnimOn: THREE.IUniform<number>;
  uHeart: THREE.IUniform<THREE.Vector3>;
  uSpine: THREE.IUniform<THREE.Vector4>;
}

export function createSharedUniforms(state: THREE.DataTexture, color: THREE.DataTexture, center: THREE.DataTexture): SharedUniforms {
  return {
    uState: { value: state },
    uColor: { value: color },
    uCenter: { value: center },
    uExplode: { value: 0 },
    uExplodeOrigin: { value: new THREE.Vector3(0, 1, 0) },
    uTime: { value: 0 },
    uAccent: { value: new THREE.Color("#3ee6c8") },
    uCapOn: { value: 0 },
    uCapNormal: { value: new THREE.Vector3(1, 0, 0) },
    uAnimOn: { value: 0 },
    uHeart: { value: new THREE.Vector3(0, 1.3, 0) },
    uSpine: { value: new THREE.Vector4(0, -0.05, 1.0, 1.75) },
  };
}

/** CPU mirror of `explodeOffset` in the shader (used for camera focus and connection lines). */
export function explodeOffset(center: ArrayLike<number>, origin: THREE.Vector3, amount: number, out = new THREE.Vector3()) {
  return out.set((center[0] - origin.x) * amount, (center[1] - origin.y) * amount * 0.45, (center[2] - origin.z) * amount * 1.6);
}

const COMMON_GLSL = /* glsl */ `
uniform highp sampler2D uState;
uniform highp sampler2D uColor;
uniform highp sampler2D uCenter;
uniform float uExplode;
uniform vec3 uExplodeOrigin;
uniform float uTime;
uniform float uPass;

vec3 explodeOffset(vec3 c) {
  vec3 d = c - uExplodeOrigin;
  return vec3(d.x, d.y * 0.45, d.z * 1.6) * uExplode;
}

ivec2 sidCoord(float sid) {
  int i = int(sid + 0.5);
  return ivec2(i % ${TEX_WIDTH}, i / ${TEX_WIDTH});
}
`;

const VERTEX_PARS = /* glsl */ `
attribute float _sid;
${COMMON_GLSL}
flat varying vec4 vState;
flat varying vec4 vBase;
varying vec3 vWorld;
`;

/**
 * Replaces the stock projection with an exploded, per-structure one and discards
 * (collapses) vertices of structures that this pass must not draw.
 * pass 0 = opaque, 1 = translucent, 2 = picking.
 */
const VERTEX_PROJECT = /* glsl */ `
  ivec2 sidUV = sidCoord(_sid);
  vState = texelFetch(uState, sidUV, 0);
  vBase = texelFetch(uColor, sidUV, 0);
  vec3 ctr = texelFetch(uCenter, sidUV, 0).xyz;
  vec4 worldP = modelMatrix * vec4(transformed, 1.0);
  worldP.xyz += explodeOffset(ctr);
  vWorld = worldP.xyz;
  mvPosition = viewMatrix * worldP;
  gl_Position = projectionMatrix * mvPosition;
  float op = vState.r;
  bool ghost = vState.b > 0.5;
  bool keep;
  if (uPass < 0.5) keep = op > 0.996 && !ghost;
  else if (uPass < 1.5) keep = op > 0.003 && (op <= 0.996 || ghost);
  else keep = op > 0.5 && !ghost;
  if (!keep) gl_Position = vec4(0.0, 0.0, 2.0, 1.0);
`;

export interface AnatomyMaterialOptions {
  group: GroupId;
  pass: 0 | 1;
  quality: "high" | "balanced";
}

export function createAnatomyMaterial(shared: SharedUniforms, opts: AnatomyMaterialOptions) {
  const look = GROUP_LOOK[opts.group];
  const high = opts.quality === "high";
  const mat = new THREE.MeshPhysicalMaterial({
    color: 0xffffff,
    roughness: look.roughness,
    metalness: look.metalness ?? 0,
    clearcoat: high ? look.clearcoat ?? 0 : 0,
    clearcoatRoughness: look.clearcoatRoughness ?? 0.3,
    sheen: high ? look.sheen ?? 0 : 0,
    sheenRoughness: 0.6,
    sheenColor: new THREE.Color("#ffd9c9"),
    specularIntensity: 0.6,
    envMapIntensity: 0.9,
    transparent: opts.pass === 1,
    depthWrite: opts.pass === 0,
    side: THREE.FrontSide,
  });
  const capColor = new THREE.Color(look.cap ?? "#000000");
  const local = {
    uPass: { value: opts.pass },
    uWrap: { value: look.wrap },
    uCapColor: { value: capColor },
    uCapMix: { value: look.cap ? 0.85 : 0.25 },
  };
  mat.onBeforeCompile = (shader) => {
    Object.assign(shader.uniforms, shared, local);
    shader.vertexShader = shader.vertexShader
      .replace("#include <common>", `#include <common>\n${VERTEX_PARS}`)
      .replace("#include <project_vertex>", `#include <project_vertex>\n${VERTEX_PROJECT}`);
    shader.fragmentShader = shader.fragmentShader
      .replace(
        "#include <common>",
        `#include <common>
${COMMON_GLSL}
uniform vec3 uAccent;
uniform float uCapOn;
uniform vec3 uCapNormal;
uniform vec3 uCapColor;
uniform float uCapMix;
uniform float uWrap;
uniform float uAnimOn;
uniform vec3 uHeart;
uniform vec4 uSpine;
flat varying vec4 vState;
flat varying vec4 vBase;
varying vec3 vWorld;`,
      )
      .replace("vec4 diffuseColor = vec4( diffuse, opacity );", "vec4 diffuseColor = vec4( vBase.rgb, vState.r );")
      .replace(
        "#include <normal_fragment_begin>",
        `#include <normal_fragment_begin>
  bool isCap = uCapOn > 0.5 && !gl_FrontFacing;
  if (isCap) {
    normal = normalize((viewMatrix * vec4(uCapNormal, 0.0)).xyz);
    nonPerturbedNormal = normal;
    diffuseColor.rgb = mix(diffuseColor.rgb * 0.8, uCapColor, uCapMix);
  }`,
      )
      .replace(
        "reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );",
        `float wrapNL = saturate((dot(geometryNormal, directLight.direction) + uWrap) / (1.0 + uWrap));
  vec3 scatter = vec3(1.0, 0.42, 0.32) * max(wrapNL - dotNL, 0.0) * 0.9;
  reflectedLight.directDiffuse += (irradiance + scatter * directLight.color) * BRDF_Lambert( material.diffuseColor );`,
      )
      .replace(
        "#include <opaque_fragment>",
        `{
  vec3 V = normalize(vViewPosition);
  float ndv = abs(dot(normal, V));
  float rim = pow(1.0 - ndv, 2.0);
  if (uAnimOn > 0.5 && vState.a > 0.5) {
    float phase;
    if (vState.a < 1.5) phase = distance(vWorld, uHeart) * 9.0 - uTime * 1.2;
    else if (vState.a < 2.5) phase = distance(vWorld, uHeart) * 9.0 + uTime * 0.8;
    else {
      vec2 dxz = vWorld.xz - uSpine.xy;
      float dy = max(max(uSpine.z - vWorld.y, vWorld.y - uSpine.w), 0.0);
      phase = length(vec3(dxz.x, dy, dxz.y)) * 7.0 - uTime * 1.6;
    }
    float w = pow(0.5 + 0.5 * sin(phase * 6.2831853), 10.0);
    outgoingLight += (vBase.rgb * 1.8 + 0.12) * w;
  }
  if (vState.g > 0.001) {
    float pulse = 0.82 + 0.18 * sin(uTime * 3.2);
    outgoingLight = mix(outgoingLight, uAccent * (0.4 + 0.8 * rim), clamp(vState.g * (0.14 + 0.62 * rim) * pulse, 0.0, 1.0));
    outgoingLight += uAccent * vState.g * 0.06;
  }
  if (vState.b > 0.5) {
    outgoingLight = mix(outgoingLight * 0.3, vBase.rgb * 0.8 + 0.06, 0.5) + rim * 0.35 * (vBase.rgb + 0.15);
    diffuseColor.a = vState.r * (0.06 + 0.94 * rim);
  }
  if (isCap) outgoingLight *= 0.92;
}
#include <opaque_fragment>`,
      );
  };
  mat.customProgramCacheKey = () => `anatomy-${opts.pass}-${opts.quality}`;
  return { material: mat, local };
}

/** Writes (structure index + 1) into the red/green bytes for GPU picking. */
export function createPickMaterial(shared: SharedUniforms) {
  return new THREE.ShaderMaterial({
    uniforms: { ...shared, uPass: { value: 2 } },
    clipping: true,
    vertexShader: /* glsl */ `
#include <common>
#include <clipping_planes_pars_vertex>
${VERTEX_PARS}
flat varying float vId;
void main() {
  vec3 transformed = vec3(position);
  vec4 mvPosition;
  ${VERTEX_PROJECT}
  vId = _sid + 1.0;
  #include <clipping_planes_vertex>
}`,
    fragmentShader: /* glsl */ `
#include <common>
#include <clipping_planes_pars_fragment>
flat varying float vId;
void main() {
  #include <clipping_planes_fragment>
  float id = floor(vId + 0.5);
  gl_FragColor = vec4(mod(id, 256.0) / 255.0, floor(id / 256.0) / 255.0, 0.0, 1.0);
}`,
  });
}
