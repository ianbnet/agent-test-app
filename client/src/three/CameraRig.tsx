import { useEffect, useRef } from "react";
import * as THREE from "three";
import { useThree } from "@react-three/fiber";
import { CameraControls } from "@react-three/drei";
import CameraControlsImpl from "camera-controls";
import type { LoadedModel } from "@/data/model";
import { useExplorer } from "@/state/store";
import { explodeOffset } from "./anatomyMaterial";
import { useAnatomyRuntime } from "./AnatomyModel";

const { ACTION } = CameraControlsImpl;

export function CameraRig({ model }: { model: LoadedModel }) {
  const ref = useRef<CameraControlsImpl>(null);
  const request = useExplorer((s) => s.camera);
  const size = useThree((s) => s.size);
  const runtime = useAnatomyRuntime();
  const firstFit = useRef<string | null>(null);

  const bodyBox = () => {
    const m = model.manifest;
    return new THREE.Box3(new THREE.Vector3(...m.min), new THREE.Vector3(...m.max));
  };

  const padding = () => {
    const narrow = size.width < 768;
    // world-space margins (m) leaving room for the top bar and bottom controls
    return narrow
      ? { paddingTop: 0.2, paddingBottom: 0.34, paddingLeft: 0.02, paddingRight: 0.02 }
      : { paddingTop: 0.16, paddingBottom: 0.14, paddingLeft: 0.05, paddingRight: 0.05 };
  };

  // Frame the whole body when a model first appears (and on sex switch).
  useEffect(() => {
    const c = ref.current;
    if (!c || firstFit.current === model.sex) return;
    const first = firstFit.current === null;
    firstFit.current = model.sex;
    c.setLookAt(0, model.manifest.height * 0.55, 3.2, 0, model.manifest.height * 0.52, 0, false);
    c.fitToBox(bodyBox(), !first, padding());
  }, [model]);

  useEffect(() => {
    const c = ref.current;
    if (!c || !request) return;
    if (request.kind === "view") {
      const v = request.view ?? "front";
      const angles: Record<string, [number, number]> = {
        front: [0, Math.PI / 2],
        reset: [0, Math.PI / 2],
        back: [Math.PI, Math.PI / 2],
        left: [Math.PI / 2, Math.PI / 2],
        right: [-Math.PI / 2, Math.PI / 2],
        top: [0, 0.12],
      };
      const [az, pol] = angles[v];
      if (v === "reset") {
        c.setLookAt(0, model.manifest.height * 0.55, 3.2, 0, model.manifest.height * 0.52, 0, true);
        c.fitToBox(bodyBox(), true, padding());
        return;
      }
      // Keep the current framing, just swing around the target.
      c.rotateTo(az, pol, true);
      return;
    }
    if (request.kind === "focus" && request.ids?.length) {
      const box = new THREE.Box3();
      const off = new THREE.Vector3();
      const amount = runtime?.shared.uExplode.value ?? 0;
      const origin = runtime?.shared.uExplodeOrigin.value ?? new THREE.Vector3();
      for (const id of request.ids) {
        const s = model.byId.get(id);
        if (!s) continue;
        explodeOffset(s.center, origin, amount, off);
        box.expandByPoint(new THREE.Vector3(...s.min).add(off));
        box.expandByPoint(new THREE.Vector3(...s.max).add(off));
      }
      if (box.isEmpty()) return;
      // Don't zoom closer than ~12 cm across, so small structures keep some context.
      const sizeV = box.getSize(new THREE.Vector3());
      const minSpan = 0.12;
      if (Math.max(sizeV.x, sizeV.y, sizeV.z) < minSpan) box.expandByScalar((minSpan - Math.max(sizeV.x, sizeV.y, sizeV.z)) / 2);
      const pad = padding();
      const k = Math.min(1, Math.max(sizeV.x, sizeV.y) / 1.2);
      c.fitToBox(box, true, {
        paddingTop: pad.paddingTop * k + 0.01,
        paddingBottom: pad.paddingBottom * k + 0.01,
        paddingLeft: 0.01,
        paddingRight: 0.01,
        cover: false,
      });
    }
  }, [request]);

  return (
    <CameraControls
      ref={ref}
      makeDefault
      minDistance={0.06}
      maxDistance={6}
      smoothTime={0.28}
      draggingSmoothTime={0.08}
      dollyToCursor
      dollySpeed={0.6}
      truckSpeed={1.6}
      mouseButtons={{ left: ACTION.ROTATE, middle: ACTION.DOLLY, right: ACTION.TRUCK, wheel: ACTION.DOLLY }}
      touches={{ one: ACTION.TOUCH_ROTATE, two: ACTION.TOUCH_DOLLY_TRUCK, three: ACTION.TOUCH_TRUCK }}
    />
  );
}
