import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import type { Project } from '../data/projects';
import { PROJECTS } from '../data/projects';
import '../styles/ProjectsSection.css';

interface ProjectsSectionProps {
  onSelectProject: (project: Project) => void;
}

const CATEGORY_ROUTES: Record<string, string> = {
  residential: '/services/residential-interior-design',
  commercial: '/services/commercial-interior-design',
  corporates: '/services/corporate-interior-design',
};

const PRACTICE_HEADINGS: Record<string, string> = {
  residential: 'Private Living & Sanctuaries',
  commercial: 'Boutique Commercial Venues',
  corporates: 'Executive Corporate Workspaces',
};

const PRACTICE_NUMERALS: Record<string, string> = {
  residential: 'RESIDENTIAL',
  commercial: 'COMMERCIAL',
  corporates: 'CORPORATE',
};

export const ProjectsSection: React.FC<ProjectsSectionProps> = ({ onSelectProject }) => {
  const navigate = useNavigate();

  const handleCardClick = (project: Project) => {
    const route = CATEGORY_ROUTES[project.id];
    if (route) {
      navigate(route);
    } else {
      onSelectProject(project);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent, project: Project) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleCardClick(project);
    }
  };

  return (
    <section id="projects" className="arch-practices-section" aria-label="Architectural Practices & Portfolio">
      <div className="arch-practices-container">
        {/* Section Editorial Header */}
        <div className="arch-practices-header">
          <div className="arch-practices-header-left">
            <span className="arch-practices-kicker">
              DISCIPLINES OF FORM & SPACE
            </span>
            <h2 className="arch-practices-title">
              ARCHITECTURAL DISCIPLINES & COMMISSIONED SPACES.
            </h2>
          </div>
          <div className="arch-practices-header-right">
            <p className="arch-practices-intro">
              From private residential sanctuaries to curated commercial venues and executive headquarters—each commission is designed with bespoke joinery, monolithic materiality, and refined architectural restraint.
            </p>
          </div>
        </div>

        {/* 3-Practice Monograph Grid */}
        <div className="arch-practices-grid" role="list">
          {PROJECTS.map((project) => {
            const heading = PRACTICE_HEADINGS[project.id] || project.name;
            const badgeTag = PRACTICE_NUMERALS[project.id] || project.categoryTitle;

            return (
              <article
                key={project.id}
                className="arch-practice-card"
                role="button"
                tabIndex={0}
                aria-label={`Explore ${project.categoryTitle} interior architecture and services`}
                onClick={() => handleCardClick(project)}
                onKeyDown={(e) => handleKeyDown(e, project)}
              >
                {/* Visual Image Viewport */}
                <div className="arch-practice-media">
                  <img
                    src={project.previewImage}
                    alt={`${project.name} architectural space`}
                    loading="lazy"
                    className="arch-practice-img"
                  />
                  <div className="arch-practice-scrim" />

                  {/* Top Glass Badge */}
                  <div className="arch-practice-badge">
                    <span className="arch-practice-badge-dot" />
                    <span>{badgeTag}</span>
                  </div>

                  {/* Bottom In-Image Metadata */}
                  <div className="arch-practice-inmeta">
                    <span>{project.name}</span>
                    <span>{project.loc} · {project.year}</span>
                  </div>
                </div>

                {/* Card Body */}
                <div className="arch-practice-body">
                  <div className="arch-practice-category">
                    {project.cat}
                  </div>
                  <h3 className="arch-practice-name">
                    {heading}
                  </h3>
                  <p className="arch-practice-desc">
                    {project.over}
                  </p>

                  {/* Action Row */}
                  <div className="arch-practice-actions">
                    <span className="arch-practice-cta">
                      <span>Explore Practice</span>
                      <span className="arch-practice-cta-arrow" aria-hidden="true">
                        <svg width="15" height="10" viewBox="0 0 16 10" fill="none" stroke="currentColor">
                          <path d="M0 5h15M11 1l4 4-4 4" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </span>
                    </span>

                    <button
                      type="button"
                      className="arch-practice-casestudy-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectProject(project);
                      }}
                      aria-label={`Open case study details for ${project.name}`}
                    >
                      Case Study ↗
                    </button>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {/* Bottom Archive Link */}
        <div className="arch-practices-bottom">
          <Link to="/projects" className="arch-practices-archive-btn">
            <span>Explore Full Archive & Case Studies</span>
            <svg width="14" height="10" viewBox="0 0 16 10" fill="none" stroke="currentColor">
              <path d="M0 5h15M11 1l4 4-4 4" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
