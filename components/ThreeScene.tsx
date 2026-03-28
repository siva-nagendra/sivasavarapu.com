"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

const NEAR_NODE_COUNT = 56;
const FAR_NODE_COUNT = 92;
const NEAR_CONNECTION_DISTANCE = 0.42;
const FAR_CONNECTION_DISTANCE = 0.28;
const FIELD_SIZE = 4.8;
const SHOOTING_STAR_COUNT = 1;

type ShootingStar = {
  group: THREE.Group;
  trail: THREE.Line;
  glowTrail: THREE.Line;
  head: THREE.Points;
  halo: THREE.Points;
  trailMaterial: THREE.LineBasicMaterial;
  glowMaterial: THREE.LineBasicMaterial;
  headMaterial: THREE.PointsMaterial;
  haloMaterial: THREE.PointsMaterial;
  velocityX: number;
  velocityY: number;
  gravityY: number;
  distance: number;
  maxDistance: number;
  twinkle: number;
  depthFactor: number;
  active: boolean;
  spawnAt: number;
  reset: (initial?: boolean, now?: number) => void;
};

type OrbitLoop = {
  group: THREE.Group;
  lineMaterial: THREE.LineBasicMaterial;
  dotMaterial: THREE.PointsMaterial;
  phase: number;
  speed: number;
  radiusX: number;
  radiusY: number;
  offsetX: number;
  offsetY: number;
  depth: number;
  dots: THREE.Points;
};

type NeuralGraph = {
  group: THREE.Group;
  lineMaterials: THREE.LineBasicMaterial[];
  inputMaterial: THREE.PointsMaterial;
  hiddenMaterial: THREE.PointsMaterial;
  outputMaterial: THREE.PointsMaterial;
  phase: number;
  speed: number;
  buildSpeed: number;
  driftX: number;
  driftY: number;
  offsetX: number;
  offsetY: number;
  depth: number;
  depthFactor: number;
  inputPoints: THREE.Points;
  hiddenPoints: THREE.Points;
  outputPoints: THREE.Points;
  resources: (THREE.BufferGeometry | THREE.Material)[];
};

function createNodePositions(count: number, size: number, depthBias = 0) {
  const positions: THREE.Vector3[] = [];
  const buffer = new Float32Array(count * 3);

  for (let index = 0; index < count; index += 1) {
    const point = new THREE.Vector3(
      (Math.random() - 0.5) * size,
      (Math.random() - 0.5) * size * 0.88,
      (Math.random() - 0.5) * size * 0.55 + depthBias
    );
    positions.push(point);
    buffer[index * 3] = point.x;
    buffer[index * 3 + 1] = point.y;
    buffer[index * 3 + 2] = point.z;
  }

  return { positions, buffer };
}

function createEdgeBuffer(points: THREE.Vector3[], maxDistance: number) {
  const positions: number[] = [];

  for (let i = 0; i < points.length; i += 1) {
    for (let j = i + 1; j < points.length; j += 1) {
      if (points[i].distanceTo(points[j]) < maxDistance) {
        positions.push(
          points[i].x, points[i].y, points[i].z,
          points[j].x, points[j].y, points[j].z
        );
      }
    }
  }

  return new Float32Array(positions);
}

function createEllipsePoints(radiusX: number, radiusY: number, segments = 72) {
  const points: THREE.Vector3[] = [];

  for (let index = 0; index <= segments; index += 1) {
    const angle = (index / segments) * Math.PI * 2;
    points.push(new THREE.Vector3(
      Math.cos(angle) * radiusX,
      Math.sin(angle) * radiusY,
      0
    ));
  }

  return points;
}

function pulseAt(progress: number, center: number, width: number) {
  const delta = (progress - center) / width;
  return Math.exp(-(delta * delta));
}

