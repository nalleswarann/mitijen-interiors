import React, { useState, useRef, useEffect, useCallback } from 'react';
import { ROOM_CATEGORIES, type Room, type RoomHotspot } from '../data/rooms';
import '../styles/RoomExplorer.css';

export const RoomExplorer: React.FC = () => {
  const [activeCategory, setActiveCategory] = useState<'residential' | 'commercial' | 'corporate'>('residential');
  const [activeRoomIndex, setActiveRoomIndex] = useState(0);
  const [activeHotspotId, setActiveHotspotId] = useState<string | null>(null);
  const [showHotspots, setShowHotspots] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  const stageRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const autoPlayTimerRef = useRef<number | null>(null);
  const tipTimerRef = useRef<number | null>(null);

  const currentCategoryData = ROOM_CATEGORIES[activeCategory] || ROOM_CATEGORIES.residential;
  const rooms = currentCategoryData.rooms;
  const currentRoom: Room = rooms[activeRoomIndex] || rooms[0];
  const activeHotspot = currentRoom.hotspots.find((spot) => spot.id === activeHotspotId);

  const handleSelectCategory = (cat: 'residential' | 'commercial' | 'corporate') => {
    setActiveCategory(cat);
    setActiveRoomIndex(0);
    setActiveHotspotId(null);
    setIsDetailsOpen(false);
    setIsPlaying(false);
  };

  // Change room with cleanup
  const handleSelectRoom = useCallback((index: number, shouldFocus = false) => {
    const total = rooms.length;
    const resolvedIndex = (index + total) % total;
    setActiveRoomIndex(resolvedIndex);
    setActiveHotspotId(null);
    setIsDetailsOpen(false);

    tabRefs.current[resolvedIndex]?.scrollIntoView({
      behavior: 'smooth',
      block: 'nearest',
      inline: 'center'
    });

    if (shouldFocus) {
      tabRefs.current[resolvedIndex]?.focus();
    }
  }, [rooms.length]);

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
      e.preventDefault();
      handleSelectRoom(index + 1, true);
    } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
      e.preventDefault();
      handleSelectRoom(index - 1, true);
    } else if (e.key === 'Home') {
      e.preventDefault();
      handleSelectRoom(0, true);
    } else if (e.key === 'End') {
      e.preventDefault();
      handleSelectRoom(rooms.length - 1, true);
    }
  };

  // Global escape key listener
  useEffect(() => {
    const handleGlobalKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (isLightboxOpen) {
          setIsLightboxOpen(false);
        } else if (isDetailsOpen) {
          setIsDetailsOpen(false);
        } else if (activeHotspotId) {
          setActiveHotspotId(null);
        }
      }
    };
    window.addEventListener('keydown', handleGlobalKey);
    return () => window.removeEventListener('keydown', handleGlobalKey);
  }, [isLightboxOpen, isDetailsOpen, activeHotspotId]);

  // Clean up timers on unmount
  useEffect(() => {
    return () => {
      if (tipTimerRef.current) {
        window.clearTimeout(tipTimerRef.current);
      }
    };
  }, []);

  // Autoplay auto-tour mechanism (5s interval matching reference)
  useEffect(() => {
    if (!isPlaying) {
      if (autoPlayTimerRef.current) {
        window.clearInterval(autoPlayTimerRef.current);
        autoPlayTimerRef.current = null;
      }
      return;
    }

    autoPlayTimerRef.current = window.setInterval(() => {
      setActiveRoomIndex((prev) => (prev + 1) % rooms.length);
      setActiveHotspotId(null);
    }, 5000);

    return () => {
      if (autoPlayTimerRef.current) {
        window.clearInterval(autoPlayTimerRef.current);
      }
    };
  }, [isPlaying, rooms.length]);

  // Subtle 2D mouse parallax shift on desktop matching reference
  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (isReduced || !stageRef.current) return;

    const rect = stageRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;

    const layers = stageRef.current.querySelectorAll<HTMLImageElement>('.room-stage-layer > img');
    layers.forEach((img) => {
      img.style.setProperty('--tx', `${-x * 16}px`);
      img.style.setProperty('--ty', `${-y * 10}px`);
    });
  };

  const handlePointerLeave = () => {
    if (!stageRef.current) return;
    const layers = stageRef.current.querySelectorAll<HTMLImageElement>('.room-stage-layer > img');
    layers.forEach((img) => {
      img.style.setProperty('--tx', '0px');
      img.style.setProperty('--ty', '0px');
    });
  };

  // Toggle hotspot pin with auto-dismiss timer
  const handleTogglePin = (id: string) => {
    if (tipTimerRef.current) {
      window.clearTimeout(tipTimerRef.current);
      tipTimerRef.current = null;
    }
    setActiveHotspotId((prev) => {
      if (prev === id) return null;
      tipTimerRef.current = window.setTimeout(() => {
        setActiveHotspotId(null);
      }, 4500);
      return id;
    });
  };

  // Mobile toggle hotspot pin
  const handleToggleHotspot = (spot: RoomHotspot, e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveHotspotId((prev) => (prev === spot.id ? null : spot.id));
  };

  // Inspect fullscreen / lightbox
  const handleInspect = () => {
    if (stageRef.current) {
      const el = stageRef.current as HTMLElement & {
        webkitRequestFullscreen?: () => Promise<void>;
      };
      if (el.requestFullscreen) {
        el.requestFullscreen().catch(() => setIsLightboxOpen(true));
        return;
      } else if (el.webkitRequestFullscreen) {
        el.webkitRequestFullscreen();
        return;
      }
    }
    setIsLightboxOpen(true);
  };

  return (
    <section className="room-explorer-section" id="journal" aria-label="Room by Room Spatial Tour">
      <div className="room-explorer-container">
        {/* Desktop Architecture View (>= 769px) */}
        <div className="room-desktop-explorer-view">
          {/* Category Selector Tabs */}
          <div className="room-category-switcher" role="tablist" aria-label="Explore disciplines">
            {(['residential', 'commercial', 'corporate'] as const).map((cat) => (
              <button
                key={cat}
                type="button"
                role="tab"
                aria-selected={activeCategory === cat}
                className={`room-cat-btn ${activeCategory === cat ? 'is-active' : ''}`}
                onClick={() => handleSelectCategory(cat)}
              >
                {ROOM_CATEGORIES[cat].name.toUpperCase()}
              </button>
            ))}
          </div>

          {/* Cinematic Interactive Showcase Container */}
          <div
            ref={stageRef}
            className={`room-stage-cinematic ${isPlaying ? 'is-touring' : ''} ${!showHotspots ? 'is-pins-off' : ''}`}
            onPointerMove={handlePointerMove}
            onPointerLeave={handlePointerLeave}
          >
            {/* Background crossfading architectural photo layers */}
            {rooms.map((room, i) => {
              const isActive = activeRoomIndex === i;
              return (
                <div
                  key={room.k}
                  className={`room-stage-layer ${isActive ? 'is-active' : ''}`}
                >
                  <img
                    src={room.image}
                    alt={`${room.t} interior`}
                    loading={i === 0 ? 'eager' : 'lazy'}
                  />
                  {/* Hotspot Pins for this room layer */}
                  {showHotspots &&
                    room.hotspots.map((spot) => (
                      <button
                        key={spot.id}
                        type="button"
                        className={`room-stage-pin ${activeHotspotId === spot.id ? 'is-active' : ''}`}
                        style={{ left: `${spot.x}%`, top: `${spot.y}%` }}
                        aria-label={`Detail: ${spot.title}`}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleTogglePin(spot.id);
                        }}
                      >
                        +
                      </button>
                    ))}
                </div>
              );
            })}

            {/* Top-Left: Narrative Header */}
            <div className="room-stage-top">
              <div className="room-stage-kicker">
                <span className="room-kicker-dot" aria-hidden="true" />
                <span>{currentCategoryData.kicker || 'EXPLORE THE SPACE'}</span>
              </div>
              <h2 className="room-stage-title">
                {currentCategoryData.title}
              </h2>
              <p className="room-stage-lead">
                {currentCategoryData.lead}
              </p>
            </div>

            {/* Top-Right: Dark Floating Information Panel */}
            <div className="room-stage-card" aria-live="polite">
              <small className="room-card-kicker">
                {currentRoom.subtitle || currentRoom.area || currentCategoryData.name}
              </small>
              <h3 className="room-card-title">{currentRoom.t}</h3>
              <p className="room-card-desc">{currentRoom.d}</p>
              <dl className="room-card-specs">
                {currentRoom.specs.map((spec, sIdx) => (
                  <div key={sIdx}>
                    <dt>{spec.label}</dt>
                    <dd>{spec.value}</dd>
                  </div>
                ))}
              </dl>
              {currentRoom.materials && currentRoom.materials.length > 0 && (
                <div className="room-card-materials">
                  {currentRoom.materials.join(' · ')}
                </div>
              )}
            </div>

            {/* Hotspot Popover Tooltip */}
            {activeHotspot && (
              <div className="room-stage-tip" role="status">
                <div className="room-tip-header">
                  <span className="room-tip-title">{activeHotspot.title}</span>
                  <button
                    type="button"
                    className="room-tip-close"
                    onClick={() => setActiveHotspotId(null)}
                    aria-label="Close detail"
                  >
                    ✕
                  </button>
                </div>
                <p className="room-tip-desc">{activeHotspot.description}</p>
                {activeHotspot.material && (
                  <span className="room-tip-mat">· {activeHotspot.material}</span>
                )}
              </div>
            )}

            {/* Bottom Bar: Timeline Navigation + Action Controls */}
            <div className="room-stage-bot">
              {/* Horizontal Room Timeline Rail */}
              <div className="room-stage-rail" role="tablist" aria-label="Room selection timeline">
                {rooms.map((room, i) => {
                  const isActive = activeRoomIndex === i;
                  return (
                    <button
                      key={room.k}
                      ref={(el) => {
                        tabRefs.current[i] = el;
                      }}
                      type="button"
                      role="tab"
                      aria-selected={isActive}
                      tabIndex={isActive ? 0 : -1}
                      className={`room-stage-rt ${isActive ? 'is-active' : ''}`}
                      onClick={() => {
                        setIsPlaying(false);
                        handleSelectRoom(i);
                      }}
                      onKeyDown={(e) => handleKeyDown(e, i)}
                    >
                      <span className="room-rt-no">0{i + 1}</span>
                      <b className="room-rt-name">{room.t}</b>
                      <small className="room-rt-meta">{room.area || ''}</small>
                      <i className="room-rt-progress" aria-hidden="true" />
                    </button>
                  );
                })}
              </div>

              {/* Action Controls */}
              <div className="room-stage-ctl">
                <button
                  type="button"
                  className="room-stage-ar"
                  onClick={() => {
                    setIsPlaying(false);
                    handleSelectRoom(activeRoomIndex - 1);
                  }}
                  aria-label="Previous room"
                >
                  ‹
                </button>
                <button
                  type="button"
                  className="room-stage-ar"
                  onClick={() => {
                    setIsPlaying(false);
                    handleSelectRoom(activeRoomIndex + 1);
                  }}
                  aria-label="Next room"
                >
                  ›
                </button>
                <button
                  type="button"
                  className={`room-stage-sm ${isPlaying ? 'is-active' : ''}`}
                  aria-pressed={isPlaying}
                  onClick={() => setIsPlaying(!isPlaying)}
                >
                  {isPlaying ? '■ Stop tour' : '▶ Auto tour'}
                </button>
                <button
                  type="button"
                  className={`room-stage-sm ${showHotspots ? 'is-active' : ''}`}
                  aria-pressed={showHotspots}
                  onClick={() => setShowHotspots(!showHotspots)}
                >
                  Pins
                </button>
                <button
                  type="button"
                  className="room-stage-sm"
                  onClick={handleInspect}
                >
                  Inspect
                </button>
                <span className="room-stage-cnt" aria-live="polite">
                  <b>{activeRoomIndex + 1}</b> / {rooms.length}
                </span>
              </div>
            </div>
          </div>
        </div>
        {/* End Desktop Architecture View */}

        {/* Mobile Architectural Space Explorer (< 769px) */}
        <div className="room-mobile-explorer-view">
          {/* Section Introduction */}
          <div className="room-mob-intro">
            <span className="room-mob-eyebrow">
              <span className="room-mob-bullet" aria-hidden="true" />
              EXPLORE THE SPACE
            </span>
            <h2 className="room-mob-heading">EXPLORE EVERY SPACE.</h2>
            <p className="room-mob-intro-desc">
              Explore thoughtfully designed residential, corporate and commercial environments, where every space is planned around its purpose, functionality and experience.
            </p>
          </div>

          {/* Primary Category Switcher */}
          <div className="room-mob-category-switcher" role="tablist" aria-label="Explore disciplines">
            {(['residential', 'corporate', 'commercial'] as const).map((cat, idx) => (
              <button
                key={cat}
                type="button"
                role="tab"
                aria-selected={activeCategory === cat}
                className={`room-mob-cat-btn ${activeCategory === cat ? 'is-active' : ''}`}
                onClick={() => {
                  handleSelectCategory(cat);
                  setIsPlaying(false);
                  setIsDetailsOpen(false);
                }}
              >
                <span>{idx + 1}. {ROOM_CATEGORIES[cat].name.toUpperCase()}</span>
              </button>
            ))}
          </div>

          {/* Architectural Image Canvas Card */}
          <div className="room-mob-canvas-card">
            {/* Story Progress Bars (4 segments across top) */}
            <div className="room-mob-story-bars" aria-hidden="true">
              {rooms.map((_, idx) => (
                <button
                  key={idx}
                  type="button"
                  className={`room-mob-story-bar ${activeRoomIndex === idx ? 'is-active' : ''} ${isPlaying && activeRoomIndex === idx ? 'is-animating' : ''}`}
                  onClick={() => {
                    handleSelectRoom(idx);
                    setIsPlaying(false);
                  }}
                  aria-label={`Jump to room ${idx + 1}`}
                />
              ))}
            </div>

            {/* Room Navigation Tabs */}
            <div className="room-mob-nav-tabs" role="tablist" aria-label="Room categories">
              {rooms.map((room, idx) => {
                const isActive = activeRoomIndex === idx;
                return (
                  <button
                    key={room.k}
                    type="button"
                    role="tab"
                    aria-selected={isActive}
                    className={`room-mob-nav-tab ${isActive ? 'is-active' : ''}`}
                    onClick={() => {
                      handleSelectRoom(idx);
                      setIsPlaying(false);
                    }}
                  >
                    <span>{room.t.toUpperCase()}</span>
                    {isActive && <span className="room-mob-tab-indicator" />}
                  </button>
                );
              })}
            </div>

            {/* Crossfading Architectural Photos */}
            <div className="room-mob-image-viewport">
              {rooms.map((room, idx) => (
                <img
                  key={room.k}
                  src={room.image}
                  alt={`${room.t} interior`}
                  className={`room-mob-image-layer ${activeRoomIndex === idx ? 'is-active' : ''}`}
                  loading={idx === 0 ? 'eager' : 'lazy'}
                />
              ))}

              {/* Scrims for readability */}
              <div className="room-mob-scrim-top" aria-hidden="true" />
              <div className="room-mob-scrim-bottom" aria-hidden="true" />
            </div>

            {/* Interactive Hotspot Pins */}
            {showHotspots &&
              currentRoom.hotspots.map((spot) => {
                const isOpen = activeHotspotId === spot.id;
                return (
                  <div
                    key={spot.id}
                    className={`room-mob-hotspot ${isOpen ? 'is-open' : ''}`}
                    style={{ left: `${spot.x}%`, top: `${spot.y}%` }}
                    onClick={(e) => handleToggleHotspot(spot, e)}
                  >
                    <button
                      type="button"
                      className="room-mob-hotspot-pin"
                      aria-expanded={isOpen}
                      aria-label={`Hotspot: ${spot.title}`}
                    >
                      <span className="room-mob-hotspot-pulse" aria-hidden="true" />
                      <span className="room-mob-hotspot-icon" aria-hidden="true">
                        {isOpen ? '✕' : '+'}
                      </span>
                    </button>

                    {isOpen && (
                      <div
                        className="room-mob-hotspot-popover"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <div className="room-mob-popover-tag-row">
                          <span className="room-mob-popover-tag">CRAFT DETAIL</span>
                          <button
                            type="button"
                            className="room-mob-popover-close"
                            onClick={(e) => {
                              e.stopPropagation();
                              setActiveHotspotId(null);
                            }}
                            aria-label="Close detail"
                          >
                            ✕
                          </button>
                        </div>
                        <h4 className="room-mob-popover-title">{spot.title}</h4>
                        <p className="room-mob-popover-desc">{spot.description}</p>
                        <span className="room-mob-popover-mat">{spot.material}</span>
                      </div>
                    )}
                  </div>
                );
              })}

            {/* Floating Room Information Panel (Collapsed state) */}
            {!isDetailsOpen && (
              <div className="room-mob-floating-panel">
                <div className="room-mob-panel-text">
                  <span className="room-mob-panel-kicker">
                    {currentRoom.area?.toUpperCase() || currentCategoryData.name.toUpperCase()}
                  </span>
                  <h3 className="room-mob-panel-title">{currentRoom.t}</h3>
                  <p className="room-mob-panel-desc">{currentRoom.d}</p>
                </div>
                <button
                  type="button"
                  className="room-mob-details-btn"
                  onClick={() => {
                    setIsDetailsOpen(true);
                    setActiveHotspotId(null);
                  }}
                  aria-label="View room design specifications and materials"
                >
                  <span>DETAILS</span>
                  <span className="room-mob-details-arrow" aria-hidden="true">↑</span>
                </button>
              </div>
            )}

            {/* Expanded Details Drawer */}
            {isDetailsOpen && (
              <div className="room-mob-details-drawer" role="dialog" aria-modal="true" aria-label={`${currentRoom.t} details`}>
                <div className="room-mob-drawer-header">
                  <h3 className="room-mob-drawer-title">{currentRoom.t}</h3>
                  <button
                    type="button"
                    className="room-mob-drawer-close"
                    onClick={() => setIsDetailsOpen(false)}
                    aria-label="Close room details"
                  >
                    <span>CLOSE</span>
                    <span>✕</span>
                  </button>
                </div>

                <p className="room-mob-drawer-desc">{currentRoom.d}</p>

                {/* 2-Column Specifications Grid */}
                <div className="room-mob-specs-grid">
                  {currentRoom.specs.map((spec, sIdx) => (
                    <div key={sIdx} className="room-mob-spec-item">
                      <span className="room-mob-spec-label">{spec.label}</span>
                      <span className="room-mob-spec-val">{spec.value}</span>
                    </div>
                  ))}
                  {currentRoom.area && (
                    <div className="room-mob-spec-item">
                      <span className="room-mob-spec-label">AREA</span>
                      <span className="room-mob-spec-val">{currentRoom.area}</span>
                    </div>
                  )}
                </div>

                {/* Material Palette Chips */}
                {currentRoom.materials && currentRoom.materials.length > 0 && (
                  <div className="room-mob-materials-wrap">
                    {currentRoom.materials.map((mat, mIdx) => (
                      <span key={mIdx} className="room-mob-material-pill">
                        {mat}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Navigation Controls Bar (Below Card) */}
          <div className="room-mob-controls-bar">
            <div className="room-mob-controls-left">
              <button
                type="button"
                className="room-mob-circle-btn"
                onClick={() => {
                  handleSelectRoom(activeRoomIndex - 1);
                  setIsPlaying(false);
                }}
                aria-label="Previous architectural room"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="15 18 9 12 15 6" />
                </svg>
              </button>

              <button
                type="button"
                className="room-mob-circle-btn"
                onClick={() => {
                  handleSelectRoom(activeRoomIndex + 1);
                  setIsPlaying(false);
                }}
                aria-label="Next architectural room"
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="9 18 15 12 9 6" />
                </svg>
              </button>

              <button
                type="button"
                className={`room-mob-autotour-btn ${isPlaying ? 'is-playing' : ''}`}
                onClick={() => setIsPlaying(!isPlaying)}
                title={isPlaying ? 'Pause automated tour' : 'Start automated architectural tour'}
              >
                {isPlaying ? (
                  <>
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor">
                      <rect x="6" y="4" width="4" height="16" />
                      <rect x="14" y="4" width="4" height="16" />
                    </svg>
                    <span>PAUSE TOUR</span>
                  </>
                ) : (
                  <>
                    <svg width="11" height="11" viewBox="0 0 24 24" fill="currentColor">
                      <polygon points="5 3 19 12 5 21 5 3" />
                    </svg>
                    <span>AUTO TOUR</span>
                  </>
                )}
              </button>
            </div>

            <div className="room-mob-counter">
              <span>Room <strong>{activeRoomIndex + 1}</strong> of {rooms.length}</span>
            </div>
          </div>
        </div>
      </div>

      {/* 3. Fullscreen Lightbox Modal */}
      {isLightboxOpen && (
        <div
          className="room-lightbox-backdrop"
          onClick={() => setIsLightboxOpen(false)}
          role="dialog"
          aria-modal="true"
          aria-label="High-resolution room inspection"
        >
          <div className="room-lightbox-content" onClick={(e) => e.stopPropagation()}>
            <div className="room-lightbox-header">
              <h3 className="room-lightbox-title">{currentRoom.t} · {currentRoom.subtitle}</h3>
              <button
                type="button"
                className="room-lightbox-close"
                onClick={() => setIsLightboxOpen(false)}
                aria-label="Close inspection lightbox"
              >
                ✕
              </button>
            </div>
            <img
              src={currentRoom.image}
              alt={`${currentRoom.t} high resolution view`}
              className="room-lightbox-img"
            />
          </div>
        </div>
      )}
    </section>
  );
};
