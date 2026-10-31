import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArchitecturalSkyline } from './common/ArchitecturalSkyline';
import '../styles/Footer.css';

export const Footer: React.FC = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setTimeout(() => {
        setEmail('');
      }, 3000);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="mitjen-footer" aria-label="Mitjen Interiors Architectural Footer">
      <div className="footer-container">
        {/* Tier 1: Brand Narrative & Studio Newsletter */}
        <div className="footer-top-tier">
          <div className="footer-brand-wrap">
            <Link to="/" className="footer-brand-logo" aria-label="Mitjen Interiors Home">
              MITJEN INTERIORS
            </Link>
            <p className="footer-brand-desc">
              Boutique practice for contemporary interior architecture, monumental materiality, and thoughtful spatial craftsmanship across residential, commercial, and corporate environments.
            </p>
          </div>

          <div className="footer-newsletter-wrap">
            <h3 className="footer-newsletter-title">Studio Journal & Monographs</h3>
            <p className="footer-newsletter-subtitle">
              Receive our quarterly publications on spatial craftsmanship, material studies, and private commission debuts.
            </p>
            <form onSubmit={handleSubscribe} className="footer-newsletter-form">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter studio email address..."
                className="footer-input-field"
                aria-label="Email address for studio newsletter"
              />
              <button type="submit" className="footer-submit-btn">
                {subscribed ? 'Subscribed' : 'Submit'}
              </button>
            </form>
            {subscribed && (
              <span className="footer-newsletter-feedback" role="status">
                ✓ Welcome to the Mitjen Interiors architectural journal.
              </span>
            )}
          </div>
        </div>

        {/* Tier 2: 4-Column Architectural Navigation Links */}
        <div className="footer-links-grid">
          {/* Col 1: Architectural Practices */}
          <div className="footer-nav-col">
            <h4 className="footer-col-heading">Practices & Scope</h4>
            <Link to="/services" className="footer-nav-link footer-nav-link-featured">
              All Practices Overview →
            </Link>
            <Link to="/services/residential-interior-design" className="footer-nav-link">
              Residential Sanctuaries
            </Link>
            <Link to="/services/commercial-interior-design" className="footer-nav-link">
              Curated Commercial Venues
            </Link>
            <Link to="/services/corporate-interior-design" className="footer-nav-link">
              Executive Workplaces
            </Link>
            <Link to="/projects" className="footer-nav-link">
              Selected Commission Archive
            </Link>
          </div>

          {/* Col 2: Spatial Explorations */}
          <div className="footer-nav-col">
            <h4 className="footer-col-heading">Spatial Archive</h4>
            <a href="/#showcase" className="footer-nav-link">
              360° Spatial Craft
            </a>
            <a href="/#transformations" className="footer-nav-link">
              Before & After Metamorphosis
            </a>
            <a href="/#journal" className="footer-nav-link">
              One Home, Room by Room
            </a>
            <a href="/#process" className="footer-nav-link">
              Built on Trust & Rigor
            </a>
            <a href="/#faq" className="footer-nav-link">
              Client Guidance & FAQs
            </a>
          </div>

          {/* Col 3: Studio Ateliers & Contact */}
          <div className="footer-nav-col">
            <h4 className="footer-col-heading">Studio Ateliers</h4>
            <Link to="/contact" className="footer-nav-link footer-nav-link-featured">
              Studio Enquiries & Briefing →
            </Link>
            <a href="tel:+919444328555" className="footer-nav-link">
              +91 94443 28555
            </a>
            <a href="mailto:hello@mitijeninteriors.com" className="footer-nav-link">
              hello@mitijeninteriors.com
            </a>
            <span className="footer-meta-detail">
              Ateliers in Coimbatore & Bangalore, Tamil Nadu
            </span>
          </div>

          {/* Col 4: Connect & Social Badges */}
          <div className="footer-nav-col">
            <h4 className="footer-col-heading">Connect With Us</h4>
            <span className="footer-nav-link">
              Digital Archives & Design Discourse
            </span>
            <div className="footer-social-row">
              {/* Pinterest */}
              <a
                href="https://pinterest.com"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-social-circle"
                aria-label="Mitjen Interiors on Pinterest"
                title="Pinterest Archive"
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 0C5.373 0 0 5.372 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345-.09.375-.291 1.199-.334 1.366-.053.225-.177.271-.409.165-1.528-.711-2.482-2.943-2.482-4.736 0-3.856 2.802-7.397 8.077-7.397 4.241 0 7.537 3.022 7.537 7.061 0 4.213-2.656 7.604-6.342 7.604-1.239 0-2.404-.644-2.802-1.408l-.762 2.909c-.276 1.058-1.023 2.384-1.524 3.197C9.379 23.86 10.665 24 12 24c6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z" />
                </svg>
              </a>

              {/* Instagram */}
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-social-circle"
                aria-label="Mitjen Interiors on Instagram"
                title="Instagram Feed"
              >
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
              </a>

              {/* LinkedIn */}
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="footer-social-circle"
                aria-label="Mitjen Interiors on LinkedIn"
                title="LinkedIn Network"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Tier 3: Panoramic Architectural Monument Heritage Skyline Illustration */}
      <div className="footer-skyline-section">
        <ArchitecturalSkyline />
      </div>

      {/* Tier 4: Bottom Bar with Copyright & Back to Top */}
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
          aria-label="Scroll back to top of page"
        >
          <span>Back to top</span>
          <span aria-hidden="true">↑</span>
        </button>
      </div>
    </footer>
  );
};

export default Footer;
