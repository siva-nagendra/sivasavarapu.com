"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

const NEAR_NODE_COUNT = 56;
const FAR_NODE_COUNT = 92;
const NEAR_CONNECTION_DISTANCE = 0.42;
const FAR_CONNECTION_DISTANCE = 0.28;
const FIELD_SIZE = 4.8;
const SHOOTING_STAR_COUNT = 4;

type ShootingStar = {
  mesh: THREE.Line;
  material: THREE.LineBasicMaterial;
  speed: number;
  drift: number;
  reset: (initial?: boolean) => void;
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

function createShootingStar(scene: THREE.Scene, color: number, opacity: number) {
  const geometry = new THREE.BufferGeometry();
  geometry.setAttribute("position", new THREE.BufferAttribute(new Float32Array([
    0, 0, 0,
    -0.26, 0.08, 0,
  ]), 3));

  const material = new THREE.LineBasicMaterial({
    color,
    transparent: true,
    opacity,
    depthWrite: false,
  });

  const mesh = new THREE.Line(geometry, material);
  scene.add(mesh);

  const star: ShootingStar = {
    mesh,
    material,
    speed: 0.012 + Math.random() * 0.015,
    drift: 0.003 + Math.random() * 0.004,
    reset(initial = false) {
      mesh.position.set(
        (Math.random() - 0.5) * 8.8 + 2.2,
        (Math.random() - 0.5) * 4.2 + 0.6,
        -0.4 - Math.random() * 1.2
      );
      mesh.rotation.z = -0.45 - Math.random() * 0.35;
      if (!initial) {
        this.speed = 0.012 + Math.random() * 0.015;
        this.drift = 0.003 + Math.random() * 0.004;
      }
    },
  };

  star.reset(true);
  return { star, geometry, material };
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

    const shootingStars = Array.from({ length: SHOOTING_STAR_COUNT }, (_, index) =>
      createShootingStar(scene, index % 2 === 0 ? 0x75d5ff : 0xf6c56e, 0.11 - index * 0.015)
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

      shootingStars.forEach(({ star }) => {
        star.mesh.position.x -= star.speed * (0.8 + heroBlend * 0.7);
        star.mesh.position.y -= star.drift * (0.7 + heroBlend * 0.9);
        star.material.opacity = THREE.MathUtils.lerp(0.025, 0.12, sceneIntensity);

        if (star.mesh.position.x < -5.4 || star.mesh.position.y < -3.2) {
          star.reset();
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
      shootingStars.forEach(({ geometry, material }) => {
        geometry.dispose();
        material.dispose();
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
