import { Suspense, useEffect, useMemo } from "react";
import * as THREE from "three";
import { Canvas, useThree } from "@react-three/fiber";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";
import type { LoadedModel } from "@/data/model";
import { useExplorer } from "@/state/store";
import { AnatomyModel } from "./AnatomyModel";
import { CameraRig } from "./CameraRig";
import { Connections } from "./Connections";
import { Interaction } from "./Interaction";

function Environment() {
  const gl = useThree((s) => s.gl);
  const scene = useThree((s) => s.scene);
  useEffect(() => {
    const pmrem = new THREE.PMREMGenerator(gl);
    const env = pmrem.fromScene(new RoomEnvironment(), 0.035).texture;
    scene.environment = env;
    scene.environmentIntensity = 0.55;
    return () => {
      env.dispose();
      pmrem.dispose();
    };
  }, [gl, scene]);
  return null;
}

function Lights({ height }: { height: number }) {
  return (
    <>
      <hemisphereLight args={["#dfe9ff", "#2a1d1a", 0.35]} />
      {/* warm key from front-left-above */}
      <directionalLight position={[-1.6, height * 1.6, 2.4]} intensity={2.2} color="#fff1e2" />
      {/* cool fill from the right */}
      <directionalLight position={[2.2, height * 0.8, 1.2]} intensity={0.7} color="#cfe0ff" />
      {/* rim lights from behind to separate silhouettes from the background */}
      <directionalLight position={[1.5, height * 1.2, -2.5]} intensity={1.4} color="#9fd8ff" />
      <directionalLight position={[-1.8, height * 0.6, -2.0]} intensity={0.9} color="#ffd2c2" />
    </>
  );
}

/** Soft glowing disc the figure stands on. */
function Floor() {
  const texture = useMemo(() => {
    const c = document.createElement("canvas");
    c.width = c.height = 256;
    const g = c.getContext("2d")!;
    const grad = g.createRadialGradient(128, 128, 0, 128, 128, 128);
    grad.addColorStop(0, "rgba(0,0,0,0.55)");
    grad.addColorStop(0.35, "rgba(0,0,0,0.25)");
    grad.addColorStop(0.62, "rgba(62,230,200,0.07)");
    grad.addColorStop(0.66, "rgba(62,230,200,0.18)");
    grad.addColorStop(0.7, "rgba(62,230,200,0.04)");
    grad.addColorStop(1, "rgba(0,0,0,0)");
    g.fillStyle = grad;
    g.fillRect(0, 0, 256, 256);
    const t = new THREE.CanvasTexture(c);
    t.colorSpace = THREE.SRGBColorSpace;
    return t;
  }, []);
  return (
    <mesh rotation-x={-Math.PI / 2} position={[0, -0.002, 0]} renderOrder={-1}>
      <planeGeometry args={[1.3, 1.3]} />
      <meshBasicMaterial map={texture} transparent depthWrite={false} />
    </mesh>
  );
}

export function Scene({ model, onHover }: { model: LoadedModel | null; onHover?: (h: { id: string; x: number; y: number } | null) => void }) {
  const quality = useExplorer((s) => s.quality);
  const dpr: [number, number] = quality === "high" ? [1, 2] : [1, 1.25];
  return (
    <Canvas
      frameloop="demand"
      dpr={dpr}
      gl={{ antialias: true, alpha: true, powerPreference: "high-performance", preserveDrawingBuffer: false }}
      camera={{ fov: 32, near: 0.01, far: 30, position: [0, 1, 3.2] }}
      onCreated={({ gl }) => {
        gl.toneMapping = THREE.NeutralToneMapping;
        gl.toneMappingExposure = 1.05;
        gl.setClearColor(0x000000, 0);
      }}
      style={{ touchAction: "none" }}
    >
      <Suspense fallback={null}>
        <Environment />
        {model && (
          <AnatomyModel model={model}>
            <Lights height={model.manifest.height} />
            <Floor />
            <CameraRig model={model} />
            <Interaction onHover={onHover} />
            <Connections />
          </AnatomyModel>
        )}
      </Suspense>
    </Canvas>
  );
}
