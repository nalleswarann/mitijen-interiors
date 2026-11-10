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
