import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  href?: string;
  onClick?: () => void;
  solid?: boolean;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  withArrow?: boolean;
  style?: React.CSSProperties;
  id?: string;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  href,
  onClick,
  solid = false,
  className = '',
  type = 'button',
  withArrow = false,
  style,
  id
}) => {
  const combinedClass = `btn ${solid ? 'solid' : ''} ${className}`.trim();

  const arrowIcon = withArrow ? (
    <svg width="16" height="10" viewBox="0 0 16 10" fill="none" stroke="currentColor">
      <path d="M0 5h15M11 1l4 4-4 4" />
    </svg>
  ) : null;

  if (href) {
    return (
      <a id={id} className={combinedClass} href={href} onClick={onClick} style={style}>
        {children}
        {arrowIcon}
      </a>
    );
  }

  return (
    <button id={id} className={combinedClass} onClick={onClick} type={type} style={style}>
      {children}
      {arrowIcon}
    </button>
  );
};
