import React from 'react';
import '../styles/HowItWorksSection.css';

export interface HowItWorksCardData {
  number: string;
  stageTag: string;
  title: string;
  description: string;
  deliverables: string[];
  duration: string;
  imageUrl: string;
  imageAlt: string;
}

const STEP_CARDS: HowItWorksCardData[] = [
  {
    number: '01',
    stageTag: 'STAGE 01 · DISCOVERY',
    title: 'Personalized In-Home & Site Visits',
    description: 'At your personalized consultation, our senior interior architect conducts an in-depth spatial assessment and listens to your functional goals, aesthetic vision, and lifestyle routines.',
    deliverables: [
      'Comprehensive on-site dimensional survey & spatial audit',
      'Material preferences, lighting needs & aesthetic alignment',
      'Preliminary scope definition, timeline & budget framework',
    ],
    duration: 'Timeline: 1–2 Weeks',
    imageUrl: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=900&q=80',
    imageAlt: 'Moody modern living and dining room with warm ambient lighting',
  },
  {
    number: '02',
    stageTag: 'STAGE 02 · REFINEMENT',
    title: 'Review Your Custom Designs',
    description: 'Visit our design studio or experience a private virtual walkthrough to inspect detailed 2D/3D spatial plans, tactile material samples, lighting scenes, and custom millwork specifications.',
    deliverables: [
      'Photorealistic 3D visualisations & daylight studies',
      'Physical wood veneer, stone & hardware sample boards',
      'Itemized Bill of Quantities (BOQ) with locked pricing',
    ],
    duration: 'Timeline: 2–3 Weeks',
    imageUrl: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=900&q=80',
    imageAlt: 'Contemporary dark architectural kitchen and dining space with pendant lights',
  },
  {
    number: '03',
    stageTag: 'STAGE 03 · TURNKEY BUILD',
    title: 'Precision Design Execution',
    description: 'With your design finalized, our in-house factory fabricates custom modular joinery while dedicated project engineers manage civil, MEP, and finishes to zero-defect standards.',
    deliverables: [
      'German CNC factory millwork & custom joinery crafting',
      'Dedicated on-site supervision & weekly progress tracking',
      'Deep cleaning, snag rectification & move-in handover',
    ],
    duration: 'Timeline: 6–10 Weeks',
    imageUrl: 'https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=900&q=80',
    imageAlt: 'Architectural interior lounge with bespoke dark timber millwork and cove lighting',
  },
];

export const HowItWorksSection: React.FC = () => {
  return (
    <section className="hiw-section" aria-label="How It Works — 3 Easy Steps to Get Interior Design">
      {/* Subtle, very light gradient / glow on the left side */}
      <div className="hiw-glow" aria-hidden="true" />

      <div className="hiw-container">
        {/* Left Intro Column (25–30% of width) */}
        <div className="hiw-intro-col">
          <div className="hiw-eyebrow-row">
            <span className="hiw-gold-line" aria-hidden="true" />
            <span className="hiw-eyebrow-label">HOW IT WORKS</span>
          </div>

          <h2 className="hiw-heading">
            3 Easy Steps to Get Interior Design
          </h2>

          <p className="hiw-paragraph">
            Main architectural design concept plans create seamless, spacious environments centered around your lifestyle and daily rituals.
          </p>
        </div>

        {/* Right Cards Grid (3 equal-width columns) */}
        <div className="hiw-cards-grid">
          {STEP_CARDS.map((card) => (
            <article
              key={card.number}
              className="hiw-card"
              tabIndex={0}
              aria-label={`Step ${card.number}: ${card.title}`}
            >
              {/* Absolutely positioned background image layer with dark overlay (fades in on hover) */}
              <div className="hiw-card-bg-layer" aria-hidden="true">
                <img
                  src={card.imageUrl}
                  alt={card.imageAlt}
                  className="hiw-card-bg-img"
                  loading="lazy"
                />
                <div className="hiw-card-overlay" />
              </div>

              {/* Foreground Content */}
              <div className="hiw-card-content">
                <div className="hiw-card-header">
                  <span className="hiw-card-number">{card.number}</span>
                  <span className="hiw-stage-pill">{card.stageTag}</span>
                </div>

                <div className="hiw-card-body">
                  <h3 className="hiw-card-title">{card.title}</h3>
                  <p className="hiw-card-desc">{card.description}</p>

                  <ul className="hiw-deliv-list">
                    {card.deliverables.map((deliv, idx) => (
                      <li key={idx} className="hiw-deliv-item">
                        <svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                          <path
                            fillRule="evenodd"
                            d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <span>{deliv}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="hiw-card-footer">
                  <span className="hiw-duration-tag">{card.duration}</span>
                  <span className="hiw-hover-cue">Hover for atmosphere ↗</span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
