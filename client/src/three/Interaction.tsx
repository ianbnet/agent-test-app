import { useEffect, useMemo, useRef } from "react";
import * as THREE from "three";
import { useThree } from "@react-three/fiber";
import { useExplorer } from "@/state/store";
import { useAnatomyRuntime } from "./AnatomyModel";
import { viewShift } from "./viewShift";
import { visibility } from "./visibility";

/** Tap/click to select (GPU colour-ID picking), hover tooltips on mouse, double-tap to focus. */
export function Interaction({ onHover }: { onHover?: (info: { id: string; x: number; y: number } | null) => void }) {
  const runtime = useAnatomyRuntime();
  const gl = useThree((s) => s.gl);
  const camera = useThree((s) => s.camera) as THREE.PerspectiveCamera;
  const target = useMemo(() => new THREE.WebGLRenderTarget(1, 1, { depthBuffer: true }), []);
  const buf = useMemo(() => new Uint8Array(4), []);
  const lastTap = useRef({ t: 0, id: null as string | null });

  useEffect(() => () => target.dispose(), [target]);

  useEffect(() => {
    if (!runtime) return;
    const el = gl.domElement;
    const clear = new THREE.Color();

    const pick = (clientX: number, clientY: number): string | null => {
      const rect = el.getBoundingClientRect();
      const x = clientX - rect.left;
      const y = clientY - rect.top;
      if (x < 0 || y < 0 || x > rect.width || y > rect.height) return null;
      const dpr = gl.getPixelRatio();
      viewShift.pickOffset(camera, Math.floor(x), Math.floor(y), rect.width, rect.height, dpr);
      const prevTarget = gl.getRenderTarget();
      gl.getClearColor(clear);
      const prevAlpha = gl.getClearAlpha();
      gl.setRenderTarget(target);
      gl.setClearColor(0x000000, 0);
      gl.clear(true, true, false);
      gl.render(runtime.pickScene, camera);
      gl.setRenderTarget(prevTarget);
      gl.setClearColor(clear, prevAlpha);
      viewShift.apply(camera, rect.width, rect.height, true);
      gl.readRenderTargetPixels(target, 0, 0, 1, 1, buf);
      const id = buf[0] + buf[1] * 256;
      if (!id) return null;
      return runtime.model.manifest.structures[id - 1]?.id ?? null;
    };

    const sampleTarget = new THREE.WebGLRenderTarget(1, 1, { depthBuffer: true });
    visibility.sample = () => {
      const rect = el.getBoundingClientRect();
      const w = 200;
      const h = Math.max(1, Math.round((200 * rect.height) / rect.width));
      sampleTarget.setSize(w, h);
      const px = new Uint8Array(w * h * 4);
      const prevTarget = gl.getRenderTarget();
      gl.getClearColor(clear);
      const prevAlpha = gl.getClearAlpha();
      gl.setRenderTarget(sampleTarget);
      gl.setClearColor(0x000000, 0);
      gl.clear(true, true, false);
      gl.render(runtime.pickScene, camera);
      gl.setRenderTarget(prevTarget);
      gl.setClearColor(clear, prevAlpha);
      gl.readRenderTargetPixels(sampleTarget, 0, 0, w, h, px);
      const counts = new Map<number, number>();
      for (let i = 0; i < px.length; i += 4) {
        const id = px[i] + px[i + 1] * 256;
        if (id) counts.set(id - 1, (counts.get(id - 1) ?? 0) + 1);
      }
      return counts;
    };

    let down: { x: number; y: number; t: number; id: number } | null = null;
    let moved = false;
    let hoverTimer = 0;
    let lastHoverAt = 0;

    const onDown = (e: PointerEvent) => {
      if (!e.isPrimary) {
        down = null;
        return;
      }
      down = { x: e.clientX, y: e.clientY, t: performance.now(), id: e.pointerId };
      moved = false;
      onHover?.(null);
    };
    const onMove = (e: PointerEvent) => {
      if (down && Math.hypot(e.clientX - down.x, e.clientY - down.y) > 6) moved = true;
      if (e.pointerType !== "mouse" || e.buttons) return;
      const now = performance.now();
      const run = () => {
        lastHoverAt = performance.now();
        const id = pick(e.clientX, e.clientY);
        const st = useExplorer.getState();
        st.hover(id);
        onHover?.(id ? { id, x: e.clientX, y: e.clientY } : null);
      };
      window.clearTimeout(hoverTimer);
      if (now - lastHoverAt > 90) run();
      else hoverTimer = window.setTimeout(run, 90);
    };
    const onLeave = () => {
      window.clearTimeout(hoverTimer);
      useExplorer.getState().hover(null);
      onHover?.(null);
    };
    const onUp = (e: PointerEvent) => {
      const d = down;
      down = null;
      if (!d || d.id !== e.pointerId || moved || performance.now() - d.t > 450) return;
      const id = pick(e.clientX, e.clientY);
      const st = useExplorer.getState();
      if (st.quiz?.mode === "find" && !st.quiz.feedback) {
        if (id) window.dispatchEvent(new CustomEvent("anatomica:quiz-pick", { detail: id }));
        return;
      }
      const now = performance.now();
      const dbl = now - lastTap.current.t < 350 && lastTap.current.id === id;
      lastTap.current = { t: now, id };
      if (id) {
        st.select(id);
        if (dbl) st.focus([id]);
      } else if (!dbl) {
        st.select(null);
      }
    };

    el.addEventListener("pointerdown", onDown);
    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerup", onUp);
    el.addEventListener("pointerleave", onLeave);
    return () => {
      el.removeEventListener("pointerdown", onDown);
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerup", onUp);
      el.removeEventListener("pointerleave", onLeave);
      window.clearTimeout(hoverTimer);
      visibility.sample = null;
      sampleTarget.dispose();
    };
  }, [runtime, gl, camera, target, buf, onHover]);

  return null;
}
