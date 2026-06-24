import { useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useStore } from "../../store/useStore";
import { TRAVEL } from "./layout";

const COUNT = 1400;

/** A static dust field spanning the whole journey; the moving camera flying
 *  through it produces the sensation of travel/parallax. */
export function Starfield() {
  const mat = useRef<THREE.PointsMaterial>(null);
  const positions = useMemo(() => {
    const p = new Float32Array(COUNT * 3);
    for (let i = 0; i < COUNT; i++) {
      const radius = 4 + Math.random() * 16;
      const a = Math.random() * Math.PI * 2;
      p[i * 3] = Math.cos(a) * radius;
      p[i * 3 + 1] = Math.sin(a) * radius * 0.7;
      p[i * 3 + 2] = 12 - Math.random() * (TRAVEL + 30);
    }
    return p;
  }, []);

  useFrame(() => {
    if (mat.current) {
      const lvl = useStore.getState().audioLevel;
      mat.current.opacity = 0.5 + lvl * 0.3;
      mat.current.size = 0.05 + lvl * 0.04;
    }
  });

  return (
    <points>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        ref={mat}
        size={0.055}
        color="#9fb4d8"
        transparent
        opacity={0.55}
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        toneMapped={false}
      />
    </points>
  );
}
