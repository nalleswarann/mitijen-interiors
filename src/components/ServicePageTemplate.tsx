import React, { useState, useEffect } from 'react';
import type { ServicePageData } from '../data/servicesData';
import { SEO } from './common/SEO';
import { useInquiry } from '../context/useInquiry';
import { HowItWorksSection } from './HowItWorksSection';
import '../styles/ServicePage.css';

interface ServicePageTemplateProps {
  data: ServicePageData;
  children?: React.ReactNode;
  initialDiscipline?: ServiceDiscipline;
  overrideHeroEyebrow?: string;
  overrideHeroHeadline?: string;
  overrideHeroSubtitle?: string;
  isOverviewPage?: boolean;
}

export type ServiceDiscipline = 'Corporate' | 'Commercial' | 'Residential' | 'Turnkey';

interface SolutionCard {
  title: string;
  tag: string;
  description: string;
  features: string[];
  image: string;
  icon: 'office' | 'meeting' | 'reception' | 'executive' | 'retail' | 'dining' | 'living' | 'kitchen' | 'bedroom' | 'study' | 'turnkey';
}

interface DisciplineContent {
  eyebrow: string;
  heroHeadline: string;
  heroSubtitle: string;
  heroImage: string;
  aboutEyebrow: string;
  aboutHeading: string;
  aboutText: string;
  aboutImage: string;
  stats: Array<{ value: string; label: string }>;
  solutionsEyebrow: string;
  solutionsHeading: string;
  solutionsLead: string;
  solutionsCards: SolutionCard[];
  challengesEyebrow: string;
  challengesHeading: string;
  challengesLead: string;
  challengesImage: string;
  challengesList: string[];
  includesEyebrow: string;
  includesHeading: string;
  includesLead: string;
  includesItems: Array<{ title: string; image: string }>;
  faqs: Array<{ question: string; answer: string }>;
  ctaEyebrow: string;
  ctaHeading: string;
  ctaSubtitle: string;
  ctaImage: string;
}

