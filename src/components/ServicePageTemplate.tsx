import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import type { ServicePageData } from '../data/servicesData';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}
import { SEO } from './common/SEO';
import { Breadcrumbs } from './common/Breadcrumbs';
import { useInquiry } from '../context/useInquiry';
import '../styles/ServicePage.css';
import '../styles/FaqSection.css';

interface ServicePageTemplateProps {
  data: ServicePageData;
  children?: React.ReactNode;
}

interface ServiceFaqMeta {
  image: string;
  badge: string;
}

const RESIDENTIAL_FAQ_META: ServiceFaqMeta[] = [
  { image: '/assets/mitijen/home1.jpeg', badge: 'Residential · Spatial Scope' },
  { image: '/assets/CL.jpg', badge: 'Residential · Studio Methodology' },
  { image: '/assets/transformations/lounge_after.jpg', badge: 'Residential · Compact Footprints' },
  { image: '/assets/mitijen/Banner3.jpg', badge: 'Residential · Villa Architecture' },
  { image: '/assets/craft_wardrobe.jpg', badge: 'Residential · Joinery & Millwork' },
  { image: '/assets/panorama_bath.jpg', badge: 'Residential · Lighting & Ambiance' },
  { image: '/assets/craft_joinery.jpg', badge: 'Residential · Turnkey Supervision' },
  { image: '/assets/mitijen/bedroom.jpeg', badge: 'Residential · Master Suites' },
];

const COMMERCIAL_FAQ_META: ServiceFaqMeta[] = [
  { image: '/assets/CS.jpg', badge: 'Commercial · Spatial Scope' },
  { image: '/assets/CP.jpg', badge: 'Commercial · Typologies' },
  { image: '/assets/mitijen/warm1.jpeg', badge: 'Commercial · Public Dynamics' },
  { image: '/assets/mitijen/deco1.jpeg', badge: 'Commercial · Retail Circulation' },
  { image: '/assets/craft_credenza.jpg', badge: 'Commercial · Merchandising Display' },
  { image: '/assets/craft_shelving.jpg', badge: 'Commercial · Advisory & Brief' },
  { image: '/assets/forma_facade.jpg', badge: 'Commercial · Storefront & Leases' },
  { image: '/assets/PHOTO.jpg', badge: 'Commercial · Fit-Out Refurbishment' },
];

const CORPORATE_FAQ_META: ServiceFaqMeta[] = [
  { image: '/assets/I2.jpg', badge: 'Corporate · Workplace Architecture' },
  { image: '/assets/craft_stone_vanity.jpg', badge: 'Corporate · Productivity Focus' },
  { image: '/assets/transformations/bedroom_after.jpg', badge: 'Corporate · Spatial Typologies' },
  { image: '/assets/I3.jpg', badge: 'Corporate · Collaboration Zones' },
  { image: '/assets/mitijen/deco3.jpeg', badge: 'Corporate · Executive Reception' },
  { image: '/assets/mitijen/deco2.jpeg', badge: 'Corporate · Brand Identity' },
  { image: '/assets/mitijen/dressingtable.jpeg', badge: 'Corporate · Briefing & Headcount' },
  { image: '/assets/mitijen/deco-kitchen.jpeg', badge: 'Corporate · Phased Modernization' },
];

function getCategoryFaqMeta(category: 'Residential' | 'Commercial' | 'Corporate'): ServiceFaqMeta[] {
  switch (category) {
    case 'Residential':
      return RESIDENTIAL_FAQ_META;
    case 'Commercial':
      return COMMERCIAL_FAQ_META;
    case 'Corporate':
      return CORPORATE_FAQ_META;
    default:
      return RESIDENTIAL_FAQ_META;
  }
}

function parseFaqAnswer(answer: string): { summary: string; desc: string } {
  const periodIndex = answer.indexOf('. ');
  if (periodIndex !== -1 && periodIndex < answer.length - 12) {
    return {
      summary: answer.slice(0, periodIndex + 1).trim(),
      desc: answer.slice(periodIndex + 1).trim(),
    };
  }
  return {
    summary: '',
    desc: answer,
  };
}

