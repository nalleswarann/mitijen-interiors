import React, { useState, useEffect, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  PORTFOLIO_PROJECTS,
  PORTFOLIO_FILTERS,
  type PortfolioProject
} from '../data/portfolioData';
import { ProjectsMaterialsPhilosophy } from '../components/ProjectsMaterialsPhilosophy';
import { ProjectsBeforeAfter } from '../components/ProjectsBeforeAfter';
import { SEO } from '../components/common/SEO';
import { useInquiry } from '../context/useInquiry';
import { useScrollReveal } from '../hooks/useScrollReveal';
import '../styles/ProjectsPage.css';

type LayoutMode = 'ed' | 'full' | 'idx';

interface HeroBanner {
  id: string;
  title: string;
  subtitle: string;
  image: string;
  location: string;
}

const HERO_BANNERS: HeroBanner[] = [
  {
    id: 'b1',
    title: 'The Quiet Residence',
    subtitle: 'Chennai · 4,800 sq.ft Villa',
    image: '/assets/mitijen/Banner1.jpg',
    location: '13.0827° N, 80.2707° E'
  },
  {
    id: 'b2',
    title: 'The Olive House',
    subtitle: 'Coimbatore · 3,600 sq.ft Courtyard',
    image: '/assets/mitijen/Banner2.jpg',
    location: '11.0168° N, 76.9558° E'
  },
  {
    id: 'b3',
    title: 'The Stillwater Apartment',
    subtitle: 'Bengaluru · 2,450 sq.ft Penthouse',
    image: '/assets/mitijen/Banner3.jpg',
    location: '12.9716° N, 77.5946° E'
  }
];

