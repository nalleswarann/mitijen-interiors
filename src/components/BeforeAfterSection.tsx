import React, { useState, useRef, useEffect, useCallback } from 'react';
import { TRANSFORMATION_ITEMS, type TransformationItem } from '../data/beforeAfter';
import '../styles/BeforeAfterSection.css';

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
    // Constrain position between 6% and 94% to keep handle and divider visible
    const clampedPos = Math.max(6, Math.min(94, rawPos));
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
      setSliderPos((prev) => Math.max(6, prev - step));
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      setSliderPos((prev) => Math.min(94, prev + step));
    } else if (e.key === 'Home') {
      e.preventDefault();
      setSliderPos(6);
    } else if (e.key === 'End') {
      e.preventDefault();
      setSliderPos(94);
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

  // Scroll active thumbnail inside horizontal track when selected
  useEffect(() => {
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

      container.scrollTo({
        left: thumbLeft - containerWidth / 2 + thumbWidth / 2,
        behavior: 'smooth',
      });
    }
  }, [activeIdx]);

  // Subtle interactive entrance glide on initial view
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion || hasAnimated) return;

    let frameId: number;
    let startTime: number | null = null;
    const duration = 1200; // ms

    const animateEntrance = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(1, elapsed / duration);

      // Smooth wave motion that settles at 50%
      const swing = Math.sin(progress * Math.PI * 1.5) * (1 - progress);
      const currentPos = 50 + swing * 7;

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
    }, 450);

    return () => {
      clearTimeout(timer);
      cancelAnimationFrame(frameId);
    };
  }, [hasAnimated]);

  // Clean precision vertical split
  const clipPathStyle = `polygon(0% 0%, ${sliderPos}% 0%, ${sliderPos}% 100%, 0% 100%)`;

  return (
    <section className="ba-section" id="transformations" aria-label="Before and After Interior Transformations">
      <div className="ba-container">
        {/* 1. Editorial Header */}
        <div className="ba-header">
          <div className="ba-header-lead">
            <span className="ba-kicker">03 / SPATIAL METAMORPHOSIS · BEFORE &amp; AFTER</span>
            <h2 className="ba-title">
              Raw Framework to Living Sanctuary.
            </h2>
          </div>

          <div className="ba-header-right">
            <p className="ba-intro">
              Drag the precision divider to reveal the meticulous transition from structural rough-in to refined, bespoke living spaces.
            </p>
            <div className="ba-drag-hint" aria-hidden="true">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="7 8 3 12 7 16" />
                <polyline points="17 8 21 12 17 16" />
                <line x1="3" y1="12" x2="21" y2="12" />
              </svg>
              <span>Slide divider to compare</span>
            </div>
          </div>
        </div>

        {/* 2. Main Before & After Precision Comparison Stage */}
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
            {/* AFTER Image Layer (Base Layer) */}
            <div className="ba-layer ba-layer-after" aria-hidden="true">
              <img
                src={currentItem.afterImage}
                alt={currentItem.afterAlt}
                className="ba-image"
                loading="eager"
                decoding="async"
              />
            </div>

            {/* BEFORE Image Layer (Top Layer - precision vertical clip) */}
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

            {/* Clean Precision Divider Line */}
            <div
              className="ba-divider-line"
              style={{ left: `${sliderPos}%` }}
              aria-hidden="true"
            />

            {/* Draggable Minimalist Center Handle */}
            <div
              className="ba-handle"
              style={{ left: `${sliderPos}%` }}
              role="slider"
              tabIndex={0}
              aria-valuenow={Math.round(sliderPos)}
              aria-valuemin={6}
              aria-valuemax={94}
              aria-label="Comparison slider position"
              onKeyDown={handleKeyDown}
            >
              <div className="ba-handle-disc" aria-hidden="true">
                <svg
                  className="ba-handle-chevrons"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="8 5 2 12 8 19" />
                  <polyline points="16 5 22 12 16 19" />
                </svg>
              </div>
            </div>

            {/* Minimalist Frosted Corner Labels */}
            <div className="ba-badge ba-badge-before">
              <span>BEFORE · ROUGH-IN</span>
            </div>

            <div className="ba-badge ba-badge-after">
              <span className="ba-badge-dot" aria-hidden="true" />
              <span>AFTER · REFINED</span>
            </div>

            {/* In-Stage Bottom Room Badge */}
            <div className="ba-stage-badge" aria-hidden="true">
              <span className="ba-stage-badge-room">{currentItem.room}</span>
              <span className="ba-stage-badge-sep">/</span>
              <span className="ba-stage-badge-title">{currentItem.title}</span>
            </div>
          </div>
        </div>

        {/* 3. Architectural Thumbnail Strip (Quiet Luxury Gallery) */}
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
      </div>
    </section>
  );
};

export default BeforeAfterSection;
