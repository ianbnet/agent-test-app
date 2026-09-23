import { createContext, useContext, useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { useFrame, useThree } from "@react-three/fiber";
import type { LoadedModel } from "@/data/model";
import { GROUP_ORDER } from "@/data/systems";
import { OVERLAY_BY_ID, type OverlayResult } from "@/data/overlays";
import { RELATION_INFO, useKnowledge, type KnowledgeBase } from "@/data/knowledge";
import { useExplorer } from "@/state/store";
import { createAnatomyMaterial, createPickMaterial, createSharedUniforms, type SharedUniforms } from "./anatomyMaterial";
import { StructureState } from "./structureState";

export interface AnatomyRuntime {
  model: LoadedModel;
  state: StructureState;
  shared: SharedUniforms;
  pickScene: THREE.Scene;
  plane: THREE.Plane;
  overlay: OverlayResult | null;
  /** Structure indices highlighted as connections of the selection, with their relation. */
  related: RelatedTarget[];
}

export interface RelatedTarget {
  index: number;
  concept: string;
  relation: keyof typeof RELATION_INFO;
  note?: string;
}

const RuntimeContext = createContext<AnatomyRuntime | null>(null);
export const useAnatomyRuntime = () => useContext(RuntimeContext);

const MAX_RELATED = 18;

/** Resolve the knowledge-base connections of the selected structure to model structures. */
export function relatedStructures(model: LoadedModel, kb: KnowledgeBase | null, selected: number | null): RelatedTarget[] {
  if (selected === null || !kb) return [];
  const sel = model.manifest.structures[selected];
  const info = kb[sel.concept];
  if (!info?.connections) return [];
  const out: RelatedTarget[] = [];
  const seen = new Set<number>();
  const conns = [...info.connections].sort((a, b) => RELATION_INFO[a.relation].order - RELATION_INFO[b.relation].order);
  for (const c of conns) {
    const list = model.byConcept.get(c.concept);
    if (!list) continue;
    let targets = list;
    if (sel.side) {
      const same = list.filter((s) => s.side === sel.side);
      if (same.length) targets = same;
    } else if (list.length > 2) {
      targets = list.slice(0, 2);
    }
    for (const t of targets) {
      if (t.index === selected || seen.has(t.index)) continue;
      seen.add(t.index);
      out.push({ index: t.index, concept: c.concept, relation: c.relation, note: c.note });
    }
    if (out.length >= MAX_RELATED) break;
  }
  return out;
}

export function AnatomyModel({ model, children }: { model: LoadedModel; children?: React.ReactNode }) {
  const quality = useExplorer((s) => s.quality);
  const peel = useExplorer((s) => s.peel);
  const systems = useExplorer((s) => s.systems);
  const hidden = useExplorer((s) => s.hidden);
  const isolated = useExplorer((s) => s.isolated);
  const ghost = useExplorer((s) => s.ghost);
  const selectedId = useExplorer((s) => s.selected);
  const hoveredId = useExplorer((s) => s.hovered);
  const overlayId = useExplorer((s) => s.overlay);
  const animate = useExplorer((s) => s.animate);
  const section = useExplorer((s) => s.section);
  const explode = useExplorer((s) => s.explode);
  const showConnections = useExplorer((s) => s.showConnections);
  const quiz = useExplorer((s) => s.quiz);
  const kb = useKnowledge();
  const invalidate = useThree((s) => s.invalidate);
  const gl = useThree((s) => s.gl);

  const structState = useMemo(() => new StructureState(model.manifest.structures, model.axes), [model]);
  const shared = useMemo(
    () => createSharedUniforms(structState.state, structState.color, structState.center, structState.axis),
    [structState],
  );
  const plane = useMemo(() => new THREE.Plane(new THREE.Vector3(1, 0, 0), 1e6), []);

  // Landmarks for the animated overlays: the heart for blood, the neuraxis for nerve impulses.
  useEffect(() => {
    const heart = model.manifest.structures.filter((s) => s.group === "heart");
    if (heart.length) {
      const c = new THREE.Vector3();
      heart.forEach((s) => c.add(new THREE.Vector3(...s.center)));
      shared.uHeart.value.copy(c.divideScalar(heart.length));
    }
    const cord = model.byConcept.get("spinal-cord")?.[0];
    const brain = model.manifest.structures.filter((s) => s.group === "brain");
    if (cord) {
      const top = brain.reduce((m, s) => Math.max(m, s.max[1]), cord.max[1]);
      shared.uSpine.value.set(cord.center[0], cord.center[2], cord.min[1], top);
    }
    const m = model.manifest;
    shared.uExplodeOrigin.value.set(0, m.height * 0.56, (m.min[2] + m.max[2]) / 2);
  }, [model, shared]);

  const meshes = useMemo(() => {
    const list: { opaque: THREE.Mesh; translucent: THREE.Mesh; pick: THREE.Mesh; order: number; locals: ReturnType<typeof createAnatomyMaterial>["local"][] }[] = [];
    for (const g of model.groups) {
      const order = GROUP_ORDER.indexOf(g.group);
      const bakedAo = !!g.geometry.getAttribute("_ao");
      const a = createAnatomyMaterial(shared, { group: g.group, pass: 0, quality, bakedAo });
      const b = createAnatomyMaterial(shared, { group: g.group, pass: 1, quality, bakedAo });
      a.material.clippingPlanes = [plane];
      b.material.clippingPlanes = [plane];
      const opaque = new THREE.Mesh(g.geometry, a.material);
      const translucent = new THREE.Mesh(g.geometry, b.material);
      for (const m of [opaque, translucent]) {
        m.matrixAutoUpdate = false;
        m.matrix.copy(g.matrix);
        m.frustumCulled = false;
        m.name = g.group;
      }
      opaque.renderOrder = GROUP_ORDER.length - order; // outer shells first → early-z rejects the rest
      translucent.renderOrder = 100 + order; // inner first, skin last
      const pick = new THREE.Mesh(g.geometry);
      pick.matrixAutoUpdate = false;
      pick.matrix.copy(g.matrix);
      pick.frustumCulled = false;
      list.push({ opaque, translucent, pick, order, locals: [a.local, b.local] });
    }
    return list;
  }, [model, shared, quality, plane]);

  const pickMaterial = useMemo(() => {
    const m = createPickMaterial(shared);
    m.clippingPlanes = [plane];
    return m;
  }, [shared, plane]);

  const pickScene = useMemo(() => {
    const scene = new THREE.Scene();
    for (const m of meshes) {
      m.pick.material = pickMaterial;
      scene.add(m.pick);
    }
    return scene;
  }, [meshes, pickMaterial]);

  useEffect(() => {
    gl.localClippingEnabled = true;
  }, [gl]);

  useEffect(
    () => () => {
      for (const m of meshes) {
        (m.opaque.material as THREE.Material).dispose();
        (m.translucent.material as THREE.Material).dispose();
      }
    },
    [meshes],
  );
  useEffect(() => () => structState.dispose(), [structState]);

  const overlay = useMemo(() => {
    if (!overlayId) return null;
    const def = OVERLAY_BY_ID[overlayId];
    if (def.needsKnowledge && !kb) return null;
    return def.compute(model, kb);
  }, [overlayId, model, kb]);

  const indexOf = (id: string | null) => (id ? model.byId.get(id)?.index ?? null : null);
  const selected = indexOf(selectedId);
  const hovered = indexOf(hoveredId);

  const related = useMemo(
    () => (showConnections && !quiz ? relatedStructures(model, kb, selected) : []),
    [model, kb, selected, showConnections, quiz],
  );

  const isolatedSet = useMemo(() => (isolated ? new Set(isolated) : null), [isolated]);

  const marks = useMemo(() => {
    const m = new Map<number, { highlight?: number; tint?: string }>();
    if (!quiz?.target) return m;
    const target = model.byId.get(quiz.target);
    if (!target) return m;
    if (quiz.mode === "name" || quiz.feedback) m.set(target.index, { highlight: 1, tint: quiz.feedback ? "#39d98a" : undefined });
    const picked = quiz.feedback?.picked ? model.byId.get(quiz.feedback.picked) : undefined;
    if (picked && !quiz.feedback?.correct && picked.index !== target.index) m.set(picked.index, { highlight: 0.3, tint: "#ff4d5e" });
    return m;
  }, [quiz, model]);

  useEffect(() => {
    const relMap = new Map<number, string>();
    for (const r of related) relMap.set(r.index, RELATION_INFO[r.relation].color);
    structState.setTargets({
      structures: model.manifest.structures,
      peel,
      systems,
      hidden,
      isolated: isolatedSet,
      ghost,
      selected: quiz ? null : selected,
      hovered: quiz ? null : hovered,
      marks,
      overlay,
      related: relMap,
      sectionOn: section.enabled,
      exploded: explode > 0.001,
    });
    invalidate();
  }, [structState, model, peel, systems, hidden, isolatedSet, ghost, selected, hovered, overlay, related, section.enabled, explode, quiz, marks, invalidate]);

  // Section plane
  useEffect(() => {
    const m = model.manifest;
    const axis = section.axis === "sagittal" ? 0 : section.axis === "coronal" ? 2 : 1;
    const n = new THREE.Vector3();
    n.setComponent(axis, section.flip ? 1 : -1);
    // offset in [-1, 1] maps across the body's extent on that axis
    const mid = (m.min[axis] + m.max[axis]) / 2;
    const half = (m.max[axis] - m.min[axis]) / 2;
    const pos = mid + section.offset * half * 0.98;
    if (section.enabled) {
      plane.normal.copy(n);
      plane.constant = -n.getComponent(axis) * pos;
      shared.uCapNormal.value.copy(n).negate();
    } else {
      plane.normal.set(1, 0, 0);
      plane.constant = 1e6;
    }
    shared.uCapOn.value = section.enabled ? 1 : 0;
    for (const mm of meshes) {
      const side = section.enabled ? THREE.DoubleSide : THREE.FrontSide;
      const mat = mm.opaque.material as THREE.Material;
      if (mat.side !== side) {
        mat.side = side;
        mat.needsUpdate = true;
      }
    }
    pickMaterial.side = section.enabled ? THREE.DoubleSide : THREE.FrontSide;
    invalidate();
  }, [section, model, plane, shared, meshes, pickMaterial, invalidate]);

  useEffect(() => {
    shared.uAnimOn.value = overlay?.anim && animate ? 1 : 0;
    invalidate();
  }, [overlay, animate, shared, invalidate]);

  const explodeCur = useRef(0);
  const groupIndex = useMemo(() => {
    const byGroup = new Map(model.groups.map((g, i) => [g.group, i]));
    const arr = new Uint8Array(model.manifest.structures.length);
    model.manifest.structures.forEach((s, i) => (arr[i] = byGroup.get(s.group) ?? 0));
    return arr;
  }, [model]);

  useFrame((_, dt) => {
    const d = Math.min(dt, 0.1);
    shared.uTime.value += d;
    // easing uses real elapsed time so slow devices still converge in a couple of frames
    const ease = Math.min(dt, 0.5);
    const moving = structState.step(ease);
    const ex = explode - explodeCur.current;
    const exploding = Math.abs(ex) > 1e-4;
    if (exploding) {
      explodeCur.current += ex * (1 - Math.exp(-ease * 8));
      shared.uExplode.value = explodeCur.current;
    } else {
      explodeCur.current = explode;
      shared.uExplode.value = explode;
    }
    // The canvas renders on demand; keep frames coming only while something animates.
    const st = useExplorer.getState();
    if (moving || exploding || st.selected || st.hovered || st.quiz?.target || shared.uAnimOn.value > 0) invalidate();
    const act = structState.groupActivity((i) => groupIndex[i], model.groups.length);
    meshes.forEach((m, gi) => {
      m.opaque.visible = act.opaque[gi] === 1;
      m.translucent.visible = act.translucent[gi] === 1;
      m.pick.visible = m.opaque.visible || m.translucent.visible;
    });
  });

  const runtime = useMemo<AnatomyRuntime>(
    () => ({ model, state: structState, shared, pickScene, plane, overlay, related }),
    [model, structState, shared, pickScene, plane, overlay, related],
  );
  if (import.meta.env.DEV) (window as unknown as { __runtime?: AnatomyRuntime }).__runtime = runtime;

  return (
    <RuntimeContext.Provider value={runtime}>
      <group>
        {meshes.map((m) => (
          <group key={m.opaque.name}>
            <primitive object={m.opaque} />
            <primitive object={m.translucent} />
          </group>
        ))}
      </group>
      {children}
    </RuntimeContext.Provider>
  );
}
