import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useSmoothScroll } from '../../context/useSmoothScroll';

export const ScrollToTop: React.FC = () => {
  const { pathname, hash } = useLocation();
  const { scrollTo } = useSmoothScroll();

  useEffect(() => {
    // Disable browser automatic scroll restoration to ensure refresh lands cleanly
    if (typeof window !== 'undefined' && 'scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }

    if (hash) {
      const id = hash.replace('#', '');
      const element = document.getElementById(id);
      if (element) {
        setTimeout(() => {
          scrollTo(element, { offset: -80, duration: 1.6 });
        }, 120);
        return;
      }
    }

    // Scroll to the very top on mount and on route change without hash
    scrollTo(0, { immediate: true });
  }, [pathname, hash, scrollTo]);

  return null;
};
