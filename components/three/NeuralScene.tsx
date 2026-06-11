"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useMemo, useRef, useState, useEffect } from "react";
import { scrollState } from "@/lib/scroll";
import { getTheme, subscribeTheme, type Theme } from "@/lib/theme";

const TUNNEL_NEAR = 6;
const TUNNEL_FAR = -100;
const CAMERA_TRAVEL = 88; // total z distance camera moves across the page

// Additive blending glows on dark but washes out to white on a light page —
// the day theme uses darker colors with normal blending instead.
const SCENE_COLORS: Record<
  Theme,
  { palette: string[]; line: string; lineOpacity: number; packet: string; coreWire: string; coreInner: string; fog: string; blending: THREE.Blending }
> = {
  dark: {
    palette: ["#2dd4bf", "#22d3ee", "#7dd3fc", "#c7d2e3"],
    line: "#5eead4",
    lineOpacity: 0.09,
    packet: "#99f6e4",
    coreWire: "#2dd4bf",
    coreInner: "#22d3ee",
    fog: "#060709",
    blending: THREE.AdditiveBlending,
  },
  light: {
    palette: ["#0d9488", "#0e7490", "#0369a1", "#64748b"],
    line: "#0f766e",
    lineOpacity: 0.16,
    packet: "#0d9488",
    coreWire: "#0f766e",
    coreInner: "#0891b2",
    fog: "#f5f7fa",
    blending: THREE.NormalBlending,
  },
};

type Graph = {
  nodeCount: number;
  basePositions: Float32Array;
  positions: Float32Array;
  colors: Float32Array;
  phases: Float32Array;
  edges: [number, number][];
  edgePositions: Float32Array;
};

function buildGraph(nodeCount: number, palette: string[]): Graph {
  const basePositions = new Float32Array(nodeCount * 3);
  const colors = new Float32Array(nodeCount * 3);
  const phases = new Float32Array(nodeCount);
  const paletteColors = palette.map((c) => new THREE.Color(c));
  const rng = (min: number, max: number) => min + Math.random() * (max - min);

  for (let i = 0; i < nodeCount; i++) {
    basePositions[i * 3] = rng(-15, 15);
    basePositions[i * 3 + 1] = rng(-9, 9);
    basePositions[i * 3 + 2] = rng(TUNNEL_FAR, TUNNEL_NEAR);
    const c = paletteColors[Math.floor(Math.random() * paletteColors.length)];
    colors[i * 3] = c.r;
    colors[i * 3 + 1] = c.g;
    colors[i * 3 + 2] = c.b;
    phases[i] = Math.random() * Math.PI * 2;
  }

  // Connect nearby nodes — max 3 edges per node, capped total.
  const edges: [number, number][] = [];
  const edgeCount = new Uint8Array(nodeCount);
  const maxDist = 5.2;
  for (let i = 0; i < nodeCount && edges.length < 420; i++) {
    if (edgeCount[i] >= 3) continue;
    for (let j = i + 1; j < nodeCount; j++) {
      if (edgeCount[i] >= 3) break;
      if (edgeCount[j] >= 3) continue;
      const dx = basePositions[i * 3] - basePositions[j * 3];
      const dy = basePositions[i * 3 + 1] - basePositions[j * 3 + 1];
      const dz = basePositions[i * 3 + 2] - basePositions[j * 3 + 2];
      if (dx * dx + dy * dy + dz * dz < maxDist * maxDist) {
        edges.push([i, j]);
        edgeCount[i]++;
        edgeCount[j]++;
      }
    }
  }

  return {
    nodeCount,
    basePositions,
    positions: new Float32Array(basePositions),
    colors,
    phases,
    edges,
    edgePositions: new Float32Array(edges.length * 6),
  };
}