function createOrbitLoop(
  scene: THREE.Scene,
  color: number,
  radiusX: number,
  radiusY: number,
  position: THREE.Vector3,
  rotation: THREE.Euler,
  dotSize: number,
  opacity: number
) {
  const group = new THREE.Group();
  group.position.copy(position);
  group.rotation.copy(rotation);

  const loopPoints = createEllipsePoints(radiusX, radiusY);
  const lineGeometry = new THREE.BufferGeometry().setFromPoints(loopPoints);
  const lineMaterial = new THREE.LineBasicMaterial({
    color,
    transparent: true,
    opacity,
    depthWrite: false,
  });
  const loopLine = new THREE.Line(lineGeometry, lineMaterial);
  group.add(loopLine);

  const dotGeometry = new THREE.BufferGeometry();
  dotGeometry.setAttribute("position", new THREE.BufferAttribute(new Float32Array(9), 3));
  const dotMaterial = new THREE.PointsMaterial({
    color,
    size: dotSize,
    transparent: true,
    opacity: opacity * 1.65,
    sizeAttenuation: true,
    depthWrite: false,
  });
  const dots = new THREE.Points(dotGeometry, dotMaterial);
  group.add(dots);

  scene.add(group);

  return {
    group,
    lineMaterial,
    dotMaterial,
    phase: Math.random() * Math.PI * 2,
    speed: 0.14 + Math.random() * 0.12,
    radiusX,
    radiusY,
    offsetX: position.x,
    offsetY: position.y,
    depth: position.z,
    dots,
  } satisfies OrbitLoop;
}

function createLayerPoints(x: number, count: number, span = 0.88) {
  const points: THREE.Vector3[] = [];
  const step = count > 1 ? span / (count - 1) : 0;
  const startY = -span / 2;

  for (let index = 0; index < count; index += 1) {
    points.push(new THREE.Vector3(x, startY + step * index, 0));
  }

  return points;
}

function pointsToBuffer(points: THREE.Vector3[]) {
  const buffer = new Float32Array(points.length * 3);

  points.forEach((point, index) => {
    buffer[index * 3] = point.x;
    buffer[index * 3 + 1] = point.y;
    buffer[index * 3 + 2] = point.z;
  });

  return buffer;
}

function createNeuralGraph(
  scene: THREE.Scene,
  position: THREE.Vector3,
  scale: number,
  depthFactor: number
) {
  const group = new THREE.Group();
  group.position.copy(position);
  group.scale.setScalar(scale);
  group.rotation.z = (Math.random() - 0.5) * 0.16;

  const inputCount = 2 + Math.floor(Math.random() * 3);
  const hiddenLayerCount = 1 + Math.floor(Math.random() * 2);
  const outputCount = 1 + Math.floor(Math.random() * 3);
  const layerCounts = [
    inputCount,
    ...Array.from({ length: hiddenLayerCount }, () => 3 + Math.floor(Math.random() * 3)),
    outputCount,
  ];
  const layerStep = hiddenLayerCount === 2 ? 0.62 : 0.78;
  const startX = -layerStep * (layerCounts.length - 1) * 0.5;

  const layers = layerCounts.map((count, layerIndex) =>
    createLayerPoints(startX + layerIndex * layerStep, count, 0.92 - layerIndex * 0.06)
  );

  const lineMaterials: THREE.LineBasicMaterial[] = [];
  const resources: (THREE.BufferGeometry | THREE.Material)[] = [];

  for (let layerIndex = 0; layerIndex < layers.length - 1; layerIndex += 1) {
    const linePositions: number[] = [];

    layers[layerIndex].forEach((source) => {
      layers[layerIndex + 1].forEach((target) => {
        linePositions.push(
          source.x, source.y, source.z,
          target.x, target.y, target.z
        );
      });
    });

    const lineGeometry = new THREE.BufferGeometry();
    lineGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(new Float32Array(linePositions), 3)
    );
    const lineMaterial = new THREE.LineBasicMaterial({
      color: 0xe6edf8,
      transparent: true,
      opacity: THREE.MathUtils.lerp(0.028, 0.065, depthFactor),
      depthWrite: false,
    });
    const lines = new THREE.LineSegments(lineGeometry, lineMaterial);
    group.add(lines);
    lineMaterials.push(lineMaterial);
    resources.push(lineGeometry, lineMaterial);
  }

  const inputGeometry = new THREE.BufferGeometry();
  inputGeometry.setAttribute("position", new THREE.BufferAttribute(pointsToBuffer(layers[0]), 3));
  const inputMaterial = new THREE.PointsMaterial({
    color: 0x4c97ff,
    size: THREE.MathUtils.lerp(0.026, 0.04, depthFactor),
    transparent: true,
    opacity: THREE.MathUtils.lerp(0.2, 0.42, depthFactor),
    sizeAttenuation: true,
    depthWrite: false,
  });
  const inputPoints = new THREE.Points(inputGeometry, inputMaterial);
  group.add(inputPoints);
  resources.push(inputGeometry, inputMaterial);

  const hiddenNodes = layers.slice(1, -1).flat();
  const hiddenGeometry = new THREE.BufferGeometry();
  hiddenGeometry.setAttribute("position", new THREE.BufferAttribute(pointsToBuffer(hiddenNodes), 3));
  const hiddenMaterial = new THREE.PointsMaterial({
    color: 0xf6c56e,
    size: THREE.MathUtils.lerp(0.024, 0.036, depthFactor),
    transparent: true,
    opacity: THREE.MathUtils.lerp(0.18, 0.38, depthFactor),
    sizeAttenuation: true,
    depthWrite: false,
  });
  const hiddenPoints = new THREE.Points(hiddenGeometry, hiddenMaterial);
  group.add(hiddenPoints);
  resources.push(hiddenGeometry, hiddenMaterial);

  const outputGeometry = new THREE.BufferGeometry();
  outputGeometry.setAttribute(
    "position",
    new THREE.BufferAttribute(pointsToBuffer(layers[layers.length - 1]), 3)
  );
  const outputMaterial = new THREE.PointsMaterial({
    color: 0x2ed864,
    size: THREE.MathUtils.lerp(0.026, 0.04, depthFactor),
    transparent: true,
    opacity: THREE.MathUtils.lerp(0.2, 0.44, depthFactor),
    sizeAttenuation: true,
    depthWrite: false,
  });
  const outputPoints = new THREE.Points(outputGeometry, outputMaterial);
  group.add(outputPoints);
  resources.push(outputGeometry, outputMaterial);

  scene.add(group);

  return {
    group,
    lineMaterials,
    inputMaterial,
    hiddenMaterial,
    outputMaterial,
    phase: Math.random() * Math.PI * 2,
    speed: 0.22 + Math.random() * 0.18,
    buildSpeed: 0.11 + Math.random() * 0.08,
    driftX: 0.018 + Math.random() * 0.018,
    driftY: 0.014 + Math.random() * 0.016,
    offsetX: position.x,
    offsetY: position.y,
    depth: position.z,
    depthFactor,
    inputPoints,
    hiddenPoints,
    outputPoints,
    resources,
  } satisfies NeuralGraph;
}

