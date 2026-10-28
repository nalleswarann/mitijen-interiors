import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import type { Project } from '../data/projects';
import { PROJECTS } from '../data/projects';
import { SectionLabel } from './common/SectionLabel';

interface ProjectsSectionProps {
  onSelectProject: (project: Project) => void;
}

const CATEGORY_ROUTES: Record<string, string> = {
  residential: '/services/residential-interior-design',
  commercial: '/services/commercial-interior-design',
  corporates: '/services/corporate-interior-design'
};

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({ onSelectProject }) => {
  const [activeHoverId, setActiveHoverId] = useState<string | null>(null);
  const [expandedMobileId, setExpandedMobileId] = useState<string | null>(null);
  const navigate = useNavigate();

  const handleRowClick = (project: Project) => {
    // On mobile devices, first tap toggles preview drawer; second tap navigates to service page
    if (typeof window !== 'undefined' && window.innerWidth <= 900) {
      if (expandedMobileId === project.id) {
        const route = CATEGORY_ROUTES[project.id];
        if (route) {
          navigate(route);
        } else {
          onSelectProject(project);
        }
      } else {
        setExpandedMobileId(project.id);
      }
    } else {
      const route = CATEGORY_ROUTES[project.id];
      if (route) {
        navigate(route);
      } else {
        onSelectProject(project);
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent, project: Project) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      const route = CATEGORY_ROUTES[project.id];
      if (route) {
        navigate(route);
      } else {
        onSelectProject(project);
      }
    }
  };

  return (
    <section id="projects" className="projects-editorial-section" aria-label="Portfolio Projects & Sectors">
      {/* Editorial Section Header */}
      <div className="projects-editorial-header">
        <div className="projects-header-meta">
          <SectionLabel style={{ color: 'var(--brown)' }}>
            Selected Works · Portfolio Index
          </SectionLabel>
          <span className="projects-edition-tag font-special">
            [ 03 SECTORS // ARCHIVE 2024–2026 ]
          </span>
        </div>

        <div className="projects-header-lead">
          <div className="projects-header-text">
            <h2 className="projects-editorial-h2 font-heading">
              Shaped Volumes & Living Spaces.
            </h2>
            <p className="projects-editorial-intro font-content">
              An editorial index across residential architecture, commercial venues, and corporate headquarters shaped around natural light, stillness, and honest materiality. Click any category to explore dedicated service offerings.
            </p>
          </div>

          <div
            className="projects-header-image-box"
            role="button"
            tabIndex={0}
            aria-label="View Mitjen Interiors commercial design services"
            onClick={() => navigate('/services/commercial-interior-design')}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                navigate('/services/commercial-interior-design');
              }
            }}
          >
            <div className="projects-header-image-frame">
              <img
                src="/assets/mitijen/commercial1.jpeg"
                alt="Mitjen Interiors commercial spatial architecture"
                className="projects-header-img"
                loading="lazy"
              />
              <div className="projects-header-image-overlay" />
            </div>
            <div className="projects-header-image-meta font-special">
              <span>FEATURED VENUE // BOUTIQUE COMMERCIAL</span>
              <span className="tag-accent">[ COMMERCIAL OFFERINGS → ]</span>
            </div>
          </div>
        </div>
      </div>

      {/* Editorial Portfolio List: 1. Residential, 2. Commercial, 3. Corporates */}
      <div className="portfolio-list" role="list">
        {PROJECTS.map((project) => {
          const isHovered = activeHoverId === project.id;
          const isMobileExpanded = expandedMobileId === project.id;

          return (
            <article
              key={project.id}
              className={`portfolio-row ${isHovered ? 'is-hovered' : ''} ${
                isMobileExpanded ? 'is-mobile-expanded' : ''
              }`}
              role="button"
              tabIndex={0}
              aria-label={`Navigate to ${project.categoryTitle} interior design page`}
              onClick={() => handleRowClick(project)}
              onKeyDown={(e) => handleKeyDown(e, project)}
              onPointerEnter={() => setActiveHoverId(project.id)}
              onPointerLeave={() => setActiveHoverId(null)}
              onFocus={() => setActiveHoverId(project.id)}
              onBlur={() => setActiveHoverId(null)}
            >
              <div className="portfolio-row-inner">
                {/* Left: Roman Numeral & Classification */}
                <div className="portfolio-row-lead">
                  <span className="portfolio-numeral font-special">{project.numeral}</span>
                  <div className="portfolio-lead-tags">
                    <span className="portfolio-cat-label font-special">{project.cat}</span>
                    {project.archRef && (
                      <span className="portfolio-arch-ref font-special">{project.archRef}</span>
                    )}
                  </div>
                </div>

                {/* Center: Dominant Average Heading & Supporting Metadata */}
                <div className="portfolio-title-area">
                  <h3 className="portfolio-category-title font-heading">
                    {project.categoryTitle}
                  </h3>
                  <div className="portfolio-project-meta font-content">
                    <span className="portfolio-project-name">{project.name}</span>
                    <span className="portfolio-dot-sep">·</span>
                    <span className="portfolio-project-loc">{project.loc}</span>
                    <span className="portfolio-dot-sep">·</span>
                    <span className="portfolio-project-year">{project.year}</span>
                  </div>
                </div>

                {/* Right: Floating Single Image Reveal Stage on Hover */}
                <div className="portfolio-preview-stage" aria-hidden="true">
                  <div className="portfolio-preview-frame single-frame">
                    <img
                      src={project.previewImage}
                      alt=""
                      loading="lazy"
                      className="portfolio-preview-img"
                    />
                    <div className="portfolio-preview-overlay" />
                  </div>
                </div>

                {/* Rightmost: Action Indicator */}
                <div className="portfolio-action-prompt font-content">
                  <span className="portfolio-action-label">Explore Service</span>
                  <span className="portfolio-action-icon">
                    <svg
                      width="18"
                      height="12"
                      viewBox="0 0 18 12"
                      fill="none"
                      stroke="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        d="M1 6h16M11 1l5 5-5 5"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </span>
                </div>
              </div>

              {/* Mobile Drawer (revealed on tap for touch devices) */}
              <div
                className={`portfolio-mobile-drawer ${isMobileExpanded ? 'is-open' : ''}`}
                aria-hidden={!isMobileExpanded}
              >
                <div className="portfolio-mobile-single-card">
                  <img src={project.previewImage} alt={project.name} loading="lazy" />
                  <div className="portfolio-preview-overlay" />
                </div>
                <div className="portfolio-mobile-cta font-special">
                  Tap to view {project.categoryTitle} service page →
                </div>
              </div>
            </article>
          );
        })}
      </div>

      {/* Explore Full Portfolio Link */}
      <div style={{ textAlign: 'center', marginTop: '3.5rem' }}>
        <Link to="/projects" className="btn solid" style={{ display: 'inline-flex' }}>
          Explore Full Portfolio & Case Studies →
        </Link>
      </div>
    </section>
  );
};

export default ProjectsSection;
