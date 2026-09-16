import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

interface Keyframe {
  progress: number;
  posX: number;
  posY: number;
  posZ: number;
  scale: number;
  ringRotX: number;
  ringOpacity: number;
  colorHex: string;
  lightIntensity: number;
}

// Stage positions mapped to page scroll rhythm
const desktopKeyframes: Keyframe[] = [
  // 0.00: Hero - Bold, right-aligned, high presence
  { progress: 0.00, posX: 1.4, posY: 0.15, posZ: 0, scale: 1.0, ringRotX: Math.PI / 3, ringOpacity: 0.28, colorHex: '#fbf9f4', lightIntensity: 2.0 },
  // 0.22: About - Floats gently to upper right behind text
  { progress: 0.22, posX: 1.9, posY: 0.6, posZ: -1.2, scale: 0.82, ringRotX: Math.PI / 4, ringOpacity: 0.18, colorHex: '#faf5ee', lightIntensity: 1.8 },
  // 0.45: Visual Break - Centered depth, aligns with architectural quote
  { progress: 0.45, posX: 0.0, posY: 0.0, posZ: -2.8, scale: 1.15, ringRotX: Math.PI / 2.2, ringOpacity: 0.38, colorHex: '#fef7ee', lightIntensity: 2.4 },
  // 0.72: Projects - Drifted to left/background, framing the 2-column grid
  { progress: 0.72, posX: -1.8, posY: -0.2, posZ: -1.8, scale: 0.78, ringRotX: Math.PI / 3.5, ringOpacity: 0.16, colorHex: '#f5f7fa', lightIntensity: 1.7 },
  // 1.00: Contact - Settles into warm terracotta dusk anchor
  { progress: 1.00, posX: 1.2, posY: -0.7, posZ: -0.8, scale: 0.92, ringRotX: Math.PI / 3, ringOpacity: 0.32, colorHex: '#fcedea', lightIntensity: 2.2 }
];

const mobileKeyframes: Keyframe[] = [
  { progress: 0.00, posX: 0.0, posY: -0.3, posZ: 0, scale: 0.72, ringRotX: Math.PI / 3, ringOpacity: 0.22, colorHex: '#fbf9f4', lightIntensity: 1.8 },
  { progress: 0.25, posX: 0.3, posY: 0.4, posZ: -1.5, scale: 0.58, ringRotX: Math.PI / 4, ringOpacity: 0.14, colorHex: '#faf5ee', lightIntensity: 1.6 },
  { progress: 0.50, posX: 0.0, posY: 0.0, posZ: -3.0, scale: 0.85, ringRotX: Math.PI / 2.2, ringOpacity: 0.26, colorHex: '#fef7ee', lightIntensity: 2.0 },
  { progress: 0.75, posX: -0.2, posY: -0.4, posZ: -2.0, scale: 0.55, ringRotX: Math.PI / 3.5, ringOpacity: 0.12, colorHex: '#f5f7fa', lightIntensity: 1.5 },
  { progress: 1.00, posX: 0.0, posY: -0.5, posZ: -1.0, scale: 0.68, ringRotX: Math.PI / 3, ringOpacity: 0.24, colorHex: '#fcedea', lightIntensity: 1.9 }
];

function interpolateKeyframes(keyframes: Keyframe[], progress: number): Keyframe {
  const p = Math.max(0, Math.min(1, progress));
  if (p <= keyframes[0].progress) return keyframes[0];
  if (p >= keyframes[keyframes.length - 1].progress) return keyframes[keyframes.length - 1];

  for (let i = 0; i < keyframes.length - 1; i++) {
    const k1 = keyframes[i];
    const k2 = keyframes[i + 1];
    if (p >= k1.progress && p <= k2.progress) {
      const t = (p - k1.progress) / (k2.progress - k1.progress);
      // Smooth cosine easing
      const eased = (1 - Math.cos(t * Math.PI)) / 2;

      const c1 = new THREE.Color(k1.colorHex);
      const c2 = new THREE.Color(k2.colorHex);
      c1.lerp(c2, eased);

      return {
        progress: p,
        posX: THREE.MathUtils.lerp(k1.posX, k2.posX, eased),
        posY: THREE.MathUtils.lerp(k1.posY, k2.posY, eased),
        posZ: THREE.MathUtils.lerp(k1.posZ, k2.posZ, eased),
        scale: THREE.MathUtils.lerp(k1.scale, k2.scale, eased),
        ringRotX: THREE.MathUtils.lerp(k1.ringRotX, k2.ringRotX, eased),
        ringOpacity: THREE.MathUtils.lerp(k1.ringOpacity, k2.ringOpacity, eased),
        colorHex: '#' + c1.getHexString(),
        lightIntensity: THREE.MathUtils.lerp(k1.lightIntensity, k2.lightIntensity, eased)
      };
    }
  }
  return keyframes[0];
}

