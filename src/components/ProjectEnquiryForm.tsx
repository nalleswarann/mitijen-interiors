import React, { useState, useRef } from 'react';
import { SectionLabel } from './common/SectionLabel';
import '../styles/ProjectEnquiryForm.css';

export interface ContactFormData {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  spaceType: string;
  requirements: string;
  budget: string;
  projectNotes: string;
}

interface FormErrors {
  fullName?: string;
  email?: string;
  phone?: string;
  location?: string;
  spaceType?: string;
  requirements?: string;
  projectNotes?: string;
}

interface ProjectEnquiryFormProps {
  title?: string;
  subtitle?: string;
  badgeLabel?: string;
  defaultRequirements?: string;
  className?: string;
  onSuccess?: () => void;
}

const SPACE_TYPES = [
  'Apartment',
  'Independent House',
  'Villa',
  'Duplex / Penthouse',
  'Other'
];

const REQUIREMENT_OPTIONS = [
  'Complete Home',
  'Modular Kitchen',
  'Living & Dining',
  'Master Suite',
  'Renovation / Styling',
  'Other'
];

const BUDGET_OPTIONS = [
  'Under ₹5 Lakhs',
  '₹5 Lakhs – ₹10 Lakhs',
  '₹10 Lakhs – ₹25 Lakhs',
  '₹25 Lakhs – ₹50 Lakhs',
  '₹50 Lakhs+',
  'Prefer to discuss'
];

const STUDIO_WHATSAPP_NUMBER = '918940555526';

