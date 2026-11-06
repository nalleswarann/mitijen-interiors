import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import type { ServicePageData } from '../data/servicesData';
import { SEO } from './common/SEO';
import { useInquiry } from '../context/useInquiry';
import '../styles/ServicePage.css';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface ServicePageTemplateProps {
  data: ServicePageData;
  children?: React.ReactNode;
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
  stats: Array<{ number: string; label: string }>;
  solutionsEyebrow: string;
  solutionsHeading: string;
  solutionsSubtitle: string;
  solutionsCards: Array<{
    title: string;
    description: string;
    image: string;
    iconType: 'office' | 'meeting' | 'reception' | 'executive';
  }>;
  challengesEyebrow: string;
  challengesHeading: string;
  challengesSubtitle: string;
  challengesImage: string;
  challengesList: string[];
  deliverablesEyebrow: string;
  deliverablesHeading: string;
  deliverablesSubtitle: string;
  deliverablesCards: Array<{
    title: string;
    image: string;
  }>;
  philosophyEyebrow: string;
  philosophyHeading: string;
  philosophyCol1Title: string;
  philosophyCol1Text: string;
  philosophyCol2Title: string;
  philosophyCol2Text: string;
  metrics: Array<{
    value: string;
    unit?: string;
    label: string;
    sub: string;
  }>;
  ctaEyebrow: string;
  ctaHeading: string;
  ctaSubtitle: string;
  ctaImage: string;
}

