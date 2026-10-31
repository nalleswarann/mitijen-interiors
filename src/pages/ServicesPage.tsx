import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SEO } from '../components/common/SEO';
import { MonographBanner } from '../components/common/MonographBanner';
import '../styles/ServicesPage.css';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export const ServicesPage: React.FC = () => {
  const pageRef = useRef<HTMLDivElement>(null);
  const [testimonialIndex, setTestimonialIndex] = useState(0);

  // Premium GSAP animations matching the website's luxury editorial style
  useEffect(() => {
    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {


      // 4. Reveal 3 Black Cards on scroll
      const cards = gsap.utils.toArray('.renova-card');
      if (cards.length > 0) {
        gsap.fromTo(
          cards,
          { y: 44, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1.1,
            stagger: 0.16,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: '.renova-cards-grid',
              start: 'top 85%',
              once: true
            }
          }
        );
      }

      // 5. Reveal Transformations Project Rows on scroll
      const projectRows = gsap.utils.toArray('.renova-trans-item');
      if (projectRows.length > 0) {
        gsap.fromTo(
          projectRows,
          { y: 36, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1.0,
            stagger: 0.2,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: '.renova-trans-list',
              start: 'top 82%',
              once: true
            }
          }
        );
      }
    }, pageRef);

    return () => ctx.revert();
  }, []);
