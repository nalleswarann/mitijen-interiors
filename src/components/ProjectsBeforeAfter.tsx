import React, { useState, useRef, useCallback } from 'react';
import { BEFORE_AFTER_ITEMS, type BeforeAfterItem } from '../data/portfolioData';

interface ProjectsBeforeAfterProps {
  onSelectProject?: (title: string) => void;
}

export const ProjectsBeforeAfter: React.FC<ProjectsBeforeAfterProps> = () => {
  const [activeIdx, setActiveIdx] = useState(0);
  const [sliderPos, setSliderPos] = useState(50); // percentage 0 - 100
  const [isDragging, setIsDragging] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const currentItem: BeforeAfterItem = BEFORE_AFTER_ITEMS[activeIdx] || BEFORE_AFTER_ITEMS[0];

  const updatePosition = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = clientX - rect.left;
    const percentage = Math.max(5, Math.min(95, (x / rect.width) * 100));
    setSliderPos(percentage);
  }, []);

  const handleMouseDown = () => {
    setIsDragging(true);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    updatePosition(e.clientX);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (e.touches[0]) {
      updatePosition(e.touches[0].clientX);
    }
  };

  return (
    <section className="projects-ba-section" id="transformations">
      <div className="projects-ba-header">
        <div>
          <span className="lab" style={{ color: 'var(--olive)' }}>
            Spatial Transformation · Site to Realisation
          </span>
          <h2 className="projects-ba-title">From raw structure to quiet sanctuary.</h2>
        </div>
        <p className="projects-ba-intro">
          True luxury is not applied ornament — it is the patient resolution of proportion, raw civil structure,
          and tactile materials. Drag to inspect the architectural evolution.
        </p>
      </div>

      {/* Tabs */}
      <div className="projects-ba-tabs" role="tablist" aria-label="Transformations">
        {BEFORE_AFTER_ITEMS.map((item, idx) => (
          <button
            key={item.id}
            role="tab"
            aria-selected={idx === activeIdx}
            className={`projects-ba-tab-btn ${idx === activeIdx ? 'is-active' : ''}`}
            onClick={() => {
              setActiveIdx(idx);
              setSliderPos(50);
            }}
          >
            <span className="projects-ba-tab-num">0{idx + 1}</span>
            <span className="projects-ba-tab-label">{item.title}</span>
          </button>
        ))}
      </div>

      {/* Interactive Slider Frame */}
      <div
        className="projects-ba-viewer"
        ref={containerRef}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
        onTouchMove={handleTouchMove}
      >
        {/* AFTER Image (Full background layer) */}
        <div className="projects-ba-layer projects-ba-after">
          <img src={currentItem.afterImage} alt={`${currentItem.title} After completion`} />
          <div className="projects-ba-badge projects-ba-badge-after">
            <span className="projects-ba-badge-dot is-after"></span>
            {currentItem.afterLabel}
          </div>
        </div>

        {/* BEFORE Image (Clipped layer on top) */}
        <div
          className="projects-ba-layer projects-ba-before"
          style={{ clipPath: `inset(0 ${100 - sliderPos}% 0 0)` }}
        >
          <img src={currentItem.beforeImage} alt={`${currentItem.title} Before construction`} />
          <div className="projects-ba-badge projects-ba-badge-before">
            <span className="projects-ba-badge-dot is-before"></span>
            {currentItem.beforeLabel}
          </div>
        </div>

        {/* Divider Handle */}
        <div
          className={`projects-ba-divider ${isDragging ? 'is-dragging' : ''}`}
          style={{ left: `${sliderPos}%` }}
          onMouseDown={handleMouseDown}
          onTouchStart={() => setIsDragging(true)}
          onTouchEnd={() => setIsDragging(false)}
        >
          <div className="projects-ba-divider-line"></div>
          <div className="projects-ba-handle">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M15 18l-6-6 6-6" />
              <path d="M9 18l-6-6 6-6" />
              <path d="M19 6l6 6-6 6" />
            </svg>
          </div>
        </div>

        {/* Drag Hint on hover */}
        <div className="projects-ba-hint">
          <span>Drag to compare</span>
        </div>
      </div>

      {/* Meta Bar below viewer */}
      <div className="projects-ba-meta">
        <div className="projects-ba-meta-block">
          <span className="projects-ba-meta-label">Typology</span>
          <span className="projects-ba-meta-val">{currentItem.category}</span>
        </div>
        <div className="projects-ba-meta-block">
          <span className="projects-ba-meta-label">Location</span>
          <span className="projects-ba-meta-val">{currentItem.location}</span>
        </div>
        <div className="projects-ba-meta-desc">
          <p>{currentItem.description}</p>
        </div>
      </div>
    </section>
  );
};
