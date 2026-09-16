import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';

interface Keyframe {
  progress: number;
  posX: number;
  posY: number;
  posZ: number;
  scale: number;
  ringTilt: number;
  glowOpacity: number;
  glowHex: string;
}

/* 主体沿页面节奏在版心两侧交替停留：文字一侧留给遮罩，形体一侧留白 */
const desktopKeyframes: Keyframe[] = [
  { progress: 0.0, posX: 2.32, posY: -0.16, posZ: 0, scale: 0.96, ringTilt: 1.05, glowOpacity: 0.56, glowHex: '#f2e3d0' },
  { progress: 0.22, posX: 2.2, posY: 0.6, posZ: -1.5, scale: 0.76, ringTilt: 0.78, glowOpacity: 0.36, glowHex: '#eee6d8' },
  { progress: 0.45, posX: -1.6, posY: 0.25, posZ: -2.4, scale: 1.12, ringTilt: 1.42, glowOpacity: 0.62, glowHex: '#e8e4ea' },
  { progress: 0.72, posX: 2.05, posY: -0.4, posZ: -2.0, scale: 0.88, ringTilt: 1.12, glowOpacity: 0.34, glowHex: '#eae5db' },
  { progress: 1.0, posX: -1.7, posY: -0.45, posZ: -0.6, scale: 1.06, ringTilt: 0.68, glowOpacity: 0.72, glowHex: '#f4ddce' },
];

const mobileKeyframes: Keyframe[] = [
  { progress: 0.0, posX: 0.98, posY: 1.5, posZ: -0.4, scale: 0.5, ringTilt: 1.05, glowOpacity: 0.4, glowHex: '#f2e3d0' },
  { progress: 0.25, posX: -0.72, posY: 1.42, posZ: -1.6, scale: 0.44, ringTilt: 0.8, glowOpacity: 0.28, glowHex: '#eee6d8' },
  { progress: 0.5, posX: 0.65, posY: -1.25, posZ: -1.8, scale: 0.66, ringTilt: 1.4, glowOpacity: 0.44, glowHex: '#e8e4ea' },
  { progress: 0.75, posX: -0.6, posY: 1.2, posZ: -2.0, scale: 0.46, ringTilt: 1.1, glowOpacity: 0.26, glowHex: '#eae5db' },
  { progress: 1.0, posX: 0.5, posY: -1.2, posZ: -0.8, scale: 0.6, ringTilt: 0.7, glowOpacity: 0.56, glowHex: '#f4ddce' },
];

function easeInOut(t: number) {
  return (1 - Math.cos(t * Math.PI)) / 2;
}

function interpolateKeyframes(keyframes: Keyframe[], progress: number): Keyframe {
  const p = Math.max(0, Math.min(1, progress));
  if (p <= keyframes[0].progress) return keyframes[0];
  const last = keyframes[keyframes.length - 1];
  if (p >= last.progress) return last;

  for (let i = 0; i < keyframes.length - 1; i++) {
    const k1 = keyframes[i];
    const k2 = keyframes[i + 1];
    if (p < k1.progress || p > k2.progress) continue;

    const eased = easeInOut((p - k1.progress) / (k2.progress - k1.progress));
    const glow = new THREE.Color(k1.glowHex).lerp(new THREE.Color(k2.glowHex), eased);

    return {
      progress: p,
      posX: THREE.MathUtils.lerp(k1.posX, k2.posX, eased),
      posY: THREE.MathUtils.lerp(k1.posY, k2.posY, eased),
      posZ: THREE.MathUtils.lerp(k1.posZ, k2.posZ, eased),
      scale: THREE.MathUtils.lerp(k1.scale, k2.scale, eased),
      ringTilt: THREE.MathUtils.lerp(k1.ringTilt, k2.ringTilt, eased),
      glowOpacity: THREE.MathUtils.lerp(k1.glowOpacity, k2.glowOpacity, eased),
      glowHex: '#' + glow.getHexString(),
    };
  }
  return keyframes[0];
}

/* 柔光池与接触阴影共用一个径向渐变烘焙函数 */
function createRadialTexture(stops: [number, string][]) {
  const size = 256;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');
  if (!ctx) return null;

  const gradient = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
  for (const [offset, color] of stops) gradient.addColorStop(offset, color);
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, size, size);

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

