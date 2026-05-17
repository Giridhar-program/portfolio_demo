import { useRef, useState, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Html, Float, AdaptiveDpr } from '@react-three/drei';
import * as THREE from 'three';
import { skills } from '../../data/projects';

const CATEGORY_COLORS = {
  frontend: '#00BFFF',
  aiml: '#FF006E',
  tools: '#8B5CF6',
};

const CATEGORY_LABELS = {
  frontend: 'Frontend',
  aiml: 'AI / ML',
  tools: 'Tools',
};

function SkillNode({ position, skill, color, onHover }) {
  const meshRef = useRef();
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (meshRef.current) {
      const scale = hovered ? 1.4 : 1;
      meshRef.current.scale.lerp(new THREE.Vector3(scale, scale, scale), 0.1);
      meshRef.current.material.emissiveIntensity = hovered
        ? 0.8
        : 0.3 + Math.sin(state.clock.elapsedTime + position[0]) * 0.1;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.1} floatIntensity={0.4}>
      <mesh
        ref={meshRef}
        position={position}
        onPointerOver={(e) => { e.stopPropagation(); setHovered(true); }}
        onPointerOut={() => setHovered(false)}
      >
        <sphereGeometry args={[0.18, 16, 16]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.3}
          metalness={0.5}
          roughness={0.3}
          transparent
          opacity={0.9}
        />
        {hovered && (
          <Html center distanceFactor={8} style={{ pointerEvents: 'none' }}>
            <div style={{
              background: 'rgba(10, 10, 15, 0.9)',
              backdropFilter: 'blur(8px)',
              border: `1px solid ${color}`,
              borderRadius: '8px',
              padding: '6px 12px',
              color: '#F0F0F5',
              fontSize: '13px',
              fontFamily: "'Space Grotesk', sans-serif",
              fontWeight: 500,
              whiteSpace: 'nowrap',
              boxShadow: `0 0 15px ${color}40`,
            }}>
              {skill.icon} {skill.name}
            </div>
          </Html>
        )}
      </mesh>
    </Float>
  );
}

function ConnectionLine({ start, end, color }) {
  const points = useMemo(() => [
    new THREE.Vector3(...start),
    new THREE.Vector3(...end),
  ], [start, end]);

  const lineGeometry = useMemo(() => {
    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    return geometry;
  }, [points]);

  return (
    <line geometry={lineGeometry}>
      <lineBasicMaterial color={color} transparent opacity={0.1} />
    </line>
  );
}

function ConstellationGroup() {
  const groupRef = useRef();
  const { pointer } = useThree();

  useFrame(() => {
    if (groupRef.current) {
      groupRef.current.rotation.y = THREE.MathUtils.lerp(
        groupRef.current.rotation.y,
        pointer.x * 0.1 + 0.001,
        0.03
      );
      groupRef.current.rotation.x = THREE.MathUtils.lerp(
        groupRef.current.rotation.x,
        -pointer.y * 0.05,
        0.03
      );
    }
  });

  const nodePositions = useMemo(() => {
    const positions = {};

    /* Frontend cluster — left */
    skills.frontend.forEach((skill, i) => {
      const angle = (i / skills.frontend.length) * Math.PI * 2;
      const r = 1.5 + Math.random() * 0.5;
      positions[`frontend-${i}`] = [
        -2.5 + Math.cos(angle) * r,
        Math.sin(angle) * r * 0.7,
        -1 + Math.random() * 0.5,
      ];
    });

    /* AI/ML cluster — right */
    skills.aiml.forEach((skill, i) => {
      const angle = (i / skills.aiml.length) * Math.PI * 2;
      const r = 1.2 + Math.random() * 0.4;
      positions[`aiml-${i}`] = [
        2.5 + Math.cos(angle) * r,
        Math.sin(angle) * r * 0.7,
        -1 + Math.random() * 0.5,
      ];
    });

    /* Tools cluster — bottom center */
    skills.tools.forEach((skill, i) => {
      const angle = (i / skills.tools.length) * Math.PI * 2;
      const r = 1 + Math.random() * 0.3;
      positions[`tools-${i}`] = [
        Math.cos(angle) * r,
        -2.5 + Math.sin(angle) * r * 0.5,
        -0.5 + Math.random() * 0.5,
      ];
    });

    return positions;
  }, []);

  const connections = useMemo(() => {
    const lines = [];
    const categories = ['frontend', 'aiml', 'tools'];
    categories.forEach(cat => {
      const catSkills = skills[cat];
      for (let i = 0; i < catSkills.length; i++) {
        for (let j = i + 1; j < catSkills.length; j++) {
          if (Math.random() > 0.5) {
            lines.push({
              start: nodePositions[`${cat}-${i}`],
              end: nodePositions[`${cat}-${j}`],
              color: CATEGORY_COLORS[cat],
            });
          }
        }
      }
    });
    return lines;
  }, [nodePositions]);

  return (
    <group ref={groupRef}>
      {Object.entries(skills).map(([category, skillList]) =>
        skillList.map((skill, i) => (
          <SkillNode
            key={`${category}-${i}`}
            position={nodePositions[`${category}-${i}`]}
            skill={skill}
            color={CATEGORY_COLORS[category]}
          />
        ))
      )}
      {connections.map((conn, i) => (
        <ConnectionLine key={i} {...conn} />
      ))}
    </group>
  );
}

export default function SkillsConstellation() {
  return (
    <div style={{ width: '100%', height: '500px' }}>
      <Canvas
        camera={{ position: [0, 0, 7], fov: 50 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
        style={{ background: 'transparent' }}
      >
        <ambientLight intensity={0.2} />
        <pointLight position={[-5, 3, 5]} intensity={0.5} color="#00BFFF" />
        <pointLight position={[5, -3, 5]} intensity={0.4} color="#FF006E" />
        <pointLight position={[0, -5, 3]} intensity={0.3} color="#8B5CF6" />

        <ConstellationGroup />
        <AdaptiveDpr pixelated />
      </Canvas>
    </div>
  );
}
