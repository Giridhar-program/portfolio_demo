import { useRef, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, AdaptiveDpr, AdaptiveEvents } from '@react-three/drei';
import * as THREE from 'three';

function Polyhedron({ position, geometry, color, speed = 1, scale = 1 }) {
  const meshRef = useRef();
  const materialRef = useRef();

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x += 0.002 * speed;
      meshRef.current.rotation.y += 0.003 * speed;
      meshRef.current.rotation.z += 0.001 * speed;
    }
    if (materialRef.current) {
      materialRef.current.emissiveIntensity = 0.3 + Math.sin(state.clock.elapsedTime * 0.5 + position[0]) * 0.15;
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.3} floatIntensity={0.8}>
      <mesh ref={meshRef} position={position} scale={scale}>
        {geometry}
        <meshStandardMaterial
          ref={materialRef}
          color={color}
          emissive={color}
          emissiveIntensity={0.3}
          metalness={0.7}
          roughness={0.2}
          transparent
          opacity={0.85}
        />
      </mesh>
    </Float>
  );
}

function MouseFollower() {
  const groupRef = useRef();
  const { pointer } = useThree();

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y = THREE.MathUtils.lerp(
        groupRef.current.rotation.y,
        pointer.x * 0.15,
        0.05
      );
      groupRef.current.rotation.x = THREE.MathUtils.lerp(
        groupRef.current.rotation.x,
        -pointer.y * 0.1,
        0.05
      );
    }
  });

  return (
    <group ref={groupRef}>
      <Polyhedron
        position={[-3.5, 1.5, -2]}
        geometry={<icosahedronGeometry args={[1.2, 0]} />}
        color="#00BFFF"
        speed={0.8}
        scale={1}
      />
      <Polyhedron
        position={[3, -1, -3]}
        geometry={<octahedronGeometry args={[1, 0]} />}
        color="#FF006E"
        speed={1.2}
        scale={0.9}
      />
      <Polyhedron
        position={[-1.5, -2, -1.5]}
        geometry={<dodecahedronGeometry args={[0.7, 0]} />}
        color="#00BFFF"
        speed={0.6}
        scale={0.8}
      />
      <Polyhedron
        position={[2, 2.5, -4]}
        geometry={<tetrahedronGeometry args={[0.9, 0]} />}
        color="#FF006E"
        speed={1}
        scale={0.7}
      />
      <Polyhedron
        position={[0.5, -0.5, -2.5]}
        geometry={<icosahedronGeometry args={[0.5, 0]} />}
        color="#8B5CF6"
        speed={1.4}
        scale={0.6}
      />
      <Polyhedron
        position={[-4, -1.5, -3.5]}
        geometry={<octahedronGeometry args={[0.6, 0]} />}
        color="#8B5CF6"
        speed={0.9}
        scale={0.5}
      />
      <Polyhedron
        position={[4.5, 0.5, -5]}
        geometry={<dodecahedronGeometry args={[1.1, 0]} />}
        color="#00BFFF"
        speed={0.5}
        scale={0.65}
      />
    </group>
  );
}

function Particles() {
  const count = 80;
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 16;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 10;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 10 - 3;
    }
    return pos;
  }, []);

  const pointsRef = useRef();

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.elapsedTime * 0.02;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.03}
        color="#00BFFF"
        transparent
        opacity={0.5}
        sizeAttenuation
      />
    </points>
  );
}

export default function HeroScene({ opacity = 1 }) {
  return (
    <div style={{
      position: 'absolute',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      opacity,
      transition: 'opacity 0.3s ease',
    }}>
      <Canvas
        camera={{ position: [0, 0, 6], fov: 55 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.15} />
        <directionalLight position={[5, 5, 5]} intensity={0.6} color="#00BFFF" />
        <directionalLight position={[-5, -3, 3]} intensity={0.4} color="#FF006E" />
        <pointLight position={[0, 0, 4]} intensity={0.3} color="#8B5CF6" />

        <MouseFollower />
        <Particles />

        <AdaptiveDpr pixelated />
        <AdaptiveEvents />
      </Canvas>
    </div>
  );
}
