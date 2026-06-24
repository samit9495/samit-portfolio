import { useLayoutEffect, useMemo, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useStore } from "../../store/useStore";
import type { Project } from "../../data/site";

/** Shared focus/animation: brightens + scales a chapter as the camera nears it. */
function useChapter(zPos: number) {
  const group = useRef<THREE.Group>(null);
  const focus = useRef(0);
  useFrame((state, delta) => {
    const dz = Math.abs(state.camera.position.z - zPos);
    const f = THREE.MathUtils.clamp(1 - dz / 16, 0, 1);
    focus.current += (f - focus.current) * Math.min(1, delta * 4);
    if (group.current) {
      const s = 0.82 + focus.current * 0.2;
      group.current.scale.setScalar(s);
    }
  });
  return { group, focus };
}

const audio = () => useStore.getState().audioLevel;

// ---------- 01 · GitaFlow — sacred geometry / rings ----------
function RingsChapter({ z, accent, glow }: ChapterProps) {
  const { group, focus } = useChapter(z);
  const core = useRef<THREE.Mesh>(null);
  const rings = useMemo(
    () =>
      Array.from({ length: 6 }, (_, i) => ({
        r: 1.3 + i * 0.55,
        rot: [Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI] as [
          number,
          number,
          number,
        ],
        speed: 0.06 + Math.random() * 0.12,
      })),
    [],
  );
  useFrame((_, d) => {
    if (group.current) group.current.rotation.z += d * 0.05;
    if (core.current) {
      const s = 0.6 + focus.current * 0.5 + audio() * 0.4;
      core.current.scale.setScalar(s);
    }
  });
  return (
    <group ref={group} position={[0, 0, z]}>
      <mesh ref={core}>
        <icosahedronGeometry args={[0.7, 1]} />
        <meshBasicMaterial color={glow} toneMapped={false} />
      </mesh>
      {rings.map((r, i) => (
        <mesh key={i} rotation={r.rot}>
          <torusGeometry args={[r.r, 0.02 + i * 0.004, 8, 90]} />
          <meshBasicMaterial color={accent} toneMapped={false} />
        </mesh>
      ))}
      {Array.from({ length: 24 }, (_, i) => {
        const a = (i / 24) * Math.PI * 2;
        return (
          <mesh key={`s${i}`} position={[Math.cos(a) * 3.4, Math.sin(a) * 3.4, 0]} rotation={[0, 0, a]}>
            <boxGeometry args={[0.5, 0.015, 0.015]} />
            <meshBasicMaterial color={accent} toneMapped={false} />
          </mesh>
        );
      })}
    </group>
  );
}

// ---------- 02 · Trulla — schematic data corridor ----------
function GridChapter({ z, accent, glow }: ChapterProps) {
  const { group, focus } = useChapter(z);
  const mesh = useRef<THREE.InstancedMesh>(null);
  const { count, mats } = useMemo(() => {
    const mats: THREE.Matrix4[] = [];
    const dummy = new THREE.Object3D();
    const span = 9;
    for (let zi = 0; zi < 14; zi++) {
      const zz = (zi - 7) * 1.3;
      const ring = [
        [-3.2, -2.4],
        [3.2, -2.4],
        [-3.2, 2.4],
        [3.2, 2.4],
        [-3.2, 0],
        [3.2, 0],
        [0, -2.4],
        [0, 2.4],
      ];
      for (const [x, y] of ring) {
        const h = 0.3 + Math.random() * 1.6;
        dummy.position.set(x + (Math.random() - 0.5) * 0.3, y, zz);
        dummy.scale.set(0.18, h, 0.18);
        dummy.updateMatrix();
        mats.push(dummy.matrix.clone());
      }
    }
    void span;
    return { count: mats.length, mats };
  }, []);
  useLayoutEffect(() => {
    if (!mesh.current) return;
    mats.forEach((m, i) => mesh.current!.setMatrixAt(i, m));
    mesh.current.instanceMatrix.needsUpdate = true;
  }, [mats]);
  const matRef = useRef<THREE.MeshBasicMaterial>(null);
  useFrame((_, d) => {
    if (group.current) group.current.rotation.z += d * 0.02;
    if (matRef.current)
      matRef.current.color.lerp(new THREE.Color(accent).multiplyScalar(0.5 + focus.current), 0.1);
  });
  return (
    <group ref={group} position={[0, 0, z]}>
      <instancedMesh ref={mesh} args={[undefined, undefined, count]}>
        <boxGeometry />
        <meshBasicMaterial ref={matRef} color={accent} toneMapped={false} />
      </instancedMesh>
      {[-1, 1].map((s) => (
        <gridHelper
          key={s}
          args={[18, 18, glow, accent]}
          position={[0, s * 3, 0]}
          rotation={[0, 0, 0]}
        />
      ))}
    </group>
  );
}

