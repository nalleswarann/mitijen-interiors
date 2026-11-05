import React, { useState } from 'react';
import '../styles/FaqSection.css';

export interface FaqItem {
  number: string;
  question: string;
  summary: string;
  answer: string;
  badge: string;
  image: string;
}

const FAQ_ITEMS: FaqItem[] = [
  {
    number: '01',
    question: 'How much does it cost to do the interiors of a house?',
    summary: 'The cost depends on factors such as the size of the home, layout, materials, furniture, finishes and level of customisation.',
    answer: 'The overall budget can be planned based on your requirements and priorities.',
    badge: 'Budget & Scope',
    image: '/assets/mitijen/hom2.jpeg'
  },
  {
    number: '02',
    question: 'How long does it take to complete an interior project?',
    summary: 'There is no fixed timeline for every project.',
    answer: 'The duration depends on the size, design scope, custom work, material availability and execution involved. A project timeline can be planned after understanding the requirements.',
    badge: 'Project Duration',
    image: '/assets/mitijen/kitchen.jpeg'
  },
  {
    number: '03',
    question: 'Can I get interiors done within my budget?',
    summary: 'Yes. Interior planning can be adjusted according to the available budget.',
    answer: 'The choice of materials, furniture, finishes and level of customisation can be planned based on what matters most to you.',
    badge: 'Custom Planning',
    image: '/assets/mitijen/home1.jpeg'
  },
  {
    number: '04',
    question: 'How do I choose the right interior style for my home?',
    summary: 'Start by considering how you want the home to feel and how you use each room.',
    answer: 'References, colours, materials, furniture styles and existing elements can then be combined into a consistent design direction.',
    badge: 'Design Direction',
    image: '/assets/mitijen/home3.jpeg'
  },
  {
    number: '05',
    question: 'Can interior design improve the use of a small home?',
    summary: 'Yes. Good planning can make better use of limited areas.',
    answer: 'Through suitable layouts, built-in storage, multi-purpose furniture, lighting and careful selection of colours and finishes.',
    badge: 'Spatial Optimization',
    image: '/assets/mitijen/bedroom.jpeg'
  }
];

interface FaqSectionProps {
  onOpenInquiry?: (contextTitle: string) => void;
}

export const FaqSection: React.FC<FaqSectionProps> = ({ onOpenInquiry }) => {
  const [activeFaqIndex, setActiveFaqIndex] = useState<number>(0);
  const [lastActiveIndex, setLastActiveIndex] = useState<number>(0);

  const toggleFaq = (idx: number) => {
    setActiveFaqIndex((prev) => {
      const next = prev === idx ? -1 : idx;
      if (next >= 0) {
        setLastActiveIndex(next);
      }
      return next;
    });
  };

  const displayIndex = activeFaqIndex >= 0 ? activeFaqIndex : lastActiveIndex;
  const currentFaq = FAQ_ITEMS[displayIndex];

  return (
    <section className="faq-section" id="faq" aria-label="Frequently Asked Questions">
      <div className="faq-container">
        {/* Left Column: Sticky Atmospheric Photo Preview */}
        <div className="faq-left reveal-scale">
          <div className="faq-img-wrap img-zoom-hover">
            {FAQ_ITEMS.map((item, idx) => (
              <img
                key={item.number}
                src={item.image}
                alt={item.question}
                className={`faq-img ${displayIndex === idx ? 'is-active' : ''}`}
                loading={idx === 0 ? 'eager' : 'lazy'}
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).src = '/assets/mitijen/home1.jpeg';
                }}
              />
            ))}
            <div className="faq-img-badge badge-float">
              <span className="faq-badge-dot" />
              <span>{currentFaq?.badge || 'Studio Guidance'}</span>
            </div>
          </div>
          <p className="faq-left-note">
            Every architectural commission is guided by absolute transparency, uncompromising materiality, and dedicated site leadership.
          </p>
        </div>

        {/* Right Column: Header & Interactive Accordion */}
        <div className="faq-right">
          <div className="faq-header-block reveal-fade-up">
            <span className="faq-kicker">
              CLIENT GUIDANCE / FAQs
            </span>
            <h2 className="faq-headline">
              Common Questions About Interior Design, Answered
            </h2>
          </div>

          <div className="faq-accordion reveal-fade-up" role="region" aria-label="FAQ Accordion">
            {FAQ_ITEMS.map((item, idx) => {
              const isActive = activeFaqIndex === idx;

              return (
                <div
                  key={item.number}
                  className={`faq-item ${isActive ? 'is-active' : ''}`}
                  onClick={() => toggleFaq(idx)}
                >
                  <button
                    type="button"
                    className="faq-header"
                    aria-expanded={isActive}
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleFaq(idx);
                    }}
                  >
                    <div className="faq-header-left">
                      <span className="faq-num">{item.number}</span>
                      <span className="faq-title">{item.question}</span>
                    </div>

                    <span className="faq-icon-wrap" aria-hidden="true">
                      <svg
                        className="faq-svg"
                        width="13"
                        height="13"
                        viewBox="0 0 14 14"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.8"
                      >
                        <line x1="7" y1="1" x2="7" y2="13" />
                        <line x1="1" y1="7" x2="13" y2="7" />
                      </svg>
                    </span>
                  </button>

                  <div className={`faq-collapse ${isActive ? 'is-open' : ''}`}>
                    <div className="faq-collapse-inner">
                      <div className="faq-body">
                        <p className="faq-summary">
                          {item.summary}
                        </p>
                        <p className="faq-desc">
                          {item.answer}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Bottom CTA Row */}
          <div className="faq-cta-row reveal-fade-up" data-delay="250">
            <span className="faq-cta-text">
              Have a specific spatial requirement or architectural brief?
            </span>
            <button
              type="button"
              className="faq-cta-btn hover-lift"
              onClick={() => onOpenInquiry?.('Home Page FAQ — Consultation Request')}
            >
              <span>Book Private Consultation</span>
              <span aria-hidden="true">→</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FaqSection;
