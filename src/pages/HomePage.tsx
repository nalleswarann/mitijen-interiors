import React, { useState } from 'react';
import { HeroSection } from '../components/HeroSection';
import { ArchitectureShowcase } from '../components/ArchitectureShowcase';
import { BeforeAfterSection } from '../components/BeforeAfterSection';
import { ProjectsSection } from '../components/ProjectsSection';
import { ProjectDialog } from '../components/ProjectDialog';
import { RoomExplorer } from '../components/RoomExplorer';
import { DesignProcess } from '../components/DesignProcess';
import { MaterialsGallery } from '../components/MaterialsGallery';
import { InquirySection } from '../components/InquirySection';
import type { Project } from '../data/projects';
import { useRevealObserver } from '../hooks/useRevealObserver';
import { useInquiry } from '../context/useInquiry';
import { SEO } from '../components/common/SEO';

export const HomePage: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const { openInquiry } = useInquiry();

  // Activate scroll-triggered reveals for .rv and .tx elements
  useRevealObserver();

  return (
    <main id="top">
      <SEO
        title="Mitjen Interiors — Contemporary Interior Architecture & Bespoke Design"
        description="Mitjen Interiors is a boutique studio for contemporary interior architecture, thoughtful residential design, commercial venues, and corporate workspaces."
        canonical="/"
        ogImage="/assets/forma_facade.jpg"
      />

      <HeroSection />
      <ArchitectureShowcase />
      <BeforeAfterSection />
      <ProjectsSection onSelectProject={setSelectedProject} />
      <ProjectDialog
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
      <RoomExplorer />
      <DesignProcess />
      <MaterialsGallery />
      <InquirySection onOpenInquiry={openInquiry} />
    </main>
  );
};

export default HomePage;
