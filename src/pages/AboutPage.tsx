import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SEO } from '../components/common/SEO';
import { SectionLabel } from '../components/common/SectionLabel';
import { useInquiry } from '../context/useInquiry';
import { MonographBanner } from '../components/common/MonographBanner';
import '../styles/AboutPage.css';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}


interface AccordionPanel {
  id: string;
  num: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  slug: string;
  shortLabel: string;
}

const ACCORDION_PANELS: AccordionPanel[] = [
  {
    id: 'modular-kitchen',
    num: '01',
    title: 'MODULAR KITCHEN',
    subtitle: 'Precision in Every Detail',
    description: 'A carefully crafted kitchen where storage, fittings and finishes come together with clean lines, accurate proportions and smooth functionality.',
    image: '/assets/mitijen/kitchen.jpeg',
    slug: '/projects',
    shortLabel: 'Kitchen'
  },
  {
    id: 'office-conference',
    num: '02',
    title: 'OFFICE & CONFERENCE HALL',
    subtitle: 'Designed for a Professional Standard',
    description: 'A refined workplace environment with considered layouts, precise detailing and a finish that reflects the quality of the business.',
    image: '/assets/mitijen/commercial4.jpeg',
    slug: '/projects',
    shortLabel: 'Corporate'
  },
  {
    id: 'theatre-media',
    num: '03',
    title: 'THEATRE & MEDIA ROOM',
    subtitle: 'Built Around the Experience',
    description: 'A detailed entertainment setting where layout, lighting, finishes and custom elements come together to create an immersive environment.',
    image: '/assets/mitijen/commercial2.jpeg',
    slug: '/projects',
    shortLabel: 'Theatre'
  },
  {
    id: 'bedroom',
    num: '04',
    title: 'BEDROOM',
    subtitle: 'Crafted for Everyday Comfort',
    description: 'A refined personal setting combining tailored storage, balanced finishes and carefully executed details for a calm and complete interior.',
    image: '/assets/mitijen/bedroom.jpeg',
    slug: '/projects',
    shortLabel: 'Residential'
  }
];

interface TrustPrinciple {
  id: string;
  num: string;
  tag: string;
  title: string;
  desc: string;
  image: string;
  alt: string;
  pills: string[];
}

const TRUST_PRINCIPLES: TrustPrinciple[] = [
  {
    id: 'vision',
    num: '01',
    tag: 'OUR VISION',
    title: 'TO BE A NAME PEOPLE CAN TRUST',
    desc: 'To become a trusted interior design brand known for creating thoughtful interiors and building lasting relationships through consistent work and genuine commitment to every project.',
    image: '/assets/mitijen/home1.jpeg',
    alt: 'To be a name people can trust',
    pills: ['Thoughtful Interiors', 'Lasting Relationships', 'Genuine Commitment']
  },
  {
    id: 'mission',
    num: '02',
    tag: 'OUR MISSION',
    title: 'TO MAKE THE JOURNEY CLEAR & RELIABLE',
    desc: "To understand our clients' needs, communicate openly, provide considered design solutions and deliver each project with care, responsibility and attention to detail.",
    image: '/assets/mitijen/bedroom.jpeg',
    alt: 'To make the journey clear & reliable',
    pills: ['Open Communication', 'Considered Solutions', 'Responsible Delivery']
  },
  {
    id: 'core-value',
    num: '03',
    tag: 'OUR CORE VALUE',
    title: 'TRUST IN EVERY STEP',
    desc: 'We value honesty, clarity and accountability in the way we work. We believe trust is earned through keeping our commitments, being transparent about decisions and standing behind the quality of our work.',
    image: '/assets/mitijen/BF&AF/AFWood.jpeg',
    alt: 'Trust in every step',
    pills: ['Honesty & Clarity', 'Kept Commitments', 'Quality Accountability']
  }
];

interface ApproachStep {
  id: string;
  num: string;
  title: string;
  desc: string;
  image: string;
  alt: string;
}

