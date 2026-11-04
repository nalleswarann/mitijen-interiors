import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useInquiry } from '../context/useInquiry';

export interface CraftDetailItem {
  id: string;
  num: string;
  title: string;
  image: string;
  detailImage: string;
  description: string;
  materials: string[];
  route: string;
}

const CRAFT_DETAIL_ITEMS: CraftDetailItem[] = [
  {
    id: 'layout-flow',
    num: '01',
    title: 'LAYOUT & FLOW',
    image: '/assets/mitijen/home1.jpeg',
    detailImage: '/assets/mitijen/hom2.jpeg',
    description: 'Well-planned arrangements that make movement feel natural while giving every part of the interior a clear purpose.',
    materials: ['SMART PLANNING', 'EASY MOVEMENT', 'BALANCED PROPORTIONS'],
    route: '/services/residential-interior-design'
  },
  {
    id: 'custom-elements',
    num: '02',
    title: 'CUSTOM ELEMENTS',
    image: '/assets/craft_joinery.jpg',
    detailImage: '/assets/craft_wardrobe.jpg',
    description: 'Tailored furniture, storage and joinery created to make better use of the available area while complementing the overall look.',
    materials: [],
    route: '/services/residential-interior-design'
  },
  {
    id: 'materials-finishes',
    num: '03',
    title: 'MATERIALS & FINISHES',
    image: '/assets/craft_stone_vanity.jpg',
    detailImage: '/assets/craft_credenza.jpg',
    description: 'Wood, glass, stone, textures and other finishes are carefully combined to create the right character for each interior.',
    materials: ['TEXTURES', 'SURFACES', 'REFINED FINISHES'],
    route: '/services/residential-interior-design'
  },
  {
    id: 'lighting-ambience',
    num: '04',
    title: 'LIGHTING & AMBIENCE',
    image: '/assets/mitijen/kitchen.jpeg',
    detailImage: '/assets/mitijen/bedroom.jpeg',
    description: 'Lighting is planned to support everyday use, highlight key features and create a comfortable atmosphere throughout the interior.',
    materials: ['FUNCTIONAL LIGHTING', 'FEATURE LIGHTING', 'AMBIENT LIGHT'],
    route: '/services/residential-interior-design'
  }
];

