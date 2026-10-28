import React from 'react';
import { SERVICES_DATA } from '../data/servicesData';
import { ServicePageTemplate } from '../components/ServicePageTemplate';

export const ResidentialInteriorDesign: React.FC = () => {
  const data = SERVICES_DATA['residential-interior-design'];
  return <ServicePageTemplate data={data} />;
};

export default ResidentialInteriorDesign;
