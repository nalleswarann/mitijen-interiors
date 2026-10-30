import React from 'react';
import { BeforeAfterSection } from './BeforeAfterSection';

interface ProjectsBeforeAfterProps {
  onSelectProject?: (title: string) => void;
}

export const ProjectsBeforeAfter: React.FC<ProjectsBeforeAfterProps> = () => {
  return <BeforeAfterSection />;
};

export default ProjectsBeforeAfter;
