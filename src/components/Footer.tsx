import React from 'react';
import { Link } from 'react-router-dom';
import { SectionLabel } from './common/SectionLabel';

export const Footer: React.FC = () => {

  return (
    <footer>
      <div className="g">
        <div>
          <Link to="/" className="logo" style={{ textDecoration: 'none', color: 'inherit' }}>
            Mitjen Interiors
          </Link>
          <p style={{ opacity: 0.7, maxWidth: '20rem', marginTop: '0.8rem' }}>
            Contemporary interior architecture and thoughtful spatial design across residential, commercial, and corporate environments.
          </p>
        </div>

        <div>
          <SectionLabel style={{ color: 'var(--sand)' }}>Services</SectionLabel>
          <Link to="/services/residential-interior-design">Residential Interiors</Link>
          <Link to="/services/commercial-interior-design">Commercial Spaces</Link>
          <Link to="/services/corporate-interior-design">Corporate Workplaces</Link>
          <Link to="/projects">Selected Projects</Link>
        </div>

        <div>
          <SectionLabel style={{ color: 'var(--sand)' }}>Contact</SectionLabel>
          <Link
            to="/contact"
            style={{
              color: 'inherit',
              textDecoration: 'none',
              display: 'block',
              fontWeight: 500
            }}
          >
            Contact & Enquiries →
          </Link>
          <a href="tel:+919444328555">+91 94443 28555</a>
          <a href="mailto:hello@mitijeninteriors.com">hello@mitijeninteriors.com</a>
          <span style={{ opacity: 0.7, fontSize: '0.85rem' }}>Coimbatore, Tamil Nadu</span>
        </div>

        <div>
          <SectionLabel style={{ color: 'var(--sand)' }}>Social</SectionLabel>
          <a href="#top" rel="noopener noreferrer">Instagram</a>
          <a href="#top" rel="noopener noreferrer">Pinterest</a>
          <a href="#top" rel="noopener noreferrer">LinkedIn</a>
        </div>
      </div>

      <small>© 2026 Mitjen Interiors. All rights reserved.</small>
    </footer>
  );
};

export default Footer;
