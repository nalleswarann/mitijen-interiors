import React, { useState, useEffect, useRef, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { InquiryContext } from '../context/InquiryContextInstance';
import { HowItWorksSection } from './HowItWorksSection';
import '../styles/ServiceDetailPage.css';

/* ==========================================================================
   DATA TYPES & INTERFACES
   ========================================================================== */

export interface ServiceDetailFeature {
  title: string;
  description: string;
  /** Circular feature image URL (Unsplash placeholder) */
  image: string;
  imageAlt?: string;
}

export interface ServiceDetailStep {
  /** Two-digit numbered string (e.g., '01') */
  number: string;
  title: string;
  description: string;
}

export interface ServiceDetailStat {
  /** Metric value (e.g. '120+') */
  value: string;
  /** Metric label (e.g. 'Private Residences') */
  label: string;
}

export interface ServiceDetailMaterial {
  tag: string;
  title: string;
  description: string;
  spec: string;
  image: string;
  imageAlt?: string;
}

export interface ServiceDetailSpace {
  title: string;
  tag: string;
  subtitle: string;
  description: string;
  highlights: string[];
  spec: string;
  image: string;
  imageAlt?: string;
}

export interface ServiceDetailFaq {
  question: string;
  answer: string;
}

export interface ServiceDetailData {
  /** Unique slug matching sidebar links (e.g., 'residential-interior-design') */
  slug: string;
  /** Hero title (e.g., 'Residential Interior Design') */
  title: string;
  /** Breadcrumb current label (falls back to title) */
  breadcrumbCurrent?: string;
  /** Hero banner background photo */
  heroImage: string;
  heroImageAlt?: string;

  /* 5a. Intro & Feature Rows */
  introHeading: string;
  introParagraph: string;
  features: ServiceDetailFeature[];

  /* 5b. Mid Rounded Image (aspect 16/7) */
  midImage: string;
  midImageAlt?: string;

  /* 5c. Steps */
  stepsHeading: string;
  stepsIntro: string;
  steps: ServiceDetailStep[];

  /* 5d. Proof Row (Stats between hairline borders) */
  stats: ServiceDetailStat[];

  /* 5e. Who We Design For */
  targetHeading: string;
  targetImage: string;
  targetImageAlt?: string;
  targetPills: string[];
  /** Optional video URL — play button only renders if this is provided */
  videoUrl?: string;

  /* Creative Section 1: Craft & Materiality Palette */
  materialsHeading?: string;
  materialsIntro?: string;
  materials?: ServiceDetailMaterial[];

  /* Creative Section 2: Room-by-Room Design Excellence */
  spacesHeading?: string;
  spacesIntro?: string;
  spaces?: ServiceDetailSpace[];

  /* 5f. FAQ */
  faqHeading?: string;
  faqs: ServiceDetailFaq[];
}

export interface ServiceLinkItem {
  name: string;
  slug: string;
  href: string;
}

export interface ServiceDetailPageProps {
  /** Custom service detail data (defaults to Residential Interior Design) */
  data?: Partial<ServiceDetailData>;
  /** Custom sidebar service links (defaults to Mitijen core services) */
  services?: ServiceLinkItem[];
  /** Custom consultation booking handler (falls back to site Inquiry modal or /contact) */
  onBook?: () => void;
}

/* ==========================================================================
   DEFAULT SIDEBAR SERVICES & RESIDENTIAL CONTENT
   ========================================================================== */

export const DEFAULT_SIDEBAR_SERVICES: ServiceLinkItem[] = [
  {
    name: 'Corporate Interior Design',
    slug: 'corporate-interior-design',
    href: '/services/corporate-interior-design',
  },
  {
    name: 'Residential Interior Design',
    slug: 'residential-interior-design',
    href: '/services/residential-interior-design',
  },
  {
    name: 'Commercial Interior Design',
    slug: 'commercial-interior-design',
    href: '/services/commercial-interior-design',
  },
];

export const DEFAULT_RESIDENTIAL_DATA: ServiceDetailData = {
  slug: 'residential-interior-design',
  title: 'Residential Interior Design',
  breadcrumbCurrent: 'Residential Interior Design',

  /* Placeholder Unsplash Hero: Luxury warm architectural living room */
  heroImage: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1920&q=80',
  heroImageAlt: 'Luxury warm residential living room with architectural joinery and daylight',

  introHeading: 'Homes Designed Around the Way You Live',
  introParagraph:
    'Every home we design is a bespoke sanctuary tailored to your family rituals, architectural proportions, and personal aesthetic. We balance quiet luxury with functional daily ease, orchestrating every millimetre from initial layout planning to precision joinery and white-glove turnkey installation.',

  features: [
    {
      title: 'Bespoke Joinery From Our Own Factory',
      description:
        'Custom cabinetry, fluted paneling, and walk-in wardrobes fabricated in our in-house facility with zero-cavity marine ply and premium European hardware.',
      /* Placeholder Unsplash Feature 1: Cabinetry / kitchen millwork detail */
      image: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=300&q=80',
      imageAlt: 'Bespoke architectural cabinetry detail fabricated by Mitijen Interiors',
    },
    {
      title: 'Senior Architects On Every Project',
      description:
        'Direct principal architect leadership on your residence ensuring spatial harmony, natural daylight orchestration, and meticulous site supervision.',
      /* Placeholder Unsplash Feature 2: Architectural plan drawing & precision review */
      image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=300&q=80',
      imageAlt: 'Senior architect reviewing residential spatial layout plans',
    },
  ],

  /* Placeholder Unsplash Mid Image: Minimalist open-plan dining and living space (aspect 16/7) */
  midImage: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1600&q=80',
  midImageAlt: 'Serene open-plan residential living and dining space with natural light',

  stepsHeading: 'How We Design Your Home',
  stepsIntro:
    'Our structured 3-stage delivery framework eliminates guesswork, guarantees timeline certainty, and ensures a seamless experience from concept to move-in.',

  steps: [
    {
      number: '01',
      title: 'Consultation',
      description:
        'We evaluate your site, understand lifestyle rituals, align on architectural vision, and establish transparent budget parameters.',
    },
    {
      number: '02',
      title: 'Design Review',
      description:
        'Photorealistic 3D renders, tactile physical material boards, and detailed MEP layouts reviewed collaboratively before building.',
    },
    {
      number: '03',
      title: 'Turnkey Build',
      description:
        'Precision off-site fabrication, dedicated site management, locked BOQ pricing, and pristine defect-free handover.',
    },
  ],

  /* Proof row: exactly 120+ Private Residences, 15+ Design Awards, 100% Bespoke Craftsmanship */
  stats: [
    { value: '120+', label: 'Private Residences' },
    { value: '15+', label: 'Design Awards' },
    { value: '100%', label: 'Bespoke Craftsmanship' },
  ],

  targetHeading: 'Who We Design For',
  /* Placeholder Unsplash Target Image: Contemporary luxury villa living space */
  targetImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=80',
  targetImageAlt: 'Contemporary architectural villa interior overlooking gardens',
  targetPills: [
    'New Home Owners',
    'Villa & Apartment Renovations',
    'Families Upgrading Spaces',
  ],
  videoUrl: undefined, // Set to a URL string if video play button is desired

  /* Creative Section 1: Craft & Materiality Palette */
  materialsHeading: 'Tactile Materiality & Factory Craftsmanship',
  materialsIntro:
    'Every residential interior we craft is defined by honest, enduring materials. We marry computer-calibrated CNC woodwork with hand-mitred Italian marble, acoustic reeded glass, and museum-grade architectural lighting.',
  materials: [
    {
      tag: 'WOODWORK & MILLWORK',
      title: 'Smoked Crown-Cut Oak & American Walnut',
      description:
        'Hand-curated European white oak and American walnut veneers, moisture-sealed with German low-VOC matte polyurethane coatings for rich architectural warmth.',
      spec: 'Gurjan BWP 710 Core · 0.02mm CNC Tolerance',
      image:
        'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=800&q=80',
    },
    {
      tag: 'MASONRY & SURFACES',
      title: 'Book-Matched Marble & Honed Travertine',
      description:
        'Precision-cut Italian Statuario marble, travertine, and engineered quartz fabricated with seamless 45-degree mitred waterfall apron edges.',
      spec: 'Water-Jet Mitred Edges · Stain-Proof Penetrating Sealant',
      image:
        'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80',
    },
    {
      tag: 'TRANSLUCENCY & PRIVACY',
      title: 'Acoustic Reeded Glass & Fluted Screens',
      description:
        'Architectural fluted, reeded, and acoustic laminated glass screens that softly define living, dining, and study zones while preserving continuous daylight.',
      spec: 'STC 42 Acoustic Attenuation · Toughened Safety Spec',
      image:
        'https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=800&q=80',
    },
    {
      tag: 'ATMOSPHERE & MECHANICS',
      title: 'Museum-Grade 3000K Lighting & Blum Mechanics',
      description:
        'Concealed 3000K warm-cove profiling, anti-glare recessed downlights (CRI 95+), and Austrian Blum soft-close motion hardware backed by 10-year warranties.',
      spec: 'CRI 95+ True-Color · 10-Year Motion Warranty',
      image:
        'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=800&q=80',
    },
  ],

  /* Creative Section 2: Room-by-Room Design Excellence */
  spacesHeading: 'Room-by-Room Architectural Excellence',
  spacesIntro:
    'Explore how we sculpt individual residential environments with bespoke factory millwork, intuitive ergonomics, and natural daylight choreography.',
  spaces: [
    {
      tag: 'RESIDENTIAL CUISINE',
      title: 'The Gourmet Architectural Kitchen',
      subtitle: 'Ergonomic Culinary Center with Concealed Prep Scullery',
      description:
        'An expansive culinary setting integrating seamless quartz waterfall islands, concealed walk-in butler pantry, and Blum motorized lift-up overhead cabinets engineered for effortless daily cooking rituals.',
      highlights: [
        'Continuous quartz waterfall island with integrated undermount composite sink',
        'Concealed walk-in butler pantry with dedicated spice ventilation exhaust',
        'Blum motorized Aventos lift-up cabinets & tandem soft-close organizers',
      ],
      spec: 'German PU Matte Finish · BWP 710 Marine Core Structure',
      image:
        'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1200&q=80',
    },
    {
      tag: 'PRIVATE SANCTUARY',
      title: 'The Master Bedroom Suite',
      subtitle: 'Acoustic Serenity & Walk-In Wardrobe Integration',
      description:
        'Crafted for restorative rest. Features a full-height slatted acoustic timber headboard wall, floor-to-ceiling tinted glass walk-in wardrobes with concealed sensor LED profiles, and floating bedside cantilever drawers.',
      highlights: [
        'Full-height acoustic slatted wood feature wall with 2700K ambient backlighting',
        'Floor-to-ceiling walk-in dressing wardrobe with fluted glass & sensor illumination',
        'Integrated floating cantilever dressing vanity with touch-dim backlit mirror',
      ],
      spec: 'Acoustic STC 44 · 2700K Circadian Dimmable Lighting',
      image:
        'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=1200&q=80',
    },
    {
      tag: 'FAMILY & GATHERING',
      title: 'The Double-Height Living Pavilion',
      subtitle: 'Light-Filled Social Center with Monolithic Stone Feature Wall',
      description:
        'The heart of the residence, orchestrating double-height vertical volume, natural daylighting, book-matched Italian marble TV feature wall, and bespoke concealed wire management for immersive family entertainment.',
      highlights: [
        'Book-matched Italian marble media wall with concealed equipment credenza',
        'Bespoke brass and smoked timber display niches with precision LED reveal details',
        'Motorized architectural acoustic drapery integrated into ceiling recessed pockets',
      ],
      spec: 'Natural Statuario Marble · Laser-Aligned CNC Millwork',
      image:
        'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80',
    },
  ],

  faqHeading: 'Frequently Asked Questions',
  /* Required FAQ content matching exact prompt specifications */
  faqs: [
    {
      question: 'What is included in your residential interior design service?',
      answer:
        'Our full-scope residential service covers end-to-end design and execution: spatial planning, photorealistic 3D visualizations, structural civil coordination, custom factory-built joinery, modular wardrobe and kitchen systems, lighting schemes, curated loose furniture, and turnkey site supervision through defect-free handover.',
    },
    {
      question: 'How much input do we have during the design phase?',
      answer:
        'You maintain complete creative control at every milestone without the coordination burden. We guide you through iterative spatial layouts, interactive 3D model reviews, and tactile physical material boards (veneers, stones, fabrics, hardware) to finalize every detail before any on-site work begins.',
    },
    {
      question: 'What materials do you use for residential cabinetry and wardrobes?',
      answer:
        'All custom millwork is crafted in our proprietary manufacturing facility using zero-cavity Gurjan BWP (Boiling Water Proof) marine-grade ply, certified natural wood veneers, anti-fingerprint European acrylics/laminates, and concealed Blum and Hettich soft-close motion hardware backed by 10-year warranties.',
    },
    {
      question: 'How do you prevent budget overruns during home renovations?',
      answer:
        'We enforce absolute cost predictability by locking in a transparent, itemized Bill of Quantities (BOQ) before site mobilization. Every material code, hardware brand, finish, and square footage is priced up-front with zero mid-project escalations or hidden contractor fees.',
    },
    {
      question: 'How long does a full home interior project typically take?',
      answer:
        'A complete residential transformation typically requires 9 to 15 weeks: 1 to 2 weeks for spatial discovery and programming, 2 to 3 weeks for 3D engineering and client sign-offs, and 6 to 10 weeks for off-site factory joinery fabrication, civil execution, and white-glove styling.',
    },
  ],
};

/* ==========================================================================
   COMPONENT IMPLEMENTATION
   ========================================================================== */

export const ServiceDetailPage: React.FC<ServiceDetailPageProps> = ({
  data,
  services,
  onBook,
}) => {
  const navigate = useNavigate();
  const inquiry = useContext(InquiryContext);

  // Merge provided data with defaults
  const resolvedData: ServiceDetailData = {
    ...DEFAULT_RESIDENTIAL_DATA,
    ...data,
    features: data?.features ?? DEFAULT_RESIDENTIAL_DATA.features,
    steps: data?.steps ?? DEFAULT_RESIDENTIAL_DATA.steps,
    stats: data?.stats ?? DEFAULT_RESIDENTIAL_DATA.stats,
    targetPills: data?.targetPills ?? DEFAULT_RESIDENTIAL_DATA.targetPills,
    materials: data?.materials ?? DEFAULT_RESIDENTIAL_DATA.materials ?? [],
    spaces: data?.spaces ?? DEFAULT_RESIDENTIAL_DATA.spaces ?? [],
    faqs: data?.faqs ?? DEFAULT_RESIDENTIAL_DATA.faqs,
  };

  const resolvedServices: ServiceLinkItem[] =
    services && services.length > 0 ? services : DEFAULT_SIDEBAR_SERVICES;

  // Accordion state: only one item open at a time (first open by default)
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenFaqIndex((prev) => (prev === index ? null : index));
  };

  // Consultation booking handler
  const handleBookConsultation = () => {
    if (onBook) {
      onBook();
    } else if (inquiry?.openInquiry) {
      inquiry.openInquiry(`${resolvedData.title} Consultation`);
    } else {
      navigate('/contact');
    }
  };

  // Word-by-word scroll reveal for FAQ title
  const faqHeadingText = resolvedData.faqHeading || 'Frequently Asked Questions';
  const faqWords = faqHeadingText.split(' ');
  const headingRef = useRef<HTMLHeadingElement | null>(null);
  const [wordOpacities, setWordOpacities] = useState<number[]>(() =>
    faqWords.map(() => 0.18)
  );

  useEffect(() => {
    // Respect user's motion preferences
    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      setWordOpacities(faqWords.map(() => 1));
      return;
    }

    let rafId: number | null = null;

    const updateWordOpacities = () => {
      if (!headingRef.current) return;
      const rect = headingRef.current.getBoundingClientRect();
      const windowH = window.innerHeight || 800;

      // When the top of heading is at 88% of viewport height -> progress = 0
      // When the top reaches 45% of viewport height -> progress = 1
      const startY = windowH * 0.88;
      const endY = windowH * 0.45;
      const rawProgress = (startY - rect.top) / (startY - endY);
      const progress = Math.max(0, Math.min(1, rawProgress));

      const count = faqWords.length;
      const nextOpacities = faqWords.map((_, i) => {
        const wordStart = i / count;
        const wordEnd = (i + 1) / count;
        const wordProgress = Math.max(
          0,
          Math.min(1, (progress - wordStart) / (wordEnd - wordStart))
        );
        // Words start at 18% opacity and fade to 100%
        return 0.18 + 0.82 * wordProgress;
      });

      setWordOpacities(nextOpacities);
    };

    const onScroll = () => {
      if (rafId !== null) cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(updateWordOpacities);
    };

    updateWordOpacities();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });

    return () => {
      if (rafId !== null) cancelAnimationFrame(rafId);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [faqWords.length]);

  return (
    <div className="msd">
      {/* ====================================================================
          01 HERO BANNER
          Rounded 28px banner, full-bleed image with dark left-to-right overlay,
          large serif title bottom-left in white, and Home / Services / Current
          breadcrumb under it.
          ==================================================================== */}
      <div className="msd-container msd-hero-wrap">
        <header className="msd-hero">
          <img
            src={resolvedData.heroImage}
            alt={resolvedData.heroImageAlt || resolvedData.title}
            className="msd-hero-bg"
            loading="eager"
            fetchPriority="high"
          />
          <div className="msd-hero-overlay" aria-hidden="true" />

          <div className="msd-hero-content">
            <div className="msd-hero-badge">
              <span className="msd-hero-badge-dot" aria-hidden="true" />
              <span>Mitijen Architectural Practice · {resolvedData.slug ? resolvedData.slug.replace('-interior-design', '').toUpperCase() : 'INTERIORS'}</span>
            </div>

            <h1 className="msd-hero-title">{resolvedData.title}</h1>

            <nav aria-label="Breadcrumb" className="msd-breadcrumb">
              <ol className="msd-breadcrumb-list">
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li aria-hidden="true" className="msd-breadcrumb-sep">
                  /
                </li>
                <li>
                  <Link to="/services">Services</Link>
                </li>
                <li aria-hidden="true" className="msd-breadcrumb-sep">
                  /
                </li>
                <li aria-current="page">
                  <span className="msd-breadcrumb-current">
                    {resolvedData.breadcrumbCurrent || resolvedData.title}
                  </span>
                </li>
              </ol>
            </nav>
          </div>
        </header>
      </div>

      {/* ====================================================================
          02 TWO-COLUMN LAYOUT
          Sticky left sidebar (280 to 360px, top: 100px) and main column.
          Under 1000px: single column, content first, sidebar after (not sticky).
          ==================================================================== */}
      <div className="msd-container msd-layout">
        {/* ==================================================================
            SIDEBAR (Cards 1 & 2)
            ================================================================== */}
        <aside
          className="msd-sidebar"
          aria-label="Service Navigation & Studio Hours"
        >
          {/* Sidebar Card 1: Discover Our Services */}
          <div
            className="msd-services-card"
            role="region"
            aria-labelledby="msd-services-heading"
          >
            <h2 id="msd-services-heading" className="msd-services-card-header">
              <span>Discover Our Services</span>
            </h2>
            <ul className="msd-services-list">
              {resolvedServices.map((svc) => {
                const isActive = svc.slug === resolvedData.slug;
                return (
                  <li key={svc.slug} className="msd-services-item">
                    <Link
                      to={svc.href}
                      className={`msd-services-link ${isActive ? 'is-active' : ''}`}
                      aria-current={isActive ? 'page' : undefined}
                    >
                      <span className="msd-services-title">{svc.name}</span>
                      <span className="msd-services-arrow" aria-hidden="true">
                        ↗
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Sidebar Card 2: Studio Hours */}
          <div
            className="msd-hours-card"
            role="region"
            aria-labelledby="msd-hours-heading"
          >
            <div className="msd-hours-header">
              <div className="msd-clock-badge" aria-hidden="true">
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  width="20"
                  height="20"
                >
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
              </div>
              <h2 id="msd-hours-heading" className="msd-hours-title">
                Studio Hours
              </h2>
            </div>

            <div className="msd-hours-list">
              <div className="msd-hours-row">
                <span className="msd-hours-day">Mon to Fri</span>
                <span className="msd-hours-time">10AM – 7PM</span>
              </div>
              <div className="msd-hours-row">
                <span className="msd-hours-day">Saturday</span>
                <span className="msd-hours-time">10AM – 5PM</span>
              </div>
              <div className="msd-hours-row">
                <span className="msd-hours-day">Sunday</span>
                <span className="msd-hours-time">Site visits only</span>
              </div>
            </div>

            <button
              type="button"
              onClick={handleBookConsultation}
              className="msd-book-btn"
            >
              <span>Book a Consultation</span>
              <span aria-hidden="true">↗</span>
            </button>
          </div>
        </aside>

        {/* ==================================================================
            MAIN CONTENT COLUMN
            ================================================================== */}
        <main className="msd-main">
          {/* 5a. Intro & Two Feature Rows */}
          <section
            className="msd-intro-section"
            aria-labelledby="msd-intro-heading"
          >
            <h2 id="msd-intro-heading" className="msd-section-title">
              {resolvedData.introHeading}
            </h2>
            <p className="msd-intro-text">{resolvedData.introParagraph}</p>

            <div className="msd-features-list">
              {resolvedData.features.map((feat, index) => (
                <div key={index} className="msd-feature-row">
                  <img
                    src={feat.image}
                    alt={feat.imageAlt || feat.title}
                    className="msd-feature-circle-img"
                    loading="lazy"
                    width="100"
                    height="100"
                  />
                  <div className="msd-feature-body">
                    <h3 className="msd-feature-title">{feat.title}</h3>
                    <p className="msd-feature-desc">{feat.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* 5b. Large Rounded Image (26px radius, aspect 16/7) */}
          <div className="msd-mid-media">
            <img
              src={resolvedData.midImage}
              alt={
                resolvedData.midImageAlt ||
                `${resolvedData.title} architectural space`
              }
              className="msd-mid-img"
              loading="lazy"
            />
          </div>

          {/* 5c. Steps: "How We Design Your Home" */}
          <section
            className="msd-steps-section"
            aria-labelledby="msd-steps-heading"
          >
            <h2 id="msd-steps-heading" className="msd-section-title">
              {resolvedData.stepsHeading}
            </h2>
            <p className="msd-steps-intro">{resolvedData.stepsIntro}</p>

            <ol className="msd-steps-grid">
              {resolvedData.steps.map((step) => (
                <li key={step.number} className="msd-step-card">
                  <div className="msd-step-badge" aria-hidden="true">
                    {step.number}
                  </div>
                  <h3 className="msd-step-title">{step.title}</h3>
                  <p className="msd-step-desc">{step.description}</p>
                </li>
              ))}
            </ol>
          </section>

          {/* 5d. Proof Row (Stats between hairline borders) */}
          <div
            className="msd-proof-row"
            role="region"
            aria-label="Studio Track Record and Credentials"
          >
            {resolvedData.stats.map((stat, i) => (
              <div key={i} className="msd-stat-item">
                <span className="msd-stat-value">{stat.value}</span>
                <span className="msd-stat-label">{stat.label}</span>
              </div>
            ))}
          </div>

          {/* 5e. Who We Design For */}
          <section
            className="msd-target-section"
            aria-labelledby="msd-target-heading"
          >
            <h2 id="msd-target-heading" className="msd-section-title">
              {resolvedData.targetHeading}
            </h2>

            <div className="msd-target-media">
              <img
                src={resolvedData.targetImage}
                alt={
                  resolvedData.targetImageAlt ||
                  'Living spaces crafted for families and homeowners'
                }
                className="msd-target-img"
                loading="lazy"
              />
              <div className="msd-target-scrim" aria-hidden="true" />

              {/* Centered play button (renders only if videoUrl is provided) */}
              {resolvedData.videoUrl && (
                <button
                  type="button"
                  className="msd-play-btn"
                  aria-label="Play video showcase"
                  onClick={() => {
                    if (resolvedData.videoUrl) {
                      window.open(
                        resolvedData.videoUrl,
                        '_blank',
                        'noopener,noreferrer'
                      );
                    }
                  }}
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    width="24"
                    height="24"
                    aria-hidden="true"
                  >
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </button>
              )}

              {/* Overlaid check-pills at bottom */}
              <div className="msd-target-pills">
                {resolvedData.targetPills.map((pill, i) => (
                  <span key={i} className="msd-check-pill">
                    <span className="msd-check-badge" aria-hidden="true">
                      <svg
                        viewBox="0 0 16 16"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.4"
                        width="11"
                        height="11"
                      >
                        <path
                          d="M3 8.5l3.5 3.5 6.5-7"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                    <span>{pill}</span>
                  </span>
                ))}
              </div>
            </div>
          </section>

        </main>
      </div>

      {/* ====================================================================
          03 CREATIVE SECTION: CRAFT & MATERIALITY PALETTE
          4-column interactive grid showcasing tactile materials and precision specs
          ==================================================================== */}
      {resolvedData.materials && resolvedData.materials.length > 0 && (
        <section
          className="msd-materials-section"
          aria-labelledby="msd-materials-heading"
        >
          <div className="msd-container">
            <div className="msd-section-header-center">
              <div className="msd-section-eyebrow">
                <span className="msd-gold-line" aria-hidden="true" />
                <span>THE ARCHITECTURE OF INTERIORS</span>
                <span className="msd-gold-line" aria-hidden="true" />
              </div>
              <h2
                id="msd-materials-heading"
                className="msd-section-title-large"
              >
                {resolvedData.materialsHeading || 'Craft & Materiality Palette'}
              </h2>
              <p className="msd-section-lead-center">
                {resolvedData.materialsIntro ||
                  'Every interior we build is anchored in tactile, enduring materiality. We combine in-house CNC timber craftsmanship with natural stone, acoustic glazing, and museum-grade illumination.'}
              </p>
            </div>

            <div className="msd-materials-grid">
              {resolvedData.materials.map((mat, idx) => (
                <article key={idx} className="msd-material-card">
                  <div className="msd-material-media">
                    <img
                      src={mat.image}
                      alt={mat.imageAlt || mat.title}
                      className="msd-material-img"
                      loading="lazy"
                    />
                    <div className="msd-material-tag-pill">{mat.tag}</div>
                  </div>
                  <div className="msd-material-body">
                    <h3 className="msd-material-title">{mat.title}</h3>
                    <p className="msd-material-desc">{mat.description}</p>
                    <div className="msd-material-spec">
                      <span className="msd-spec-dot" aria-hidden="true" />
                      <span>{mat.spec}</span>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ====================================================================
          04 CREATIVE SECTION: ROOM-BY-ROOM DESIGN EXCELLENCE
          Alternating editorial showcase featuring signature interior spaces
          ==================================================================== */}
      {resolvedData.spaces && resolvedData.spaces.length > 0 && (
        <section
          className="msd-spaces-section"
          aria-labelledby="msd-spaces-heading"
        >
          <div className="msd-container">
            <div className="msd-section-header-center">
              <div className="msd-section-eyebrow">
                <span className="msd-gold-line" aria-hidden="true" />
                <span>SPATIAL MASTERY</span>
                <span className="msd-gold-line" aria-hidden="true" />
              </div>
              <h2 id="msd-spaces-heading" className="msd-section-title-large">
                {resolvedData.spacesHeading || 'Room-by-Room Design Excellence'}
              </h2>
              <p className="msd-section-lead-center">
                {resolvedData.spacesIntro ||
                  'Explore how we sculpt individual interior environments with bespoke factory millwork, intuitive ergonomics, and natural daylight choreography.'}
              </p>
            </div>

            <div className="msd-spaces-list">
              {resolvedData.spaces.map((space, idx) => {
                const isEven = idx % 2 === 1;
                return (
                  <article
                    key={idx}
                    className={`msd-space-card ${isEven ? 'is-reversed' : ''}`}
                  >
                    <div className="msd-space-media">
                      <img
                        src={space.image}
                        alt={space.imageAlt || space.title}
                        className="msd-space-img"
                        loading="lazy"
                      />
                      <div className="msd-space-tag">{space.tag}</div>
                    </div>

                    <div className="msd-space-content">
                      <span className="msd-space-kicker">
                        0{idx + 1} · {space.tag}
                      </span>
                      <h3 className="msd-space-title">{space.title}</h3>
                      <h4 className="msd-space-subtitle">{space.subtitle}</h4>
                      <p className="msd-space-desc">{space.description}</p>

                      <ul className="msd-space-highlights">
                        {space.highlights.map((item, hIdx) => (
                          <li key={hIdx} className="msd-space-highlight-item">
                            <svg
                              viewBox="0 0 20 20"
                              fill="currentColor"
                              className="msd-highlight-icon"
                              aria-hidden="true"
                            >
                              <path
                                fillRule="evenodd"
                                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                                clipRule="evenodd"
                              />
                            </svg>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>

                      <div className="msd-space-footer">
                        <span className="msd-space-spec-badge">
                          <span className="msd-spec-dot" aria-hidden="true" />
                          <span>{space.spec}</span>
                        </span>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {/* ====================================================================
          05 HOW IT WORKS SECTION (Full-Width Interactive 3-Stage Process)
          ==================================================================== */}
      <div className="msd-hiw-wrapper">
        <HowItWorksSection />
      </div>

      {/* ====================================================================
          06 FREQUENTLY ASKED QUESTIONS
          Word-by-word scroll reveal and burgundy active accordion
          ==================================================================== */}
      <section
        className="msd-faq-section-full"
        aria-labelledby="msd-faq-heading"
      >
        <div className="msd-container">
          <div className="msd-section-header-center">
            <div className="msd-section-eyebrow">
              <span className="msd-gold-line" aria-hidden="true" />
              <span>TRANSPARENCY & ASSURANCE</span>
              <span className="msd-gold-line" aria-hidden="true" />
            </div>
            <h2
              id="msd-faq-heading"
              ref={headingRef}
              className="msd-section-title-large msd-faq-title-center"
            >
              {faqWords.map((word, index) => (
                <span
                  key={index}
                  className="msd-faq-word"
                  style={{ opacity: wordOpacities[index] ?? 1 }}
                >
                  {word}{' '}
                </span>
              ))}
            </h2>
          </div>

          <div
            className="msd-faq-accordion-centered"
            role="region"
            aria-labelledby="msd-faq-heading"
          >
            {resolvedData.faqs.map((faq, index) => {
              const isOpen = openFaqIndex === index;
              const panelId = `msd-faq-panel-${index}`;
              const triggerId = `msd-faq-trigger-${index}`;
              const formattedNumber = String(index + 1).padStart(2, '0');

              return (
                <div
                  key={index}
                  className={`msd-faq-item ${isOpen ? 'is-open' : ''}`}
                >
                  <button
                    type="button"
                    id={triggerId}
                    aria-expanded={isOpen}
                    aria-controls={panelId}
                    onClick={() => toggleFaq(index)}
                    className="msd-faq-trigger"
                  >
                    <span className="msd-faq-num" aria-hidden="true">
                      {formattedNumber}
                    </span>
                    <span className="msd-faq-question">{faq.question}</span>
                    <span className="msd-faq-toggle-icon" aria-hidden="true">
                      {isOpen ? '−' : '+'}
                    </span>
                  </button>

                  <div
                    id={panelId}
                    role="region"
                    aria-labelledby={triggerId}
                    className="msd-faq-panel"
                  >
                    <div className="msd-faq-panel-inner">
                      <p>{faq.answer}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ====================================================================
          07 ARCHITECTURAL CONSULTATION CLOSING CTA BANNER
          ==================================================================== */}
      <section
        className="msd-cta-banner-section"
        aria-label="Book a Spatial Consultation"
      >
        <div className="msd-container">
          <div className="msd-cta-banner-card">
            <div className="msd-cta-overlay" aria-hidden="true" />
            <div className="msd-cta-content">
              <div className="msd-cta-badge">
                <span className="msd-badge-dot" aria-hidden="true" />
                <span>STUDIO CONSULTATION · COIMBATORE</span>
              </div>

              <h2 className="msd-cta-heading">
                Ready to Create an Interior Shaped Around Your Vision?
              </h2>

              <p className="msd-cta-desc">
                Schedule a complimentary 45-minute spatial consultation with our
                principal architects. Review your floor plans, touch tactile
                material samples, and receive a transparent, locked BOQ roadmap.
              </p>

              <div className="msd-cta-actions">
                <button
                  type="button"
                  onClick={handleBookConsultation}
                  className="msd-cta-btn-primary"
                >
                  <span>Book Design Consultation</span>
                  <span aria-hidden="true">↗</span>
                </button>

                <a href="tel:+918940555526" className="msd-cta-btn-secondary">
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    width="16"
                    height="16"
                    aria-hidden="true"
                  >
                    <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07 19.5 19.5 0 01-6-6 19.79 19.79 0 01-3.07-8.67A2 2 0 014.11 2h3a2 2 0 012 1.72 12.84 12.84 0 00.7 2.81 2 2 0 01-.45 2.11L8.09 9.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45 12.84 12.84 0 002.81.7A2 2 0 0122 16.92z" />
                  </svg>
                  <span>Call: +91 89405 55526</span>
                </a>
              </div>

              <div className="msd-cta-trust-bar">
                <span className="msd-cta-trust-item">
                  ✓ 10-Year Hardware Warranty
                </span>
                <span className="msd-cta-trust-item">
                  ✓ 100% Locked BOQ Guarantee
                </span>
                <span className="msd-cta-trust-item">
                  ✓ Dedicated Project Site Engineer
                </span>
                <span className="msd-cta-trust-item">
                  ✓ Own CNC Joinery Factory
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ServiceDetailPage;

