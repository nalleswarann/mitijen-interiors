import React, { useEffect, useRef, useState, useCallback } from 'react';
import * as THREE from 'three';
import { SectionLabel } from './common/SectionLabel';

interface Viewpoint3D {
  name: string;
  description: string;
  camPos: [number, number, number];
  lookAt: [number, number, number];
  scale: string;
  origin: string;
}

const VIEWS_3D: Viewpoint3D[] = [
  {
    name: 'Overview',
    description: 'A wide panoramic view of the living space: travertine columns, curved linen seating, and open garden illumination.',
    camPos: [0, 2.2, 6.6],
    lookAt: [0, 1.1, 0],
    scale: '1',
    origin: '50% 42%'
  },
  {
    name: 'Living Area',
    description: 'Low sculptural seating arranged around a handcrafted oak and travertine table, anchored by a tactile wool rug.',
    camPos: [-1.5, 1.3, 3.2],
    lookAt: [-0.6, 0.5, 0],
    scale: '1.45',
    origin: '78% 70%'
  },
  {
    name: 'Material Details',
    description: 'Honed travertine and quarter-sawn oak: pale, fine-veined surfaces with quiet acoustic warmth.',
    camPos: [1.1, 1.1, 1.6],
    lookAt: [0.8, 0.9, -1.2],
    scale: '2',
    origin: '42% 30%'
  }
];

