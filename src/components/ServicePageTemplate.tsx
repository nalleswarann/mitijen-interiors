import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import type { ServicePageData } from '../data/servicesData';
import { SEO } from './common/SEO';
import { useInquiry } from '../context/useInquiry';
import { HowItWorksSection } from './HowItWorksSection';
import '../styles/ServicePage.css';

interface ServicePageTemplateProps {
  data: ServicePageData;
  children?: React.ReactNode;
}

interface SolutionCardItem {
  title: string;
  description: string;
  image: string;
  wide?: boolean;
  icon: 'office' | 'meeting' | 'reception' | 'executive' | 'collaborative';
}

interface DisciplineEditorialConfig {
  eyebrow: string;
  heroHeadline: string;
  heroSubtitle: string;
  heroImage: string;
  aboutEyebrow: string;
  aboutHeading: string;
  aboutText: string;
  aboutImage: string;
  sidebarTitle: string;
  sidebarDesc: string;
  solutionsEyebrow: string;
  solutionsHeading: string;
  solutionsLead: string;
  solutionsCards: SolutionCardItem[];
  challengesEyebrow: string;
  challengesHeading: string;
  challengesLead: string;
  challengesImage: string;
  challengesList: string[];
  includesEyebrow: string;
  includesHeading: string;
  includesLead: string;
  includesItems: Array<{
    title: string;
    image: string;
  }>;
  philosophyEyebrow: string;
  philosophyHeading: string;
  philosophyLead: string;
  philosophyPoints: string[];
  faqHeading: string;
  faqSubtitle: string;
  faqImage: string;
  ctaEyebrow: string;
  ctaHeading: string;
  ctaSubtitle: string;
  ctaImage: string;
}

