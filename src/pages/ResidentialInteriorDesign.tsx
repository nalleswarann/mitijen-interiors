import React from 'react';
import { SERVICES_DATA } from '../data/servicesData';
import { ServicePageTemplate } from '../components/ServicePageTemplate';
import { HowItWorksSection } from '../components/HowItWorksSection';

export const ResidentialInteriorDesign: React.FC = () => {
  const data = SERVICES_DATA['residential-interior-design'];
  return (
    <ServicePageTemplate data={data}>
      <HowItWorksSection />
    </ServicePageTemplate>
  );
};

export default ResidentialInteriorDesign;
