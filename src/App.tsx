import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { InquiryDialog } from './components/InquiryDialog';
import { InquiryProvider } from './context/InquiryContext';
import { useInquiry } from './context/useInquiry';
import { ScrollToTop } from './components/common/ScrollToTop';
import { SmoothScrollProvider } from './context/SmoothScrollContext';
import { ScrollProgressBar } from './components/common/ScrollProgressBar';
import { useGlobalScrollAnimations } from './hooks/useGlobalScrollAnimations';

import { HomePage } from './pages/HomePage';
import { ProjectsPage } from './pages/ProjectsPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { ResidentialInteriorDesign } from './pages/ResidentialInteriorDesign';
import { CommercialInteriorDesign } from './pages/CommercialInteriorDesign';
import { CorporateInteriorDesign } from './pages/CorporateInteriorDesign';
import { ServicesPage } from './pages/ServicesPage';

import './styles/global.css';
import './styles/responsive.css';

const AppContent: React.FC = () => {
  const { isInquiryOpen, closeInquiry, contextTitle } = useInquiry();

  // Activate high-performance editorial scroll animations across all routes
  useGlobalScrollAnimations();

  return (
    <>
      <ScrollProgressBar />
      <ScrollToTop />
      <Header />

      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/services" element={<ServicesPage />} />
        <Route path="/projects" element={<ProjectsPage />} />
        <Route path="/project" element={<ProjectsPage />} />
        <Route
          path="/services/residential-interior-design"
          element={<ResidentialInteriorDesign />}
        />
        <Route
          path="/services/commercial-interior-design"
          element={<CommercialInteriorDesign />}
        />
        <Route
          path="/services/corporate-interior-design"
          element={<CorporateInteriorDesign />}
        />
        {/* Catch-all fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      <Footer />

      <InquiryDialog
        isOpen={isInquiryOpen}
        onClose={closeInquiry}
        contextTitle={contextTitle}
      />
    </>
  );
};

export const App: React.FC = () => {
  return (
    <BrowserRouter>
      <InquiryProvider>
        <SmoothScrollProvider>
          <AppContent />
        </SmoothScrollProvider>
      </InquiryProvider>
    </BrowserRouter>
  );
};

export default App;