function createShootingStar(scene: THREE.Scene, color: number, opacity: number) {
  const trailGeometry = new THREE.BufferGeometry();
  trailGeometry.setAttribute("position", new THREE.BufferAttribute(new Float32Array([
    0, 0, 0,
    0.62, 0, 0,
  ]), 3));

  const trailMaterial = new THREE.LineBasicMaterial({
    color,
    transparent: true,
    opacity,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  });
  const trail = new THREE.Line(trailGeometry, trailMaterial);

  const glowGeometry = trailGeometry.clone();
  const glowMaterial = new THREE.LineBasicMaterial({
    color,
    transparent: true,
    opacity: opacity * 0.85,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  });
  const glowTrail = new THREE.Line(glowGeometry, glowMaterial);
  glowTrail.scale.set(1.22, 1.22, 1);

  const headGeometry = new THREE.BufferGeometry();
  headGeometry.setAttribute("position", new THREE.BufferAttribute(new Float32Array([0, 0, 0]), 3));
  const headMaterial = new THREE.PointsMaterial({
    color: 0xe9fbff,
    size: 0.066,
    transparent: true,
    opacity: 0.95,
    sizeAttenuation: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  });
  const head = new THREE.Points(headGeometry, headMaterial);

  const haloGeometry = new THREE.BufferGeometry();
  haloGeometry.setAttribute("position", new THREE.BufferAttribute(new Float32Array([0, 0, 0]), 3));
  const haloMaterial = new THREE.PointsMaterial({
    color,
    size: 0.14,
    transparent: true,
    opacity: opacity * 0.8,
    sizeAttenuation: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  });
  const halo = new THREE.Points(haloGeometry, haloMaterial);

  const group = new THREE.Group();
  group.add(glowTrail);
  group.add(trail);
  group.add(halo);
  group.add(head);
  scene.add(group);

  const star: ShootingStar = {
    group,
    trail,
    glowTrail,
    head,
    halo,
    trailMaterial,
    glowMaterial,
    headMaterial,
    haloMaterial,
    velocityX: 0,
    velocityY: 0,
    gravityY: 0,
    distance: 0,
    maxDistance: 0,
    twinkle: Math.random() * Math.PI * 2,
    depthFactor: 1,
    active: true,
    spawnAt: 0,
    reset(initial = false, now = 0) {
      const boundsX = 3.95;
      const boundsY = 3.2;
      const side = Math.floor(Math.random() * 2);
      const start = new THREE.Vector2();
      const direction = new THREE.Vector2();
      const baseSpeed = 0.0044 + Math.random() * 0.0018;

      this.depthFactor = 0.56 + Math.random() * 0.44;

      if (side === 0) {
        start.set(boundsX + Math.random() * 0.45, -0.2 + Math.random() * 1.95);
        direction.set(-1, -0.015 - Math.random() * 0.1);
      } else if (side === 1) {
        start.set(-boundsX - Math.random() * 0.45, -0.2 + Math.random() * 1.95);
        direction.set(1, -0.015 - Math.random() * 0.1);
      }

      direction.normalize();
      this.velocityX = direction.x * baseSpeed * this.depthFactor;
      this.velocityY = direction.y * baseSpeed * this.depthFactor;
      this.gravityY = -(0.000005 + Math.random() * 0.000007) * this.depthFactor;
      this.distance = 0;
      this.maxDistance = 4.2 + Math.random() * 1.4;
      this.twinkle = Math.random() * Math.PI * 2;

      group.position.set(
        start.x,
        start.y,
        THREE.MathUtils.lerp(-1.3, -0.22, (this.depthFactor - 0.56) / 0.44)
      );
      group.rotation.z = Math.atan2(-this.velocityY, -this.velocityX);
      this.active = initial;
      this.spawnAt = initial ? 0 : now + 1.2 + Math.random() * 1.4;
      group.visible = initial;
    },
  };

  star.reset(true);
  return {
    star,
    geometries: [trailGeometry, glowGeometry, headGeometry, haloGeometry],
    materials: [trailMaterial, glowMaterial, headMaterial, haloMaterial],
  };
}

