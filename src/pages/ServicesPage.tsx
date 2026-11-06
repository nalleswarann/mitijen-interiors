import React from 'react';
import { SERVICES_DATA } from '../data/servicesData';
import { ServicePageTemplate } from '../components/ServicePageTemplate';
import { HowItWorksSection } from '../components/HowItWorksSection';

/**
 * Mitijen Interiors — Services & Spatial Practices Directory
 * Built on the unified luxury architectural editorial design system.
 * Features in-place discipline switching (Corporate, Residential, Commercial, Turnkey)
 * with zero scroll jumps, rich authentic contents, and integrated How It Works section.
 */
export const ServicesPage: React.FC = () => {
  // Use corporate interior design as the baseline dataset for the directory
  const data = SERVICES_DATA['corporate-interior-design'];

  return (
    <ServicePageTemplate
      data={data}
      overrideHeroEyebrow="SPATIAL PRACTICES & SERVICES DIRECTORY"
      overrideHeroHeadline="Architectural Design for Living, Working & Gathering"
      overrideHeroSubtitle="Explore Mitijen’s three specialized spatial practices — Corporate Workplaces, Commercial Venues, and Residential Sanctuaries — delivered with complete turnkey execution."
      isOverviewPage={true}
    >
      <HowItWorksSection />
    </ServicePageTemplate>
  );
};

export default ServicesPage;
