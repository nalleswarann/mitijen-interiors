import React from 'react';

interface TrustCard {
  number: string;
  title: string;
  description: string;
}

interface TrustColumn {
  type: 'photo-first' | 'card-first';
  card: TrustCard;
  photo: {
    src: string;
    alt: string;
  };
}

const TRUST_COLUMNS: TrustColumn[] = [
  {
    type: 'photo-first',
    photo: {
      src: '/assets/mitijen/home1.jpeg',
      alt: 'Warm sunlit minimalist living interior with natural oak and linen daybed'
    },
    card: {
      number: '250+',
      title: 'Project Completed',
      description: 'Delivering thoughtfully designed spaces across industries.'
    }
  },
  {
    type: 'card-first',
    card: {
      number: '15+',
      title: 'Years of Experience',
      description: 'Shaping timeless interiors with unmatched creative expertise.'
    },
    photo: {
      src: '/assets/mitijen/hom2.jpeg',
      alt: 'Serene contemporary architectural residence with natural plaster textures'
    }
  },
  {
    type: 'photo-first',
    photo: {
      src: '/assets/mitijen/kitchen.jpeg',
      alt: 'Illuminated contemporary culinary space with monolithic island plinth'
    },
    card: {
      number: '98+',
      title: 'Client Satisfaction',
      description: 'Built on exceptional client trust and satisfaction.'
    }
  },
  {
    type: 'card-first',
    card: {
      number: '12',
      title: 'Design Awards',
      description: 'Recognized for exceptional client satisfaction consistently.'
    },
    photo: {
      src: '/assets/mitijen/bedroom.jpeg',
      alt: 'Minimalist architectural lounge overlooking peaceful natural daylight'
    }
  }
];

export const DesignProcess: React.FC = () => {
  return (
    <section className="built-on-trust-section" id="process" aria-label="BUILT ON TRUST">
      <div className="built-on-trust-container">
        {/* Header Block with Slower Editorial Reveal */}
        <div className="built-on-trust-header reveal-fade-up">
          <div className="trust-badge badge-float">
            <span className="trust-badge-dot" />
            <span>Proven Excellence</span>
          </div>

          <h2 className="trust-title">
            Built On Trust
          </h2>

          <p className="trust-subtitle">
            Built through timeless craftsmanship and lasting client relationships.
          </p>
        </div>

        {/* 4-Column Alternating Bento Grid with Staggered Scroll Animation */}
        <div className="trust-grid">
          {TRUST_COLUMNS.map((col, idx) => (
            <div
              key={idx}
              className="trust-column reveal-fade-up"
              data-delay={String((idx + 1) * 120)}
            >
              {col.type === 'photo-first' ? (
                <>
                  {/* Photo on Top */}
                  <div className="trust-photo-card img-zoom-hover">
                    <img
                      src={col.photo.src}
                      alt={col.photo.alt}
                      className="trust-photo-img"
                      loading="lazy"
                    />
                  </div>

                  {/* Stat Card on Bottom */}
                  <div className="trust-stat-card hover-lift">
                    <div className="trust-number">{col.card.number}</div>
                    <h3 className="trust-card-title">{col.card.title}</h3>
                    <p className="trust-card-desc">{col.card.description}</p>
                  </div>
                </>
              ) : (
                <>
                  {/* Stat Card on Top */}
                  <div className="trust-stat-card hover-lift">
                    <div className="trust-number">{col.card.number}</div>
                    <h3 className="trust-card-title">{col.card.title}</h3>
                    <p className="trust-card-desc">{col.card.description}</p>
                  </div>

                  {/* Photo on Bottom */}
                  <div className="trust-photo-card img-zoom-hover">
                    <img
                      src={col.photo.src}
                      alt={col.photo.alt}
                      className="trust-photo-img"
                      loading="lazy"
                    />
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