const EDITORIAL_CONFIG: Record<'Corporate' | 'Commercial' | 'Residential', DisciplineEditorialConfig> = {
  Corporate: {
    eyebrow: 'CORPORATE INTERIORS',
    heroHeadline: "Let's Design Workspaces That Inspire",
    heroSubtitle: 'Create productive, elegant and people-centric workspaces with Mitjen Interiors.',
    heroImage: '/assets/I2.jpg',
    aboutEyebrow: 'ABOUT OUR SERVICE —',
    aboutHeading: 'Professional Spaces. Purposeful Design.',
    aboutText:
      'We create corporate interiors that go beyond aesthetics — designing environments that boost productivity, reflect your brand, and support your people’s well-being.',
    aboutImage: '/assets/I3.jpg',
    stats: [
      { number: '40+', label: 'Projects Delivered' },
      { number: '10+', label: 'Corporate Clients' },
      { number: '100%', label: 'Client Satisfaction' },
    ],
    solutionsEyebrow: 'WHAT WE CAN HELP WITH —',
    solutionsHeading: 'Comprehensive Corporate Interior Solutions',
    solutionsSubtitle:
      'From modern offices to collaborative workspaces, we design spaces that work beautifully for your business.',
    solutionsCards: [
      {
        title: 'Office Spaces',
        description: 'Modern, flexible and inspiring work environments.',
        image: '/assets/I1.jpg',
        iconType: 'office',
      },
      {
        title: 'Meeting & Conference',
        description: 'Spaces for ideas, collaboration and growth.',
        image: '/assets/I3.jpg',
        iconType: 'meeting',
      },
      {
        title: 'Reception Areas',
        description: 'Make a lasting first impression on visiting clients.',
        image: '/assets/craft_stone_vanity.jpg',
        iconType: 'reception',
      },
      {
        title: 'Executive Spaces',
        description: 'Sophisticated private sanctuaries for leadership.',
        image: '/assets/transformations/bedroom_after.jpg',
        iconType: 'executive',
      },
    ],
    challengesEyebrow: 'CORPORATE INTERIOR CHALLENGES',
    challengesHeading: 'Turning Workplace Challenges into Opportunities',
    challengesSubtitle:
      'We understand the unique challenges businesses face — and design solutions that balance functionality, aesthetics and employee well-being.',
    challengesImage: '/assets/forma_facade.jpg',
    challengesList: [
      'Maximizing space for growing teams',
      'Creating a productive and positive work culture',
      'Reflecting your brand identity',
      'Designing for flexibility and future growth',
    ],
    deliverablesEyebrow: 'WHAT CORPORATE INTERIOR DESIGN INCLUDES',
    deliverablesHeading: 'A Complete Design Experience',
    deliverablesSubtitle:
      'From concept to completion, we handle every detail with precision and care.',
    deliverablesCards: [
      { title: 'Space Planning & Layout Optimization', image: '/assets/craft_credenza.jpg' },
      { title: 'Premium Material Selection', image: '/assets/craft_stone_vanity.jpg' },
      { title: 'Lighting Design', image: '/assets/panorama_bath.jpg' },
      { title: 'Custom Furniture & Furnishings', image: '/assets/mitijen/deco3.jpeg' },
      { title: 'Brand Integration', image: '/assets/mitijen/deco2.jpeg' },
      { title: 'Turnkey Execution', image: '/assets/craft_joinery.jpg' },
    ],
    philosophyEyebrow: 'DESIGN PHILOSOPHY & WORKPLACE STANDARDS',
    philosophyHeading:
      'A high-performance workplace must support diverse cognitive working modes throughout the business day.',
    philosophyCol1Title: 'Acoustic Engineering & Privacy',
    philosophyCol1Text:
      'High-performing offices balance vibrant open collaboration with deep acoustic focus. We engineer sound-absorbing baffle ceilings, STC-rated glass partitions, and quiet focus booths to minimize cognitive fatigue.',
    philosophyCol2Title: 'Daylight & Ergonomic Well-Being',
    philosophyCol2Text:
      'Every workstation layout is oriented around natural daylight penetration. We pair glare-free 4000K architectural cove lighting with BIFMA-certified ergonomic seating and sit-stand desks for sustained daily focus.',
    metrics: [
      { value: '0.02', unit: 'mm', label: 'CNC Millwork Precision', sub: 'Factory-calibrated joinery' },
      { value: '100', unit: '%', label: 'BWP 710 Marine Ply', sub: 'Zero-cavity Gurjan core' },
      { value: '10', unit: 'Yr', label: 'Structural Hardware', sub: 'German motion warranty' },
      { value: '0.0', unit: '%', label: 'Mid-Project Escalation', sub: 'Fixed transparent BOQ' },
    ],
    ctaEyebrow: "LET'S BRING YOUR VISION TO LIFE",
    ctaHeading: 'Ready to Create an Exceptional Workspace?',
    ctaSubtitle: 'Partner with Mitjen Interiors for inspiring corporate spaces.',
    ctaImage: '/assets/hero_cinematic.jpg',
  },
  Commercial: {
    eyebrow: 'COMMERCIAL INTERIORS',
    heroHeadline: 'Designing Experiential Spaces That Elevate Brands',
    heroSubtitle:
      'Create high-impact, welcoming and revenue-driving commercial environments with Mitjen Interiors.',
    heroImage: '/assets/CS.jpg',
    aboutEyebrow: 'ABOUT OUR SERVICE —',
    aboutHeading: 'Memorable Venues. Brand-Led Design.',
    aboutText:
      'We engineer commercial interiors that captivate foot traffic, prolong customer dwell time, and translate brand narratives into immersive spatial architecture.',
    aboutImage: '/assets/CP.jpg',
    stats: [
      { number: '60+', label: 'Venues Crafted' },
      { number: '25+', label: 'Flagship Brands' },
      { number: '99%', label: 'On-Time Handover' },
    ],
    solutionsEyebrow: 'WHAT WE CAN HELP WITH —',
    solutionsHeading: 'Comprehensive Commercial Interior Solutions',
    solutionsSubtitle:
      'From flagship retail to boutique hospitality, we design spaces that captivate and drive engagement.',
    solutionsCards: [
      {
        title: 'Retail & Flagships',
        description: 'High-conversion retail floor plans and display architecture.',
        image: '/assets/CS.jpg',
        iconType: 'office',
      },
      {
        title: 'Cafes & Dining',
        description: 'Atmospheric hospitality environments that drive repeat visits.',
        image: '/assets/mitijen/warm1.jpeg',
        iconType: 'meeting',
      },
      {
        title: 'Public Foyers',
        description: 'Engaging arrival zones with intuitive customer circulation.',
        image: '/assets/mitijen/deco1.jpeg',
        iconType: 'reception',
      },
      {
        title: 'Commercial Fit-Outs',
        description: 'High-specification turnkey buildouts for ambitious venues.',
        image: '/assets/PHOTO.jpg',
        iconType: 'executive',
      },
    ],
    challengesEyebrow: 'COMMERCIAL INTERIOR CHALLENGES',
    challengesHeading: 'Turning Commercial Challenges into Growth',
    challengesSubtitle:
      'We understand commercial lease pressures — and engineer spaces that balance visual allure with durable, code-compliant operations.',
    challengesImage: '/assets/forma_facade.jpg',
    challengesList: [
      'Captivating foot traffic and extending customer dwell time',
      'Translating brand narrative into tactile materials',
      'Strict commercial lease, egress & fire code compliance',
      'Fast-track turnkey execution to minimize rent downtime',
    ],
    deliverablesEyebrow: 'WHAT COMMERCIAL INTERIOR DESIGN INCLUDES',
    deliverablesHeading: 'A Complete Design Experience',
    deliverablesSubtitle:
      'From concept to completion, we handle every detail with precision and care.',
    deliverablesCards: [
      { title: 'Circulation & Dwell Time Planning', image: '/assets/craft_credenza.jpg' },
      { title: 'Commercial Material Specification', image: '/assets/craft_stone_vanity.jpg' },
      { title: 'Dramatic Architectural Lighting', image: '/assets/panorama_bath.jpg' },
      { title: 'Bespoke Display Joinery', image: '/assets/craft_shelving.jpg' },
      { title: 'Environmental Brand Touchpoints', image: '/assets/mitijen/deco2.jpeg' },
      { title: 'Turnkey MEP & Build Coordination', image: '/assets/craft_joinery.jpg' },
    ],
    philosophyEyebrow: 'DESIGN PHILOSOPHY & COMMERCIAL IMPACT',
    philosophyHeading:
      "Commercial architecture is the physical embodiment of a brand's promise to its audience.",
    philosophyCol1Title: 'Circulation & Customer Psychology',
    philosophyCol1Text:
      'Every commercial layout is choreographed to guide natural movement, eliminate visual clutter, and draw customer gaze toward hero product showcases and hospitality touchpoints.',
    philosophyCol2Title: 'Commercial-Grade Material Endurance',
    philosophyCol2Text:
      'We specify high-traffic stone surfaces, anti-scratch finishes, and solid timber detailing built to maintain pristine aesthetic appeal despite thousands of daily visitors.',
    metrics: [
      { value: '0.02', unit: 'mm', label: 'CNC Millwork Precision', sub: 'Factory-calibrated joinery' },
      { value: '100', unit: '%', label: 'BWP 710 Marine Ply', sub: 'Zero-cavity Gurjan core' },
      { value: '10', unit: 'Yr', label: 'Structural Hardware', sub: 'German motion warranty' },
      { value: '0.0', unit: '%', label: 'Mid-Project Escalation', sub: 'Fixed transparent BOQ' },
    ],
    ctaEyebrow: "LET'S BRING YOUR VISION TO LIFE",
    ctaHeading: 'Ready to Elevate Your Commercial Presence?',
    ctaSubtitle: 'Partner with Mitjen Interiors for unforgettable brand spaces.',
    ctaImage: '/assets/CL.jpg',
  },
  Residential: {
    eyebrow: 'RESIDENTIAL INTERIORS',
    heroHeadline: 'Bespoke Living Sanctuaries Crafted for Everyday Life',
    heroSubtitle:
      'Transform empty spaces into timeless, functional, and deeply personal homes with Mitjen Interiors.',
    heroImage: '/assets/CL.jpg',
    aboutEyebrow: 'ABOUT OUR SERVICE —',
    aboutHeading: 'Quiet Elegance. Living Architecture.',
    aboutText:
      'We design private residences that balance serene aesthetics with the physical realities of family living, daylight orientation, and effortless storage.',
    aboutImage: '/assets/mitijen/Banner3.jpg',
    stats: [
      { number: '150+', label: 'Homes Handed Over' },
      { number: '15+', label: 'Years Durability' },
      { number: '100%', label: 'Fixed BOQ Guarantee' },
    ],
    solutionsEyebrow: 'WHAT WE CAN HELP WITH —',
    solutionsHeading: 'Comprehensive Residential Interior Solutions',
    solutionsSubtitle:
      'From complete apartment fit-outs to private luxury villas, we design spaces that elevate everyday living.',
    solutionsCards: [
      {
        title: 'Living & Social Sanctuaries',
        description: 'Fluid open-plan living, dining, and custom entertainment walls.',
        image: '/assets/transformations/lounge_after.jpg',
        iconType: 'office',
      },
      {
        title: 'Modular Kitchen Planning',
        description: 'Ergonomic culinary workspaces with German Blum motion hardware.',
        image: '/assets/mitijen/deco-kitchen.jpeg',
        iconType: 'meeting',
      },
      {
        title: 'Master Bedroom Suites',
        description: 'Acoustically insulated private retreats with bespoke walk-in wardrobes.',
        image: '/assets/mitijen/bedroom.jpeg',
        iconType: 'reception',
      },
      {
        title: 'Turnkey Civil Execution',
        description: 'Single-point architectural execution from masonry to final handover.',
        image: '/assets/craft_joinery.jpg',
        iconType: 'executive',
      },
    ],
    challengesEyebrow: 'RESIDENTIAL INTERIOR CHALLENGES',
    challengesHeading: 'Turning Living Challenges into Serenity',
    challengesSubtitle:
      'We address homeowner concerns early — from carpentry guesswork to material moisture resistance — with transparent architectural rigor.',
    challengesImage: '/assets/forma_facade.jpg',
    challengesList: [
      'Maximizing storage without cluttering visual living sightlines',
      'Eliminating contractor guesswork and unexpected cost spikes',
      'Protecting cabinetry from moisture swelling, warping and termites',
      'Achieving lighting and finish cohesion across different family zones',
    ],
    deliverablesEyebrow: 'WHAT RESIDENTIAL INTERIOR DESIGN INCLUDES',
    deliverablesHeading: 'A Complete Design Experience',
    deliverablesSubtitle:
      'From concept to completion, we handle every detail with precision and care.',
    deliverablesCards: [
      { title: 'Space Planning & Daylighting Optimization', image: '/assets/craft_credenza.jpg' },
      { title: 'Marine Ply & Hardwood Selection', image: '/assets/craft_stone_vanity.jpg' },
      { title: 'Architectural Cove & Mood Lighting', image: '/assets/panorama_bath.jpg' },
      { title: 'Custom Walk-In Wardrobes & Millwork', image: '/assets/craft_wardrobe.jpg' },
      { title: 'Tactile Natural Stone & Veneers', image: '/assets/mitijen/warm3.jpeg' },
      { title: 'Turnkey Civil Execution & Handover', image: '/assets/craft_joinery.jpg' },
    ],
    philosophyEyebrow: 'DESIGN PHILOSOPHY & LIVING STANDARDS',
    philosophyHeading:
      'We do not decorate rooms. We sculpt volumes of light, proportion, and natural permanence.',
    philosophyCol1Title: 'Spatial Flow & Daylight Paths',
    philosophyCol1Text:
      "Every plan begins with Krishnagiri's solar path. We position active morning zones to capture gentle dawn light, while screening afternoon glare and creating peaceful evening alcoves.",
    philosophyCol2Title: 'Zero-Tolerance Joinery & Materials',
    philosophyCol2Text:
      'We exclusively specify boiling-water-proof (BWP 710) Gurjan-core marine plywood, soft-close German concealed hardware, and natural stone slabs cut to 0.5mm joint tolerances.',
    metrics: [
      { value: '0.02', unit: 'mm', label: 'CNC Millwork Precision', sub: 'Factory-calibrated joinery' },
      { value: '100', unit: '%', label: 'BWP 710 Marine Ply', sub: 'Zero-cavity Gurjan core' },
      { value: '10', unit: 'Yr', label: 'Structural Hardware', sub: 'German motion warranty' },
      { value: '0.0', unit: '%', label: 'Mid-Project Escalation', sub: 'Fixed transparent BOQ' },
    ],
    ctaEyebrow: "LET'S BRING YOUR VISION TO LIFE",
    ctaHeading: 'Ready to Craft Your Private Living Sanctuary?',
    ctaSubtitle: 'Partner with Mitjen Interiors for timeless residential architecture.',
    ctaImage: '/assets/transformations/lounge_after.jpg',
  },
};

