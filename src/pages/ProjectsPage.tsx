import React, { useState, useEffect, useMemo } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  PORTFOLIO_PROJECTS,
  PORTFOLIO_FILTERS,
  type PortfolioProject
} from '../data/portfolioData';
import { SEO } from '../components/common/SEO';
import { useInquiry } from '../context/useInquiry';
import { useScrollReveal } from '../hooks/useScrollReveal';
import '../styles/ProjectsPage.css';

type LayoutMode = 'ed' | 'full' | 'idx';


export const ProjectsPage: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { openInquiry } = useInquiry();

  // Active filter & layout state
  const [activeFilterIdx, setActiveFilterIdx] = useState(0);
  const [layoutMode, setLayoutMode] = useState<LayoutMode>('ed');
  const [isGridTransitioning, setIsGridTransitioning] = useState(false);

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

  // Next project logic for Monograph detail view
  const nextProject = useMemo(() => {
    if (!selectedProject) return null;
    const currentIndex = PORTFOLIO_PROJECTS.findIndex((p) => p.id === selectedProject.id);
    const nextIndex = (currentIndex + 1) % PORTFOLIO_PROJECTS.length;
    return PORTFOLIO_PROJECTS[nextIndex];
  }, [selectedProject]);

  // Editorial grid column mapping with compact magazine rhythm (no massive empty voids or 110px margins)
  const getEditorialSpan = (index: number) => {
    const cycle = index % 5;
    switch (cycle) {
      case 0:
        return 'col-span-8 aspect-featured';
      case 1:
        return 'col-span-4 aspect-standard';
      case 2:
        return 'col-span-4 aspect-standard';
      case 3:
        return 'col-span-4 aspect-standard';
      case 4:
        return 'col-span-4 aspect-standard';
      default:
        return 'col-span-4 aspect-standard';
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
  return (
    <main className="projects-page-wrapper" id="projects-main">
      <SEO
        title="Architecture & Interior Portfolio — Mitjen Interiors"
        description="Explore curated residential, villa, apartment, and corporate interior architecture projects by Mitjen Interiors."
        canonical="/projects"
      />

      {/* =====================================================================
          CINEMATIC EDITORIAL HERO BANNER — SELECTED WORKS ARCHIVE
          ===================================================================== */}
      <section className="projects-editorial-banner" id="top" aria-label="Selected Works & Architectural Portfolio">
        <div className="banner-backdrop">
          <img
            src="/assets/projects_banner_bg.jpg"
            alt="Mitjen Interiors minimalist architectural space"
            className="banner-bg-img"
            loading="eager"
            fetchPriority="high"
          />
          <div className="banner-backdrop-overlay" aria-hidden="true" />
        </div>

        {/* Editorial Corner Stamps to distinguish the portfolio archive */}
        <div className="banner-corner-stamps" aria-hidden="true">
          <span className="corner-stamp stamp-left">ARCHIVE VOL. IV · 2021—2026</span>
          <span className="corner-stamp stamp-right">24 BUILT COMMISSIONS · SOUTH INDIA</span>
        </div>

        <div className="banner-content">
          {/* Top botanical sprig flourish & kicker */}
          <div className="banner-kicker-wrap">
            <svg
              className="banner-sprig sprig-left"
              width="54"
              height="18"
              viewBox="0 0 54 18"
              fill="none"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path d="M52 9 C36 9 18 6 2 2" strokeWidth="1.2" strokeLinecap="round" />
              <path d="M2 2 C0.5 4 1.5 6.5 4 6 C5.5 4.5 4.5 2.5 2 2Z" fill="currentColor" />
              <path d="M12 4 C10 1.5 7.5 2 6.5 4.5 C8.5 5.5 11 5.5 12 4Z" fill="currentColor" />
              <path d="M24 5.5 C22 3 19.5 3.5 18.5 6 C20.5 7 23 7 24 5.5Z" fill="currentColor" />
              <path d="M36 7 C34 4.5 31.5 5 30.5 7.5 C32.5 8.5 35 8.5 36 7Z" fill="currentColor" />
              <path d="M14 5 C16 3 18.5 3.5 19.5 6 C17.5 7 15 6.5 14 5Z" fill="currentColor" />
              <path d="M26 6.5 C28 4.5 30.5 5 31.5 7.5 C29.5 8.5 27 8 26 6.5Z" fill="currentColor" />
            </svg>
            <span className="banner-kicker">CURATED ARCHITECTURAL PORTFOLIO</span>
            <svg
              className="banner-sprig sprig-right"
              width="54"
              height="18"
              viewBox="0 0 54 18"
              fill="none"
              stroke="currentColor"
              aria-hidden="true"
            >
              <path d="M52 9 C36 9 18 6 2 2" strokeWidth="1.2" strokeLinecap="round" />
              <path d="M2 2 C0.5 4 1.5 6.5 4 6 C5.5 4.5 4.5 2.5 2 2Z" fill="currentColor" />
              <path d="M12 4 C10 1.5 7.5 2 6.5 4.5 C8.5 5.5 11 5.5 12 4Z" fill="currentColor" />
              <path d="M24 5.5 C22 3 19.5 3.5 18.5 6 C20.5 7 23 7 24 5.5Z" fill="currentColor" />
              <path d="M36 7 C34 4.5 31.5 5 30.5 7.5 C32.5 8.5 35 8.5 36 7Z" fill="currentColor" />
              <path d="M14 5 C16 3 18.5 3.5 19.5 6 C17.5 7 15 6.5 14 5Z" fill="currentColor" />
              <path d="M26 6.5 C28 4.5 30.5 5 31.5 7.5 C29.5 8.5 27 8 26 6.5Z" fill="currentColor" />
            </svg>
          </div>

          {/* Distinctive Selected Works Headline (Single Global H1) */}
          <h1 className="banner-title">
            <span className="title-line">Selected</span>
            <span className="title-line">Works</span>
          </h1>

          {/* Portfolio-Specific Subtitle */}
          <p className="banner-subtitle">
            A MONOGRAPHIC COMPENDIUM OF 24 BESPOKE RESIDENCES, COMMERCIAL VENUES &amp; WORKSPACES
          </p>

          {/* Reference-Matched White Capsule Floating Action Badges */}
          <div className="banner-actions">
            <a
              href="#work"
              className="banner-pill banner-pill-link"
              title="Explore 24 Built Works"
              onClick={(e) => {
                e.preventDefault();
                document.getElementById('work')?.scrollIntoView({ behavior: 'smooth' });
              }}
            >
              <span className="banner-pill-badge" aria-hidden="true">
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="3" width="7" height="7" />
                  <rect x="14" y="3" width="7" height="7" />
                  <rect x="14" y="14" width="7" height="7" />
                  <rect x="3" y="14" width="7" height="7" />
                </svg>
              </span>
              <span className="banner-pill-text">Browse 24 Monographic Spaces &darr;</span>
            </a>

            <button
              type="button"
              className="banner-pill banner-pill-btn"
              onClick={() => openInquiry('Portfolio Hero — Architectural Commission')}
              title="Inquire about commissioning an architectural project"
            >
              <span className="banner-pill-badge" aria-hidden="true">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="M12 19l7-7 3 3-7 7-3-3z" />
                  <path d="M18 13l-1.5-7.5L2 2l3.5 14.5L13 18l5-5z" />
                  <path d="M2 2l7.586 7.586" />
                  <circle cx="11" cy="11" r="2" />
                </svg>
              </span>
              <span className="banner-pill-text">Commission a Project &rarr;</span>
            </button>
          </div>
        </div>
      </section>

      {/* =====================================================================
          STICKY GALLERY CONTROLS (FILTER PILLS & LAYOUT MODES)
          ===================================================================== */}
      <section className="projects-gallery-section" id="work">
        <div className="projects-filter-bar">
          {/* Minimalist Category Tabs */}
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
                  className={`projects-filter-pill ${isSelected ? 'is-active' : ''}`}
                  onClick={() => handleFilterClick(index)}
                >
                  {filter}
                </button>
              );
            })}
          </div>

          {/* Minimalist Segmented Layout Dock & Count */}
          <div className="projects-filter-actions">
            <div className="projects-layout-dock" role="group" aria-label="Gallery display layout">
              <button
                type="button"
                className={`layout-dock-btn ${layoutMode === 'ed' ? 'is-active' : ''}`}
                onClick={() => handleLayoutChange('ed')}
                title="Editorial Grid"
                aria-label="Editorial Grid"
                aria-pressed={layoutMode === 'ed'}
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <rect x="3" y="3" width="7" height="7" />
                  <rect x="14" y="3" width="7" height="7" />
                  <rect x="14" y="14" width="7" height="7" />
                  <rect x="3" y="14" width="7" height="7" />
                </svg>
                <span>Editorial</span>
              </button>
              <button
                type="button"
                className={`layout-dock-btn ${layoutMode === 'full' ? 'is-active' : ''}`}
                onClick={() => handleLayoutChange('full')}
                title="Full Spread"
                aria-label="Full Spread"
                aria-pressed={layoutMode === 'full'}
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <rect x="3" y="4" width="18" height="16" rx="2" />
                  <line x1="3" y1="12" x2="21" y2="12" />
                </svg>
                <span>Spread</span>
              </button>
              <button
                type="button"
                className={`layout-dock-btn ${layoutMode === 'idx' ? 'is-active' : ''}`}
                onClick={() => handleLayoutChange('idx')}
                title="Index Directory"
                aria-label="Index Directory"
                aria-pressed={layoutMode === 'idx'}
              >
                <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <line x1="8" y1="6" x2="21" y2="6" />
                  <line x1="8" y1="12" x2="21" y2="12" />
                  <line x1="8" y1="18" x2="21" y2="18" />
                  <circle cx="4" cy="6" r="1.5" fill="currentColor" />
                  <circle cx="4" cy="12" r="1.5" fill="currentColor" />
                  <circle cx="4" cy="18" r="1.5" fill="currentColor" />
                </svg>
                <span>Index</span>
              </button>
            </div>

            <span className="projects-filter-count" aria-live="polite">
              {filteredProjects.length} Spaces
            </span>
          </div>
        </div>

        {/* ===================================================================
            PROJECTS GRID / LIST CONTAINER
            =================================================================== */}
        <div
          className={`projects-container projects-view-${layoutMode} ${isGridTransitioning ? 'is-transitioning' : ''
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
          STUDIO MONOGRAPHIC METRICS & COMMISSION CTA (DISTINCT TO PROJECTS)
          ===================================================================== */}
      <section className="projects-metrics-strip" aria-label="Studio Monograph Metrics">
        <div className="metrics-grid">
          <div className="metric-box">
            <span className="metric-num">24</span>
            <span className="metric-label">Built Monographic Works</span>
          </div>
          <div className="metric-box">
            <span className="metric-num">88K+</span>
            <span className="metric-label">Sq.Ft Architectural Volume</span>
          </div>
          <div className="metric-box">
            <span className="metric-num">04</span>
            <span className="metric-label">Cities · Chennai, BLR, CBE, HYD</span>
          </div>
          <div className="metric-box">
            <span className="metric-num">100%</span>
            <span className="metric-label">Bespoke Millwork &amp; Stone</span>
          </div>
        </div>
      </section>

      {/* Dedicated Architectural Commission Banner */}
      <section className="projects-commission-section" aria-labelledby="commission-heading">
        <div className="commission-inner">
          <div className="commission-header">
            <span className="commission-tag">ARCHITECTURAL COMMISSIONS</span>
            <h2 id="commission-heading" className="commission-heading">
              Have a residential or workspace project in mind?
            </h2>
            <p className="commission-desc">
              We accept a selective roster of private residence and corporate headquarters commissions each year, ensuring every joint, surface, and lightwell is executed with quiet precision.
            </p>
          </div>
          <div className="commission-action-wrap">
            <button
              type="button"
              className="commission-primary-btn"
              onClick={() => openInquiry('Projects Monograph Footer — Commission Consultation')}
            >
              <span>Schedule a Project Consultation</span>
              <span className="btn-arrow" aria-hidden="true">&rarr;</span>
            </button>
            <span className="commission-foot-note">
              Direct consultation with our lead architectural directors
            </span>
          </div>
        </div>
      </section>


    </main>
  );
};
