import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useInquiry } from '../context/useInquiry';
import '../styles/Header.css';

export const Header: React.FC = () => {
  const [isSolid, setIsSolid] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const burgerRef = useRef<HTMLButtonElement>(null);
  const location = useLocation();
  const { openInquiry } = useInquiry();

  const isServicesActive = location.pathname.startsWith('/services');
  const isProjectsActive = location.pathname.startsWith('/project');
  const isHome = location.pathname === '/';

  // State for Desktop Services Dropdown and Mobile Services Accordion
  const [isServicesDropdownOpen, setIsServicesDropdownOpen] = useState(false);
  const [isMobileServicesOpen, setIsMobileServicesOpen] = useState(() => isServicesActive);
  const servicesDropdownRef = useRef<HTMLDivElement>(null);
  const dropdownTimerRef = useRef<number | null>(null);

  const handleServicesMouseEnter = () => {
    if (dropdownTimerRef.current) {
      window.clearTimeout(dropdownTimerRef.current);
      dropdownTimerRef.current = null;
    }
    setIsServicesDropdownOpen(true);
  };

  const handleServicesMouseLeave = () => {
    dropdownTimerRef.current = window.setTimeout(() => {
      setIsServicesDropdownOpen(false);
    }, 180);
  };

  const toggleServicesDropdown = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsServicesDropdownOpen((prev) => !prev);
  };

  // Close desktop dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        servicesDropdownRef.current &&
        !servicesDropdownRef.current.contains(e.target as Node)
      ) {
        setIsServicesDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      if (dropdownTimerRef.current) {
        window.clearTimeout(dropdownTimerRef.current);
      }
    };
  }, []);

  // Typewriting animation for Header Logo text
  const FULL_LOGO_TEXT = 'Mitjen Interiors';
  const [typedLogo, setTypedLogo] = useState(() => {
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return FULL_LOGO_TEXT;
    }
    return '';
  });
  const [isLogoTyping, setIsLogoTyping] = useState(() => {
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return false;
    }
    return true;
  });

  useEffect(() => {
    if (!isLogoTyping) return;

    let charIndex = 0;
    const interval = setInterval(() => {
      charIndex++;
      setTypedLogo(FULL_LOGO_TEXT.slice(0, charIndex));
      if (charIndex >= FULL_LOGO_TEXT.length) {
        clearInterval(interval);
        setTimeout(() => setIsLogoTyping(false), 2400);
      }
    }, 75);

    return () => clearInterval(interval);
  }, [isLogoTyping]);

  // Scroll listener for solid navbar state
  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;
      const h = window.innerHeight;
      const threshold = isHome ? h * 0.8 : 40;
      setIsSolid(y > threshold && !isMenuOpen);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isMenuOpen, isHome]);

  // Lock background scroll when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  // Keyboard navigation: Escape key closes menu and dropdown
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (isServicesDropdownOpen) {
          setIsServicesDropdownOpen(false);
        }
        if (isMenuOpen) {
          setIsMenuOpen(false);
          burgerRef.current?.focus();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isMenuOpen, isServicesDropdownOpen]);

  // Close menus on route change
  /* oxlint-disable react/set-state-in-effect */
  useEffect(() => {
    setIsMenuOpen(false);
    setIsServicesDropdownOpen(false);
  }, [location.pathname]);

  const toggleMenu = () => {
    const nextState = !isMenuOpen;
    setIsMenuOpen(nextState);
    if (!nextState) {
      burgerRef.current?.focus();
    }
  };

  const closeMenu = () => {
    if (isMenuOpen) {
      setIsMenuOpen(false);
      burgerRef.current?.focus();
    }
  };

  const closeAllMenus = () => {
    setIsServicesDropdownOpen(false);
    closeMenu();
  };

  return (
    <header
      id="hd"
      className={`${isSolid || !isHome ? 'solid' : ''} ${isMenuOpen ? 'menu-open' : ''}`}
    >
      <Link className="logo" to="/" onClick={closeMenu} aria-label="Mitjen Interiors">
        <span className="logo-typed-text">{typedLogo || 'M'}</span>
        {isLogoTyping && <span className="header-typewriter-caret" aria-hidden="true" />}
      </Link>

      {/* Navigation: Responsive Dual Desktop / Mobile Drawer Architecture */}
      <nav id="nav" aria-label="Primary Navigation" className={isMenuOpen ? 'open' : ''}>
        {/* Mobile Header Label */}
        <div className="mobile-nav-header">
          <span className="mobile-nav-kicker">STUDIO DIRECTORY</span>
        </div>

        {/* 1. Desktop Nav Links */}
        <div className="desktop-nav-items">
          <Link
            to="/"
            className={`nav-desktop-link ${location.pathname === '/' ? 'on' : ''}`}
            onClick={closeMenu}
          >
            Home
          </Link>
          <Link
            to="/projects"
            className={`nav-desktop-link ${isProjectsActive ? 'on' : ''}`}
            onClick={closeAllMenus}
          >
            Projects
          </Link>

          {/* Desktop Services Dropdown */}
          <div
            className={`header-dropdown-container ${isServicesDropdownOpen ? 'is-open' : ''}`}
            onMouseEnter={handleServicesMouseEnter}
            onMouseLeave={handleServicesMouseLeave}
            ref={servicesDropdownRef}
          >
            <button
              type="button"
              className={`nav-desktop-link header-dropdown-toggle ${isServicesActive ? 'on' : ''}`}
              onClick={toggleServicesDropdown}
              aria-expanded={isServicesDropdownOpen}
              aria-haspopup="true"
              aria-label="Services and Practices Menu"
            >
              <span>Services</span>
              <svg
                className={`header-dropdown-chevron ${isServicesDropdownOpen ? 'rotate' : ''}`}
                width="10"
                height="6"
                viewBox="0 0 10 6"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d="M1 1L5 5L9 1" />
              </svg>
            </button>

            <div
              className={`header-dropdown-menu ${isServicesDropdownOpen ? 'is-open' : ''}`}
              role="menu"
              aria-label="Services Submenu"
            >
              <div className="header-dropdown-kicker">
                <span>OUR PRACTICES</span>
                <span className="dropdown-kicker-dot">·</span>
                <span>WORKS</span>
              </div>

              <Link
                to="/services/corporate-interior-design"
                className={`header-dropdown-item ${location.pathname === '/services/corporate-interior-design' ? 'is-active' : ''}`}
                onClick={closeAllMenus}
                role="menuitem"
              >
                <div className="dropdown-item-header">
                  <span className="dropdown-item-index">01</span>
                  <span className="dropdown-item-title">Corporate Works</span>
                </div>
                <p className="dropdown-item-desc">
                  Offices, executive headquarters & collaborative studios
                </p>
              </Link>

              <Link
                to="/services/residential-interior-design"
                className={`header-dropdown-item ${location.pathname === '/services/residential-interior-design' ? 'is-active' : ''}`}
                onClick={closeAllMenus}
                role="menuitem"
              >
                <div className="dropdown-item-header">
                  <span className="dropdown-item-index">02</span>
                  <span className="dropdown-item-title">Residential Works</span>
                </div>
                <p className="dropdown-item-desc">
                  Bespoke villas, luxury apartments & private sanctuaries
                </p>
              </Link>

              <Link
                to="/services/commercial-interior-design"
                className={`header-dropdown-item ${location.pathname === '/services/commercial-interior-design' ? 'is-active' : ''}`}
                onClick={closeAllMenus}
                role="menuitem"
              >
                <div className="dropdown-item-header">
                  <span className="dropdown-item-index">03</span>
                  <span className="dropdown-item-title">Commercial Works</span>
                </div>
                <p className="dropdown-item-desc">
                  Flagship showrooms, hospitality & experiential venues
                </p>
              </Link>

              <div className="header-dropdown-divider" />

              <Link
                to="/services"
                className={`header-dropdown-item header-dropdown-footer ${location.pathname === '/services' ? 'is-active' : ''}`}
                onClick={closeAllMenus}
                role="menuitem"
              >
                <div className="dropdown-item-header">
                  <span className="dropdown-item-title">All Services & Practices</span>
                  <span className="dropdown-arrow-icon" aria-hidden="true">→</span>
                </div>
                <p className="dropdown-item-desc">
                  Explore complete methodology & full practice directory
                </p>
              </Link>
            </div>
          </div>

          <Link
            to="/about"
            className={`nav-desktop-link ${location.pathname === '/about' ? 'on' : ''}`}
            onClick={closeAllMenus}
          >
            About
          </Link>
          <Link
            to="/contact"
            className={`nav-desktop-link ${location.pathname === '/contact' ? 'on' : ''}`}
            onClick={closeAllMenus}
          >
            Contact
          </Link>
        </div>

        {/* 2. Mobile Nav Links List */}
        <div className="mobile-nav-links-list">
          <Link
            to="/"
            className={`mobile-nav-link ${location.pathname === '/' ? 'on' : ''}`}
            onClick={closeAllMenus}
          >
            <span>Home</span>
            <span style={{ fontSize: '1rem', opacity: 0.5 }}>01</span>
          </Link>

          <Link
            to="/projects"
            className={`mobile-nav-link ${isProjectsActive ? 'on' : ''}`}
            onClick={closeAllMenus}
          >
            <span>Projects</span>
            <span style={{ fontSize: '1rem', opacity: 0.5 }}>02</span>
          </Link>

          {/* Mobile Services Accordion */}
          <div className="mobile-services-container">
            <button
              type="button"
              className={`mobile-services-toggle ${isServicesActive ? 'is-active' : ''} ${isMobileServicesOpen ? 'is-expanded' : ''}`}
              onClick={() => setIsMobileServicesOpen((prev) => !prev)}
              aria-expanded={isMobileServicesOpen}
              aria-label="Toggle Services List"
            >
              <span>Services</span>
              <div className="mobile-services-arrow" aria-hidden="true">
                <svg
                  width="12"
                  height="8"
                  viewBox="0 0 12 8"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M1 1.5L6 6.5L11 1.5" />
                </svg>
              </div>
            </button>

            <div className={`mobile-services-drawer ${isMobileServicesOpen ? 'is-open' : ''}`}>
              <Link
                to="/services/corporate-interior-design"
                className={`mobile-sub-link ${location.pathname === '/services/corporate-interior-design' ? 'is-active' : ''}`}
                onClick={closeAllMenus}
              >
                <span className="mobile-sub-title">01 · Corporate Works</span>
                <span className="mobile-sub-desc">Executive offices, headquarters & studios</span>
              </Link>

              <Link
                to="/services/residential-interior-design"
                className={`mobile-sub-link ${location.pathname === '/services/residential-interior-design' ? 'is-active' : ''}`}
                onClick={closeAllMenus}
              >
                <span className="mobile-sub-title">02 · Residential Works</span>
                <span className="mobile-sub-desc">Bespoke villas, apartments & residences</span>
              </Link>

              <Link
                to="/services/commercial-interior-design"
                className={`mobile-sub-link ${location.pathname === '/services/commercial-interior-design' ? 'is-active' : ''}`}
                onClick={closeAllMenus}
              >
                <span className="mobile-sub-title">03 · Commercial Works</span>
                <span className="mobile-sub-desc">Showrooms, retail & hospitality venues</span>
              </Link>

              <Link
                to="/services"
                className={`mobile-sub-link mobile-sub-overview ${location.pathname === '/services' ? 'is-active' : ''}`}
                onClick={closeAllMenus}
              >
                <span className="mobile-sub-title">View All Practices & Services →</span>
                <span className="mobile-sub-desc">Directory of all spatial disciplines</span>
              </Link>
            </div>
          </div>

          <Link
            to="/about"
            className={`mobile-nav-link ${location.pathname === '/about' ? 'on' : ''}`}
            onClick={closeAllMenus}
          >
            <span>About Us</span>
            <span style={{ fontSize: '1rem', opacity: 0.5 }}>04</span>
          </Link>

          <Link
            to="/contact"
            className={`mobile-nav-link ${location.pathname === '/contact' ? 'on' : ''}`}
            onClick={closeAllMenus}
          >
            <span>Contact</span>
            <span style={{ fontSize: '1rem', opacity: 0.5 }}>05</span>
          </Link>
        </div>

        {/* 3. Mobile Nav Drawer Bottom (Primary Action & Contact Details) */}
        <div className="mobile-nav-bottom">
          <button
            type="button"
            className="mobile-nav-cta-btn"
            onClick={() => {
              closeMenu();
              openInquiry('Start Your Project — Mobile Navigation');
            }}
          >
            <span>Start Your Project</span>
            <span>→</span>
          </button>

          <div className="mobile-nav-meta-grid">
            <div className="mobile-meta-item">
              <span className="mobile-meta-label">DIRECT LINE</span>
              <a href="tel:+918940555526" className="mobile-meta-value">
                +91 89405 55526
              </a>
            </div>

            <div className="mobile-meta-item">
              <span className="mobile-meta-label">WHATSAPP</span>
              <a
                href="https://wa.me/918940555526?text=Hi%20Mitijen%20Interiors%2C%20I%20would%20like%20to%20discuss%20my%20interior%20project."
                target="_blank"
                rel="noopener noreferrer"
                className="mobile-meta-value"
              >
                Chat on WhatsApp →
              </a>
            </div>

            <div className="mobile-meta-item">
              <span className="mobile-meta-label">EMAIL</span>
              <a href="mailto:hello@mitijeninteriors.com" className="mobile-meta-value">
                hello@mitijeninteriors.com
              </a>
            </div>

            <div className="mobile-meta-item">
              <span className="mobile-meta-label">STUDIO</span>
              <span className="mobile-meta-value">
                Coimbatore, Tamil Nadu
              </span>
            </div>
          </div>
        </div>
      </nav>

      {/* Right Actions: Desktop CTA + Mobile Quick Consult + Burger */}
      <div className="header-actions-wrap">
        {/* Desktop CTA Button */}
        <button
          type="button"
          className="header-desktop-cta"
          onClick={() => {
            closeMenu();
            openInquiry();
          }}
        >
          <span>Book a Consult</span>
          <svg width="14" height="10" viewBox="0 0 16 10" fill="none" stroke="currentColor">
            <path d="M0 5h15M11 1l4 4-4 4" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        {/* Mobile Quick CTA in header bar */}
        <button
          type="button"
          className="header-mobile-cta"
          onClick={() => {
            closeMenu();
            openInquiry();
          }}
          aria-label="Start a project enquiry"
        >
          <span>Start Project</span>
        </button>

        {/* Animated 3-Line Hamburger to X Menu Button */}
        <button
          ref={burgerRef}
          className={`burger ${isMenuOpen ? 'is-open' : ''}`}
          id="bg"
          aria-label={isMenuOpen ? 'Close menu' : 'Open navigation menu'}
          aria-expanded={isMenuOpen}
          aria-controls="nav"
          onClick={toggleMenu}
        >
          <span className="burger-box" aria-hidden="true">
            <span className="burger-line burger-line-1" />
            <span className="burger-line burger-line-2" />
            <span className="burger-line burger-line-3" />
          </span>
        </button>
      </div>
    </header>
  );
};