export const ProjectEnquiryForm: React.FC<ProjectEnquiryFormProps> = ({
  title = 'START YOUR PROJECT.',
  subtitle = 'Share your floor plan details or design intentions. Our senior design team will review and respond within 24 hours.',
  badgeLabel = 'Direct Consultation',
  defaultRequirements = 'Complete Home',
  className = '',
  onSuccess
}) => {
  const formRef = useRef<HTMLFormElement>(null);
  const nameInputRef = useRef<HTMLInputElement>(null);

  const [formData, setFormData] = useState<ContactFormData>({
    fullName: '',
    email: '',
    phone: '',
    location: '',
    spaceType: 'Apartment',
    requirements: defaultRequirements,
    budget: '',
    projectNotes: ''
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
    if (submitError) {
      setSubmitError(null);
    }
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    let firstInvalid: string | null = null;

    if (!formData.fullName.trim()) {
      newErrors.fullName = 'Please enter your full name.';
      if (!firstInvalid) firstInvalid = 'fullName';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Please provide your contact phone.';
      if (!firstInvalid) firstInvalid = 'phone';
    } else {
      const cleaned = formData.phone.replace(/[\s\-\(\)\+]/g, '');
      if (cleaned.length < 10) {
        newErrors.phone = 'Enter a valid 10-digit number.';
        if (!firstInvalid) firstInvalid = 'phone';
      }
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Please enter your email.';
      if (!firstInvalid) firstInvalid = 'email';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(formData.email.trim())) {
      newErrors.email = 'Enter a valid email address.';
      if (!firstInvalid) firstInvalid = 'email';
    }

    if (!formData.location.trim()) {
      newErrors.location = 'Please state your project city / area.';
      if (!firstInvalid) firstInvalid = 'location';
    }

    if (!formData.spaceType) {
      newErrors.spaceType = 'Select space type.';
      if (!firstInvalid) firstInvalid = 'spaceType';
    }

    if (!formData.requirements) {
      newErrors.requirements = 'Select requirements.';
      if (!firstInvalid) firstInvalid = 'requirements';
    }

    if (!formData.projectNotes.trim()) {
      newErrors.projectNotes = 'Share a few words about your project or timeline.';
      if (!firstInvalid) firstInvalid = 'projectNotes';
    }

    setErrors(newErrors);

    if (firstInvalid) {
      const el = formRef.current?.querySelector<HTMLElement>(`[name="${firstInvalid}"]`);
      el?.focus();
      return false;
    }

    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isSubmitting) return;

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setSubmitError(null);

    try {
      // Simulate rapid luxury submission experience
      await new Promise((resolve) => setTimeout(resolve, 600));

      try {
        const existingData = localStorage.getItem('mitijen_contact_submissions');
        const submissions = existingData ? JSON.parse(existingData) : [];
        submissions.push({
          ...formData,
          submittedAt: new Date().toISOString()
        });
        localStorage.setItem('mitijen_contact_submissions', JSON.stringify(submissions));
      } catch (storageErr) {
        console.warn('Could not cache to localStorage', storageErr);
      }

      setIsSubmitted(true);
      if (onSuccess) {
        onSuccess();
      }
    } catch {
      setSubmitError('Unable to send enquiry right now. Please call or WhatsApp us directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={`contact-form-container ${className}`}>
      <div className="contact-form-header">
        <div className="contact-form-header-top">
          <SectionLabel style={{ color: 'var(--brown)', margin: 0 }}>{badgeLabel}</SectionLabel>
        </div>
        <h3 className="contact-form-heading">{title}</h3>
        <p className="contact-form-sub">{subtitle}</p>
      </div>

      {isSubmitted ? (
        <div className="contact-success-card" role="status">
          <div className="success-icon-wrap">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M20 6L9 17l-5-5" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <h4 className="success-title">Thank you, {formData.fullName}.</h4>
          <p className="success-msg">
            Your residential project enquiry has been logged. Our design studio will review your {formData.spaceType.toLowerCase()} requirements in {formData.location} and contact you within 24 business hours.
          </p>

          <div className="success-summary">
            <div className="summary-row">
              <span>Location:</span>
              <strong>{formData.location}</strong>
            </div>
            <div className="summary-row">
              <span>Scope:</span>
              <strong>{formData.requirements}</strong>
            </div>
            {formData.budget && (
              <div className="summary-row">
                <span>Budget:</span>
                <strong>{formData.budget}</strong>
              </div>
            )}
          </div>

          <div className="success-actions">
            <a
              href={`https://wa.me/${STUDIO_WHATSAPP_NUMBER}?text=${encodeURIComponent(
                `Hi Mitijen Interiors, I just submitted an enquiry for my ${formData.spaceType} in ${formData.location} (${formData.requirements}). My name is ${formData.fullName}.`
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="success-wa-btn"
            >
              <span>Transmit to WhatsApp (+91 89405 55526)</span>
              <span>→</span>
            </a>

            <button
              type="button"
              className="success-reset-btn"
              onClick={() => {
                setIsSubmitted(false);
                setFormData({
                  fullName: '',
                  email: '',
                  phone: '',
                  location: '',
                  spaceType: 'Apartment',
                  requirements: defaultRequirements,
                  budget: '',
                  projectNotes: ''
                });
              }}
            >
              Submit Another Project
            </button>
          </div>
        </div>
      ) : (
        <form
          ref={formRef}
          onSubmit={handleSubmit}
          className="contact-form"
          noValidate
        >
          {submitError && (
            <div className="contact-form-error-banner" role="alert">
              <span>{submitError}</span>
            </div>
          )}

          {/* Row 1: Full Name & Phone Number */}
          <div className="form-row form-row-2">
            <div className={`form-group ${errors.fullName ? 'has-error' : ''}`}>
              <label htmlFor="enquiry-fullName">
                Full Name <span className="req">*</span>
              </label>
              <input
                type="text"
                id="enquiry-fullName"
                name="fullName"
                ref={nameInputRef}
                placeholder="e.g. Anandha Kumar"
                value={formData.fullName}
                onChange={handleInputChange}
                autoComplete="name"
                aria-required="true"
                aria-invalid={Boolean(errors.fullName)}
              />
              {errors.fullName && <span className="field-error">{errors.fullName}</span>}
            </div>

            <div className={`form-group ${errors.phone ? 'has-error' : ''}`}>
              <label htmlFor="enquiry-phone">
                Phone Number <span className="req">*</span>
              </label>
              <input
                type="tel"
                id="enquiry-phone"
                name="phone"
                placeholder="+91 89405 55526"
                value={formData.phone}
                onChange={handleInputChange}
                autoComplete="tel"
                aria-required="true"
                aria-invalid={Boolean(errors.phone)}
              />
              {errors.phone && <span className="field-error">{errors.phone}</span>}
            </div>
          </div>

          {/* Row 2: Email & Project Location */}
          <div className="form-row form-row-2">
            <div className={`form-group ${errors.email ? 'has-error' : ''}`}>
              <label htmlFor="enquiry-email">
                Email Address <span className="req">*</span>
              </label>
              <input
                type="email"
                id="enquiry-email"
                name="email"
                placeholder="name@example.com"
                value={formData.email}
                onChange={handleInputChange}
                autoComplete="email"
                aria-required="true"
                aria-invalid={Boolean(errors.email)}
              />
              {errors.email && <span className="field-error">{errors.email}</span>}
            </div>

            <div className={`form-group ${errors.location ? 'has-error' : ''}`}>
              <label htmlFor="enquiry-location">
                Project City / Area <span className="req">*</span>
              </label>
              <input
                type="text"
                id="enquiry-location"
                name="location"
                placeholder="e.g. Coimbatore, RS Puram"
                value={formData.location}
                onChange={handleInputChange}
                aria-required="true"
                aria-invalid={Boolean(errors.location)}
              />
              {errors.location && <span className="field-error">{errors.location}</span>}
            </div>
          </div>

          {/* Row 3: Space Type, Project Scope, & Approximate Budget (3 Columns!) */}
          <div className="form-row form-row-3">
            <div className={`form-group ${errors.spaceType ? 'has-error' : ''}`}>
              <label htmlFor="enquiry-spaceType">
                Space Type <span className="req">*</span>
              </label>
              <div className="select-wrap">
                <select
                  id="enquiry-spaceType"
                  name="spaceType"
                  value={formData.spaceType}
                  onChange={handleInputChange}
                  aria-required="true"
                >
                  {SPACE_TYPES.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
                <span className="select-arrow" aria-hidden="true">▾</span>
              </div>
              {errors.spaceType && <span className="field-error">{errors.spaceType}</span>}
            </div>

            <div className={`form-group ${errors.requirements ? 'has-error' : ''}`}>
              <label htmlFor="enquiry-requirements">
                Scope / Requirements <span className="req">*</span>
              </label>
              <div className="select-wrap">
                <select
                  id="enquiry-requirements"
                  name="requirements"
                  value={formData.requirements}
                  onChange={handleInputChange}
                  aria-required="true"
                >
                  {REQUIREMENT_OPTIONS.map((req) => (
                    <option key={req} value={req}>
                      {req}
                    </option>
                  ))}
                </select>
                <span className="select-arrow" aria-hidden="true">▾</span>
              </div>
              {errors.requirements && <span className="field-error">{errors.requirements}</span>}
            </div>

            <div className="form-group">
              <label htmlFor="enquiry-budget">
                Budget <span className="opt">(Optional)</span>
              </label>
              <div className="select-wrap">
                <select
                  id="enquiry-budget"
                  name="budget"
                  value={formData.budget}
                  onChange={handleInputChange}
                >
                  <option value="">Select range...</option>
                  {BUDGET_OPTIONS.map((b) => (
                    <option key={b} value={b}>
                      {b}
                    </option>
                  ))}
                </select>
                <span className="select-arrow" aria-hidden="true">▾</span>
              </div>
            </div>
          </div>

          {/* Row 4: Tell Us About Your Project Notes (Compact 2 rows) */}
          <div className={`form-group ${errors.projectNotes ? 'has-error' : ''}`}>
            <label htmlFor="enquiry-projectNotes">
              Project Notes & Desires <span className="req">*</span>
            </label>
            <textarea
              id="enquiry-projectNotes"
              name="projectNotes"
              rows={2}
              placeholder="Tell us about your floor plan, square footage, design style, possession status, or timeline..."
              value={formData.projectNotes}
              onChange={handleInputChange}
              aria-required="true"
              aria-invalid={Boolean(errors.projectNotes)}
            />
            {errors.projectNotes && <span className="field-error">{errors.projectNotes}</span>}
          </div>

          {/* Row 5: Submit Button and Privacy Inline Bar */}
          <div className="form-submit-row">
            <button
              type="submit"
              disabled={isSubmitting}
              className="contact-submit-btn"
            >
              {isSubmitting ? (
                <>
                  <span className="submit-spinner" aria-hidden="true" />
                  <span>Transmitting Enquiry...</span>
                </>
              ) : (
                <>
                  <span>Send Project Enquiry</span>
                  <span className="submit-arrow">→</span>
                </>
              )}
            </button>
            <div className="form-privacy-note">
              <span className="privacy-lock-icon" aria-hidden="true">🔒</span>
              <span>Direct studio communication · No spam · Strict confidentiality</span>
            </div>
          </div>
        </form>
      )}
    </div>
  );
};