const APPROACH_STEPS: ApproachStep[] = [
  {
    id: 'understand',
    num: '01',
    title: 'Understand',
    desc: 'We begin by understanding your requirements, preferences, priorities and the purpose of the interior.',
    image: '/assets/mitijen/home1.jpeg',
    alt: 'Project layout and spatial planning'
  },
  {
    id: 'visualise',
    num: '02',
    title: 'Visualise',
    desc: 'Ideas are developed into clear design directions, supported by 2D and 3D visualisations that help you see the proposed result.',
    image: '/assets/mitijen/bedroom1.jpeg',
    alt: '3D spatial visualization and lighting'
  },
  {
    id: 'create',
    num: '03',
    title: 'Create',
    desc: 'Selected elements are developed with attention to detailing, custom work, materials and the requirements of the project.',
    image: '/assets/mitijen/Cupboard.jpeg',
    alt: 'Bespoke joinery, millwork and custom craftsmanship'
  },
  {
    id: 'complete',
    num: '04',
    title: 'Complete',
    desc: 'The approved design moves through execution and finishing, bringing the planned interior together as a complete result.',
    image: '/assets/mitijen/commercial1.jpeg',
    alt: 'Completed architectural interior execution'
  }
];

interface GalleryCard {
  id: string;
  layout: 'wide' | 'half';
  tag: string;
  title: string;
  subtitle: string;
  image: string;
  alt: string;
}

const GALLERY_CARDS: GalleryCard[] = [
  {
    id: 'living',
    layout: 'wide',
    tag: '01 · PLANNING',
    title: 'Living rooms',
    subtitle: 'Open, double-height light & balanced order',
    image: '/assets/mitijen/panaroma/panaroma1.png',
    alt: 'Living room planning and natural light'
  },
  {
    id: 'kitchens',
    layout: 'half',
    tag: '02 · JOINERY',
    title: 'Kitchens',
    subtitle: 'Fluted glass, tailored joinery & honed stone',
    image: '/assets/mitijen/kitchen.jpeg',
    alt: 'Custom kitchen and crafted cabinetry'
  },
  {
    id: 'bedrooms',
    layout: 'half',
    tag: '03 · FINISHES',
    title: 'Bedrooms',
    subtitle: 'Linen, cove lighting & calming textures',
    image: '/assets/mitijen/bedroom.jpeg',
    alt: 'Bedroom interior with tailored wardrobe'
  },
  {
    id: 'dining',
    layout: 'wide',
    tag: '04 · EXPERIENCE',
    title: 'Dining spaces',
    subtitle: 'Timber tables, morning daylight & crafted details',
    image: '/assets/mitijen/commercial6.jpeg',
    alt: 'Dining area with natural oak and crafted finishes'
  }
];