const DISCIPLINE_DATA: Record<ServiceDiscipline, DisciplineContent> = {
  Corporate: {
    eyebrow: 'Corporate Interiors',
    heroHeadline: 'Let’s Design Workspaces That Inspire',
    heroSubtitle: 'Create productive, elegant and people-centric workspaces engineered for focused innovation, executive prestige, and team vitality.',
    heroImage: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?auto=format&fit=crop&w=1800&q=80',
    aboutEyebrow: 'About Our Service ————',
    aboutHeading: 'Professional Spaces. Purposeful Design.',
    aboutText: 'We create corporate interiors that go beyond aesthetics — designing environments that boost productivity, reflect your brand, and support your people’s daily well-being.',
    aboutImage: 'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&w=1000&q=80',
    stats: [
      { value: '40+', label: 'Projects Delivered' },
      { value: '10+', label: 'Corporate Clients' },
      { value: '100%', label: 'Client Satisfaction' },
    ],
    solutionsEyebrow: 'What We Can Help With ————',
    solutionsHeading: 'Comprehensive Corporate Interior Solutions',
    solutionsLead: 'From high-density collaborative open floors to private C-suite executive chambers, we architect workspaces that foster focus, collaboration, and talent retention.',
    solutionsCards: [
      {
        title: 'Modern Office Spaces',
        tag: 'Workplace Environments',
        description: 'Modern, flexible and inspiring work environments tailored for daily productivity, acoustic comfort, and collaborative agility.',
        features: [
          'Ergonomic sit-stand workstation clusters',
          'Daylight-optimized layout orientation',
          'Acoustic sound-absorbing ceiling baffles',
        ],
        image: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1000&q=80',
        icon: 'office',
      },
      {
        title: 'Meeting & Conference Rooms',
        tag: 'Ideas & Growth',
        description: 'High-performance meeting suites for seamless client pitches, strategy alignment, and interactive hybrid video-conferencing.',
        features: [
          'STC-rated acoustic glass partitions',
          'Concealed video-conference technology',
          'Glare-free 4000K architectural cove lighting',
        ],
        image: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=1000&q=80',
        icon: 'meeting',
      },
      {
        title: 'Reception & Arrival Areas',
        tag: 'First Impressions',
        description: 'Make a lasting first impression on visiting partners with sculptural reception counters and welcoming lounge zoning.',
        features: [
          'Monolithic stone reception counter',
          'Discreet visitor registration staging',
          'Integrated brand identity backdrop wall',
        ],
        image: 'https://images.unsplash.com/photo-1604328698692-f76ea9498e76?auto=format&fit=crop&w=800&q=80',
        icon: 'reception',
      },
      {
        title: 'Executive Leadership Suites',
        tag: 'Leadership Sanctuaries',
        description: 'Sophisticated private suites for C-suite executives, combining confidential meeting areas with personal workspaces.',
        features: [
          'Private ensuite meeting lounge',
          'Bespoke executive veneer joinery',
          'Enhanced acoustic perimeter seals',
        ],
        image: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=800&q=80',
        icon: 'executive',
      },
    ],
    challengesEyebrow: 'Corporate Interior Challenges ————',
    challengesHeading: 'Turning Workplace Challenges into Opportunities',
    challengesLead: 'We understand the complex spatial dilemmas businesses face — and architect solutions balancing density, acoustic peace, and brand character.',
    challengesImage: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1400&q=80',
    challengesList: [
      'Maximizing spatial efficiency for rapidly expanding headcount',
      'Fostering a productive, positive, and collaborative workplace culture',
      'Reflecting authentic brand prestige and values to visiting clients',
      'Designing for agile future scaling and flexible hybrid work models',
    ],
    includesEyebrow: 'What Corporate Interior Design Includes ————',
    includesHeading: 'A Complete Design Experience',
    includesLead: 'From initial spatial planning and 3D visualization to turnkey factory fit-out, we manage every milestone with precision.',
    includesItems: [
      { title: 'Space Planning & Layout Optimization', image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=400&q=70' },
      { title: 'Premium Commercial Material Selection', image: 'https://images.unsplash.com/photo-1615873968403-89e068629265?auto=format&fit=crop&w=400&q=70' },
      { title: 'Lighting & Acoustic Engineering', image: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=400&q=70' },
      { title: 'Custom Furniture & Executive Joinery', image: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=400&q=70' },
      { title: 'Corporate Environmental Branding', image: 'https://images.unsplash.com/photo-1604328698692-f76ea9498e76?auto=format&fit=crop&w=400&q=70' },
      { title: 'Turnkey Fit-Out & Statutory Handover', image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=400&q=70' },
    ],
    faqs: [
      { question: 'What is corporate interior design?', answer: 'Corporate interior design is the strategic planning and technical build of workplaces to maximize productivity, ergonomic well-being, brand identity, and long-term business agility.' },
      { question: 'Do you work with startups as well as large enterprise offices?', answer: 'Yes. We cater to businesses ranging from dynamic 20-seat high-growth startups to expansive multi-floor corporate headquarters with customized BOQ models.' },
      { question: 'How long does a typical corporate fit-out take from concept to handover?', answer: 'Projects typically span 6 to 12 weeks depending on floor area and MEP complexity. We commit to fixed milestone dates backed by strict project timelines.' },
      { question: 'Can you design and execute strictly within our approved budget?', answer: 'Yes. We provide complete transparent Bill of Quantities (BOQ) with zero mid-project cost escalations, locking in specifications prior to commencement.' },
      { question: 'Do you manage HVAC, electrical, and statutory compliance approvals?', answer: 'Yes. Our turnkey scope encompasses all mechanical, electrical, plumbing, fire-life-safety codes, and building management authority clearances.' },
    ],
    ctaEyebrow: 'Let’s Bring Your Vision to Life ————',
    ctaHeading: 'Ready to Create an Exceptional Workspace?',
    ctaSubtitle: 'Partner with Mitijen Interiors for inspiring corporate environments engineered for growth.',
    ctaImage: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=1800&q=80',
  },

  Commercial: {
    eyebrow: 'Commercial Interiors',
    heroHeadline: 'Captivating Commercial Spaces That Drive Business',
    heroSubtitle: 'Design bespoke retail stores, dining pavilions, and boutique commercial venues engineered for customer flow, dwell time, and memorable brand recall.',
    heroImage: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=1800&q=80',
    aboutEyebrow: 'About Our Service ————',
    aboutHeading: 'Architectural Distinction for Forward-Thinking Brands',
    aboutText: 'We shape commercial destinations that balance bold brand storytelling with operational efficiency, customer circulation, and commercial-grade durability.',
    aboutImage: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1000&q=80',
    stats: [
      { value: '50+', label: 'Commercial Venues' },
      { value: '15+', label: 'Brand Partnerships' },
      { value: '100%', label: 'Milestone Delivery' },
    ],
    solutionsEyebrow: 'What We Can Help With ————',
    solutionsHeading: 'Comprehensive Commercial Interior Solutions',
    solutionsLead: 'From flagship retail boutiques to high-energy dining spaces, we engineer environments that captivate customers and drive commercial performance.',
    solutionsCards: [
      {
        title: 'Retail Store Interior Design',
        tag: 'Fashion & Lifestyle',
        description: 'Creating captivating shopping journeys with intuitive merchandise zoning, high-impact focal displays, and spacious change room suites.',
        features: [
          'Customer navigation and decompression threshold design',
          'Flexible modular display fixtures and perimeter shelving',
          'High-CRI accent lighting to showcase merchandise accurately',
        ],
        image: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=1000&q=80',
        icon: 'retail',
      },
      {
        title: 'Showroom & Product Galleries',
        tag: 'Product Galleries',
        description: 'Experiential product galleries and architectural showrooms designed to highlight craftsmanship, luxury goods, and automotive or design collections.',
        features: [
          'Zoned vignette staging for immersive product discovery',
          'Hospitality consultation bars and private client lounges',
          'Interactive digital display integration and gallery sightlines',
        ],
        image: '/assets/CP.jpg',
        icon: 'meeting',
      },
      {
        title: 'Café & Restaurant Interiors',
        tag: 'Hospitality Venues',
        description: 'Atmospheric dining sanctuaries combining sensory acoustics, atmospheric lighting, comfortable seating density, and efficient kitchen pass flows.',
        features: [
          'Multi-zone seating plans: banquettes, communal tables & intimate corners',
          'Acoustic ceiling baffles and reverberation management',
          'Durable, stain-resistant commercial hospitality finishes',
        ],
        image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=800&q=80',
        icon: 'dining',
      },
      {
        title: 'Customer Reception & Waiting Foyers',
        tag: 'First Impressions',
        description: 'Welcoming front-of-house arrival zones that establish immediate brand credibility, warmth, and comfortable customer staging.',
        features: [
          'Sculptural reception desks with concealed administrative tech',
          'Comfortable lounge seating with accessible power points',
          'Branded architectural backdrop walls and curated reading displays',
        ],
        image: '/assets/craft_credenza.jpg',
        icon: 'reception',
      },
    ],
    challengesEyebrow: 'Commercial Interior Challenges ————',
    challengesHeading: 'Turning Commercial Challenges into Growth',
    challengesLead: 'We understand commercial lease pressures and footfall demands — engineering spaces that balance visual allure with durable, code-compliant operations.',
    challengesImage: 'https://images.unsplash.com/photo-1541888946425-d0fbb186c5f7?auto=format&fit=crop&w=1400&q=80',
    challengesList: [
      'Optimizing guest flow and dwell time without congestion bottlenecks',
      'Balancing high-traffic material durability with luxury aesthetics',
      'Aligning spatial atmosphere with distinct commercial brand identity',
      'Navigating strict commercial codes, MEP infrastructure, and egress rules',
    ],
    includesEyebrow: 'What Commercial Interior Design Includes ————',
    includesHeading: 'A Complete Turnkey Commercial Journey',
    includesLead: 'From concept design and 3D visual walkthroughs to bespoke shopfitting and turnkey handover.',
    includesItems: [
      { title: 'Customer Circulation & Dwell Mapping', image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=400&q=70' },
      { title: 'Commercial-Grade Material & Finish Specification', image: 'https://images.unsplash.com/photo-1615873968403-89e068629265?auto=format&fit=crop&w=400&q=70' },
      { title: 'Architectural & Accent Lighting Design', image: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=400&q=70' },
      { title: 'Bespoke Joinery & Display Millwork', image: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=400&q=70' },
      { title: 'Wayfinding & Environmental Branding', image: 'https://images.unsplash.com/photo-1604328698692-f76ea9498e76?auto=format&fit=crop&w=400&q=70' },
      { title: 'Turnkey Fit-Out & Statutory Approvals', image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=400&q=70' },
    ],
    faqs: [
      { question: 'How do you design commercial interiors to increase dwell time and customer spend?', answer: 'We choreograph spatial sightlines, intuitive circulation thresholds, flattering lighting, and tactile material vignettes that invite exploration and linger time.' },
      { question: 'Do you handle landlord technical handbooks and shopping mall criteria?', answer: 'Yes. Our team has extensive experience coordinating with property developers, mall management, and local municipal authorities for full MEP and architectural approvals.' },
      { question: 'What materials do you use to withstand heavy commercial traffic?', answer: 'We specify commercial-grade porcelain, honed natural quartzites, commercial high-pressure laminates, marine ply cores, and low-VOC durable polyurethane finishes.' },
      { question: 'Can you work around strict commercial lease start dates?', answer: 'Yes. We build fast-track delivery schedules and fabricate joinery off-site in our advanced CNC workshop to minimize on-site duration and meet lease rent-free deadlines.' },
      { question: 'Do you offer maintenance and post-handover warranty support?', answer: 'All Mitijen commercial installations carry comprehensive defects-liability warranty support with dedicated aftercare service.' },
    ],
    ctaEyebrow: 'Bring Your Commercial Concept to Life ————',
    ctaHeading: 'Ready to Elevate Your Commercial Presence?',
    ctaSubtitle: 'Partner with Mitijen Interiors for landmark commercial environments that convert customers into advocates.',
    ctaImage: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?auto=format&fit=crop&w=1800&q=80',
  },

  Residential: {
    eyebrow: 'Residential Interiors',
    heroHeadline: 'Timeless Residential Sanctuaries Crafted for Living',
    heroSubtitle: 'Tailored luxury homes blending serene architectural warmth, bespoke joinery, and refined daily comfort for discerning homeowners.',
    heroImage: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1800&q=80',
    aboutEyebrow: 'About Our Service ————',
    aboutHeading: 'Sanctuaries of Comfort, Proportion & Soul',
    aboutText: 'We craft bespoke homes that reflect your family’s rhythm of life — curating natural textures, balanced proportions, and serene illumination.',
    aboutImage: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=1000&q=80',
    stats: [
      { value: '120+', label: 'Private Residences' },
      { value: '15+', label: 'Design Awards' },
      { value: '100%', label: 'Bespoke Craftsmanship' },
    ],
    solutionsEyebrow: 'What We Can Help With ————',
    solutionsHeading: 'Comprehensive Residential Interior Solutions',
    solutionsLead: 'From full-home renovations to bespoke room transformations, we create spaces tailored to your daily rituals, private comfort, and gracious entertaining.',
    solutionsCards: [
      {
        title: 'Living & Entertaining Suites',
        tag: 'Living Architecture',
        description: 'Expansive, light-filled living spaces designed for effortless relaxation, refined hosting, and architectural cohesion.',
        features: [
          'Sightline and daylight optimization',
          'Bespoke architectural media millwork',
          'Tactile natural material palette curation',
        ],
        image: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1000&q=80',
        icon: 'living',
      },
      {
        title: 'Gourmet Architectural Kitchens',
        tag: 'Culinary Spaces',
        description: 'Custom culinary spaces featuring integrated German motion hardware, monolithic stone islands, and concealed preparation pantries.',
        features: [
          'Zero-cavity Gurjan BWP marine ply carcass',
          'Concealed European appliance integration',
          'Ergonomic triangle workflow and smart pantry zoning',
        ],
        image: 'https://images.unsplash.com/photo-1556911220-e15b29be8c8f?auto=format&fit=crop&w=1000&q=80',
        icon: 'kitchen',
      },
      {
        title: 'Master Bedroom Sanctuaries',
        tag: 'Private Suites',
        description: 'Peaceful private bedroom suites with bespoke dressing rooms, acoustic fluted paneling, and ensuite bathroom retreats.',
        features: [
          'Custom walk-in wardrobe joinery systems',
          'Soft ambient 2700K indirect cove illumination',
          'Acoustic STC-rated sound-dampening wall treatments',
        ],
        image: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=800&q=80',
        icon: 'bedroom',
      },
      {
        title: 'Private Studies & Libraries',
        tag: 'Focus & Work',
        description: 'Quiet, acoustically refined home offices and libraries designed for deep concentration, reading, and creative focus.',
        features: [
          'Custom floor-to-ceiling bookshelves and credenzas',
          'Glare-free task lighting and integrated wire management',
          'Solid timber acoustic doors and isolation seals',
        ],
        image: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=800&q=80',
        icon: 'study',
      },
    ],
    challengesEyebrow: 'Residential Interior Challenges ————',
    challengesHeading: 'Transforming Living Spaces into Timeless Homes',
    challengesLead: 'We harmonize complex residential constraints — from structural remodels to personal lifestyle preferences — into cohesive elegance.',
    challengesImage: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1400&q=80',
    challengesList: [
      'Maximizing natural daylight and architectural sightlines throughout the home',
      'Concealing functional household clutter with bespoke architectural cabinetry',
      'Harmonizing contrasting personal tastes into a singular, timeless aesthetic',
      'Selecting non-toxic, pet-and-child durable materials that age gracefully',
    ],
    includesEyebrow: 'What Residential Interior Design Includes ————',
    includesHeading: 'An End-to-End Residential Experience',
    includesLead: 'From initial architectural sketches and 3D visual walkthroughs to precision factory joinery, civil works, and final white-glove styling.',
    includesItems: [
      { title: 'Architectural Space Planning & 3D Visuals', image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=400&q=70' },
      { title: 'Curated Materials, Stone & Palette Curation', image: 'https://images.unsplash.com/photo-1615873968403-89e068629265?auto=format&fit=crop&w=400&q=70' },
      { title: 'Custom Joinery & Modular Wardrobe Systems', image: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=400&q=70' },
      { title: 'Architectural Lighting & Smart Home Controls', image: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=400&q=70' },
      { title: 'Art Curation, Soft Furnishings & Styling', image: 'https://images.unsplash.com/photo-1604328698692-f76ea9498e76?auto=format&fit=crop&w=400&q=70' },
      { title: 'Turnkey Project Management & Handover', image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=400&q=70' },
    ],
    faqs: [
      { question: 'What is included in your residential interior design service?', answer: 'We offer full turnkey residential services: architectural concept drawings, 3D renderings, material selection, factory joinery fabrication, civil execution, lighting layout, and complete interior handover.' },
      { question: 'How much input do we have during the design phase?', answer: 'You are our core collaborator. We begin with an intensive discovery session and present curated mood boards and samples, refining every element until it reflects your family perfectly.' },
      { question: 'What materials do you use for residential cabinetry and wardrobes?', answer: 'We exclusively build with calibrated BWP 710 marine plywood with zero-cavity Gurjan core, German soft-close motion hardware, and non-toxic architectural finishes.' },
      { question: 'How do you prevent budget overruns during home renovations?', answer: 'We deliver an all-inclusive, itemized Bill of Quantities (BOQ) with guaranteed pricing before work starts, eliminating unexpected mid-project cost escalations.' },
      { question: 'How long does a full home interior project typically take?', answer: 'Full residential transformations typically require 8 to 14 weeks from 3D sign-off to move-in day, backed by milestone-locked schedules.' },
    ],
    ctaEyebrow: 'Let’s Shape Your Sanctuary ————',
    ctaHeading: 'Ready to Design Your Dream Residence?',
    ctaSubtitle: 'Partner with Mitijen Interiors for extraordinary residential living crafted around your lifestyle.',
    ctaImage: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1800&q=80',
  },

  Turnkey: {
    eyebrow: 'Turnkey Execution',
    heroHeadline: 'End-to-End Execution with Architectural Precision',
    heroSubtitle: 'Complete single-point turnkey responsibility from approved architectural drawings to handover with fixed timelines and zero cost escalations.',
    heroImage: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1800&q=80',
    aboutEyebrow: 'About Our Service ————',
    aboutHeading: 'Flawless Craftsmanship. Single-Point Accountability.',
    aboutText: 'We orchestrate civil engineering, MEP systems, off-site CNC joinery fabrication, and final white-glove styling under one unified, transparent management process.',
    aboutImage: '/assets/craft_joinery.jpg',
    stats: [
      { value: '180+', label: 'Turnkey Handouts' },
      { value: '0.0%', label: 'Cost Escalation' },
      { value: '10 Yr', label: 'Hardware Warranty' },
    ],
    solutionsEyebrow: 'What We Can Help With ————',
    solutionsHeading: 'Comprehensive Turnkey Execution Solutions',
    solutionsLead: 'Eliminate contractor disputes and timeline delays. Our in-house engineering and fabrication teams deliver complete turnkey precision from foundation to finishes.',
    solutionsCards: [
      {
        title: 'Precision Factory Joinery & Millwork',
        tag: 'Factory Fabrication',
        description: 'Computer-calibrated CNC cut joinery fabricated off-site from certified BWP marine ply with zero site dust, clean finishes, and guaranteed accuracy.',
        features: [
          '0.02mm CNC factory calibration accuracy',
          '100% Gurjan core BWP 710 marine ply',
          'German soft-close motion hardware with 10-year warranty',
        ],
        image: '/assets/craft_joinery.jpg',
        icon: 'turnkey',
      },
      {
        title: 'Civil & Structural Fit-Out',
        tag: 'Site Engineering',
        description: 'Demolition, drywall partitioning, Italian marble flooring installation, and structural alterations executed strictly to architectural drawings.',
        features: [
          'Laser-aligned partition framing & ceiling drops',
          'Specialist tile & stone levelling systems',
          'Dedicated on-site architectural site engineer',
        ],
        image: '/assets/mitijen/deco2.jpeg',
        icon: 'office',
      },
      {
        title: 'MEP, HVAC & Smart Automation',
        tag: 'Technical Infrastructure',
        description: 'Complete electrical conduit routing, plumbing, balanced HVAC air distribution, and integrated architectural scene controls.',
        features: [
          'Balanced CFM air distribution and acoustic ducts',
          'Concealed fire and safety compliance infrastructure',
          'Automated architectural dimming and scene controls',
        ],
        image: '/assets/forma_facade.jpg',
        icon: 'executive',
      },
      {
        title: 'Architectural Coatings & Wall Finishes',
        tag: 'Surface Textures',
        description: 'Flawless micro-cement, Venetian lime plaster, acoustic fabric wall panels, and low-VOC designer architectural coatings.',
        features: [
          'Multi-coat surface priming and mesh reinforcement',
          'Seamless corner bead detailing and shadow gaps',
          'Durable, washable architectural finish coatings',
        ],
        image: '/assets/I3.jpg',
        icon: 'reception',
      },
    ],
    challengesEyebrow: 'Turnkey Fit-Out Challenges ————',
    challengesHeading: 'Turning Execution Risks into Predictable Certainty',
    challengesLead: 'We eliminate the traditional friction of multiple uncoordinated subcontractors with our unified, in-house turnkey delivery system.',
    challengesImage: 'https://images.unsplash.com/photo-1541888946425-d0fbb186c5f7?auto=format&fit=crop&w=1400&q=80',
    challengesList: [
      'Eliminating unexpected mid-project cost escalations with locked BOQs',
      'Preventing messy site dust and delays with off-site factory joinery',
      'Ensuring strict adherence to civil, electrical, and HVAC safety standards',
      'Delivering move-in ready handover with complete defects-liability protection',
    ],
    includesEyebrow: 'What Turnkey Execution Includes ————',
    includesHeading: 'A Seamless Construction-to-Handover Journey',
    includesLead: 'Complete single-point project accountability backed by dedicated site engineers and quality audit milestones.',
    includesItems: [
      { title: 'Detailed Construction Drawings & Bill of Quantities', image: 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=400&q=70' },
      { title: 'Off-Site CNC Factory Joinery Fabrication', image: '/assets/craft_joinery.jpg' },
      { title: 'Electrical, Plumbing & HVAC Coordination', image: 'https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&w=400&q=70' },
      { title: 'Civil Partitioning & Stone Flooring', image: 'https://images.unsplash.com/photo-1556761175-5973dc0f32e7?auto=format&fit=crop&w=400&q=70' },
      { title: 'Paint, Lime Plaster & Acoustic Wall Coverings', image: 'https://images.unsplash.com/photo-1604328698692-f76ea9498e76?auto=format&fit=crop&w=400&q=70' },
      { title: 'Deep Cleaning, Snag Rectification & Keys Handover', image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=400&q=70' },
    ],
    faqs: [
      { question: 'What does "turnkey" mean in your interior services?', answer: '"Turnkey" means we take complete, 100% single-point accountability for everything: civil works, joinery, electrical, plumbing, finishes, procurement, and handover. You receive the keys to a move-in ready space.' },
      { question: 'How do you guarantee zero cost escalations?', answer: 'We freeze the complete architectural specification and Bill of Quantities (BOQ) before mobilization. Any technical contingencies are absorbed within our fixed project quotation.' },
      { question: 'Where is your furniture and modular joinery manufactured?', answer: 'All joinery is fabricated in our own advanced climate-controlled CNC facility using calibrated German machinery, eliminating site sawdust and inconsistent hand-finishes.' },
      { question: 'How do you report site progress during construction?', answer: 'You receive weekly scheduled photo/video walkthroughs, milestone checklists, and direct communication with your dedicated site project manager.' },
      { question: 'What warranty is provided upon project handover?', answer: 'We provide a 10-year warranty on all structural hardware and a 1-year comprehensive defects-liability warranty covering all workmanship.' },
    ],
    ctaEyebrow: 'Start Your Turnkey Project ————',
    ctaHeading: 'Ready for Hassle-Free Turnkey Execution?',
    ctaSubtitle: 'Partner with Mitijen Interiors for stress-free interior buildouts with guaranteed milestones and superior craftsmanship.',
    ctaImage: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?auto=format&fit=crop&w=1800&q=80',
  },
};

// SVG Icon Helper for Card Badges
const CardIcon: React.FC<{ type: SolutionCard['icon'] }> = ({ type }) => {
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
    case 'retail':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M3 9l2-5h14l2 5M3 9v11a1 1 0 001 1h16a1 1 0 001-1V9M3 9h18" />
        </svg>
      );
    case 'dining':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M18 8v10M6 8v10M6 8a4 4 0 018 0M10 8v10" />
        </svg>
      );
    case 'living':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M4 11V7a2 2 0 012-2h12a2 2 0 012 2v4M2 13v5a2 2 0 002 2h16a2 2 0 002-2v-5a2 2 0 00-2-2H4a2 2 0 00-2 2z" />
        </svg>
      );
    case 'kitchen':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M12 3v18M3 8h18M3 16h18" />
        </svg>
      );
    case 'bedroom':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M3 7v13M21 7v13M3 14h18M6 7h12a3 3 0 013 3v4H3v-4a3 3 0 013-3z" />
        </svg>
      );
    case 'study':
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M4 19.5A2.5 2.5 0 016.5 17H20M4 19.5A2.5 2.5 0 006.5 22H20V2H6.5A2.5 2.5 0 004 4.5v15z" />
        </svg>
      );
    case 'turnkey':
    default:
      return (
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
          <path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z" />
        </svg>
      );
  }
};

export const ServicePageTemplate: React.FC<ServicePageTemplateProps> = ({
  data,
  children,
  initialDiscipline,
  overrideHeroEyebrow,
  overrideHeroHeadline,
  overrideHeroSubtitle,
  isOverviewPage,
}) => {
  const { openInquiry } = useInquiry();

  // Active discipline state — initialized from URL hash, initialDiscipline, or route data
  const getInitialCategory = (): ServiceDiscipline => {
    if (typeof window !== 'undefined' && window.location.hash) {
      const hash = window.location.hash.toLowerCase().replace('#', '');
      if (hash.includes('residential')) return 'Residential';
      if (hash.includes('commercial')) return 'Commercial';
      if (hash.includes('corporate')) return 'Corporate';
      if (hash.includes('turnkey')) return 'Turnkey';
    }
    return initialDiscipline || (data?.category as ServiceDiscipline) || 'Corporate';
  };

  const [activeCategory, setActiveCategory] = useState<ServiceDiscipline>(getInitialCategory);

  // Sync state if user navigates via router
  useEffect(() => {
    if (data?.category && (data.category as ServiceDiscipline) !== activeCategory) {
      setActiveCategory(data.category as ServiceDiscipline);
    }
  }, [data?.category]);

  const config = DISCIPLINE_DATA[activeCategory] || DISCIPLINE_DATA.Corporate;

  const pathMap: Record<ServiceDiscipline, string> = {
    Corporate: '/services/corporate-interior-design',
    Commercial: '/services/commercial-interior-design',
    Residential: '/services/residential-interior-design',
    Turnkey: '/services#turnkey',
  };

  // In-place tab switcher: updates state and URL without reloading or jumping to top
  const handleSwitchCategory = (cat: ServiceDiscipline, e?: React.MouseEvent) => {
    if (e) e.preventDefault();
    setActiveCategory(cat);

    if (isOverviewPage) {
      window.history.replaceState(null, '', `/services#${cat.toLowerCase()}`);
    } else if (pathMap[cat] && window.location.pathname !== pathMap[cat]) {
      // Use replaceState to update the browser address bar cleanly without triggering ScrollToTop
      window.history.replaceState(null, '', pathMap[cat]);
    }
  };

  // Accordion state
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0);
  const toggleFaq = (index: number) => {
    setOpenFaqIndex(prev => (prev === index ? null : index));
  };

  const serviceCategories: ServiceDiscipline[] = ['Corporate', 'Residential', 'Commercial', 'Turnkey'];

  const heroEyebrow = (isOverviewPage && overrideHeroEyebrow) ? overrideHeroEyebrow : config.eyebrow;
  const heroHeadline = (isOverviewPage && overrideHeroHeadline) ? overrideHeroHeadline : config.heroHeadline;
  const heroSubtitle = (isOverviewPage && overrideHeroSubtitle) ? overrideHeroSubtitle : config.heroSubtitle;

  return (
    <div className="mitijen-service-page">
      <SEO
        title={data.seo.title}
        description={data.seo.description}
        canonical={data.seo.canonical}
        ogImage={data.seo.ogImage}
      />

      {/* ====================================================================
          STICKY IN-PAGE SERVICE SWITCHER BAR
          (Allows instant in-place switching without scrolling to top)
          ==================================================================== */}
      <nav className="svc-switcher-wrap" aria-label="Interior Design Disciplines">
        <div className="wrap svc-switcher-inner">
          <div className="svc-switcher-tabs" role="tablist">
            {serviceCategories.map(cat => {
              const isActive = activeCategory === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  className={`svc-tab-btn ${isActive ? 'is-active' : ''}`}
                  onClick={e => handleSwitchCategory(cat, e)}
                >
                  <span>{cat}</span>
                  {isActive && <span className="svc-tab-line" aria-hidden="true" />}
                </button>
              );
            })}
          </div>
        </div>
      </nav>

      {/* ====================================================================
          02 HERO SECTION (BALANCED EDITORIAL DESKTOP & MOBILE)
          ==================================================================== */}
      <section className="hero">
        <div className="wrap hero-grid">
          <div className="hero-copy">
            <span className="eyebrow">{heroEyebrow}</span>
            <h1>{heroHeadline}</h1>
            <p>{heroSubtitle}</p>
            <div className="hero-actions">
              <button
                type="button"
                onClick={() => openInquiry(`${activeCategory} — Hero Consultation`)}
                className="btn"
              >
                Consult Our Experts
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                  <path d="M4 12h16M14 6l6 6-6 6" />
                </svg>
              </button>
              <div className="scroll-indicator">
                <i />
                <span>Scroll to explore</span>
              </div>
            </div>
          </div>

          <div className="hero-media">
            <img
              src={config.heroImage}
              alt={config.heroHeadline}
              loading="eager"
            />
          </div>
        </div>
      </section>

      {/* ====================================================================
          03 INTRO SECTION (CONCENTRIC ARCH & 3-COLUMN STATS)
          ==================================================================== */}
      <section className="intro">
        <div className="wrap intro-grid">
          <div className="arch-wrap">
            <div className="arch-concentric-rings" aria-hidden="true">
              <div className="arch-ring-1" />
              <div className="arch-ring-2" />
            </div>
            <div className="arch-photo">
              <img
                src={config.aboutImage}
                alt={config.aboutHeading}
                loading="lazy"
              />
            </div>
          </div>

          <div className="intro-content">
            <span className="eyebrow">{config.aboutEyebrow}</span>
            <h2>{config.aboutHeading}</h2>
            <p className="lead">{config.aboutText}</p>

            <div className="intro-stats-row">
              {config.stats.map(s => (
                <div key={s.label} className="intro-stat-item">
                  <span className="intro-stat-val">{s.value}</span>
                  <span className="intro-stat-lbl">{s.label}</span>
                </div>
              ))}
            </div>

            <button
              type="button"
              onClick={() => openInquiry(`${activeCategory} — About Section Consultation`)}
              className="btn"
              style={{ alignSelf: 'flex-start' }}
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
          04 SOLUTIONS SECTION: "WHAT WE CAN HELP WITH" (FULL-WIDTH 4-CARD GRID)
          ==================================================================== */}
      <section className="solutions-section" id="solutions">
        <div className="wrap">
          <div className="solutions-header">
            <div>
              <span className="eyebrow">{config.solutionsEyebrow}</span>
              <h2>{config.solutionsHeading}</h2>
            </div>
            <p className="lead">{config.solutionsLead}</p>
          </div>

          <div className="cards-grid">
            {config.solutionsCards.map(card => (
              <article key={card.title} className="solution-card">
                <div className="card-media-wrap">
                  <img src={card.image} alt={card.title} loading="lazy" />
                  <div className="card-badge-ico" aria-hidden="true">
                    <CardIcon type={card.icon} />
                  </div>
                </div>

                <div className="card-body">
                  <span className="card-tag">{card.tag}</span>
                  <h3 className="card-title">{card.title}</h3>
                  <p className="card-desc">{card.description}</p>

                  <ul className="card-features-list">
                    {card.features.map(feat => (
                      <li key={feat} className="card-feature-item">
                        <svg viewBox="0 0 20 20" fill="currentColor">
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <span>{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>

          <div className="practice-detail-cta-row">
            <p className="practice-cta-text">
              Looking for full architectural specifications, technical drawings, and completed projects for {activeCategory} interiors?
            </p>
            <a
              href={pathMap[activeCategory] || '/contact'}
              onClick={(e) => {
                if (activeCategory === 'Turnkey') {
                  e.preventDefault();
                  openInquiry('Turnkey Interior Execution Inquiry');
                }
              }}
              className="btn light"
            >
              <span>{activeCategory === 'Turnkey' ? 'Request Turnkey Fit-Out Quote' : `Explore Dedicated ${activeCategory} Page`}</span>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                <path d="M4 12h16M14 6l6 6-6 6" />
              </svg>
            </a>
          </div>
        </div>
      </section>

      {/* ====================================================================
          05 CHALLENGES SECTION (ASYMMETRICAL ARCHED FACADE)
          ==================================================================== */}
      <section className="challenges">
        <div className="wrap challenges-grid">
          <div className="ch-media">
            <img
              src={config.challengesImage}
              alt={config.challengesHeading}
              loading="lazy"
            />
          </div>

          <div className="ch-copy">
            <span className="eyebrow">{config.challengesEyebrow}</span>
            <h2>{config.challengesHeading}</h2>
            <p className="lead">{config.challengesLead}</p>

            <ol className="ch-list">
              {config.challengesList.map((item, idx) => (
                <li key={item} className="ch-item">
                  <span className="ch-num">0{idx + 1}</span>
                  <span className="ch-text">{item}</span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* ====================================================================
          06 WHAT IT INCLUDES SECTION (2x3 CATALOG GRID)
          ==================================================================== */}
      <section className="includes-section">
        <div className="wrap includes-grid">
          <div className="includes-intro">
            <span className="eyebrow">{config.includesEyebrow}</span>
            <h2>{config.includesHeading}</h2>
            <p className="lead">{config.includesLead}</p>
            <button
              type="button"
              onClick={() => openInquiry(`${activeCategory} — Includes Consultation`)}
              className="btn"
            >
              Start Your Project
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                <path d="M4 12h16M14 6l6 6-6 6" />
              </svg>
            </button>
          </div>

          <div className="includes-cards-grid">
            {config.includesItems.map(item => (
              <div key={item.title} className="inc-card">
                <div className="inc-card-media">
                  <img src={item.image} alt={item.title} loading="lazy" />
                </div>
                <div className="inc-card-title">{item.title}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ====================================================================
          07 HOW IT WORKS SECTION (Seamless Integration)
          ==================================================================== */}
      {children ? children : <HowItWorksSection />}

      {/* ====================================================================
          08 FREQUENTLY ASKED QUESTIONS SECTION
          ==================================================================== */}
      <section className="faq-section">
        <div className="wrap faq-grid">
          <div className="faq-intro">
            <span className="eyebrow">Frequently Asked Questions ————</span>
            <h2>Your Questions, Answered</h2>
            <p className="lead">
              Get clear answers to common questions about our {activeCategory.toLowerCase()} design and turnkey delivery process.
            </p>
            <div className="faq-media">
              <img
                src={config.aboutImage}
                alt="Architectural space details"
                loading="lazy"
              />
            </div>
          </div>

          <div className="faq-list">
            {config.faqs.map((faq, idx) => {
              const isOpen = openFaqIndex === idx;
              const buttonId = `faq-btn-${idx}`;
              const panelId = `faq-panel-${idx}`;
              return (
                <div key={faq.question} className="faq-item">
                  <h3>
                    <button
                      type="button"
                      aria-expanded={isOpen}
                      aria-controls={panelId}
                      id={buttonId}
                      className="faq-trigger-btn"
                      onClick={() => toggleFaq(idx)}
                    >
                      <span>{faq.question}</span>
                      <span className="faq-toggle-ico" aria-hidden="true" />
                    </button>
                  </h3>
                  <div
                    className="faq-panel"
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
          09 FINAL CONSULTATION CTA BANNER
          ==================================================================== */}
      <section className="final-cta-section">
        <div className="wrap">
          <div className="final-cta-banner">
            <div className="final-cta-content">
              <span className="eyebrow" style={{ color: 'var(--gold)' }}>
                {config.ctaEyebrow}
              </span>
              <h2>{config.ctaHeading}</h2>
              <p>{config.ctaSubtitle}</p>
              <button
                type="button"
                onClick={() => openInquiry(`${activeCategory} — Final CTA Consultation`)}
                className="btn light"
              >
                Book a Consultation
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
                  <path d="M4 12h16M14 6l6 6-6 6" />
                </svg>
              </button>
            </div>

            <div className="final-cta-media">
              <img src={config.ctaImage} alt="" loading="lazy" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ServicePageTemplate;
