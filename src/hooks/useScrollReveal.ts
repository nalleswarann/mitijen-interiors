import { useEffect, useRef } from 'react';

/**
 * useScrollReveal – Wires up an IntersectionObserver on the entire page.
 * Any element with data-reveal="" gets the "visible" class when it enters
 * the viewport. Supports data-reveal-delay="200" (ms).
 *
 * Called once per page mount; re-runs whenever deps change so newly
 * rendered cards are picked up after filter transitions.
 */
export function useScrollReveal(deps: unknown[] = []) {
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    if (observerRef.current) {
      observerRef.current.disconnect();
    }

    observerRef.current = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement;
            const delay = parseInt(el.dataset.revealDelay ?? '0', 10);
            setTimeout(() => {
              el.classList.add('visible');
            }, delay);
            observerRef.current?.unobserve(el);
          }
        });
      },
      { threshold: 0.08, rootMargin: '0px 0px -40px 0px' }
    );

    const elements = document.querySelectorAll<HTMLElement>('[data-reveal]:not(.visible)');
    elements.forEach((el) => observerRef.current?.observe(el));

    return () => {
      observerRef.current?.disconnect();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps);
}
