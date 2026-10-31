import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import type { ServicePageData } from '../data/servicesData';
import { SEO } from './common/SEO';
import { Breadcrumbs } from './common/Breadcrumbs';
import { useInquiry } from '../context/useInquiry';
import '../styles/ServicePage.css';

interface ServicePageTemplateProps {
  data: ServicePageData;
}

export const ServicePageTemplate: React.FC<ServicePageTemplateProps> = ({ data }) => {
  const { openInquiry } = useInquiry();
  const location = useLocation();

  // Accordion state for FAQs (first item open by default)
  const [openFaqIndexes, setOpenFaqIndexes] = useState<number[]>([0]);

  const toggleFaq = (index: number) => {
    setOpenFaqIndexes((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

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

            {/* Section 6: Frequently Asked Questions */}
            <section className="clinic-content-section reveal-fade-up">
              <h2 className="clinic-section-title">
                <span className="clinic-dash">—</span> Frequently Asked Questions
              </h2>

              <div className="clinic-faq-accordion">
                {data.faqsSection.faqs.map((faq, idx) => {
                  const isOpen = openFaqIndexes.includes(idx);
                  return (
                    <div key={idx} className={`clinic-faq-row ${isOpen ? 'is-open' : ''}`}>
                      <button
                        type="button"
                        className="clinic-faq-btn"
                        onClick={() => toggleFaq(idx)}
                        aria-expanded={isOpen}
                      >
                        <span className="clinic-faq-question">{faq.question}</span>
                        <span className="clinic-faq-icon" aria-hidden="true">
                          {isOpen ? '—' : '+'}
                        </span>
                      </button>
                      {isOpen && (
                        <div className="clinic-faq-answer">
                          <p>{faq.answer}</p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </section>

            {/* Section 7: Bottom Callout Banner */}
            <div className="clinic-bottom-cta reveal-fade-up">
              <h3 className="clinic-bottom-title">
                Ready to Commission Your Interior Transformation?
              </h3>
              <p className="clinic-bottom-desc">
                Meet directly with our senior interior architects in Krishnagiri or book a virtual 3D design consultation.
              </p>
              <div className="clinic-callout-actions">
                <button type="button" onClick={() => openInquiry(`${data.category} — Schedule Consultation`)} className="clinic-btn-primary hover-lift">
                  Schedule Consultation
                </button>
                <a href="tel:+919444328555" className="clinic-btn-outline">
                  Call +91 94443 28555
                </a>
              </div>
            </div>

          </main>

        </div>
      </div>
    </article>
  );
};

export default ServicePageTemplate;
