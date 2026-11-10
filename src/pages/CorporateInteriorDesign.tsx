import React from 'react';
import { ServiceDetailPage, type ServiceDetailData } from '../components/ServiceDetailPage';

const CORPORATE_SERVICE_DATA: ServiceDetailData = {
  slug: 'corporate-interior-design',
  title: 'Corporate Interior Design',
  breadcrumbCurrent: 'Corporate Interior Design',

  heroImage: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1920&q=80',
  heroImageAlt: 'Modern corporate workspace with glass meeting rooms and executive workstations',

  introHeading: 'Workspaces Engineered for Productivity, Culture & Well-Being',
  introParagraph:
    'We create corporate interiors that go beyond aesthetics — engineering agile environments that elevate team collaboration, reflect authentic brand prestige, and support employee vitality. From high-density agile workstations to confidential boardroom suites, every square foot is optimized for peak organizational performance.',

  features: [
    {
      title: 'Acoustic & Lighting Ergonomics',
      description:
        'STC-rated acoustic glass partitions, sound-dampening ceiling baffles, and glare-free 4000K circadian lighting engineered to reduce cognitive fatigue and enhance daily focus.',
      image: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=300&q=80',
      imageAlt: 'Corporate conference room with engineered acoustic treatment',
    },
    {
      title: 'Custom Executive Joinery & Tech Integration',
      description:
        'Bespoke boardroom tables, reception monoliths, and concealed AV/VC conferencing systems crafted in our specialized factory for seamless executive leadership.',
      image: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=300&q=80',
      imageAlt: 'Executive leadership boardroom joinery',
    },
  ],

  midImage: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1600&q=80',
  midImageAlt: 'Expansive corporate open floor plan with collaboration lounges',

  stepsHeading: 'Our Corporate Delivery Framework',
  stepsIntro:
    'A predictable 3-stage delivery lifecycle designed to minimize business disruption and meet fixed lease commencement deadlines.',

  steps: [
    {
      number: '01',
      title: 'Workplace Strategy',
      description:
        'Headcount growth modeling, circulation mapping, acoustic zoning, and departmental adjacency analysis to maximize floorplate efficiency.',
    },
    {
      number: '02',
      title: 'Design & Statutory',
      description:
        'Photorealistic 3D visual walkthroughs, MEP engineering, fire-life-safety codes, and building authority approvals locked before construction.',
    },
    {
      number: '03',
      title: 'Turnkey Fit-Out',
      description:
        'Off-site CNC joinery fabrication, precision site construction, locked BOQ pricing, and zero-defect move-in handover.',
    },
  ],

  stats: [
    { value: '40+', label: 'Projects Delivered' },
    { value: '10+', label: 'Corporate Clients' },
    { value: '100%', label: 'Client Satisfaction' },
  ],

  targetHeading: 'Workplace Typologies We Architect',
  targetImage: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1600&q=80',
  targetImageAlt: 'Modern corporate headquarters building and interior architecture',
  targetPills: [
    'High-Growth Tech Startups',
    'C-Suite & Executive Chambers',
    'Multi-Floor Corporate Headquarters',
  ],
  videoUrl: undefined,

  materialsHeading: 'Workplace Ergonomics & High-Performance Materials',
  materialsIntro:
    'Corporate workplaces demand rigorous acoustic isolation, heavy-duty surface endurance, and clean cable-free technology integration. Every surface in our fit-outs is calibrated for sustained cognitive focus and executive prestige.',
  materials: [
    {
      tag: 'ACOUSTICS & PRIVACY',
      title: 'STC-45 Double Glazing & Sound Baffles',
      description:
        'Sound-transmission-class rated acoustic glass partitions and ceiling-suspended felt baffles preventing sound bleed between confidential boardrooms and active open offices.',
      spec: 'STC 45 Acoustic Rating · Sound-Dampening Core',
      image: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=800&q=80',
    },
    {
      tag: 'SURFACES & DURABILITY',
      title: 'Commercial-Grade Veneers & Impact HPL',
      description:
        'High-pressure anti-fingerprint laminates, 2mm ABS impact edge-banding, and moisture-sealed commercial veneers engineered for heavy daily executive use.',
      spec: 'Anti-Microbial Coating · Scratch & Stain Resistant',
      image: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=800&q=80',
    },
    {
      tag: 'TECH INTEGRATION',
      title: 'Concealed Cable Raceways & Power Distribution',
      description:
        'Modular under-floor power tracks, pop-up AV conferencing boxes, and invisible cable vertebrae ensuring clean, cable-free boardroom and workstation surfaces.',
      spec: 'Zero Cable Clutter · Modular Sub-Floor Conduit',
      image: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=800&q=80',
    },
    {
      tag: 'WELL-BEING & LIGHT',
      title: 'Circadian 4000K Lighting & Smart Automation',
      description:
        'Flicker-free UGR<19 architectural LED luminaires with daylight-harvesting sensors and programmable scene presets to sustain mental focus throughout workdays.',
      spec: 'UGR < 19 Anti-Glare · Automated Daylighting Presets',
      image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=800&q=80',
    },
  ],

  spacesHeading: 'Workplace Typologies Engineered for Growth',
  spacesIntro:
    'From confidential leadership chambers to vibrant open-plan team neighborhoods, explore how we architect corporate workspaces that drive collaboration and business value.',
  spaces: [
    {
      tag: 'EXECUTIVE LEADERSHIP',
      title: 'Executive Boardroom & Leadership Suites',
      subtitle: 'Hybrid Video-Conferencing Suites with Acoustic Isolation',
      description:
        'Designed for high-stakes leadership decisions and client presentations. Integrates a monolithic 16-seat veneer conference table, concealed PTZ camera enclosures, acoustic wall paneling, and tactile motorized blackouts.',
      highlights: [
        'Monolithic 16-seat boardroom table with integrated pop-up connectivity',
        'STC-48 acoustic double-glazed perimeter walls with drop-down door seals',
        'Dual 4K video conferencing wall with concealed AV soundbars and microphones',
      ],
      spec: 'STC 48 Acoustic Perimeter · American Walnut Veneer',
      image: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=1200&q=80',
    },
    {
      tag: 'COLLABORATIVE TEAMS',
      title: 'High-Density Agile Workstation Floorplates',
      subtitle: 'Ergonomic Workstations with Acoustic Neighborhood Zoning',
      description:
        'Balanced open-plan design featuring motorized sit-to-stand desks, acoustic felt boundary screens, dedicated personal storage, and biophilic planter dividers that enhance air quality and focus.',
      highlights: [
        'Motorized dual-motor sit-to-stand desks with digital memory presets',
        'Acoustic felt desktop dividers and overhead acoustic sound baffles',
        'Integrated biophilic planting troughs and personal mobile pedestals',
      ],
      spec: 'BIFMA Certified Hardware · 100% Cable Concealment',
      image: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1200&q=80',
    },
    {
      tag: 'FIRST IMPRESSIONS',
      title: 'Client Arrival Lounge & Monolith Reception',
      subtitle: 'Sculptural Architectural Statements Reflecting Brand Prestige',
      description:
        'The front face of your enterprise. Features a monolithic backlit stone reception desk, executive visitor waiting lounge with bespoke architectural joinery, and concealed cloakroom and beverage hospitality staging.',
      highlights: [
        'Custom monolithic stone reception desk with concealed receptionist workstation',
        'Backlit architectural brand identity feature wall with brass metal accents',
        'Discreet beverage hospitality bar and secure guest registration terminal',
      ],
      spec: 'Monolithic Italian Marble · Museum-Grade Accent Lighting',
      image: 'https://images.unsplash.com/photo-1604328698692-f76ea9498e76?auto=format&fit=crop&w=1200&q=80',
    },
  ],

  faqHeading: 'Frequently Asked Questions',
  faqs: [
    {
      question: 'What is included in your corporate interior design service?',
      answer:
        'We manage the full lifecycle: workplace strategy, headcount zoning, 3D architectural renders, MEP and HVAC engineering, statutory approvals, bespoke factory joinery, loose office furniture, and complete turnkey fit-out with single-point accountability.',
    },
    {
      question: 'How do you minimize disruption during office renovations?',
      answer:
        'We fabricate over 80% of joinery and modular systems off-site in our CNC facility, stage noisy works during off-hours, and execute in phased zones to keep your operations fully functional throughout the build.',
    },
    {
      question: 'Can you design strictly within our corporate procurement budget?',
      answer:
        'Yes. We formulate an itemized, line-by-line Bill of Quantities (BOQ) with locked specifications before work starts, guaranteeing zero mid-project cost escalations or surprise contractor variations.',
    },
    {
      question: 'Do you handle MEP, HVAC, and municipal compliance approvals?',
      answer:
        'Yes. Our in-house technical team manages all mechanical, electrical, plumbing, fire detection, emergency egress, and landlord technical NOC clearances from start to finish.',
    },
    {
      question: 'How long does a typical corporate fit-out take?',
      answer:
        'Standard corporate fit-outs span 6 to 12 weeks: 2 weeks for spatial programming and 3D approvals, followed by 4 to 10 weeks for off-site fabrication, site fit-out, and statutory inspections.',
    },
  ],
};

/**
 * Corporate Interior Design Service Page
 * Powered by ServiceDetailPage (Editorial Layout, Sticky Sidebar, Accordion FAQ)
 */
export const CorporateInteriorDesign: React.FC = () => {
  return <ServiceDetailPage data={CORPORATE_SERVICE_DATA} />;
};

export default CorporateInteriorDesign;
