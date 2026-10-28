import { useContext } from 'react';
import { InquiryContext } from './InquiryContextInstance';
import type { InquiryContextType } from './InquiryContext';

export const useInquiry = (): InquiryContextType => {
  const context = useContext(InquiryContext);
  if (!context) {
    throw new Error('useInquiry must be used within an InquiryProvider');
  }
  return context;
};