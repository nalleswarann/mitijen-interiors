import React from 'react';
import { SERVICES_DATA } from '../data/servicesData';
import { ServicePageTemplate } from '../components/ServicePageTemplate';

export const CommercialInteriorDesign: React.FC = () => {
  const data = SERVICES_DATA['commercial-interior-design'];
  return <ServicePageTemplate data={data} />;
};

export default CommercialInteriorDesign;
