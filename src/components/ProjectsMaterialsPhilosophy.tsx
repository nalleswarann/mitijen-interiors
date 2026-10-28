import React, { useState } from 'react';
import { PORTFOLIO_MATERIALS } from '../data/portfolioData';
import { SectionLabel } from './common/SectionLabel';

interface ProjectsMaterialsPhilosophyProps {
  onSelectProjectByTitle?: (projectTitle: string) => void;
}

export const ProjectsMaterialsPhilosophy: React.FC<ProjectsMaterialsPhilosophyProps> = ({
  onSelectProjectByTitle
}) => {
  const [activeIdx, setActiveIdx] = useState(0);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveIdx((prev) => (prev + 1) % PORTFOLIO_MATERIALS.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIdx((prev) => (prev - 1 + PORTFOLIO_MATERIALS.length) % PORTFOLIO_MATERIALS.length);
    }
  };

  return (
    <section className="projects-materials-section" id="materials" aria-labelledby="materials-heading">
      <SectionLabel style={{ color: 'var(--brown)' }}>Material Philosophy & Tactility</SectionLabel>
      <h2 id="materials-heading" style={{ marginTop: '0.8rem', color: 'var(--ink)' }}>
        The beauty is in the details.
      </h2>

      <div className="projects-materials-layout">
        {/* Left Sticky Preview Plate */}
        <div className="materials-preview-wrapper">
          <div className="materials-sticky-box">
            {PORTFOLIO_MATERIALS.map((mat, i) => (
              <div
                key={mat.id}
                className={`materials-plate ${i === activeIdx ? 'is-active' : ''}`}
                role="img"
                aria-label={`${mat.title} architectural sample`}
              >
                <img
                  src={mat.image}
                  alt={`${mat.title} close-up texture`}
                  className="materials-plate-img"
                  loading="lazy"
                />
                <div className="materials-plate-caption">
                  <span className="plate-caption-num">{mat.num}</span>
                  <span className="plate-caption-title">{mat.title}</span>
                  <span className="plate-caption-spec">{mat.specs}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Interactive Tab List */}
        <div
          className="materials-tabs-list"
          role="tablist"
          aria-orientation="vertical"
          aria-label="Architectural materials philosophy"
        >
          {PORTFOLIO_MATERIALS.map((mat, i) => {
            const isSelected = i === activeIdx;
            return (
              <button
                key={mat.id}
                type="button"
                className={`materials-tab-row ${isSelected ? 'is-selected' : ''}`}
                role="tab"
                aria-selected={isSelected}
                tabIndex={isSelected ? 0 : -1}
                onClick={() => setActiveIdx(i)}
                onMouseEnter={() => {
                  if (window.matchMedia('(hover: hover)').matches) {
                    setActiveIdx(i);
                  }
                }}
                onKeyDown={(e) => handleKeyDown(e)}
              >
                <span className="materials-tab-num">{mat.num}</span>
                <span className="materials-tab-content">
                  <b className="materials-tab-title">{mat.title}</b>
                  <span className="materials-tab-drawer">
                    <span className="materials-tab-desc">
                      {mat.description}
                      <em
                        className="materials-tab-seen-link"
                        onClick={(e) => {
                          if (onSelectProjectByTitle) {
                            e.stopPropagation();
                            onSelectProjectByTitle(mat.seenIn);
                          }
                        }}
                      >
                        Seen in {mat.seenIn} →
                      </em>
                    </span>
                  </span>
                </span>
              </button>
            );
          })}
        </div>
      </div>
    </section>
  );
};
