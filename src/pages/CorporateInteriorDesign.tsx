import React from 'react';
import { SERVICES_DATA } from '../data/servicesData';
import { ServicePageTemplate } from '../components/ServicePageTemplate';

export const CorporateInteriorDesign: React.FC = () => {
  const data = SERVICES_DATA['corporate-interior-design'];
  return <ServicePageTemplate data={data} />;
};

export default CorporateInteriorDesign;
