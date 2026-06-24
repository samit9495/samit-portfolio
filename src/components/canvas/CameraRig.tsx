import { useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { useStore } from "../../store/useStore";
import { cameraZ } from "./layout";

/** Drives the flythrough: scroll moves the camera down -Z, with a gentle
 *  weave plus mouse parallax, always looking a little further down the path. */
export function CameraRig() {
  const { camera } = useThree();
  const target = useRef(new THREE.Vector3());
  const lookAt = useRef(new THREE.Vector3());

  useFrame((state, delta) => {
    const scroll = useStore.getState().scroll;
    const t = state.clock.elapsedTime;

    const z = cameraZ(scroll);
    const weaveX = Math.sin(scroll * Math.PI * 6) * 1.6;
    const weaveY = Math.cos(scroll * Math.PI * 4) * 0.8;

    target.current.set(
      weaveX + state.pointer.x * 1.4,
      weaveY + state.pointer.y * 0.9 + 0.2,
      z,
    );

    const k = 1 - Math.pow(0.0015, delta);
    camera.position.lerp(target.current, k);

    // look slightly ahead down the corridor, plus a touch of breathing
    lookAt.current.set(
      Math.sin(scroll * Math.PI * 6 + 0.6) * 1.2 + state.pointer.x * 0.6,
      Math.cos(scroll * Math.PI * 4 + 0.4) * 0.5 + Math.sin(t * 0.2) * 0.15,
      z - 9,
    );
    camera.lookAt(lookAt.current);
  });

  return null;
}