export const ServicePageTemplate: React.FC<ServicePageTemplateProps> = ({ data, children }) => {
  const { openInquiry } = useInquiry();
  const location = useLocation();

  // Accordion state for FAQs (first item open by default, single-selection with smooth image cross-fade like homepage)
  const [activeFaqIndex, setActiveFaqIndex] = useState<number>(0);
  const philosophyRef = useRef<HTMLElement>(null);

  const toggleFaq = (idx: number) => {
    setActiveFaqIndex((prev) => (prev === idx ? -1 : idx));
  };

  // Editorial section text animations via GSAP
  useEffect(() => {
    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion || !philosophyRef.current) return;

    const ctx = gsap.context(() => {
      // Animate Kicker & Accent Line
      gsap.fromTo(
        '.arch-editorial-kicker-wrap',
        { opacity: 0, x: -24 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: philosophyRef.current,
            start: 'top 82%',
            once: true,
          },
        }
      );

      gsap.fromTo(
        '.arch-editorial-gold-rule',
        { scaleX: 0, transformOrigin: 'left center' },
        {
          scaleX: 1,
          duration: 1.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.arch-editorial-gold-rule',
            start: 'top 85%',
            once: true,
          },
        }
      );

      // Animate Serif Heading
      gsap.fromTo(
        '.arch-editorial-heading',
        { opacity: 0, y: 32 },
        {
          opacity: 1,
          y: 0,
          duration: 1.0,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.arch-editorial-heading',
            start: 'top 85%',
            once: true,
          },
        }
      );

      // Animate Prose Columns
      const cols = gsap.utils.toArray('.arch-editorial-col');
      if (cols.length > 0) {
        gsap.fromTo(
          cols,
          { opacity: 0, y: 28 },
          {
            opacity: 1,
            y: 0,
            duration: 0.9,
            stagger: 0.18,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: '.arch-editorial-prose-grid',
              start: 'top 85%',
              once: true,
            },
          }
        );
      }

      // Animate Criteria Entries
      const entries = gsap.utils.toArray('.arch-criteria-entry');
      if (entries.length > 0) {
        gsap.fromTo(
          entries,
          { opacity: 0, y: 24 },
          {
            opacity: 1,
            y: 0,
            duration: 0.85,
            stagger: 0.14,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: '.arch-editorial-criteria-flow',
              start: 'top 85%',
              once: true,
            },
          }
        );
      }

      // Animate Metric Items
      const metrics = gsap.utils.toArray('.arch-metric-item');
      if (metrics.length > 0) {
        gsap.fromTo(
          metrics,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.12,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: '.arch-editorial-metrics-strip',
              start: 'top 88%',
              once: true,
            },
          }
        );
      }
    }, philosophyRef);

    return () => ctx.revert();
  }, []);

  const faqMetaList = getCategoryFaqMeta(data.category);
  const currentMeta =
    faqMetaList[activeFaqIndex >= 0 ? activeFaqIndex : 0] || faqMetaList[0];

  const serviceNavItems = [
    { name: 'Residential Interior Design', path: '/services/residential-interior-design' },
    { name: 'Commercial Interior Design', path: '/services/commercial-interior-design' },
    { name: 'Corporate Interior Design', path: '/services/corporate-interior-design' },
    { name: 'Modular Kitchen Planning', path: '/services/residential-interior-design#kitchen' },
    { name: 'Wardrobe & Storage Solutions', path: '/services/residential-interior-design#wardrobe' },
    { name: 'Living & Social Sanctuaries', path: '/services/residential-interior-design#living' },
    { name: 'Turnkey Civil & Execution', path: '/services/residential-interior-design#turnkey' },
  ];

  const guidanceTopics = [
    { icon: '🏠', title: 'Living & dining spatial flow & entertainment walls' },
    { icon: '🍳', title: 'Ergonomic modular kitchen planning & pantries' },
    { icon: '🛏️', title: 'Restful master bedroom suites & acoustic serenity' },
    { icon: '🚪', title: 'Custom floor-to-ceiling walk-in wardrobes' },
    { icon: '💡', title: 'Architectural cove lighting & false ceiling design' },
    { icon: '🎨', title: 'Tactile veneers, natural stone & finish palettes' },
    { icon: '📐', title: 'Space-saving solutions for compact apartments' },
    { icon: '🔨', title: 'Turnkey civil execution & single-point handover' },
  ];

  const challengeTriggers = [
    { icon: '📦', title: 'Difficulty planning wardrobe storage or feeling cluttered' },
    { icon: '☀️', title: 'Dark rooms, poor airflow or awkward pillar placements' },
    { icon: '📋', title: 'Uncertainty about carpentry budgets & cost escalations' },
    { icon: '🛡️', title: 'Concerns about plywood swelling, moisture or termites' },
    { icon: '🔌', title: 'Confusion around electrical switches & plumbing positions' },
    { icon: '🎨', title: 'Worry that different rooms won’t match or feel cohesive' },
  ];

  // Turnkey Guarantees
  const studioGuarantees = [
    {
      icon: '01',
      title: 'Fixed-Price Contract Guarantee',
      desc: 'Itemized Bill of Quantities (BOQ) with guaranteed zero mid-project price escalation or hidden material markups.'
    },
    {
      icon: '02',
      title: 'Guaranteed On-Time Handover',
      desc: 'Committed handover date backed by milestone-driven project management and weekly photographic site reporting.'
    },
    {
      icon: '03',
      title: '10-Year Joinery & Hardware Warranty',
      desc: 'Comprehensive structural warranty on all factory-fabricated modular cabinetry, soft-close hinges, and runners.'
    },
    {
      icon: '04',
      title: 'Direct Architect Site Supervision',
      desc: 'Single point of contact: our senior interior architects personally inspect civil, electrical, and finishing work.'
    }
  ];

  // SEO Schemas
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: typeof window !== 'undefined' ? window.location.origin : 'https://mitijeninteriors.com'
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Services',
        item: `${typeof window !== 'undefined' ? window.location.origin : 'https://mitijeninteriors.com'}/#services`
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: `${data.category} Interior Design`,
        item: `${typeof window !== 'undefined' ? window.location.origin : 'https://mitijeninteriors.com'}${data.seo.canonical}`
      }
    ]
  };

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: data.seo.h1,
    description: data.seo.description,
    provider: {
      '@type': 'Organization',
      name: 'Mitjen Interiors',
      url: typeof window !== 'undefined' ? window.location.origin : 'https://mitijeninteriors.com'
    },
    serviceType: `${data.category} Interior Architecture & Design`,
    url: `${typeof window !== 'undefined' ? window.location.origin : 'https://mitijeninteriors.com'}${data.seo.canonical}`
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: data.faqsSection.faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer
      }
    }))
  };

  return (
    <article className="arch-service-page" itemScope itemType="https://schema.org/ItemPage">
      <SEO
        title={data.seo.title}
        description={data.seo.description}
        canonical={data.seo.canonical}
        ogImage={data.seo.ogImage}
        schema={[breadcrumbSchema, serviceSchema, faqSchema]}
      />

      {/* ====================================================================
          1. ARCHITECTURAL EDITORIAL HERO
          ==================================================================== */}
      <section className="arch-serv-hero" aria-label={`${data.category} Interior Architecture Header`}>
        <div className="arch-serv-hero-bg">
          <img
            src={data.hero.bgImage}
            alt={`${data.category} Interior Design — Mitjen Interiors`}
            loading="eager"
            fetchPriority="high"
          />
          <div className="arch-serv-hero-scrim" />
        </div>

        <div className="arch-serv-hero-inner reveal-fade-up">
          <div className="arch-serv-hero-top">
            <span className="arch-serv-pill badge-float">
              <span className="arch-serv-pill-dot" />
              <span>MITJEN INTERIORS · {data.category.toUpperCase()} PRACTICE</span>
            </span>

            <Breadcrumbs
              items={[
                { label: 'Home', path: '/' },
                { label: 'Services', path: '/services' },
                { label: `${data.category} Interior Architecture` }
              ]}
            />
          </div>

          <h1 className="arch-serv-hero-title">
            {data.category === 'Residential'
              ? 'RESIDENTIAL INTERIOR ARCHITECTURE & BESPOKE LIVING SANCTUARIES'
              : data.category === 'Commercial'
              ? 'COMMERCIAL INTERIOR ARCHITECTURE & EXPERIENTIAL BRAND SPACES'
              : 'CORPORATE INTERIOR ARCHITECTURE & HIGH-PERFORMANCE WORKSPACES'}
          </h1>
        </div>
      </section>

      {/* ====================================================================
          2. TWO-COLUMN DITTO SPREAD: Left Nav Sidebar + Right Main Content
          ==================================================================== */}
      <div className="arch-page-container clinic-layout-container">
        <div className="arch-page-grid clinic-grid">

          {/* ==================================================================
              LEFT COLUMN: Services Navigation Stack + Sticky Consultation Box
              ================================================================== */}
          <aside className="clinic-sidebar" aria-label="Services Navigation and Advisory">
            <div className="clinic-sticky-sidebar reveal-slide-left">
              {/* Vertical Services Navigation Stack */}
              <nav className="clinic-services-nav" aria-label="Our Interior Practices">
                {serviceNavItems.map((item) => {
                  const isActive =
                    location.pathname === item.path ||
                    (item.path.startsWith('/services/residential') && location.pathname.includes('residential') && !location.hash);
                  return (
                    <Link
                      key={item.name}
                      to={item.path}
                      className={`clinic-nav-card ${isActive ? 'is-active' : ''}`}
                    >
                      <span className="clinic-nav-text">{item.name}</span>
                      <span className="clinic-nav-arrow" aria-hidden="true">›</span>
                    </Link>
                  );
                })}
              </nav>

              {/* Consultation Card */}
              <div className="clinic-inquiry-box hover-lift">
                <div className="clinic-inquiry-badge">
                  <span className="clinic-inquiry-dot" />
                  <span>DIRECT STUDIO ADVISORY</span>
                </div>

                <h3 className="clinic-inquiry-title">
                  Commission Your Interior Transformation
                </h3>

                <p className="clinic-inquiry-text">
                  Meet directly with our senior interior architects. We analyze your floor plan, evaluate daylighting paths, and provide transparent budgetary projections.
                </p>

                <div className="clinic-inquiry-phone-wrap">
                  <span className="clinic-phone-label">STUDIO DIRECT LINE</span>
                  <a href="tel:+919444328555" className="clinic-phone-link">
                    +91 94443 28555
                  </a>
                </div>

                <button
                  type="button"
                  onClick={() => openInquiry(`${data.category} — Private Consultation`)}
                  className="clinic-inquiry-submit-btn hover-lift"
                >
                  Book Private Consultation
                </button>

                <div className="clinic-inquiry-meta">
                  <span>In-person studio visit in Krishnagiri</span>
                  <span>·</span>
                  <span>Virtual 3D consultation available</span>
                </div>
              </div>

              {/* Studio Guarantees */}
              <div className="arch-guarantees-card reveal-fade-up" data-delay="150">
                <h4 className="arch-guar-heading">THE MITJEN INTERIORS PROMISE</h4>
                <div className="arch-guar-list">
                  {studioGuarantees.map((g) => (
                    <div key={g.icon} className="arch-guar-item hover-lift">
                      <span className="arch-guar-num">{g.icon}</span>
                      <div className="arch-guar-content">
                        <h5 className="arch-guar-title">{g.title}</h5>
                        <p className="arch-guar-desc">{g.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          {/* ==================================================================
              RIGHT COLUMN: Exact Content Rhythm
              ================================================================== */}
          <main className="clinic-main-content">
            {/* Mobile Practice Quick Switcher */}
            <div className="clinic-mobile-nav-bar" aria-label="Quick Practice Selector">
              <span className="clinic-mobile-nav-label">DISCIPLINE:</span>
              <div className="clinic-mobile-nav-scroll">
                {serviceNavItems.slice(0, 3).map((item) => {
                  const isActive = location.pathname === item.path;
                  return (
                    <Link
                      key={item.name}
                      to={item.path}
                      className={`clinic-mobile-nav-chip ${isActive ? 'is-active' : ''}`}
                    >
                      {item.name.replace(' Interior Design', '')}
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* Top Large Feature Image */}
            <div className="clinic-lead-media reveal-scale img-zoom-hover">
              <img
                src={data.hero.bgImage}
                alt={`${data.category} Interior Design — Mitjen Interiors`}
                loading="eager"
              />
            </div>

            {/* Section 1: Overview & Intro */}
            <section className="clinic-content-section reveal-fade-up">
              <h2 className="clinic-section-title">
                <span className="clinic-dash">—</span> {data.overview.title}
              </h2>

              <p className="clinic-lead-text">
                {data.overview.leadParagraph}
              </p>

              <div className="clinic-body-text">
                {data.overview.bodyParagraphs.map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>

              {/* Callout Box with Left Accent Border */}
              <div className="clinic-callout-box reveal-fade-up hover-lift">
                <h3 className="clinic-callout-title">
                  Planning your home interiors or taking handover of a new property?
                </h3>
                <p className="clinic-callout-desc">
                  Get personalized design guidance based on your floor plan, daylighting path, and lifestyle routines.
                </p>
                <div className="clinic-callout-actions">
                  <button type="button" onClick={() => openInquiry(`${data.category} — Plan Consultation`)} className="clinic-btn-primary hover-lift">
                    Book a Design Consultation
                  </button>
                  <a href="tel:+919444328555" className="clinic-btn-outline">
                    Call Studio Directly
                  </a>
                </div>
              </div>
            </section>

            {/* Section 2: What Can It Help With? */}
            <section className="clinic-content-section reveal-fade-up">
              <h2 className="clinic-section-title">
                <span className="clinic-dash">—</span> {data.category} Interior Design: What Can It Help With?
              </h2>

              <p className="clinic-body-intro">
                Professional interior architecture helps homeowners understand their floor plan and address layout, storage, and lighting before execution begins.
              </p>

              <div className="clinic-guidance-box">
                <h4 className="clinic-guidance-heading">
                  Residential interior design may include guidance related to:
                </h4>
                <div className="clinic-pill-grid">
                  {guidanceTopics.map((g, idx) => (
                    <div key={idx} className="clinic-pill-card hover-lift">
                      <span className="clinic-pill-icon">{g.icon}</span>
                      <span className="clinic-pill-text">{g.title}</span>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Section 3: When Should You Seek Support? */}
            <section className="clinic-content-section reveal-fade-up">
              <h2 className="clinic-section-title">
                <span className="clinic-dash">—</span> {data.category} Interior Challenges That Need Professional Guidance
              </h2>

              <p className="clinic-body-intro">
                Every home has unique structural parameters. Rather than risking carpenter guesswork, unexpected cost spikes, or poor material choices, an architectural consultation addresses these concerns early.
              </p>

              <div className="clinic-guidance-box">
                <h4 className="clinic-guidance-heading">
                  You may consider seeking interior design support if you have:
                </h4>
                <div className="clinic-pill-grid">
                  {challengeTriggers.map((c, idx) => (
                    <div key={idx} className="clinic-pill-card hover-lift">
                      <span className="clinic-pill-icon">{c.icon}</span>
                      <span className="clinic-pill-text">{c.title}</span>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Section 4: What Does Support Include? */}
            <section id="deliverables" className="clinic-content-section reveal-fade-up">
              <h2 className="clinic-section-title">
                <span className="clinic-dash">—</span> What Does Our {data.category} Interior Design Include?
              </h2>

              <p className="clinic-body-intro">
                Comprehensive turnkey services planned around your exact living spaces:
              </p>

              <div className="clinic-scope-list">
                {data.servicesSection.cards.map((card) => {
                  const anchorId = card.id.replace(/^(res|com|corp)-/, '');
                  return (
                    <div key={card.id} id={anchorId} className="clinic-scope-item hover-lift">
                      <h3 className="clinic-scope-heading">{card.title}</h3>
                      <p className="clinic-scope-text">{card.description}</p>
                      <ul className="clinic-feature-bullets">
                        {card.features.map((feat, fIdx) => (
                          <li key={fIdx}>
                            <span className="clinic-bullet-check">✓</span>
                            <span>{feat}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  );
                })}
              </div>
            </section>

            {/* Section 5: Editorial Architectural Philosophy & Spatial Standards
                (Replaced 4-stage process cards with pure editorial typography and kinetic text animations) */}
            <section id="philosophy" className="arch-editorial-section" ref={philosophyRef}>
              <div className="arch-editorial-kicker-wrap">
                <span className="arch-editorial-kicker-line" />
                <span className="arch-editorial-kicker">
                  MITJEN ARCHITECTURAL ETHOS · {data.category.toUpperCase()} PRACTICE
                </span>
              </div>

              <h2 className="arch-editorial-heading">
                {data.considerationsSection?.subtitle ||
                  'We do not decorate rooms. We sculpt volumes of light, proportion, and enduring materiality.'}
              </h2>

              <div className="arch-editorial-gold-rule" />

              <div className="arch-editorial-prose-grid">
                <div className="arch-editorial-col">
                  <h3 className="arch-editorial-col-title">
                    Spatial Circulation & Solar Alignment
                  </h3>
                  <p className="arch-editorial-col-text">
                    Architecture begins where visual noise ends. Every interior plan is orchestrated around Krishnagiri's natural solar path—aligning active daylight with daily living while shielding delicate spaces from harsh thermal gain. We calculate generous sightlines across adjacent zones to eliminate awkward pinch points and ensure seamless flow.
                  </p>
                </div>

                <div className="arch-editorial-col">
                  <h3 className="arch-editorial-col-title">
                    Zero-Tolerance Materiality & Joinery
                  </h3>
                  <p className="arch-editorial-col-text">
                    We categorically reject hollow particle boards and paper laminates. Our studio specifies exclusively calibrated boiling-water-proof (BWP 710) Gurjan-core marine plywood, soft-close German concealed hardware (Blum & Häfele), and hand-finished natural stone slabs. Every cabinet edge is finished with waterproof PUR polymer bonding engineered for decades of daily touch.
                  </p>
                </div>
              </div>

              {/* Typographic Criteria Flow — NO CARDS, pure editorial typography */}
              <div className="arch-editorial-criteria-flow">
                {(data.considerationsSection?.items || []).slice(0, 4).map((item, idx) => (
                  <div key={item.title} className="arch-criteria-entry">
                    <span className="arch-criteria-roman">
                      {['01', '02', '03', '04'][idx] || `0${idx + 1}`}
                    </span>
                    <div className="arch-criteria-body">
                      <div className="arch-criteria-header">
                        <h4 className="arch-criteria-title">{item.title}</h4>
                        <span className="arch-criteria-sub">{item.subtitle}</span>
                      </div>
                      <p className="arch-criteria-desc">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Minimalist Borderless Metrics Strip — Zero cards, clean editorial typography */}
              <div className="arch-editorial-metrics-strip">
                <div className="arch-metric-item">
                  <span className="arch-metric-number">0.02<span className="arch-metric-unit">mm</span></span>
                  <span className="arch-metric-label">CNC Millwork Precision</span>
                  <span className="arch-metric-sub">Factory-calibrated joinery</span>
                </div>
                <div className="arch-metric-item">
                  <span className="arch-metric-number">100<span className="arch-metric-unit">%</span></span>
                  <span className="arch-metric-label">BWP 710 Marine Ply</span>
                  <span className="arch-metric-sub">Zero-cavity Gurjan core</span>
                </div>
                <div className="arch-metric-item">
                  <span className="arch-metric-number">10<span className="arch-metric-unit">Yr</span></span>
                  <span className="arch-metric-label">Structural Hardware</span>
                  <span className="arch-metric-sub">German motion warranty</span>
                </div>
                <div className="arch-metric-item">
                  <span className="arch-metric-number">0.0<span className="arch-metric-unit">%</span></span>
                  <span className="arch-metric-label">Mid-Project Escalation</span>
                  <span className="arch-metric-sub">Fixed transparent BOQ</span>
                </div>
              </div>
            </section>

          </main>

        </div>
      </div>

      {/* Injected Section Slot (e.g. How It Works) */}
      {children}

      {/* ====================================================================
          3. FULL-WIDTH LUXURY FAQ SECTION (MATCHING HOMEPAGE DESIGN)
          ==================================================================== */}
      <section className="faq-section" id="faq" aria-label="Frequently Asked Questions">
        <div className="faq-container">
          {/* Left Column: Sticky Atmospheric Photo Preview */}
          <div className="faq-left reveal-scale">
            <div className="faq-img-wrap img-zoom-hover">
              {data.faqsSection.faqs.map((faq, idx) => {
                const meta = faqMetaList[idx] || faqMetaList[0];
                return (
                  <img
                    key={idx}
                    src={meta.image}
                    alt={faq.question}
                    className={`faq-img ${activeFaqIndex === idx ? 'is-active' : ''}`}
                    loading="lazy"
                  />
                );
              })}
              <div className="faq-img-badge badge-float">
                <span className="faq-badge-dot" />
                <span>{currentMeta.badge}</span>
              </div>
            </div>
            <p className="faq-left-note">
              Every {data.category.toLowerCase()} architectural commission is guided by absolute transparency, uncompromising materiality, and dedicated site leadership.
            </p>
          </div>

          {/* Right Column: Header & Interactive Accordion */}
          <div className="faq-right">
            <div className="faq-header-block reveal-fade-up">
              <span className="faq-kicker">
                {data.faqsSection.sectionTag || `${data.category.toUpperCase()} GUIDANCE & FAQS`}
              </span>
              <h2 className="faq-headline">
                {data.faqsSection.subtitle || `Answers to common questions regarding our ${data.category.toLowerCase()} interior design services, processes, and project requirements.`}
              </h2>
            </div>

            <div className="faq-accordion reveal-fade-up" role="region" aria-label="FAQ Accordion">
              {data.faqsSection.faqs.map((faq, idx) => {
                const isActive = activeFaqIndex === idx;
                const { summary, desc } = parseFaqAnswer(faq.answer);
                const numStr = String(idx + 1).padStart(2, '0');

                return (
                  <div
                    key={idx}
                    className={`faq-item ${isActive ? 'is-active' : ''}`}
                    onClick={() => toggleFaq(idx)}
                  >
                    <button
                      type="button"
                      className="faq-header"
                      aria-expanded={isActive}
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleFaq(idx);
                      }}
                    >
                      <div className="faq-header-left">
                        <span className="faq-num">{numStr}</span>
                        <span className="faq-title">{faq.question}</span>
                      </div>

                      <span className="faq-icon-wrap" aria-hidden="true">
                        <svg
                          className="faq-svg"
                          width="13"
                          height="13"
                          viewBox="0 0 14 14"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.8"
                        >
                          <line x1="7" y1="1" x2="7" y2="13" />
                          <line x1="1" y1="7" x2="13" y2="7" />
                        </svg>
                      </span>
                    </button>

                    <div className={`faq-collapse ${isActive ? 'is-open' : ''}`}>
                      <div className="faq-collapse-inner">
                        <div className="faq-body">
                          {summary && <p className="faq-summary">{summary}</p>}
                          <p className="faq-desc">{desc}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Bottom CTA Row */}
            <div className="faq-cta-row reveal-fade-up" data-delay="200">
              <span className="faq-cta-text">
                Have a specific {data.category.toLowerCase()} spatial requirement or architectural brief?
              </span>
              <button
                type="button"
                className="faq-cta-btn hover-lift"
                onClick={() => openInquiry(`${data.category} Interiors — FAQ Consultation Request`)}
              >
                <span>Book Private Consultation</span>
                <span aria-hidden="true">→</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================================
          4. BOTTOM CALLOUT BANNER
          ==================================================================== */}
      <section className="service-bottom-banner-section">
        <div className="arch-page-container">
          <div className="clinic-bottom-cta reveal-fade-up">
            <h3 className="clinic-bottom-title">
              Ready to Commission Your Interior Transformation?
            </h3>
            <p className="clinic-bottom-desc">
              Meet directly with our senior interior architects in Krishnagiri or book a virtual 3D design consultation.
            </p>
            <div className="clinic-callout-actions">
              <button
                type="button"
                onClick={() => openInquiry(`${data.category} — Schedule Consultation`)}
                className="clinic-btn-primary hover-lift"
              >
                Schedule Consultation
              </button>
              <a href="tel:+919444328555" className="clinic-btn-outline">
                Call +91 94443 28555
              </a>
            </div>
          </div>
        </div>
      </section>
    </article>
  );
};

export default ServicePageTemplate;
