'use client';

import { useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';
import gsap from 'gsap';

// ── Floating Electric Sparks (EmberParticles colored yellow) ──
function ElectricSparks({ count = 150 }: { count?: number }) {
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const dummy = useMemo(() => new THREE.Object3D(), []);

  const particles = useMemo(() => {
    return Array.from({ length: count }, () => ({
      position: [
        (Math.random() - 0.5) * 35,
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 15,
      ] as [number, number, number],
      speed: Math.random() * 0.6 + 0.3, // Faster speeds for electrical sparks
      scale: Math.random() * 0.04 + 0.015,
      offset: Math.random() * Math.PI * 2,
    }));
  }, [count]);

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    const t = clock.getElapsedTime();

    particles.forEach((p, i) => {
      // Turbulent electrical floating path
      dummy.position.set(
        p.position[0] + Math.sin(t * p.speed + p.offset) * 0.8,
        p.position[1] + ((t * p.speed * 0.8 + p.offset) % 20) - 10,
        p.position[2] + Math.cos(t * p.speed + p.offset) * 0.5
      );
      dummy.scale.setScalar(p.scale);
      dummy.updateMatrix();
      meshRef.current!.setMatrixAt(i, dummy.matrix);
    });

    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh ref={meshRef} args={[undefined, undefined, count]}>
      <sphereGeometry args={[1, 5, 5]} />
      {/* Thunder Neon Yellow Embers */}
      <meshBasicMaterial
        color="#FFEA00"
        transparent
        opacity={0.7}
      />
    </instancedMesh>
  );
}

// ── Lightning Bolts (Thunder Breathing Strikes) ──────────────
function LightningArcs() {
  const [bolt, setBolt] = useState<THREE.Vector3[]>([]);
  const [opacity, setOpacity] = useState(0);
  const flashTimer = useRef(0);
  const nextStrikeTime = useRef(Math.random() * 2 + 1.5); // Strike every 1.5 - 3.5 seconds

  useFrame((state, delta) => {
    flashTimer.current += delta;

    if (flashTimer.current >= nextStrikeTime.current) {
      flashTimer.current = 0;
      nextStrikeTime.current = Math.random() * 3 + 1.5; // Reset interval

      // Generate random crackling lightning bolt path descending down
      const pts: THREE.Vector3[] = [];
      let currentX = (Math.random() - 0.5) * 26;
      let currentY = 10;
      pts.push(new THREE.Vector3(currentX, currentY, -10));

      while (currentY > -7) {
        // Jagged jagged offsets
        currentX += (Math.random() - 0.5) * 4;
        currentY -= Math.random() * 2.2 + 0.4;
        pts.push(new THREE.Vector3(currentX, currentY, -10));
      }
      setBolt(pts);

      // Flickering lightning animation via GSAP timeline
      const tl = gsap.timeline();
      tl.to({}, {
        duration: 0.35,
        onUpdate: function () {
          const prog = this.progress();
          if (prog < 0.1) setOpacity(0.95);
          else if (prog < 0.18) setOpacity(0.05);
          else if (prog < 0.3) setOpacity(0.85);
          else if (prog < 0.42) setOpacity(0.0);
          else if (prog < 0.6) setOpacity(0.7);
          else if (prog < 0.75) setOpacity(0.0);
          else if (prog < 0.9) setOpacity(0.45);
          else setOpacity(0.0);
        },
        onComplete: () => {
          setBolt([]);
        }
      });
    }
  });

  if (bolt.length === 0 || opacity <= 0) return null;

  // Convert points to lines segments
  const segments: THREE.Vector3[] = [];
  for (let i = 0; i < bolt.length - 1; i++) {
    segments.push(bolt[i], bolt[i + 1]);
  }

  const geometry = new THREE.BufferGeometry().setFromPoints(segments);

  return (
    <lineSegments geometry={geometry}>
      <lineBasicMaterial
        color="#FFEA00"
        linewidth={3}
        transparent
        opacity={opacity}
        depthWrite={false}
      />
    </lineSegments>
  );
}

