import React, { useState } from 'react';
import { SectionLabel } from './common/SectionLabel';
import { ImagePlate } from './common/ImagePlate';
import { TESTIMONIALS } from '../data/testimonials';

export const TestimonialsSection: React.FC = () => {
  const [quoteIndex, setQuoteIndex] = useState(0);

  const setQ = (newIndex: number) => {
    const total = TESTIMONIALS.length;
    setQuoteIndex((newIndex + total) % total);
  };

  const current = TESTIMONIALS[quoteIndex];

  return (
    <section className="ts">
      <ImagePlate
        className="rv"
        imageKey="lounge"
        ariaLabel="Warm living room with linen seating"
      />

      <div>
        <SectionLabel>Sample testimonial · fictional</SectionLabel>
        <blockquote id="tq">{current.quote}</blockquote>
        <p id="ta">{current.author}</p>

        <div className="arrows">
          <button
            id="tp"
            aria-label="Previous testimonial"
            onClick={() => setQ(quoteIndex - 1)}
          >
            ←
          </button>
          <button
            id="tn"
            aria-label="Next testimonial"
            onClick={() => setQ(quoteIndex + 1)}
          >
            →
          </button>
        </div>
      </div>
    </section>
  );
};