function NeuralGraph({ graph, animate, theme }: { graph: Graph; animate: boolean; theme: Theme }) {
  const pointsRef = useRef<THREE.Points>(null);
  const linesRef = useRef<THREE.LineSegments>(null);
  const packetsRef = useRef<THREE.Points>(null);
  const colors = SCENE_COLORS[theme];

  // Data packets travel along a subset of edges — "neural pathways".
  const packets = useMemo(() => {
    const count = Math.min(28, graph.edges.length);
    const list: { edge: [number, number]; speed: number; phase: number }[] = [];
    for (let i = 0; i < count; i++) {
      list.push({
        edge: graph.edges[Math.floor((i / count) * graph.edges.length)],
        speed: 0.12 + Math.random() * 0.25,
        phase: Math.random(),
      });
    }
    return { list, positions: new Float32Array(count * 3) };
  }, [graph]);

  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    const { nodeCount, basePositions, positions, phases, edges, edgePositions } = graph;

    if (animate) {
      for (let i = 0; i < nodeCount; i++) {
        const p = phases[i];
        positions[i * 3] = basePositions[i * 3] + Math.sin(t * 0.32 + p) * 0.4;
        positions[i * 3 + 1] = basePositions[i * 3 + 1] + Math.cos(t * 0.27 + p * 1.7) * 0.35;
        positions[i * 3 + 2] = basePositions[i * 3 + 2] + Math.sin(t * 0.2 + p * 0.8) * 0.25;
      }
      if (pointsRef.current) {
        pointsRef.current.geometry.attributes.position.needsUpdate = true;
      }
    }

    for (let e = 0; e < edges.length; e++) {
      const [a, b] = edges[e];
      edgePositions[e * 6] = positions[a * 3];
      edgePositions[e * 6 + 1] = positions[a * 3 + 1];
      edgePositions[e * 6 + 2] = positions[a * 3 + 2];
      edgePositions[e * 6 + 3] = positions[b * 3];
      edgePositions[e * 6 + 4] = positions[b * 3 + 1];
      edgePositions[e * 6 + 5] = positions[b * 3 + 2];
    }
    if (linesRef.current) {
      linesRef.current.geometry.attributes.position.needsUpdate = true;
      const mat = linesRef.current.material as THREE.LineBasicMaterial;
      mat.opacity = colors.lineOpacity + Math.sin(t * 0.6) * 0.025;
    }

    if (animate) {
      const pp = packets.positions;
      for (let i = 0; i < packets.list.length; i++) {
        const { edge, speed, phase } = packets.list[i];
        const k = (t * speed + phase) % 1;
        const [a, b] = edge;
        pp[i * 3] = positions[a * 3] + (positions[b * 3] - positions[a * 3]) * k;
        pp[i * 3 + 1] = positions[a * 3 + 1] + (positions[b * 3 + 1] - positions[a * 3 + 1]) * k;
        pp[i * 3 + 2] = positions[a * 3 + 2] + (positions[b * 3 + 2] - positions[a * 3 + 2]) * k;
      }
      if (packetsRef.current) {
        packetsRef.current.geometry.attributes.position.needsUpdate = true;
      }
    }
  });

  return (
    <group>
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[graph.positions, 3]} />
          <bufferAttribute attach="attributes-color" args={[graph.colors, 3]} />
        </bufferGeometry>
        <pointsMaterial
          size={0.085}
          vertexColors
          transparent
          opacity={0.85}
          sizeAttenuation
          depthWrite={false}
        />
      </points>
      <lineSegments ref={linesRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[graph.edgePositions, 3]} />
        </bufferGeometry>
        <lineBasicMaterial
          color={colors.line}
          transparent
          opacity={colors.lineOpacity}
          blending={colors.blending}
          depthWrite={false}
        />
      </lineSegments>
      <points ref={packetsRef}>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[packets.positions, 3]} />
        </bufferGeometry>
        <pointsMaterial
          size={0.16}
          color={colors.packet}
          transparent
          opacity={0.9}
          sizeAttenuation
          blending={colors.blending}
          depthWrite={false}
        />
      </points>
    </group>
  );
}

