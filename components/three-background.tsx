"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

interface ThreeBackgroundProps {
  className?: string;
}

/**
 * Lightweight Three.js floating particles background
 * - Performance optimized with InstancedMesh
 * - Mouse-reactive parallax effect
 * - WebGL fallback to CSS gradient
 * - Mobile-friendly with reduced particle count
 */
export default function ThreeBackground({
  className = "",
}: ThreeBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [webGLSupported, setWebGLSupported] = useState(true);
  const mouseRef = useRef({ x: 0, y: 0 });
  const targetMouseRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    // Check WebGL support
    const canvas = document.createElement("canvas");
    const gl =
      canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
    if (!gl) {
      setWebGLSupported(false);
      return;
    }

    const container = containerRef.current;
    if (!container) return;

    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      60,
      container.clientWidth / container.clientHeight,
      0.1,
      1000,
    );
    camera.position.z = 30;

    // Renderer with optimizations
    const renderer = new THREE.WebGLRenderer({
      antialias: window.devicePixelRatio < 2, // Disable AA on high DPI for performance
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    container.appendChild(renderer.domElement);

    // Responsive particle count
    const isMobile = window.innerWidth < 768;
    const particleCount = isMobile ? 35 : 60;

    // Create instanced geometries for performance
    const geometries = [
      new THREE.IcosahedronGeometry(0.4, 0),
      new THREE.OctahedronGeometry(0.35, 0),
      new THREE.TetrahedronGeometry(0.4, 0),
    ];

    // Primary color palette (teal/cyan to match your theme)
    const colors = [
      new THREE.Color("hsl(175, 60%, 45%)"), // Primary teal
      new THREE.Color("hsl(160, 50%, 55%)"), // Lighter cyan
      new THREE.Color("hsl(185, 55%, 40%)"), // Deeper teal
    ];

    // Create instanced meshes
    const meshGroups: {
      mesh: THREE.InstancedMesh;
      speeds: Float32Array;
      phases: Float32Array;
      originalPositions: Float32Array;
    }[] = [];

    const particlesPerType = Math.floor(particleCount / 3);

    geometries.forEach((geometry, geoIndex) => {
      const material = new THREE.MeshBasicMaterial({
        color: colors[geoIndex],
        transparent: true,
        opacity: 0.15,
        wireframe: true,
      });

      const mesh = new THREE.InstancedMesh(
        geometry,
        material,
        particlesPerType,
      );
      const speeds = new Float32Array(particlesPerType);
      const phases = new Float32Array(particlesPerType);
      const originalPositions = new Float32Array(particlesPerType * 3);

      const dummy = new THREE.Object3D();
      const spreadX = isMobile ? 25 : 40;
      const spreadY = isMobile ? 20 : 30;
      const spreadZ = 20;

      for (let i = 0; i < particlesPerType; i++) {
        const x = (Math.random() - 0.5) * spreadX;
        const y = (Math.random() - 0.5) * spreadY;
        const z = (Math.random() - 0.5) * spreadZ - 10;

        originalPositions[i * 3] = x;
        originalPositions[i * 3 + 1] = y;
        originalPositions[i * 3 + 2] = z;

        dummy.position.set(x, y, z);
        dummy.rotation.set(
          Math.random() * Math.PI,
          Math.random() * Math.PI,
          Math.random() * Math.PI,
        );
        dummy.scale.setScalar(0.5 + Math.random() * 1.5);
        dummy.updateMatrix();
        mesh.setMatrixAt(i, dummy.matrix);

        speeds[i] = 0.2 + Math.random() * 0.5;
        phases[i] = Math.random() * Math.PI * 2;
      }

      mesh.instanceMatrix.needsUpdate = true;
      scene.add(mesh);

      meshGroups.push({ mesh, speeds, phases, originalPositions });
    });

    // Mouse movement handler
    const handleMouseMove = (event: MouseEvent) => {
      targetMouseRef.current.x = (event.clientX / window.innerWidth - 0.5) * 2;
      targetMouseRef.current.y =
        -(event.clientY / window.innerHeight - 0.5) * 2;
    };

    // Touch movement handler for mobile
    const handleTouchMove = (event: TouchEvent) => {
      if (event.touches.length > 0) {
        targetMouseRef.current.x =
          (event.touches[0].clientX / window.innerWidth - 0.5) * 2;
        targetMouseRef.current.y =
          -(event.touches[0].clientY / window.innerHeight - 0.5) * 2;
      }
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: true });

    // Animation loop
    let animationId: number;
    const clock = new THREE.Clock();
    const dummy = new THREE.Object3D();

    const animate = () => {
      animationId = requestAnimationFrame(animate);

      const elapsed = clock.getElapsedTime();

      // Smooth mouse following
      mouseRef.current.x +=
        (targetMouseRef.current.x - mouseRef.current.x) * 0.05;
      mouseRef.current.y +=
        (targetMouseRef.current.y - mouseRef.current.y) * 0.05;

      // Update particles
      meshGroups.forEach(({ mesh, speeds, phases, originalPositions }) => {
        const count = mesh.count;
        for (let i = 0; i < count; i++) {
          const speed = speeds[i];
          const phase = phases[i];
          const baseX = originalPositions[i * 3];
          const baseY = originalPositions[i * 3 + 1];
          const baseZ = originalPositions[i * 3 + 2];

          // Floating motion
          const floatY = Math.sin(elapsed * speed + phase) * 0.8;
          const floatX = Math.cos(elapsed * speed * 0.5 + phase) * 0.4;

          // Mouse parallax (depth-based intensity)
          const depthFactor = (baseZ + 20) / 30; // Normalize depth
          const parallaxX = mouseRef.current.x * 2 * depthFactor;
          const parallaxY = mouseRef.current.y * 1.5 * depthFactor;

          dummy.position.set(
            baseX + floatX + parallaxX,
            baseY + floatY + parallaxY,
            baseZ,
          );

          // Gentle rotation
          dummy.rotation.x = elapsed * speed * 0.3 + phase;
          dummy.rotation.y = elapsed * speed * 0.2 + phase;

          mesh.getMatrixAt(i, dummy.matrix);
          const scale = dummy.matrix.elements[0]; // Preserve original scale
          dummy.scale.setScalar(scale > 0 ? scale : 1);
          dummy.updateMatrix();
          mesh.setMatrixAt(i, dummy.matrix);
        }
        mesh.instanceMatrix.needsUpdate = true;
      });

      renderer.render(scene, camera);
    };

    animate();

    // Resize handler
    const handleResize = () => {
      if (!container) return;
      const width = container.clientWidth;
      const height = container.clientHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
    };

    window.addEventListener("resize", handleResize, { passive: true });

    // Cleanup
    return () => {
      cancelAnimationFrame(animationId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("resize", handleResize);

      meshGroups.forEach(({ mesh }) => {
        mesh.geometry.dispose();
        (mesh.material as THREE.Material).dispose();
        scene.remove(mesh);
      });

      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  // Fallback gradient for non-WebGL devices
  if (!webGLSupported) {
    return (
      <div
        className={`absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 ${className}`}
        aria-hidden="true"
      />
    );
  }

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 pointer-events-none ${className}`}
      aria-hidden="true"
      style={{
        // Edge fade effect using CSS mask
        maskImage:
          "radial-gradient(ellipse 80% 70% at 50% 50%, black 40%, transparent 100%)",
        WebkitMaskImage:
          "radial-gradient(ellipse 80% 70% at 50% 50%, black 40%, transparent 100%)",
      }}
    />
  );
}
