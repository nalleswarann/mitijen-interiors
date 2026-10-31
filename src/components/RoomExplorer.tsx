import React, { useState, useRef, useEffect, useCallback } from 'react';
import { ROOMS, type Room, type RoomHotspot } from '../data/rooms';
import '../styles/RoomExplorer.css';

export const RoomExplorer: React.FC = () => {
  const [activeRoomIndex, setActiveRoomIndex] = useState(0);
  const [activeHotspotId, setActiveHotspotId] = useState<string | null>(null);
  const [showHotspots, setShowHotspots] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);

  const stageRef = useRef<HTMLDivElement>(null);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const autoPlayTimerRef = useRef<number | null>(null);

  const currentRoom: Room = ROOMS[activeRoomIndex] || ROOMS[0];

  // Change room with cleanup
  const handleSelectRoom = useCallback((index: number, shouldFocus = false) => {
    const total = ROOMS.length;
    const resolvedIndex = (index + total) % total;
    setActiveRoomIndex(resolvedIndex);
    setActiveHotspotId(null);

    if (shouldFocus) {
      tabRefs.current[resolvedIndex]?.focus();
    }
  }, []);

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
      handleSelectRoom(ROOMS.length - 1, true);
    }
  };

  // Global escape key listener
  useEffect(() => {
    const handleGlobalKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (isLightboxOpen) {
          setIsLightboxOpen(false);
        } else if (activeHotspotId) {
          setActiveHotspotId(null);
        }
      }
    };
    window.addEventListener('keydown', handleGlobalKey);
    return () => window.removeEventListener('keydown', handleGlobalKey);
  }, [isLightboxOpen, activeHotspotId]);

  // Autoplay auto-tour mechanism
  useEffect(() => {
    if (!isPlaying) {
      if (autoPlayTimerRef.current) {
        window.clearInterval(autoPlayTimerRef.current);
        autoPlayTimerRef.current = null;
      }
      return;
    }

    autoPlayTimerRef.current = window.setInterval(() => {
      setActiveRoomIndex((prev) => (prev + 1) % ROOMS.length);
      setActiveHotspotId(null);
    }, 6000);

    return () => {
      if (autoPlayTimerRef.current) {
        window.clearInterval(autoPlayTimerRef.current);
      }
    };
  }, [isPlaying]);

  // Subtle 3D mouse parallax tilt on desktop
  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (isReduced || window.innerWidth < 1024 || !stageRef.current) return;

    const rect = stageRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;

    const rotateY = x * 4; // -2 to +2 deg
    const rotateX = -y * 4; // -2 to +2 deg

    stageRef.current.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.01, 1.01, 1.01)`;
  };

  const handlePointerLeave = () => {
    if (!stageRef.current) return;
    stageRef.current.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)';
  };

  // Toggle hotspot pin
  const handleToggleHotspot = (spot: RoomHotspot, e: React.MouseEvent) => {
    e.stopPropagation();
    setActiveHotspotId((prev) => (prev === spot.id ? null : spot.id));
  };

  return (
    <section className="room-explorer-section" id="journal" aria-label="Room by Room Spatial Tour">
      <div className="room-explorer-container">
        {/* 1. Editorial Side-by-Side Section Header */}
        <div className="room-explorer-header">
          <div className="room-explorer-header-left">
            <span className="room-explorer-kicker">Explore The Space</span>
            <h2 className="room-explorer-title">
              One home, room by room.
            </h2>
          </div>
          <div className="room-explorer-header-right">
            <p className="room-explorer-lead">
              Journey through our signature residential commissions. Select any space to inspect bespoke architectural millwork, ambient lighting studies, and tactile material layers in high resolution.
            </p>
          </div>
        </div>

        {/* 2. Main Interactive Showcase Grid */}
        <div className="room-explorer-grid">
          {/* Left Column: Interactive Room Selection & Spatial Narrative */}
          <div className="room-left-col">
            {/* Interactive Room Tabs */}
            <div className="room-nav-tabs" role="tablist" aria-label="Residential commission spaces">
              {ROOMS.map((room, i) => {
                const isActive = activeRoomIndex === i;
                return (
                  <button
                    key={room.k}
                    ref={(el) => {
                      tabRefs.current[i] = el;
                    }}
                    role="tab"
                    id={`room-tab-${i}`}
                    aria-selected={isActive}
                    tabIndex={isActive ? 0 : -1}
                    className={`room-tab-btn ${isActive ? 'is-active' : ''}`}
                    onClick={() => {
                      handleSelectRoom(i);
                      setIsPlaying(false);
                    }}
                    onKeyDown={(e) => handleKeyDown(e, i)}
                    aria-label={`View ${room.t} architectural space`}
                  >
                    <div className="room-tab-content">
                      <h3 className="room-tab-title">{room.t}</h3>
                      <span className="room-tab-subtitle">{room.subtitle}</span>
                    </div>

                    <div className="room-tab-indicator">
                      <span className="room-tab-area">{room.area}</span>
                      <span className="room-tab-line" aria-hidden="true" />
                    </div>
                  </button>
                );
              })}
            </div>

            {/* Active Room Narrative & Micro-Specs Card */}
            <div className="room-narrative-card" aria-live="polite">
              <p className="room-narrative-desc">
                {currentRoom.d}
              </p>

              {/* Architectural Specs Row */}
              <div className="room-specs-grid">
                {currentRoom.specs.map((spec, sIdx) => (
                  <div key={sIdx} className="room-spec-item">
                    <span className="room-spec-label">{spec.label}</span>
                    <span className="room-spec-value">{spec.value}</span>
                  </div>
                ))}
              </div>

              {/* Material Palette Chips */}
              <div className="room-materials-wrap">
                <span className="room-materials-label">Materials:</span>
                {currentRoom.materials.map((mat, mIdx) => (
                  <span key={mIdx} className="room-material-pill">
                    {mat}
                  </span>
                ))}
              </div>
            </div>

            {/* Bottom Navigation & Tour Toolbar */}
            <div className="room-tour-bar">
              <div className="room-tour-controls">
                <button
                  type="button"
                  className="room-nav-btn"
                  onClick={() => {
                    handleSelectRoom(activeRoomIndex - 1);
                    setIsPlaying(false);
                  }}
                  aria-label="Previous architectural room"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="15 18 9 12 15 6" />
                  </svg>
                </button>

                <button
                  type="button"
                  className="room-nav-btn"
                  onClick={() => {
                    handleSelectRoom(activeRoomIndex + 1);
                    setIsPlaying(false);
                  }}
                  aria-label="Next architectural room"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                </button>

                <button
                  type="button"
                  className={`room-play-btn ${isPlaying ? 'is-playing' : ''}`}
                  onClick={() => setIsPlaying(!isPlaying)}
                  title={isPlaying ? 'Pause automated tour' : 'Start automated architectural tour'}
                >
                  {isPlaying ? (
                    <>
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                        <rect x="6" y="4" width="4" height="16" />
                        <rect x="14" y="4" width="4" height="16" />
                      </svg>
                      <span>Pause Tour</span>
                    </>
                  ) : (
                    <>
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor">
                        <polygon points="5 3 19 12 5 21 5 3" />
                      </svg>
                      <span>Auto Tour</span>
                    </>
                  )}
                </button>
              </div>

              <div className="room-counter">
                <span>Room <strong>{activeRoomIndex + 1}</strong> of {ROOMS.length}</span>
              </div>
            </div>
          </div>

          {/* Right Column: Cinematic Interactive Photography Stage */}
          <div className="room-right-col">
            <div className="room-stage-perspective-wrap">
              <div
                ref={stageRef}
                className="room-stage-container"
                onPointerMove={handlePointerMove}
                onPointerLeave={handlePointerLeave}
                onClick={() => setActiveHotspotId(null)}
              >
                {/* Layered Crossfading Architectural Photos */}
                {ROOMS.map((room, i) => (
                  <img
                    key={room.k}
                    src={room.image}
                    alt={`${room.t} interior architecture`}
                    className={`room-image-layer ${activeRoomIndex === i ? 'is-active' : ''}`}
                    loading={i === 0 ? 'eager' : 'lazy'}
                  />
                ))}

                {/* Subtle Cinematic Vignette Scrim */}
                <div className="room-stage-scrim" aria-hidden="true" />

                {/* Top Floating Glass Badges & Controls */}
                <div className="room-stage-topbar">
                  <div className="room-stage-badge">
                    <span className="room-badge-dot" />
                    <span>Mitjen Studio Commission</span>
                  </div>

                  <div className="room-stage-actions">
                    <button
                      type="button"
                      className={`room-action-btn ${showHotspots ? 'is-active' : ''}`}
                      onClick={(e) => {
                        e.stopPropagation();
                        setShowHotspots(!showHotspots);
                      }}
                      title="Toggle interactive craftsmanship hotspots"
                    >
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="12" cy="12" r="10" />
                        <line x1="12" y1="8" x2="12" y2="16" />
                        <line x1="8" y1="12" x2="16" y2="12" />
                      </svg>
                      <span>{showHotspots ? 'Pins On' : 'Pins Off'}</span>
                    </button>

                    <button
                      type="button"
                      className="room-action-btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        setIsLightboxOpen(true);
                      }}
                      title="Inspect high-resolution full view"
                    >
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <polyline points="15 3 21 3 21 9" />
                        <polyline points="9 21 3 21 3 15" />
                        <line x1="21" y1="3" x2="14" y2="10" />
                        <line x1="3" y1="21" x2="10" y2="14" />
                      </svg>
                      <span>Inspect</span>
                    </button>
                  </div>
                </div>

                {/* Interactive Hotspot Pins */}
                {showHotspots &&
                  currentRoom.hotspots.map((spot) => {
                    const isOpen = activeHotspotId === spot.id;
                    const isTopZone = spot.y < 30;

                    return (
                      <div
                        key={spot.id}
                        className={`room-hotspot ${isOpen ? 'is-open' : ''} ${isTopZone ? 'align-down' : ''}`}
                        style={{ left: `${spot.x}%`, top: `${spot.y}%` }}
                        onClick={(e) => handleToggleHotspot(spot, e)}
                        role="button"
                        tabIndex={0}
                        aria-expanded={isOpen}
                        aria-label={`Hotspot: ${spot.title}`}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault();
                            handleToggleHotspot(spot, e as unknown as React.MouseEvent);
                          }
                        }}
                      >
                        <div className="room-hotspot-pin">
                          <span className="room-hotspot-pulse" />
                          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                            {isOpen ? (
                              <>
                                <line x1="18" y1="6" x2="6" y2="18" />
                                <line x1="6" y1="6" x2="18" y2="18" />
                              </>
                            ) : (
                              <>
                                <line x1="12" y1="5" x2="12" y2="19" />
                                <line x1="5" y1="12" x2="19" y2="12" />
                              </>
                            )}
                          </svg>
                        </div>

                        {/* Architectural Detail Card Popover */}
                        <div
                          className="room-hotspot-popover"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <div className="room-popover-tag">
                            <span>Craft Detail</span>
                            <button
                              type="button"
                              className="room-popover-close"
                              onClick={(e) => {
                                e.stopPropagation();
                                setActiveHotspotId(null);
                              }}
                              aria-label="Close detail"
                            >
                              ×
                            </button>
                          </div>
                          <h4 className="room-popover-title">{spot.title}</h4>
                          <p className="room-popover-desc">{spot.description}</p>
                          <span className="room-popover-material">{spot.material}</span>
                        </div>
                      </div>
                    );
                  })}

                {/* Bottom In-Stage Status */}
                <div className="room-stage-bottombar">
                  <div className="room-stage-caption">
                    <h4 className="room-stage-caption-title">{currentRoom.t}</h4>
                    <span className="room-stage-caption-sub">{currentRoom.subtitle}</span>
                  </div>

                  <span className="room-stage-hint">
                    {showHotspots ? 'Tap pins for joinery details' : 'Unobstructed perspective'}
                  </span>
                </div>
              </div>
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