export const Projects3DStudy: React.FC = () => {
  const stageRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const [activeViewIdx, setActiveViewIdx] = useState(0);
  const [hasWebGL] = useState(() => {
    if (typeof window === 'undefined') return true;
    try {
      const testCanvas = document.createElement('canvas');
      const gl = testCanvas.getContext('webgl') || testCanvas.getContext('experimental-webgl');
      const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      return Boolean(gl && !prefersReducedMotion && window.innerWidth >= 640);
    } catch {
      return false;
    }
  });
  const [isInteracting, setIsInteracting] = useState(false);

  const threeState = useRef<{
    scene: THREE.Scene;
    camera: THREE.PerspectiveCamera;
    renderer: THREE.WebGLRenderer;
    roomGroup: THREE.Group;
    curPos: [number, number, number];
    curLook: [number, number, number];
    tgtPos: [number, number, number];
    tgtLook: [number, number, number];
    rotY: number;
    targetRotY: number;
    isPointerDown: boolean;
    lastPointerX: number;
    animFrameId: number;
    isRunning: boolean;
  } | null>(null);

  const activeView = VIEWS_3D[activeViewIdx];

  const handleSelectView = useCallback((idx: number) => {
    setActiveViewIdx(idx);
    if (threeState.current) {
      threeState.current.tgtPos = [...VIEWS_3D[idx].camPos];
      threeState.current.tgtLook = [...VIEWS_3D[idx].lookAt];
    }
  }, []);

  useEffect(() => {
    if (!hasWebGL) {
      return;
    }

    const stage = stageRef.current;
    const canvas = canvasRef.current;
    if (!stage || !canvas) return;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        canvas,
        antialias: true,
        alpha: false,
        powerPreference: 'high-performance'
      });
    } catch {
      return;
    }

    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.75));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.setClearColor(0x1b1c1a, 1);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(42, stage.clientWidth / stage.clientHeight, 0.1, 50);

    const roomGroup = new THREE.Group();
    scene.add(roomGroup);

    // Helpers to build procedural architectural objects
    const createMat = (colorHex: number, roughness = 0.85) =>
      new THREE.MeshStandardMaterial({ color: colorHex, roughness });

    const createBox = (
      w: number,
      h: number,
      d: number,
      mat: THREE.Material,
      x: number,
      y: number,
      z: number
    ) => {
      const mesh = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), mat);
      mesh.position.set(x, y, z);
      mesh.castShadow = true;
      mesh.receiveShadow = true;
      roomGroup.add(mesh);
      return mesh;
    };

    // Palettes matching FORMA Living architectural study
    const matTravertine = createMat(0xdcc9aa, 0.8);
    const matOak = createMat(0xa9825a, 0.7);
    const matLinen = createMat(0xe8e1d3, 0.95);
    const matCeiling = createMat(0xf0ebe0, 0.9);
    const matFloor = createMat(0xcdbfa6, 0.5);

    // Floor and Ceiling
    createBox(9, 0.1, 6, matFloor, 0, -0.05, 0);
    createBox(9, 0.1, 6, matCeiling, 0, 3.4, 0);

    // Back & Side Travertine Envelopes
    createBox(9, 3.4, 0.2, matTravertine, 0, 1.7, -3);
    createBox(0.2, 3.4, 6, matTravertine, -4.5, 1.7, 0);

    // Monolithic Travertine Architectural Columns
    for (const posX of [-1.2, 2.4]) {
      const colMesh = new THREE.Mesh(
        new THREE.CylinderGeometry(0.55, 0.55, 3.4, 40),
        matTravertine
      );
      colMesh.position.set(posX, 1.7, -1.4);
      colMesh.castShadow = true;
      colMesh.receiveShadow = true;
      roomGroup.add(colMesh);
    }

    // Curved Linen Seating & Modular Loungers
    createBox(1.6, 0.5, 0.9, matLinen, -3, 0.3, -1.2);
    createBox(3, 0.5, 1, matLinen, 1.6, 0.3, 1.6);
    createBox(3, 0.45, 0.3, matLinen, 1.6, 0.7, 2.05);
    createBox(0.9, 0.5, 0.9, matLinen, -2, 0.3, 1.4);

    // Tactile Wool Rug
    createBox(4, 0.04, 3, createMat(0xcfc3ae, 1), 0, 0.02, 0.3);

    // Round Oak Table on Travertine Leg
    const tableTop = new THREE.Mesh(new THREE.CylinderGeometry(0.6, 0.6, 0.1, 40), matOak);
    tableTop.position.set(0.2, 0.42, 0.4);
    tableTop.castShadow = true;
    tableTop.receiveShadow = true;
    roomGroup.add(tableTop);

    const tableBase = new THREE.Mesh(new THREE.CylinderGeometry(0.2, 0.25, 0.4, 24), matTravertine);
    tableBase.position.set(0.2, 0.2, 0.4);
    tableBase.castShadow = true;
    tableBase.receiveShadow = true;
    roomGroup.add(tableBase);

    // Lighting: Diffused hemisphere wash + Directional warm sun
    const hemiLight = new THREE.HemisphereLight(0xfff1dc, 0x6d5a45, 0.75);
    scene.add(hemiLight);

    const sunLight = new THREE.DirectionalLight(0xffe2b8, 1.15);
    sunLight.position.set(-6, 4, 3);
    sunLight.castShadow = true;
    sunLight.shadow.mapSize.set(1024, 1024);
    sunLight.shadow.camera.near = 0.5;
    sunLight.shadow.camera.far = 20;
    sunLight.shadow.camera.left = -7;
    sunLight.shadow.camera.right = 7;
    sunLight.shadow.camera.top = 7;
    sunLight.shadow.camera.bottom = -7;
    scene.add(sunLight);

    // State container
    const initialView = VIEWS_3D[activeViewIdx];
    threeState.current = {
      scene,
      camera,
      renderer,
      roomGroup,
      curPos: [...initialView.camPos],
      curLook: [...initialView.lookAt],
      tgtPos: [...initialView.camPos],
      tgtLook: [...initialView.lookAt],
      rotY: 0,
      targetRotY: 0,
      isPointerDown: false,
      lastPointerX: 0,
      animFrameId: 0,
      isRunning: false
    };

    // Responsive resize handler
    const handleResize = () => {
      if (!stage || !threeState.current) return;
      const w = stage.clientWidth;
      const h = stage.clientHeight;
      if (w <= 0 || h <= 0) return;
      threeState.current.renderer.setSize(w, h, false);
      threeState.current.camera.aspect = w / h;
      threeState.current.camera.updateProjectionMatrix();
    };

    handleResize();
    const resizeObserver = new ResizeObserver(handleResize);
    resizeObserver.observe(stage);

    // Animation loop with smooth lerping
    const renderLoop = () => {
      if (!threeState.current) return;
      const s = threeState.current;

      // Smooth position & target interpolation
      for (let i = 0; i < 3; i++) {
        s.curPos[i] += (s.tgtPos[i] - s.curPos[i]) * 0.055;
        s.curLook[i] += (s.tgtLook[i] - s.curLook[i]) * 0.055;
      }

      s.rotY += (s.targetRotY - s.rotY) * 0.08;
      s.roomGroup.rotation.y = s.rotY;

      s.camera.position.set(s.curPos[0], s.curPos[1], s.curPos[2]);
      s.camera.lookAt(s.curLook[0], s.curLook[1], s.curLook[2]);

      s.renderer.render(s.scene, s.camera);
      s.animFrameId = requestAnimationFrame(renderLoop);
    };

    // Intersection observer to only render when visible
    const intersectionObserver = new IntersectionObserver(
      (entries) => {
        if (!threeState.current) return;
        const entry = entries[0];
        if (entry.isIntersecting && !threeState.current.isRunning) {
          threeState.current.isRunning = true;
          threeState.current.animFrameId = requestAnimationFrame(renderLoop);
        } else if (!entry.isIntersecting && threeState.current.isRunning) {
          threeState.current.isRunning = false;
          cancelAnimationFrame(threeState.current.animFrameId);
        }
      },
      { threshold: 0.1 }
    );
    intersectionObserver.observe(stage);

    return () => {
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      if (threeState.current) {
        cancelAnimationFrame(threeState.current.animFrameId);
        threeState.current.renderer.dispose();
        threeState.current = null;
      }
    };
  }, [activeViewIdx, hasWebGL]);

  // Pointer drag controls for room rotation
  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!threeState.current) return;
    threeState.current.isPointerDown = true;
    threeState.current.lastPointerX = e.clientX;
    e.currentTarget.setPointerCapture(e.pointerId);
    setIsInteracting(true);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!threeState.current || !threeState.current.isPointerDown) return;
    const deltaX = e.clientX - threeState.current.lastPointerX;
    threeState.current.lastPointerX = e.clientX;
    // Clamped angle rotation
    threeState.current.targetRotY = Math.max(
      -0.45,
      Math.min(0.45, threeState.current.targetRotY + deltaX * 0.004)
    );
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!threeState.current) return;
    threeState.current.isPointerDown = false;
    if (e.currentTarget.hasPointerCapture(e.pointerId)) {
      e.currentTarget.releasePointerCapture(e.pointerId);
    }
    setIsInteracting(false);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (!threeState.current) return;
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      threeState.current.targetRotY = Math.max(-0.45, threeState.current.targetRotY - 0.08);
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      threeState.current.targetRotY = Math.min(0.45, threeState.current.targetRotY + 0.08);
    }
  };

  return (
    <section className="beyond" id="beyond" aria-labelledby="beyond-heading">
      <div className="beyond-header">
        <div>
          <SectionLabel style={{ color: 'var(--sand)' }}>
            Featured Study · The Quiet Residence
          </SectionLabel>
          <h2 id="beyond-heading" style={{ marginTop: '0.8rem', color: 'var(--ivory)' }}>
            Step beyond the frame.
          </h2>
        </div>
        <p className="beyond-intro">
          A procedural 3D architectural exploration of natural light, Roman travertine, and oak joinery. Drag horizontally to rotate the room or choose an architectural viewpoint below.
        </p>
      </div>

      <div
        ref={stageRef}
        className={`stage ${!hasWebGL ? 'nogl' : ''} ${isInteracting ? 'is-dragging' : ''}`}
        tabIndex={0}
        role="region"
        aria-label="Interactive 3D study of the living space. Drag or use arrow keys to rotate."
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        onKeyDown={handleKeyDown}
      >
        <canvas ref={canvasRef} className="stage-canvas" />

        {/* Fallback plate when WebGL is unavailable */}
        <div className="stage-fallback">
          <img
            src="/assets/mitijen/home1.jpeg"
            alt="The Quiet Residence curated living room with travertine columns"
            className="fallback-img"
            style={{
              transform: `scale(${activeView.scale})`,
              transformOrigin: activeView.origin
            }}
          />
        </div>

        {/* Dynamic Viewpoint Floating Caption */}
        <div className="stage-caption" aria-live="polite">
          <span className="caption-tag">VIEWPOINT {String(activeViewIdx + 1).padStart(2, '0')}</span>
          <b>{activeView.name}</b>
          <p>{activeView.description}</p>
        </div>
      </div>

      {/* Viewpoint Controls */}
      <div className="ctl" role="group" aria-label="Select architectural viewpoint">
        {VIEWS_3D.map((v, i) => (
          <button
            key={v.name}
            type="button"
            className={`ctl-btn ${i === activeViewIdx ? 'is-active' : ''}`}
            aria-pressed={i === activeViewIdx}
            onClick={() => handleSelectView(i)}
          >
            {v.name}
          </button>
        ))}
      </div>
    </section>
  );
};
