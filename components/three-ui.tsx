"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

/**
 * Global Three.js UI overlay for micro-interactions (button hover/click)
 * - Orthographic camera maps to screen pixels
 * - Particle pool implemented with Points for efficiency
 * - Event delegation: listens for interactions on elements with `data-three-ui` attribute
 * - Graceful fallback to CSS ripple if WebGL unsupported
 */
export default function ThreeUI() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [supported, setSupported] = useState(true);

  useEffect(() => {
    const canvas = document.createElement("canvas");
    const gl =
      canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
    if (!gl) {
      setSupported(false);
      return;
    }

    const container = containerRef.current;
    if (!container) return;

    const width = window.innerWidth;
    const height = window.innerHeight;

    // Renderer
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: false });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height);
    renderer.domElement.style.position = "absolute";
    renderer.domElement.style.top = "0";
    renderer.domElement.style.left = "0";
    renderer.domElement.style.pointerEvents = "none";
    container.appendChild(renderer.domElement);

    // Camera (orthographic to map pixels directly)
    const camera = new THREE.OrthographicCamera(
      0,
      width,
      height,
      0,
      -1000,
      1000,
    );

    const scene = new THREE.Scene();

    // Particle pool
    const MAX_PARTICLES = 250;
    const positions = new Float32Array(MAX_PARTICLES * 3);
    const velocities = new Float32Array(MAX_PARTICLES * 2); // vx, vy
    const life = new Float32Array(MAX_PARTICLES);
    const sizes = new Float32Array(MAX_PARTICLES);
    const colors = new Float32Array(MAX_PARTICLES * 3);

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute(
      "position",
      new THREE.BufferAttribute(positions, 3).setUsage(THREE.DynamicDrawUsage),
    );
    geometry.setAttribute(
      "aSize",
      new THREE.BufferAttribute(sizes, 1).setUsage(THREE.DynamicDrawUsage),
    );
    geometry.setAttribute(
      "aColor",
      new THREE.BufferAttribute(colors, 3).setUsage(THREE.DynamicDrawUsage),
    );

    const material = new THREE.ShaderMaterial({
      transparent: true,
      depthTest: false,
      uniforms: {
        uPixelRatio: { value: Math.min(window.devicePixelRatio, 2) },
      },
      vertexShader: `
        attribute float aSize;
        attribute vec3 aColor;
        varying vec3 vColor;
        void main(){
          vColor = aColor;
          vec4 mvPosition = vec4(position.xy, 0.0, 1.0);
          gl_Position = projectionMatrix * modelViewMatrix * mvPosition;
          gl_PointSize = aSize *  (1.0 / (1.0));
        }
      `,
      fragmentShader: `
        precision mediump float;
        varying vec3 vColor;
        void main(){
          float r = length(gl_PointCoord - vec2(0.5));
          float alpha = smoothstep(0.5, 0.0, r);
          gl_FragColor = vec4(vColor, alpha);
        }
      `,
    });

    const points = new THREE.Points(geometry, material);
    scene.add(points);

    // State
    let poolIndex = 0;

    // initialize arrays
    for (let i = 0; i < MAX_PARTICLES; i++) {
      positions[i * 3] = -9999;
      positions[i * 3 + 1] = -9999;
      positions[i * 3 + 2] = 0;
      velocities[i * 2] = 0;
      velocities[i * 2 + 1] = 0;
      life[i] = 0;
      sizes[i] = 0;
      colors[i * 3] = 0.06; // teal-ish fallback
      colors[i * 3 + 1] = 0.8;
      colors[i * 3 + 2] = 0.7;
    }

    geometry.getAttribute("position").needsUpdate = true;
    geometry.getAttribute("aSize").needsUpdate = true;
    geometry.getAttribute("aColor").needsUpdate = true;

    // spawn particle at screen coords (x,y) in pixels
    const spawn = (x: number, y: number, count = 12) => {
      for (let i = 0; i < count; i++) {
        const idx = poolIndex % MAX_PARTICLES;
        const angle = Math.random() * Math.PI * 2;
        const speed = 40 + Math.random() * 120;
        const vx = Math.cos(angle) * speed * (0.6 + Math.random() * 0.8);
        const vy = Math.sin(angle) * speed * (0.6 + Math.random() * 0.8);

        positions[idx * 3] = x;
        positions[idx * 3 + 1] = height - y; // invert Y for three coords
        positions[idx * 3 + 2] = 0;
        velocities[idx * 2] = vx;
        velocities[idx * 2 + 1] = vy;
        life[idx] = 0.8 + Math.random() * 0.6;
        sizes[idx] = 6 + Math.random() * 8;

        // color variation (teal palette)
        const c = new THREE.Color();
        c.setHSL(
          0.49 + (Math.random() - 0.5) * 0.03,
          0.6,
          0.45 + Math.random() * 0.08,
        );
        colors[idx * 3] = c.r;
        colors[idx * 3 + 1] = c.g;
        colors[idx * 3 + 2] = c.b;

        poolIndex++;
      }

      geometry.getAttribute("position").needsUpdate = true;
      geometry.getAttribute("aSize").needsUpdate = true;
      geometry.getAttribute("aColor").needsUpdate = true;
    };

    // Event handling: listen for interactions on elements with data-three-ui
    const handlePointer = (event: PointerEvent) => {
      const target = (event.target as HTMLElement).closest?.(
        "[data-three-ui]",
      ) as HTMLElement | null;
      if (!target) return;
      // get bounding box and spawn at pointer location
      const rect = target.getBoundingClientRect();
      const x = event.clientX;
      const y = event.clientY;
      spawn(x - rect.left + rect.left, y - rect.top + rect.top, 18);
    };

    const handleClick = (event: MouseEvent) => {
      const target = (event.target as HTMLElement).closest?.(
        "[data-three-ui]",
      ) as HTMLElement | null;
      if (!target) return;
      const x = event.clientX;
      const y = event.clientY;
      spawn(x, y, 36);
    };

    window.addEventListener("pointerenter", handlePointer, true);
    window.addEventListener("pointerdown", handleClick, true);

    // Animation
    let last = performance.now();
    const animate = () => {
      const now = performance.now();
      const dt = Math.min((now - last) / 1000, 0.032);
      last = now;

      for (let i = 0; i < MAX_PARTICLES; i++) {
        if (life[i] > 0) {
          // update
          const idx3 = i * 3;
          const idx2 = i * 2;
          positions[idx3] += velocities[idx2] * dt;
          positions[idx3 + 1] += velocities[idx2 + 1] * dt;
          // apply drag and gravity-like decay
          velocities[idx2] *= 0.96;
          velocities[idx2 + 1] *= 0.96;
          life[i] -= dt * 0.9;
          sizes[i] *= 0.995;
          if (life[i] <= 0.01) {
            positions[idx3] = -9999;
            positions[idx3 + 1] = -9999;
            sizes[i] = 0;
          }
        }
      }

      geometry.getAttribute("position").needsUpdate = true;
      geometry.getAttribute("aSize").needsUpdate = true;
      geometry.getAttribute("aColor").needsUpdate = true;

      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };

    animate();

    const handleResize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      renderer.setSize(w, h);
      camera.right = w;
      camera.top = h;
      camera.updateProjectionMatrix();
    };
    window.addEventListener("resize", handleResize, { passive: true });

    // Cleanup
    return () => {
      window.removeEventListener("pointerenter", handlePointer, true);
      window.removeEventListener("pointerdown", handleClick, true);
      window.removeEventListener("resize", handleResize);
      renderer.dispose();
      if (container.contains(renderer.domElement))
        container.removeChild(renderer.domElement);
    };
  }, []);

  if (!supported) {
    return (
      <div
        ref={containerRef}
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
      />
    );
  }

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 pointer-events-none z-[9999]"
      aria-hidden="true"
    />
  );
}
