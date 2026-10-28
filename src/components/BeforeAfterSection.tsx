import React, { useState, useRef, useEffect, useCallback } from 'react';
import { TRANSFORMATION_ITEMS, type TransformationItem } from '../data/beforeAfter';
import { SectionLabel } from './common/SectionLabel';
import '../styles/BeforeAfterSection.css';

const TILT_OFFSET = 7; // Tilt percentage offset for the diagonal split divider

export const BeforeAfterSection: React.FC = () => {
  const [activeIdx, setActiveIdx] = useState(0);
  const [sliderPos, setSliderPos] = useState(50);
  const [isDragging, setIsDragging] = useState(false);
  const [hasAnimated, setHasAnimated] = useState(false);

  const stageRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const currentItem: TransformationItem = TRANSFORMATION_ITEMS[activeIdx] || TRANSFORMATION_ITEMS[0];

  // Calculate clamped slider percentage from pointer clientX
  const updatePosition = useCallback((clientX: number) => {
    if (!stageRef.current) return;
    const rect = stageRef.current.getBoundingClientRect();
    if (rect.width <= 0) return;
    const rawPos = ((clientX - rect.left) / rect.width) * 100;
    // Constrain position between 8% and 92% to keep handle and divider visible
    const clampedPos = Math.max(8, Math.min(92, rawPos));
    setSliderPos(clampedPos);
  }, []);

  // Pointer event handlers for the comparison slider
  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    e.currentTarget.setPointerCapture(e.pointerId);
    setIsDragging(true);
    updatePosition(e.clientX);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDragging) return;
    updatePosition(e.clientX);
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.currentTarget.hasPointerCapture(e.pointerId)) {
      e.currentTarget.releasePointerCapture(e.pointerId);
    }
    setIsDragging(false);
  };

  // Keyboard navigation for slider handle
  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    const step = e.shiftKey ? 10 : 3;
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      setSliderPos((prev) => Math.max(8, prev - step));
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      setSliderPos((prev) => Math.min(92, prev + step));
    } else if (e.key === 'Home') {
      e.preventDefault();
      setSliderPos(8);
    } else if (e.key === 'End') {
      e.preventDefault();
      setSliderPos(92);
    }
  };

  // Thumbnail navigation
  const handlePrev = () => {
    setActiveIdx((prev) => (prev > 0 ? prev - 1 : TRANSFORMATION_ITEMS.length - 1));
  };

  const handleNext = () => {
    setActiveIdx((prev) => (prev < TRANSFORMATION_ITEMS.length - 1 ? prev + 1 : 0));
  };

  const isInitialMountRef = useRef(true);

  // Scroll active thumbnail inside its horizontal track only when user changes thumbnail
  useEffect(() => {
    // Skip on initial mount so page load and refresh always stay at the hero banner
    if (isInitialMountRef.current) {
      isInitialMountRef.current = false;
      return;
    }

    if (!trackRef.current) return;
    const activeThumb = trackRef.current.children[activeIdx] as HTMLElement | undefined;
    if (activeThumb && trackRef.current) {
      const container = trackRef.current;
      const thumbLeft = activeThumb.offsetLeft;
      const thumbWidth = activeThumb.offsetWidth;
      const containerWidth = container.clientWidth;

      // Scroll ONLY the horizontal thumbnail track container, never the page window
      container.scrollTo({
        left: thumbLeft - containerWidth / 2 + thumbWidth / 2,
        behavior: 'smooth',
      });
    }
  }, [activeIdx]);

  // Subtle initial entrance glide on mount
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion || hasAnimated) return;

    let frameId: number;
    let startTime: number | null = null;
    const duration = 1400; // ms

    // Keyframed trajectory: 42% -> 56% -> 50%
    const animateEntrance = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(1, elapsed / duration);

      // Wave motion that settles to 50%
      const swing = Math.sin(progress * Math.PI * 1.5) * (1 - progress);
      const currentPos = 50 + swing * 8;

      setSliderPos(currentPos);

      if (progress < 1) {
        frameId = requestAnimationFrame(animateEntrance);
      } else {
        setSliderPos(50);
        setHasAnimated(true);
      }
    };

    const timer = setTimeout(() => {
      frameId = requestAnimationFrame(animateEntrance);
    }, 400);

    return () => {
      clearTimeout(timer);
      cancelAnimationFrame(frameId);
    };
  }, [hasAnimated]);

  // Diagonal clip path geometry
  const topX = sliderPos + TILT_OFFSET;
  const bottomX = sliderPos - TILT_OFFSET;
  const clipPathStyle = `polygon(0% 0%, ${topX}% 0%, ${bottomX}% 100%, 0% 100%)`;

  return (
    <section className="ba-section" id="transformations" aria-label="Before and After Interior Transformations">
      {/* Decorative Organic Pastel Shapes in the Background */}
      <div className="ba-backdrop-decor" aria-hidden="true">
        {/* Top-Right Soft Peach Blob */}
        <svg className="ba-decor-shape ba-decor-tr" viewBox="0 0 500 500" fill="none">
          <path
            d="M480 200C500 320 400 440 280 470C160 500 80 410 40 310C0 210 20 120 120 50C220 -20 460 80 480 200Z"
            fill="url(#peachGradTR)"
            opacity="0.55"
          />
          <defs>
            <radialGradient id="peachGradTR" cx="70%" cy="30%" r="70%">
              <stop offset="0%" stopColor="#FEE4DE" />
              <stop offset="60%" stopColor="#FBD3C8" />
              <stop offset="100%" stopColor="#F7F3EE" stopOpacity="0" />
            </radialGradient>
          </defs>
        </svg>

        {/* Top-Left Gentle Pastel Swell */}
        <svg className="ba-decor-shape ba-decor-tl" viewBox="0 0 450 450" fill="none">
          <path
            d="M-20 80C60 60 180 90 220 170C260 250 200 340 130 380C60 420 -30 400 -80 340C-130 280 -100 100 -20 80Z"
            fill="url(#peachGradTL)"
            opacity="0.45"
          />
          <defs>
            <radialGradient id="peachGradTL" cx="30%" cy="30%" r="70%">
              <stop offset="0%" stopColor="#FDEAE5" />
              <stop offset="70%" stopColor="#FBDCD3" stopOpacity="0.8" />
              <stop offset="100%" stopColor="#FAF7F2" stopOpacity="0" />
            </radialGradient>
          </defs>
        </svg>

        {/* Bottom-Left Pastel Shape */}
        <svg className="ba-decor-shape ba-decor-bl" viewBox="0 0 500 500" fill="none">
          <path
            d="M-30 420C20 320 90 260 180 280C270 300 340 390 320 480C300 570 190 610 90 600C-10 590 -80 520 -30 420Z"
            fill="url(#peachGradBL)"
            opacity="0.5"
          />
          <defs>
            <radialGradient id="peachGradBL" cx="35%" cy="65%" r="70%">
              <stop offset="0%" stopColor="#FCDDD5" />
              <stop offset="100%" stopColor="#FAF7F2" stopOpacity="0" />
            </radialGradient>
          </defs>
        </svg>

        {/* Bottom-Right Faint Pastel Accent */}
        <svg className="ba-decor-shape ba-decor-br" viewBox="0 0 400 400" fill="none">
          <path
            d="M380 400C330 320 360 220 420 180C480 140 540 180 580 250C620 320 590 410 520 450C450 490 430 480 380 400Z"
            fill="#FBE3DC"
            opacity="0.4"
          />
        </svg>

        {/* Botanical Minimal Leaf Accent at Bottom Left */}
        <svg className="ba-decor-leaf" viewBox="0 0 100 120" fill="none" stroke="currentColor">
          <path
            d="M50 115C50 115 50 60 85 20C65 40 30 55 15 80C35 85 45 100 50 115Z"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M50 85C62 72 75 62 85 20"
            strokeWidth="1.2"
            strokeLinecap="round"
          />
          <path
            d="M35 68C42 62 48 57 52 52"
            strokeWidth="1.2"
            strokeLinecap="round"
          />
          <path
            d="M26 80C35 76 43 73 48 70"
            strokeWidth="1.2"
            strokeLinecap="round"
          />
        </svg>
      </div>

      {/* Editorial Section Header */}
      <div className="ba-header">
        <div className="ba-header-lead">
          <SectionLabel style={{ color: 'var(--brown)' }}>
            Selected Transformations · Before &amp; After
          </SectionLabel>
          <h2 className="ba-title font-heading">
            Raw Framework to Living Sanctuary.
          </h2>
          <p className="ba-intro font-content">
            Drag the diagonal divider to reveal the meticulous transition from structural framework and rough-ins to refined, bespoke living spaces.
          </p>
        </div>

        <div className="ba-header-meta">
          <div className="ba-active-indicator" role="status" aria-live="polite">
            <span className="ba-meta-index">0{activeIdx + 1} / 0{TRANSFORMATION_ITEMS.length}</span>
            <span className="ba-meta-room">{currentItem.room}</span>
            <span className="ba-meta-divider">/</span>
            <span className="ba-meta-title">{currentItem.title}</span>
          </div>
          <div className="ba-drag-hint">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <polyline points="7 8 3 12 7 16" />
              <polyline points="17 8 21 12 17 16" />
              <line x1="3" y1="12" x2="21" y2="12" />
            </svg>
            <span>Drag slider horizontally to compare</span>
          </div>
        </div>
      </div>

      {/* Main Before & After Comparison Stage */}
      <div className="ba-comparison-wrapper">
        <div
          ref={stageRef}
          className={`ba-stage-container ${isDragging ? 'is-dragging' : ''}`}
          onPointerDown={handlePointerDown}
          onPointerMove={handlePointerMove}
          onPointerUp={handlePointerUp}
          onPointerCancel={handlePointerUp}
          role="region"
          aria-label="Interactive Before and After Image Comparison"
        >
          {/* AFTER Image Layer (Base Layer - 100% visible) */}
          <div className="ba-layer ba-layer-after" aria-hidden="true">
            <img
              src={currentItem.afterImage}
              alt={currentItem.afterAlt}
              className="ba-image"
              loading="eager"
              decoding="async"
            />
          </div>

          {/* BEFORE Image Layer (Top Layer - clipped along diagonal line) */}
          <div
            className="ba-layer ba-layer-before"
            style={{ clipPath: clipPathStyle, WebkitClipPath: clipPathStyle }}
            aria-hidden="true"
          >
            <img
              src={currentItem.beforeImage}
              alt={currentItem.beforeAlt}
              className="ba-image"
              loading="eager"
              decoding="async"
            />
          </div>

          {/* Diagonal Divider Line SVG */}
          <svg
            className="ba-divider-svg"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
            aria-hidden="true"
          >
            <line
              x1={topX}
              y1={0}
              x2={bottomX}
              y2={100}
              stroke="#ffffff"
              strokeWidth="2.5"
              vectorEffect="non-scaling-stroke"
            />
          </svg>

          {/* Minimal Corner Labels (Reference pill style) */}
          <div className="ba-pill ba-pill-before">BEFORE</div>
          <div className="ba-pill ba-pill-after">AFTER</div>

          {/* Draggable Circular Center Handle with Chevrons */}
          <div
            className="ba-handle"
            style={{ left: `${sliderPos}%` }}
            role="slider"
            tabIndex={0}
            aria-valuenow={Math.round(sliderPos)}
            aria-valuemin={8}
            aria-valuemax={92}
            aria-label="Comparison slider position"
            onKeyDown={handleKeyDown}
          >
            <div className="ba-handle-disc" aria-hidden="true">
              <svg
                className="ba-handle-chevrons"
                width="22"
                height="16"
                viewBox="0 0 22 16"
                fill="none"
              >
                {/* Left Pink Chevron */}
                <path
                  d="M7 3L2 8L7 13"
                  stroke="#DE3B74"
                  strokeWidth="2.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                {/* Right Pink Chevron */}
                <path
                  d="M15 3L20 8L15 13"
                  stroke="#DE3B74"
                  strokeWidth="2.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
          </div>

          {/* Sleek Stage Bottom Room Badge */}
          <div className="ba-stage-badge" aria-hidden="true">
            <span className="ba-stage-badge-room">{currentItem.room}</span>
            <span className="ba-stage-badge-sep">/</span>
            <span className="ba-stage-badge-title">{currentItem.title}</span>
          </div>
        </div>
      </div>

      {/* Thumbnail Gallery Strip */}
      <div className="ba-gallery-wrapper">
        {/* Previous Button */}
        <button
          type="button"
          className="ba-nav-btn ba-nav-prev"
          onClick={handlePrev}
          aria-label="View previous transformation"
        >
          <svg viewBox="0 0 24 24" fill="none">
            <polyline points="15 18 9 12 15 6" />
          </svg>
        </button>

        {/* Thumbnails Track */}
        <div
          ref={trackRef}
          className="ba-thumbnails-track"
          role="tablist"
          aria-label="Transformation photo views"
        >
          {TRANSFORMATION_ITEMS.map((item, idx) => {
            const isActive = idx === activeIdx;
            return (
              <button
                key={item.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                aria-label={`Select ${item.title}`}
                className={`ba-thumb-item ${isActive ? 'is-active' : ''}`}
                onClick={() => setActiveIdx(idx)}
              >
                <div className="ba-thumb-media">
                  <img
                    src={item.thumbnail}
                    alt={item.title}
                    className="ba-thumb-img"
                    loading="lazy"
                    decoding="async"
                  />
                  <span className="ba-thumb-index">0{idx + 1}</span>
                </div>
                <div className="ba-thumb-text">
                  <span className="ba-thumb-room">{item.room}</span>
                  <span className="ba-thumb-title">{item.title}</span>
                </div>
              </button>
            );
          })}
        </div>

        {/* Next Button */}
        <button
          type="button"
          className="ba-nav-btn ba-nav-next"
          onClick={handleNext}
          aria-label="View next transformation"
        >
          <svg viewBox="0 0 24 24" fill="none">
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </button>
      </div>
    </section>
  );
};

export default BeforeAfterSection;
