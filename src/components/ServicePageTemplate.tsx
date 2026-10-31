import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import type { ServicePageData } from '../data/servicesData';
import { SEO } from './common/SEO';
import { Breadcrumbs } from './common/Breadcrumbs';
import { useInquiry } from '../context/useInquiry';
import '../styles/ServicePage.css';
import '../styles/FaqSection.css';

interface ServicePageTemplateProps {
  data: ServicePageData;
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

export const ServicePageTemplate: React.FC<ServicePageTemplateProps> = ({ data }) => {
  const { openInquiry } = useInquiry();
  const location = useLocation();

  // Accordion state for FAQs (first item open by default, single-selection with smooth image cross-fade like homepage)
  const [activeFaqIndex, setActiveFaqIndex] = useState<number>(0);

  const toggleFaq = (idx: number) => {
    setActiveFaqIndex((prev) => (prev === idx ? -1 : idx));
  };

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
                <span className="clinic-dash">—</span> Residential Interior Design in Krishnagiri: What Can It Help With?
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
                <span className="clinic-dash">—</span> Home Interior Challenges That Need Professional Guidance
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
                <span className="clinic-dash">—</span> What Does Our Residential Interior Design Include?
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

            {/* Section 5: Step-by-Step 4-Stage Process */}
            <section id="turnkey" className="clinic-content-section reveal-fade-up">
              <h2 className="clinic-section-title">
                <span className="clinic-dash">—</span> Our Step-by-Step 4-Stage Process
              </h2>

              <p className="clinic-body-intro">
                A structured, predictable journey that turns your initial ideas into an impeccably completed home:
              </p>

              <div className="clinic-process-grid">
                {data.processSection.steps.map((st) => (
                  <div key={st.step} className="clinic-process-card hover-lift">
                    <span className="clinic-process-badge">{st.step}</span>
                    <h3 className="clinic-process-title">{st.title}</h3>
                    <p className="clinic-process-desc">{st.description}</p>
                    <div className="clinic-process-deliv">
                      <strong>Deliverable:</strong> {st.deliverables}
                    </div>
                  </div>
                ))}
              </div>
            </section>

          </main>

        </div>
      </div>

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
            <div className="reveal-fade-up">
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
