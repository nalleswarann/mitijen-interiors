import React, { useEffect, useRef } from 'react';

import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SEO } from '../components/common/SEO';
import { SectionLabel } from '../components/common/SectionLabel';
import { ProjectEnquiryForm } from '../components/ProjectEnquiryForm';
import { MonographBanner } from '../components/common/MonographBanner';
import '../styles/ContactPage.css';

if (typeof window !== 'undefined') {
  gsap.registerPlugin(ScrollTrigger);
}

export const ContactPage: React.FC = () => {
  const pageRef = useRef<HTMLDivElement>(null);

  // GSAP Animations
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    const ctx = gsap.context(() => {


      // 2. Contact details & form columns entrance
      gsap.fromTo(
        '.contact-info-col',
        { y: 40, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.contact-main-section',
            start: 'top 78%'
          }
        }
      );

      gsap.fromTo(
        '.contact-form-col',
        { y: 45, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.2,
          delay: 0.15,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.contact-main-section',
            start: 'top 78%'
          }
        }
      );



      // 4. Studio location section reveal
      gsap.fromTo(
        '.contact-location-card',
        { y: 35, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.1,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: '.contact-location-section',
            start: 'top 80%'
          }
        }
      );


    }, pageRef);

    return () => ctx.revert();
  }, []);



  const whatsappMessage = encodeURIComponent(
    `Hello Mitijen Interiors, I'm interested in discussing an interior design project for my home.`
  );
  const whatsappUrl = `https://wa.me/918940555526?text=${whatsappMessage}`;

  return (
    <div className="contact-page" ref={pageRef}>
      <SEO
        title="Contact Us — Mitijen Interiors | Residential Interior Studio"
        description="Connect with Mitijen Interiors. Commission bespoke residential interior design in Coimbatore, Tamil Nadu, and Bangalore. Call +91 8940555526 or submit your project enquiry."
        canonical="/contact"
        ogImage="/assets/mitijen/Banner3.jpg"
      />

      {/* =====================================================================
          1. HERO BANNER — STUDIO DIALOGUE & COMMISSIONS (REFERENCE DESIGN)
          ===================================================================== */}
      <MonographBanner
        id="contact-hero"
        sidebarKicker={['START', 'A STUDIO', 'DIALOGUE']}
        sidebarNote="Our approach is centered on three core principles: direct communication, transparent schedules, and turnkey fidelity."
        sidebarYear="COMMISSIONS · 2026 / 2027"
        heroImage="/assets/mitijen/Banner3.jpg"
        heroImageAlt="Refined atmospheric interior architecture by Mitjen Interiors"
        headlineLine1="LET'S CREATE"
        headlineLine2="YOUR SPACE"
        topBadge="GET IN TOUCH · STUDIO ENQUIRY"
        pillars={[
          {
            title: 'Direct Line',
            subtitle: '+91 89405 55526 · instant consultation with design director',
            link: 'tel:+918940555526',
          },
          {
            title: 'WhatsApp Direct',
            subtitle: 'collaborate & share architectural floor plans with our studio engineers',
            link: whatsappUrl,
          },
          {
            title: 'Studio Atelier',
            subtitle: 'Coimbatore & Bangalore, Tamil Nadu · South India commissions',
            link: '#enquiry-form',
          },
        ]}
      />

      {/* =====================================================================
          2. CONTACT INFORMATION AND ENQUIRY FORM (TWO-COLUMN LAYOUT)
          ===================================================================== */}
      <section className="contact-main-section" id="enquiry-form">
        <div className="contact-main-grid">
          {/* Left Column — Let's Talk */}
          <div className="contact-info-col">
            <SectionLabel style={{ color: 'var(--olive)' }}>Let's Talk</SectionLabel>
            <h2 className="contact-info-heading">
              WE'D LOVE TO
              <br />
              HEAR FROM YOU.
            </h2>

            <p className="contact-info-intro">
              Whether you're planning a complete home transformation or refining a single room,
              tell us a little about your project. We'll help you take the next step.
            </p>

            <div className="contact-details-list">
              {/* Studio Direct Phone */}
              <div className="contact-detail-item">
                <span className="detail-eyebrow">STUDIO DIRECT LINE</span>
                <a href="tel:+918940555526" className="detail-link detail-link-highlight">
                  +91 89405 55526
                </a>
                <span className="detail-note">Available Mon – Sat, 9:30 AM to 7:00 PM IST</span>
              </div>

              {/* Business Email */}
              <div className="contact-detail-item">
                <span className="detail-eyebrow">CLIENT ENQUIRIES</span>
                <a href="mailto:hello@mitijeninteriors.com" className="detail-link">
                  hello@mitijeninteriors.com
                </a>
                <span className="detail-note">Replies typically within 24 business hours</span>
              </div>

              {/* Studio Address */}
              <div className="contact-detail-item">
                <span className="detail-eyebrow">STUDIO ADDRESS</span>
                <address className="detail-address">
                  Mitjen Interiors Studio
                  <br />
                  Alamelu Nagar, Coimbatore, Tamil Nadu — 641015
                </address>
                <span className="detail-note">Serving Tamil Nadu & Bangalore residential projects</span>
              </div>

              {/* Business Hours */}
              <div className="contact-detail-item">
                <span className="detail-eyebrow">STUDIO HOURS</span>
                <p className="detail-text">
                  Monday – Saturday: 9:30 AM – 7:00 PM
                  <br />
                  Sunday: By prior private appointment
                </p>
              </div>
            </div>

            {/* WhatsApp Contact Box */}
            <div className="contact-wa-card">
              <div className="wa-icon-wrap" aria-hidden="true">
                <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12.04 2c-5.46 0-9.91 4.45-9.91 9.91 0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38c1.45.79 3.08 1.21 4.74 1.21 5.46 0 9.91-4.45 9.91-9.91 0-2.65-1.03-5.14-2.9-7.01A9.816 9.816 0 0012.04 2m.01 1.67c4.54 0 8.24 3.7 8.24 8.24 0 2.2-.86 4.28-2.42 5.83a8.18 8.18 0 01-5.82 2.41c-1.46 0-2.9-.38-4.17-1.11l-.3-.18-3.1 0.81 0.83-3.02-.19-.31a8.196 8.196 0 01-1.25-4.43c0-4.54 3.7-8.24 8.24-8.24m4.52 11.66c-.25-.13-1.47-.72-1.7-.81-.23-.08-.39-.13-.56.13-.17.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.13-1.06-.39-2.02-1.24-.75-.67-1.25-1.49-1.39-1.74-.14-.25-.02-.39.11-.51.11-.11.25-.29.37-.43.13-.14.17-.25.25-.41.08-.17.04-.31-.02-.43-.06-.13-.56-1.35-.77-1.85-.2-.48-.41-.42-.56-.43h-.48c-.17 0-.44.06-.67.31-.23.25-.87.85-.87 2.08 0 1.23.9 2.42 1.02 2.59.13.17 1.76 2.69 4.26 3.77.6.26 1.06.41 1.42.53.6.19 1.15.16 1.58.1.48-.07 1.47-.6 1.68-1.18.21-.58.21-1.07.14-1.18-.06-.1-.23-.17-.48-.29z" />
                </svg>
              </div>
              <div className="wa-text-wrap">
                <span className="wa-title">Prefer instant chat?</span>
                <span className="wa-desc">
                  Message our principal designers directly on WhatsApp for initial consultations and floor plan inquiries.
                </span>
                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="wa-link"
                >
                  <span>Chat on WhatsApp (+91 89405 55526)</span>
                  <span className="wa-arrow">→</span>
                </a>
              </div>
            </div>
          </div>

          {/* Right Column — Project Enquiry Form */}
          <div className="contact-form-col">
            <ProjectEnquiryForm
              title="TELL US ABOUT YOUR PROJECT."
              subtitle="Share your floor plan details or design intentions. All submissions are handled confidentially by our design team."
              badgeLabel="Direct Consultation"
            />
          </div>
        </div>
      </section>

      

      {/* =====================================================================
          4. STUDIO LOCATION SECTION
          ===================================================================== */}
      <section className="contact-location-section" aria-label="Studio Location and Directions">
        <div className="contact-location-container">
          <div className="contact-location-card">
            <div className="location-info-block">
              <SectionLabel style={{ color: 'var(--sand)' }}>Studio Location</SectionLabel>
              <h2 className="location-heading">VISIT OUR DESIGN STUDIO.</h2>
              <p className="location-desc">
                Experience physical material swatches, solid hardwood joinery samples, and 3D architectural walk-throughs in person.
              </p>

              <div className="location-address-box">
                <div className="loc-badge">STUDIO & EXPERIENCE CENTER</div>
                <strong className="loc-name">Mitjen Interiors Studio</strong>
                <span className="loc-street">Alamelu Nagar, Coimbatore, Tamil Nadu — 641015</span>
                <span className="loc-footprint">Active Sites across Tamil Nadu & Bangalore</span>
              </div>

              <div className="location-hours">
                <div className="hours-row">
                  <span>Monday – Saturday:</span>
                  <strong>9:30 AM – 7:00 PM</strong>
                </div>
                <div className="hours-row">
                  <span>Sunday:</span>
                  <strong>Private Site Visits Only</strong>
                </div>
              </div>

              <div className="location-links">
                <a
                  href="https://www.google.com/maps/place/craft+interior+studio/@11.0221026,77.021977,19z"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="location-directions-btn"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    <circle cx="12" cy="9" r="2.5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  <span>Open in Google Maps</span>
                  <span>↗</span>
                </a>

                <a
                  href="tel:+918940555526"
                  className="location-call-btn"
                >
                  <span>Call Ahead: +91 89405 55526</span>
                </a>
              </div>
            </div>

            <div className="location-map-visual">
              <div className="map-frame">
                <iframe
                  title="Mitjen Interiors Studio Location"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d979.0550374261846!2d77.02197705709045!3d11.02210262154259!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3ba857c600afd49f%3A0xde49aac6d8ad4cac!2scraft%20interior%20studio!5e0!3m2!1sen!2sin!4v1793178934274!5m2!1sen!2sin"
                  width="100%"
                  height="100%"
                  style={{ border: 0, filter: 'invert(90%) hue-rotate(180deg) contrast(95%)' }}
                  allowFullScreen={false}
                  loading="lazy"
                  referrerPolicy="strict-origin-when-cross-origin"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      
    </div>
  );
};
