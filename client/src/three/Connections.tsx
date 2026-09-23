import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { useFrame, useThree } from "@react-three/fiber";
import { QuadraticBezierLine } from "@react-three/drei";
import { anchorOf } from "@/data/model";
import { RELATION_INFO } from "@/data/knowledge";
import { useExplorer } from "@/state/store";
import { explodeOffset } from "./anatomyMaterial";
import { useAnatomyRuntime } from "./AnatomyModel";
import { calloutBus, type Callout } from "./callouts";

type LineRef = React.ElementRef<typeof QuadraticBezierLine>;

/**
 * Animated arcs from the selected structure to everything the knowledge base connects it
 * to (blood supply, drainage, innervation, attachments…), plus the callout anchors.
 */
export function Connections() {
  const runtime = useAnatomyRuntime();
  const selectedId = useExplorer((s) => s.selected);
  const show = useExplorer((s) => s.showConnections);
  const labels = useExplorer((s) => s.labels);
  const explode = useExplorer((s) => s.explode);
  const quiz = useExplorer((s) => s.quiz);
  const lines = useRef<(LineRef | null)[]>([]);
  const camera = useThree((s) => s.camera);
  const size = useThree((s) => s.size);

  const arcs = useMemo(() => {
    if (!runtime || !selectedId || !show || quiz) return [];
    const { model, related, shared } = runtime;
    const sel = model.byId.get(selectedId);
    if (!sel) return [];
    const origin = shared.uExplodeOrigin.value;
    const o = new THREE.Vector3();
    const a = anchorOf(model, sel.index).add(explodeOffset(sel.center, origin, explode, o));
    return related.map((r) => {
      const t = model.manifest.structures[r.index];
      const b = anchorOf(model, r.index).add(explodeOffset(t.center, origin, explode, o));
      const mid = a.clone().add(b).multiplyScalar(0.5);
      const len = a.distanceTo(b);
      // Bow the arc toward the front so it clears the body surface.
      mid.z += Math.min(0.22, 0.05 + len * 0.3);
      mid.y += Math.min(0.06, len * 0.12);
      return { r, t, a, b, mid, color: RELATION_INFO[r.relation].color };
    });
  }, [runtime, selectedId, show, explode, quiz]);

  // Publish callouts: the selection itself plus each connected structure.
  useEffect(() => {
    if (!runtime || !selectedId || !labels) {
      calloutBus.set([]);
      return;
    }
    const { model, shared } = runtime;
    const sel = model.byId.get(selectedId);
    if (!sel) {
      calloutBus.set([]);
      return;
    }
    const o = new THREE.Vector3();
    const list: Callout[] = [];
    if (!quiz) {
      list.push({
        key: `sel-${sel.id}`,
        id: sel.id,
        label: sel.name,
        color: "#3ee6c8",
        primary: true,
        world: anchorOf(model, sel.index).add(explodeOffset(sel.center, shared.uExplodeOrigin.value, explode, o)),
      });
    }
    // small screens get the closest few relations only (arcs still show all of them)
    const limit = size.width < 640 ? 6 : size.width < 1100 ? 10 : Infinity;
    for (const c of arcs.slice(0, limit)) {
      list.push({
        key: `${c.t.id}-${c.r.relation}`,
        id: c.t.id,
        label: c.t.name,
        sub: RELATION_INFO[c.r.relation].label,
        color: c.color,
        world: c.b,
      });
    }
    calloutBus.set(list);
  }, [runtime, selectedId, labels, arcs, explode, quiz, size.width]);

  useEffect(() => () => calloutBus.set([]), []);

  const corners = useMemo(() => {
    if (!runtime) return [];
    const m = runtime.model.manifest;
    const pts: THREE.Vector3[] = [];
    for (let i = 0; i < 8; i++) pts.push(new THREE.Vector3(i & 1 ? m.max[0] : m.min[0], i & 2 ? m.max[1] : m.min[1], i & 4 ? m.max[2] : m.min[2]));
    return pts;
  }, [runtime]);

  const tmp = useMemo(() => new THREE.Vector3(), []);
  useFrame((_, dt) => {
    for (const l of lines.current) {
      const mat = l?.material as unknown as { dashOffset: number } | undefined;
      if (mat) mat.dashOffset -= dt * 0.12;
    }
    const list = calloutBus.callouts;
    if (!list.length || !runtime) return;
    const origin = runtime.shared.uExplodeOrigin.value;
    const ex = runtime.shared.uExplode.value;
    const b = calloutBus.body;
    b.left = Infinity;
    b.right = -Infinity;
    b.top = Infinity;
    b.bottom = -Infinity;
    for (const c of corners) {
      tmp.copy(c).add(explodeOffset([c.x, c.y, c.z], origin, ex, new THREE.Vector3())).project(camera);
      const x = (tmp.x * 0.5 + 0.5) * size.width;
      const y = (-tmp.y * 0.5 + 0.5) * size.height;
      b.left = Math.min(b.left, x);
      b.right = Math.max(b.right, x);
      b.top = Math.min(b.top, y);
      b.bottom = Math.max(b.bottom, y);
    }
    list.forEach((c, i) => {
      tmp.copy(c.world).project(camera);
      const p = calloutBus.screen[i];
      p.x = (tmp.x * 0.5 + 0.5) * size.width;
      p.y = (-tmp.y * 0.5 + 0.5) * size.height;
      p.visible = tmp.z < 1 && tmp.z > -1;
    });
    calloutBus.frame();
  });

  if (!arcs.length) return null;
  return (
    <group>
      {arcs.map((c, i) => (
        <QuadraticBezierLine
          key={`${c.r.index}-${c.r.relation}`}
          ref={(el) => (lines.current[i] = el)}
          start={c.a}
          end={c.b}
          mid={c.mid}
          color={c.color}
          lineWidth={1.4}
          dashed
          dashScale={60}
          dashSize={0.5}
          gapSize={0.35}
          transparent
          opacity={0.75}
          depthTest={false}
          renderOrder={1000}
        />
      ))}
    </group>
  );
}
