import { createContext } from 'react';
import type { InquiryContextType } from './InquiryContext';

export const InquiryContext = createContext<InquiryContextType | undefined>(undefined);