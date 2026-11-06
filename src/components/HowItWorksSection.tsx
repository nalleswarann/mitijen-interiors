import React from 'react';
import '../styles/HowItWorksSection.css';

export interface HowItWorksCardData {
  number: string;
  title: string;
  description: string;
  imageUrl: string;
  imageAlt: string;
}

const STEP_CARDS: HowItWorksCardData[] = [
  {
    number: '01',
    title: 'Personalized In-Home Visits',
    description: 'At your personalized in-home consultation, an interior designer will listen to your goals.',
    imageUrl: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?auto=format&fit=crop&w=900&q=80',
    imageAlt: 'Moody modern living and dining room with warm ambient lighting',
  },
  {
    number: '02',
    title: 'Review Your Custom Designs',
    description: 'For your second consultation, visit our local showroom to review design options.',
    imageUrl: 'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?auto=format&fit=crop&w=900&q=80',
    imageAlt: 'Contemporary dark architectural kitchen and dining space with pendant lights',
  },
  {
    number: '03',
    title: 'Precision Design Execution',
    description: 'With your design finalized, we manage every step of execution to perfection.',
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
            Main architectural design concept plans create seamless, spacious environments centered around your lifestyle.
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
                <div className="hiw-card-top">
                  <span className="hiw-card-number">{card.number}</span>
                </div>

                <div className="hiw-card-bottom">
                  <h3 className="hiw-card-title">{card.title}</h3>
                  <p className="hiw-card-desc">{card.description}</p>
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