export default function SpatialCanvas() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [webGlAvailable, setWebGlAvailable] = useState(true);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isMobileViewport = () => window.innerWidth < 768;
    const isMobile = isMobileViewport();

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: !isMobile,
        alpha: true,
        powerPreference: 'high-performance',
      });
    } catch {
      setWebGlAvailable(false);
      return;
    }

    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, isMobile ? 1.25 : 1.5));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.14;
    container.appendChild(renderer.domElement);

    const scene = new THREE.Scene();

    /* 没有 HDR 资源，用程序化棚拍环境提供反射与折射的内容 —— 玻璃质感的关键 */
    const pmrem = new THREE.PMREMGenerator(renderer);
    const envRT = pmrem.fromScene(new RoomEnvironment(), 0.04);
    scene.environment = envRT.texture;

    const camera = new THREE.PerspectiveCamera(38, window.innerWidth / window.innerHeight, 0.1, 100);
    camera.position.set(0, 0, 8);

    const group = new THREE.Group();
    scene.add(group);

    const glassGeo = new THREE.SphereGeometry(1.28, isMobile ? 40 : 96, isMobile ? 28 : 64);
    const glassMat = new THREE.MeshPhysicalMaterial({
      color: new THREE.Color('#fbf7f1'),
      roughness: 0.02,
      metalness: 0,
      transmission: isMobile ? 0.72 : 1,
      thickness: 1.15,
      ior: 1.5,
      clearcoat: 0.1,
      clearcoatRoughness: 0.35,
      iridescence: 0.06,
      iridescenceIOR: 1.2,
      attenuationColor: new THREE.Color('#e8cba9'),
      attenuationDistance: 2.7,
      specularIntensity: 0.22,
      envMapIntensity: 0.5,
      transparent: true,
      opacity: isMobile ? 0.94 : 1,
    });
    const glass = new THREE.Mesh(glassGeo, glassMat);
    glass.scale.set(1, 0.94, 1);
    group.add(glass);

    /* 内核：被玻璃折射后形成暖色焦点，而不是靠自发光糊一片 */
    const coreGeo = new THREE.IcosahedronGeometry(0.13, 1);
    const coreMat = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#9c3f1e'),
      emissive: new THREE.Color('#b5502a'),
      emissiveIntensity: 0.34,
      roughness: 0.42,
      metalness: 0.12,
    });
    const core = new THREE.Mesh(coreGeo, coreMat);
    group.add(core);

    /* 两道极细的金属环：替代原来那条塑料感粗甜甜圈 */
    const ringMatA = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#c08a5a'),
      metalness: 1,
      roughness: 0.28,
    });
    const ringGeoA = new THREE.TorusGeometry(2.02, 0.006, 3, 260);
    const ringA = new THREE.Mesh(ringGeoA, ringMatA);

    const ringMatB = new THREE.MeshStandardMaterial({
      color: new THREE.Color('#77907f'),
      metalness: 0.95,
      roughness: 0.32,
      transparent: true,
      opacity: 0.85,
    });
    const ringGeoB = new THREE.TorusGeometry(2.62, 0.004, 3, 300);
    const ringB = new THREE.Mesh(ringGeoB, ringMatB);
    ringB.rotation.x = 1.9;
    ringB.rotation.z = 0.5;
    group.add(ringA, ringB);

    /* 氛围场：让玻璃有内容可折射，同时在纸面上留下柔和的暖色纵深 */
    const atmoTexture = createRadialTexture([
      [0, 'rgba(255,255,255,0.92)'],
      [0.42, 'rgba(255,255,255,0.44)'],
      [1, 'rgba(255,255,255,0)'],
    ]);
    const atmoGeo = new THREE.PlaneGeometry(19, 13);
    const atmoMat = new THREE.MeshBasicMaterial({
      color: new THREE.Color('#eeddc6'),
      transparent: true,
      opacity: 0.36,
      depthWrite: false,
      map: atmoTexture ?? undefined,
    });
    const atmo = new THREE.Mesh(atmoGeo, atmoMat);
    atmo.position.z = -6;
    scene.add(atmo);

    const glowTexture = createRadialTexture([
      [0, 'rgba(255,255,255,0.95)'],
      [0.28, 'rgba(255,255,255,0.42)'],
      [0.62, 'rgba(255,255,255,0.1)'],
      [1, 'rgba(255,255,255,0)'],
    ]);
    const glowGeo = new THREE.PlaneGeometry(9.5, 9.5);
    const glowMat = new THREE.MeshBasicMaterial({
      color: new THREE.Color('#f2e3d0'),
      transparent: true,
      opacity: 0.5,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      map: glowTexture ?? undefined,
    });
    const glow = new THREE.Mesh(glowGeo, glowMat);
    glow.position.z = -2.6;
    scene.add(glow);

    /* 接触阴影：形体下方一处极淡的压暗，去掉「漂浮玩具」的观感 */
    const shadowTexture = createRadialTexture([
      [0, 'rgba(88,72,54,0.5)'],
      [0.55, 'rgba(88,72,54,0.13)'],
      [1, 'rgba(88,72,54,0)'],
    ]);
    const shadowGeo = new THREE.PlaneGeometry(5.4, 3.2);
    const shadowMat = new THREE.MeshBasicMaterial({
      transparent: true,
      opacity: 0.42,
      depthWrite: false,
      map: shadowTexture ?? undefined,
    });
    const shadow = new THREE.Mesh(shadowGeo, shadowMat);
    shadow.position.set(0.4, -1.85, -2.2);
    scene.add(shadow);

    const keyLight = new THREE.DirectionalLight(0xfff2e2, 2.1);
    keyLight.position.set(4.5, 5, 6);
    scene.add(keyLight);

    const rimLight = new THREE.DirectionalLight(0xcfe0e6, 1.5);
    rimLight.position.set(-5, -2.5, -3);
    scene.add(rimLight);

    let isRunning = true;
    let isTabVisible = !document.hidden;
    let animationFrameId = 0;

    let targetScroll = 0;
    let currentScroll = 0;
    let pointerX = 0;
    let pointerY = 0;
    let easedX = 0;
    let easedY = 0;
    let intro = 0;

    const updateScroll = () => {
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      targetScroll = maxScroll > 0 ? window.scrollY / maxScroll : 0;
    };
    window.addEventListener('scroll', updateScroll, { passive: true });
    updateScroll();

    const handlePointerMove = (e: MouseEvent) => {
      if (prefersReducedMotion) return;
      pointerX = (e.clientX / window.innerWidth - 0.5) * 2;
      pointerY = (e.clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener('mousemove', handlePointerMove, { passive: true });

    const applyState = (elapsed: number) => {
      const keyframes = isMobileViewport() ? mobileKeyframes : desktopKeyframes;
      const state = interpolateKeyframes(keyframes, currentScroll);

      /* 入场 1.2s 缓动，避免刷新时形体突然砸进来 */
      const k = prefersReducedMotion ? 1 : Math.min(1, intro);
      const eased = 1 - Math.pow(1 - k, 3);

      group.position.set(
        state.posX + easedX * 0.42,
        state.posY - easedY * 0.36 + Math.sin(elapsed * 0.55) * 0.07,
        state.posZ,
      );
      group.scale.setScalar(state.scale * (0.9 + eased * 0.1));
      group.rotation.y = elapsed * 0.07 + easedX * 0.16 + currentScroll * Math.PI * 0.9;
      group.rotation.x = easedY * 0.1 + Math.sin(elapsed * 0.4) * 0.03;

      ringA.rotation.x = state.ringTilt + Math.sin(elapsed * 0.22) * 0.12;
      ringA.rotation.z = elapsed * 0.11;
      ringB.rotation.y = -elapsed * 0.075;

      core.rotation.x = elapsed * 0.34;
      core.rotation.y = elapsed * 0.42;

      glowMat.opacity = state.glowOpacity * eased;
      glowMat.color.set(state.glowHex);
      glow.position.set(group.position.x * 0.72, group.position.y * 0.72, -2.6);
      atmo.position.set(group.position.x * 0.45, group.position.y * 0.4, -6);
      shadow.position.set(group.position.x + 0.4, group.position.y - 1.72, -2.2);
      shadowMat.opacity = 0.42 * eased;

      /* 相机做视差而非移动形体：透视变化比平移更像「空间」 */
      camera.position.x += (easedX * 0.5 - camera.position.x) * 0.08;
      camera.position.y += (-easedY * 0.38 - camera.position.y) * 0.08;
      camera.lookAt(0, 0, 0);
    };

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
      updateScroll();
      if (prefersReducedMotion) {
        applyState(0);
        renderer.render(scene, camera);
      }
    };
    window.addEventListener('resize', handleResize);

    const clock = new THREE.Clock();

    function animate() {
      if (!isRunning) return;
      animationFrameId = requestAnimationFrame(animate);

      const elapsed = clock.getElapsedTime();
      currentScroll += (targetScroll - currentScroll) * 0.055;
      easedX += (pointerX * 0.5 - easedX) * 0.045;
      easedY += (pointerY * 0.5 - easedY) * 0.045;
      intro = Math.min(1, intro + 1 / 72);

      applyState(elapsed);
      renderer.render(scene, camera);
    }

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
      intro = 1;
      applyState(0);
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

      glassGeo.dispose();
      glassMat.dispose();
      coreGeo.dispose();
      coreMat.dispose();
      ringGeoA.dispose();
      ringMatA.dispose();
      ringGeoB.dispose();
      ringMatB.dispose();
      glowGeo.dispose();
      glowMat.dispose();
      glowTexture?.dispose();
      atmoGeo.dispose();
      atmoMat.dispose();
      atmoTexture?.dispose();
      shadowGeo.dispose();
      shadowMat.dispose();
      shadowTexture?.dispose();
      envRT.dispose();
      pmrem.dispose();
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
