import React, { useState, useEffect, useRef, useCallback } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArchitecturalHeroCanvas } from './common/ArchitecturalHeroCanvas';
import { useInquiry } from '../context/useInquiry';
import '../styles/ArchitecturalHero.css';

// Register GSAP plugins safely
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface ArchitecturalSlide {
  id: string;
  image: string;
  badge: string;
  category: string;
  line1: string;
  line2: string;
  supportingText: string;
  tags: string[];
}

// Exactly 3 Curated Residential Interior Architectural Concepts
const HERO_SLIDES: ArchitecturalSlide[] = [
  {
    id: 'slide-01',
    image: '/assets/mitijen/Banner1.jpg',
    badge: 'Residential Studio · Vol. 01',
    category: 'Residential',
    line1: 'SPACES THAT',
    line2: 'FEEL LIKE HOME.',
    supportingText: 'Thoughtfully designed interiors for the way you live.',
    tags: ['Scandinavian Living', 'Natural Oak Joinery', 'Diffused Daylighting']
  },
  {
    id: 'slide-02',
    image: '/assets/mitijen/Banner2.jpg',
    badge: 'Contemporary Architecture · Vol. 02',
    category: 'Contemporary',
    line1: 'FORM MEETS',
    line2: 'FUNCTION.',
    supportingText: 'Beautifully balanced spaces, crafted around everyday living.',
    tags: ['Architectural Balance', 'Monolithic Kitchen', 'Bespoke Illumination']
  },
  {
    id: 'slide-03',
    image: '/assets/mitijen/Banner3.jpg',
    badge: 'Monolithic Living · Vol. 03',
    category: 'Bespoke Craft',
    line1: 'YOUR HOME.',
    line2: 'REIMAGINED.',
    supportingText: 'Timeless residential interiors with a personal touch.',
    tags: ['Tailored Master Suite', 'Textured Stone', 'Minimal Geometry']
  }
];