// Line Icon Helper for Solutions Cards
const SolutionIcon: React.FC<{ type: 'office' | 'meeting' | 'reception' | 'executive' }> = ({ type }) => {
  switch (type) {
    case 'office':
      return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
          <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
        </svg>
      );
    case 'meeting':
      return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
          <circle cx="9" cy="7" r="4" />
          <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
          <path d="M16 3.13a4 4 0 0 1 0 7.75" />
        </svg>
      );
    case 'reception':
      return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 21h18M5 21V7l8-4v18M19 21V11l-6-3" />
          <path d="M9 9h1M9 13h1M9 17h1" />
        </svg>
      );
    case 'executive':
      return (
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
          <path d="M6 3h12l4 6-10 12L2 9z" />
          <path d="M11 3L8 9l4 12 4-12-3-6" />
          <path d="M2 9h20" />
        </svg>
      );
    default:
      return null;
  }
};

// Botanical Olive/Eucalyptus Branch Sketch SVG
const BotanicalSketch: React.FC = () => (
  <svg
    className="editorial-botanical-svg"
    viewBox="0 0 120 220"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-hidden="true"
  >
    <path
      d="M60 210C60 160 55 110 75 20"
      stroke="#A48A65"
      strokeWidth="1.2"
      strokeLinecap="round"
      strokeOpacity="0.45"
    />
    <path
      d="M72 40C85 35 95 42 98 48C90 54 80 50 72 40Z"
      fill="#A48A65"
      fillOpacity="0.2"
      stroke="#A48A65"
      strokeWidth="1"
      strokeOpacity="0.5"
    />
    <path
      d="M68 65C52 58 45 68 42 75C50 78 62 76 68 65Z"
      fill="#A48A65"
      fillOpacity="0.2"
      stroke="#A48A65"
      strokeWidth="1"
      strokeOpacity="0.5"
    />
    <path
      d="M66 95C80 88 90 95 94 102C84 108 74 105 66 95Z"
      fill="#A48A65"
      fillOpacity="0.2"
      stroke="#A48A65"
      strokeWidth="1"
      strokeOpacity="0.5"
    />
    <path
      d="M62 125C46 118 38 128 35 135C44 140 56 136 62 125Z"
      fill="#A48A65"
      fillOpacity="0.2"
      stroke="#A48A65"
      strokeWidth="1"
      strokeOpacity="0.5"
    />
    <path
      d="M60 155C75 148 85 155 88 162C78 168 68 165 60 155Z"
      fill="#A48A65"
      fillOpacity="0.2"
      stroke="#A48A65"
      strokeWidth="1"
      strokeOpacity="0.5"
    />
  </svg>
);

