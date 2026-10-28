import React from 'react';

interface SectionLabelProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export const SectionLabel: React.FC<SectionLabelProps> = ({ children, className = '', style }) => {
  return (
    <span className={`lab ${className}`.trim()} style={style}>
      {children}
    </span>
  );
};
