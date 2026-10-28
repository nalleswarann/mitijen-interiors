import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

interface ArchitecturalHeroCanvasProps {
  currentImage: string;
  nextImage: string;
  transitionProgress: number; // 0.0 to 1.0
  className?: string;
  isPaused?: boolean;
}

const vertexShader = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = vec4(position.xy, 0.0, 1.0);
  }
`;

const fragmentShader = /* glsl */ `
  precision highp float;

  uniform sampler2D uTexture1;
  uniform sampler2D uTexture2;
  uniform float uProgress;
  uniform vec2 uResolution;
  uniform vec2 uTextureResolution;
  uniform vec2 uMouseOffset;
  uniform float uSlowZoom; // Subtle continuous drift [1.0 to 1.04]

  varying vec2 vUv;

  // Aspect-ratio cover mapping
  vec2 getCoverUv(vec2 uv, vec2 screenRes, vec2 texRes, float zoom, vec2 offset) {
    vec2 s = screenRes;
    vec2 i = texRes;
    float rs = s.x / s.y;
    float ri = i.x / i.y;
    vec2 newUv = (rs < ri)
      ? vec2(uv.x * (s.x / (s.y * ri)) + 0.5 * (1.0 - (s.x / (s.y * ri))), uv.y)
      : vec2(uv.x, uv.y * (s.y / (s.x / ri)) + 0.5 * (1.0 - (s.y / (s.x / ri))));

    // Apply slow cinematic scale from center
    newUv = (newUv - 0.5) / zoom + 0.5;

    // Apply ultra-subtle pointer parallax offset
    newUv += offset * 0.012;

    return clamp(newUv, 0.0, 1.0);
  }

  void main() {
    vec2 uv = vUv;

    // Compute aspect-corrected UV coordinates with slow zoom and mouse parallax
    vec2 uvCover = getCoverUv(uv, uResolution, uTextureResolution, uSlowZoom, uMouseOffset);

    // Transition displacement: peaks at uProgress = 0.5, returns to 0.0 at rest (0.0 or 1.0)
    float wave = sin(uProgress * 3.14159265);
    vec2 dispDirection = vec2(0.75, 0.35);

    vec2 uv1 = uvCover + dispDirection * (wave * 0.032 * (1.0 - uvCover.x));
    vec2 uv2 = uvCover - dispDirection * (wave * 0.032 * uvCover.x);

    // Sample both interior textures
    vec4 col1 = texture2D(uTexture1, clamp(uv1, 0.0, 1.0));
    vec4 col2 = texture2D(uTexture2, clamp(uv2, 0.0, 1.0));

    // Smooth architectural cross-dissolve
    float smoothT = smoothstep(0.0, 1.0, uProgress);
    gl_FragColor = mix(col1, col2, smoothT);
  }