export const ServicePageTemplate: React.FC<ServicePageTemplateProps> = ({ data, children }) => {
  const { openInquiry } = useInquiry();
  const location = useLocation();
  const pageRef = useRef<HTMLDivElement>(null);

  // Accordion state for FAQs (first open by default)
  const [openFaqIndex, setOpenFaqIndex] = useState<number>(0);

  const toggleFaq = (idx: number) => {
    setOpenFaqIndex((prev) => (prev === idx ? -1 : idx));
  };

  const config = EDITORIAL_CONFIG[data.category] || EDITORIAL_CONFIG.Corporate;

  // SEO Schemas
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: typeof window !== 'undefined' ? window.location.origin : 'https://mitijeninteriors.com',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Services',
        item: `${typeof window !== 'undefined' ? window.location.origin : 'https://mitijeninteriors.com'}/services`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: `${data.category} Interior Design`,
        item: `${typeof window !== 'undefined' ? window.location.origin : 'https://mitijeninteriors.com'}${data.seo.canonical}`,
      },
    ],
  };

  const serviceSchema = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: data.seo.h1,
    description: data.seo.description,
    provider: {
      '@type': 'Organization',
      name: 'Mitjen Interiors',
      url: typeof window !== 'undefined' ? window.location.origin : 'https://mitijeninteriors.com',
    },
    serviceType: `${data.category} Interior Architecture & Design`,
    url: `${typeof window !== 'undefined' ? window.location.origin : 'https://mitijeninteriors.com'}${data.seo.canonical}`,
  };

  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: data.faqsSection.faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer,
      },
    })),
  };

  // GSAP Scroll Animations
  useEffect(() => {
    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion || !pageRef.current) return;

    const ctx = gsap.context(() => {
      // 1. Hero text & image reveals
      gsap.fromTo(
        '.ed-hero-content',
        { opacity: 0, y: 35 },
        { opacity: 1, y: 0, duration: 1.0, ease: 'power3.out', delay: 0.15 }
      );

      gsap.fromTo(
        '.ed-hero-media',
        { opacity: 0, scale: 0.98 },
        { opacity: 1, scale: 1, duration: 1.2, ease: 'power2.out', delay: 0.3 }
      );

      // 2. About section reveal
      gsap.fromTo(
        '.ed-about-arch-wrap',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1.0,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.ed-about-section',
            start: 'top 80%',
            once: true,
          },
        }
      );

      gsap.fromTo(
        '.ed-about-content',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1.0,
          delay: 0.15,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.ed-about-section',
            start: 'top 80%',
            once: true,
          },
        }
      );

      // 3. Solutions cards stagger
      const cards = gsap.utils.toArray('.ed-solution-card');
      if (cards.length > 0) {
        gsap.fromTo(
          cards,
          { opacity: 0, y: 28 },
          {
            opacity: 1,
            y: 0,
            duration: 0.85,
            stagger: 0.12,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: '.ed-solutions-grid',
              start: 'top 82%',
              once: true,
            },
          }
        );
      }

      // 4. Challenges section reveal
      gsap.fromTo(
        '.ed-challenge-img-wrap',
        { opacity: 0, x: -30 },
        {
          opacity: 1,
          x: 0,
          duration: 1.0,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.ed-challenges-section',
            start: 'top 80%',
            once: true,
          },
        }
      );

      const challengeItems = gsap.utils.toArray('.ed-challenge-item');
      if (challengeItems.length > 0) {
        gsap.fromTo(
          challengeItems,
          { opacity: 0, x: 20 },
          {
            opacity: 1,
            x: 0,
            duration: 0.7,
            stagger: 0.12,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: '.ed-challenges-list',
              start: 'top 82%',
              once: true,
            },
          }
        );
      }

      // 5. Deliverables 2x3 grid stagger
      const delivCards = gsap.utils.toArray('.ed-deliverable-card');
      if (delivCards.length > 0) {
        gsap.fromTo(
          delivCards,
          { opacity: 0, y: 24 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            stagger: 0.1,
            ease: 'power3.out',
            scrollTrigger: {
              trigger: '.ed-deliverables-grid',
              start: 'top 82%',
              once: true,
            },
          }
        );
      }

      // 6. Philosophy reveal
      gsap.fromTo(
        '.ed-philosophy-heading',
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 1.0,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.ed-philosophy-section',
            start: 'top 82%',
            once: true,
          },
        }
      );

      // 7. Final CTA banner reveal
      gsap.fromTo(
        '.ed-final-cta-banner',
        { opacity: 0, y: 35 },
        {
          opacity: 1,
          y: 0,
          duration: 1.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: '.ed-final-cta-section',
            start: 'top 82%',
            once: true,
          },
        }
      );
    }, pageRef);

    return () => ctx.revert();
  }, [data.category]);

  return (
    <article className="editorial-service-page" ref={pageRef} itemScope itemType="https://schema.org/ItemPage">
      <SEO
        title={data.seo.title}
        description={data.seo.description}
        canonical={data.seo.canonical}
        ogImage={data.seo.ogImage}
        schema={[breadcrumbSchema, serviceSchema, faqSchema]}
      />

      {/* ====================================================================
          FLOATING DISCIPLINE SWITCHER STRIP
          ==================================================================== */}
      <div className="ed-discipline-pill-bar" aria-label="Interior Disciplines">
        <span className="ed-discipline-label">PRACTICE:</span>
        <div className="ed-discipline-links">
          <Link
            to="/services/corporate-interior-design"
            className={`ed-discipline-pill ${location.pathname.includes('corporate') ? 'is-active' : ''}`}
          >
            Corporate Workspaces
          </Link>
          <Link
            to="/services/commercial-interior-design"
            className={`ed-discipline-pill ${location.pathname.includes('commercial') ? 'is-active' : ''}`}
          >
            Commercial Venues
          </Link>
          <Link
            to="/services/residential-interior-design"
            className={`ed-discipline-pill ${location.pathname.includes('residential') ? 'is-active' : ''}`}
          >
            Residential Sanctuaries
          </Link>
        </div>
      </div>

      {/* ====================================================================
          SECTION 02 — SERVICE HERO
          ==================================================================== */}
      <section className="ed-hero-section" aria-label="Service Hero">
        <div className="ed-hero-container">
          <div className="ed-hero-content">
            <span className="ed-eyebrow">{config.eyebrow}</span>
            <h1 className="ed-hero-headline">{config.heroHeadline}</h1>
            <p className="ed-hero-subtitle">{config.heroSubtitle}</p>

            <div className="ed-hero-actions">
              <button
                type="button"
                onClick={() => openInquiry(`${data.category} — Hero Consultation`)}
                className="ed-btn-burgundy hover-lift"
              >
                <span>Consult Our Experts</span>
                <span className="ed-btn-arrow" aria-hidden="true">→</span>
              </button>
            </div>

            <div className="ed-scroll-indicator" aria-hidden="true">
              <span className="ed-scroll-icon">↓</span>
              <span className="ed-scroll-text">Scroll to explore</span>
            </div>
          </div>

          <div className="ed-hero-media">
            <img
              src={config.heroImage}
              alt={`${config.heroHeadline} — Mitjen Interiors`}
              loading="eager"
              fetchPriority="high"
            />
          </div>
        </div>
      </section>

      {/* ====================================================================
          SECTION 03 — SERVICE INTRODUCTION ("ABOUT OUR SERVICE")
          ==================================================================== */}
      <section className="ed-about-section" aria-label="About Our Service">
        <div className="ed-about-container">
          {/* Left Column: Arched Architectural Photo with Concentric Outline Rings */}
          <div className="ed-about-arch-wrap">
            <div className="ed-arch-concentric-rings" aria-hidden="true">
              <span className="ed-ring ed-ring-1" />
              <span className="ed-ring ed-ring-2" />
            </div>
            <div className="ed-arch-photo-frame">
              <img
                src={config.aboutImage}
                alt={`${config.aboutHeading} — Mitjen Interiors`}
                loading="lazy"
              />
            </div>
          </div>

          {/* Right Column: Editorial Text & 3-Column Stats */}
          <div className="ed-about-content">
            <span className="ed-eyebrow">{config.aboutEyebrow}</span>
            <h2 className="ed-about-heading">{config.aboutHeading}</h2>
            <p className="ed-about-paragraph">{config.aboutText}</p>

            <div className="ed-stats-row">
              {config.stats.map((st, i) => (
                <div key={st.label} className="ed-stat-col">
                  {i > 0 && <span className="ed-stat-divider" aria-hidden="true" />}
                  <span className="ed-stat-number">{st.number}</span>
                  <span className="ed-stat-label">{st.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================================
          SECTION 05 — WHAT WE CAN HELP WITH (SOLUTIONS GRID)
          ==================================================================== */}
      <section className="ed-solutions-section" aria-label="Comprehensive Interior Solutions">
        <div className="ed-section-container">
          <div className="ed-solutions-header">
            <div className="ed-solutions-title-col">
              <span className="ed-eyebrow">{config.solutionsEyebrow}</span>
              <h2 className="ed-solutions-heading">{config.solutionsHeading}</h2>
            </div>
            <div className="ed-solutions-desc-col">
              <p className="ed-solutions-subtitle">{config.solutionsSubtitle}</p>
            </div>
          </div>

          {/* 4 Cards in a Row */}
          <div className="ed-solutions-grid">
            {config.solutionsCards.map((card) => (
              <div key={card.title} className="ed-solution-card hover-lift">
                <div className="ed-solution-img-wrap">
                  <img src={card.image} alt={card.title} loading="lazy" />
                  <div className="ed-solution-badge" aria-hidden="true">
                    <SolutionIcon type={card.iconType} />
                  </div>
                </div>
                <div className="ed-solution-body">
                  <h3 className="ed-solution-title">{card.title}</h3>
                  <p className="ed-solution-desc">{card.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ====================================================================
          SECTION 06 — CORPORATE INTERIOR CHALLENGES
          ==================================================================== */}
      <section className="ed-challenges-section" aria-label="Overcoming Interior Challenges">
        <div className="ed-section-container">
          <div className="ed-challenges-layout">
            {/* Left: Asymmetric Curved Glass Facade Image */}
            <div className="ed-challenge-img-wrap">
              <img
                src={config.challengesImage}
                alt={`${config.challengesHeading} — Architecture`}
                loading="lazy"
              />
            </div>

            {/* Right: Challenges Content & Numbered List */}
            <div className="ed-challenge-content">
              <span className="ed-eyebrow">{config.challengesEyebrow}</span>
              <h2 className="ed-challenge-heading">{config.challengesHeading}</h2>
              <p className="ed-challenge-subtitle">{config.challengesSubtitle}</p>

              <div className="ed-challenges-list">
                {config.challengesList.map((ch, idx) => (
                  <div key={ch} className="ed-challenge-item">
                    <span className="ed-challenge-num">{idx + 1}</span>
                    <span className="ed-challenge-text">{ch}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================================
          SECTION 07 — WHAT THE DESIGN INCLUDES (A COMPLETE DESIGN EXPERIENCE)
          ==================================================================== */}
      <section className="ed-deliverables-section" id="deliverables" aria-label="A Complete Design Experience">
        <div className="ed-section-container">
          <div className="ed-deliverables-layout">
            {/* Left Sticky Intro Column */}
            <div className="ed-deliverables-intro">
              <span className="ed-eyebrow">{config.deliverablesEyebrow}</span>
              <h2 className="ed-deliverables-heading">{config.deliverablesHeading}</h2>
              <p className="ed-deliverables-subtitle">{config.deliverablesSubtitle}</p>

              <button
                type="button"
                onClick={() => openInquiry(`${data.category} — Complete Design Experience`)}
                className="ed-btn-burgundy hover-lift"
              >
                <span>Start Your Project</span>
                <span className="ed-btn-arrow" aria-hidden="true">→</span>
              </button>
            </div>

            {/* Right 2x3 Grid of 6 Thumbnail Cards */}
            <div className="ed-deliverables-grid">
              {config.deliverablesCards.map((deliv) => (
                <div key={deliv.title} className="ed-deliverable-card hover-lift">
                  <div className="ed-deliverable-thumb-wrap">
                    <img src={deliv.image} alt={deliv.title} loading="lazy" />
                  </div>
                  <h3 className="ed-deliverable-title">{deliv.title}</h3>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================================
          SECTION 08 — DESIGN PHILOSOPHY & WORKPLACE STANDARDS
          ==================================================================== */}
      <section className="ed-philosophy-section" id="philosophy" aria-label="Design Philosophy">
        <div className="ed-section-container">
          <div className="ed-philosophy-header">
            <span className="ed-eyebrow">{config.philosophyEyebrow}</span>
            <h2 className="ed-philosophy-heading">“{config.philosophyHeading}”</h2>
            <div className="ed-philosophy-line" />
          </div>

          <div className="ed-philosophy-prose-grid">
            <div className="ed-philosophy-col">
              <h3 className="ed-philosophy-col-title">{config.philosophyCol1Title}</h3>
              <p className="ed-philosophy-col-text">{config.philosophyCol1Text}</p>
            </div>
            <div className="ed-philosophy-col">
              <h3 className="ed-philosophy-col-title">{config.philosophyCol2Title}</h3>
              <p className="ed-philosophy-col-text">{config.philosophyCol2Text}</p>
            </div>
          </div>

          {/* Minimalist Borderless Metrics Strip */}
          <div className="ed-metrics-strip">
            {config.metrics.map((m) => (
              <div key={m.label} className="ed-metric-item">
                <span className="ed-metric-value">
                  {m.value}
                  {m.unit && <span className="ed-metric-unit">{m.unit}</span>}
                </span>
                <span className="ed-metric-label">{m.label}</span>
                <span className="ed-metric-sub">{m.sub}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Optional Children Injection (e.g. How It Works Section) */}
      {children}

      {/* ====================================================================
          SECTION 09 — FREQUENTLY ASKED QUESTIONS
          ==================================================================== */}
      <section className="ed-faq-section" id="faq" aria-label="Frequently Asked Questions">
        <div className="ed-section-container">
          <div className="ed-faq-layout">
            {/* Left Header with Botanical Sketch Accent */}
            <div className="ed-faq-left">
              <BotanicalSketch />
              <div className="ed-faq-header-wrap">
                <span className="ed-eyebrow">FREQUENTLY ASKED QUESTIONS</span>
                <h2 className="ed-faq-heading">Your Questions, Answered</h2>
                <p className="ed-faq-desc">
                  Get quick answers to common queries about our {data.category.toLowerCase()} interior design services.
                </p>
              </div>
            </div>

            {/* Right Accordion List */}
            <div className="ed-faq-right">
              <div className="ed-accordion-list">
                {data.faqsSection.faqs.slice(0, 5).map((faq, idx) => {
                  const isOpen = openFaqIndex === idx;
                  return (
                    <div key={faq.question} className={`ed-accordion-item ${isOpen ? 'is-open' : ''}`}>
                      <button
                        type="button"
                        className="ed-accordion-btn"
                        onClick={() => toggleFaq(idx)}
                        aria-expanded={isOpen}
                      >
                        <span className="ed-accordion-question">{faq.question}</span>
                        <span className="ed-accordion-icon" aria-hidden="true">
                          {isOpen ? '—' : '+'}
                        </span>
                      </button>

                      <div className="ed-accordion-panel" style={{ display: isOpen ? 'block' : 'none' }}>
                        <p className="ed-accordion-answer">{faq.answer}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================================
          SECTION 10 — FINAL CONSULTATION CTA BANNER
          ==================================================================== */}
      <section className="ed-final-cta-section" aria-label="Start Your Consultation">
        <div className="ed-section-container">
          <div className="ed-final-cta-banner">
            <div className="ed-final-cta-content">
              <span className="ed-final-cta-eyebrow">{config.ctaEyebrow}</span>
              <h2 className="ed-final-cta-heading">{config.ctaHeading}</h2>
              <p className="ed-final-cta-desc">{config.ctaSubtitle}</p>

              <button
                type="button"
                onClick={() => openInquiry(`${data.category} — Final Banner Consultation`)}
                className="ed-btn-white hover-lift"
              >
                <span>Book a Consultation</span>
                <span className="ed-btn-arrow" aria-hidden="true">→</span>
              </button>
            </div>

            <div className="ed-final-cta-media">
              <img
                src={config.ctaImage}
                alt={`${config.ctaHeading} — Mitjen Interiors`}
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>
    </article>
  );
};
