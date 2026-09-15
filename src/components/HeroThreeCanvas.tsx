import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

export default function HeroThreeCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [webGlAvailable, setWebGlAvailable] = useState(true);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Detect WebGL capability safely
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true,
        powerPreference: 'default'
      });
    } catch {
      setWebGlAvailable(false);
      return;
    }

    // Set pixel ratio capped strictly at 1.5 for performance
    const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    renderer.setPixelRatio(dpr);
    renderer.setSize(container.clientWidth, container.clientHeight);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;
    container.appendChild(renderer.domElement);

    // Scene & Camera
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      45,
      container.clientWidth / container.clientHeight,
      0.1,
      100
    );
    camera.position.set(0, 0, 7.5);

    // Geometry: Organic sphere with moderate segment count
    const geometry = new THREE.IcosahedronGeometry(2.2, 32);
    const originalPositions = geometry.attributes.position.array.slice() as Float32Array;
    const vertexCount = originalPositions.length / 3;

    // Material: Soft translucent warm rice-white glass
    const material = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color('#fbf9f4'),
      roughness: 0.2,
      metalness: 0.05,
      transmission: 0.7,
      thickness: 1.5,
      ior: 1.35,
      specularIntensity: 0.8,
      specularColor: new THREE.Color('#94d2bd'),
      transparent: true,
      opacity: 0.92
    });

    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(1.4, 0.15, 0);
    scene.add(mesh);

    // Subtle floating ring
    const ringGeo = new THREE.TorusGeometry(3.0, 0.06, 16, 64);
    const ringMat = new THREE.MeshBasicMaterial({
      color: new THREE.Color('#c85a32'),
      transparent: true,
      opacity: 0.25
    });
    const ringMesh = new THREE.Mesh(ringGeo, ringMat);
    ringMesh.rotation.x = Math.PI / 3;
    ringMesh.rotation.y = Math.PI / 6;
    mesh.add(ringMesh);

    // Balanced soft lighting
    const ambientLight = new THREE.AmbientLight(0xfef9f3, 1.3);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xf5b596, 2.0);
    keyLight.position.set(5, 4, 6);
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0xb4e1eb, 1.8);
    fillLight.position.set(-5, -2, 4);
    scene.add(fillLight);

    // Visibility & Viewport State Tracking
    let isIntersecting = true;
    let isTabVisible = !document.hidden;
    let isRunning = true;
    let animationFrameId: number;

    // Mouse lerp state
    let mouseX = 0;
    let mouseY = 0;
    let targetX = 0;
    let targetY = 0;

    const handleMouseMove = (e: MouseEvent) => {
      if (prefersReducedMotion) return;
      const { innerWidth, innerHeight } = window;
      mouseX = (e.clientX / innerWidth - 0.5) * 1.5;
      mouseY = (e.clientY / innerHeight - 0.5) * 1.5;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    // Handle responsive resize
    const handleResize = () => {
      if (!container) return;
      const width = container.clientWidth;
      const height = container.clientHeight;
      camera.aspect = width / height;

      if (width < 768) {
        mesh.position.set(0, -0.3, 0);
        mesh.scale.set(0.72, 0.72, 0.72);
      } else {
        mesh.position.set(1.4, 0.15, 0);
        mesh.scale.set(1, 1, 1);
      }

      camera.updateProjectionMatrix();
      renderer.setSize(width, height);
      if (prefersReducedMotion) {
        renderer.render(scene, camera);
      }
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    // IntersectionObserver to pause rendering when hero is out of view
    const observer = new IntersectionObserver(
      ([entry]) => {
        isIntersecting = entry.isIntersecting;
        checkRunState();
      },
      { threshold: 0.05 }
    );
    observer.observe(container);

    // VisibilityChange to pause when browser tab is inactive
    const handleVisibilityChange = () => {
      isTabVisible = !document.hidden;
      checkRunState();
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    const clock = new THREE.Clock();

    function animate() {
      if (!isRunning) return;
      animationFrameId = requestAnimationFrame(animate);

      const elapsedTime = clock.getElapsedTime();

      // Smooth mouse lerp
      targetX += (mouseX * 0.4 - targetX) * 0.05;
      targetY += (mouseY * 0.4 - targetY) * 0.05;

      mesh.rotation.x = targetY;
      mesh.rotation.y = elapsedTime * 0.12 + targetX;
      mesh.rotation.z = Math.sin(elapsedTime * 0.2) * 0.1;
      ringMesh.rotation.z = elapsedTime * 0.08;

      // Surface vertex displacement (disabled under reduced-motion)
      if (!prefersReducedMotion) {
        const positions = geometry.attributes.position.array as Float32Array;
        const time = elapsedTime * 0.8;

        for (let i = 0; i < vertexCount; i++) {
          const i3 = i * 3;
          const ox = originalPositions[i3];
          const oy = originalPositions[i3 + 1];
          const oz = originalPositions[i3 + 2];

          const wave =
            Math.sin(ox * 1.6 + time) * Math.cos(oy * 1.6 + time * 0.7) * 0.11;

          positions[i3] = ox * (1 + wave);
          positions[i3 + 1] = oy * (1 + wave);
          positions[i3 + 2] = oz * (1 + wave);
        }

        geometry.attributes.position.needsUpdate = true;
      }

      renderer.render(scene, camera);
    }

    function checkRunState() {
      const shouldRun = isIntersecting && isTabVisible && !prefersReducedMotion;
      if (shouldRun && !isRunning) {
        isRunning = true;
        clock.start();
        animate();
      } else if (!shouldRun && isRunning) {
        isRunning = false;
        cancelAnimationFrame(animationFrameId);
      }
    }

    if (!prefersReducedMotion) {
      animate();
    } else {
      // Single static frame render for reduced motion
      renderer.render(scene, camera);
    }

    return () => {
      cancelAnimationFrame(animationFrameId);
      observer.disconnect();
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);

      if (container && renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }

      geometry.dispose();
      material.dispose();
      ringGeo.dispose();
      ringMat.dispose();
      renderer.dispose();
    };
  }, []);

  if (!webGlAvailable) {
    return (
      <div
        className="pointer-events-none absolute inset-0 z-0 h-full w-full overflow-hidden opacity-60 bg-[radial-gradient(ellipse_at_70%_40%,rgba(200,90,50,0.12),transparent_70%)]"
        aria-hidden="true"
      />
    );
  }

  return (
    <div
      ref={containerRef}
      className="pointer-events-none absolute inset-0 z-0 h-full w-full overflow-hidden opacity-90"
      aria-hidden="true"
    />
  );
}
