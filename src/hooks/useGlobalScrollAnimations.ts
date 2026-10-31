import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Universal Global Scroll Animation Hook
 * Wires up high-performance IntersectionObserver across the entire website.
 * Observes all editorial reveal classes (.reveal-fade-up, .reveal-fade-in,
 * .reveal-scale, .reveal-slide-left, .reveal-slide-right, .reveal-line, .rv, .tx, [data-reveal]).
 * Includes instantaneous viewport check and fallback triggers so no content can ever get stuck invisible.
 */
export function useGlobalScrollAnimations() {
  const location = useLocation();

  useEffect(() => {
    // If reduced motion is requested, instantly reveal everything
    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const revealElement = (el: HTMLElement) => {
      const delayStr =
        el.dataset.delay ||
        el.dataset.revealDelay ||
        el.getAttribute('data-delay') ||
        '0';
      const delay = parseInt(delayStr, 10);

      if (delay > 0) {
        setTimeout(() => {
          el.classList.add('is-revealed', 'in', 'visible');
        }, delay);
      } else {
        el.classList.add('is-revealed', 'in', 'visible');
      }
    };

    if (prefersReducedMotion) {
      const allRevealElements = document.querySelectorAll<HTMLElement>(
        '.reveal-fade-up, .reveal-fade-in, .reveal-scale, .reveal-slide-left, .reveal-slide-right, .reveal-line, .rv, .tx, [data-reveal]'
      );
      allRevealElements.forEach((el) => {
        el.classList.add('is-revealed', 'in', 'visible');
      });
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement;
            revealElement(el);
            observer.unobserve(el);
          }
        });
      },
      {
        threshold: 0.01,
        rootMargin: '80px 0px 80px 0px',
      }
    );

    const checkAndObserve = () => {
      const vh = window.innerHeight || document.documentElement.clientHeight;
      const elements = document.querySelectorAll<HTMLElement>(
        '.reveal-fade-up:not(.is-revealed), .reveal-fade-in:not(.is-revealed), .reveal-scale:not(.is-revealed), .reveal-slide-left:not(.is-revealed), .reveal-slide-right:not(.is-revealed), .reveal-line:not(.is-revealed), .rv:not(.in), .tx:not(.in), [data-reveal]:not(.visible)'
      );

      elements.forEach((el) => {
        const rect = el.getBoundingClientRect();
        // Fallback: If element is already in or near viewport, reveal immediately
        if (rect.top < vh + 100 && rect.bottom > -100) {
          revealElement(el);
        } else {
          observer.observe(el);
        }
      });
    };

    // Initial check pass
    checkAndObserve();

    // Re-check after short microtask delays to catch dynamic components
    const timer1 = setTimeout(checkAndObserve, 80);
    const timer2 = setTimeout(checkAndObserve, 350);

    // Passive scroll listener for fast inertia / Lenis scrolling fallback
    let ticking = false;
    const onScrollOrResize = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          checkAndObserve();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScrollOrResize, { passive: true });
    window.addEventListener('resize', onScrollOrResize, { passive: true });

    // Mutation observer to capture newly mounted elements (e.g. tabs or filters)
    const mutationObserver = new MutationObserver(() => {
      checkAndObserve();
    });

    mutationObserver.observe(document.body, {
      childList: true,
      subtree: true,
    });

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      window.removeEventListener('scroll', onScrollOrResize);
      window.removeEventListener('resize', onScrollOrResize);
      observer.disconnect();
      mutationObserver.disconnect();
    };
  }, [location.pathname, location.search]);
}
