import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { SEO } from '../components/common/SEO';
import '../styles/NotFoundPage.css';

export const NotFoundPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <main className="notfound-page" id="main-content">
      <SEO
        title="404 — Page Not Found | Mitjen Interiors"
        description="The requested architectural page could not be located in our portfolio archive."
        canonical="/404"
      />

      <section className="notfound-section" aria-label="Page Not Found">
        <div className="notfound-container">
          {/* Visual 404 Architectural Badge */}
          <div className="notfound-badge-wrap">
            <span className="notfound-badge">
              <span className="notfound-badge-dot" aria-hidden="true" />
              <span>SPATIAL COORDINATE / 404</span>
            </span>
          </div>

          {/* Prominent Architectural 404 Graphic Number */}
          <div className="notfound-num-display" aria-hidden="true">
            <span className="notfound-digit">4</span>
            <span className="notfound-digit notfound-digit-accent">0</span>
            <span className="notfound-digit">4</span>
          </div>

          {/* Exactly One Primary H1 For Semantic Structure */}
          <h1 className="notfound-title">Oops! Page Not Found</h1>

          {/* Refined Supporting Narrative */}
          <p className="notfound-description">
            The page you are looking for does not exist, has been archived, or may have moved to another section of the studio.
          </p>

          {/* Action Navigation Controls */}
          <div className="notfound-actions">
            <Link to="/" className="notfound-btn notfound-btn-primary hover-lift">
              <span>Back to Home</span>
              <span className="notfound-btn-arrow" aria-hidden="true">→</span>
            </Link>

            <button
              type="button"
              className="notfound-btn notfound-btn-secondary hover-lift"
              onClick={() => navigate(-1)}
            >
              <span className="notfound-btn-arrow-left" aria-hidden="true">←</span>
              <span>Previous Page</span>
            </button>
          </div>

          {/* Quick Helpful Directory */}
          <div className="notfound-directory">
            <span className="notfound-directory-label">Direct Studio Wings</span>
            <nav className="notfound-directory-links" aria-label="Quick Links">
              <Link to="/projects" className="notfound-link">Portfolio</Link>
              <span className="notfound-link-sep" aria-hidden="true">/</span>
              <Link to="/services" className="notfound-link">Practices</Link>
              <span className="notfound-link-sep" aria-hidden="true">/</span>
              <Link to="/about" className="notfound-link">About Studio</Link>
              <span className="notfound-link-sep" aria-hidden="true">/</span>
              <Link to="/contact" className="notfound-link">Inquiry</Link>
            </nav>
          </div>
        </div>
      </section>
    </main>
  );
};

export default NotFoundPage;