export default function ThreeScene() {
  const mountRef = useRef<HTMLDivElement>(null);
  const mouseRef = useRef({ x: 0, y: 0 });
  const scrollRef = useRef(0);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    // Renderer - bail silently if WebGL is unavailable (e.g. headless CI)
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    } catch {
      return;
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);

    // Scene + camera
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      60,
      mount.clientWidth / mount.clientHeight,
      0.1,
      100
    );
    camera.position.z = 4;

    const nearNodesData = createNodePositions(NEAR_NODE_COUNT, FIELD_SIZE, 0.16);
    const farNodesData = createNodePositions(FAR_NODE_COUNT, FIELD_SIZE * 1.28, -0.55);

    const nearNodeGeom = new THREE.BufferGeometry();
    nearNodeGeom.setAttribute("position", new THREE.BufferAttribute(nearNodesData.buffer, 3));
    const nearNodeMat = new THREE.PointsMaterial({
      color: 0x75d5ff,
      size: 0.0185,
      transparent: true,
      opacity: 0.26,
      sizeAttenuation: true,
      depthWrite: false,
    });
    const nearNodes = new THREE.Points(nearNodeGeom, nearNodeMat);

    const farNodeGeom = new THREE.BufferGeometry();
    farNodeGeom.setAttribute("position", new THREE.BufferAttribute(farNodesData.buffer, 3));
    const farNodeMat = new THREE.PointsMaterial({
      color: 0xb9ccff,
      size: 0.012,
      transparent: true,
      opacity: 0.11,
      sizeAttenuation: true,
      depthWrite: false,
    });
    const farNodes = new THREE.Points(farNodeGeom, farNodeMat);

    const nearEdgeGeom = new THREE.BufferGeometry();
    nearEdgeGeom.setAttribute(
      "position",
      new THREE.BufferAttribute(createEdgeBuffer(nearNodesData.positions, NEAR_CONNECTION_DISTANCE), 3)
    );
    const nearEdgeMat = new THREE.LineBasicMaterial({
      color: 0x75d5ff,
      transparent: true,
      opacity: 0.07,
      depthWrite: false,
    });
    const nearEdges = new THREE.LineSegments(nearEdgeGeom, nearEdgeMat);

    const farEdgeGeom = new THREE.BufferGeometry();
    farEdgeGeom.setAttribute(
      "position",
      new THREE.BufferAttribute(createEdgeBuffer(farNodesData.positions, FAR_CONNECTION_DISTANCE), 3)
    );
    const farEdgeMat = new THREE.LineBasicMaterial({
      color: 0xf6c56e,
      transparent: true,
      opacity: 0.026,
      depthWrite: false,
    });
    const farEdges = new THREE.LineSegments(farEdgeGeom, farEdgeMat);

    const nearGroup = new THREE.Group();
    nearGroup.add(nearNodes);
    nearGroup.add(nearEdges);
    scene.add(nearGroup);

    const farGroup = new THREE.Group();
    farGroup.add(farNodes);
    farGroup.add(farEdges);
    farGroup.position.z = -0.7;
    scene.add(farGroup);

    const orbitLoops: OrbitLoop[] = [
      createOrbitLoop(
        scene,
        0x75d5ff,
        0.54,
        0.19,
        new THREE.Vector3(-1.15, 1.22, -0.2),
        new THREE.Euler(0.16, -0.32, 0.22),
        0.04,
        0.14
      ),
      createOrbitLoop(
        scene,
        0xf6c56e,
        0.42,
        0.14,
        new THREE.Vector3(1.36, 0.72, -0.62),
        new THREE.Euler(-0.08, 0.34, -0.26),
        0.032,
        0.09
      ),
      createOrbitLoop(
        scene,
        0xb58cff,
        0.36,
        0.11,
        new THREE.Vector3(0.36, -1.15, -0.92),
        new THREE.Euler(0.12, 0.18, 0.14),
        0.028,
        0.075
      ),
    ];

    const neuralGraphSeeds = [
      { x: -1.92, y: 0.42, z: -0.96, scale: 0.32, depth: 0.62 },
      { x: 1.74, y: -0.62, z: -0.72, scale: 0.38, depth: 0.78 },
      { x: 0.18, y: 1.46, z: -1.18, scale: 0.24, depth: 0.54 },
    ];
    const neuralGraphs: NeuralGraph[] = neuralGraphSeeds.map((seed) =>
      createNeuralGraph(
        scene,
        new THREE.Vector3(
          seed.x + (Math.random() - 0.5) * 0.38,
          seed.y + (Math.random() - 0.5) * 0.32,
          seed.z + (Math.random() - 0.5) * 0.1
        ),
        seed.scale * (0.92 + Math.random() * 0.14),
        THREE.MathUtils.clamp(seed.depth + (Math.random() - 0.5) * 0.14, 0.46, 0.86)
      )
    );

    const shootingStars = Array.from({ length: SHOOTING_STAR_COUNT }, (_, index) =>
      createShootingStar(scene, index % 2 === 0 ? 0x75d5ff : 0xf6c56e, 0.07 - index * 0.01)
    );

    const onMouseMove = (e: MouseEvent) => {
      mouseRef.current.x = (e.clientX / window.innerWidth - 0.5) * 2;
      mouseRef.current.y = -(e.clientY / window.innerHeight - 0.5) * 2;
    };
    const onScroll = () => {
      scrollRef.current = window.scrollY;
    };
    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("scroll", onScroll, { passive: true });

    const onResize = () => {
      if (!mount) return;
      camera.aspect = mount.clientWidth / mount.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(mount.clientWidth, mount.clientHeight);
    };
    window.addEventListener("resize", onResize);

    let frameId: number;
    const timer = new THREE.Timer();
    let sceneIntensity = 1;
    const animate = () => {
      frameId = requestAnimationFrame(animate);
      timer.update();
      const t = timer.getElapsed();

      const viewportHeight = window.innerHeight || 1;
      const heroBlend = THREE.MathUtils.clamp(1 - scrollRef.current / (viewportHeight * 1.45), 0, 1);
      const targetIntensity = THREE.MathUtils.lerp(0.32, 1, heroBlend);
      sceneIntensity += (targetIntensity - sceneIntensity) * 0.035;

      nearNodeMat.opacity = THREE.MathUtils.lerp(0.07, 0.24, sceneIntensity);
      nearEdgeMat.opacity = THREE.MathUtils.lerp(0.015, 0.07, sceneIntensity);
      farNodeMat.opacity = THREE.MathUtils.lerp(0.035, 0.11, sceneIntensity);
      farEdgeMat.opacity = THREE.MathUtils.lerp(0.008, 0.026, sceneIntensity);

      nearGroup.rotation.y = t * 0.018 + mouseRef.current.x * (0.025 + heroBlend * 0.075);
      nearGroup.rotation.x = mouseRef.current.y * (0.017 + heroBlend * 0.045);
      nearGroup.position.x = mouseRef.current.x * (0.03 + heroBlend * 0.12);
      nearGroup.position.y = mouseRef.current.y * (0.024 + heroBlend * 0.085);

      farGroup.rotation.y = -t * 0.01 + mouseRef.current.x * (0.012 + heroBlend * 0.026);
      farGroup.rotation.x = mouseRef.current.y * (0.008 + heroBlend * 0.016);
      farGroup.position.x = mouseRef.current.x * 0.05;
      farGroup.position.y = mouseRef.current.y * 0.035;
      farGroup.position.z = -0.7 + Math.sin(t * 0.18) * 0.05;

      orbitLoops.forEach((loop, loopIndex) => {
        const phase = loop.phase + t * loop.speed;
        const floatX = mouseRef.current.x * (0.04 + loopIndex * 0.012) + Math.sin(t * (0.35 + loopIndex * 0.08)) * 0.04;
        const floatY = mouseRef.current.y * (0.028 + loopIndex * 0.008) + Math.cos(t * (0.28 + loopIndex * 0.06)) * 0.03;

        loop.group.position.x = loop.offsetX + floatX;
        loop.group.position.y = loop.offsetY + floatY;
        loop.group.position.z = loop.depth + Math.sin(t * (0.22 + loopIndex * 0.07)) * 0.05;
        loop.group.rotation.y = mouseRef.current.x * (0.12 + loopIndex * 0.03);
        loop.group.rotation.x = mouseRef.current.y * (0.08 + loopIndex * 0.02);
        loop.lineMaterial.opacity = THREE.MathUtils.lerp(0.025, 0.14 - loopIndex * 0.02, sceneIntensity);
        loop.dotMaterial.opacity = THREE.MathUtils.lerp(0.05, 0.24 - loopIndex * 0.03, sceneIntensity);

        const positions = loop.dots.geometry.getAttribute("position") as THREE.BufferAttribute;
        for (let dotIndex = 0; dotIndex < 3; dotIndex += 1) {
          const angle = phase + (Math.PI * 2 * dotIndex) / 3;
          positions.setXYZ(
            dotIndex,
            Math.cos(angle) * loop.radiusX,
            Math.sin(angle) * loop.radiusY,
            Math.sin(angle * 2.4) * 0.05
          );
        }
        positions.needsUpdate = true;
      });

      neuralGraphs.forEach((graph, graphIndex) => {
        const phase = graph.phase + t * graph.speed;
        const buildProgress = (t * graph.buildSpeed + graph.phase / (Math.PI * 2)) % 1;
        const depthWeight = THREE.MathUtils.lerp(0.35, 1, graph.depthFactor);

        graph.group.position.x =
          graph.offsetX +
          Math.sin(phase * 0.72 + graphIndex) * graph.driftX +
          mouseRef.current.x * 0.03 * depthWeight;
        graph.group.position.y =
          graph.offsetY +
          Math.cos(phase * 0.68 + graphIndex * 0.7) * graph.driftY +
          mouseRef.current.y * 0.02 * depthWeight;
        graph.group.position.z =
          graph.depth + Math.sin(phase * 0.46 + graphIndex) * 0.04;
        graph.group.rotation.y = mouseRef.current.x * 0.06 * depthWeight;
        graph.group.rotation.x = mouseRef.current.y * 0.045 * depthWeight;

        const ambientPulse = 0.82 + Math.sin(phase * 2.3) * 0.18;
        const lineBase =
          THREE.MathUtils.lerp(0.012, 0.04, sceneIntensity) *
          THREE.MathUtils.lerp(0.5, 1, graph.depthFactor);

        graph.lineMaterials.forEach((lineMaterial, lineIndex) => {
          const center =
            graph.lineMaterials.length === 1
              ? 0.52
              : THREE.MathUtils.lerp(0.32, 0.72, lineIndex / (graph.lineMaterials.length - 1));
          const buildPulse = pulseAt(buildProgress, center, 0.14);
          lineMaterial.opacity = lineBase * ambientPulse * (0.5 + buildPulse * 1.15);
        });

        const inputBuild = pulseAt(buildProgress, 0.16, 0.11);
        const hiddenBuild = pulseAt(buildProgress, 0.5, 0.16);
        const outputBuild = pulseAt(buildProgress, 0.84, 0.11);

        graph.inputMaterial.opacity =
          THREE.MathUtils.lerp(0.08, 0.24, sceneIntensity) *
          THREE.MathUtils.lerp(0.58, 1, graph.depthFactor) *
          (0.72 + inputBuild * 0.95);
        graph.hiddenMaterial.opacity =
          THREE.MathUtils.lerp(0.07, 0.2, sceneIntensity) *
          THREE.MathUtils.lerp(0.52, 1, graph.depthFactor) *
          (0.64 + hiddenBuild * 1.05);
        graph.outputMaterial.opacity =
          THREE.MathUtils.lerp(0.08, 0.26, sceneIntensity) *
          THREE.MathUtils.lerp(0.56, 1, graph.depthFactor) *
          (0.72 + outputBuild * 0.95);
      });

      shootingStars.forEach(({ star }, index) => {
        if (!star.active) {
          if (t >= star.spawnAt) {
            star.active = true;
            star.group.visible = true;
          } else {
            return;
          }
        }

        const movementScale = 0.78 + heroBlend * 0.28;
        star.velocityY += star.gravityY * movementScale;
        star.group.position.x += star.velocityX * movementScale;
        star.group.position.y += star.velocityY * movementScale;
        star.distance += Math.hypot(star.velocityX, star.velocityY) * movementScale;
        star.group.rotation.z = Math.atan2(-star.velocityY, -star.velocityX);

        const pulse = 0.84 + Math.sin(t * (4.8 + index * 0.35) + star.twinkle) * 0.16;
        const progress = THREE.MathUtils.clamp(star.distance / star.maxDistance, 0, 1);
        const edgeFade = THREE.MathUtils.clamp(1 - (progress - 0.72) / 0.28, 0, 1);
        const depthOpacity = THREE.MathUtils.lerp(0.42, 1, star.depthFactor);
        const headSize = THREE.MathUtils.lerp(0.021, 0.036, sceneIntensity) * star.depthFactor;
        const haloSize = THREE.MathUtils.lerp(0.048, 0.08, sceneIntensity) * star.depthFactor;

        star.trailMaterial.opacity =
          THREE.MathUtils.lerp(0.02, 0.095, sceneIntensity) * pulse * edgeFade * depthOpacity;
        star.glowMaterial.opacity =
          THREE.MathUtils.lerp(0.03, 0.12, sceneIntensity) * pulse * edgeFade * depthOpacity;
        star.headMaterial.opacity =
          THREE.MathUtils.lerp(0.14, 0.58, sceneIntensity) * pulse * edgeFade * depthOpacity;
        star.haloMaterial.opacity =
          THREE.MathUtils.lerp(0.05, 0.18, sceneIntensity) * pulse * edgeFade * depthOpacity;
        star.headMaterial.size = headSize;
        star.haloMaterial.size = haloSize;
        star.glowTrail.scale.set(
          THREE.MathUtils.lerp(0.94, 1.12, star.depthFactor),
          THREE.MathUtils.lerp(0.9, 1.04, star.depthFactor),
          1
        );
        star.trail.scale.set(THREE.MathUtils.lerp(0.84, 1.02, star.depthFactor), 1, 1);

        if (progress >= 1) {
          star.active = false;
          star.group.visible = false;
          star.reset(false, t);
        }
      });

      renderer.render(scene, camera);
    };
    animate();

    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      nearNodeGeom.dispose();
      farNodeGeom.dispose();
      nearEdgeGeom.dispose();
      farEdgeGeom.dispose();
      nearNodeMat.dispose();
      farNodeMat.dispose();
      nearEdgeMat.dispose();
      farEdgeMat.dispose();
      orbitLoops.forEach((loop) => {
        loop.dots.geometry.dispose();
        loop.dotMaterial.dispose();
        loop.lineMaterial.dispose();
        const line = loop.group.children[0] as THREE.Line;
        line.geometry.dispose();
      });
      neuralGraphs.forEach((graph) => {
        graph.resources.forEach((resource) => resource.dispose());
      });
      shootingStars.forEach(({ geometries, materials }) => {
        geometries.forEach((geometry) => geometry.dispose());
        materials.forEach((material) => material.dispose());
      });
      renderer.dispose();
      if (mount.contains(renderer.domElement)) {
        mount.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      aria-hidden="true"
    />
  );
}
