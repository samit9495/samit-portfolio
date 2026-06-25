import { useEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";
import * as THREE from "three";
import { useStore } from "../../store/useStore";

// Khronos "DamagedHelmet" (CC-BY, attribution: ctxwing / Khronos glTF Sample Assets).
// Optimized locally with gltf-transform (quantized geometry + WebP textures, 1024px):
// 3.77MB -> 796KB. Quantization is three.js-native (KHR_mesh_quantization) so there's
// no Draco/meshopt decoder or CDN dependency. Served as a static asset, lazy-loaded.
const HELMET_URL = `${import.meta.env.BASE_URL}models/DamagedHelmet.glb`;

/**
 * A premium PBR centerpiece. We keep the helmet's original materials so the scene
 * <Environment> HDRI lights it with real reflections, and only nudge envMapIntensity
 * + a faint accent rim so it reads as part of the neon journey rather than a stock prop.
 */
export function HeroModel({
  accent,
  glow,
  focus,
}: {
  accent: string;
  glow: string;
  focus?: React.MutableRefObject<number>;
}) {
  const { scene } = useGLTF(HELMET_URL);
  const ref = useRef<THREE.Group>(null);

  const model = useMemo(() => {
    const clone = scene.clone(true);
    clone.traverse((o) => {
      const mesh = o as THREE.Mesh;
      if (!mesh.isMesh) return;
      mesh.castShadow = false;
      mesh.receiveShadow = false;
      const mat = mesh.material as THREE.MeshStandardMaterial;
      if (mat && mat.isMeshStandardMaterial) {
        const m = mat.clone();
        m.envMapIntensity = 1.35;
        // subtle palette tie-in on top of the helmet's own emissive map
        m.emissive = new THREE.Color(glow);
        m.emissiveIntensity = 0.18;
        mesh.material = m;
      }
    });
    return clone;
  }, [scene, glow, accent]);

  useFrame((_, d) => {
    if (!ref.current) return;
    ref.current.rotation.y += d * 0.3;
    const lvl = useStore.getState().audioLevel;
    const s = 0.85 + (focus?.current ?? 0) * 0.18 + lvl * 0.15;
    ref.current.scale.setScalar(s);
  });

  // face the camera (which looks down -Z toward each chapter)
  return (
    <group ref={ref} rotation={[Math.PI / 2, 0, Math.PI]}>
      <primitive object={model} />
    </group>
  );
}

useGLTF.preload(HELMET_URL);
