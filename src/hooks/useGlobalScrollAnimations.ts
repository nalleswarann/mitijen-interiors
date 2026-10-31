import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * Universal Global Scroll Animation Hook
 * Wires up high-performance IntersectionObserver across the entire website.
 * Observes all editorial reveal classes (.reveal-fade-up, .reveal-fade-in,
 * .reveal-scale, .reveal-slide-left, .reveal-slide-right, .reveal-line, .rv, .tx, [data-reveal]).
 */
export function useGlobalScrollAnimations() {
  const location = useLocation();

  useEffect(() => {
    // If reduced motion is requested, instantly reveal everything
    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion) {
      const allRevealElements = document.querySelectorAll(
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

            observer.unobserve(el);
          }
        });
      },
      {
        threshold: 0.08,
        rootMargin: '0px 0px -40px 0px',
      }
    );

    const observeElements = () => {
      const elements = document.querySelectorAll(
        '.reveal-fade-up:not(.is-revealed), .reveal-fade-in:not(.is-revealed), .reveal-scale:not(.is-revealed), .reveal-slide-left:not(.is-revealed), .reveal-slide-right:not(.is-revealed), .reveal-line:not(.is-revealed), .rv:not(.in), .tx:not(.in), [data-reveal]:not(.visible)'
      );
      elements.forEach((el) => observer.observe(el));
    };

    // Initial observe pass
    observeElements();

    // Re-observe after short microtask delays to catch dynamic components
    const timer1 = setTimeout(observeElements, 100);
    const timer2 = setTimeout(observeElements, 400);

    // Mutation observer to capture newly mounted elements (e.g. tabs or filters)
    const mutationObserver = new MutationObserver(() => {
      observeElements();
    });

    mutationObserver.observe(document.body, {
      childList: true,
      subtree: true,
    });

    return () => {
      clearTimeout(timer1);
      clearTimeout(timer2);
      observer.disconnect();
      mutationObserver.disconnect();
    };
  }, [location.pathname, location.search]);
}

