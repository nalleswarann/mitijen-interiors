import React, { useState } from 'react';

export interface FAQItem {
  question: string;
  answer: string;
}

interface FaqAccordionProps {
  items: FAQItem[];
  className?: string;
}

export const FaqAccordion: React.FC<FaqAccordionProps> = ({ items, className = '' }) => {
  const [openIndexes, setOpenIndexes] = useState<number[]>([0]);

  const toggleItem = (index: number) => {
    setOpenIndexes((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      toggleItem(index);
    }
  };

  return (
    <div className={`faq-accordion ${className}`.trim()} role="region" aria-label="Frequently Asked Questions">
      {items.map((item, index) => {
        const isOpen = openIndexes.includes(index);
        const headerId = `faq-header-${index}`;
        const panelId = `faq-panel-${index}`;

        return (
          <div key={item.question} className={`faq-card ${isOpen ? 'is-open' : ''}`}>
            <button
              type="button"
              id={headerId}
              className="faq-trigger"
              aria-expanded={isOpen}
              aria-controls={panelId}
              onClick={() => toggleItem(index)}
              onKeyDown={(e) => handleKeyDown(e, index)}
            >
              <span className="faq-question-text">{item.question}</span>
              <span className="faq-icon-wrapper" aria-hidden="true">
                <svg
                  className="faq-chevron"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <polyline points="6 9 12 15 18 9" />
                </svg>
              </span>
            </button>

            <div
              id={panelId}
              role="region"
              aria-labelledby={headerId}
              className={`faq-panel ${isOpen ? 'is-expanded' : ''}`}
              hidden={!isOpen}
            >
              <div className="faq-answer-inner">
                <p>{item.answer}</p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
