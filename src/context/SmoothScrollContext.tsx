import React, { useEffect, useRef, useState, useMemo } from 'react';
import { useLocation } from 'react-router-dom';
import Lenis from 'lenis';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SmoothScrollContext, type ScrollToOptions } from './SmoothScrollTypes';
import 'lenis/dist/lenis.css';

// Register GSAP plugins safely
if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

interface SmoothScrollProviderProps {
  children: React.ReactNode;
}

export const SmoothScrollProvider: React.FC<SmoothScrollProviderProps> = ({ children }) => {
  const [lenisInstance, setLenisInstance] = useState<Lenis | null>(null);
  const [scrollProgress, setScrollProgress] = useState(0);
  const lenisRef = useRef<Lenis | null>(null);
  const location = useLocation();

  useEffect(() => {
    // Respect user's OS preference for reduced motion
    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Slower, luxurious, velvety momentum scrolling configuration
    const lenis = new Lenis({
      duration: prefersReducedMotion ? 0 : 1.75, // Slower, deliberate glide
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Smooth exponential ease-out
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: !prefersReducedMotion,
      wheelMultiplier: 0.85, // Softer, slower wheel response
      touchMultiplier: 1.15, // Responsive yet silky touch momentum
      syncTouch: false,
      autoResize: true,
      autoRaf: false, // We drive it via GSAP ticker for 60/120fps lockstep sync
      prevent: (node: HTMLElement) => {
        // Prevent Lenis smooth hijacking inside dialogs, 360 viewer, comparison slider, or tagged elements
        return Boolean(
          node.closest(
            '[data-lenis-prevent], dialog, .architecture-stage, .before-after-stage, .showcase-canvas'
          )
        );
      },
    });

    lenisRef.current = lenis;
    setLenisInstance(lenis);

    // Sync Lenis with GSAP ScrollTrigger
    const handleScroll = (e: { progress: number }) => {
      setScrollProgress(e.progress);
      ScrollTrigger.update();
    };
    lenis.on('scroll', handleScroll);

    // GSAP Ticker integration
    const tickerCallback = (time: number) => {
      lenis.raf(time * 1000);
    };
    gsap.ticker.add(tickerCallback);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tickerCallback);
      lenis.destroy();
      lenisRef.current = null;
      setLenisInstance(null);
    };
  }, []);

  // Smooth scroll to top on route change (unless hash anchor is present)
  useEffect(() => {
    if (!lenisRef.current) return;

    if (location.hash) {
      const id = location.hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        setTimeout(() => {
          lenisRef.current?.scrollTo(element, {
            offset: -80,
            duration: 1.6,
            easing: (t: number) => 1 - Math.pow(1 - t, 4),
          });
        }, 150);
        return;
      }
    }

    // Scroll to top immediately on page change
    lenisRef.current.scrollTo(0, { immediate: true });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname, location.hash]);

  const scrollTo = useMemo(
    () =>
      (target: number | string | HTMLElement, options?: ScrollToOptions) => {
        if (lenisRef.current) {
          lenisRef.current.scrollTo(target, {
            duration: 1.7, // Deliberate, slower animated scroll
            easing: (t: number) => 1 - Math.pow(1 - t, 4),
            ...options,
          });
        } else if (typeof window !== 'undefined') {
          if (typeof target === 'number') {
            window.scrollTo({ top: target, behavior: 'smooth' });
          } else if (typeof target === 'string') {
            const el = document.querySelector(target);
            el?.scrollIntoView({ behavior: 'smooth' });
          } else if (target instanceof HTMLElement) {
            target.scrollIntoView({ behavior: 'smooth' });
          }
        }
      },
    []
  );

  const stop = useMemo(
    () => () => {
      lenisRef.current?.stop();
    },
    []
  );

  const start = useMemo(
    () => () => {
      lenisRef.current?.start();
    },
    []
  );

  const contextValue = useMemo(
    () => ({
      lenis: lenisInstance,
      scrollTo,
      stop,
      start,
      scrollProgress,
    }),
    [lenisInstance, scrollTo, stop, start, scrollProgress]
  );

  return (
    <SmoothScrollContext.Provider value={contextValue}>
      {children}
    </SmoothScrollContext.Provider>
  );
};