`;

export const ArchitecturalHeroCanvas: React.FC<ArchitecturalHeroCanvasProps> = ({
  currentImage,
  nextImage,
  transitionProgress,
  className = '',
  isPaused = false
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [webglSupported, setWebglSupported] = useState(true);

  // References to Three.js objects
  const sceneRef = useRef<THREE.Scene | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const materialRef = useRef<THREE.ShaderMaterial | null>(null);
  const textureCacheRef = useRef<Map<string, THREE.Texture>>(new Map());
  const textureLoaderRef = useRef<THREE.TextureLoader | null>(null);

  // Continuous cinematic drift & mouse lerping
  const isPausedRef = useRef(isPaused);
  useEffect(() => {
    isPausedRef.current = isPaused;
  }, [isPaused]);

  const targetMouseRef = useRef({ x: 0, y: 0 });
  const currentMouseRef = useRef({ x: 0, y: 0 });
  const slowZoomRef = useRef(1.0);
  const zoomDirectionRef = useRef(1); // 1 for zoom in, -1 for zoom out
  const reqIdRef = useRef<number | null>(null);

  // Initialize Three.js scene once on mount
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Check WebGL availability
    try {
      const testCanvas = document.createElement('canvas');
      const gl = testCanvas.getContext('webgl') || testCanvas.getContext('experimental-webgl');
      if (!gl) {
        // eslint-disable-next-line react/set-state-in-effect
        setWebglSupported(false);
        return;
      }
    } catch {
      // eslint-disable-next-line react/set-state-in-effect
      setWebglSupported(false);
      return;
    }

    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;

    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

    const renderer = new THREE.WebGLRenderer({
      powerPreference: 'high-performance',
      antialias: false,
      alpha: false,
      stencil: false,
      depth: false,
      preserveDrawingBuffer: true
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.setSize(width, height);
    rendererRef.current = renderer;

    container.appendChild(renderer.domElement);

    const loader = new THREE.TextureLoader();
    textureLoaderRef.current = loader;

    // Create 1x1 placeholder texture to avoid black frame
    const placeholder = new THREE.DataTexture(
      new Uint8Array([20, 22, 26, 255]),
      1,
      1,
      THREE.RGBAFormat
    );
    placeholder.needsUpdate = true;

    // Shader Material
    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: {
        uTexture1: { value: placeholder },
        uTexture2: { value: placeholder },
        uProgress: { value: 0.0 },
        uResolution: { value: new THREE.Vector2(width, height) },
        uTextureResolution: { value: new THREE.Vector2(1920, 1080) },
        uMouseOffset: { value: new THREE.Vector2(0, 0) },
        uSlowZoom: { value: 1.0 }
      },
      depthWrite: false,
      depthTest: false
    });
    materialRef.current = material;

    const geometry = new THREE.PlaneGeometry(2, 2);
    const quad = new THREE.Mesh(geometry, material);
    scene.add(quad);

    // Continuous render loop (slow cinematic camera drift + smooth mouse lerp)
    let lastTime = performance.now();
    const renderLoop = (time: number) => {
      const delta = Math.min((time - lastTime) / 1000, 0.1);
      lastTime = time;

      // 1. Slow cinematic camera zoom drift (cycles slowly between 1.00 and 1.04 over ~28 seconds)
      if (!isPausedRef.current) {
        slowZoomRef.current += zoomDirectionRef.current * (delta * 0.0018);
        if (slowZoomRef.current >= 1.04) {
          slowZoomRef.current = 1.04;
          zoomDirectionRef.current = -1;
        } else if (slowZoomRef.current <= 1.0) {
          slowZoomRef.current = 1.0;
          zoomDirectionRef.current = 1;
        }
      }

      // 2. Smooth pointer parallax lerping
      currentMouseRef.current.x += (targetMouseRef.current.x - currentMouseRef.current.x) * 0.04;
      currentMouseRef.current.y += (targetMouseRef.current.y - currentMouseRef.current.y) * 0.04;

      if (materialRef.current) {
        materialRef.current.uniforms.uSlowZoom.value = slowZoomRef.current;
        materialRef.current.uniforms.uMouseOffset.value.set(
          currentMouseRef.current.x,
          currentMouseRef.current.y
        );
      }

      renderer.render(scene, camera);
      reqIdRef.current = requestAnimationFrame(renderLoop);
    };

    reqIdRef.current = requestAnimationFrame(renderLoop);

    // Resize handler with threshold and synchronous render to prevent disappearing frames
    let lastW = width;
    let lastH = height;
    const handleResize = () => {
      if (!container || !rendererRef.current || !materialRef.current) return;
      const w = container.clientWidth || window.innerWidth;
      const h = container.clientHeight || window.innerHeight;
      if (Math.abs(w - lastW) < 4 && Math.abs(h - lastH) < 4) return;
      lastW = w;
      lastH = h;
      rendererRef.current.setSize(w, h);
      materialRef.current.uniforms.uResolution.value.set(w, h);
      rendererRef.current.render(scene, camera);
    };

    window.addEventListener('resize', handleResize, { passive: true });
    window.addEventListener('orientationchange', handleResize, { passive: true });

    let resizeObserver: ResizeObserver | null = null;
    if (typeof ResizeObserver !== 'undefined') {
      resizeObserver = new ResizeObserver(handleResize);
      resizeObserver.observe(container);
    }

    // Desktop pointer movement
    const handleMouseMove = (e: MouseEvent) => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      targetMouseRef.current = {
        x: (e.clientX / w - 0.5) * 2,
        y: -(e.clientY / h - 0.5) * 2
      };
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    return () => {
      if (reqIdRef.current) cancelAnimationFrame(reqIdRef.current);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('orientationchange', handleResize);
      if (resizeObserver) resizeObserver.disconnect();
      window.removeEventListener('mousemove', handleMouseMove);

      if (renderer.domElement && container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }

      geometry.dispose();
      material.dispose();
      renderer.dispose();
    };
  }, []);

  // Texture Loader Helper
  const loadTexture = (url: string): Promise<THREE.Texture> => {
    return new Promise((resolve) => {
      if (textureCacheRef.current.has(url)) {
        resolve(textureCacheRef.current.get(url)!);
        return;
      }

      if (!textureLoaderRef.current) {
        const loader = new THREE.TextureLoader();
        textureLoaderRef.current = loader;
      }

      textureLoaderRef.current.load(
        url,
        (tex) => {
          tex.minFilter = THREE.LinearFilter;
          tex.magFilter = THREE.LinearFilter;
          tex.generateMipmaps = false;
          textureCacheRef.current.set(url, tex);
          resolve(tex);
        },
        undefined,
        () => {
          // Fallback if texture fails
          const canvas = document.createElement('canvas');
          canvas.width = 1920;
          canvas.height = 1080;
          const ctx = canvas.getContext('2d');
          if (ctx) {
            ctx.fillStyle = '#181c20';
            ctx.fillRect(0, 0, 1920, 1080);
          }
          const fallbackTex = new THREE.CanvasTexture(canvas);
          textureCacheRef.current.set(url, fallbackTex);
          resolve(fallbackTex);
        }
      );
    });
  };

  // Preload all 3 banner images on mount for instantaneous transitions
  useEffect(() => {
    ['/assets/mitijen/Banner1.jpg', '/assets/mitijen/Banner2.jpg', '/assets/mitijen/Banner3.jpg'].forEach((url) => {
      loadTexture(url);
    });
  }, []);

  // Update textures when currentImage or nextImage changes
  useEffect(() => {
    let isCurrent = true;

    Promise.all([loadTexture(currentImage), loadTexture(nextImage)]).then(([tex1, tex2]) => {
      if (!isCurrent || !materialRef.current) return;

      materialRef.current.uniforms.uTexture1.value = tex1;
      materialRef.current.uniforms.uTexture2.value = tex2;

      // Extract image resolution for proper aspect ratio cover calculation
      const naturalWidth = tex1.image?.naturalWidth || tex1.image?.width || 1920;
      const naturalHeight = tex1.image?.naturalHeight || tex1.image?.height || 1080;
      materialRef.current.uniforms.uTextureResolution.value.set(naturalWidth, naturalHeight);
    });

    return () => {
      isCurrent = false;
    };
  }, [currentImage, nextImage]);

  // Update transition progress (driven seamlessly by GSAP)
  useEffect(() => {
    if (materialRef.current) {
      materialRef.current.uniforms.uProgress.value = transitionProgress;
    }
  }, [transitionProgress]);

  // CSS Fallback if WebGL is unsupported
  if (!webglSupported) {
    return (
      <div className={`arch-canvas-fallback ${className}`} aria-hidden="true">
        <img
          src={currentImage}
          alt=""
          className="arch-fallback-img"
          loading="eager"
          decoding="async"
        />
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className={`arch-hero-canvas ${className}`}
      aria-hidden="true"
    >
      <img
        src={currentImage}
        alt=""
        className="arch-canvas-underlay"
        loading="eager"
        decoding="async"
      />
    </div>
  );
};

export default ArchitecturalHeroCanvas;