const EDITORIAL_CONFIG: Record<'Corporate' | 'Commercial' | 'Residential', DisciplineEditorialConfig> = {
  Corporate: {
    eyebrow: 'Corporate Interiors',
    heroHeadline: 'Let’s Design Workspaces That Inspire',
    heroSubtitle: 'Create productive, elegant and people-centric workspaces with Mitijen Interiors.',
    heroImage: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1800&q=80',
    aboutEyebrow: 'About Our Service',
    aboutHeading: 'Cultivating Productivity, Culture & Well-Being at Work',
    aboutText:
      'We create corporate interiors that go beyond aesthetics — designing environments that boost productivity, reflect your brand, and support your people’s well-being.',
    aboutImage: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1000&q=80',
    sidebarTitle: 'Plan Your Workspace',
    sidebarDesc: 'Speak with our design team about your office, your people and your goals.',
    solutionsEyebrow: 'What We Can Help With',
    solutionsHeading: 'Comprehensive Corporate Interior Solutions',
    solutionsLead:
      'From modern offices to collaborative workspaces, we design spaces that work beautifully for your business.',
    solutionsCards: [
      {
        title: 'Office Spaces',
        description: 'Modern, flexible and inspiring work environments.',
        image: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1000&q=80',
        wide: true,
        icon: 'office',
      },
      {
        title: 'Meeting & Conference',
        description: 'Spaces for ideas, collaboration and growth.',
        image: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=1000&q=80',
        wide: true,
        icon: 'meeting',
      },
      {
        title: 'Reception Areas',
        description: 'Make a lasting first impression.',
        image: 'https://images.unsplash.com/photo-1604328698692-f76ea9498e76?auto=format&fit=crop&w=800&q=80',
        icon: 'reception',
      },
      {
        title: 'Executive Spaces',
        description: 'Sophisticated spaces for leadership.',
        image: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=800&q=80',
        icon: 'executive',
      },
      {
        title: 'Collaborative Zones',
        description: 'Open, adaptable areas for teamwork.',
        image: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=800&q=80&sat=-20',
        icon: 'collaborative',
      },
    ],
    challengesEyebrow: 'Corporate Interior Challenges',
    challengesHeading: 'Turning Workplace Challenges into Opportunities',
    challengesLead:
      'We understand the unique challenges businesses face — and design solutions that balance functionality, aesthetics and employee well-being.',
    challengesImage: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1400&q=80',
    challengesList: [
      'Maximizing space for growing teams',
      'Creating a productive and positive work culture',
      'Reflecting your brand identity',
      'Designing for flexibility and future growth',
    ],
    includesEyebrow: 'What Corporate Interior Design Includes',
    includesHeading: 'A Complete Design Experience',
    includesLead: 'From concept to completion, we handle every detail with precision and care.',
    includesItems: [
      { title: 'Space Planning & Layout Optimization', image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=400&q=70' },
      { title: 'Premium Material Selection', image: 'https://images.unsplash.com/photo-1615873968403-89e068629265?auto=format&fit=crop&w=400&q=70' },
      { title: 'Lighting Design', image: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=400&q=70' },
      { title: 'Custom Furniture & Furnishings', image: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=400&q=70' },
      { title: 'Brand Integration', image: 'https://images.unsplash.com/photo-1604328698692-f76ea9498e76?auto=format&fit=crop&w=400&q=70' },
      { title: 'Turnkey Execution', image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=400&q=70' },
    ],
    philosophyEyebrow: 'Workplace Design Philosophy',
    philosophyHeading: 'Workplaces that perform are designed for people first.',
    philosophyLead:
      'Every workplace we design balances functionality, aesthetics and employee well-being, creating environments that support productivity and reflect your culture and brand.',
    philosophyPoints: [
      'Productivity through thoughtful space planning',
      'Culture expressed through design',
      'Well-being through light, material and comfort',
    ],
    faqHeading: 'Your Questions, Answered',
    faqSubtitle: 'Get quick answers to common queries about our corporate interior design services.',
    faqImage: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=800&q=70',
    ctaEyebrow: 'Let’s Bring Your Vision to Life',
    ctaHeading: 'Ready to Create an Exceptional Workspace?',
    ctaSubtitle: 'Partner with Mitijen Interiors for inspiring corporate spaces.',
    ctaImage: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1800&q=80',
  },

  Commercial: {
    eyebrow: 'Commercial Interiors',
    heroHeadline: 'Captivating Commercial Spaces That Drive Business',
    heroSubtitle: 'Design bespoke retail, dining, and hospitality venues engineered for customer flow and lasting brand recall.',
    heroImage: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1800&q=80',
    aboutEyebrow: 'About Our Service',
    aboutHeading: 'Architectural Distinction for Forward-Thinking Brands',
    aboutText:
      'We shape commercial destinations that balance bold brand storytelling with operational efficiency, customer circulation, and commercial durability.',
    aboutImage: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1000&q=80',
    sidebarTitle: 'Plan Your Venue',
    sidebarDesc: 'Consult our commercial studio regarding spatial planning, brand ambiance, and customer flow.',
    solutionsEyebrow: 'What We Can Help With',
    solutionsHeading: 'Comprehensive Commercial Interior Solutions',
    solutionsLead:
      'From flagship retail to boutique hospitality, we engineer environments that captivate customers and drive performance.',
    solutionsCards: [
      {
        title: 'Retail Experiences',
        description: 'Engaging retail journeys that maximize foot traffic, dwell time, and merchandise visibility.',
        image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1000&q=80',
        wide: true,
        icon: 'office',
      },
      {
        title: 'Hospitality & Dining',
        description: 'Atmospheric restaurant and cafe layouts combining kitchen ergonomics with guest intimacy.',
        image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1000&q=80',
        wide: true,
        icon: 'meeting',
      },
      {
        title: 'Reception & Foyers',
        description: 'Striking arrival zones establishing prestige and intuitive visitor navigation.',
        image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80',
        icon: 'reception',
      },
      {
        title: 'Executive Venues',
        description: 'Sophisticated meeting lounges and private suites for VIP client engagement.',
        image: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=800&q=80',
        icon: 'executive',
      },
      {
        title: 'Experience Centers',
        description: 'Interactive brand showcase zones designed to inspire and convert visitors.',
        image: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=800&q=80',
        icon: 'collaborative',
      },
    ],
    challengesEyebrow: 'Commercial Interior Challenges',
    challengesHeading: 'Turning Commercial Challenges into Growth',
    challengesLead:
      'We understand commercial lease pressures — and engineer spaces that balance visual allure with durable, code-compliant operations.',
    challengesImage: 'https://images.unsplash.com/photo-1541888946425-d0fbb186c5f7?auto=format&fit=crop&w=1400&q=80',
    challengesList: [
      'Optimizing guest flow and dwell time without bottlenecks',
      'Balancing high-traffic material durability with luxury aesthetics',
      'Aligning spatial atmosphere with distinct brand identity',
      'Navigating strict commercial codes, MEP, and egress regulations',
    ],
    includesEyebrow: 'What Commercial Interior Design Includes',
    includesHeading: 'A Complete Turnkey Commercial Journey',
    includesLead: 'From concept to completion, we handle every detail with precision and care.',
    includesItems: [
      { title: 'Customer Circulation & Dwell Mapping', image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=400&q=70' },
      { title: 'Commercial-Grade Material Specification', image: 'https://images.unsplash.com/photo-1615873968403-89e068629265?auto=format&fit=crop&w=400&q=70' },
      { title: 'Architectural & Accent Lighting Design', image: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=400&q=70' },
      { title: 'Bespoke Joinery & Display Millwork', image: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=400&q=70' },
      { title: 'Wayfinding & Environmental Branding', image: 'https://images.unsplash.com/photo-1604328698692-f76ea9498e76?auto=format&fit=crop&w=400&q=70' },
      { title: 'Turnkey Fit-Out & Statutory Approvals', image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=400&q=70' },
    ],
    philosophyEyebrow: 'Commercial Design Philosophy',
    philosophyHeading: 'Spaces that captivate are designed for customer connection.',
    philosophyLead:
      'Every commercial interior we create unites brand storytelling with frictionless spatial economics, fostering lasting customer loyalty and tangible business returns.',
    philosophyPoints: [
      'Customer experience through intuitive spatial choreography',
      'Brand resonance expressed in custom material craft',
      'Operational resilience through commercial-grade engineering',
    ],
    faqHeading: 'Your Questions, Answered',
    faqSubtitle: 'Get quick answers to common queries about our commercial interior architecture and build process.',
    faqImage: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=800&q=70',
    ctaEyebrow: 'Bring Your Commercial Concept to Life',
    ctaHeading: 'Ready to Elevate Your Commercial Presence?',
    ctaSubtitle: 'Partner with Mitijen Interiors for landmark commercial environments.',
    ctaImage: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1800&q=80',
  },

  Residential: {
    eyebrow: 'Residential Interiors',
    heroHeadline: 'Timeless Residential Sanctuaries Crafted for Living',
    heroSubtitle: 'Tailored luxury homes blending serene architectural warmth, bespoke millwork, and refined daily comfort.',
    heroImage: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1800&q=80',
    aboutEyebrow: 'About Our Service',
    aboutHeading: 'Sanctuaries of Comfort, Proportion & Soul',
    aboutText:
      'We craft bespoke homes that reflect your family’s rhythm of life — curating natural textures, balanced proportions, and serene illumination.',
    aboutImage: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1000&q=80',
    sidebarTitle: 'Plan Your Dream Home',
    sidebarDesc: 'Schedule a private consultation with our principal residential designers.',
    solutionsEyebrow: 'What We Can Help With',
    solutionsHeading: 'Comprehensive Residential Interior Solutions',
    solutionsLead:
      'From full-home renovations to bespoke room transformations, we create spaces tailored to your lifestyle.',
    solutionsCards: [
      {
        title: 'Living & Entertaining Suites',
        description: 'Expansive, light-filled living spaces designed for effortless relaxation and hosting.',
        image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1000&q=80',
        wide: true,
        icon: 'office',
      },
      {
        title: 'Gourmet Kitchens',
        description: 'Custom architectural culinary spaces featuring integrated joinery and natural stone.',
        image: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1000&q=80',
        wide: true,
        icon: 'meeting',
      },
      {
        title: 'Master Sanctuaries',
        description: 'Peaceful private bedroom suites with bespoke dressing rooms and ensuite retreats.',
        image: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=800&q=80',
        icon: 'reception',
      },
      {
        title: 'Private Studies & Libraries',
        description: 'Quiet, acoustically refined home offices designed for sustained creative focus.',
        image: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=800&q=80',
        icon: 'executive',
      },
      {
        title: 'Dining Salons',
        description: 'Intimate gathering spaces defined by sculptural lighting and bespoke dining millwork.',
        image: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=800&q=80',
        icon: 'collaborative',
      },
    ],
    challengesEyebrow: 'Residential Interior Challenges',
    challengesHeading: 'Transforming Living Spaces into Timeless Homes',
    challengesLead:
      'We harmonize complex residential constraints — from structural remodels to personal lifestyle preferences — into cohesive elegance.',
    challengesImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1400&q=80',
    challengesList: [
      'Maximizing natural light and architectural sightlines',
      'Concealing functional clutter with bespoke architectural storage',
      'Harmonizing contrasting personal tastes into a singular aesthetic',
      'Selecting timeless, non-toxic, pet-and-child durable materials',
    ],
    includesEyebrow: 'What Residential Interior Design Includes',
    includesHeading: 'An End-to-End Residential Experience',
    includesLead: 'From concept to completion, we handle every detail with precision and care.',
    includesItems: [
      { title: 'Architectural Space Planning & 3D Visuals', image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=400&q=70' },
      { title: 'Curated Materials & Palette Curation', image: 'https://images.unsplash.com/photo-1615873968403-89e068629265?auto=format&fit=crop&w=400&q=70' },
      { title: 'Custom Joinery & Wardrobe Systems', image: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=400&q=70' },
      { title: 'Architectural Lighting & Smart Controls', image: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=400&q=70' },
      { title: 'Art Curation & Soft Furnishings', image: 'https://images.unsplash.com/photo-1604328698692-f76ea9498e76?auto=format&fit=crop&w=400&q=70' },
      { title: 'Turnkey Project Management & Handover', image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=400&q=70' },
    ],
    philosophyEyebrow: 'Residential Design Philosophy',
    philosophyHeading: 'Homes of enduring character are designed around life.',
    philosophyLead:
      'True luxury is a home that feels calm, tactile, and effortlessly supportive of the moments you cherish with loved ones.',
    philosophyPoints: [
      'Daily harmony through intuitive layout zoning',
      'Sensory warmth through natural, authentic materiality',
      'Effortless living through concealed, precision engineering',
    ],
    faqHeading: 'Your Questions, Answered',
    faqSubtitle: 'Everything you need to know about designing your home with Mitijen Interiors.',
    faqImage: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=800&q=70',
    ctaEyebrow: 'Let’s Shape Your Sanctuary',
    ctaHeading: 'Ready to Design Your Dream Residence?',
    ctaSubtitle: 'Partner with Mitijen Interiors for extraordinary residential living.',
    ctaImage: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1800&q=80',
  },
};

// SVG Icon Helper for Card Badges
const CardIcon: React.FC<{ type: SolutionCardItem['icon'] }> = ({ type }) => {
  switch (type) {
    case 'office':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <rect x="3" y="7" width="18" height="13" rx="1" />
          <path d="M9 7V4h6v3M3 13h18" />
        </svg>
      );
    case 'meeting':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <circle cx="8" cy="9" r="3" />
          <circle cx="17" cy="10" r="2.5" />
          <path d="M2 20c0-3.5 3-6 6-6s6 2.5 6 6M15 15c3 0 6 1.5 6 5" />
        </svg>
      );
    case 'reception':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M5 21V5l9-2v18M14 8h5v13M8 8h3M8 12h3M8 16h3" />
        </svg>
      );
    case 'executive':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M6 4h12l3 5-9 11L3 9z" />
          <path d="M3 9h18M9 4l3 5 3-5" />
        </svg>
      );
    case 'collaborative':
    default:
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M3 12l9-8 9 8M5 10v10h14V10" />
        </svg>
      );
  }
};

export const ServicePageTemplate: React.FC<ServicePageTemplateProps> = ({ data, children }) => {
  const { openInquiry } = useInquiry();
  const location = useLocation();
  const pageContainerRef = useRef<HTMLDivElement>(null);

  const category = (data.category as 'Corporate' | 'Commercial' | 'Residential') || 'Corporate';
  const config = EDITORIAL_CONFIG[category] || EDITORIAL_CONFIG.Corporate;

  // Accordion state
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const toggleFaq = (index: number) => {
    setOpenFaqIndex(prev => (prev === index ? null : index));
  };

  // Scroll Reveal Observer matching mitijen-corporate-interior.html
  useEffect(() => {
    const container = pageContainerRef.current;
    if (!container) return;

    const els = container.querySelectorAll('.rv, .img-rv');
    if ('IntersectionObserver' in window) {
      const io = new IntersectionObserver(
        entries => {
          entries.forEach(entry => {
            if (entry.isIntersecting) {
              entry.target.classList.add('in');
              io.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.12, rootMargin: '0px 0px -6% 0px' }
      );

      els.forEach(el => io.observe(el));
      return () => io.disconnect();
    } else {
      els.forEach(el => el.classList.add('in'));
    }
  }, [category]);

  const serviceNavLinks = [
    { name: 'Corporate Interior Design', shortName: 'Corporate', path: '/services/corporate-interior-design' },
    { name: 'Residential Interior Design', shortName: 'Residential', path: '/services/residential-interior-design' },
    { name: 'Commercial Interior Design', shortName: 'Commercial', path: '/services/commercial-interior-design' },
    { name: 'Turnkey Execution', shortName: 'Turnkey', path: '/services#turnkey' },
  ];

  // Pull FAQs from servicesData with fallback
  const faqsList = data.faqsSection?.faqs && data.faqsSection.faqs.length > 0
    ? data.faqsSection.faqs.slice(0, 5)
    : [
        {
          question: `What is ${data.category.toLowerCase()} interior design?`,
          answer: `${data.category} interior design is the meticulous planning, spatial styling, and technical execution of spaces that elevate well-being, optimize lifestyle or workflow, and reflect timeless architectural elegance.`,
        },
        {
          question: 'Do you handle end-to-end turnkey project execution?',
          answer: 'Yes. We provide complete turnkey services from architectural concept drafting and 3D visualization to precision factory joinery, MEP engineering, statutory approvals, and final site handover.',
        },
        {
          question: 'How long does a typical project take from start to handover?',
          answer: 'Project durations range from 8 to 14 weeks depending on the spatial footprint, civil scope, and customization level. We provide a milestone-locked project Gantt chart before commencement.',
        },
        {
          question: 'Can you design within a predetermined budget?',
          answer: 'Absolutely. We formulate transparent, itemized Bill of Quantities (BOQ) with zero hidden mid-project cost escalations, tailoring finishes to achieve your aesthetic vision within budget.',
        },
        {
          question: 'Do you manage on-site contractor coordination and quality audits?',
          answer: 'Yes. Our dedicated site architects and project managers conduct rigorous multi-stage quality checks across carpentry, electrical, plumbing, HVAC, and paint finishing.',
        },
      ];

  return (
    <div ref={pageContainerRef} className="mitijen-service-page">
      <SEO
        title={data.seo.title}
        description={data.seo.description}
        canonical={data.seo.canonical}
        ogImage={data.seo.ogImage}
      />

      {/* ====================================================================
          02 HERO SECTION
          ==================================================================== */}
      <section className="hero">
        <div className="bg photo">
          <img
            src={config.heroImage}
            alt={config.heroHeadline}
            fetchPriority="high"
          />
        </div>
        <div className="wrap">
          <div className="hero-copy">
            <span className="eyebrow rv">{config.eyebrow}</span>
            <h1 className="rv" style={{ ['--d' as string]: '0.1s' }}>
              {config.heroHeadline}
            </h1>
            <p className="rv" style={{ ['--d' as string]: '0.2s' }}>
              {config.heroSubtitle}
            </p>
            <button
              type="button"
              onClick={() => openInquiry(`${data.category} — Hero Consultation`)}
              className="btn rv"
              style={{ ['--d' as string]: '0.3s' }}
            >
              Consult Our Experts
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                <path d="M4 12h16M14 6l6 6-6 6" />
              </svg>
            </button>
          </div>
        </div>
        <div className="scroll">
          <i />
          Scroll to explore
        </div>
      </section>

      {/* ====================================================================
          03 INTRO SECTION
          ==================================================================== */}
      <section className="intro">
        <div className="wrap grid">
          <div className="arch-wrap rv">
            <div className="arch photo">
              <img
                src={config.aboutImage}
                alt={config.aboutHeading}
                loading="lazy"
              />
            </div>
          </div>
          <div>
            <span className="eyebrow rv">{config.aboutEyebrow}</span>
            <h2 className="rv" style={{ ['--d' as string]: '0.08s' }}>
              {config.aboutHeading}
            </h2>
            <p className="lead rv" style={{ ['--d' as string]: '0.16s' }}>
              {config.aboutText}
            </p>
            <div className="rule rv" />
            <button
              type="button"
              onClick={() => openInquiry(`${data.category} — About Section Consultation`)}
              className="btn rv"
            >
              Book a Consultation
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                <path d="M4 12h16M14 6l6 6-6 6" />
              </svg>
            </button>
          </div>
        </div>
      </section>

      {/* ====================================================================
          04 MAIN LAYOUT WITH SIDEBAR & WHAT WE CAN HELP WITH
          ==================================================================== */}
      <div className="wrap main-layout">
        {/* Desktop Sticky Sidebar */}
        <aside className="side" aria-label="Services Navigation">
          <nav className="svc-nav" aria-label="Our services">
            <h4>Our Services</h4>
            {serviceNavLinks.map(link => {
              const isCurrent = location.pathname === link.path;
              return (
                <Link
                  key={link.path}
                  to={link.path}
                  aria-current={isCurrent ? 'page' : undefined}
                  className={isCurrent ? 'is-active' : ''}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>
          <div className="consult" id="contact">
            <h3>{config.sidebarTitle}</h3>
            <p>{config.sidebarDesc}</p>
            <button
              type="button"
              onClick={() => openInquiry(`${data.category} — Sidebar Consultation`)}
              className="btn"
            >
              Book a Consult
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                <path d="M4 12h16M14 6l6 6-6 6" />
              </svg>
            </button>
          </div>
        </aside>

        <div>
          {/* Mobile Sticky Navigation Strip */}
          <nav className="mob-nav" aria-label="Our services">
            <ul>
              {serviceNavLinks.map(link => {
                const isCurrent = location.pathname === link.path;
                return (
                  <li key={link.path}>
                    <Link
                      to={link.path}
                      aria-current={isCurrent ? 'page' : undefined}
                      className={isCurrent ? 'is-active' : ''}
                    >
                      {link.shortName}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>

          {/* Section 05: What We Can Help With */}
          <section className="help">
            <div className="sec-head">
              <div>
                <span className="eyebrow rv">{config.solutionsEyebrow}</span>
                <h2 className="rv" style={{ ['--d' as string]: '0.08s' }}>
                  {config.solutionsHeading}
                </h2>
              </div>
              <p className="lead rv" style={{ ['--d' as string]: '0.16s' }}>
                {config.solutionsLead}
              </p>
            </div>

            <div className="cards">
              {config.solutionsCards.map((card, idx) => (
                <article
                  key={card.title}
                  className={`card ${card.wide ? 'wide' : ''} rv`}
                  style={{ ['--d' as string]: `${idx * 0.08}s` }}
                >
                  <div className="photo">
                    <img src={card.image} alt={card.title} loading="lazy" />
                  </div>
                  <div className="body">
                    <div className="ico" aria-hidden="true">
                      <CardIcon type={card.icon} />
                    </div>
                    <h3>{card.title}</h3>
                    <p>{card.description}</p>
                  </div>
                </article>
              ))}
            </div>

            {/* Mobile Consultation Banner */}
            <div className="consult mob-consult">
              <h3>{config.sidebarTitle}</h3>
              <p>{config.sidebarDesc}</p>
              <button
                type="button"
                onClick={() => openInquiry(`${data.category} — Mobile Banner Consultation`)}
                className="btn"
              >
                Book a Consult
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                  <path d="M4 12h16M14 6l6 6-6 6" />
                </svg>
              </button>
            </div>
          </section>
        </div>
      </div>

      {/* ====================================================================
          06 CHALLENGES SECTION
          ==================================================================== */}
      <section className="challenges">
        <div className="ch-grid">
          <div className="ch-img img-rv">
            <div className="photo">
              <img
                src={config.challengesImage}
                alt={config.challengesHeading}
                loading="lazy"
              />
            </div>
          </div>
          <div className="ch-copy">
            <span className="eyebrow rv">{config.challengesEyebrow}</span>
            <h2 className="rv" style={{ ['--d' as string]: '0.08s' }}>
              {config.challengesHeading}
            </h2>
            <p className="lead rv" style={{ ['--d' as string]: '0.16s' }}>
              {config.challengesLead}
            </p>
            <ol className="ol rv">
              {config.challengesList.map((item, idx) => (
                <li key={item}>
                  <b>0{idx + 1}</b>
                  <span>{item}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* ====================================================================
          07 WHAT IT INCLUDES SECTION
          ==================================================================== */}
      <section className="includes">
        <div className="wrap inc-grid">
          <div>
            <span className="eyebrow rv">{config.includesEyebrow}</span>
            <h2 className="rv" style={{ ['--d' as string]: '0.08s' }}>
              {config.includesHeading}
            </h2>
            <p className="lead rv" style={{ ['--d' as string]: '0.16s' }}>
              {config.includesLead}
            </p>
            <button
              type="button"
              onClick={() => openInquiry(`${data.category} — Includes Section Consultation`)}
              className="btn rv"
            >
              Start Your Project
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                <path d="M4 12h16M14 6l6 6-6 6" />
              </svg>
            </button>
          </div>
          <ul className="cat rv">
            {config.includesItems.map(item => (
              <li key={item.title}>
                <div>
                  <h3>{item.title}</h3>
                </div>
                <div className="photo">
                  <img src={item.image} alt={item.title} loading="lazy" />
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* ====================================================================
          08 WORKPLACE DESIGN PHILOSOPHY SECTION
          ==================================================================== */}
      <section className="philo">
        <div className="wrap">
          <span className="eyebrow rv">{config.philosophyEyebrow}</span>
          <h2 className="rv" style={{ ['--d' as string]: '0.08s' }}>
            {config.philosophyHeading}
          </h2>
          <div className="cols">
            <p className="rv">{config.philosophyLead}</p>
            <div className="pr rv" style={{ ['--d' as string]: '0.1s' }}>
              {config.philosophyPoints.map((point, idx) => (
                <div key={point}>
                  <b>0{idx + 1}</b>
                  <span>{point}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================================
          09 HOW IT WORKS SECTION (Seamless Integration)
          ==================================================================== */}
      {children ? children : <HowItWorksSection />}

      {/* ====================================================================
          10 FREQUENTLY ASKED QUESTIONS SECTION
          ==================================================================== */}
      <section className="faq">
        <div className="wrap faq-grid">
          <div>
            <span className="eyebrow rv">Frequently Asked Questions</span>
            <h2 className="rv" style={{ ['--d' as string]: '0.08s' }}>
              {config.faqHeading}
            </h2>
            <p className="lead rv" style={{ ['--d' as string]: '0.16s' }}>
              {config.faqSubtitle}
            </p>
            <div className="photo img-rv">
              <img src={config.faqImage} alt="Architectural space" loading="lazy" />
            </div>
          </div>
          <div className="acc rv" id="acc">
            {faqsList.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              const buttonId = `faq-btn-${idx}`;
              const panelId = `faq-panel-${idx}`;
              return (
                <div key={faq.question} className="item">
                  <h3>
                    <button
                      type="button"
                      aria-expanded={isOpen}
                      aria-controls={panelId}
                      id={buttonId}
                      onClick={() => toggleFaq(idx)}
                    >
                      <span>{faq.question}</span>
                      <span className="pm" aria-hidden="true" />
                    </button>
                  </h3>
                  <div
                    className="panel"
                    id={panelId}
                    role="region"
                    aria-labelledby={buttonId}
                  >
                    <div>
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
          11 FINAL CONSULTATION CTA BANNER
          ==================================================================== */}
      <section className="cta" id="contact-final">
        <div className="bg photo">
          <img src={config.ctaImage} alt="" loading="lazy" />
        </div>
        <div className="wrap">
          <span className="eyebrow rv">{config.ctaEyebrow}</span>
          <h2 className="rv" style={{ ['--d' as string]: '0.08s' }}>
            {config.ctaHeading}
          </h2>
          <p className="rv" style={{ ['--d' as string]: '0.16s' }}>
            {config.ctaSubtitle}
          </p>
          <button
            type="button"
            onClick={() => openInquiry(`${data.category} — Final CTA Consultation`)}
            className="btn light rv"
            style={{ ['--d' as string]: '0.24s' }}
          >
            Book a Consultation
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
              <path d="M4 12h16M14 6l6 6-6 6" />
            </svg>
          </button>
        </div>
      </section>
    </div>
  );
};

export default ServicePageTemplate;
