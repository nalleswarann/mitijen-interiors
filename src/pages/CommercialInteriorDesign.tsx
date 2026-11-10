import React from 'react';
import { ServiceDetailPage, type ServiceDetailData } from '../components/ServiceDetailPage';

const COMMERCIAL_SERVICE_DATA: ServiceDetailData = {
  slug: 'commercial-interior-design',
  title: 'Commercial Interior Design',
  breadcrumbCurrent: 'Commercial Interior Design',

  heroImage: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1920&q=80',
  heroImageAlt: 'High-end experiential commercial retail and dining venue',

  introHeading: 'Architectural Distinction for Forward-Thinking Brands',
  introParagraph:
    'We shape commercial destinations that balance bold brand storytelling with operational efficiency, customer circulation, and commercial-grade durability. From luxury flagship retail boutiques to immersive dining pavilions, every square metre is choreographed to maximize customer dwell time and drive repeat visits.',

  features: [
    {
      title: 'Customer Flow & Dwell Mapping',
      description:
        'Intuitive threshold zoning, eye-level sightline choreography, and high-impact focal displays engineered to convert foot traffic into brand advocates.',
      image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=300&q=80',
      imageAlt: 'Luxury retail interior with strategic customer circulation layout',
    },
    {
      title: 'High-Traffic Commercial Finishes',
      description:
        'Commercial-grade porcelain, honed quartzite, low-VOC polyurethane joinery, and durable shopfitting millwork fabricated to endure continuous public use.',
      image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=300&q=80',
      imageAlt: 'High-grade commercial restaurant and hospitality finishes',
    },
  ],

  midImage: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1600&q=80',
  midImageAlt: 'Atmospheric boutique commercial venue with custom lighting and joinery',

  stepsHeading: 'How We Build Commercial Destinations',
  stepsIntro:
    'A fast-track commercial fit-out process aligned with strict mall guidelines and lease rent-free commencement deadlines.',

  steps: [
    {
      number: '01',
      title: 'Concept & Circulation',
      description:
        'Customer journey mapping, entrance threshold design, merchandise zoning, and brand aesthetic mood boards to guide spatial behavior.',
    },
    {
      number: '02',
      title: '3D Walkthrough & MEP',
      description:
        'Photorealistic 3D visualization, landlord criteria compliance, HVAC/MEP load engineering, and statutory municipality permits.',
    },
    {
      number: '03',
      title: 'Fast-Track Fit-Out',
      description:
        'Off-site CNC joinery fabrication, synchronized site trades, locked BOQ pricing, and prompt on-time launch handover.',
    },
  ],

  stats: [
    { value: '50+', label: 'Commercial Venues' },
    { value: '15+', label: 'Brand Partnerships' },
    { value: '100%', label: 'Milestone Delivery' },
  ],

  targetHeading: 'Commercial Environments We Design',
  targetImage: 'https://images.unsplash.com/photo-1541888946425-d0fbb186c5f7?auto=format&fit=crop&w=1600&q=80',
  targetImageAlt: 'Boutique retail and hospitality commercial environment',
  targetPills: [
    'Flagship Stores & Showrooms',
    'Cafés, Bars & Fine Dining',
    'Experience Centers & Boutiques',
  ],
  videoUrl: undefined,

  faqHeading: 'Frequently Asked Questions',
  faqs: [
    {
      question: 'How do you design commercial interiors to increase customer spend?',
      answer:
        'We choreograph spatial sightlines, intuitive decompression zones, flattering merchandise lighting, and tactile material vignettes that invite exploration, prolong dwell time, and encourage purchases.',
    },
    {
      question: 'Do you handle shopping mall and landlord technical handbooks?',
      answer:
        'Yes. Our team coordinates directly with mall managements, property developers, and local municipal authorities for full MEP, fire safety, and technical drawing sign-offs.',
    },
    {
      question: 'What materials do you use to withstand heavy commercial traffic?',
      answer:
        'We specify heavy-traffic commercial porcelain, honed quartzites, scratch-resistant HPL, marine-grade core structures, and durable polyurethane coatings engineered for high public footfall.',
    },
    {
      question: 'Can you work around strict commercial lease start dates?',
      answer:
        'Yes. We build fast-track delivery schedules and fabricate joinery off-site in our advanced CNC workshop to minimize on-site duration and meet lease rent-free deadlines.',
    },
    {
      question: 'Do you offer maintenance and post-handover warranty support?',
      answer:
        'All Mitijen commercial installations carry comprehensive defects-liability warranty support with dedicated aftercare service.',
    },
  ],
};

/**
 * Commercial Interior Design Service Page
 * Powered by ServiceDetailPage (Editorial Layout, Sticky Sidebar, Accordion FAQ)
 */
export const CommercialInteriorDesign: React.FC = () => {
  return <ServiceDetailPage data={COMMERCIAL_SERVICE_DATA} />;
};

export default CommercialInteriorDesign;
