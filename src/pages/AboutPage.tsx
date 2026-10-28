import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SEO } from '../components/common/SEO';
import { SectionLabel } from '../components/common/SectionLabel';
import { useInquiry } from '../context/useInquiry';
import '../styles/AboutPage.css';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export const AboutPage: React.FC = () => {
  const { openInquiry } = useInquiry();
  const pageRef = useRef<HTMLDivElement>(null);

  // GSAP Animations
  useEffect(() => {
    // Respect reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // 1. Hero Text Reveal Animation
      const heroHeadlineLines = gsap.utils.toArray('.about-hero-title .ln span');
      gsap.fromTo(
        heroHeadlineLines,
        { yPercent: 110, opacity: 0 },
        {
          yPercent: 0,
          opacity: 1,
          duration: 1.3,
          stagger: 0.18,
          ease: 'power3.out',
          delay: 0.2
        }
      );

      gsap.fromTo(
        '.about-hero-sub',
        { y: 24, opacity: 0 },
        { y: 0, opacity: 0.9, duration: 1.1, ease: 'power2.out', delay: 0.6 }
      );

      gsap.fromTo(
        '.about-hero-badge',
        { y: -16, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: 'power2.out', delay: 0.1 }
      );

      gsap.fromTo(
        '.about-hero-scroll-indicator',
        { opacity: 0 },
        { opacity: 1, duration: 1, delay: 0.9 }
      );

      // Hero Image subtle parallax scroll
      gsap.to('.about-hero-bg-img', {
        yPercent: 18,
        ease: 'none',
        scrollTrigger: {
          trigger: '.about-hero',
          start: 'top top',
          end: 'bottom top',
          scrub: true
        }
      });

      // 2. About Editorial Section Reveal
      gsap.fromTo(
        '.about-story-text',
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.about-story-section',
            start: 'top 75%'
          }
        }
      );

      gsap.fromTo(
        '.about-story-image-wrap',
        { clipPath: 'inset(10% 0 10% 0)', opacity: 0.6, scale: 0.96 },
        {
          clipPath: 'inset(0% 0 0% 0)',
          opacity: 1,
          scale: 1,
          duration: 1.4,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.about-story-section',
            start: 'top 70%'
          }
        }
      );

      // 3. Philosophy Cards Reveal
      const philItems = gsap.utils.toArray('.about-phil-card');
      philItems.forEach((card: any) => {
        gsap.fromTo(
          card,
          { y: 50, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1.2,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: card,
              start: 'top 80%'
            }
          }
        );
      });

      // 4. Approach Steps Reveal
      const approachSteps = gsap.utils.toArray('.about-approach-step');
      gsap.fromTo(
        approachSteps,
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          stagger: 0.2,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.about-approach-grid',
            start: 'top 80%'
          }
        }
      );

      // 5. Signature Gallery Reveal
      const galleryItems = gsap.utils.toArray('.about-gallery-item');
      galleryItems.forEach((item: any, i: number) => {
        gsap.fromTo(
          item,
          { y: 45, opacity: 0 },
          {
            y: 0,
            opacity: 1,
            duration: 1.1,
            delay: (i % 2) * 0.15,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: item,
              start: 'top 85%'
            }
          }
        );
      });

      // 6. Brand Statement Oversized Text Reveal
      gsap.fromTo(
        '.about-statement-title',
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.3,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.about-statement-section',
            start: 'top 75%'
          }
        }
      );

      // 7. Final CTA Reveal
      gsap.fromTo(
        '.about-cta-card',
        { y: 35, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.about-cta-section',
            start: 'top 80%'
          }
        }
      );
    }, pageRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="about-page" ref={pageRef}>
      <SEO
        title="About Us — Mitijen Interiors | Residential Interior Architecture"
        description="Learn about Mitijen Interiors: our design philosophy, thoughtful approach, and commitment to creating residential spaces that feel timeless, personal, and like home."
        canonical="/about"
        ogImage="/assets/mitijen/Banner1.jpg"
      />

      {/* =====================================================================
          1. HERO SECTION — OUR STORY
          ===================================================================== */}
      <section className="about-hero" id="story" aria-label="Our Story">
        <div className="about-hero-bg">
          <img
            src="/assets/mitijen/Banner1.jpg"
            alt="Considered sunlit living space by Mitijen Interiors"
            className="about-hero-bg-img"
          />
          <div className="about-hero-overlay" />
        </div>

        <div className="about-hero-content">
          <div className="about-hero-badge">
            <span className="about-hero-dot" />
            <span className="about-hero-tag">ABOUT MITIJEN INTERIORS · STUDIO MONOGRAPH</span>
          </div>

          <h1 className="about-hero-title">
            <span className="ln">
              <span>WE DESIGN SPACES</span>
            </span>
            <span className="ln">
              <span>THAT FEEL LIKE HOME.</span>
            </span>
          </h1>

          <p className="about-hero-sub">
            Thoughtfully crafted interiors that bring together beauty, comfort, and the way you live.
          </p>

          <div className="about-hero-scroll-indicator" aria-hidden="true">
            <span className="scroll-label">Scroll to Explore</span>
            <span className="scroll-line" />
          </div>
        </div>
      </section>

      {/* =====================================================================
          2. ABOUT MITIJEN INTERIORS (EDITORIAL TWO-COLUMN)
          ===================================================================== */}
      <section className="about-story-section" id="studio">
        <div className="about-story-grid">
          {/* Left Text Column */}
          <div className="about-story-text">
            <SectionLabel style={{ color: 'var(--olive)' }}>Our Essence & Story</SectionLabel>
            <h2 className="about-story-heading">
              MORE THAN INTERIORS.
              <br />
              A WAY OF LIVING.
            </h2>

            <div className="about-story-paragraphs">
              <p>
                At Mitijen Interiors, we believe a home should reflect the people who live in it.
                Every space begins with understanding your lifestyle, your preferences, and the
                details that make a place uniquely yours.
              </p>
              <p>
                Our approach combines thoughtful planning, timeless aesthetics, carefully selected
                materials, and practical functionality to create interiors that feel as beautiful
                as they are comfortable.
              </p>
              <p>
                From the first concept to the finishing touches, we focus on creating spaces that
                feel personal, purposeful, and made to last.
              </p>
            </div>

            <div className="about-story-credo">
              <div className="credo-item">
                <span className="credo-number">01</span>
                <span className="credo-label">Considered Proportions</span>
              </div>
              <div className="credo-sep" />
              <div className="credo-item">
                <span className="credo-number">02</span>
                <span className="credo-label">Tactile Natural Materials</span>
              </div>
              <div className="credo-sep" />
              <div className="credo-item">
                <span className="credo-number">03</span>
                <span className="credo-label">Enduring Comfort</span>
              </div>
            </div>
          </div>

          {/* Right Image Column */}
          <div className="about-story-image-wrap">
            <div className="about-story-image-frame">
              <img
                src="/assets/mitijen/Banner2.jpg"
                alt="Sunlit dining and open living area with organic timber furniture"
                loading="lazy"
              />
              <div className="about-story-image-caption">
                <span className="caption-tag">RESIDENTIAL SANCTUARY</span>
                <span className="caption-desc">Warm natural daylight, quarter-sawn oak, and linen upholstery</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          3. OUR DESIGN PHILOSOPHY
          ===================================================================== */}
      <section className="about-phil-section" id="philosophy">
        <div className="about-phil-header">
          <SectionLabel style={{ color: 'var(--brown)' }}>Guiding Principles</SectionLabel>
          <h2 className="about-phil-heading">OUR DESIGN PHILOSOPHY</h2>
          <p className="about-phil-sub">
            Three foundational pillars that guide every interior decision, spatial layout, and custom material detail we create.
          </p>
        </div>

        <div className="about-phil-cards">
          {/* Principle 01 */}
          <article className="about-phil-card">
            <div className="about-phil-plate">
              <img
                src="/assets/mitijen/Banner3.jpg"
                alt="Purposeful interior architecture with balanced light and proportion"
                loading="lazy"
              />
              <span className="about-phil-num">01</span>
            </div>
            <div className="about-phil-body">
              <span className="about-phil-tag">PRINCIPLE 01</span>
              <h3 className="about-phil-title">Purposeful Design</h3>
              <p className="about-phil-desc">
                Every detail serves a purpose, balancing aesthetics with everyday functionality.
                We believe beauty functions best when it simplifies your morning rituals and brings
                effortless order to daily living.
              </p>
            </div>
          </article>

          {/* Principle 02 */}
          <article className="about-phil-card about-phil-card-reverse">
            <div className="about-phil-plate">
              <img
                src="/assets/mitijen/bedroom.jpeg"
                alt="Personal sanctuary bedroom with tactile textiles and warm lighting"
                loading="lazy"
              />
              <span className="about-phil-num">02</span>
            </div>
            <div className="about-phil-body">
              <span className="about-phil-tag">PRINCIPLE 02</span>
              <h3 className="about-phil-title">Personal Expression</h3>
              <p className="about-phil-desc">
                Your home should reflect your personality, lifestyle, and individual preferences.
                Rather than imposing a rigid house style, we listen closely to shape an atmosphere
                that is deeply, unmistakably yours.
              </p>
            </div>
          </article>

          {/* Principle 03 */}
          <article className="about-phil-card">
            <div className="about-phil-plate">
              <img
                src="/assets/mitijen/BF&AF/AFWood.jpeg"
                alt="Handcrafted architectural timber millwork and joinery"
                loading="lazy"
              />
              <span className="about-phil-num">03</span>
            </div>
            <div className="about-phil-body">
              <span className="about-phil-tag">PRINCIPLE 03</span>
              <h3 className="about-phil-title">Timeless Craftsmanship</h3>
              <p className="about-phil-desc">
                We value considered materials, thoughtful detailing, and designs that remain beautiful
                over time. Natural stone, quarter-sawn oak, and breathable mineral plasters age
                with poise and grace.
              </p>
            </div>
          </article>
        </div>
      </section>

      {/* =====================================================================
          4. OUR APPROACH (PROCESS TIMELINE)
          ===================================================================== */}
      <section className="about-approach-section" id="approach">
        <div className="about-approach-header">
          <SectionLabel style={{ color: 'var(--olive)' }}>The Mitijen Method</SectionLabel>
          <h2 className="about-approach-heading">OUR APPROACH</h2>
          <p className="about-approach-intro">
            A collaborative, four-stage architectural journey designed to turn ideas into calm, comfortable realities.
          </p>
        </div>

        <div className="about-approach-grid">
          {/* Step 1 */}
          <div className="about-approach-step">
            <div className="step-num-wrap">
              <span className="step-num">01</span>
              <span className="step-line" />
            </div>
            <h3 className="step-title">Discover</h3>
            <p className="step-desc">
              Understand your needs, lifestyle, vision, and budget. We immerse ourselves in how
              you inhabit space and what moments matter most to your family.
            </p>
          </div>

          {/* Step 2 */}
          <div className="about-approach-step">
            <div className="step-num-wrap">
              <span className="step-num">02</span>
              <span className="step-line" />
            </div>
            <h3 className="step-title">Design</h3>
            <p className="step-desc">
              Develop the spatial concept, layouts, materials, and visual direction. We explore
              circulation, natural illumination, and tactile material palettes.
            </p>
          </div>

          {/* Step 3 */}
          <div className="about-approach-step">
            <div className="step-num-wrap">
              <span className="step-num">03</span>
              <span className="step-line" />
            </div>
            <h3 className="step-title">Refine</h3>
            <p className="step-desc">
              Fine-tune the details to balance beauty and practicality. Every millwork joint,
              recessed lighting trough, and hardware finish is tested and resolved.
            </p>
          </div>

          {/* Step 4 */}
          <div className="about-approach-step">
            <div className="step-num-wrap">
              <span className="step-num">04</span>
              <span className="step-line" />
            </div>
            <h3 className="step-title">Deliver</h3>
            <p className="step-desc">
              Bring the approved design to life with attention to detail. We oversee fabrication,
              artisan joinery, and on-site realization until the final touch.
            </p>
          </div>
        </div>
      </section>

      {/* =====================================================================
          5. SIGNATURE INTERIOR GALLERY
          ===================================================================== */}
      <section className="about-gallery-section" id="gallery">
        <div className="about-gallery-header">
          <div>
            <SectionLabel style={{ color: 'var(--brown)' }}>Residential Spaces</SectionLabel>
            <h2 className="about-gallery-heading">SIGNATURE INTERIOR SPACES</h2>
          </div>
          <p className="about-gallery-sub">
            From contemporary open salons to tailored private suites, each residential environment
            balances natural daylight with bespoke craftsmanship.
          </p>
        </div>

        {/* Asymmetrical Editorial Gallery Grid */}
        <div className="about-gallery-grid">
          {/* Item 1: Contemporary Living Room (Large Hero Spread) */}
          <figure className="about-gallery-item item-large">
            <div className="about-gallery-plate aspect-16-10">
              <img
                src="/assets/mitijen/panaroma/panaroma1.png"
                alt="Contemporary open-plan living room with natural stone and timber portals"
                loading="lazy"
              />
              <div className="about-gallery-vignette" />
            </div>
            <figcaption className="about-gallery-caption">
              <span className="gal-cat">LIVING SANCTUARY</span>
              <span className="gal-title">Contemporary Living Rooms</span>
              <span className="gal-note">Open circulation, double-height natural light, and architectural portals</span>
            </figcaption>
          </figure>

          {/* Item 2: Elegant Modular Kitchen */}
          <figure className="about-gallery-item item-medium">
            <div className="about-gallery-plate aspect-4-5">
              <img
                src="/assets/mitijen/kitchen.jpeg"
                alt="Tailored modular kitchen with fluted glass cabinets and quartz counter"
                loading="lazy"
              />
              <div className="about-gallery-vignette" />
            </div>
            <figcaption className="about-gallery-caption">
              <span className="gal-cat">CULINARY CRAFT</span>
              <span className="gal-title">Elegant Modular Kitchens</span>
              <span className="gal-note">Fluted glass cabinetry, concealed extraction, and honed stone</span>
            </figcaption>
          </figure>

          {/* Item 3: Comfortable Bedroom Suite */}
          <figure className="about-gallery-item item-medium">
            <div className="about-gallery-plate aspect-4-5">
              <img
                src="/assets/mitijen/bedroom.jpeg"
                alt="Tactile bedroom with boucle upholstery, warm ambient cove lighting, and linen"
                loading="lazy"
              />
              <div className="about-gallery-vignette" />
            </div>
            <figcaption className="about-gallery-caption">
              <span className="gal-cat">REST & SERENITY</span>
              <span className="gal-title">Comfortable Bedrooms</span>
              <span className="gal-note">Acoustic boucle, washed linen drapery, and low-glare cove illumination</span>
            </figcaption>
          </figure>

          {/* Item 4: Refined Dining Spaces */}
          <figure className="about-gallery-item item-medium">
            <div className="about-gallery-plate aspect-3-4">
              <img
                src="/assets/mitijen/Banner2.jpg"
                alt="Refined Scandinavian dining space with rattan pendant and quarter-sawn oak"
                loading="lazy"
              />
              <div className="about-gallery-vignette" />
            </div>
            <figcaption className="about-gallery-caption">
              <span className="gal-cat">GATHERING</span>
              <span className="gal-title">Refined Dining Spaces</span>
              <span className="gal-note">Artisan timber tables, woven cord seating, and welcoming morning daylight</span>
            </figcaption>
          </figure>

          {/* Item 5: Bespoke Storage & Architectural Details */}
          <figure className="about-gallery-item item-wide">
            <div className="about-gallery-plate aspect-16-9">
              <img
                src="/assets/mitijen/dressing-cupboard.jpeg"
                alt="Bespoke storage wardrobe and flush architectural millwork"
                loading="lazy"
              />
              <div className="about-gallery-vignette" />
            </div>
            <figcaption className="about-gallery-caption">
              <span className="gal-cat">CUSTOM MILLWORK</span>
              <span className="gal-title">Bespoke Storage & Architectural Details</span>
              <span className="gal-note">Handleless joinery, tailored closet organizers, and integrated illumination</span>
            </figcaption>
          </figure>
        </div>
      </section>

      {/* =====================================================================
          6. BRAND STATEMENT (MINIMAL FULL-WIDTH CONTRAST)
          ===================================================================== */}
      <section className="about-statement-section" aria-label="Brand Philosophy Statement">
        <div className="about-statement-bg-pattern" aria-hidden="true" />
        <div className="about-statement-content">
          <span className="about-statement-kicker">MITIJEN CORE MANIFESTO</span>
          <h2 className="about-statement-title">
            “GOOD DESIGN ISN'T JUST SEEN.
            <br />
            IT'S FELT.”
          </h2>
          <div className="about-statement-line" aria-hidden="true" />
        </div>
      </section>

      {/* =====================================================================
          7. FINAL CALL TO ACTION (OPENS ENQUIRY FORM DIALOG)
          ===================================================================== */}
      <section className="about-cta-section" id="contact" aria-label="Begin a Project Consultation">
        <div className="about-cta-card">
          <div className="about-cta-bg">
            <img
              src="/assets/mitijen/warm1.jpeg"
              alt="Atmospheric warm interior consultation backdrop"
              loading="lazy"
            />
            <div className="about-cta-overlay" />
          </div>

          <div className="about-cta-content">
            <SectionLabel style={{ color: 'var(--sand)' }}>Start a Conversation</SectionLabel>
            <h2 className="about-cta-heading">
              LET'S CREATE A SPACE
              <br />
              THAT FEELS LIKE YOU.
            </h2>
            <p className="about-cta-desc">
              Tell us about your home, your ideas, and the life you want your space to support.
            </p>

            <div className="about-cta-buttons">
              <button
                type="button"
                className="about-btn-primary"
                onClick={() => openInquiry('Start Your Project — About Us Page')}
              >
                <span>Start Your Project</span>
                <svg width="16" height="12" viewBox="0 0 16 12" fill="none" stroke="currentColor">
                  <path d="M1 6h14M10 1l5 5-5 5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>

              <Link to="/projects" className="about-btn-secondary">
                <span>Explore Our Projects</span>
                <span className="arrow">→</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
