import React, { useState, useRef, useCallback } from 'react';
import { ROOMS } from '../data/rooms';
import { SectionLabel } from './common/SectionLabel';
import { ImagePlate } from './common/ImagePlate';

export const RoomExplorer: React.FC = () => {
  const [activeRoomIndex, setActiveRoomIndex] = useState(0);
  const tabRefs = useRef<(HTMLButtonElement | null)[]>([]);
  const viewRef = useRef<HTMLDivElement>(null);

  const setRoom = useCallback((newIndex: number, shouldFocus = false) => {
    const total = ROOMS.length;
    const resolvedIndex = (newIndex + total) % total;
    setActiveRoomIndex(resolvedIndex);

    if (shouldFocus) {
      tabRefs.current[resolvedIndex]?.focus();
    }
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent, index: number) => {
    if (e.key === 'ArrowDown' || e.key === 'ArrowRight') {
      e.preventDefault();
      setRoom(index + 1, true);
    } else if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') {
      e.preventDefault();
      setRoom(index - 1, true);
    }
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const isReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (isReduced || window.innerWidth < 860 || !viewRef.current) return;

    const rect = viewRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;

    const activeInner = viewRef.current.querySelectorAll<HTMLElement>('.plate.on > i');
    activeInner.forEach((el) => {
      el.style.transform = `scale(1.06) translate(${-x * 14}px, ${-y * 10}px)`;
    });
  };

  const handlePointerLeave = () => {
    if (!viewRef.current) return;
    const allInner = viewRef.current.querySelectorAll<HTMLElement>('.plate > i');
    allInner.forEach((el) => {
      el.style.transform = '';
    });
  };

  const currentRoom = ROOMS[activeRoomIndex];

  return (
    <section className="ex" id="journal" aria-labelledby="eh">
      <SectionLabel>Explore the space</SectionLabel>
      <h2 id="eh" style={{ marginTop: '1rem' }}>
        One home, room by room.
      </h2>

      <div className="exw">
        <div>
          <div className="tabs" role="tablist" aria-label="Rooms" id="tabs">
            {ROOMS.map((room, i) => (
              <button
                key={room.k}
                ref={(el) => {
                  tabRefs.current[i] = el;
                }}
                id={`tb${i}`}
                role="tab"
                aria-selected={activeRoomIndex === i}
                tabIndex={activeRoomIndex === i ? 0 : -1}
                onClick={() => setRoom(i)}
                onKeyDown={(e) => handleKeyDown(e, i)}
              >
                {room.t}
              </button>
            ))}
          </div>

          <p id="rd" aria-live="polite">
            {currentRoom.d}
          </p>

          <div className="arrows">
            <button
              id="pv"
              aria-label="Previous room"
              onClick={() => setRoom(activeRoomIndex - 1)}
            >
              ←
            </button>
            <button
              id="nx"
              aria-label="Next room"
              onClick={() => setRoom(activeRoomIndex + 1)}
            >
              →
            </button>
          </div>

          {/* <p>
            <a href="#projects" id="rl">
              View Full Project
            </a>
          </p> */}
        </div>

        <div
          ref={viewRef}
          className="view"
          id="view"
          aria-live="polite"
          onPointerMove={handlePointerMove}
          onPointerLeave={handlePointerLeave}
        >
          {ROOMS.map((room, i) => (
            <ImagePlate
              key={room.k}
              className={activeRoomIndex === i ? 'on' : ''}
              imageKey={room.k}
              ariaLabel={`${room.t}: ${room.d}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