export const HeroSection: React.FC = () => {
  const { openInquiry } = useInquiry();

  const [currentSlideIndex, setCurrentSlideIndex] = useState(0);
  const [targetSlideIndex, setTargetSlideIndex] = useState(0);
  const [transitionProgress, setTransitionProgress] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Typewriter effect state for Hero Headline in 365 Grotesk
  const [typedLine1, setTypedLine1] = useState(HERO_SLIDES[0].line1);
  const [typedLine2, setTypedLine2] = useState(HERO_SLIDES[0].line2);
  const [activeTypingLine, setActiveTypingLine] = useState<1 | 2 | null>(null);

  useEffect(() => {
    const isReducedMotion = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const target1 = HERO_SLIDES[currentSlideIndex].line1;
    const target2 = HERO_SLIDES[currentSlideIndex].line2;

    if (isReducedMotion) {
      setTypedLine1(target1);
      setTypedLine2(target2);
      setActiveTypingLine(null);
      return;
    }

    setTypedLine1('');
    setTypedLine2('');
    setActiveTypingLine(1);

    let charIdx1 = 0;
    let charIdx2 = 0;
    let timer1: ReturnType<typeof setInterval> | null = null;
    let timer2: ReturnType<typeof setInterval> | null = null;
    let finishTimer: ReturnType<typeof setTimeout> | null = null;

    // Type line 1
    timer1 = setInterval(() => {
      charIdx1++;
      setTypedLine1(target1.slice(0, charIdx1));
      if (charIdx1 >= target1.length) {
        if (timer1) clearInterval(timer1);
        setActiveTypingLine(2);

        // Type line 2
        timer2 = setInterval(() => {
          charIdx2++;
          setTypedLine2(target2.slice(0, charIdx2));
          if (charIdx2 >= target2.length) {
            if (timer2) clearInterval(timer2);
            // Allow cursor to blink at the end of line 2 before softly resting
            finishTimer = setTimeout(() => {
              setActiveTypingLine(null);
            }, 2200);
          }
        }, 38);
      }
    }, 38);

    return () => {
      if (timer1) clearInterval(timer1);
      if (timer2) clearInterval(timer2);
      if (finishTimer) clearTimeout(finishTimer);
    };
  }, [currentSlideIndex]);

  const heroRef = useRef<HTMLElement>(null);
  const badgeRef = useRef<HTMLDivElement>(null);
  const headlineLine1Ref = useRef<HTMLSpanElement>(null);
  const headlineLine2Ref = useRef<HTMLSpanElement>(null);
  const tagsRef = useRef<HTMLDivElement>(null);
  const supportingRef = useRef<HTMLParagraphElement>(null);
  const actionsRef = useRef<HTMLDivElement>(null);
  const metricsRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);

  const isTransitioningRef = useRef(false);
  const hasCompletedInitialEntranceRef = useRef(false);
  const masterTimelineRef = useRef<gsap.core.Timeline | null>(null);

  // Helper to kill active text tweens cleanly
  const killActiveTextTweens = useCallback(() => {
    if (badgeRef.current) gsap.killTweensOf(badgeRef.current);
    if (headlineLine1Ref.current) gsap.killTweensOf(headlineLine1Ref.current);
    if (headlineLine2Ref.current) gsap.killTweensOf(headlineLine2Ref.current);
    if (tagsRef.current) gsap.killTweensOf(tagsRef.current);
    if (supportingRef.current) gsap.killTweensOf(supportingRef.current);
    if (actionsRef.current) gsap.killTweensOf(actionsRef.current);
    if (metricsRef.current) gsap.killTweensOf(metricsRef.current);
  }, []);

  // Synchronized Slide Transition Controller (Orchestrates WebGL shader + Masked text reveals)
  const goToSlide = useCallback((newIndex: number) => {
    if (newIndex === currentSlideIndex || isTransitioningRef.current) return;

    const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (isReducedMotion) {
      setCurrentSlideIndex(newIndex);
      setTargetSlideIndex(newIndex);
      return;
    }

    isTransitioningRef.current = true;
    killActiveTextTweens();
    setTargetSlideIndex(newIndex);

    const transitionTl = gsap.timeline();

    // 1. Text exits upward cleanly into mask (0.30s)
    transitionTl.to([headlineLine1Ref.current, headlineLine2Ref.current], {
      yPercent: -105,
      opacity: 0,
      duration: 0.30,
      stagger: 0.04,
      ease: 'power2.in'
    }, 0);

    transitionTl.to([badgeRef.current, supportingRef.current, tagsRef.current], {
      opacity: 0,
      y: -10,
      duration: 0.24,
      ease: 'power2.in'
    }, 0);

    // 2. Commit incoming slide text at t = 0.32s
    transitionTl.add(() => {
      setCurrentSlideIndex(newIndex);
      // Pre-position incoming text below the mask
      if (headlineLine1Ref.current) gsap.set(headlineLine1Ref.current, { opacity: 0, yPercent: 105 });
      if (headlineLine2Ref.current) gsap.set(headlineLine2Ref.current, { opacity: 0, yPercent: 105 });
      if (badgeRef.current) gsap.set(badgeRef.current, { opacity: 0, y: 12 });
      if (supportingRef.current) gsap.set(supportingRef.current, { opacity: 0, y: 12 });
      if (tagsRef.current) gsap.set(tagsRef.current, { opacity: 0, y: 10 });
    }, 0.32);

    // 3. Reveal incoming text upward through mask (starts at 0.36s)
    transitionTl.to(badgeRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.45,
      ease: 'power3.out'
    }, 0.36);

    transitionTl.to([headlineLine1Ref.current, headlineLine2Ref.current], {
      opacity: 1,
      yPercent: 0,
      duration: 0.80,
      stagger: 0.08,
      ease: 'power3.out'
    }, 0.40);

    transitionTl.to(tagsRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.60,
      ease: 'power3.out'
    }, 0.48);

    transitionTl.to(supportingRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.65,
      ease: 'power3.out'
    }, 0.52);

    // 4. WebGL displacement shader wave (0.0 to 1.0 from t = 0.0 to 1.1s)
    const progressObj = { value: 0 };
    transitionTl.to(progressObj, {
      value: 1,
      duration: 1.1,
      ease: 'power2.inOut',
      onUpdate: () => {
        setTransitionProgress(progressObj.value);
      },
      onComplete: () => {
        setTransitionProgress(0);
        isTransitioningRef.current = false;
      }
    }, 0);
  }, [currentSlideIndex, killActiveTextTweens]);

  // Master Initial Opening Choreography (Runs once on mount)
  useEffect(() => {
    const isReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (isReducedMotion) {
      if (badgeRef.current) gsap.set(badgeRef.current, { opacity: 1, y: 0 });
      if (headlineLine1Ref.current) gsap.set(headlineLine1Ref.current, { opacity: 1, yPercent: 0 });
      if (headlineLine2Ref.current) gsap.set(headlineLine2Ref.current, { opacity: 1, yPercent: 0 });
      if (tagsRef.current) gsap.set(tagsRef.current, { opacity: 1, y: 0 });
      if (supportingRef.current) gsap.set(supportingRef.current, { opacity: 1, y: 0 });
      if (actionsRef.current) gsap.set(actionsRef.current, { opacity: 1, y: 0 });
      if (metricsRef.current) gsap.set(metricsRef.current, { opacity: 1, y: 0 });
      if (footerRef.current) gsap.set(footerRef.current, { opacity: 1, y: 0 });
      hasCompletedInitialEntranceRef.current = true;
      return;
    }

    // Set initial masked positions
    gsap.set(badgeRef.current, { opacity: 0, y: 12 });
    gsap.set([headlineLine1Ref.current, headlineLine2Ref.current], { opacity: 0, yPercent: 110 });
    if (tagsRef.current) gsap.set(tagsRef.current, { opacity: 0, y: 12 });
    gsap.set(supportingRef.current, { opacity: 0, y: 14 });
    gsap.set(actionsRef.current, { opacity: 0, y: 16 });
    if (metricsRef.current) gsap.set(metricsRef.current, { opacity: 0, y: 14 });
    gsap.set(footerRef.current, { opacity: 0, y: 10 });

    const openingTl = gsap.timeline({
      delay: 0.15,
      onComplete: () => {
        hasCompletedInitialEntranceRef.current = true;
      }
    });
    masterTimelineRef.current = openingTl;

    // 1. Studio badge
    openingTl.to(badgeRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.65,
      ease: 'power3.out'
    }, 0.1);

    // 2. Oversized headline lines rise through masks
    openingTl.to([headlineLine1Ref.current, headlineLine2Ref.current], {
      opacity: 1,
      yPercent: 0,
      duration: 1.1,
      stagger: 0.12,
      ease: 'power3.out'
    }, 0.2);

    // 3. Spatial tags
    if (tagsRef.current) {
      openingTl.to(tagsRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.7,
        ease: 'power3.out'
      }, 0.45);
    }

    // 4. Supporting sentence
    openingTl.to(supportingRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: 'power3.out'
    }, 0.55);

    // 5. Actions: Primary & Secondary CTAs
    openingTl.to(actionsRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.85,
      ease: 'power3.out'
    }, 0.70);

    // 6. Metrics strip
    if (metricsRef.current) {
      openingTl.to(metricsRef.current, {
        opacity: 1,
        y: 0,
        duration: 0.85,
        ease: 'power3.out'
      }, 0.80);
    }

    // 7. Footer indicators & scroll cue
    openingTl.to(footerRef.current, {
      opacity: 1,
      y: 0,
      duration: 0.8,
      ease: 'power3.out'
    }, 0.85);

    return () => {
      openingTl.kill();
    };
  }, []);

  // Auto-advance slideshow timer (7s per slide for comfortable reading)
  useEffect(() => {
    if (isPaused) return;

    const timer = setInterval(() => {
      if (!isTransitioningRef.current) {
        goToSlide((currentSlideIndex + 1) % HERO_SLIDES.length);
      }
    }, 7000);

    return () => clearInterval(timer);
  }, [currentSlideIndex, isPaused, goToSlide]);

  const handleExploreClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const target = document.getElementById('projects');
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
    } else {
      window.location.hash = 'projects';
    }
  };

  // Mobile Touch Swipe Handling
  const touchStartXRef = useRef<number | null>(null);
  const touchStartYRef = useRef<number | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartXRef.current = e.touches[0].clientX;
    touchStartYRef.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartXRef.current === null || touchStartYRef.current === null) return;
    const diffX = touchStartXRef.current - e.changedTouches[0].clientX;
    const diffY = touchStartYRef.current - e.changedTouches[0].clientY;

    if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 40) {
      if (diffX > 0) {
        // Swiped left -> next slide
        goToSlide((currentSlideIndex + 1) % HERO_SLIDES.length);
      } else {
        // Swiped right -> previous slide
        goToSlide((currentSlideIndex - 1 + HERO_SLIDES.length) % HERO_SLIDES.length);
      }
    }

    touchStartXRef.current = null;
    touchStartYRef.current = null;
  };

  const currentSlide = HERO_SLIDES[currentSlideIndex];
  const nextSlide = HERO_SLIDES[targetSlideIndex];

  return (
    <section
      ref={heroRef}
      className="arch-hero"
      aria-label="Mitjen Interiors — Contemporary Residential Architecture"
      id="hero"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      {/* 1. WebGL Three.js Cinematic Canvas with Directional Shader Transitions */}
      <ArchitecturalHeroCanvas
        currentImage={currentSlide.image}
        nextImage={nextSlide.image}
        transitionProgress={transitionProgress}
        isPaused={isPaused}
      />

      {/* 2. High-Contrast Architectural Scrim Overlay */}
      <div className="arch-hero-scrim" aria-hidden="true" />

      {/* Minimal Editorial Framing Accents */}
      <div className="arch-letterbox-top" aria-hidden="true" />
      <div className="arch-letterbox-bottom" aria-hidden="true" />

      {/* 3. Hero Composition: Concept Tabs, Oversized Headline, Tags, CTAs & Metrics */}
      <div className="arch-hero-content">
        {/* Interactive Discipline Concept Tabs */}
        <div className="arch-concept-tabs" role="tablist" aria-label="Interior architectural disciplines">
          {HERO_SLIDES.map((slide, idx) => (
            <button
              key={slide.id}
              type="button"
              role="tab"
              aria-selected={idx === currentSlideIndex}
              className={`arch-concept-tab ${idx === currentSlideIndex ? 'is-active' : ''}`}
              onClick={() => goToSlide(idx)}
            >
              <span className="arch-tab-dot" aria-hidden="true" />
              <span className="arch-tab-index">0{idx + 1}</span>
              <span className="arch-tab-name">{slide.category}</span>
            </button>
          ))}
        </div>

        {/* Primary Zone: Badge, Headline, and Spatial Highlight Tags */}
        <div className="arch-primary-zone">
          <div ref={badgeRef} className="arch-studio-badge">
            <span className="arch-badge-dot" aria-hidden="true" />
            <span>{currentSlide.badge}</span>
          </div>

          <h1 className="arch-headline" aria-label={`${currentSlide.line1} ${currentSlide.line2}`}>
            <span className="arch-line-mask">
              <span ref={headlineLine1Ref} className="arch-headline-line">
                <span className="arch-typed-chars">{typedLine1}</span>
                {activeTypingLine === 1 && (
                  <span className="arch-typewriter-cursor" aria-hidden="true" />
                )}
              </span>
            </span>
            <span className="arch-line-mask">
              <span ref={headlineLine2Ref} className="arch-headline-line arch-line-accent">
                <span className="arch-typed-chars">{typedLine2}</span>
                {activeTypingLine === 2 && (
                  <span className="arch-typewriter-cursor" aria-hidden="true" />
                )}
              </span>
            </span>
          </h1>

          {/* Spatial Material & Atmosphere Highlight Tags */}
          <div ref={tagsRef} className="arch-tags-row" aria-label="Curated spatial elements">
            {currentSlide.tags.map((tag) => (
              <span key={tag} className="arch-tag-pill">
                <span className="arch-tag-dot" aria-hidden="true" />
                <span>{tag}</span>
              </span>
            ))}
          </div>
        </div>

        {/* Secondary Zone: Supporting Sentence & Dual Interactive CTAs */}
        <div className="arch-secondary-zone">
          <p ref={supportingRef} className="arch-supporting-text">
            {currentSlide.supportingText}
          </p>

          <div ref={actionsRef} className="arch-actions">
            <a
              href="#projects"
              onClick={handleExploreClick}
              className="arch-btn-explore"
              aria-label="Explore Our Work"
            >
              <span>Explore Our Work</span>
              <svg width="15" height="10" viewBox="0 0 15 10" fill="none" stroke="currentColor" aria-hidden="true">
                <path d="M0 5h13M9 1l4 4-4 4" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </a>

            <button
              type="button"
              onClick={() => openInquiry('Hero Banner — Consult Studio')}
              className="arch-btn-consult"
              aria-label="Book Design Consultation"
            >
              <span>Consult Studio</span>
            </button>
          </div>
        </div>

        {/* Studio Credibility Metrics Strip */}
        <div ref={metricsRef} className="arch-metrics-strip" aria-label="Studio benchmarks">
          <div className="arch-metric-item">
            <span className="arch-metric-num">140+</span>
            <span className="arch-metric-label">Delivered Homes</span>
          </div>
          <div className="arch-metric-divider" aria-hidden="true" />
          <div className="arch-metric-item">
            <span className="arch-metric-num">15+</span>
            <span className="arch-metric-label">Years of Craft</span>
          </div>
          <div className="arch-metric-divider" aria-hidden="true" />
          <div className="arch-metric-item">
            <span className="arch-metric-num">100%</span>
            <span className="arch-metric-label">Turnkey Delivery</span>
          </div>
        </div>

        {/* Mobile Interactive Touch Hint */}
        <div className="arch-swipe-hint" aria-hidden="true">
          <span className="arch-swipe-arrow">←</span>
          <span>Swipe to explore curated spaces</span>
          <span className="arch-swipe-arrow">→</span>
        </div>
      </div>

      {/* 4. Minimal Hero Footer: 3 Slide Indicators & Scroll Cue */}
      <div ref={footerRef} className="arch-hero-footer" aria-label="Hero navigation">
        <div className="arch-pagination">
          {HERO_SLIDES.map((slide, idx) => (
            <button
              key={slide.id}
              type="button"
              className={`arch-dot-btn ${idx === currentSlideIndex ? 'is-active' : ''}`}
              onClick={() => goToSlide(idx)}
              aria-label={`Go to slide ${idx + 1}: ${slide.line1}`}
              aria-current={idx === currentSlideIndex ? 'true' : 'false'}
            >
              <span className="arch-dot-index">0{idx + 1}</span>
              <span className="arch-dot-bar">
                <span className="arch-dot-progress" />
              </span>
            </button>
          ))}
          <span className="arch-slide-counter">
            0{currentSlideIndex + 1} / 0{HERO_SLIDES.length}
          </span>
        </div>

        <div className="arch-scroll-cue" aria-hidden="true">
          <span>Scroll</span>
          <div className="arch-scroll-mouse">
            <span className="arch-scroll-wheel" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;