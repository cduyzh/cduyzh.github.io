import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

export default function SpatialCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [webGlAvailable, setWebGlAvailable] = useState(true);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const isMobile = window.innerWidth < 768;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance',
      });
    } catch {
      setWebGlAvailable(false);
      return;
    }

    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
    renderer.setSize(window.innerWidth, window.innerHeight);
    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    scene.fog = new THREE.FogExp2('#06080b', 0.018);

    const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 100);
    // Position camera a bit higher and looking down slightly at the galaxy
    camera.position.set(0, 8, 16);
    camera.lookAt(0, 0, 0);

    const particleCount = isMobile ? 2500 : 6000;
    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(particleCount * 3);
    const colors = new Float32Array(particleCount * 3);
    const sizes = new Float32Array(particleCount);
    const randoms = new Float32Array(particleCount * 3);

    const colorPalette = [
      new THREE.Color('#b9ff62'), // acid lime
      new THREE.Color('#d7ffb0'), // soft lime
      new THREE.Color('#7fe5dd'), // ice cyan
      new THREE.Color('#29414c'), // deep cyan dust
      new THREE.Color('#b0c7ff'), // cool blue
      new THREE.Color('#7fe5dd'), // cyan accent
    ];

    for (let i = 0; i < particleCount; i++) {
      const i3 = i * 3;

      // Galaxy spiral distribution
      const radius = Math.random() * 18 + 1;
      const armOffset = Math.random() > 0.5 ? 0 : Math.PI;
      const spread = (Math.random() - 0.5) * (radius * 0.4);
      const theta = radius * 0.4 + armOffset + spread;

      const x = Math.cos(theta) * radius;
      const z = Math.sin(theta) * radius;

      // Core is thicker, edges are thinner
      const y = (Math.random() - 0.5) * 5 * Math.pow((20 - radius) / 20, 2) + (Math.random() - 0.5);

      positions[i3] = x;
      positions[i3 + 1] = y;
      positions[i3 + 2] = z;

      const color = colorPalette[Math.floor(Math.random() * colorPalette.length)];

      // Core particles (smaller radius) are brighter and warmer
      if (radius < 4 && Math.random() > 0.3) {
         colors[i3] = 1.0;     // R
         colors[i3 + 1] = 0.4; // G
         colors[i3 + 2] = 0.1; // B
      } else {
         colors[i3] = color.r;
         colors[i3 + 1] = color.g;
         colors[i3 + 2] = color.b;
      }

      sizes[i] = Math.random() * 2.5 + 0.5;

      randoms[i3] = Math.random();
      randoms[i3 + 1] = Math.random();
      randoms[i3 + 2] = Math.random();
    }

    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
    geometry.setAttribute('size', new THREE.BufferAttribute(sizes, 1));
    geometry.setAttribute('aRandom', new THREE.BufferAttribute(randoms, 3));

    const material = new THREE.ShaderMaterial({
      uniforms: {
        uTime: { value: 0 },
        uScroll: { value: 0 },
        uMouse: { value: new THREE.Vector2(0, 0) },
        uPixelRatio: { value: Math.min(window.devicePixelRatio || 1, 1.5) }
      },
      vertexShader: `
        uniform float uTime;
        uniform float uScroll;
        uniform vec2 uMouse;
        uniform float uPixelRatio;

        attribute float size;
        attribute vec3 color;
        attribute vec3 aRandom;

        varying vec3 vColor;
        varying float vAlpha;

        void main() {
          vColor = color;
          vec3 pos = position;

          // Organic fluid motion using sine waves
          float noiseX = sin(pos.y * 0.5 + uTime * 0.2 + aRandom.x * 10.0) * 1.2;
          float noiseY = cos(pos.x * 0.2 + uTime * 0.15 + aRandom.y * 10.0) * 1.5;
          float noiseZ = sin(pos.x * 0.3 + uTime * 0.25 + aRandom.z * 10.0) * 1.2;

          pos.x += noiseX;
          pos.y += noiseY;
          pos.z += noiseZ;

          // Scroll interaction (parallax / lifting)
          // As we scroll down, galaxy tilts and lifts slightly
          pos.y += uScroll * 4.0;

          // Mouse repulsion
          // Convert mouse (-1 to 1) to world pos approximately
          vec3 mouseWorld = vec3(uMouse.x * 20.0, 0.0, -uMouse.y * 20.0);
          float dist = distance(pos.xz, mouseWorld.xz);
          float maxDist = 6.0;

          if (dist < maxDist) {
            float force = (maxDist - dist) / maxDist;
            vec2 dir = normalize(pos.xz - mouseWorld.xz);
            pos.x += dir.x * force * 3.0;
            pos.z += dir.y * force * 3.0;
            pos.y -= force * 2.0; // push down

            // Highlight color when repelled
            vColor = mix(vColor, vec3(0.73, 1.0, 0.38), force * 0.8);
          }

          // Calculate opacity based on distance from center to fade out edges
          float centerDist = length(pos.xz);
          vAlpha = smoothstep(22.0, 0.0, centerDist);
          // Pulse alpha over time
          vAlpha *= 0.6 + 0.4 * sin(uTime * 1.2 + aRandom.x * 20.0);

          vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);

          // Size attenuation
          gl_PointSize = size * uPixelRatio * (60.0 / -mvPosition.z);
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        varying vec3 vColor;
        varying float vAlpha;

        void main() {
          // Circular particle
          vec2 xy = gl_PointCoord.xy - vec2(0.5);
          float ll = length(xy);
          if (ll > 0.5) discard;

          // Soft edge glow
          float glow = smoothstep(0.5, 0.1, ll);

          gl_FragColor = vec4(vColor, glow * vAlpha);
        }
      `,
      transparent: true,
      depthWrite: false,
    });

    const particles = new THREE.Points(geometry, material);
    // Tilt the galaxy slightly
    particles.rotation.x = 0.2;
    scene.add(particles);

    let isRunning = true;
    let isTabVisible = !document.hidden;
    let animationFrameId = 0;
    const clock = new THREE.Clock();

    // Target values for smooth interpolation
    let targetScroll = 0;
    let currentScroll = 0;
    let targetMouseX = 0;
    let targetMouseY = 0;
    let currentMouseX = 0;
    let currentMouseY = 0;

    const updateScroll = () => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      targetScroll = maxScroll > 0 ? window.scrollY / maxScroll : 0;
    };
    window.addEventListener('scroll', updateScroll, { passive: true });
    updateScroll();

    const handlePointerMove = (e: MouseEvent) => {
      if (prefersReducedMotion) return;
      targetMouseX = (e.clientX / window.innerWidth - 0.5) * 2;
      targetMouseY = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener('mousemove', handlePointerMove, { passive: true });

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
      updateScroll();
      if (prefersReducedMotion) {
        renderer.render(scene, camera);
      }
    };
    window.addEventListener('resize', handleResize);

    const animate = () => {
      if (!isRunning) return;
      animationFrameId = requestAnimationFrame(animate);

      const elapsed = clock.getElapsedTime();

      // Smooth interpolation
      currentScroll += (targetScroll - currentScroll) * 0.05;
      currentMouseX += (targetMouseX - currentMouseX) * 0.08;
      currentMouseY += (targetMouseY - currentMouseY) * 0.08;

      material.uniforms.uTime.value = elapsed;
      material.uniforms.uScroll.value = currentScroll;
      material.uniforms.uMouse.value.set(currentMouseX, currentMouseY);

      // Slowly rotate the whole galaxy
      particles.rotation.y = elapsed * 0.04;

      // Tilt based on scroll
      particles.rotation.x = 0.2 + currentScroll * 0.5;

      // Slight camera parallax
      camera.position.x = currentMouseX * 3;
      camera.position.y = 8 - currentScroll * 4 + currentMouseY * 2;
      camera.lookAt(0, currentScroll * 2, 0);

      renderer.render(scene, camera);
    };

    const handleVisibilityChange = () => {
      isTabVisible = !document.hidden;
      if (isTabVisible && !isRunning && !prefersReducedMotion) {
        isRunning = true;
        clock.start();
        animate();
      } else if (!isTabVisible && isRunning) {
        isRunning = false;
        cancelAnimationFrame(animationFrameId);
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    if (prefersReducedMotion) {
      renderer.render(scene, camera);
    } else {
      animate();
    }

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('scroll', updateScroll);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handlePointerMove);
      document.removeEventListener('visibilitychange', handleVisibilityChange);

      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }

      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, []);

  if (!webGlAvailable) {
    return (
      <div
        className="fixed inset-0 pointer-events-none z-0 overflow-hidden bg-[radial-gradient(120%_90%_at_72%_28%,rgba(232,214,190,0.55),transparent_62%)]"
        aria-hidden="true"
      />
    );
  }

  return (
    <div
      ref={containerRef}
      id="spatial-canvas-root"
      className="fixed inset-0 z-0 h-screen w-screen overflow-hidden pointer-events-none"
      aria-hidden="true"
    />
  );
}
