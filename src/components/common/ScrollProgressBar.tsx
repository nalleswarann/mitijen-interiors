import React from 'react';
import { useSmoothScroll } from '../../context/useSmoothScroll';
import '../../styles/ScrollProgressBar.css';

export const ScrollProgressBar: React.FC = () => {
  const { scrollProgress } = useSmoothScroll();

  // Hide when at the very top
  const isVisible = scrollProgress > 0.005;

  return (
    <div
      className={`scroll-progress-track ${isVisible ? 'is-visible' : ''}`}
      aria-hidden="true"
    >
      <div
        className="scroll-progress-indicator"
        style={{ transform: `scaleX(${scrollProgress})` }}
      />
    </div>
  );
};
