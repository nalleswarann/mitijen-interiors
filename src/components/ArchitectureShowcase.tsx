import React, { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';
import { ARCHITECTURE_VIEWS } from '../data/architecture';
import type { LightingMode, Hotspot } from '../data/architecture';
import '../styles/ArchitectureShowcase.css';

export const ArchitectureShowcase: React.FC = () => {
  const stageRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [activeViewIdx, setActiveViewIdx] = useState(0);
  const [activeSpot, setActiveSpot] = useState<Hotspot | null>(null);
  const [lighting, setLighting] = useState<LightingMode>('daylight');
  const [isAutoOrbit, setIsAutoOrbit] = useState(true);
  const [isDragging, setIsDragging] = useState(false);
  const [hasInteracted, setHasInteracted] = useState(false);
  const [isLoadingTexture, setIsLoadingTexture] = useState(true);
  const [isDissolving, setIsDissolving] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Screen-projected hotspots
  const [screenSpots, setScreenSpots] = useState<
    Array<{ spot: Hotspot; left: number; top: number; visible: boolean; index: number }>
  >([]);

  const activeView = ARCHITECTURE_VIEWS[activeViewIdx];

  // 360 Orbit State ref (for 60fps render loop without unnecessary React re-renders)
  const orbitState = useRef({
    lon: 180,
    lat: 0,
    targetLon: 180,
    targetLat: 0,
    fov: 70,
    targetFov: 70,
    isPointerDown: false,
    startX: 0,
    startY: 0,
    startLon: 180,
    startLat: 0,
    idleTimer: 0
  });

  // Three.js instances ref
  const threeRef = useRef<{
    scene: THREE.Scene;
    camera: THREE.PerspectiveCamera;
    renderer: THREE.WebGLRenderer;
    sphereMesh: THREE.Mesh<THREE.SphereGeometry, THREE.MeshBasicMaterial>;
    textureLoader: THREE.TextureLoader;
    cachedTextures: Record<string, THREE.Texture>;
  } | null>(null);

  // Switch viewpoint with smooth dissolve transition
  const handleSelectView = useCallback((index: number) => {
    if (index === activeViewIdx) return;
    setIsDissolving(true);
    setActiveSpot(null);
    orbitState.current.lon = 180;
    orbitState.current.targetLon = 180;
    orbitState.current.lat = 0;
    orbitState.current.targetLat = 0;

    setTimeout(() => {
      setActiveViewIdx(index);
    }, 180);
  }, [activeViewIdx]);

  // Reset view to front origin
  const handleResetView = () => {
    orbitState.current.targetLon = 180;
    orbitState.current.targetLat = 0;
    orbitState.current.targetFov = 70;
    setActiveSpot(null);
  };

  // Zoom controls
  const handleZoom = (delta: number) => {
    const nextFov = Math.max(45, Math.min(85, orbitState.current.targetFov + delta));
    orbitState.current.targetFov = nextFov;
  };

  // Fullscreen toggle
  const handleToggleFullscreen = () => {
    if (!stageRef.current) return;
    if (!document.fullscreenElement) {
      stageRef.current.requestFullscreen().then(() => setIsFullscreen(true)).catch(() => {});
    } else {
      document.exitFullscreen().then(() => setIsFullscreen(false)).catch(() => {});
    }
  };

  // Setup Three.js 360 Panorama Sphere
  /* oxlint-disable react-hooks/exhaustive-deps */
  useEffect(() => {
    const canvas = canvasRef.current;
    const stage = stageRef.current;
    if (!canvas || !stage) return;

    const width = stage.clientWidth || 800;
    const height = stage.clientHeight || 500;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(70, width / height, 1, 1100);

    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      powerPreference: 'high-performance'
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height, false);

    // Inverted 360 Sphere (texture on inside)
    const geometry = new THREE.SphereGeometry(500, 60, 40);
    geometry.scale(-1, 1, 1);
    const material = new THREE.MeshBasicMaterial({ color: 0xffffff });
    const sphereMesh = new THREE.Mesh(geometry, material);
    scene.add(sphereMesh);

    const textureLoader = new THREE.TextureLoader();
    threeRef.current = {
      scene,
      camera,
      renderer,
      sphereMesh,
      textureLoader,
      cachedTextures: {}
    };

    // Load initial texture
    setIsLoadingTexture(true);
    textureLoader.load(
      activeView.panorama,
      (texture) => {
        texture.colorSpace = THREE.SRGBColorSpace;
        texture.minFilter = THREE.LinearFilter;
        material.map = texture;
        material.needsUpdate = true;
        threeRef.current!.cachedTextures[activeView.panorama] = texture;
        setIsLoadingTexture(false);
      },
      undefined,
      () => setIsLoadingTexture(false)
    );

    // Resize Observer
    const ro = new ResizeObserver(() => {
      if (!stage || !threeRef.current) return;
      const w = stage.clientWidth;
      const h = stage.clientHeight;
      if (w === 0 || h === 0) return;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h, false);
    });
    ro.observe(stage);

    // Animation Render Loop (Optimized to pause when offscreen and avoid scroll lag)
    let animId: number = 0;
    let isVisible = true;
    let hasProjectedInitial = false;

    const renderLoop = () => {
      if (!isVisible) {
        animId = 0;
        return;
      }
      animId = requestAnimationFrame(renderLoop);
      const st = orbitState.current;

      const isDamping = Math.abs(st.targetLon - st.lon) > 0.01 ||
                        Math.abs(st.targetLat - st.lat) > 0.01 ||
                        Math.abs(st.targetFov - st.fov) > 0.01 ||
                        st.isPointerDown ||
                        isAutoOrbit;

      // Auto 360 Orbit rotation when idle and enabled
      if (isAutoOrbit && !st.isPointerDown) {
        st.targetLon += 0.06;
      }

      // Smooth physics damping
      st.lon += (st.targetLon - st.lon) * 0.08;
      st.lat += (st.targetLat - st.lat) * 0.08;
      st.fov += (st.targetFov - st.fov) * 0.08;

      camera.fov = st.fov;
      camera.updateProjectionMatrix();

      // Convert Lon/Lat (Spherical) to Cartesian coordinates
      const phi = THREE.MathUtils.degToRad(90 - st.lat);
      const theta = THREE.MathUtils.degToRad(st.lon);

      const lookTarget = new THREE.Vector3(
        500 * Math.sin(phi) * Math.cos(theta),
        500 * Math.cos(phi),
        500 * Math.sin(phi) * Math.sin(theta)
      );

      camera.lookAt(lookTarget);
      renderer.render(scene, camera);

      // Only project 3D Hotspot positions to 2D screen space when moving or on first frame (prevents scroll lag)
      if (isDamping || !hasProjectedInitial) {
        hasProjectedInitial = true;
        const currentView = ARCHITECTURE_VIEWS[activeViewIdx];
        const stageW = stage.clientWidth;
        const stageH = stage.clientHeight;
        const spotRadius = 450;

        const projected = currentView.spots.map((spot, idx) => {
          const sPhi = THREE.MathUtils.degToRad(90 - spot.pitch);
          const sTheta = THREE.MathUtils.degToRad(spot.yaw);

          const pos = new THREE.Vector3(
            spotRadius * Math.sin(sPhi) * Math.cos(sTheta),
            spotRadius * Math.cos(sPhi),
            spotRadius * Math.sin(sPhi) * Math.sin(sTheta)
          );

          pos.project(camera);

          const isVisible = pos.z < 1;
          const left = (pos.x * 0.5 + 0.5) * stageW;
          const top = (-pos.y * 0.5 + 0.5) * stageH;

          return {
            spot,
            left,
            top,
            visible: isVisible && left >= -20 && left <= stageW + 20 && top >= -20 && top <= stageH + 20,
            index: idx
          };
        });

        setScreenSpots(projected);
      }
    };

    animId = requestAnimationFrame(renderLoop);

    const io = new IntersectionObserver(([entry]) => {
      isVisible = entry.isIntersecting;
      if (isVisible && !animId) {
        animId = requestAnimationFrame(renderLoop);
      }
    }, { threshold: 0.02 });
    io.observe(stage);

    return () => {
      if (animId) cancelAnimationFrame(animId);
      io.disconnect();
      ro.disconnect();
      renderer.dispose();
      geometry.dispose();
      material.dispose();
      threeRef.current = null;
    };
  }, []);

  // Update Panorama Texture on Viewpoint change with smooth reveal
  useEffect(() => {
    if (!threeRef.current) return;
    const { textureLoader, sphereMesh, cachedTextures } = threeRef.current;
    const targetUrl = activeView.panorama;

    if (cachedTextures[targetUrl]) {
      sphereMesh.material.map = cachedTextures[targetUrl];
      sphereMesh.material.needsUpdate = true;
      setIsLoadingTexture(false);
      setTimeout(() => setIsDissolving(false), 80);
    } else {
      setIsLoadingTexture(true);
      textureLoader.load(
        targetUrl,
        (texture) => {
          texture.colorSpace = THREE.SRGBColorSpace;
          texture.minFilter = THREE.LinearFilter;
          sphereMesh.material.map = texture;
          sphereMesh.material.needsUpdate = true;
          cachedTextures[targetUrl] = texture;
          setIsLoadingTexture(false);
          setTimeout(() => setIsDissolving(false), 80);
        },
        undefined,
        () => {
          setIsLoadingTexture(false);
          setIsDissolving(false);
        }
      );
    }
  }, [activeView.panorama]);

  // Pointer Interaction Handlers for 360 drag
  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if ((e.target as HTMLElement).closest('.arch-hotspot-marker') || (e.target as HTMLElement).closest('.arch-spec-card')) {
      return;
    }
    const st = orbitState.current;
    st.isPointerDown = true;
    st.startX = e.clientX;
    st.startY = e.clientY;
    st.startLon = st.lon;
    st.startLat = st.lat;
    setIsDragging(true);
    setHasInteracted(true);

    if (stageRef.current) {
      stageRef.current.setPointerCapture(e.pointerId);
    }
  };

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const st = orbitState.current;
    if (!st.isPointerDown) return;
    const dx = e.clientX - st.startX;
    const dy = e.clientY - st.startY;

    const sensitivity = 0.18;
    st.targetLon = st.startLon - dx * sensitivity;
    st.targetLat = Math.max(-75, Math.min(75, st.startLat + dy * sensitivity));
  };

  const onPointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    orbitState.current.isPointerDown = false;
    setIsDragging(false);
    try {
      if (stageRef.current && stageRef.current.hasPointerCapture(e.pointerId)) {
        stageRef.current.releasePointerCapture(e.pointerId);
      }
    } catch {
      // safe fallback
    }
  };

  const onWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    e.preventDefault();
    const delta = e.deltaY * 0.05;
    orbitState.current.targetFov = Math.max(45, Math.min(85, orbitState.current.targetFov + delta));
  };

  return (
    <section className="arch-showcase-section" id="services" aria-labelledby="arch-heading">
      <div className="arch-showcase-container">
        {/* 1. Minimalist Editorial Header */}
        <div className="arch-header">
          <div className="arch-header-left">
            <span className="arch-kicker">IMMERSIVE SPATIAL ARCHITECTURE</span>
            <h2 id="arch-heading" className="arch-title">
              360° Spatial Craft & Materiality.
            </h2>
          </div>
          <div className="arch-header-right">
            <p className="arch-header-desc">
              Explore real Mitjen architectural installations in interactive 360° space. Rotate to inspect handcrafted millwork, tactile finishes, and dynamic light studies.
            </p>
          </div>
        </div>

        {/* 2. Unified Floating Architectural Toolbar */}
        <div className="arch-toolbar" role="toolbar" aria-label="360 Showcase Navigation & Controls">
          {/* Scene Selector Tabs */}
          <div className="arch-scene-tabs" role="tablist" aria-label="Architectural scenes">
            {ARCHITECTURE_VIEWS.map((view, i) => (
              <button
                key={view.id}
                role="tab"
                type="button"
                aria-selected={activeViewIdx === i}
                className={`arch-scene-btn ${activeViewIdx === i ? 'is-active' : ''}`}
                onClick={() => handleSelectView(i)}
              >
                
                <span>{view.name.split('&')[0].trim()}</span>
              </button>
            ))}
          </div>

          {/* Right Action Group: Atmosphere & Controls */}
          <div className="arch-toolbar-actions">
            {/* Atmospheric Lighting Mode Switcher */}
            <div className="arch-lighting-group" role="group" aria-label="Atmospheric lighting">
              <button
                type="button"
                className={`arch-light-btn ${lighting === 'daylight' ? 'is-active' : ''}`}
                onClick={() => setLighting('daylight')}
                title="Natural high-contrast architectural daylight"
                aria-pressed={lighting === 'daylight'}
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <circle cx="12" cy="12" r="5" />
                  <line x1="12" y1="1" x2="12" y2="4" />
                  <line x1="12" y1="20" x2="12" y2="23" />
                  <line x1="1" y1="12" x2="4" y2="12" />
                  <line x1="20" y1="12" x2="23" y2="12" />
                  <line x1="4.22" y1="4.22" x2="6.34" y2="6.34" />
                  <line x1="17.66" y1="17.66" x2="19.78" y2="19.78" />
                  <line x1="4.22" y1="19.78" x2="6.34" y2="17.66" />
                  <line x1="17.66" y1="6.34" x2="19.78" y2="4.22" />
                </svg>
                <span>Daylight</span>
              </button>

              <button
                type="button"
                className={`arch-light-btn ${lighting === 'golden' ? 'is-active' : ''}`}
                onClick={() => setLighting('golden')}
                title="Warm amber low-angle solar wash"
                aria-pressed={lighting === 'golden'}
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <path d="M17 18a5 5 0 0 0-10 0" />
                  <line x1="12" y1="2" x2="12" y2="9" />
                  <line x1="4.22" y1="10.22" x2="5.64" y2="11.64" />
                  <line x1="1" y1="18" x2="3" y2="18" />
                  <line x1="21" y1="18" x2="23" y2="18" />
                  <line x1="18.36" y1="11.64" x2="19.78" y2="10.22" />
                  <line x1="23" y1="22" x2="1" y2="22" />
                </svg>
                <span>Golden</span>
              </button>

              <button
                type="button"
                className={`arch-light-btn ${lighting === 'dusk' ? 'is-active' : ''}`}
                onClick={() => setLighting('dusk')}
                title="Concealed 2700K ambient cove illumination"
                aria-pressed={lighting === 'dusk'}
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                </svg>
                <span>Cove</span>
              </button>
            </div>

            {/* Orbit & Reset Tools */}
            <div className="arch-tool-group">
              <button
                type="button"
                className={`arch-orbit-btn ${isAutoOrbit ? 'is-active' : ''}`}
                onClick={() => setIsAutoOrbit(!isAutoOrbit)}
                title={isAutoOrbit ? 'Pause continuous 360° orbit' : 'Enable continuous 360° orbit'}
                aria-pressed={isAutoOrbit}
              >
                <span className="arch-orbit-dot" aria-hidden="true" />
                <span>Orbit</span>
              </button>

              <button
                type="button"
                className="arch-reset-btn"
                onClick={handleResetView}
                title="Reset orientation to front"
              >
                Center
              </button>
            </div>
          </div>
        </div>

        {/* 3. Main 360 Stage Viewport */}
        <div
          ref={stageRef}
          className={`arch-stage-wrap ${isDragging ? 'is-dragging' : ''} ${isFullscreen ? 'is-fullscreen' : ''}`}
          tabIndex={0}
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
          onWheel={onWheel}
          aria-label="Interactive 360 degree architectural panorama"
        >
          {/* Three.js 360 WebGL Canvas */}
          <canvas
            ref={canvasRef}
            className={`arch-canvas-360 ${isDissolving ? 'is-dissolving' : ''}`}
          />

          {/* Loading Indicator */}
          {isLoadingTexture && (
            <div className="arch-stage-loader">
              <div className="arch-loader-ring" />
              <span>Calibrating 360° Space...</span>
            </div>
          )}

          {/* Atmospheric Lighting Overlay */}
          <div className={`arch-light-layer mode-${lighting}`} aria-hidden="true" />

          {/* Photographic Soft Vignette */}
          <div className="arch-vignette" aria-hidden="true" />

          {/* Top-Left Scene Identity Badge */}
          <div className="arch-location-badge">
            <span className="arch-location-dot" aria-hidden="true" />
            <span>{activeView.location}</span>
          </div>

          {/* 3D-Projected Hotspots Layer */}
          <div className="arch-hotspots-container">
            {screenSpots.map(({ spot, left, top, visible, index }) => {
              if (!visible) return null;
              const isSelected = activeSpot?.id === spot.id;

              return (
                <button
                  key={spot.id}
                  type="button"
                  className={`arch-hotspot-marker ${isSelected ? 'is-active' : ''}`}
                  style={{
                    left: `${left}px`,
                    top: `${top}px`
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    setActiveSpot(isSelected ? null : spot);
                  }}
                  aria-label={`Inspect ${spot.name}: ${spot.material}`}
                >
                  <span className="arch-marker-pulse" aria-hidden="true" />
                  <span className="arch-marker-inner">
                    <span>{index + 1}</span>
                  </span>
                  <span className="arch-marker-tip">
                    <span className="arch-tip-title">{spot.name}</span>
                    <span className="arch-tip-mat">{spot.material}</span>
                  </span>
                </button>
              );
            })}
          </div>

          {/* Floating Architectural Material Spec Card */}
          {activeSpot && (
            <div className="arch-spec-card" onClick={(e) => e.stopPropagation()}>
              <div className="arch-card-header">
                <div>
                  <div className="arch-card-kicker">SPECIFICATION DETAIL</div>
                  <h4 className="arch-card-title">{activeSpot.name}</h4>
                </div>
                <button
                  type="button"
                  className="arch-card-close"
                  onClick={() => setActiveSpot(null)}
                  aria-label="Close specification"
                >
                  ✕
                </button>
              </div>

              <div className="arch-card-body">
                <div className="arch-card-row">
                  <span className="arch-card-label">Materiality</span>
                  <span className="arch-card-val">{activeSpot.material}</span>
                </div>
                <div className="arch-card-row">
                  <span className="arch-card-label">Architectural Intent</span>
                  <p className="arch-card-desc">{activeSpot.description}</p>
                </div>
                <div className="arch-card-row">
                  <span className="arch-card-label">Technical Specification</span>
                  <p className="arch-card-specs">{activeSpot.spec}</p>
                </div>
              </div>
            </div>
          )}

          {/* Discreet Drag Hint */}
          <div className={`arch-drag-cue ${hasInteracted ? 'is-hidden' : ''}`} aria-hidden="true">
            <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
              <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm0 18a8 8 0 1 1 8-8 8 8 0 0 1-8 8z" />
              <path d="M12 7v10M7 12l5-5 5 5M7 12l5 5 5-5" />
            </svg>
            <span>Drag 360° to explore · Scroll to zoom</span>
          </div>

          {/* Quick Zoom & Fullscreen Controls */}
          <div className="arch-quick-controls">
            <button
              type="button"
              className="arch-control-circle"
              onClick={(e) => {
                e.stopPropagation();
                handleZoom(-8);
              }}
              title="Zoom In"
              aria-label="Zoom in"
            >
              +
            </button>
            <button
              type="button"
              className="arch-control-circle"
              onClick={(e) => {
                e.stopPropagation();
                handleZoom(8);
              }}
              title="Zoom Out"
              aria-label="Zoom out"
            >
              −
            </button>
            <button
              type="button"
              className="arch-control-circle"
              onClick={(e) => {
                e.stopPropagation();
                handleToggleFullscreen();
              }}
              title="Toggle Fullscreen"
              aria-label="Toggle fullscreen"
            >
              ⛶
            </button>
          </div>
        </div>

        {/* 4. Scene Summary Narrative (Below Stage) */}
        <div className="arch-summary-bar">
          <div className="arch-summary-left">
            <span className="arch-summary-badge">{activeView.category}</span>
            <h3 className="arch-summary-title">{activeView.name}</h3>
          </div>
          <div className="arch-summary-right">
            <p className="arch-summary-desc">
              {activeSpot ? (
                <span>
                  <strong style={{ color: '#FAF8F5' }}>{activeSpot.name}: </strong>
                  {activeSpot.description}
                </span>
              ) : (
                activeView.description
              )}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ArchitectureShowcase;
