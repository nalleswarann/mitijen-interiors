import React, { useState, useCallback } from 'react';
import { InquiryContext } from './InquiryContextInstance';

export interface InquiryContextType {
  isInquiryOpen: boolean;
  openInquiry: (contextTitle?: string) => void;
  closeInquiry: () => void;
  contextTitle?: string;
}

export const InquiryProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isInquiryOpen, setIsInquiryOpen] = useState(false);
  const [contextTitle, setContextTitle] = useState<string | undefined>(undefined);

  const openInquiry = useCallback((title?: string) => {
    setContextTitle(title);
    setIsInquiryOpen(true);
  }, []);

  const closeInquiry = useCallback(() => {
    setIsInquiryOpen(false);
    setContextTitle(undefined);
  }, []);

  return (
    <InquiryContext.Provider value={{ isInquiryOpen, openInquiry, closeInquiry, contextTitle }}>
      {children}
    </InquiryContext.Provider>
  );
};