export const AboutPage: React.FC = () => {
  const { openInquiry } = useInquiry();
  const [activeAccordionId, setActiveAccordionId] = useState<string>('modular-kitchen');
  const [activeTrustSlide, setActiveTrustSlide] = useState<number>(0);
  const trustTouchStartX = useRef<number | null>(null);
  const trustTouchStartY = useRef<number | null>(null);

  const pageRef = useRef<HTMLDivElement>(null);

  const handlePrevTrustSlide = () => {
    setActiveTrustSlide((prev) => (prev - 1 + TRUST_PRINCIPLES.length) % TRUST_PRINCIPLES.length);
  };

  const handleNextTrustSlide = () => {
    setActiveTrustSlide((prev) => (prev + 1) % TRUST_PRINCIPLES.length);
  };

  const handleTrustKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowLeft') {
      e.preventDefault();
      handlePrevTrustSlide();
    } else if (e.key === 'ArrowRight') {
      e.preventDefault();
      handleNextTrustSlide();
    }
  };

  const handleTrustTouchStart = (e: React.TouchEvent) => {
    trustTouchStartX.current = e.touches[0].clientX;
    trustTouchStartY.current = e.touches[0].clientY;
  };

  const handleTrustTouchEnd = (e: React.TouchEvent) => {
    if (trustTouchStartX.current === null) return;
    const diffX = trustTouchStartX.current - e.changedTouches[0].clientX;
    const diffY = (trustTouchStartY.current || 0) - e.changedTouches[0].clientY;
    trustTouchStartX.current = null;
    trustTouchStartY.current = null;

    if (Math.abs(diffX) > 40 && Math.abs(diffX) > Math.abs(diffY)) {
      if (diffX > 0) {
        handleNextTrustSlide();
      } else {
        handlePrevTrustSlide();
      }
    }
  };

  // GSAP Animations
  useEffect(() => {
    // Respect reduced motion
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {


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

      // 3. Philosophy Cards Reveal (Desktop Cards & Mobile Carousel)
      const philItems = gsap.utils.toArray('.about-phil-desktop-view .about-phil-card');
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

      gsap.fromTo(
        '.about-phil-mobile-view .trust-carousel-stage',
        { y: 35, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.0,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.about-phil-mobile-view',
            start: 'top 85%'
          }
        }
      );

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
            start: 'top 85%'
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
        title="About Us — Mitjen Interiors | Creating Interiors with Purpose"
        description="Mitjen Interiors creates interiors shaped around the people, requirements and ideas behind each project. Coimbatore-based interior design brand led by V. Saravana Kumar."
        canonical="/about"
        ogImage="/assets/mitijen/Banner1.jpg"
      />

      {/* =====================================================================
          1. HERO BANNER — CREATING INTERIORS WITH PURPOSE
          ===================================================================== */}
      <MonographBanner
        id="philosophy"
        sidebarKicker={['WITH', 'THEIR', 'OWN', 'IDENTITY.']}
        sidebarNote="Mitjen Interiors creates interiors shaped around the people, requirements and ideas behind each project. Our approach brings together thoughtful planning, practical functionality and a strong sense of character."
        sidebarYear="2026 · ARCHIVE"
        heroImage="/assets/mitijen/Banner1.jpg"
        heroImageAlt="Creating interiors with purpose by Mitjen Interiors"
        headlineLine1="CREATING INTERIORS"
        headlineLine2="WITH PURPOSE."
        topBadge="ABOUT MITJEN INTERIORS"
        pillars={[
          {
            title: 'TECHNOLOGY',
            subtitle: 'Advanced German machinery brings greater precision to custom cutting and detailing.',
          },
          {
            title: 'ORIGINALITY',
            subtitle: 'Every project begins with a different idea and takes shape in its own way.',
          },
          {
            title: 'CRAFT',
            subtitle: 'A focus on well-made details, considered finishes and the quality of the final result.',
          },
        ]}
      />

      {/* =====================================================================
          2. ABOUT MITJEN INTERIORS — OUR STORY (EDITORIAL TWO-COLUMN)
          ===================================================================== */}
      <section className="about-story-section" id="studio">
        <div className="about-story-grid">
          {/* Left Text Column */}
          <div className="about-story-text">
            <SectionLabel style={{ color: 'var(--olive)' }}>OUR STORY</SectionLabel>
            <h2 className="about-story-heading">
              BEHIND THE
              <br />
              MITJEN JOURNEY
            </h2>

            <div className="about-story-paragraphs">
              <p>
                Mitjen Interiors is a Coimbatore-based interior design brand led by V. Saravana Kumar, Proprietor, with a clear approach to creating interiors that feel personal, purposeful and suited to the people who use them.
              </p>
              <p>
                Over the years, Mitjen has worked across diverse project requirements, bringing together ideas, functionality and carefully executed details to create interiors with their own character.
              </p>
              <p>
                Today, this approach continues to guide every project from the first conversation to the finished interior. We listen, understand and create with care, turning ideas into interiors that feel right for the way people live and work.
              </p>
            </div>

            <div className="about-story-credo">
              <div className="credo-item">
                <span className="credo-number">01</span>
                <span className="credo-label">A Clear Point of View</span>
              </div>
              <div className="credo-sep" />
              <div className="credo-item">
                <span className="credo-number">02</span>
                <span className="credo-label">Understanding People</span>
              </div>
              <div className="credo-sep" />
              <div className="credo-item">
                <span className="credo-number">03</span>
                <span className="credo-label">Always Evolving</span>
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
          3. WHAT WE STAND FOR
          ===================================================================== */}
      <section className="about-phil-section" id="philosophy">
        {/* Desktop View (> 768px): Exact original alternating cards */}
        <div className="about-phil-desktop-view">
          <div className="about-phil-header">
            <SectionLabel style={{ color: 'var(--brown)' }}>WHAT WE STAND FOR</SectionLabel>
            <h2 className="about-phil-heading">BUILT ON TRUST. GUIDED BY PURPOSE.</h2>
          </div>

          <div className="about-phil-cards">
            {/* Principle 01: OUR VISION */}
            <article className="about-phil-card">
              <div className="about-phil-plate">
                <img
                  src="/assets/mitijen/home1.jpeg"
                  alt="To be a name people can trust"
                  loading="lazy"
                />
                <span className="about-phil-num">01</span>
              </div>
              <div className="about-phil-body">
                <span className="about-phil-tag">OUR VISION</span>
                <h3 className="about-phil-title">TO BE A NAME PEOPLE CAN TRUST</h3>
                <p className="about-phil-desc">
                  To become a trusted interior design brand known for creating thoughtful interiors and building lasting relationships through consistent work and genuine commitment to every project.
                </p>
              </div>
            </article>

            {/* Principle 02: OUR MISSION */}
            <article className="about-phil-card about-phil-card-reverse">
              <div className="about-phil-plate">
                <img
                  src="/assets/mitijen/bedroom.jpeg"
                  alt="To make the journey clear & reliable"
                  loading="lazy"
                />
                <span className="about-phil-num">02</span>
              </div>
              <div className="about-phil-body">
                <span className="about-phil-tag">OUR MISSION</span>
                <h3 className="about-phil-title">TO MAKE THE JOURNEY CLEAR & RELIABLE</h3>
                <p className="about-phil-desc">
                  To understand our clients' needs, communicate openly, provide considered design solutions and deliver each project with care, responsibility and attention to detail.
                </p>
              </div>
            </article>

            {/* Principle 03: OUR CORE VALUE */}
            <article className="about-phil-card">
              <div className="about-phil-plate">
                <img
                  src="/assets/mitijen/BF&AF/AFWood.jpeg"
                  alt="Trust in every step"
                  loading="lazy"
                />
                <span className="about-phil-num">03</span>
              </div>
              <div className="about-phil-body">
                <span className="about-phil-tag">OUR CORE VALUE</span>
                <h3 className="about-phil-title">TRUST IN EVERY STEP</h3>
                <p className="about-phil-desc">
                  We value honesty, clarity and accountability in the way we work. We believe trust is earned through keeping our commitments, being transparent about decisions and standing behind the quality of our work.
                </p>
              </div>
            </article>
          </div>
        </div>

        {/* Mobile View (<= 768px): Luxury Architectural Layered-Card Carousel */}
        <div className="about-phil-mobile-view">
          <div className="trust-mob-header">
            <span className="trust-mob-eyebrow">
              <span className="trust-mob-bullet" />
              WHAT WE STAND FOR
            </span>
            <h2 className="trust-mob-heading">BUILT ON TRUST. GUIDED BY PURPOSE.</h2>
          </div>

          <div
            className="trust-carousel-stage"
            tabIndex={0}
            role="region"
            aria-label="What We Stand For carousel"
            onKeyDown={handleTrustKeyDown}
            onTouchStart={handleTrustTouchStart}
            onTouchEnd={handleTrustTouchEnd}
          >
            {/* Stacked depth layers */}
            <div className="trust-card-layer trust-card-layer-2" aria-hidden="true" />
            <div className="trust-card-layer trust-card-layer-1" aria-hidden="true" />

            {/* Active Card Slider */}
            <div className="trust-card-active-wrap">
              <div
                className="trust-slide-track"
                style={{ transform: `translateX(-${activeTrustSlide * 100}%)` }}
              >
                {TRUST_PRINCIPLES.map((principle) => (
                  <div className="trust-slide-item" key={principle.id}>
                    <div className="trust-slide-image-wrap">
                      <img
                        src={principle.image}
                        alt={principle.alt}
                        className="trust-slide-image"
                        loading="lazy"
                      />
                    </div>
                    <div className="trust-slide-info">
                      <div className="trust-slide-header-row">
                        <span className="trust-slide-tag">{principle.tag}</span>
                        <span className="trust-slide-num">{principle.num}</span>
                      </div>
                      <h3 className="trust-slide-title">{principle.title}</h3>
                      <p className="trust-slide-desc">{principle.desc}</p>
                      <div className="trust-slide-pills">
                        {principle.pills.map((pill, idx) => (
                          <span key={idx} className="trust-pill">
                            {pill}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom Navigation Toolbar */}
          <div className="trust-nav-bar">
            <div className="trust-nav-buttons">
              <button
                type="button"
                className="trust-nav-circle-btn"
                onClick={handlePrevTrustSlide}
                aria-label="Previous slide"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="15 18 9 12 15 6" />
                </svg>
              </button>
              <button
                type="button"
                className="trust-nav-circle-btn"
                onClick={handleNextTrustSlide}
                aria-label="Next slide"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </button>
            </div>

            <div className="trust-progress-track" role="tablist" aria-label="Slide indicators">
              {TRUST_PRINCIPLES.map((principle, index) => (
                <button
                  key={principle.id}
                  type="button"
                  role="tab"
                  aria-selected={activeTrustSlide === index}
                  aria-label={`Go to slide ${index + 1}`}
                  className={`trust-progress-dash ${activeTrustSlide === index ? 'is-active' : ''}`}
                  onClick={() => setActiveTrustSlide(index)}
                />
              ))}
            </div>

            <div className="trust-counter">
              <span>{activeTrustSlide + 1}</span> / <span>{TRUST_PRINCIPLES.length}</span>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          4. THE MITJEN APPROACH (PROCESS SPECIFICATION LIST — IMAGE 2 SPEC)
          ===================================================================== */}
      <section className="about-approach-section" id="approach">
        <div className="about-approach-container">
          <div className="about-approach-header">
            <span className="about-approach-eyebrow">
              <span className="about-approach-bullet" />
              THE MITJEN APPROACH
            </span>
            <h2 className="about-approach-heading">From First Idea to Final Detail</h2>
            <p className="about-approach-intro">
              Every project starts with a different requirement. Our approach brings clarity to the journey, keeping the design direction, decisions and execution connected from beginning to end.
            </p>
          </div>

          <div className="about-approach-list about-approach-grid">
            {APPROACH_STEPS.map((step) => (
              <div className="about-approach-step" key={step.id}>
                <div className="about-approach-swatch-wrap">
                  <div className="approach-swatch approach-image-swatch">
                    <img
                      src={step.image}
                      alt={step.alt}
                      className="approach-swatch-img"
                      loading="lazy"
                    />
                  </div>
                </div>

                <div className="about-approach-content">
                  <h3 className="step-title">{step.title}</h3>
                  <p className="step-desc">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =====================================================================
          5. A GLIMPSE INTO OUR WORK (INTERACTIVE SHOWCASE)
          ===================================================================== */}
      <section className="renova-transformations" id="transformations" aria-label="A Glimpse Into Our Work">
        <div className="renova-trans-container">
          {/* Desktop View (> 768px): Exact original horizontal expanding accordion */}
          <div className="renova-desktop-view">
            <div className="renova-trans-header">
              <div>
                <SectionLabel style={{ color: 'var(--olive)' }}>
                  A GLIMPSE INTO OUR WORK
                </SectionLabel>
                <h2 className="renova-trans-title">
                  PROJECTS THAT REFLECT OUR RANGE.
                </h2>
              </div>
              <p className="renova-trans-subtitle">
                From personal interiors to professional environments, our portfolio brings together work shaped by different requirements, settings and ideas.
              </p>
            </div>

            <div
              className="renova-expand-accordion"
              role="tablist"
              aria-label="Projects Reflecting Our Range Showcase"
            >
              {ACCORDION_PANELS.map((panel, idx) => {
                const isActive = activeAccordionId === panel.id;

                return (
                  <div
                    key={panel.id}
                    id={'acc-panel-' + panel.id}
                    role="tab"
                    aria-selected={isActive}
                    aria-controls={'acc-content-' + panel.id}
                    tabIndex={0}
                    className={'renova-acc-card ' + (isActive ? 'is-active' : '')}
                    onClick={() => setActiveAccordionId(panel.id)}
                    onMouseEnter={() => setActiveAccordionId(panel.id)}
                    onFocus={() => setActiveAccordionId(panel.id)}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault();
                        setActiveAccordionId(panel.id);
                      } else if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
                        e.preventDefault();
                        const next = ACCORDION_PANELS[(idx + 1) % ACCORDION_PANELS.length];
                        setActiveAccordionId(next.id);
                        document.getElementById('acc-panel-' + next.id)?.focus();
                      } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
                        e.preventDefault();
                        const prev = ACCORDION_PANELS[(idx - 1 + ACCORDION_PANELS.length) % ACCORDION_PANELS.length];
                        setActiveAccordionId(prev.id);
                        document.getElementById('acc-panel-' + prev.id)?.focus();
                      }
                    }}
                  >
                    {/* Accent Top Line */}
                    <div className="renova-acc-accent-line" />

                    {/* Background Imagery */}
                    <img
                      src={panel.image}
                      alt={panel.title}
                      className="renova-acc-bg"
                      loading="lazy"
                    />

                    {/* Gradient & Vignette Overlays */}
                    <div className="renova-acc-tint" />
                    <div className="renova-acc-vignette" />

                    {/* Collapsed State: Monograph Label (Rotated on Desktop, Horizontal on Mobile) */}
                    <div className="renova-acc-collapsed-bar" aria-hidden={isActive}>
                      <span className="renova-acc-collapsed-num">{panel.num}</span>
                      <span className="renova-acc-collapsed-title">{panel.title}</span>
                      <span className="renova-acc-mobile-cue" aria-hidden="true">+</span>
                    </div>

                    {/* Expanded Active Content */}
                    <div
                      id={'acc-content-' + panel.id}
                      className="renova-acc-content"
                      aria-hidden={!isActive}
                    >
                      <div className="renova-acc-kicker-wrap">
                        <span className="renova-acc-num">{panel.num}</span>
                        <span className="renova-acc-kicker-dot" />
                        <span className="renova-acc-kicker-tag">{panel.subtitle}</span>
                      </div>

                      <h3 className="renova-acc-heading">
                        {panel.title}
                      </h3>

                      <p className="renova-acc-desc">
                        {panel.description}
                      </p>

                      <div className="renova-acc-actions">
                        <button
                          type="button"
                          className="renova-acc-enquire-btn"
                          onClick={(e) => {
                            e.stopPropagation();
                            openInquiry(panel.title + ' — Project Inquiry');
                          }}
                        >
                          <span>ENQUIRE NOW</span>
                        </button>

                        <Link
                          to={panel.slug}
                          className="renova-acc-spec-link"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <span>Explore Projects</span>
                          <span aria-hidden="true">→</span>
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="renova-trans-footer-cta">
              <Link to="/projects" className="renova-btn-outline">
                <span>EXPLORE ALL PROJECTS</span>
                <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>

          {/* Mobile View (<= 768px): Reference Showcase with featured project image, info, thumbnails & enquire button */}
          <div className="renova-mobile-view">
            <div className="renova-mob-header">
              <span className="renova-mob-eyebrow">
                <span className="renova-mob-bullet" />
                A GLIMPSE INTO OUR WORK
              </span>
              <h2 className="renova-mob-title">
                PROJECTS THAT REFLECT OUR RANGE.
              </h2>
              <p className="renova-mob-subtitle">
                Tap a project to view it.
              </p>
            </div>

            {(() => {
              const activePanel = ACCORDION_PANELS.find((p) => p.id === activeAccordionId) || ACCORDION_PANELS[0];
              return (
                <>
                  {/* Large Featured Project Card (Occupies blank area with project photography) */}
                  <div className="renova-mob-featured-card">
                    <img
                      key={activePanel.id}
                      src={activePanel.image}
                      alt={activePanel.title}
                      className="renova-mob-featured-img"
                      loading="lazy"
                    />
                    <div className="renova-mob-featured-vignette" />
                  </div>

                  {/* Active Project Title, Subtitle & Enquire Pill */}
                  <div className="renova-mob-info-row">
                    <div className="renova-mob-info-text">
                      <h3 className="renova-mob-project-title">{activePanel.title}</h3>
                      <p className="renova-mob-project-desc">{activePanel.subtitle}</p>
                    </div>
                    <button
                      type="button"
                      className="renova-mob-enquire-btn"
                      onClick={() => openInquiry(activePanel.title + ' — Project Inquiry')}
                    >
                      Enquire
                    </button>
                  </div>

                  {/* Horizontal Thumbnail Selector */}
                  <div className="renova-mob-thumbnails-grid" role="tablist" aria-label="Select project category">
                    {ACCORDION_PANELS.map((panel) => {
                      const isSelected = activeAccordionId === panel.id;
                      return (
                        <button
                          key={panel.id}
                          type="button"
                          role="tab"
                          aria-selected={isSelected}
                          className={`renova-mob-thumb-btn ${isSelected ? 'is-active' : ''}`}
                          onClick={() => setActiveAccordionId(panel.id)}
                        >
                          <div className="renova-mob-thumb-img-wrap">
                            <img
                              src={panel.image}
                              alt={panel.title}
                              className="renova-mob-thumb-img"
                              loading="lazy"
                            />
                          </div>
                          <span className="renova-mob-thumb-label">{panel.shortLabel}</span>
                        </button>
                      );
                    })}
                  </div>

                  {/* Full-width "View all projects" button */}
                  <Link to="/projects" className="renova-mob-view-all-btn">
                    View all 24 projects
                  </Link>
                </>
              );
            })()}
          </div>
        </div>
      </section>

      {/* =====================================================================
          6. A CLOSER LOOK AT OUR WORK (SIGNATURE INTERIOR SPACES GALLERY)
          ===================================================================== */}
      <section className="about-gallery-section" id="gallery">
        <div className="about-gallery-header">
          <div>
            <SectionLabel style={{ color: 'var(--sand)' }}>A CLOSER LOOK AT OUR WORK</SectionLabel>
            <h2 className="about-gallery-heading">THE DETAILS DEFINE THE RESULT.</h2>
          </div>
          <p className="about-gallery-sub">
            Every interior is shaped by hundreds of decisions. We pay attention to the elements that bring the whole design together - from the way it is arranged to the way the final details are finished.
          </p>
        </div>

        {/* 4-Card Composition Matching Reference Image (media_1793795619601) */}
        <div className="about-gallery-grid">
          {GALLERY_CARDS.map((card) => (
            <figure
              key={card.id}
              className={`about-gallery-item ${card.layout === 'wide' ? 'about-gallery-card-wide' : 'about-gallery-card-half'}`}
            >
              <div className="about-gallery-plate">
                <img
                  src={card.image}
                  alt={card.alt}
                  loading="lazy"
                />
                <div className="about-gallery-vignette" />
                <figcaption className="about-gallery-overlay">
                  <span className="about-gallery-card-tag">{card.tag}</span>
                  <h3 className="about-gallery-card-title">{card.title}</h3>
                  <p className="about-gallery-card-sub">{card.subtitle}</p>
                </figcaption>
              </div>
            </figure>
          ))}
        </div>
      </section>

      {/* =====================================================================
          7. BRAND STATEMENT (MINIMAL FULL-WIDTH CONTRAST)
          ===================================================================== */}
      <section className="about-statement-section" aria-label="Brand Philosophy Statement">
        <div className="about-statement-bg-pattern" aria-hidden="true" />
        <div className="about-statement-content">
          <span className="about-statement-kicker">MITIJEN CORE MANIFESTO</span>
          <h2 className="about-statement-title">
            “BEAUTY IN EVERY VIEW, PURPOSE IN EVERY DETAIL.
            <br />
            COMFORT IN EVERY MOMENT.”
          </h2>
          <div className="about-statement-line" aria-hidden="true" />
        </div>
      </section>

      {/* =====================================================================
          8. FINAL CALL TO ACTION (OPENS ENQUIRY FORM DIALOG)
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
            <SectionLabel style={{ color: 'var(--sand)' }}>START A CONVERSATION</SectionLabel>
            <h2 className="about-cta-heading">
              HAVE AN IDEA
              <br />
              WORTH CREATING?
            </h2>
            <p className="about-cta-desc">
              Tell us what you have in mind, and let’s explore the right direction for your interior project.
            </p>

            <div className="about-cta-buttons">
              <button
                type="button"
                className="about-btn-primary"
                onClick={() => openInquiry('Start A Conversation — About Us Page')}
              >
                <span>TALK TO MITJEN →</span>
              </button>

              <Link to="/projects" className="about-btn-secondary">
                <span>EXPLORE OUR WORK →</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
