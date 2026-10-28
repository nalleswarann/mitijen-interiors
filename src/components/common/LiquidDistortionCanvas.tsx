import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import {
  DEFAULT_LIQUID_CONFIG,
  liquidFragmentShader,
  liquidVertexShader
} from '../../utils/liquidShader';
import type { LiquidDistortionConfig } from '../../utils/liquidShader';

// Shared texture cache to prevent duplicate GPU memory allocations
const textureCache = new Map<string, THREE.Texture>();
const textureLoader = new THREE.TextureLoader();

function loadCachedTexture(src: string): Promise<THREE.Texture> {
  if (textureCache.has(src)) {
    return Promise.resolve(textureCache.get(src)!);
  }
  return new Promise((resolve, reject) => {
    textureLoader.load(
      src,
      (tex) => {
        tex.colorSpace = THREE.NoColorSpace;
        tex.minFilter = THREE.LinearFilter;
        tex.magFilter = THREE.LinearFilter;
        tex.generateMipmaps = false;
        textureCache.set(src, tex);
        resolve(tex);
      },
      undefined,
      reject
    );
  });
}

function checkWebGLSupport(): boolean {
  try {
    const testCanvas = document.createElement('canvas');
    return Boolean(
      window.WebGLRenderingContext &&
        (testCanvas.getContext('webgl2') ||
          testCanvas.getContext('webgl') ||
          testCanvas.getContext('experimental-webgl'))
    );
  } catch {
    return false;
  }
}

interface LiquidDistortionCanvasProps {
  src: string;
  isHero?: boolean;
  options?: Partial<LiquidDistortionConfig>;
  className?: string;
  style?: React.CSSProperties;
  containerRef?: React.RefObject<HTMLDivElement | null>;
  externalTriggerRef?: React.RefObject<HTMLElement | null>;
  onReady?: () => void;
}

interface TrailItem {
  x: number;
  y: number;
  age: number;
  strength: number;
}

