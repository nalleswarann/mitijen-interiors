import React, { useEffect, useRef } from 'react';
import { ProjectEnquiryForm } from './ProjectEnquiryForm';
import '../styles/InquiryDialog.css';

interface InquiryDialogProps {
  isOpen: boolean;
  onClose: () => void;
  contextTitle?: string;
}

export const InquiryDialog: React.FC<InquiryDialogProps> = ({
  isOpen,
  onClose,
  contextTitle
}) => {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isOpen) {
      if (!dialog.open) {
        dialog.showModal();
        document.body.style.overflow = 'hidden';
      }
    } else {
      if (dialog.open) {
        dialog.close();
      }
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Handle click outside to close
  const handleBackdropClick = (e: React.MouseEvent<HTMLDialogElement>) => {
    if (e.target === dialogRef.current) {
      onClose();
    }
  };

  return (
    <dialog
      ref={dialogRef}
      id="inquiry-dialog-modal"
      className="inquiry-modal"
      aria-labelledby="inquiry-modal-title"
      onClick={handleBackdropClick}
      onCancel={(e) => {
        e.preventDefault();
        onClose();
      }}
      onClose={onClose}
    >
      <div className="inquiry-modal-wrapper">
        <button
          type="button"
          className="inquiry-modal-close-btn"
          onClick={onClose}
          aria-label="Close project enquiry dialog"
        >
          <span className="close-text">CLOSE</span>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="M18 6L6 18M6 6l12 12" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </button>

        <ProjectEnquiryForm
          title={contextTitle || "TELL US ABOUT YOUR PROJECT."}
          subtitle="Share your floor plan details or design intentions. All submissions are handled confidentially by our design team."
          badgeLabel="Direct Studio Consultation"
          className="modal-enquiry-form"
        />
      </div>
    </dialog>
  );
};