// ── Fog Layers ───────────────────────────────────────────────
function FogLayer({
  y,
  speed,
  opacity,
}: {
  y: number;
  speed: number;
  opacity: number;
}) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame(({ clock }) => {
    if (!meshRef.current) return;
    meshRef.current.position.x = Math.sin(clock.getElapsedTime() * speed) * 2;
    (meshRef.current.material as THREE.MeshBasicMaterial).opacity =
      opacity + Math.sin(clock.getElapsedTime() * speed * 0.5) * 0.05;
  });

  return (
    <mesh ref={meshRef} position={[0, y, -5]} rotation={[-0.1, 0, 0]}>
      <planeGeometry args={[40, 4]} />
      <meshBasicMaterial
        color="#050505"
        transparent
        opacity={opacity}
        side={THREE.DoubleSide}
        depthWrite={false}
      />
    </mesh>
  );
}

// ── Mountain Silhouettes ─────────────────────────────────────
function Mountains() {
  const points = useMemo(() => {
    const pts: THREE.Vector2[] = [];
    const segments = 45;
    for (let i = 0; i <= segments; i++) {
      const x = (i / segments) * 45 - 22.5;
      const y =
        Math.sin(i * 0.55) * 1.8 +
        Math.sin(i * 0.32) * 1.3 +
        Math.cos(i * 0.65) * 0.9;
      pts.push(new THREE.Vector2(x, y));
    }
    pts.push(new THREE.Vector2(22.5, -6));
    pts.push(new THREE.Vector2(-22.5, -6));
    return pts;
  }, []);

  const shape = useMemo(() => {
    const s = new THREE.Shape();
    s.moveTo(points[0].x, points[0].y);
    points.forEach((p) => s.lineTo(p.x, p.y));
    s.closePath();
    return s;
  }, [points]);

  return (
    <mesh position={[0, -5.5, -11]}>
      <shapeGeometry args={[shape]} />
      <meshBasicMaterial color="#050505" />
    </mesh>
  );
}

// ── Glowing Golden/Yellow Moon ─────────────────────────────────
function Moon() {
  return (
    <Float speed={0.4} rotationIntensity={0} floatIntensity={0.25}>
      {/* Moon base */}
      <mesh position={[8, 5.5, -14]}>
        <circleGeometry args={[1.6, 36]} />
        <meshBasicMaterial color="#FFD700" transparent opacity={0.25} />
      </mesh>
      
      {/* Volumetric glowing rays */}
      <mesh position={[8, 1.5, -13.5]} rotation={[0, 0, -0.12]}>
        <planeGeometry args={[3.2, 12]} />
        <meshBasicMaterial
          color="#FFEA00"
          transparent
          opacity={0.035}
          side={THREE.DoubleSide}
          depthWrite={false}
        />
      </mesh>
    </Float>
  );
}

// ── Mouse Parallax Camera ────────────────────────────────────
function CameraRig() {
  const { camera } = useThree();
  const mouse = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouse.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouse.current.y = -(e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  useFrame(() => {
    camera.position.x += (mouse.current.x * 0.6 - camera.position.x) * 0.05;
    camera.position.y += (mouse.current.y * 0.4 - camera.position.y) * 0.05;
    camera.lookAt(0, 0, 0);
  });

  return null;
}

// ── Main Scene ───────────────────────────────────────────────
export default function HeroScene() {
  return (
    <Canvas
      camera={{ position: [0, 0, 10], fov: 50 }}
      dpr={[1, 1.5]}
      gl={{
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance',
      }}
      style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
    >
      {/* Neon/Thunder Ambient and Directional Lighting */}
      <ambientLight intensity={0.2} />
      <directionalLight position={[6, 6, 6]} intensity={0.25} color="#FFEA00" />

      {/* Lightning strikes segments */}
      <LightningArcs />

      {/* Sparkles and electrical particles */}
      <ElectricSparks count={130} />
      
      {/* Fog layers for anime mountain depth */}
      <FogLayer y={-1.8} speed={0.14} opacity={0.07} />
      <FogLayer y={-2.8} speed={0.09} opacity={0.05} />
      <FogLayer y={0.2} speed={0.18} opacity={0.03} />
      
      <Mountains />
      <Moon />
      <CameraRig />

      {/* Scene depth fogging */}
      <fog attach="fog" args={['#050505', 8, 24]} />
    </Canvas>
  );
}
