/**
 * CPU side of the per-structure state textures: computes target opacity / highlight /
 * ghosting / colour for every structure from the explorer state, then eases the current
 * values toward those targets each frame so peeling, isolating and recolouring animate.
 */
import * as THREE from "three";
import type { StructureMeta, SystemId } from "@shared/anatomy";
import { TEX_WIDTH } from "./anatomyMaterial";
import { NO_DATA, type OverlayResult } from "@/data/overlays";
import { GROUP_LOOK } from "@/data/systems";

export interface VisualInputs {
  structures: StructureMeta[];
  peel: number;
  systems: Record<SystemId, boolean>;
  hidden: Record<string, true>;
  isolated: Set<string> | null;
  ghost: boolean;
  selected: number | null;
  hovered: number | null;
  /** Extra marks (quiz answers etc.): highlight 0..1 and/or a tint colour. */
  marks?: Map<number, { highlight?: number; tint?: string }>;
  overlay: OverlayResult | null;
  /** Structure index → tint colour (connections of the selection). */
  related: Map<number, string>;
  sectionOn: boolean;
  exploded: boolean;
}

const SKIN_GHOST = 0.32;
const CONTEXT_GHOST = 0.22;

function layerAlpha(layer: number, peel: number) {
  const f = Math.floor(peel);
  if (layer < f) return 0;
  if (layer === f) return 1 - (peel - f);
  return 1;
}

export class StructureState {
  readonly n: number;
  readonly state: THREE.DataTexture;
  readonly color: THREE.DataTexture;
  readonly center: THREE.DataTexture;
  private cur: Float32Array;
  private target: Float32Array;
  private curColor: Float32Array;
  private targetColor: Float32Array;
  private anim: Uint8Array;
  private settled = false;
  private tmp = new THREE.Color();

  constructor(private structures: StructureMeta[]) {
    this.n = structures.length;
    const h = Math.ceil(this.n / TEX_WIDTH);
    const mk = () => {
      const t = new THREE.DataTexture(new Float32Array(TEX_WIDTH * h * 4), TEX_WIDTH, h, THREE.RGBAFormat, THREE.FloatType);
      t.minFilter = t.magFilter = THREE.NearestFilter;
      t.generateMipmaps = false;
      t.needsUpdate = true;
      return t;
    };
    this.state = mk();
    this.color = mk();
    this.center = mk();
    this.cur = this.state.image.data as Float32Array;
    this.curColor = this.color.image.data as Float32Array;
    this.target = new Float32Array(this.cur.length);
    this.targetColor = new Float32Array(this.curColor.length);
    this.anim = new Uint8Array(this.n);
    const c = this.center.image.data as Float32Array;
    structures.forEach((s, i) => {
      c.set([s.center[0], s.center[1], s.center[2], s.layer], i * 4);
      this.tmp.set(s.color);
      this.curColor.set([this.tmp.r, this.tmp.g, this.tmp.b, 1], i * 4);
      this.cur[i * 4] = 1;
    });
    this.targetColor.set(this.curColor);
    this.target.set(this.cur);
  }

  /** Current (animated) opacity of a structure. */
  opacity(i: number) {
    return this.cur[i * 4];
  }

  isGhost(i: number) {
    return this.cur[i * 4 + 2] > 0.5;
  }

