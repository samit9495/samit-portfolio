import { useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { EffectComposer, Bloom, Vignette } from "@react-three/postprocessing";
import * as THREE from "three";
import { projects } from "../../data/site";
import { useStore } from "../../store/useStore";
import { chapterZ } from "./layout";
import { Chapter } from "./Chapter";
import { Starfield } from "./Starfield";
import { CameraRig } from "./CameraRig";

const BASE = new THREE.Color("#05060b");

/** Lights + fog + background follow the active chapter's accent color. */
function Ambience() {
  const { scene } = useThree();
  const point = useRef<THREE.PointLight>(null);
  const fogColor = useRef(new THREE.Color("#05060b"));
  const accent = useRef(new THREE.Color(projects[0].accent));

  useFrame((state, delta) => {
    const s = useStore.getState();
    const p = projects[Math.max(0, Math.min(projects.length - 1, s.active))];
    const k = 1 - Math.pow(0.02, delta);
    accent.current.lerp(new THREE.Color(p.accent), k);

    // dark, slightly accent-tinted fog/background
    fogColor.current.copy(BASE).lerp(accent.current, 0.06);
    if (scene.fog) (scene.fog as THREE.Fog).color.copy(fogColor.current);
    (scene.background as THREE.Color)?.copy(fogColor.current);

    if (point.current) {
      point.current.color.copy(accent.current);
      point.current.position.copy(state.camera.position);
      point.current.intensity = 18 + s.audioLevel * 25;
    }
  });

  return (
    <>
      <color attach="background" args={["#05060b"]} />
      <fog attach="fog" args={["#05060b", 7, 38]} />
      <ambientLight intensity={0.35} />
      <pointLight ref={point} distance={40} decay={1.4} />
    </>
  );
}

export function Journey() {
  return (
    <>
      <Ambience />
      <CameraRig />
      <Starfield />
      {projects.map((p, i) => (
        <Chapter key={p.id} project={p} z={chapterZ(i)} />
      ))}
      <EffectComposer>
        <Bloom
          intensity={1.15}
          luminanceThreshold={0.12}
          luminanceSmoothing={0.35}
          mipmapBlur
          radius={0.7}
        />
        <Vignette eskil={false} offset={0.25} darkness={0.85} />
      </EffectComposer>
    </>
  );
}