// ---------- 03 · LLM Council — multi-agent orbit ----------
function OrbitChapter({ z, accent, glow }: ChapterProps) {
  const { group, focus } = useChapter(z);
  const nodes = useRef<THREE.Group>(null);
  const nodeData = useMemo(
    () =>
      Array.from({ length: 5 }, (_, i) => {
        const a = (i / 5) * Math.PI * 2;
        return { a, r: 3, speed: 0.3 + i * 0.05 };
      }),
    [],
  );
  const linePos = useMemo(() => new Float32Array(nodeData.length * 6), [nodeData.length]);
  const lineRef = useRef<THREE.BufferGeometry>(null);
  useFrame((state, d) => {
    const t = state.clock.elapsedTime;
    if (group.current) group.current.rotation.y += d * 0.1;
    if (nodes.current) {
      nodes.current.children.forEach((c, i) => {
        const nd = nodeData[i];
        const a = nd.a + t * nd.speed;
        const x = Math.cos(a) * nd.r;
        const y = Math.sin(a) * nd.r * 0.6;
        const zz = Math.sin(a * 1.3) * 1.2;
        c.position.set(x, y, zz);
        const s = 0.22 + audio() * 0.25 + focus.current * 0.1;
        c.scale.setScalar(s);
        linePos.set([0, 0, 0, x, y, zz], i * 6);
      });
      if (lineRef.current) lineRef.current.attributes.position.needsUpdate = true;
    }
  });
  return (
    <group ref={group} position={[0, 0, z]}>
      <mesh>
        <icosahedronGeometry args={[0.55, 1]} />
        <meshBasicMaterial color={glow} toneMapped={false} />
      </mesh>
      <lineSegments>
        <bufferGeometry ref={lineRef}>
          <bufferAttribute attach="attributes-position" args={[linePos, 3]} />
        </bufferGeometry>
        <lineBasicMaterial color={accent} transparent opacity={0.5} toneMapped={false} />
      </lineSegments>
      <group ref={nodes}>
        {nodeData.map((_, i) => (
          <mesh key={i}>
            <icosahedronGeometry args={[0.25, 1]} />
            <meshBasicMaterial color={accent} toneMapped={false} />
          </mesh>
        ))}
      </group>
    </group>
  );
}

// ---------- 04 · Agentic SRE — signal waveforms ----------
function WaveChapter({ z, accent, glow }: ChapterProps) {
  const { group, focus } = useChapter(z);
  const ribbons = useMemo(
    () =>
      Array.from({ length: 5 }, (_, i) => ({
        y: (i - 2) * 0.9,
        zo: (i - 2) * 0.5,
        freq: 1.2 + i * 0.4,
        amp: 0.5 + (i % 2) * 0.3,
        noisy: i % 2 === 1,
        pos: new Float32Array(120 * 3),
      })),
    [],
  );
  const geoRefs = useRef<(THREE.BufferGeometry | null)[]>([]);
  useFrame((state) => {
    const t = state.clock.elapsedTime;
    ribbons.forEach((rb) => {
      for (let i = 0; i < 120; i++) {
        const x = (i / 119) * 12 - 6;
        let y = Math.sin(x * rb.freq + t * 2) * rb.amp * (0.6 + audio() * 1.2);
        if (rb.noisy) y += (Math.sin(x * 30 + t * 10) * 0.15) * (0.5 + audio());
        rb.pos.set([x, rb.y + y, rb.zo], i * 3);
      }
    });
    geoRefs.current.forEach((g) => g && (g.attributes.position.needsUpdate = true));
    void focus;
  });
  return (
    <group ref={group} position={[0, 0, z]}>
      {ribbons.map((rb, i) => (
        <line key={i}>
          <bufferGeometry ref={(el) => (geoRefs.current[i] = el)}>
            <bufferAttribute attach="attributes-position" args={[rb.pos, 3]} />
          </bufferGeometry>
          <lineBasicMaterial color={rb.noisy ? glow : accent} toneMapped={false} />
        </line>
      ))}
    </group>
  );
}