const TESTIMONIALS = [
    {
      quote: '“Mitjen completely changed the atmosphere of our home, blending beauty and function effortlessly.”',
      author: 'Dr. Arvind & Sunita M. — Coimbatore Villa Residence',
      num: '01 / 03'
    },
    {
      quote: '“Their architectural rigor and meticulous attention to millwork gave our commercial flagship an unmatched presence.”',
      author: 'Vikram R. — Managing Director, Nexus Hospitality',
      num: '02 / 03'
    },
    {
      quote: '“Every detail was handled with precision. The 3D studies were so accurate that the finished office felt like walking into the render.”',
      author: 'Priya K. — Executive Director, Bangalore Innovation Hub',
      num: '03 / 03'
    }
  ];

  const currentTestimonial = TESTIMONIALS[testimonialIndex];

  const handleNextTestimonial = () => {
    setTestimonialIndex((prev) => (prev + 1) % TESTIMONIALS.length);
  };

  const handlePrevTestimonial = () => {
    setTestimonialIndex((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  return (
    <div ref={pageRef} className="renova-services-page" itemScope itemType="https://schema.org/WebPage">
      <SEO
        title="Services & Interior Architecture Practices — Mitjen Interiors"
        description="Explore the interior architecture practices of Mitjen Interiors. Bespoke residential sanctuaries, commercial venues, and high-performance corporate workspaces."
        canonical="/services"
        ogImage="/assets/mitijen/Banner1.jpg"
      />

      {/* ====================================================================
          1. HERO BANNER — SPATIAL DISCIPLINES & PRACTICES (REFERENCE DESIGN)
          ==================================================================== */}
      <MonographBanner
        id="services-hero"
        sidebarKicker={['SPATIAL', 'DISCIPLINES', '& PRACTICE']}
        sidebarNote="Our approach is centered on three dedicated practices crafted around how people live, gather, and work."
        sidebarYear="2026 · PRACTICES DIRECTORY"
        heroImage="/assets/mitijen/Banner2.jpg"
        heroImageAlt="Mitjen Interiors Architecture & Spatial Practices"
        headlineLine1="CONCEPT"
        headlineLine2="& MOOD"
        topBadge="SERVICES & PRACTICES DIRECTORY · 2026"
        pillars={[
          {
            title: 'Residential',
            subtitle: 'bespoke homes, private villas & quiet living sanctuaries',
            link: '/services/residential-interior-design',
          },
          {
            title: 'Commercial',
            subtitle: 'experiential flagships & immersive dining environments',
            link: '/services/commercial-interior-design',
          },
          {
            title: 'Corporate',
            subtitle: 'executive headquarters & high-performance workplaces',
            link: '/services/corporate-interior-design',
          },
        ]}
      />

      {/* ====================================================================
          2. PHILOSOPHY SECTION ("BEHIND MITJEN" / 2-COLUMN SPLIT)
          ==================================================================== */}
      <section className="renova-philosophy" aria-label="Studio Philosophy">
        <div className="renova-philosophy-container">
          <div className="renova-philosophy-left">
            <span className="renova-kicker" style={{ color: 'var(--olive)' }}>
              BEHIND MITJEN
            </span>
          </div>

          <div className="renova-philosophy-right">
            <h2 className="renova-statement-large renova-serif-sub">
              We create interior spaces that balance beauty, function, and comfort. Our work blends modern aesthetics with the way clients actually live.
            </h2>

            <p className="renova-statement-sub">
              Every residence, commercial showroom, and executive workspace we design begins with human ritual. We synthesize spatial proportions, tactile materiality, daylight paths, and bespoke craftsmanship to produce environments that endure far beyond passing trends.
            </p>

            <Link to="/about" className="renova-inline-link">
              <span>Read About Our Studio Philosophy</span>
              <span aria-hidden="true">→</span>
            </Link>
          </div>
        </div>
      </section>

      {/* ====================================================================
          3. DISCIPLINES / 3 BLACK CARDS WITH CAD LINE-ART
          ==================================================================== */}
      <section className="renova-disciplines" aria-label="Our Interior Disciplines">
        <div className="renova-disciplines-container">
          <div className="renova-section-header">
            <span className="renova-kicker" style={{ color: 'var(--olive)' }}>
              DISCIPLINES · CORE SERVICES
            </span>
            <span style={{ fontFamily: 'var(--font-content)', fontSize: '0.86rem', color: '#666' }}>
              Select a practice to explore full case studies & specifications
            </span>
          </div>

          <div className="renova-cards-grid">
            {/* Card 1: Residential */}
            <Link
              to="/services/residential-interior-design"
              className="renova-card"
              aria-label="Residential Interiors Practice"
            >
              <div className="renova-card-top">
                <span className="renova-card-num">01</span>
              </div>

              {/* Bauhaus Designer Lounge Chair CAD Wireframe SVG */}
              <div className="renova-card-art" aria-hidden="true">
                <svg viewBox="0 0 160 140" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M35 110L50 45C52 38 58 35 65 35H105C112 35 118 38 120 45L135 110" />
                  <path d="M45 75C45 70 50 65 58 65H112C120 65 125 70 125 75L120 105C120 108 116 110 110 110H60C54 110 50 108 50 105L45 75Z" />
                  <path d="M60 40H110V65H60V40Z" strokeDasharray="3 3" opacity="0.6" />
                  <path d="M25 115H145" />
                  <path d="M35 115V125H65" />
                  <path d="M135 115V125H105" />
                  <ellipse cx="85" cy="125" rx="45" ry="5" strokeDasharray="2 4" opacity="0.4" />
                </svg>
              </div>

              <div className="renova-card-bottom">
                <h3 className="renova-card-title renova-serif-sub">Residential Interiors</h3>
                <p className="renova-card-desc">
                  Crafting bespoke personal sanctuaries, private villas, duplexes, and penthouses designed for warmth, quiet luxury, and effortless daily living.
                </p>
                <span className="renova-card-action">
                  <span>Explore Residential Practice</span>
                  <span aria-hidden="true">→</span>
                </span>
              </div>
            </Link>

            {/* Card 2: Commercial */}
            <Link
              to="/services/commercial-interior-design"
              className="renova-card"
              aria-label="Commercial Venues Practice"
            >
              <div className="renova-card-top">
                <span className="renova-card-num">02</span>
              </div>

              {/* Architectural Pavilion / Spatial Geometry CAD Wireframe SVG */}
              <div className="renova-card-art" aria-hidden="true">
                <svg viewBox="0 0 160 140" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M80 20L135 48V102L80 130L25 102V48L80 20Z" />
                  <path d="M80 20V130" opacity="0.7" />
                  <path d="M80 75L135 48" opacity="0.6" />
                  <path d="M80 75L25 48" opacity="0.6" />
                  <path d="M52 34V88" strokeDasharray="3 3" opacity="0.5" />
                  <path d="M108 34V88" strokeDasharray="3 3" opacity="0.5" />
                  <path d="M38 60L93 88" strokeDasharray="2 3" opacity="0.4" />
                  <path d="M68 45L123 73" strokeDasharray="2 3" opacity="0.4" />
                </svg>
              </div>

              <div className="renova-card-bottom">
                <h3 className="renova-card-title renova-serif-sub">Commercial Venues</h3>
                <p className="renova-card-desc">
                  High-impact experiential retail, flagship showrooms, boutique hospitality, and culinary venues engineered to immerse visitors and amplify brand prestige.
                </p>
                <span className="renova-card-action">
                  <span>Explore Commercial Practice</span>
                  <span aria-hidden="true">→</span>
                </span>
              </div>
            </Link>

            {/* Card 3: Corporate */}
            <Link
              to="/services/corporate-interior-design"
              className="renova-card"
              aria-label="Corporate Workplaces Practice"
            >
              <div className="renova-card-top">
                <span className="renova-card-num">03</span>
              </div>

              {/* Executive Suite & Sculptural Chandelier CAD Wireframe SVG */}
              <div className="renova-card-art" aria-hidden="true">
                <svg viewBox="0 0 160 140" fill="none" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round">
                  <ellipse cx="80" cy="30" rx="42" ry="10" />
                  <ellipse cx="80" cy="38" rx="30" ry="7" opacity="0.6" />
                  <path d="M45 30V15M115 30V15" strokeDasharray="2 3" />
                  <path d="M30 90L75 70H125L85 90H30Z" />
                  <path d="M30 90V98L85 98V90" />
                  <path d="M125 70V78L85 98" />
                  <path d="M45 98V120M75 98V120M115 78V105" opacity="0.6" />
                  <line x1="20" y1="120" x2="140" y2="120" opacity="0.3" strokeDasharray="3 3" />
                </svg>
              </div>

              <div className="renova-card-bottom">
                <h3 className="renova-card-title renova-serif-sub">Corporate Workplaces</h3>
                <p className="renova-card-desc">
                  Modern office headquarters, executive boardrooms, and creative studios balanced for collaborative energy, acoustics, and focused leadership.
                </p>
                <span className="renova-card-action">
                  <span>Explore Corporate Practice</span>
                  <span aria-hidden="true">→</span>
                </span>
              </div>
            </Link>
          </div>
        </div>
      </section>

      

      {/* ====================================================================
          6. ATMOSPHERIC TESTIMONIAL
          ==================================================================== */}
      <section className="renova-testimonial" aria-label="Client Experience">
        <div className="renova-test-bg">
          <img
            src="/assets/mitijen/Banner2.jpg"
            alt="Warm Wood Interior Testimonial Backdrop"
            loading="lazy"
          />
        </div>

        <div className="renova-test-container">
          <span className="renova-kicker" style={{ color: 'var(--sand)' }}>
            CLIENT PERSPECTIVE
          </span>

          <blockquote className="renova-test-quote renova-serif-heading">
            {currentTestimonial.quote}
          </blockquote>

          <div className="renova-test-author-row">
            <span className="renova-test-author">
              {currentTestimonial.author}
            </span>

            <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
              <span style={{ fontSize: '0.84rem', letterSpacing: '0.14em', opacity: 0.7, color: 'var(--ink, #151614)' }}>
                {currentTestimonial.num}
              </span>
              <button
                type="button"
                onClick={handlePrevTestimonial}
                className="renova-arrow-btn"
                aria-label="Previous Testimonial"
                style={{ width: '38px', height: '38px' }}
              >
                ←
              </button>
              <button
                type="button"
                onClick={handleNextTestimonial}
                className="renova-arrow-btn"
                aria-label="Next Testimonial"
                style={{ width: '38px', height: '38px' }}
              >
                →
              </button>
            </div>
          </div>
        </div>
      </section>


    </div>
  );
};

export default ServicesPage;
