import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useInquiry } from '../context/useInquiry';

interface CorporateProject {
  id: string;
  num: string;
  title: string;
  category: string;
  location: string;
  image: string;
  detailImage: string;
  description: string;
  materials: string[];
}

const CORPORATE_PROJECTS: CorporateProject[] = [
  {
    id: 'boardroom',
    num: '01',
    title: 'The Executive Boardroom',
    category: 'Governance & Conference',
    location: 'Financial Centre, Chennai',
    image: '/assets/mitijen/commercial4.jpeg',
    detailImage: '/assets/mitijen/commercial5.jpeg',
    description: 'Acoustic timber slats line the perimeter walls to absorb reverberation, while a monolithic white oak conference table anchors the room under soft, glare-free cove light.',
    materials: ['Acoustic White Oak Slats', 'Recessed 2700K Warm Cove', 'Concealed Tech Ingress']
  },
  {
    id: 'collaborative',
    num: '02',
    title: 'The Collaborative Floor',
    category: 'Team Desking & Alcoves',
    location: 'Tech Park Campus',
    image: '/assets/mitijen/commercial5.jpeg',
    detailImage: '/assets/mitijen/commercial4.jpeg',
    description: 'Open-plan team desking interspersed with quiet alcoves, natural ceiling baffles, and warm circadian task lighting to create energy without acoustic clutter.',
    materials: ['Linear Acoustic Baffles', 'Low-Glare Task Lighting', 'Modular Oak Joinery']
  },
  {
    id: 'reception',
    num: '03',
    title: 'The Reception & Gallery Foyer',
    category: 'Client Hospitality',
    location: 'Headquarters Tower',
    image: '/assets/mitijen/commercial.jpeg',
    detailImage: '/assets/mitijen/commercial6.jpeg',
    description: 'A honed travertine welcome plinth balances the generous ceiling volume, welcoming visitors with understated warmth rather than cold corporate glass.',
    materials: ['Honed Roman Travertine', 'Brushed Bronze Trim', 'Lime Plaster Walls']
  },
  {
    id: 'partner-suite',
    num: '04',
    title: 'The Partner Suite & Library',
    category: 'Executive Private Office',
    location: 'Apex Tower Suite',
    image: '/assets/mitijen/commercial6.jpeg',
    detailImage: '/assets/mitijen/commercial1.jpeg',
    description: 'A contemplative personal office combining bespoke bookshelves, a quiet conversation lounge, and deep daylight filtered through natural linen drapery.',
    materials: ['Quarter-Sawn Oak Millwork', 'Belgian Linen Drapes', 'Travertine Accents']
  }
];

export const MaterialsGallery: React.FC = () => {
  const [activeIdx, setActiveIdx] = useState(0);
  const navigate = useNavigate();
  const { openInquiry } = useInquiry();

  const currentProject = CORPORATE_PROJECTS[activeIdx];

  return (
    <section className="corporate-human-section" id="corporate" aria-label="Corporate Architecture & Workplaces">
      <div className="corporate-human-container">
        {/* Section Header */}
        <div className="corporate-human-header">
          <span className="corporate-human-label">Corporate Architecture</span>
          <h2 className="corporate-human-title">
            Spaces where leadership can think, listen, and decide.
          </h2>
          <p className="corporate-human-lead">
            We shape executive headquarters and private offices with acoustic calm, natural light, 
            and bespoke millwork — creating workplaces that feel dignified and human rather than corporate.
          </p>
        </div>

        {/* Editorial Showcase Grid */}
        <div className="corporate-editorial-grid">
          {/* Left Column: Project Navigation List */}
          <div className="corporate-project-list" role="tablist" aria-label="Corporate commissions">
            {CORPORATE_PROJECTS.map((proj, idx) => {
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

                  <span className="project-row-cat">{proj.category}</span>

                  <p className="project-row-desc">
                    {proj.description}
                  </p>

                  <div className="project-row-materials">
                    {proj.materials.map((mat, mIdx) => (
                      <span key={mIdx} className="material-crumb">
                        {mat}
                      </span>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Right Column: Architectural Photography Frame */}
          <div className="corporate-visual-display" id="corporate-visual-display" tabIndex={-1}>
            {/* Primary Large Photograph */}
            <div className="corporate-main-photo-wrap">
              <img
                src={currentProject.image}
                alt={currentProject.title}
                className="corporate-main-photo"
                loading="lazy"
              />
              <div className="corporate-photo-caption">
                <span className="caption-location">{currentProject.location}</span>
                <span className="caption-title">{currentProject.title}</span>
              </div>
            </div>

            {/* Secondary Companion Detail */}
            <div className="corporate-companion-row">
              <div className="companion-photo-wrap">
                <img
                  src={currentProject.detailImage}
                  alt={`${currentProject.title} architectural detail`}
                  className="companion-photo"
                  loading="lazy"
                />
              </div>

              <div className="companion-note-card">
                <span className="note-label">ARCHITECTURAL INTENT</span>
                <p className="note-text">
                  Every timber joint and acoustic layer is custom-detailed in our studio to eliminate 
                  visual noise and support effortless daily focus.
                </p>
                <button
                  type="button"
                  className="note-link"
                  onClick={() => navigate('/services/corporate-interior-design')}
                >
                  Explore Full Corporate Services &rarr;
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Quiet Studio Consultation Prompt */}
        <div className="corporate-footer-banner">
          <div className="footer-banner-text">
            <h4>Planning a new office or executive suite?</h4>
            <p>We work directly with founders, CEOs, and real estate heads from initial spatial strategy to final handover.</p>
          </div>
          <div className="footer-banner-actions">
            <button
              type="button"
              className="corporate-inquiry-btn"
              onClick={() => openInquiry()}
            >
              Discuss Your Workplace Project
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
