import React, { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';
import { SectionLabel } from './common/SectionLabel';
import { ARCHITECTURE_VIEWS } from '../data/architecture';
import type { LightingMode, Hotspot } from '../data/architecture';

export const ArchitectureShowcase: React.FC = () => {
  const stageRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [activeViewIdx, setActiveViewIdx] = useState(0);
  const [activeSpot, setActiveSpot] = useState<Hotspot | null>(null);
  const [lighting, setLighting] = useState<LightingMode>('daylight');
  const [isAutoOrbit, setIsAutoOrbit] = useState(true);
  const [isDragging, setIsDragging] = useState(false);
  const [isLoadingTexture, setIsLoadingTexture] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);

  // Screen-projected hotspots
  const [screenSpots, setScreenSpots] = useState<
    Array<{ spot: Hotspot; left: number; top: number; visible: boolean; index: number }>
  >([]);

  // Telemetry state
  const [telemetry, setTelemetry] = useState({
    heading: 0,
    headingLabel: 'N',
    pitch: 0,
    fov: 70
  });

  const activeView = ARCHITECTURE_VIEWS[activeViewIdx];

  // 360 Orbit State ref (for 60fps render loop without React re-renders)
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

  // Compass direction utility
  const getHeadingLabel = (deg: number) => {
    const directions = ['N', 'NE', 'E', 'SE', 'S', 'SW', 'W', 'NW'];
    const idx = Math.round(deg / 45) % 8;
    return directions[idx];
  };

  // Switch viewpoint
  const handleSelectView = useCallback((index: number) => {
    setActiveViewIdx(index);
    setActiveSpot(null);
    orbitState.current.lon = 180;
    orbitState.current.targetLon = 180;
    orbitState.current.lat = 0;
    orbitState.current.targetLat = 0;
  }, []);

  // Reset view to origin
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
    const material = new THREE.MeshBasicMaterial({
      color: 0xffffff
    });
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

    // Animation Render Loop
    let animId: number;

    const renderLoop = () => {
      animId = requestAnimationFrame(renderLoop);

      const st = orbitState.current;

      // Auto 360 Orbit rotation when idle and enabled
      if (isAutoOrbit && !st.isPointerDown) {
        st.targetLon += 0.07;
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

      // Project 3D Hotspot positions to 2D screen space
      const currentView = ARCHITECTURE_VIEWS[activeViewIdx];
      const stageW = stage.clientWidth;
      const stageH = stage.clientHeight;
      const spotRadius = 450;

      const projected = currentView.spots.map((spot, idx) => {
        // Spherical coords for hotspot
        const sPhi = THREE.MathUtils.degToRad(90 - spot.pitch);
        const sTheta = THREE.MathUtils.degToRad(spot.yaw);

        const pos = new THREE.Vector3(
          spotRadius * Math.sin(sPhi) * Math.cos(sTheta),
          spotRadius * Math.cos(sPhi),
          spotRadius * Math.sin(sPhi) * Math.sin(sTheta)
        );

        // Project onto 2D camera viewport
        pos.project(camera);

        // Check if hotspot is facing the camera
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

      // Telemetry throttling
      const normalizedLon = ((Math.round(st.lon) % 360) + 360) % 360;
      setTelemetry({
        heading: normalizedLon,
        headingLabel: getHeadingLabel(normalizedLon),
        pitch: Math.round(st.lat),
        fov: Math.round(st.fov)
      });
    };

    animId = requestAnimationFrame(renderLoop);

    return () => {
      cancelAnimationFrame(animId);
      ro.disconnect();
      renderer.dispose();
      geometry.dispose();
      material.dispose();
      threeRef.current = null;
    };
  }, []);

  // Update Panorama Texture on Viewpoint change
  useEffect(() => {
    if (!threeRef.current) return;
    const { textureLoader, sphereMesh, cachedTextures } = threeRef.current;
    const targetUrl = activeView.panorama;

    if (cachedTextures[targetUrl]) {
      sphereMesh.material.map = cachedTextures[targetUrl];
      sphereMesh.material.needsUpdate = true;
      setIsLoadingTexture(false);
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
        },
        undefined,
        () => setIsLoadingTexture(false)
      );
    }
  }, [activeView.panorama]);

  // Pointer Interaction Handlers for 360 drag
  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if ((e.target as HTMLElement).closest('.arch-360-hotspot') || (e.target as HTMLElement).closest('.arch-spec-modal')) {
      return;
    }
    const st = orbitState.current;
    st.isPointerDown = true;
    st.startX = e.clientX;
    st.startY = e.clientY;
    st.startLon = st.lon;
    st.startLat = st.lat;
    setIsDragging(true);

    if (stageRef.current) {
      stageRef.current.setPointerCapture(e.pointerId);
    }
  };

  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const st = orbitState.current;
    if (!st.isPointerDown) return;
    const dx = e.clientX - st.startX;
    const dy = e.clientY - st.startY;

    // 360 degree drag sensitivity (invert dx so dragging left turns camera right)
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

  // Wheel to Zoom
  const onWheel = (e: React.WheelEvent<HTMLDivElement>) => {
    e.preventDefault();
    const delta = e.deltaY * 0.05;
    orbitState.current.targetFov = Math.max(45, Math.min(85, orbitState.current.targetFov + delta));
  };

  return (
    <section className="arch" id="services" aria-labelledby="arch-heading">
      {/* Editorial Header */}
      <div className="head">
        <div>
          <SectionLabel>Interior architecture in motion</SectionLabel>
          <h2 id="arch-heading" style={{ marginTop: '1rem', letterSpacing: '-0.02em' }}>
            360° Interior Craft & Spatial Details.
          </h2>
        </div>
        <div className="arch-header-meta">
          <p>
            Immerse yourself inside real Mitjen Interiors architectural installations and bespoke millwork. Click & drag 360° in any direction, inspect precision material hotspots anchored in 3D space, or shift dynamic atmospheric lighting.
          </p>
          <div className="arch-header-badge">
            <span className="arch-badge-pulse" />
            <span className="arch-badge-text">360° Spherical Interior Studio</span>
          </div>
        </div>
      </div>

      {/* Main 360 Stage Container */}
      <div
        ref={stageRef}
        className={`arch-stage-container arch-360-stage ${isDragging ? 'is-dragging' : ''} ${isFullscreen ? 'is-fullscreen' : ''}`}
        tabIndex={0}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        onWheel={onWheel}
      >
        {/* Three.js 360 WebGL Canvas */}
        <canvas ref={canvasRef} className="arch-360-canvas" />

        {/* Loading Spinner Indicator */}
        {isLoadingTexture && (
          <div className="arch-360-loader">
            <div className="loader-spinner" />
            <span>CALIBRATING 360° SPATIAL TEXTURE...</span>
          </div>
        )}

        {/* Dynamic Atmospheric Lighting Filter Layer */}
        <div className={`arch-lighting-layer lighting-${lighting}`} />

        {/* Atmospheric Vignette */}
        <div className="arch-vignette-overlay" />

        {/* Top HUD: 360 Compass, Telemetry, and Location */}
        <div className="arch-hud-top">
          <div className="arch-hud-tag">
            <span className="arch-hud-dot" />
            <span className="arch-hud-category">{activeView.category.toUpperCase()}</span>
            <span className="arch-hud-sep">/</span>
            <span className="arch-hud-loc">{activeView.location}</span>
          </div>

          <div className="arch-hud-telemetry">
            <div className="hud-compass-badge">
              <span className="compass-icon">⟳</span>
              <span className="compass-heading">{telemetry.heading}° {telemetry.headingLabel}</span>
            </div>
            <span className="hud-metric">
              <span className="hud-metric-label">PITCH:</span>
              <span className="hud-metric-val">{telemetry.pitch > 0 ? `+${telemetry.pitch}°` : `${telemetry.pitch}°`}</span>
            </span>
            <span className="hud-metric">
              <span className="hud-metric-label">FOV:</span>
              <span className="hud-metric-val">{telemetry.fov}°</span>
            </span>
            <span className="hud-metric">
              <span className="hud-metric-label">LIGHTING:</span>
              <span className="hud-metric-val">{lighting.toUpperCase()}</span>
            </span>
          </div>
        </div>

        {/* 3D-Projected Hotspots Layer */}
        <div className="arch-hotspots-layer">
          {screenSpots.map(({ spot, left, top, visible, index }) => {
            if (!visible) return null;
            const isSelected = activeSpot?.id === spot.id;
            return (
              <button
                key={spot.id}
                type="button"
                className={`arch-hotspot-pin arch-360-hotspot ${isSelected ? 'is-active' : ''}`}
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
                <span className="pin-radar" />
                <span className="pin-core">
                  <span className="pin-number">{index + 1}</span>
                </span>
                <span className="pin-tooltip">
                  <span className="pin-tooltip-name">{spot.name}</span>
                  <span className="pin-tooltip-mat">{spot.material}</span>
                </span>
              </button>
            );
          })}
        </div>

        {/* Floating Architectural Material Spec Card */}
        {activeSpot && (
          <div className="arch-spec-modal" onClick={(e) => e.stopPropagation()}>
            <div className="arch-spec-header">
              <div className="arch-spec-title-group">
                <span className="arch-spec-badge">SPECIFICATION DETAIL</span>
                <h4 className="arch-spec-name">{activeSpot.name}</h4>
              </div>
              <button
                type="button"
                className="arch-spec-close"
                onClick={() => setActiveSpot(null)}
                aria-label="Close specification"
              >
                ✕
              </button>
            </div>

            <div className="arch-spec-body">
              <div className="arch-spec-row">
                <span className="spec-label">Materiality</span>
                <span className="spec-val highlight">{activeSpot.material}</span>
              </div>
              <div className="arch-spec-row">
                <span className="spec-label">Architectural Intent</span>
                <p className="spec-desc">{activeSpot.description}</p>
              </div>
              <div className="arch-spec-row">
                <span className="spec-label">Technical Specs</span>
                <p className="spec-details">{activeSpot.spec}</p>
              </div>
            </div>
          </div>
        )}

        {/* 360 Drag & Zoom Floating Action Hint */}
        <div className="arch-drag-hint">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm0 18a8 8 0 1 1 8-8 8 8 0 0 1-8 8z" />
            <path d="M12 7v10M7 12l5-5 5 5M7 12l5 5 5-5" />
          </svg>
          <span>Drag 360° to look around · Scroll to zoom</span>
        </div>

        {/* HUD Quick Tools: Zoom & Fullscreen */}
        <div className="arch-hud-tools">
          <button
            type="button"
            className="hud-tool-btn"
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
            className="hud-tool-btn"
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
            className="hud-tool-btn"
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

      {/* Control Console */}
      <div className="arch-console">
        {/* Viewpoint Selector Bar */}
        <div className="arch-views-selector" role="tablist" aria-label="360 Architectural Viewpoints">
          <span className="console-group-label">360° SCENE:</span>
          <div className="arch-views-pills">
            {ARCHITECTURE_VIEWS.map((view, i) => (
              <button
                key={view.id}
                role="tab"
                aria-selected={activeViewIdx === i}
                className={`arch-pill ${activeViewIdx === i ? 'is-active' : ''}`}
                onClick={() => handleSelectView(i)}
              >
                <span className="pill-index">0{i + 1}</span>
                <span className="pill-name">{view.name}</span>
                <span className="pill-360-badge">360°</span>
              </button>
            ))}
          </div>
        </div>

        {/* Atmosphere & Motion Controls */}
        <div className="arch-actions-group">
          {/* Lighting Mode Selector */}
          <div className="arch-lighting-selector">
            <span className="console-group-label">ATMOSPHERE:</span>
            <div className="arch-lighting-pills">
              <button
                type="button"
                className={`lighting-btn ${lighting === 'daylight' ? 'is-active' : ''}`}
                onClick={() => setLighting('daylight')}
                title="Natural high-contrast architectural daylight"
              >
                <span className="lighting-icon">☀️</span>
                <span className="lighting-text">Daylight</span>
              </button>
              <button
                type="button"
                className={`lighting-btn ${lighting === 'golden' ? 'is-active' : ''}`}
                onClick={() => setLighting('golden')}
                title="Warm amber low-angle solar wash"
              >
                <span className="lighting-icon">🌅</span>
                <span className="lighting-text">Golden</span>
              </button>
              <button
                type="button"
                className={`lighting-btn ${lighting === 'dusk' ? 'is-active' : ''}`}
                onClick={() => setLighting('dusk')}
                title="Concealed 2700K cove ambient night light"
              >
                <span className="lighting-icon">🌙</span>
                <span className="lighting-text">Cove Light</span>
              </button>
            </div>
          </div>

          {/* Interactive Motion Modes */}
          <div className="arch-motion-actions">
            <button
              type="button"
              className={`motion-toggle-btn ${isAutoOrbit ? 'is-active' : ''}`}
              onClick={() => setIsAutoOrbit(!isAutoOrbit)}
              title={isAutoOrbit ? 'Pause continuous 360° orbit' : 'Enable continuous 360° orbit'}
            >
              <span className={`motion-dot ${isAutoOrbit ? 'pulse' : ''}`} />
              <span>{isAutoOrbit ? 'Auto 360° ON' : 'Auto 360° OFF'}</span>
            </button>
            <button
              type="button"
              className="motion-reset-btn"
              onClick={handleResetView}
              title="Reset orientation to front"
            >
              Center View
            </button>
          </div>
        </div>
      </div>

      {/* Editorial Note & Scene Description */}
      <div className="arch-scene-summary">
        <div className="summary-left">
          <span className="summary-badge">{activeView.category} · 360° SPATIAL TOUR</span>
          <h3 className="summary-title">{activeView.name}</h3>
        </div>
        <p className="summary-text">
          {activeSpot ? (
            <span>
              <strong>{activeSpot.name}:</strong> {activeSpot.description}
            </span>
          ) : (
            activeView.description
          )}
        </p>
      </div>
    </section>
  );
};
