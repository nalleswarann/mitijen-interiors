import React from 'react';
import { ImagePlate } from './common/ImagePlate';
import { SectionLabel } from './common/SectionLabel';
import { Button } from './common/Button';

export const StudioSection: React.FC = () => {
  return (
    <section className="studio" id="studio">
      <ImagePlate
        className="rv"
        imageKey="stair"
        ariaLabel="Sculptural staircase in a naturally lit interior"
      />

      <div className="tx">
        <SectionLabel>The studio</SectionLabel>
        <h2>A considered approach to living.</h2>
        <p>
          We create personal, functional and timeless spaces through a thoughtful balance of material selection, spatial planning, natural light and craftsmanship.
        </p>
        <Button href="#process">Discover Our Studio</Button>
      </div>
    </section>
  );
};
