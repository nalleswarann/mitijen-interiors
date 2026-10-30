import React, { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import '../../styles/MonographBanner.css';

export interface BannerPillar {
  title: string;
  subtitle: string;
  link?: string;
  badge?: string;
}

export interface MonographBannerProps {
  // Sidebar (Left column in reference)
  sidebarKicker: string[]; // e.g. ['DESIGN', 'WITH', 'PURPOSE']
  sidebarNote: string;     // e.g. 'Our approach is centered on three key principles'
  sidebarYear?: string;    // e.g. '2026'

  // Main Photographic Canvas & Display Title (Right in reference)
  heroImage: string;
  heroImageAlt: string;
  headlineLine1: string;   // e.g. 'DESIGN'
  headlineLine2: string;   // e.g. 'PHILOSOPHY'

  // Frosted Glass Strip across lower image
  pillars: BannerPillar[];

  // Optional top badge or classification
  topBadge?: string;

  // Optional custom ID for accessibility
  id?: string;
}

export const MonographBanner: React.FC<MonographBannerProps> = ({
  sidebarKicker,
  sidebarNote,
  sidebarYear = '2026',
  heroImage,
  heroImageAlt,
  headlineLine1,
  headlineLine2,
  pillars,
  topBadge,
  id = 'monograph-banner',
}) => {
  const bannerRef = useRef<HTMLElement>(null);
  const bgImgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {
      // 1. Staggered headline lines reveal
      const headlineLines = gsap.utils.toArray('.mono-line-inner');
      if (headlineLines.length > 0) {
        gsap.fromTo(
          headlineLines,
          { yPercent: 115, opacity: 0 },
          {
            yPercent: 0,
            opacity: 1,
            duration: 1.25,
            stagger: 0.16,
            ease: 'power3.out',
            delay: 0.15,
          }
        );
      }

      // 2. Sidebar compartments slide and fade
      gsap.fromTo(
        '.mono-sidebar-tier',
        { opacity: 0, x: -20 },
        {
          opacity: 1,
          x: 0,
          duration: 1.0,
          stagger: 0.14,
          ease: 'power2.out',
          delay: 0.25,
        }
      );

      // 3. Top badge subtle entrance
      gsap.fromTo(
        '.mono-badge',
        { opacity: 0, y: -12 },
        {
          opacity: 1,
          y: 0,
          duration: 0.9,
          ease: 'power2.out',
          delay: 0.35,
        }
      );

      // 4. Frosted glass strip floating entrance
      gsap.fromTo(
        '.mono-frosted-bar',
        { opacity: 0, y: 32 },
        {
          opacity: 1,
          y: 0,
          duration: 1.15,
          ease: 'power3.out',
          delay: 0.45,
        }
      );

      // 5. Cinematic background photo zoom settling
      if (bgImgRef.current) {
        gsap.fromTo(
          bgImgRef.current,
          { scale: 1.07 },
          {
            scale: 1.0,
            duration: 2.2,
            ease: 'power2.out',
          }
        );
      }
    }, bannerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={bannerRef} id={id} className="mono-banner" aria-label={`${headlineLine1} ${headlineLine2}`}>
      {/* ------------------------------------------------------------------
          1. LEFT SIDEBAR (EDITORIAL SPINE)
          ------------------------------------------------------------------ */}
      <aside className="mono-sidebar" aria-label="Editorial Column">
        {/* Tier 1: Stacked Editorial Kicker */}
        <div className="mono-sidebar-tier mono-tier-top">
          <div className="mono-kicker-stack">
            {sidebarKicker.map((word, idx) => (
              <span key={idx} className="mono-kicker-word">
                {word}
              </span>
            ))}
          </div>
        </div>

        {/* Tier 2: Guiding Brief Statement */}
        <div className="mono-sidebar-tier mono-tier-mid">
          <p className="mono-sidebar-note">{sidebarNote}</p>
        </div>

        {/* Tier 3: Year / Archive Reference */}
        <div className="mono-sidebar-tier mono-tier-bot">
          <span className="mono-sidebar-year">{sidebarYear}</span>
        </div>
      </aside>

      {/* ------------------------------------------------------------------
          2. RIGHT PHOTOGRAPHIC CANVAS & HEADLINE
          ------------------------------------------------------------------ */}
      <div className="mono-canvas">
        {/* Atmospheric Background Photo */}
        <div className="mono-bg-frame">
          <img
            ref={bgImgRef}
            src={heroImage}
            alt={heroImageAlt}
            className="mono-bg-img"
            loading="eager"
            fetchPriority="high"
          />
          <div className="mono-bg-scrim" />
        </div>

        {/* Top Badge Overlay */}
        {topBadge && (
          <div className="mono-top-badge-row">
            <div className="mono-badge">
              <span className="mono-badge-dot" aria-hidden="true" />
              <span className="mono-badge-text">{topBadge}</span>
            </div>
          </div>
        )}

        {/* Massive Serif Display Headline */}
        <div className="mono-headline-wrap">
          <h1 className="mono-headline">
            <span className="mono-line-wrap">
              <span className="mono-line-inner">{headlineLine1}</span>
            </span>
            <span className="mono-line-wrap">
              <span className="mono-line-inner">{headlineLine2}</span>
            </span>
          </h1>
        </div>

        {/* ------------------------------------------------------------------
            3. FROSTED GLASS 3-PILLAR BAR (GLASSMORPHIC STRIP)
            ------------------------------------------------------------------ */}
        <div className="mono-frosted-bar" role="region" aria-label="Key Principles and Practices">
          <div className="mono-pillars-grid">
            {pillars.map((pillar, idx) => {
              const PillarContent = (
                <div className="mono-pillar-content">
                  <div className="mono-pillar-head">
                    <span className="mono-pillar-title">{pillar.title}</span>
                    {pillar.link && (
                      <span className="mono-pillar-arrow" aria-hidden="true">
                        →
                      </span>
                    )}
                  </div>
                  <p className="mono-pillar-sub">{pillar.subtitle}</p>
                </div>
              );

              if (pillar.link) {
                const isExternal =
                  pillar.link.startsWith('http') ||
                  pillar.link.startsWith('tel:') ||
                  pillar.link.startsWith('mailto:');

                if (isExternal) {
                  return (
                    <a
                      key={idx}
                      href={pillar.link}
                      className="mono-pillar-col mono-pillar-interactive"
                      target={pillar.link.startsWith('http') ? '_blank' : undefined}
                      rel={pillar.link.startsWith('http') ? 'noopener noreferrer' : undefined}
                    >
                      {PillarContent}
                    </a>
                  );
                }

                return (
                  <Link
                    key={idx}
                    to={pillar.link}
                    className="mono-pillar-col mono-pillar-interactive"
                  >
                    {PillarContent}
                  </Link>
                );
              }

              return (
                <div key={idx} className="mono-pillar-col">
                  {PillarContent}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default MonographBanner;