  setTargets(v: VisualInputs) {
    const { structures } = v;
    const skin = structures.find((s) => s.group === "skin");
    const skinAlpha = skin && v.systems.integumentary && !v.hidden[skin.id] && !v.isolated ? layerAlpha(0, v.peel) : 0;
    // With an intact, opaque skin nothing inside can be seen: skip it entirely.
    const cullInterior = skinAlpha >= 1 && !v.sectionOn && !v.exploded;
    for (let i = 0; i < this.n; i++) {
      const s = structures[i];
      const o = i * 4;
      let alpha = layerAlpha(s.layer, v.peel);
      let ghost = 0;
      if (!v.systems[s.system] || v.hidden[s.id]) alpha = 0;
      else if (v.isolated && !v.isolated.has(s.id)) {
        alpha = alpha > 0 ? CONTEXT_GHOST : 0;
        ghost = alpha > 0 ? 1 : 0;
      } else if (s.group === "skin" && alpha < 1 && v.ghost && !v.sectionOn) {
        alpha = Math.max(alpha, SKIN_GHOST);
        ghost = alpha <= SKIN_GHOST ? 1 : 0;
      } else if (cullInterior && s.group !== "skin" && s.group !== "eye") {
        alpha = 0;
      }
      const maxOp = GROUP_LOOK[s.group].maxOpacity;
      if (maxOp !== undefined && !ghost) alpha = Math.min(alpha, maxOp);
      let hl = 0;
      if (v.selected === i) hl = 1;
      else if (v.hovered === i) hl = 0.45;
      const mark = v.marks?.get(i);
      if (mark?.highlight !== undefined) hl = Math.max(hl, mark.highlight);
      this.target[o] = alpha;
      this.target[o + 1] = hl;
      this.target[o + 2] = ghost;
      this.target[o + 3] = v.overlay?.anim?.[i] ?? 0;

      let hex = s.color;
      if (v.overlay) {
        const oc = v.overlay.colors[i];
        hex = oc ?? NO_DATA;
      }
      const rel = mark?.tint ?? v.related.get(i);
      this.tmp.set(hex);
      if (rel) {
        this.tmp.lerp(new THREE.Color(rel), mark?.tint ? 0.8 : 0.55);
      }
      this.targetColor[o] = this.tmp.r;
      this.targetColor[o + 1] = this.tmp.g;
      this.targetColor[o + 2] = this.tmp.b;
      this.targetColor[o + 3] = 1;
    }
    this.settled = false;
  }

  /** Eases toward the targets; returns true while anything is still changing. */
  step(dt: number) {
    if (this.settled) return false;
    const k = 1 - Math.exp(-dt * 10);
    let moving = false;
    const cur = this.cur;
    const tgt = this.target;
    for (let o = 0; o < cur.length; o += 4) {
      // opacity & highlight ease; ghost flag and animation channel switch immediately
      for (let c = 0; c < 2; c++) {
        const d = tgt[o + c] - cur[o + c];
        if (Math.abs(d) > 0.002) {
          cur[o + c] += d * k;
          moving = true;
        } else cur[o + c] = tgt[o + c];
      }
      cur[o + 2] = tgt[o + 2];
      cur[o + 3] = tgt[o + 3];
      for (let c = 0; c < 3; c++) {
        const d = this.targetColor[o + c] - this.curColor[o + c];
        if (Math.abs(d) > 0.001) {
          this.curColor[o + c] += d * k;
          moving = true;
        } else this.curColor[o + c] = this.targetColor[o + c];
      }
    }
    this.state.needsUpdate = true;
    this.color.needsUpdate = true;
    if (!moving) this.settled = true;
    return moving;
  }

  /** Which render groups have anything to draw in each pass (so empty draw calls can be skipped). */
  groupActivity(groupOf: (i: number) => number, nGroups: number) {
    const opaque = new Uint8Array(nGroups);
    const translucent = new Uint8Array(nGroups);
    for (let i = 0; i < this.n; i++) {
      const g = groupOf(i);
      const op = Math.max(this.cur[i * 4], this.target[i * 4]);
      if (op <= 0.003) continue;
      const ghost = this.cur[i * 4 + 2] > 0.5;
      if (op > 0.996 && !ghost) opaque[g] = 1;
      if (ghost || this.cur[i * 4] <= 0.996 || this.target[i * 4] <= 0.996) translucent[g] = 1;
      if (this.cur[i * 4] > 0.996 || this.target[i * 4] > 0.996) opaque[g] = opaque[g] || (ghost ? 0 : 1);
    }
    return { opaque, translucent };
  }

  dispose() {
    this.state.dispose();
    this.color.dispose();
    this.center.dispose();
  }
}
