import { useEffect, useRef } from "react";
import * as THREE from "three";
import { useFrame, useThree } from "@react-three/fiber";
import { CameraControls } from "@react-three/drei";
import CameraControlsImpl from "camera-controls";
import type { LoadedModel } from "@/data/model";
import { useExplorer } from "@/state/store";
import { explodeOffset } from "./anatomyMaterial";
import { useAnatomyRuntime } from "./AnatomyModel";
import { viewShift } from "./viewShift";

const { ACTION } = CameraControlsImpl;

const VIEWS: Record<string, [number, number]> = {
  front: [0, Math.PI / 2],
  reset: [0, Math.PI / 2],
  back: [Math.PI, Math.PI / 2],
  left: [Math.PI / 2, Math.PI / 2],
  right: [-Math.PI / 2, Math.PI / 2],
  top: [0, 0.12],
};

/** Camera basis for spherical angles (azimuth around +Y from +Z, polar from +Y). */
function basis(az: number, pol: number) {
  const back = new THREE.Vector3(Math.sin(pol) * Math.sin(az), Math.cos(pol), Math.sin(pol) * Math.cos(az));
  const right = new THREE.Vector3(Math.cos(az), 0, -Math.sin(az));
  const up = new THREE.Vector3().crossVectors(back, right).normalize();
  return { back, right, up };
}

export function CameraRig({ model }: { model: LoadedModel }) {
  const ref = useRef<CameraControlsImpl>(null);
  const request = useExplorer((s) => s.camera);
  const camera = useThree((s) => s.camera) as THREE.PerspectiveCamera;
  const size = useThree((s) => s.size);
  const invalidate = useThree((s) => s.invalidate);
  const runtime = useAnatomyRuntime();
  const fitted = useRef<string | null>(null);
  const insets = useExplorer((s) => s.insets);
  useEffect(() => invalidate(), [insets, invalidate]);

  /** Distance that fits a box into the free (un-panelled) part of the screen, viewed at az/pol. */
  const fit = (box: THREE.Box3, az: number, pol: number, margin: number, animate: boolean) => {
    const c = ref.current;
    if (!c) return;
    const ins = useExplorer.getState().insets;
    const W = size.width;
    const H = size.height;
    const fw = Math.max(0.3, (W - ins.left - ins.right) / W);
    const fh = Math.max(0.3, (H - ins.top - ins.bottom) / H);
    const { back, right, up } = basis(az, pol);
    let ex = 0;
    let ey = 0;
    let ez = 0;
    const center = box.getCenter(new THREE.Vector3());
    const p = new THREE.Vector3();
    for (let i = 0; i < 8; i++) {
      p.set(i & 1 ? box.max.x : box.min.x, i & 2 ? box.max.y : box.min.y, i & 4 ? box.max.z : box.min.z).sub(center);
      ex = Math.max(ex, Math.abs(p.dot(right)));
      ey = Math.max(ey, Math.abs(p.dot(up)));
      ez = Math.max(ez, Math.abs(p.dot(back)));
    }
    const tv = Math.tan(THREE.MathUtils.degToRad(camera.fov) / 2);
    const th = tv * camera.aspect;
    const dist = Math.max((ex * margin) / (th * fw), (ey * margin) / (tv * fh)) + ez;
    c.moveTo(center.x, center.y, center.z, animate);
    c.dollyTo(Math.max(0.12, dist), animate);
  };

  const bodyBox = () => {
    const m = model.manifest;
    return new THREE.Box3(new THREE.Vector3(...m.min), new THREE.Vector3(...m.max));
  };

  // Frame the whole body when a model first appears (and on sex switch).
  useEffect(() => {
    const c = ref.current;
    if (!c || fitted.current === model.sex) return;
    const first = fitted.current === null;
    fitted.current = model.sex;
    if (first) c.rotateTo(0, Math.PI / 2, false);
    fit(bodyBox(), c.azimuthAngle, c.polarAngle, 1.04, !first);
  }, [model]);

  useEffect(() => {
    const c = ref.current;
    if (!c || !request) return;
    if (request.kind === "view") {
      const v = request.view ?? "front";
      const [az, pol] = VIEWS[v];
      // take the shortest way round to the requested azimuth
      const cur = c.azimuthAngle;
      const target = cur + (((az - cur + Math.PI) % (2 * Math.PI)) + 2 * Math.PI) % (2 * Math.PI) - Math.PI;
      c.rotateTo(target, pol, true);
      if (v === "reset") fit(bodyBox(), az, pol, 1.04, true);
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
      // keep a little anatomical context around small structures
      const sz = box.getSize(new THREE.Vector3());
      const span = Math.max(sz.x, sz.y, sz.z);
      if (span < 0.14) box.expandByScalar((0.14 - span) / 2);
      fit(box, c.azimuthAngle, c.polarAngle, 1.45, true);
    }
  }, [request]);

  // Shift the projection centre into the free area between panels (eased).
  useFrame((_, dt) => {
    const ins = useExplorer.getState().insets;
    const tx = (ins.left - ins.right) / 2;
    const ty = (ins.top - ins.bottom) / 2;
    const k = 1 - Math.exp(-dt * 8);
    viewShift.x += (tx - viewShift.x) * k;
    viewShift.y += (ty - viewShift.y) * k;
    if (Math.abs(tx - viewShift.x) < 0.5) viewShift.x = tx;
    if (Math.abs(ty - viewShift.y) < 0.5) viewShift.y = ty;
    viewShift.apply(camera, size.width, size.height);
    if (viewShift.x !== tx || viewShift.y !== ty) invalidate();
  }, -1);

  return (
    <CameraControls
      ref={ref}
      makeDefault
      minDistance={0.06}
      maxDistance={6}
      smoothTime={0.3}
      draggingSmoothTime={0.08}
      dollyToCursor
      dollySpeed={0.6}
      truckSpeed={1.6}
      mouseButtons={{ left: ACTION.ROTATE, middle: ACTION.DOLLY, right: ACTION.TRUCK, wheel: ACTION.DOLLY }}
      touches={{ one: ACTION.TOUCH_ROTATE, two: ACTION.TOUCH_DOLLY_TRUCK, three: ACTION.TOUCH_TRUCK }}
    />
  );
}
