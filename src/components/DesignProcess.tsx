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
      number: '15+',
      title: 'Years of Experience',
      description: 'A well-established interior design brand with experience across diverse project requirements.'
    }
  },
  {
    type: 'card-first',
    card: {
      number: '2000+',
      title: 'Projects Completed',
      description: 'A wide range of completed residential, commercial and corporate interior projects.'
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
      number: '5.0',
      title: 'Client Rating',
      description: 'A 5.0 rating reflecting positive client experiences across completed projects.'
    }
  },
  {
    type: 'card-first',
    card: {
      number: '2D & 3D',
      title: 'Design Visualisation',
      description: 'Clear 2D and 3D presentations that help clients understand the proposed interior before execution.'
    },
    photo: {
      src: '/assets/mitijen/bedroom.jpeg',
      alt: 'Minimalist architectural lounge overlooking peaceful natural daylight'
    }
  }
];

export const DesignProcess: React.FC = () => {
  return (
    <section className="built-on-trust-section" id="process" aria-label="AT A GLANCE">
      <div className="built-on-trust-container">
        {/* Header Block with Slower Editorial Reveal */}
        <div className="built-on-trust-header reveal-fade-up">
          <div className="trust-badge badge-float">
            <span className="trust-badge-dot" />
            <span>AT A GLANCE</span>
          </div>

          <h2 className="trust-title">
            EXPERIENCE THAT SPEAKS
          </h2>
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