export const ProjectsPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { openInquiry } = useInquiry();

  // Active filter & layout state
  const [activeFilterIdx, setActiveFilterIdx] = useState(0);
  const [layoutMode, setLayoutMode] = useState<LayoutMode>('ed');
  const [isGridTransitioning, setIsGridTransitioning] = useState(false);
  const [activeHeroIdx, setActiveHeroIdx] = useState(0);

  // Derive selected project directly from URL hash for instant sync
  const rawHash = location.hash.replace('#', '');
  const selectedProject: PortfolioProject | null = useMemo(() => {
    if (!rawHash) return null;
    return (
      PORTFOLIO_PROJECTS.find(
        (p) => p.id === rawHash || p.shortId === rawHash
      ) || null
    );
  }, [rawHash]);

  // Scroll to top when opening or changing project detail
  useEffect(() => {
    if (selectedProject) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [selectedProject]);

  // Auto-cycle hero banner every 7 seconds if user is in top hero
  useEffect(() => {
    const timer = setInterval(() => {
      setActiveHeroIdx((prev) => (prev + 1) % HERO_BANNERS.length);
    }, 7000);
    return () => clearInterval(timer);
  }, []);

  // Filtered projects
  const filteredProjects = useMemo(() => {
    const filterName = PORTFOLIO_FILTERS[activeFilterIdx];
    if (filterName === 'All Projects') {
      return PORTFOLIO_PROJECTS;
    }
    return PORTFOLIO_PROJECTS.filter((p) => p.tags.includes(filterName));
  }, [activeFilterIdx]);

  // Scroll reveal observer
  useScrollReveal([filteredProjects, layoutMode, selectedProject]);

  // Handle filter change with smooth fade
  const handleFilterClick = (index: number) => {
    if (index === activeFilterIdx) return;
    setIsGridTransitioning(true);
    setTimeout(() => {
      setActiveFilterIdx(index);
      setIsGridTransitioning(false);
    }, 200);
  };

  // Handle layout mode change with smooth fade
  const handleLayoutChange = (mode: LayoutMode) => {
    if (mode === layoutMode) return;
    setIsGridTransitioning(true);
    setTimeout(() => {
      setLayoutMode(mode);
      setIsGridTransitioning(false);
    }, 200);
  };

  // Project selection handlers
  const handleOpenDetail = (project: PortfolioProject) => {
    navigate(`#${project.shortId}`, { replace: false });
  };

  const handleCloseDetail = () => {
    navigate('/projects', { replace: false });
    setTimeout(() => {
      const workSection = document.getElementById('work');
      if (workSection) {
        workSection.scrollIntoView({ behavior: 'smooth' });
      }
    }, 50);
  };

  const handleSelectByTitle = (title: string) => {
    const matched = PORTFOLIO_PROJECTS.find(
      (p) =>
        p.name.toLowerCase().includes(title.toLowerCase()) ||
        title.toLowerCase().includes(p.name.toLowerCase())
    );
    if (matched) {
      handleOpenDetail(matched);
    }
  };

  // Next project logic for Monograph detail view
  const nextProject = useMemo(() => {
    if (!selectedProject) return null;
    const currentIndex = PORTFOLIO_PROJECTS.findIndex((p) => p.id === selectedProject.id);
    const nextIndex = (currentIndex + 1) % PORTFOLIO_PROJECTS.length;
    return PORTFOLIO_PROJECTS[nextIndex];
  }, [selectedProject]);

  // Editorial grid column mapping to create high-fashion magazine rhythm
  const getEditorialSpan = (index: number) => {
    const cycle = index % 6;
    switch (cycle) {
      case 0:
        return 'col-span-7 aspect-16-11';
      case 1:
        return 'col-span-5 aspect-3-4 mt-editorial';
      case 2:
        return 'col-span-5 aspect-4-5';
      case 3:
        return 'col-span-7 aspect-16-10 mt-editorial-sm';
      case 4:
        return 'col-span-12 aspect-21-9';
      case 5:
        return 'col-span-6 aspect-4-3';
      default:
        return 'col-span-6 aspect-16-10';
    }
  };

  // =========================================================================
  // MONOGRAPH DETAIL VIEW
  // =========================================================================
  if (selectedProject) {
    const currentNumber = selectedProject.num;
    return (
      <main className="projects-detail-view" aria-live="polite">
        <SEO
          title={`${selectedProject.name} — Architecture & Interior Monograph`}
          description={selectedProject.description}
          canonical={`/project/${selectedProject.id}`}
        />

        {/* Monograph Top Navigation Bar */}
        <header className="projects-detail-topbar">
          <button
            type="button"
            className="projects-detail-back-btn"
            onClick={handleCloseDetail}
            aria-label="Return to full portfolio list"
          >
            <svg width="18" height="12" viewBox="0 0 18 12" fill="none" stroke="currentColor">
              <path d="M18 6H2M7 1L2 6l5 5" strokeWidth="1.5" />
            </svg>
            <span>Return to Portfolio</span>
          </button>
          <div className="projects-detail-counter">
            <span className="current">{currentNumber}</span>
            <span className="sep">/</span>
            <span className="total">0{PORTFOLIO_PROJECTS.length}</span>
          </div>
          <button
            type="button"
            className="projects-detail-inquire-btn"
            onClick={() => openInquiry(`Project Inquiry: ${selectedProject.name}`)}
          >
            Start a Similar Space →
          </button>
        </header>

        {/* Monograph Hero Header */}
        <section className="projects-detail-hero">
          <div className="projects-detail-hero-plate">
            <img
              src={selectedProject.coverImage}
              alt={selectedProject.name}
              className="projects-detail-hero-img"
            />
            <div className="projects-detail-hero-overlay" />
          </div>

          <div className="projects-detail-hero-content">
            <div className="projects-detail-hero-badges">
              <span className="projects-detail-badge">{selectedProject.category}</span>
              <span className="projects-detail-badge">{selectedProject.year}</span>
              <span className="projects-detail-badge">{selectedProject.area}</span>
            </div>
            <h1 className="projects-detail-hero-title">{selectedProject.name}</h1>
            <p className="projects-detail-hero-loc">{selectedProject.location}</p>
          </div>
        </section>

        {/* Monograph Architectural Dossier (4-Col Metadata) */}
        <section className="projects-detail-specs-bar">
          <div className="projects-detail-spec-cell">
            <span className="spec-label">Typology</span>
            <b className="spec-value">{selectedProject.typology}</b>
          </div>
          <div className="projects-detail-spec-cell">
            <span className="spec-label">Area & Scale</span>
            <b className="spec-value">{selectedProject.area}</b>
          </div>
          <div className="projects-detail-spec-cell">
            <span className="spec-label">Location</span>
            <b className="spec-value">{selectedProject.location}</b>
          </div>
          <div className="projects-detail-spec-cell">
            <span className="spec-label">Status</span>
            <b className="spec-value">{selectedProject.status}</b>
          </div>
        </section>

        {/* Monograph Story & Architectural Narrative */}
        <section className="projects-detail-narrative">
          <div className="narrative-left">
            <span className="lab" style={{ color: 'var(--olive)' }}>Architectural Brief & Concept</span>
            <blockquote className="projects-detail-quote">
              "{selectedProject.concept}"
            </blockquote>
            <p className="projects-detail-desc">{selectedProject.description}</p>
          </div>

          <div className="narrative-right">
            <div className="narrative-card">
              <span className="narrative-card-label">Spatial Challenge</span>
              <p>{selectedProject.challenge}</p>
            </div>
            <div className="narrative-card">
              <span className="narrative-card-label">Design Intervention</span>
              <p>{selectedProject.solution}</p>
            </div>
          </div>
        </section>

        {/* Material Palette Chips */}
        <section className="projects-detail-materials-palette">
          <span className="lab" style={{ color: 'var(--brown)' }}>Material Specifications</span>
          <div className="materials-palette-chips">
            {selectedProject.materials.map((mat, idx) => (
              <div key={idx} className="material-spec-chip">
                <span className="chip-num">0{idx + 1}</span>
                <span className="chip-title">{mat}</span>
              </div>
            ))}
          </div>
        </section>

        {/* Monograph Photo Spread Gallery */}
        <section className="projects-detail-gallery-spread">
          <div className="spread-diptych">
            <div className="spread-item spread-item-1">
              <img
                src={selectedProject.galleryImages[1] || selectedProject.coverImage}
                alt={`${selectedProject.name} architectural detail`}
                loading="lazy"
              />
            </div>
            <div className="spread-item spread-item-2">
              <img
                src={selectedProject.galleryImages[2] || selectedProject.coverImage}
                alt={`${selectedProject.name} perspective`}
                loading="lazy"
              />
            </div>
          </div>

          {selectedProject.galleryImages[3] && (
            <div className="spread-panorama">
              <img
                src={selectedProject.galleryImages[3]}
                alt={`${selectedProject.name} panoramic wide view`}
                loading="lazy"
              />
              <span className="spread-panorama-caption">
                Panoramic interior perspective · {selectedProject.name}
              </span>
            </div>
          )}
        </section>

        {/* Next Project Footer Monograph Preview */}
        {nextProject && (
          <section
            className="projects-detail-next-banner"
            onClick={() => handleOpenDetail(nextProject)}
          >
            <div className="next-banner-bg">
              <img src={nextProject.coverImage} alt={nextProject.name} />
              <div className="next-banner-overlay" />
            </div>
            <div className="next-banner-content">
              <span className="next-banner-tag">Next Architectural Monograph · 0{nextProject.num}</span>
              <h2 className="next-banner-title">{nextProject.name}</h2>
              <span className="next-banner-loc">{nextProject.location} · {nextProject.area}</span>
              <span className="next-banner-link">Explore Project →</span>
            </div>
          </section>
        )}
      </main>
    );
  }

  // =========================================================================
  // MAIN PORTFOLIO PAGE
  // =========================================================================
  const activeHero = HERO_BANNERS[activeHeroIdx];

  return (
    <main className="projects-page-wrapper" id="projects-main">
      <SEO
        title="Architecture & Interior Portfolio — Mitjen Interiors"
        description="Explore curated residential, villa, apartment, and corporate interior architecture projects by Mitjen Interiors."
        canonical="/projects"
      />

      {/* =====================================================================
          CINEMATIC ARCHITECTURAL HERO
          ===================================================================== */}
      <section className="projects-hero" id="top">
        <div className="projects-hero-text">
          <div className="projects-hero-header-badge">
            <span className="hero-studio-tag">EST. 2018</span>
            <span className="hero-vol-tag">PORTFOLIO VOL. I — 2024 / 2026</span>
          </div>

          <h1 className="projects-hero-title">
            <span className="ln">
              <span>Spaces shaped around</span>
            </span>
            <span className="ln">
              <span>the quiet art of living.</span>
            </span>
          </h1>

          <p className="projects-hero-desc">
            Explore a collection of considered interiors, where monolithic stone, quarter-sawn
            timber, and architectural light converge to create environments that feel timeless,
            tactile, and deeply personal.
          </p>

          <div className="projects-hero-meta">
            <div className="projects-hero-stat">
              <span className="stat-num">05</span>
              <span className="stat-label">Selected Spaces</span>
            </div>
            <div className="projects-hero-stat-sep" />
            <div className="projects-hero-stat">
              <span className="stat-num">100%</span>
              <span className="stat-label">Custom Millwork</span>
            </div>
            <div className="projects-hero-stat-sep" />
            <div className="projects-hero-coords">
              <span className="coords-code">13.0827° N, 80.2707° E</span>
              <span className="coords-city">CHENNAI STUDIO</span>
            </div>
            <span className="projects-scroll-line" aria-hidden="true" />
          </div>
        </div>

        {/* Hero Interactive Showcase Slider */}
        <div className="projects-hero-image-wrap">
          <div className="projects-hero-image-slider">
            {HERO_BANNERS.map((banner, idx) => (
              <div
                key={banner.id}
                className={`hero-slide-item ${idx === activeHeroIdx ? 'is-active' : ''}`}
              >
                <img src={banner.image} alt={banner.title} />
              </div>
            ))}
          </div>

          <div className="projects-hero-image-caption">
            <div className="caption-text">
              <span className="caption-num">0{activeHeroIdx + 1} / 03</span>
              <b className="caption-title">{activeHero.title}</b>
              <span className="caption-sub">{activeHero.subtitle}</span>
            </div>

            {/* Slider Switch Dots */}
            <div className="caption-dots" role="group" aria-label="Hero project switcher">
              {HERO_BANNERS.map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  aria-label={`Show slide ${idx + 1}`}
                  className={`caption-dot-btn ${idx === activeHeroIdx ? 'is-active' : ''}`}
                  onClick={() => setActiveHeroIdx(idx)}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          STICKY GALLERY CONTROLS (FILTER PILLS & LAYOUT MODES)
          ===================================================================== */}
      <section className="projects-gallery-section" id="work">
        <div className="projects-filter-bar">
          {/* Category Tabs */}
          <div
            className="projects-filter-pills"
            role="tablist"
            aria-label="Filter portfolio projects"
          >
            {PORTFOLIO_FILTERS.map((filter, index) => {
              const isSelected = index === activeFilterIdx;
              return (
                <button
                  key={filter}
                  type="button"
                  role="tab"
                  aria-selected={isSelected}
                  className={`projects-filter-btn ${isSelected ? 'is-active' : ''}`}
                  onClick={() => handleFilterClick(index)}
                >
                  {filter}
                </button>
              );
            })}
          </div>

          {/* Actions & Layout Toggles */}
          <div className="projects-filter-actions">
            <div className="projects-layout-toolbar" role="group" aria-label="Gallery display mode">
              <span className="projects-layout-label">View:</span>
              <button
                type="button"
                className={`projects-layout-btn ${layoutMode === 'ed' ? 'is-active' : ''}`}
                onClick={() => handleLayoutChange('ed')}
                title="Editorial magazine layout"
                aria-pressed={layoutMode === 'ed'}
              >
                Editorial
              </button>
              <button
                type="button"
                className={`projects-layout-btn ${layoutMode === 'full' ? 'is-active' : ''}`}
                onClick={() => handleLayoutChange('full')}
                title="Full-width monograph layout"
                aria-pressed={layoutMode === 'full'}
              >
                Monograph
              </button>
              <button
                type="button"
                className={`projects-layout-btn ${layoutMode === 'idx' ? 'is-active' : ''}`}
                onClick={() => handleLayoutChange('idx')}
                title="Table index layout"
                aria-pressed={layoutMode === 'idx'}
              >
                Index
              </button>
            </div>

            <span className="projects-filter-count" aria-live="polite">
              {filteredProjects.length} {filteredProjects.length === 1 ? 'Space' : 'Spaces'}
            </span>
          </div>
        </div>

        {/* ===================================================================
            PROJECTS GRID / LIST CONTAINER
            =================================================================== */}
        <div
          className={`projects-container projects-view-${layoutMode} ${
            isGridTransitioning ? 'is-transitioning' : ''
          }`}
          data-v={layoutMode}
        >
          {filteredProjects.map((project, index) => {
            const editorialSpanClass = getEditorialSpan(index);

            // ---------------------------------------------------------------
            // 1. INDEX TABLE VIEW
            // ---------------------------------------------------------------
            if (layoutMode === 'idx') {
              return (
                <article
                  key={project.id}
                  className="projects-idx-row"
                  onClick={() => handleOpenDetail(project)}
                  data-reveal=""
                >
                  <div className="idx-thumb">
                    <img src={project.coverImage} alt={project.name} loading="lazy" />
                  </div>
                  <div className="idx-title-group">
                    <span className="idx-cat-badge">{project.category}</span>
                    <h3 className="idx-name">{project.name}</h3>
                  </div>
                  <div className="idx-col idx-location">{project.location}</div>
                  <div className="idx-col idx-category">{project.category}</div>
                  <div className="idx-col idx-year">{project.year}</div>
                  <div className="idx-col idx-area">{project.area}</div>
                  <div className="idx-col idx-action">
                    <span className="idx-arrow">→</span>
                  </div>
                </article>
              );
            }

            // ---------------------------------------------------------------
            // 2. MONOGRAPH FULL-WIDTH VIEW
            // ---------------------------------------------------------------
            if (layoutMode === 'full') {
              return (
                <article
                  key={project.id}
                  className="projects-full-card"
                  onClick={() => handleOpenDetail(project)}
                  data-reveal=""
                >
                  <div className="projects-full-plate">
                    <img src={project.coverImage} alt={project.name} loading="lazy" />
                    <div className="projects-full-plate-tag">{project.category}</div>
                  </div>
                  <div className="projects-full-content">
                    <div className="projects-full-header">
                      <span className="projects-full-cat">
                        {project.typology || project.category} · {project.year}
                      </span>
                      <span className="projects-full-area">{project.area}</span>
                    </div>
                    <h3 className="projects-full-title">{project.name}</h3>
                    <p className="projects-full-loc">{project.location}</p>
                    <p className="projects-full-desc">{project.description}</p>
                    <div className="projects-full-materials">
                      <span className="mat-lead">Key Materials:</span>
                      <span className="mat-tags">{project.materials.slice(0, 3).join(' · ')}</span>
                    </div>
                    <div className="projects-full-cta-wrap">
                      <span className="projects-monograph-btn">
                        <span>View Architectural Monograph</span>
                        <span className="btn-arrow" aria-hidden="true">⟶</span>
                      </span>
                    </div>
                  </div>
                </article>
              );
            }

            // ---------------------------------------------------------------
            // 3. EDITORIAL ASYMMETRICAL MAGAZINE VIEW (DEFAULT)
            // ---------------------------------------------------------------
            return (
              <article
                key={project.id}
                className={`projects-card ${editorialSpanClass}`}
                onClick={() => handleOpenDetail(project)}
                data-reveal=""
                data-reveal-delay={`${(index % 3) * 120}`}
              >
                <div className="projects-card-plate">
                  <img
                    src={project.coverImage}
                    alt={project.name}
                    className="projects-card-img"
                    loading="lazy"
                  />
                  <div className="projects-card-plate-top">
                    <span className="projects-card-tag">{project.category}</span>
                    <span className="projects-card-year-tag">{project.year}</span>
                  </div>
                  <div className="projects-card-hover-pill">
                    <span>EXPLORE MONOGRAPH ⟶</span>
                  </div>
                </div>

                <div className="projects-card-info">
                  <div className="projects-card-main-col">
                    <div className="projects-card-kicker-row">
                      <span className="projects-card-kicker">
                        {project.typology || project.category}
                      </span>
                      <span className="projects-card-status">Commissioned {project.year}</span>
                    </div>

                    <div className="projects-card-title-row">
                      <h3 className="projects-card-title">{project.name}</h3>
                      <div className="projects-card-arrow-badge" aria-hidden="true">
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <line x1="7" y1="17" x2="17" y2="7" />
                          <polyline points="7 7 17 7 17 17" />
                        </svg>
                      </div>
                    </div>

                    <p className="projects-card-desc">{project.description}</p>
                  </div>

                  <div className="projects-card-side-col">
                    <div className="projects-card-specs-grid">
                      <div className="projects-spec-item">
                        <span className="spec-label">Location</span>
                        <span className="spec-val">{project.location}</span>
                      </div>
                      <div className="projects-spec-item">
                        <span className="spec-label">Volume</span>
                        <span className="spec-val">{project.area}</span>
                      </div>
                      {project.materials && project.materials.length > 0 && (
                        <div className="projects-spec-item spec-materials">
                          <span className="spec-label">Key Materials</span>
                          <span className="spec-val">{project.materials.slice(0, 2).join(' · ')}</span>
                        </div>
                      )}
                    </div>

                    <div className="projects-card-action">
                      <span className="projects-monograph-btn">
                        <span>Explore Monograph</span>
                        <span className="btn-arrow" aria-hidden="true">⟶</span>
                      </span>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </section>

      {/* =====================================================================
          SPATIAL TRANSFORMATION (BEFORE & AFTER SLIDER)
          ===================================================================== */}
      <ProjectsBeforeAfter onSelectProject={handleSelectByTitle} />

      {/* =====================================================================
          MATERIAL PHILOSOPHY & TACTILITY SHOWCASE
          ===================================================================== */}
      <ProjectsMaterialsPhilosophy onSelectProjectByTitle={handleSelectByTitle} />

      
    </main>
  );
};