// ---------- 05 · HR Comp — data landscape ----------
function BarsChapter({ z, accent, glow }: ChapterProps) {
  const { group, focus } = useChapter(z);
  const mesh = useRef<THREE.InstancedMesh>(null);
  const grid = 14;
  const { count, heights } = useMemo(() => {
    const heights: number[] = [];
    for (let i = 0; i < grid * grid; i++) {
      const gx = (i % grid) - grid / 2;
      const gy = Math.floor(i / grid) - grid / 2;
      heights.push(0.3 + Math.abs(Math.sin(gx * 0.6) * Math.cos(gy * 0.6)) * 2.6);
    }
    return { count: grid * grid, heights };
  }, []);
  useFrame((state) => {
    if (!mesh.current) return;
    const dummy = new THREE.Object3D();
    const t = state.clock.elapsedTime;
    for (let i = 0; i < count; i++) {
      const gx = (i % grid) - grid / 2;
      const gy = Math.floor(i / grid) - grid / 2;
      const h = heights[i] * (0.7 + Math.sin(t + i) * 0.15 + audio() * 0.6 + focus.current * 0.2);
      dummy.position.set(gx * 0.55, h / 2 - 2.5, gy * 0.55);
      dummy.scale.set(0.32, Math.max(0.1, h), 0.32);
      dummy.updateMatrix();
      mesh.current.setMatrixAt(i, dummy.matrix);
    }
    mesh.current.instanceMatrix.needsUpdate = true;
  });
  return (
    <group ref={group} position={[0, 0, z]} rotation={[0.1, 0, 0]}>
      <instancedMesh ref={mesh} args={[undefined, undefined, count]}>
        <boxGeometry />
        <meshStandardMaterial
          color={accent}
          emissive={glow}
          emissiveIntensity={0.6}
          metalness={0.3}
          roughness={0.4}
        />
      </instancedMesh>
    </group>
  );
}

// ---------- 06 · Label by Mahi — floating product cloud ----------
function PanelsChapter({ z, accent, glow }: ChapterProps) {
  const { group, focus } = useChapter(z);
  const panels = useMemo(
    () =>
      Array.from({ length: 22 }, () => ({
        pos: [
          (Math.random() - 0.5) * 8,
          (Math.random() - 0.5) * 6,
          (Math.random() - 0.5) * 6,
        ] as [number, number, number],
        rot: [Math.random() * Math.PI, Math.random() * Math.PI, 0] as [number, number, number],
        size: 0.5 + Math.random() * 0.8,
        ph: Math.random() * Math.PI * 2,
      })),
    [],
  );
  const ref = useRef<THREE.Group>(null);
  useFrame((state, d) => {
    if (group.current) group.current.rotation.y += d * 0.05;
    if (ref.current) {
      const t = state.clock.elapsedTime;
      ref.current.children.forEach((c, i) => {
        c.position.y = panels[i].pos[1] + Math.sin(t + panels[i].ph) * 0.3;
        c.rotation.z += d * 0.1;
      });
    }
    void focus;
  });
  return (
    <group ref={group} position={[0, 0, z]}>
      <group ref={ref}>
        {panels.map((p, i) => (
          <mesh key={i} position={p.pos} rotation={p.rot}>
            <boxGeometry args={[p.size, p.size * 1.3, 0.06]} />
            <meshStandardMaterial
              color={i % 3 === 0 ? glow : accent}
              emissive={accent}
              emissiveIntensity={0.4}
              metalness={0.2}
              roughness={0.5}
            />
          </mesh>
        ))}
      </group>
    </group>
  );
}

// ---------- 07 · Fraud Detection — biometric mesh + scan ----------
function MeshChapter({ z, accent, glow }: ChapterProps) {
  const { group, focus } = useChapter(z);
  const scan = useRef<THREE.Mesh>(null);
  useFrame((state, d) => {
    if (group.current) group.current.rotation.y += d * 0.15;
    if (scan.current) {
      const t = state.clock.elapsedTime;
      scan.current.position.y = Math.sin(t * 1.2) * 3.5;
      const m = scan.current.material as THREE.MeshBasicMaterial;
      m.opacity = 0.3 + Math.abs(Math.sin(t * 1.2)) * 0.4 + audio() * 0.3;
    }
    void focus;
  });
  return (
    <group ref={group} position={[0, 0, z]}>
      <mesh>
        <icosahedronGeometry args={[3.4, 3]} />
        <meshBasicMaterial color={accent} wireframe transparent opacity={0.55} toneMapped={false} />
      </mesh>
      <mesh>
        <icosahedronGeometry args={[1.1, 1]} />
        <meshBasicMaterial color={glow} toneMapped={false} />
      </mesh>
      <mesh ref={scan} rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.2, 3.6, 64]} />
        <meshBasicMaterial color={glow} transparent opacity={0.5} side={THREE.DoubleSide} toneMapped={false} />
      </mesh>
    </group>
  );
}

type ChapterProps = { z: number; accent: string; glow: string };

const RENDERERS = [
  RingsChapter,
  GridChapter,
  OrbitChapter,
  WaveChapter,
  BarsChapter,
  PanelsChapter,
  MeshChapter,
];

export function Chapter({ project, z }: { project: Project; z: number }) {
  const R = RENDERERS[project.mood] ?? RingsChapter;
  return <R z={z} accent={project.accent} glow={project.glow} />;
}
