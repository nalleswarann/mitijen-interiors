import React, { useEffect, useRef } from 'react';
import type { Project } from '../data/projects';
import { ImagePlate } from './common/ImagePlate';
import { SectionLabel } from './common/SectionLabel';

interface ProjectDialogProps {
  project: Project | null;
  onClose: () => void;
}

export const ProjectDialog: React.FC<ProjectDialogProps> = ({ project, onClose }) => {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (project) {
      if (!dialog.open) {
        dialog.showModal();
      }
    } else {
      if (dialog.open) {
        dialog.close();
      }
    }
  }, [project]);

  const handleBackdropClick = (e: React.MouseEvent<HTMLDialogElement>) => {
    if (e.target === dialogRef.current) {
      onClose();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDialogElement>) => {
    if (e.key === 'Escape') {
      onClose();
    }
  };

  if (!project) {
    return <dialog ref={dialogRef} id="dlg" aria-labelledby="dt" />;
  }

  return (
    <dialog
      ref={dialogRef}
      id="dlg"
      aria-labelledby="dt"
      onClick={handleBackdropClick}
      onKeyDown={handleKeyDown}
      onClose={onClose}
    >
      <div className="dg">
        <button className="x" onClick={onClose} aria-label="Close dialog">
          Close
        </button>

        <ImagePlate
          imageKey={project.id}
          ariaLabel={project.name}
        />

        <div className="cols">
          <div>
            <h3 id="dt" style={{ fontSize: '2.8rem' }}>
              {project.name}
            </h3>
            <SectionLabel>
              {project.loc} · {project.cat} · {project.year}, editable sample
            </SectionLabel>
          </div>

          <div>
            <h4 style={{ margin: 0, fontWeight: 600 }}>Overview</h4>
            <p>{project.over}</p>
            <h4 style={{ margin: 0, fontWeight: 600 }}>Design approach</h4>
            <p>{project.app}</p>
          </div>
        </div>

        <div className="gal">
          {project.gal.map((galleryKey, idx) => (
            <ImagePlate
              key={`${galleryKey}-${idx}`}
              imageKey={galleryKey}
              ariaLabel={`${project.name} gallery view`}
            />
          ))}
        </div>
      </div>
    </dialog>
  );
};
