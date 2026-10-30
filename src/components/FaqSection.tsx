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
    question: 'What is your studio’s end-to-end design & execution process?',
    summary: 'A disciplined four-phase methodology: Spatial Brief, 3D Conceptualization, Turnkey Fabrication, and Curated Handover.',
    answer: 'Every commission begins with an immersive discovery dialogue and structural assessment. From there, we develop detailed architectural drawings, BIM spatial plans, bespoke joinery specifications, and oversee turnkey on-site execution through white-glove handover.',
    badge: 'Phase 01 · Methodology & Rigor',
    image: '/assets/mitijen/Banner3.jpg'
  },
  {
    number: '02',
    question: 'How do you approach budgets, procurement, and project timelines?',
    summary: 'Transparent architectural cost schedules, direct material sourcing, and milestone-governed execution.',
    answer: 'We establish clear budgetary parameters during initial conceptualization. Itemized Bills of Quantities (BOQ) ensure total cost transparency with zero unexpected overheads. Full villa commissions typically span 4 to 8 months depending on custom millwork and structural modifications.',
    badge: 'Phase 02 · Budget & Schedule',
    image: '/assets/mitijen/kitchen.jpeg'
  },
  {
    number: '03',
    question: 'Do you manage complete turnkey execution and on-site coordination?',
    summary: 'Full-service site supervision, MEP integration, artisan joinery, and structural coordination.',
    answer: 'Yes. Our turnkey service covers civil modifications, electrical, plumbing, HVAC coordination, acoustic treatments, and custom carpentry fabrication managed by our dedicated project engineers and site supervisors to ensure exact fidelity to the drawings.',
    badge: 'Phase 03 · Turnkey Execution',
    image: '/assets/mitijen/home1.jpeg'
  },
  {
    number: '04',
    question: 'What geographic locations does Mitjen Interiors serve?',
    summary: 'Flagship studio in Coimbatore with ongoing commissions across Bangalore, Chennai, and South India.',
    answer: 'While our core studio and bespoke fabrication ateliers are located in Coimbatore, Tamil Nadu, we regularly execute flagship residences, private villas, corporate headquarters, and commercial venues across Bangalore, Mysore, Chennai, and Kerala with dedicated on-site teams.',
    badge: 'Locations · South India Practice',
    image: '/assets/mitijen/Banner2.jpg'
  },
  {
    number: '05',
    question: 'Can we engage your studio for individual spaces or full residences only?',
    summary: 'Primarily comprehensive spatial architecture, with select commissions for signature living or executive spaces.',
    answer: 'Our practice delivers the highest value when orchestrating comprehensive architectural narratives across complete residences, penthouses, and commercial spaces. We selectively undertake single-space commissions when they demand bespoke architectural intervention.',
    badge: 'Commissions · Spatial Scope',
    image: '/assets/mitijen/bedroom.jpeg'
  }
];

interface FaqSectionProps {
  onOpenInquiry?: (contextTitle: string) => void;
}

export const FaqSection: React.FC<FaqSectionProps> = ({ onOpenInquiry }) => {
  const [activeFaqIndex, setActiveFaqIndex] = useState<number>(0);

  const currentFaq = FAQ_ITEMS[activeFaqIndex >= 0 ? activeFaqIndex : 0];

  const toggleFaq = (idx: number) => {
    setActiveFaqIndex((prev) => (prev === idx ? -1 : idx));
  };

  return (
    <section className="faq-section" id="faq" aria-label="Frequently Asked Questions">
      <div className="faq-container">
        {/* Left Column: Sticky Atmospheric Photo Preview */}
        <div className="faq-left">
          <div className="faq-img-wrap">
            {FAQ_ITEMS.map((item, idx) => (
              <img
                key={item.number}
                src={item.image}
                alt={item.question}
                className={`faq-img ${activeFaqIndex === idx ? 'is-active' : ''}`}
                loading="lazy"
              />
            ))}
            <div className="faq-img-badge">
              <span className="faq-badge-dot" />
              <span>{currentFaq.badge}</span>
            </div>
          </div>
          <p className="faq-left-note">
            Every architectural commission is guided by absolute transparency, uncompromising materiality, and dedicated site leadership.
          </p>
        </div>

        {/* Right Column: Header & Interactive Accordion */}
        <div className="faq-right">
          <div>
            <span className="faq-kicker">
              08 / CLIENT GUIDANCE & FAQS
            </span>
            <h2 className="faq-headline">
              Answers to common questions about our design methodology, timelines, execution, and architectural standards.
            </h2>
          </div>

          <div className="faq-accordion" role="region" aria-label="FAQ Accordion">
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
          <div className="faq-cta-row">
            <span className="faq-cta-text">
              Have a specific spatial requirement or architectural brief?
            </span>
            <button
              type="button"
              className="faq-cta-btn"
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