export const MaterialsGallery: React.FC = () => {
  const [activeIdx, setActiveIdx] = useState(0);
  const [expandedItemId, setExpandedItemId] = useState<string | null>('layout-flow');
  const navigate = useNavigate();
  const { openInquiry } = useInquiry();

  const currentProject = CRAFT_DETAIL_ITEMS[activeIdx] || CRAFT_DETAIL_ITEMS[0];

  const toggleItem = (id: string) => {
    setExpandedItemId((prev) => (prev === id ? null : id));
  };

  return (
    <section className="corporate-human-section" id="materials" aria-label="INTERIOR CRAFT & DETAIL">
      <div className="corporate-human-container">
        {/* ==================================================================
            1. DESKTOP VIEW (Visible on Viewports > 768px)
            100% Unchanged Desktop Layout, Typography & Photo Frame
            ================================================================== */}
        <div className="corporate-desktop-view">
          {/* Section Header with Animated Reveal */}
          <div className="corporate-human-header reveal-fade-up">
            <div className="corporate-human-header-left">
              <span className="corporate-human-label">INTERIOR CRAFT &amp; DETAIL</span>
              <h2 className="corporate-human-title">
                DESIGNED AROUND WHAT MATTERS.
              </h2>
            </div>
            <div className="corporate-human-header-right">
              <p className="corporate-human-lead">
                Every interior has different requirements, but the details that make it work remain important. From the way people move through an interior to the furniture, finishes and lighting around them, we bring each element together with purpose.
              </p>
            </div>
          </div>

          {/* Editorial Showcase Grid */}
          <div className="corporate-editorial-grid">
            {/* Left Column: Craft Details Navigation List */}
            <div
              className="corporate-project-list reveal-fade-up"
              data-delay="150"
              role="tablist"
              aria-label="Interior craft details"
            >
              {CRAFT_DETAIL_ITEMS.map((proj, idx) => {
                const isActive = activeIdx === idx;
                return (
                  <div
                    key={proj.id}
                    className={`corporate-project-row ${isActive ? 'is-active' : ''}`}
                    onClick={() => setActiveIdx(idx)}
                    role="tab"
                    tabIndex={0}
                    aria-selected={isActive}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        setActiveIdx(idx);
                      }
                    }}
                  >
                    <div className="project-row-top">
                      <span className="project-row-num">{proj.num}</span>
                      <h3 className="project-row-title">{proj.title}</h3>
                    </div>

                    <p className="project-row-desc">
                      {proj.description}
                    </p>

                    {proj.materials.length > 0 && (
                      <div className="project-row-materials">
                        {proj.materials.map((mat, mIdx) => (
                          <span key={mIdx} className="material-crumb">
                            {mat}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Right Column: Architectural Photography Frame */}
            <div
              className="corporate-visual-display reveal-scale"
              data-delay="250"
              id="corporate-visual-display"
              tabIndex={-1}
            >
              {/* Primary Large Photograph */}
              <div className="corporate-main-photo-wrap img-zoom-hover">
                <img
                  src={currentProject.image}
                  alt={`${currentProject.title} architectural view`}
                  className="corporate-main-photo"
                  loading="lazy"
                />
                <div className="corporate-photo-caption">
                  <span className="caption-location">{currentProject.num} · CRAFT &amp; DETAIL</span>
                  <span className="caption-title">{currentProject.title}</span>
                </div>
              </div>

              {/* Secondary Companion Detail */}
              <div className="corporate-companion-row">
                <div className="companion-photo-wrap img-zoom-hover">
                  <img
                    src={currentProject.detailImage}
                    alt={`${currentProject.title} architectural detail`}
                    className="companion-photo"
                    loading="lazy"
                  />
                </div>

                <div className="companion-note-card hover-lift">
                  <span className="note-label">THE COMPLETE PICTURE</span>
                  <p className="note-text">
                    A good interior comes together when the layout, function, materials and small details work well together to create a space that feels complete.
                  </p>
                  <button
                    type="button"
                    className="note-link"
                    onClick={() => navigate('/services')}
                  >
                    Explore Practice &rarr;
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Quiet Studio Consultation Prompt */}
          <div className="corporate-footer-banner reveal-fade-up" data-delay="200">
            <div className="footer-banner-text">
              <h4>TELL US WHAT YOU’RE LOOKING FOR?</h4>
              <p>From the first conversation to the finished result, let’s find the right way forward for your requirements.</p>
            </div>
            <div className="footer-banner-actions">
              <button
                type="button"
                className="corporate-inquiry-btn hover-lift"
                onClick={() => openInquiry('Tell Us What You Are Looking For — Consultation')}
              >
                GET IN TOUCH →
              </button>
            </div>
          </div>
        </div>

        {/* ==================================================================
            2. MOBILE EDITORIAL VIEW (Visible on Viewports <= 768px)
            "DESIGNED AROUND WHAT MATTERS."
            Expandable interactive craft cards matching the reference architecture
            ================================================================== */}
        <div className="corporate-mobile-portfolio-view">
          {/* Section Introduction */}
          <div className="corporate-mobile-intro">
            <span className="corporate-mobile-eyebrow">
              <span className="corporate-mobile-eyebrow-dot" aria-hidden="true" />
              <span>DISCIPLINES OF FORM &amp; SPACE</span>
            </span>
            <h2 className="corporate-mobile-heading">
              DESIGNED AROUND WHAT MATTERS.
            </h2>
            <p className="corporate-mobile-intro-desc">
              Every interior has different requirements, but the details that make it work remain important. From the way people move through an interior to the furniture, finishes and lighting around them, we bring each element together with purpose.
            </p>
          </div>

          {/* Vertically Stacked Expandable Craft Cards */}
          <div className="corporate-mobile-cards-stack" role="list">
            {CRAFT_DETAIL_ITEMS.map((item) => {
              const isExpanded = expandedItemId === item.id;

              return (
                <article
                  key={item.id}
                  className={`corporate-mobile-card ${isExpanded ? 'is-expanded' : 'is-collapsed'}`}
                  role="button"
                  tabIndex={0}
                  aria-expanded={isExpanded}
                  aria-label={`${item.title} — ${isExpanded ? 'Collapse' : 'Expand'}`}
                  onClick={() => toggleItem(item.id)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      toggleItem(item.id);
                    }
                  }}
                >
                  {/* Full-bleed background photo & atmospheric dark scrim */}
                  <div className="corporate-mobile-media">
                    <img
                      src={item.image}
                      alt={`${item.title} interior craftsmanship`}
                      loading="lazy"
                      className="corporate-mobile-img"
                    />
                    <div className={`corporate-mobile-scrim ${isExpanded ? 'is-expanded' : ''}`} />
                  </div>

                  {/* Card Content Layout */}
                  <div className="corporate-mobile-inner">
                    {/* Top Row: Eyebrow Number/Title & Minimal Icon */}
                    <div className="corporate-mobile-top">
                      <span className="corporate-mobile-card-badge">
                        {item.num} · CRAFT &amp; DETAIL
                      </span>

                      <span className="corporate-mobile-toggle-icon" aria-hidden="true">
                        {isExpanded ? (
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round">
                            <line x1="18" y1="6" x2="6" y2="18" />
                            <line x1="6" y1="6" x2="18" y2="18" />
                          </svg>
                        ) : (
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round">
                            <line x1="12" y1="5" x2="12" y2="19" />
                            <line x1="5" y1="12" x2="19" y2="12" />
                          </svg>
                        )}
                      </span>
                    </div>

                    {/* Bottom / Expanding Content Block */}
                    <div className="corporate-mobile-bottom">
                      <h3 className="corporate-mobile-card-title">{item.title}</h3>

                      <div className="corporate-mobile-expanded-content">
                        <p className="corporate-mobile-card-desc">
                          {item.description}
                        </p>

                        {item.materials.length > 0 && (
                          <div className="corporate-mobile-materials">
                            {item.materials.map((mat, mIdx) => (
                              <span key={mIdx} className="corporate-mobile-crumb">
                                {mat}
                              </span>
                            ))}
                          </div>
                        )}

                        <div className="corporate-mobile-actions">
                          <Link
                            to={item.route}
                            className="corporate-mobile-explore-link"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <span>EXPLORE PRACTICE</span>
                            <span aria-hidden="true"> →</span>
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>

          {/* The Complete Picture Narrative Note on Mobile */}
          <div className="corporate-mobile-complete-card">
            <span className="corporate-mobile-complete-label">THE COMPLETE PICTURE</span>
            <p className="corporate-mobile-complete-text">
              A good interior comes together when the layout, function, materials and small details work well together to create a space that feels complete.
            </p>
          </div>

          {/* Section Bottom Archive Navigation */}
          <div className="corporate-mobile-archive-row">
            <Link to="/projects" className="corporate-mobile-archive-link">
              <span>EXPLORE FULL ARCHIVE</span>
              <span aria-hidden="true"> →</span>
            </Link>
          </div>

          {/* Studio Consultation Prompt on Mobile */}
          <div className="corporate-mobile-consult-card">
            <div className="corporate-mobile-consult-text">
              <h4>TELL US WHAT YOU’RE LOOKING FOR?</h4>
              <p>From the first conversation to the finished result, let’s find the right way forward for your requirements.</p>
            </div>
            <button
              type="button"
              className="corporate-mobile-consult-btn"
              onClick={() => openInquiry('Tell Us What You Are Looking For — Consultation')}
            >
              GET IN TOUCH →
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MaterialsGallery;
