import React from 'react';
import { Link } from 'react-router-dom';

export interface BreadcrumbItem {
  label: string;
  path?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items, className = '' }) => {
  return (
    <nav aria-label="Breadcrumb" className={`breadcrumbs-nav ${className}`.trim()}>
      <ol className="breadcrumbs-list" itemScope itemType="https://schema.org/BreadcrumbList">
        {items.map((item, index) => {
          const isLast = index === items.length - 1;
          return (
            <li
              key={item.label}
              className={`breadcrumbs-item ${isLast ? 'is-current' : ''}`}
              itemProp="itemListElement"
              itemScope
              itemType="https://schema.org/ListItem"
            >
              {item.path && !isLast ? (
                <Link to={item.path} itemProp="item" className="breadcrumbs-link">
                  <span itemProp="name">{item.label}</span>
                </Link>
              ) : (
                <span className="breadcrumbs-current" itemProp="name" aria-current={isLast ? 'page' : undefined}>
                  {item.label}
                </span>
              )}
              <meta itemProp="position" content={String(index + 1)} />
              {!isLast && <span className="breadcrumbs-separator" aria-hidden="true">/</span>}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};