// Intelligence core — visible behind the hero, dissolves as the camera travels.
function Core({ animate, theme }: { animate: boolean; theme: Theme }) {
  const groupRef = useRef<THREE.Group>(null);
  const wireRef = useRef<THREE.MeshBasicMaterial>(null);
  const innerRef = useRef<THREE.MeshBasicMaterial>(null);
  const colors = SCENE_COLORS[theme];

  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    const p = scrollState.progress;
    const fade = THREE.MathUtils.clamp(1 - p * 7, 0, 1); // gone by ~14% scroll
    if (groupRef.current) {
      if (animate) {
        groupRef.current.rotation.y = t * 0.12;
        groupRef.current.rotation.x = Math.sin(t * 0.18) * 0.18;
        const s = 1 + Math.sin(t * 1.1) * 0.03;
        groupRef.current.scale.setScalar(s);
      }
      groupRef.current.visible = fade > 0.01;
    }
    if (wireRef.current) wireRef.current.opacity = 0.32 * fade;
    if (innerRef.current) innerRef.current.opacity = 0.1 * fade;
  });

  return (
    <group ref={groupRef} position={[0, 0.2, -6]}>
      <mesh>
        <icosahedronGeometry args={[2.4, 1]} />
        <meshBasicMaterial ref={wireRef} color={colors.coreWire} wireframe transparent opacity={0.32} depthWrite={false} />
      </mesh>
      <mesh>
        <icosahedronGeometry args={[1.5, 2]} />
        <meshBasicMaterial
          ref={innerRef}
          color={colors.coreInner}
          transparent
          opacity={0.1}
          blending={colors.blending}
          depthWrite={false}
        />
      </mesh>
    </group>
  );
}

function CameraRig({ animate }: { animate: boolean }) {
  useFrame(({ camera, pointer, clock }, delta) => {
    const p = scrollState.progress;
    const t = clock.elapsedTime;
    const targetZ = 8 - p * CAMERA_TRAVEL;
    const drift = animate ? Math.sin(t * 0.1) * 0.5 : 0;
    const px = animate ? pointer.x * 1.3 : 0;
    const py = animate ? pointer.y * 0.7 : 0;

    const ease = Math.min(1, delta * 3.2);
    camera.position.z += (targetZ - camera.position.z) * ease;
    camera.position.x += (px + drift - camera.position.x) * Math.min(1, delta * 1.8);
    camera.position.y += (py - camera.position.y) * Math.min(1, delta * 1.8);
    camera.lookAt(camera.position.x * 0.35, camera.position.y * 0.35, camera.position.z - 12);
  });
  return null;
}

export default function NeuralScene() {
  const [config, setConfig] = useState<{ nodes: number; animate: boolean } | null>(null);
  const [theme, setTheme] = useState<Theme>("light");

  useEffect(() => {
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const mobile = window.innerWidth < 768;
    setConfig({ nodes: mobile ? 130 : 230, animate: !reduced });
    setTheme(getTheme());
    return subscribeTheme(setTheme);
  }, []);

  // Vertex colors bake the palette into the geometry, so the graph rebuilds on theme switch.
  const graph = useMemo(
    () => (config ? buildGraph(config.nodes, SCENE_COLORS[theme].palette) : null),
    [config, theme]
  );

  if (!config || !graph) return null;

  return (
    <div className="fixed inset-0 z-0 pointer-events-none" aria-hidden="true">
      <Canvas
        camera={{ fov: 60, near: 0.1, far: 130, position: [0, 0, 8] }}
        dpr={[1, 1.75]}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      >
        <fog attach="fog" args={[SCENE_COLORS[theme].fog, 10, 48]} />
        <CameraRig animate={config.animate} />
        {/* key forces geometry remount so baked vertex colors swap cleanly */}
        <Core key={`core-${theme}`} animate={config.animate} theme={theme} />
        <NeuralGraph key={`graph-${theme}`} graph={graph} animate={config.animate} theme={theme} />
      </Canvas>
      {/* Readability vignette over the scene */}
      <div className="absolute inset-0 vignette" />
    </div>
  );
}