export const LiquidDistortionCanvas: React.FC<LiquidDistortionCanvasProps> = ({
  src,
  isHero = false,
  options = {},
  className = '',
  style,
  containerRef,
  externalTriggerRef,
  onReady
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const internalContainerRef = useRef<HTMLDivElement>(null);
  const [isSupported, setIsSupported] = useState(true);
  const [isReady, setIsReady] = useState(false);

  // Configuration merged with defaults
  const config = { ...DEFAULT_LIQUID_CONFIG, ...options };

  useEffect(() => {
    const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (isReducedMotion || !checkWebGLSupport()) {
      // eslint-disable-next-line react/set-state-in-effect
      setIsSupported(false);
      return;
    }

    const canvas = canvasRef.current;
    const hostEl = containerRef?.current || internalContainerRef.current?.parentElement || canvas?.parentElement;
    if (!canvas || !hostEl) return;

    // Find the primary trigger element (for Hero, the hero section element)
    const heroSection = hostEl.closest('.hero') as HTMLElement | null;
    const triggerEl = externalTriggerRef?.current || heroSection || hostEl;

    let isDisposed = false;
    let rafId = 0;
    let isLoopRunning = false;
    let isHovered = false;
    let isInitialized = false;

    // Dynamics state
    let currentIntensity = 0;
    let targetIntensity = 0;
    let lastTime = performance.now();
    let lastPointerTime = performance.now();
    let currentPointerX = 0.5;
    let currentPointerY = 0.5;
    let velocityX = 0;
    let velocityY = 0;
    let lastClientX = -9999;
    let lastClientY = -9999;
    let lastPixelX = -9999;
    let lastPixelY = -9999;

    // Trail buffer (8 ripples max)
    const MAX_TRAIL = 8;
    const trails: TrailItem[] = Array.from({ length: MAX_TRAIL }, () => ({
      x: 0,
      y: 0,
      age: 1.0,
      strength: 0
    }));
    let trailHead = 0;
    let lastTrailAdd = 0;

    const trailVectors = Array.from({ length: MAX_TRAIL }, () => new THREE.Vector4(0, 0, 1, 0));

    // Three.js instances
    let renderer: THREE.WebGLRenderer | null = null;
    let scene: THREE.Scene | null = null;
    let camera: THREE.OrthographicCamera | null = null;
    let geometry: THREE.PlaneGeometry | null = null;
    let material: THREE.ShaderMaterial | null = null;
    let uniforms: any = null;

    const updateDimensions = () => {
      if (isDisposed || !renderer || !uniforms || !hostEl) return;
      const w = hostEl.clientWidth || window.innerWidth;
      const h = hostEl.clientHeight || window.innerHeight;
      if (w === 0 || h === 0) return;

      renderer.setSize(w, h, false);
      uniforms.uResolution.value.set(w, h);
    };

    const initWebGL = () => {
      if (isInitialized || isDisposed) return;
      isInitialized = true;

      try {
        renderer = new THREE.WebGLRenderer({
          canvas,
          alpha: true,
          antialias: false,
          powerPreference: 'high-performance'
        });
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

        scene = new THREE.Scene();
        camera = new THREE.OrthographicCamera(-1, 1, 1, -1, -10, 10);
        camera.position.set(0, 0, 1);
        geometry = new THREE.PlaneGeometry(2, 2);

        const initialW = hostEl.clientWidth || window.innerWidth;
        const initialH = hostEl.clientHeight || window.innerHeight;

        uniforms = {
          uTexture: { value: null as THREE.Texture | null },
          uResolution: { value: new THREE.Vector2(initialW, initialH) },
          uImageResolution: { value: new THREE.Vector2(1, 1) },
          uMouse: { value: new THREE.Vector2(0.5, 0.5) },
          uVelocity: { value: new THREE.Vector2(0, 0) },
          uIntensity: { value: 0 },
          uTime: { value: 0 },
          uStrength: { value: config.strength },
          uRadius: { value: config.radius },
          uWaveFreq: { value: new THREE.Vector2(config.waveFrequency.x, config.waveFrequency.y) },
          uWaveSpeed: { value: config.waveSpeed },
          uDispersion: { value: config.dispersion },
          uTrail: { value: trailVectors }
        };

        material = new THREE.ShaderMaterial({
          vertexShader: liquidVertexShader,
          fragmentShader: liquidFragmentShader,
          uniforms,
          transparent: true,
          depthTest: false,
          depthWrite: false
        });

        const mesh = new THREE.Mesh(geometry, material);
        scene.add(mesh);

        updateDimensions();

        loadCachedTexture(src)
          .then((texture) => {
            if (isDisposed || !material || !uniforms) return;
            uniforms.uTexture.value = texture;

            const img = texture.image as HTMLImageElement;
            if (img && img.naturalWidth && img.naturalHeight) {
              uniforms.uImageResolution.value.set(img.naturalWidth, img.naturalHeight);
            } else if (img && img.width && img.height) {
              uniforms.uImageResolution.value.set(img.width, img.height);
            }

            material.needsUpdate = true;
            if (renderer && scene && camera) {
              try {
                renderer.render(scene, camera);
              } catch {
                // ignore
              }
            }
            setIsReady(true);
            onReady?.();
          })
          .catch((err) => {
            console.warn('Failed to load texture for liquid canvas:', err);
          });
      } catch (err) {
        console.warn('Could not initialize WebGL for plate:', err);
        setIsSupported(false);
      }
    };

    // Add trail point
    const addTrailPoint = (x: number, y: number, strength: number) => {
      trails[trailHead] = {
        x,
        y,
        age: 0,
        strength: Math.min(1.0, strength)
      };
      trailHead = (trailHead + 1) % MAX_TRAIL;
    };

    // Render loop
    const frame = () => {
      if (isDisposed || !renderer || !scene || !camera || !uniforms) {
        isLoopRunning = false;
        return;
      }

      const now = performance.now();
      const dt = Math.min((now - lastTime) / 1000, 0.05);
      lastTime = now;

      uniforms.uTime.value += dt;

      // Mouse motion decay check
      const timeSinceMove = now - lastPointerTime;
      if (timeSinceMove > 150) {
        targetIntensity = 0;
        velocityX *= 0.85;
        velocityY *= 0.85;
      }

      // Smooth intensity interpolation
      if (targetIntensity > currentIntensity) {
        currentIntensity += (targetIntensity - currentIntensity) * 0.35;
      } else {
        currentIntensity *= config.recoverySpeed;
        if (currentIntensity < 0.0002) currentIntensity = 0;
      }

      uniforms.uIntensity.value = currentIntensity;
      uniforms.uMouse.value.set(currentPointerX, currentPointerY);
      uniforms.uVelocity.value.set(velocityX, velocityY);

      // Update trail points
      let activeTrails = 0;
      for (let i = 0; i < MAX_TRAIL; i++) {
        const tr = trails[i];
        if (tr.strength > 0.001) {
          tr.age += dt * 1.5; // reaches 1.0 in ~0.65s
          if (tr.age >= 1.0) {
            tr.strength = 0;
          } else {
            activeTrails++;
          }
        }
        trailVectors[i].set(tr.x, tr.y, tr.age, tr.strength);
      }

      if (uniforms?.uTexture?.value) {
        try {
          renderer.render(scene, camera);
        } catch (err) {
          console.warn('WebGL render safely handled:', err);
        }
      }

      // Check if animation can rest
      if (currentIntensity === 0 && activeTrails === 0 && !isHovered) {
        isLoopRunning = false;
        return; // Halt RAF loop until next interaction
      }

      rafId = requestAnimationFrame(frame);
    };

    const wakeLoop = () => {
      if (!isInitialized) {
        initWebGL();
      }
      if (!isLoopRunning && !isDisposed) {
        isLoopRunning = true;
        lastTime = performance.now();
        rafId = requestAnimationFrame(frame);
      }
    };

    // Pointer event listeners
    const handlePointerEnter = (e: PointerEvent) => {
      if (e.pointerType === 'touch') return;
      isHovered = true;
      if (!isInitialized) {
        initWebGL();
      }
      const rect = hostEl.getBoundingClientRect();
      const x = Math.max(0, Math.min(1, (e.clientX - rect.left) / (rect.width || 1)));
      const y = Math.max(0, Math.min(1, 1.0 - (e.clientY - rect.top) / (rect.height || 1)));

      currentPointerX = x;
      currentPointerY = y;
      lastPixelX = e.clientX;
      lastPixelY = e.clientY;
      lastClientX = e.clientX;
      lastClientY = e.clientY;
      lastPointerTime = performance.now();

      targetIntensity = 0.50;
      wakeLoop();
    };

    const handlePointerMove = (e: PointerEvent) => {
      if (e.pointerType === 'touch') return;
      // Prevent duplicate processing in the same frame
      if (e.clientX === lastClientX && e.clientY === lastClientY) return;
      lastClientX = e.clientX;
      lastClientY = e.clientY;

      isHovered = true;
      if (!isInitialized) {
        initWebGL();
      }
      const rect = hostEl.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) return;

      const x = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
      const y = Math.max(0, Math.min(1, 1.0 - (e.clientY - rect.top) / rect.height));

      const now = performance.now();
      let dt = (now - lastPointerTime) / 1000;
      if (dt <= 0.0001 || dt > 0.25) dt = 0.016;
      lastPointerTime = now;

      // Physical screen pixel speed (consistent across cards and full-screen hero)
      let pixelDx = 0;
      let pixelDy = 0;
      if (lastPixelX !== -9999 && lastPixelY !== -9999) {
        pixelDx = e.clientX - lastPixelX;
        pixelDy = e.clientY - lastPixelY;
      } else {
        pixelDx = 2.0;
        pixelDy = 2.0;
      }
      lastPixelX = e.clientX;
      lastPixelY = e.clientY;

      const pixelDist = Math.hypot(pixelDx, pixelDy);
      const pixelSpeed = pixelDist / dt; // pixels per second

      // 180px/s reaches full ripple responsiveness
      const normSpeed = Math.min(1.0, (pixelSpeed / 180.0) * config.velocityFactor);
      targetIntensity = Math.min(0.95, 0.45 + normSpeed * 0.50);

      const vx = (pixelDx / rect.width) / dt;
      const vy = -(pixelDy / rect.height) / dt;
      velocityX = velocityX * 0.4 + vx * 0.6 * 0.05;
      velocityY = velocityY * 0.4 + vy * 0.6 * 0.05;

      currentPointerX = x;
      currentPointerY = y;

      if (pixelDist > 6 || (now - lastTrailAdd > 35 && pixelDist > 1.5)) {
        addTrailPoint(x, y, Math.min(0.95, 0.45 + normSpeed * 0.50));
        lastTrailAdd = now;
      }

      wakeLoop();
    };

    const handlePointerLeave = () => {
      isHovered = false;
      targetIntensity = 0;
      lastPixelX = -9999;
      lastPixelY = -9999;
      lastClientX = -9999;
      lastClientY = -9999;
      wakeLoop();
    };

    // Attach listeners directly to hostEl and triggerEl for ALL plates (cards and hero alike)
    const targets = new Set<HTMLElement>();
    if (hostEl) targets.add(hostEl);
    if (triggerEl) targets.add(triggerEl);

    targets.forEach((el) => {
      el.addEventListener('pointerenter', handlePointerEnter as EventListener);
      el.addEventListener('pointermove', handlePointerMove as EventListener);
      el.addEventListener('pointerleave', handlePointerLeave as EventListener);
    });

    // Global window pointer tracker for Hero banner as fallback
    const handleWindowPointer = (e: PointerEvent) => {
      if (isDisposed) return;
      if (e.pointerType === 'touch') return;
      const el = triggerEl || hostEl;
      if (!el) return;
      const r = el.getBoundingClientRect();
      const inHero = (
        e.clientX >= r.left &&
        e.clientX <= r.right &&
        e.clientY >= r.top &&
        e.clientY <= r.bottom
      );
      if (inHero) {
        if (!isHovered) {
          handlePointerEnter(e);
        } else {
          handlePointerMove(e);
        }
      } else if (isHovered) {
        handlePointerLeave();
      }
    };

    if (isHero) {
      window.addEventListener('pointermove', handleWindowPointer, { passive: true });
    }

    // Resize observer
    const ro = new ResizeObserver(() => {
      updateDimensions();
      if (renderer && scene && camera && uniforms?.uTexture?.value) {
        try {
          renderer.render(scene, camera);
        } catch {
          // ignore
        }
      }
    });
    ro.observe(hostEl);

    // Context loss
    const handleContextLost = (e: Event) => {
      e.preventDefault();
      cancelAnimationFrame(rafId);
      setIsSupported(false);
    };
    canvas.addEventListener('webglcontextlost', handleContextLost);

    // Defer WebGL initialization until hover to prevent browser WebGL context limits (16 max)
    if (isHero) {
      initWebGL();
    }

    return () => {
      isDisposed = true;
      cancelAnimationFrame(rafId);
      ro.disconnect();

      targets.forEach((el) => {
        el.removeEventListener('pointerenter', handlePointerEnter as EventListener);
        el.removeEventListener('pointermove', handlePointerMove as EventListener);
        el.removeEventListener('pointerleave', handlePointerLeave as EventListener);
      });

      if (isHero) {
        window.removeEventListener('pointermove', handleWindowPointer);
      }

      canvas.removeEventListener('webglcontextlost', handleContextLost);

      if (geometry) geometry.dispose();
      if (material) material.dispose();
      if (renderer) renderer.dispose();
    };
  }, [src, isHero, config.strength, config.radius, config.recoverySpeed, config.waveSpeed, config.waveFrequency.x, config.waveFrequency.y, config.dispersion, config.velocityFactor, onReady, containerRef, externalTriggerRef]);

  if (!isSupported) {
    return null;
  }

  return (
    <div
      ref={internalContainerRef}
      className={`liquid-canvas-wrap ${className}`.trim()}
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        overflow: 'hidden',
        zIndex: 1,
        opacity: isReady ? 1 : 0,
        ...style
      }}
    >
      <canvas
        ref={canvasRef}
        style={{
          display: 'block',
          width: '100%',
          height: '100%',
          pointerEvents: 'none'
        }}
        aria-hidden="true"
      />
    </div>
  );
};
