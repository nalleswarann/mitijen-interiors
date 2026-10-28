import React from 'react';
import { SectionLabel } from './common/SectionLabel';
import { ImagePlate } from './common/ImagePlate';
import { Button } from './common/Button';

interface InquirySectionProps {
  onOpenInquiry: () => void;
}

export const InquirySection: React.FC<InquirySectionProps> = ({ onOpenInquiry }) => {
  return (
    <section className="inq" id="inquiry">
      <ImagePlate
        imageKey="dusk"
        ariaLabel="Interior at dusk with warm light"
      />

      <div className="c">
        <SectionLabel style={{ color: 'var(--sand)' }}>Begin</SectionLabel>
        <h2>Your space deserves a thoughtful beginning.</h2>
        <p>
          Tell us what you envision. We’ll help you turn it into a space that feels unmistakably yours.
        </p>
        <Button solid id="open" onClick={onOpenInquiry}>
          Discuss Your Project
        </Button>
      </div>
    </section>
  );
};
