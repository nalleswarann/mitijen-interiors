import { useEffect } from 'react';

/**
 * Observes elements with .rv or .tx classes and adds the .in class when they enter the viewport
 * Recreates the exact reveal animation mechanism from the original site
 */
export function useRevealObserver() {
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in');
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    const elements = document.querySelectorAll('.rv:not(.in), .tx:not(.in)');
    elements.forEach((el) => io.observe(el));

    return () => {
      io.disconnect();
    };
  }, []);
}
