import React from 'react';
import { Link } from 'react-router-dom';
import { SectionLabel } from './common/SectionLabel';
import { InteriorOutlines } from './common/InteriorOutlines';
import '../styles/Footer.css';

export const Footer: React.FC = () => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="mitjen-footer" aria-label="Mitjen Interiors Footer">
      <div className="footer-container">
        {/* 4-Column Architectural Navigation Grid */}
        <div className="footer-main-grid">
          {/* Col 1: Brand Information */}
          <div className="footer-col-brand">
            <Link to="/" className="footer-brand-logo" aria-label="Mitjen Interiors Home">
              MITJEN INTERIORS
            </Link>
            <p className="footer-brand-desc">
              Contemporary interior architecture and thoughtful spatial design across residential, commercial, and corporate environments.
            </p>
          </div>

          {/* Col 2: Services & Practices */}
          <div className="footer-col">
            <SectionLabel style={{ color: 'var(--sand)' }}>Services & Practices</SectionLabel>
            <Link to="/services" className="footer-link footer-link-featured">
              All Practices Overview →
            </Link>
            <Link to="/services/residential-interior-design" className="footer-link">
              Residential Interiors
            </Link>
            <Link to="/services/commercial-interior-design" className="footer-link">
              Commercial Spaces
            </Link>
            <Link to="/services/corporate-interior-design" className="footer-link">
              Corporate Workplaces
            </Link>
            <Link to="/projects" className="footer-link">
              Selected Projects
            </Link>
          </div>

          {/* Col 3: Studio Contact */}
          <div className="footer-col">
            <SectionLabel style={{ color: 'var(--sand)' }}>Studio Contact</SectionLabel>
            <Link to="/contact" className="footer-link footer-link-featured">
              Contact & Enquiries →
            </Link>
            <a href="tel:+919444328555" className="footer-link">
              +91 94443 28555
            </a>
            <a href="mailto:hello@mitijeninteriors.com" className="footer-link footer-email">
              hello@mitijeninteriors.com
            </a>
            <span className="footer-location">
              Coimbatore & Bangalore, Tamil Nadu
            </span>
          </div>

          {/* Col 4: Social & Archive */}
          <div className="footer-col">
            <SectionLabel style={{ color: 'var(--sand)' }}>Social & Archive</SectionLabel>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="footer-link">
              Instagram ↗
            </a>
            <a href="https://pinterest.com" target="_blank" rel="noopener noreferrer" className="footer-link">
              Pinterest ↗
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="footer-link">
              LinkedIn ↗
            </a>
          </div>
        </div>
      </div>

      {/* Panoramic Interior Architectural Outlines Banner */}
      <div className="footer-interior-outlines-section" aria-hidden="true">
        <InteriorOutlines />
      </div>

      {/* Footer Bottom Bar with Back to Top */}
      <div className="footer-bottom-bar">
        <small className="footer-copyright">
          © 2026 Mitjen Interiors. All rights reserved.
        </small>
        <small className="footer-copyright">
          Designed by <a href="https://indiafloats.in" target="_blank" rel="noopener noreferrer">IndiaFloats</a>
        </small>
        <button
          type="button"
          onClick={scrollToTop}
          className="footer-back-to-top"
          aria-label="Scroll to top of page"
        >
          <span>Back to top</span>
          <span aria-hidden="true">↑</span>
        </button>
      </div>
    </footer>
  );
};

export default Footer;