export default function SpatialCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [webGlAvailable, setWebGlAvailable] = useState(true);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: 'high-performance'
      });
    } catch {
      setWebGlAvailable(false);
      return;
    }

    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    renderer.setPixelRatio(dpr);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 100);
    camera.position.set(0, 0, 7.5);

    // Geometry: Organic Icosahedron
    const geometry = new THREE.IcosahedronGeometry(2.2, 36);
    const originalPositions = geometry.attributes.position.array.slice() as Float32Array;
    const vertexCount = originalPositions.length / 3;

    // Translucent silk/glass material
    const material = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color('#fbf9f4'),
      roughness: 0.18,
      metalness: 0.06,
      transmission: 0.74,
      thickness: 1.6,
      ior: 1.36,
      specularIntensity: 0.85,
      specularColor: new THREE.Color('#94d2bd'),
      transparent: true,
      opacity: 0.92
    });

    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(1.4, 0.15, 0);
    scene.add(mesh);

    // Floating orbital ring
    const ringGeo = new THREE.TorusGeometry(3.1, 0.055, 16, 80);
    const ringMat = new THREE.MeshBasicMaterial({
      color: new THREE.Color('#c85a32'),
      transparent: true,
      opacity: 0.28
    });
    const ringMesh = new THREE.Mesh(ringGeo, ringMat);
    ringMesh.rotation.x = Math.PI / 3;
    ringMesh.rotation.y = Math.PI / 6;
    mesh.add(ringMesh);

    // Secondary subtle cosmic particle ring for enhanced spatial continuity
    const particleCount = 48;
    const particleGeo = new THREE.BufferGeometry();
    const particlePositions = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      const angle = (i / particleCount) * Math.PI * 2;
      const radius = 3.6 + (Math.random() - 0.5) * 0.4;
      particlePositions[i * 3] = Math.cos(angle) * radius;
      particlePositions[i * 3 + 1] = (Math.random() - 0.5) * 0.8;
      particlePositions[i * 3 + 2] = Math.sin(angle) * radius;
    }
    particleGeo.setAttribute('position', new THREE.BufferAttribute(particlePositions, 3));
    const particleMat = new THREE.PointsMaterial({
      color: 0xc85a32,
      size: 0.05,
      transparent: true,
      opacity: 0.45
    });
    const particleMesh = new THREE.Points(particleGeo, particleMat);
    mesh.add(particleMesh);

    // Lighting
    const ambientLight = new THREE.AmbientLight(0xfef9f3, 1.35);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xf5b596, 2.0);
    keyLight.position.set(5, 4, 6);
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0xb4e1eb, 1.8);
    fillLight.position.set(-5, -2, 4);
    scene.add(fillLight);

    const rimLight = new THREE.PointLight(0xa5c4d4, 2.0, 16);
    rimLight.position.set(0, 5, -4);
    scene.add(rimLight);

    // Animation & State
    let isRunning = true;
    let isTabVisible = !document.hidden;
    let animationFrameId: number;

    let targetScrollProgress = 0;
    let currentScrollProgress = 0;

    let mouseX = 0;
    let mouseY = 0;
    let targetMouseX = 0;
    let targetMouseY = 0;

    const updateScroll = () => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      targetScrollProgress = maxScroll > 0 ? window.scrollY / maxScroll : 0;
    };

    window.addEventListener('scroll', updateScroll, { passive: true });
    updateScroll();

    const handleMouseMove = (e: MouseEvent) => {
      if (prefersReducedMotion) return;
      mouseX = (e.clientX / window.innerWidth - 0.5) * 1.5;
      mouseY = (e.clientY / window.innerHeight - 0.5) * 1.5;
    };
    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
      updateScroll();
      if (prefersReducedMotion) {
        renderScene();
      }
    };
    window.addEventListener('resize', handleResize);

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

    const clock = new THREE.Clock();

    function renderScene() {
      const isMobile = window.innerWidth < 768;
      const keyframes = isMobile ? mobileKeyframes : desktopKeyframes;
      const state = interpolateKeyframes(keyframes, currentScrollProgress);

      mesh.position.set(
        state.posX + targetMouseX * 0.35,
        state.posY - targetMouseY * 0.35,
        state.posZ
      );
      mesh.scale.setScalar(state.scale);
      ringMesh.rotation.x = state.ringRotX;
      ringMat.opacity = state.ringOpacity;
      keyLight.intensity = state.lightIntensity;
      material.color.set(state.colorHex);

      renderer.render(scene, camera);
    }

    function animate() {
      if (!isRunning) return;
      animationFrameId = requestAnimationFrame(animate);

      const elapsedTime = clock.getElapsedTime();

      // Smooth scroll progress interpolation (damping)
      currentScrollProgress += (targetScrollProgress - currentScrollProgress) * 0.06;

      // Mouse lerp
      targetMouseX += (mouseX * 0.5 - targetMouseX) * 0.05;
      targetMouseY += (mouseY * 0.5 - targetMouseY) * 0.05;

      const isMobile = window.innerWidth < 768;
      const keyframes = isMobile ? mobileKeyframes : desktopKeyframes;
      const state = interpolateKeyframes(keyframes, currentScrollProgress);

      // Continuous fluid rotation
      mesh.rotation.y = elapsedTime * 0.12 + targetMouseX * 0.8 + currentScrollProgress * Math.PI * 1.5;
      mesh.rotation.x = targetMouseY * 0.5 + Math.sin(elapsedTime * 0.2) * 0.08;
      mesh.rotation.z = Math.sin(elapsedTime * 0.18) * 0.1;

      ringMesh.rotation.z = elapsedTime * 0.09;
      particleMesh.rotation.y = -elapsedTime * 0.05;

      mesh.position.set(
        state.posX + targetMouseX * 0.35,
        state.posY - targetMouseY * 0.35,
        state.posZ
      );
      mesh.scale.setScalar(state.scale);
      ringMesh.rotation.x = state.ringRotX;
      ringMat.opacity = state.ringOpacity;
      keyLight.intensity = state.lightIntensity;
      material.color.set(state.colorHex);

      // Surface vertex displacement (wave physics)
      if (!prefersReducedMotion) {
        const positions = geometry.attributes.position.array as Float32Array;
        const time = elapsedTime * 0.85;

        for (let i = 0; i < vertexCount; i++) {
          const i3 = i * 3;
          const ox = originalPositions[i3];
          const oy = originalPositions[i3 + 1];
          const oz = originalPositions[i3 + 2];

          const wave =
            Math.sin(ox * 1.5 + time) * Math.cos(oy * 1.5 + time * 0.7) * 0.12 +
            Math.sin(oz * 1.6 + time * 0.8) * 0.04;

          positions[i3] = ox * (1 + wave);
          positions[i3 + 1] = oy * (1 + wave);
          positions[i3 + 2] = oz * (1 + wave);
        }

        geometry.attributes.position.needsUpdate = true;
      }

      renderer.render(scene, camera);
    }

    if (!prefersReducedMotion) {
      animate();
    } else {
      renderScene();
    }

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('scroll', updateScroll);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('visibilitychange', handleVisibilityChange);

      if (container && renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }

      geometry.dispose();
      material.dispose();
      ringGeo.dispose();
      ringMat.dispose();
      particleGeo.dispose();
      particleMat.dispose();
      renderer.dispose();
    };
  }, []);

  if (!webGlAvailable) {
    return (
      <div
        className="fixed inset-0 pointer-events-none z-0 overflow-hidden opacity-50 bg-[radial-gradient(ellipse_at_70%_30%,rgba(200,90,50,0.1),transparent_70%)]"
        aria-hidden="true"
      />
    );
  }

  return (
    <div
      ref={containerRef}
      id="spatial-canvas-root"
      className="fixed inset-0 pointer-events-none z-0 h-screen w-screen overflow-hidden opacity-90 transition-opacity duration-700"
      aria-hidden="true"
    />
  );
}
