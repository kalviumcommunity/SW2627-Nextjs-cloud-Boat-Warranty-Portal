'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import Navbar from '@/components/layout/Navbar';
import UserNavbar from '@/components/layout/UserNavbar';
import Footer from '@/components/layout/Footer';
import { showToast } from '@/components/common/BoatToast';

export default function ContactPage() {
  const { status } = useSession();
  const isAuthenticated = status === 'authenticated';

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    serial: '',
    subject: 'Warranty Claim Inquiry',
    message: ''
  });

  const [validationErrors, setValidationErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (validationErrors[name]) {
      setValidationErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    
    // Simple Validation
    const errors = {};
    if (!formData.name.trim()) errors.name = 'Name is required.';
    if (!formData.email.trim()) {
      errors.email = 'Email is required.';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Please enter a valid email address.';
    }
    if (!formData.message.trim()) errors.message = 'Message details are required.';

    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      showToast.warning('Please complete all required fields correctly.', 'FORM INCOMPLETE');
      return;
    }

    setIsSubmitting(true);
    showToast.process('Sending support ticket to boAt Helpdesk...', 'SENDING');

    // Mocking an API call
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitSuccess(true);
      showToast.success('Support inquiry submitted! Our team will get back to you within 24h.', 'TICKET CREATED');
      setFormData({
        name: '',
        email: '',
        serial: '',
        subject: 'Warranty Claim Inquiry',
        message: ''
      });
    }, 1200);
  };


  return (
    <div style={{ background: '#080808', color: '#ffffff', minHeight: '100vh', display: 'flex', flexDirection: 'column', fontFamily: 'Inter, sans-serif' }}>
      {/* Dynamic Navbar */}
      {isAuthenticated ? <UserNavbar /> : <Navbar />}

      {/* Main Content Pane */}
      <main style={{
        flex: 1,
        maxWidth: '1100px',
        margin: '0 auto',
        width: '100%',
        padding: '60px 24px 80px',
        boxSizing: 'border-box',
      }}>
        {/* Intro */}
        <div style={{ textAlign: 'center', marginBottom: '48px' }}>
          <span style={{
            color: 'var(--red)',
            fontSize: '0.8rem',
            fontWeight: 700,
            letterSpacing: '3px',
            textTransform: 'uppercase',
            display: 'block',
            marginBottom: '12px'
          }}>
            CUSTOMER SUPPORT
          </span>
          <h1 style={{
            fontSize: 'clamp(2rem, 4vw, 3rem)',
            fontWeight: 900,
            marginBottom: '16px',
            letterSpacing: '-0.5px',
          }}>
            We're here to help you<span style={{ color: 'var(--red)' }}>.</span>
          </h1>
          <p style={{ color: '#888', fontSize: '0.95rem', maxWidth: '500px', margin: '0 auto' }}>
            Got a query regarding your warranty status, claims, or repairs? Fill in the details below.
          </p>
        </div>

        {/* Dual Column Layout */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '40px',
          alignItems: 'start',
        }}>
          {/* Left Column: Direct Support Channels */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {/* Live Chat Card */}
            <div style={{
              background: 'rgba(255,255,255,0.02)',
              border: '1px solid rgba(255,255,255,0.05)',
              borderRadius: '14px',
              padding: '24px',
              display: 'flex',
              alignItems: 'center',
              gap: '16px'
            }}>
              <div style={{
                width: '48px', height: '48px', borderRadius: '50%',
                background: 'rgba(232,0,29,0.06)', border: '1px solid rgba(232,0,29,0.15)',
                display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
              }}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--red)" strokeWidth="2">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
                </svg>
              </div>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                  <h3 style={{ fontSize: '0.98rem', fontWeight: 700 }}>Live Chat Assistance</h3>
                  <span style={{
                    width: '8px', height: '8px', borderRadius: '50%',
                    background: '#10b981', display: 'inline-block',
                    boxShadow: '0 0 8px #10b981'
                  }} />
                </div>
                <p style={{ color: '#888', fontSize: '0.8rem', lineHeight: 1.4 }}>
                  Average wait time: Under 2 mins. Available 9 AM - 6 PM daily.
                </p>
              </div>
            </div>

            {/* Helpline Card */}
            <div style={{
              background: 'rgba(255,255,255,0.02)',
              border: '1px solid rgba(255,255,255,0.05)',
              borderRadius: '14px',
              padding: '24px',
              display: 'flex',
              alignItems: 'center',
              gap: '16px'
            }}>
              <div style={{
                width: '48px', height: '48px', borderRadius: '50%',
                background: 'rgba(232,0,29,0.06)', border: '1px solid rgba(232,0,29,0.15)',
                display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
              }}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--red)" strokeWidth="2">
                  <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 3.07 10.8 19.79 19.79 0 0 1 12.24 2.22 2 2 0 0 1 14.24 0h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L16.91 7.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z"/>
                </svg>
              </div>
              <div>
                <h3 style={{ fontSize: '0.98rem', fontWeight: 700, marginBottom: '4px' }}>Phone Support line</h3>
                <div style={{ color: 'var(--red)', fontSize: '0.95rem', fontWeight: 700, marginBottom: '4px' }}>
                  +91 (022) 6918-1920
                </div>
                <p style={{ color: '#888', fontSize: '0.8rem' }}>
                  Monday to Saturday, 10 AM to 7 PM. Toll-Free.
                </p>
              </div>
            </div>

            {/* Email Support Card */}
            <div style={{
              background: 'rgba(255,255,255,0.02)',
              border: '1px solid rgba(255,255,255,0.05)',
              borderRadius: '14px',
              padding: '24px',
              display: 'flex',
              alignItems: 'center',
              gap: '16px'
            }}>
              <div style={{
                width: '48px', height: '48px', borderRadius: '50%',
                background: 'rgba(232,0,29,0.06)', border: '1px solid rgba(232,0,29,0.15)',
                display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
              }}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--red)" strokeWidth="2">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                  <polyline points="22,6 12,13 2,6"/>
                </svg>
              </div>
              <div>
                <h3 style={{ fontSize: '0.98rem', fontWeight: 700, marginBottom: '4px' }}>Email support</h3>
                <div style={{ color: '#fff', fontSize: '0.9rem', fontWeight: 600, marginBottom: '4px' }}>
                  warranty@boat-lifestyle.com
                </div>
                <p style={{ color: '#888', fontSize: '0.8rem' }}>
                  Expect a response from our agents within 24 hours.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Us Form */}
          <div style={{
            background: 'rgba(255,255,255,0.01)',
            backdropFilter: 'blur(8px)',
            border: '1px solid rgba(255,255,255,0.05)',
            borderRadius: '16px',
            padding: '32px',
            boxShadow: '0 12px 40px rgba(0,0,0,0.4)',
          }}>
            {submitSuccess ? (
              <div style={{ textAlign: 'center', padding: '30px 10px' }}>
                <div style={{
                  width: '64px', height: '64px', borderRadius: '50%',
                  background: 'rgba(16,185,129,0.1)', border: '2px solid #10b981',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  margin: '0 auto 20px',
                }}>
                  <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="3">
                    <polyline points="20 6 9 17 4 12"/>
                  </svg>
                </div>
                <h2 style={{ fontSize: '1.4rem', fontWeight: 800, marginBottom: '10px' }}>Message Sent!</h2>
                <p style={{ color: '#999', fontSize: '0.88rem', lineHeight: 1.5, marginBottom: '24px' }}>
                  Thank you for contacting boAt. Your support ticket has been logged. Our customer service representative will email you shortly.
                </p>
                <button
                  onClick={() => setSubmitSuccess(false)}
                  style={{
                    background: 'var(--red)',
                    color: '#fff',
                    fontSize: '0.88rem',
                    fontWeight: 700,
                    padding: '12px 24px',
                    borderRadius: '8px',
                    cursor: 'pointer',
                  }}
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleFormSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                {/* Name */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label htmlFor="contact-name" style={{ fontSize: '0.82rem', fontWeight: 600, color: '#aaa' }}>Your Name</label>
                  <input
                    id="contact-name"
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Enter your full name"
                    style={{
                      background: '#141414',
                      border: validationErrors.name ? '1.5px solid var(--red)' : '1.5px solid #222',
                      borderRadius: '8px',
                      padding: '12px 14px',
                      color: '#fff',
                      fontSize: '0.88rem',
                      fontFamily: 'inherit',
                      outline: 'none',
                    }}
                  />
                  {validationErrors.name && (
                    <span style={{ color: 'var(--red)', fontSize: '0.75rem', fontWeight: 500 }}>{validationErrors.name}</span>
                  )}
                </div>

                {/* Email */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label htmlFor="contact-email" style={{ fontSize: '0.82rem', fontWeight: 600, color: '#aaa' }}>Email Address</label>
                  <input
                    id="contact-email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="name@example.com"
                    style={{
                      background: '#141414',
                      border: validationErrors.email ? '1.5px solid var(--red)' : '1.5px solid #222',
                      borderRadius: '8px',
                      padding: '12px 14px',
                      color: '#fff',
                      fontSize: '0.88rem',
                      fontFamily: 'inherit',
                      outline: 'none',
                    }}
                  />
                  {validationErrors.email && (
                    <span style={{ color: 'var(--red)', fontSize: '0.75rem', fontWeight: 500 }}>{validationErrors.email}</span>
                  )}
                </div>

                {/* Serial Number */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label htmlFor="contact-serial" style={{ fontSize: '0.82rem', fontWeight: 600, color: '#aaa' }}>Product Serial Number (Optional)</label>
                  <input
                    id="contact-serial"
                    type="text"
                    name="serial"
                    value={formData.serial}
                    onChange={handleInputChange}
                    placeholder="e.g. SN1234567890"
                    style={{
                      background: '#141414',
                      border: '1.5px solid #222',
                      borderRadius: '8px',
                      padding: '12px 14px',
                      color: '#fff',
                      fontSize: '0.88rem',
                      fontFamily: 'inherit',
                      outline: 'none',
                    }}
                  />
                </div>

                {/* Subject Dropdown */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label htmlFor="contact-subject" style={{ fontSize: '0.82rem', fontWeight: 600, color: '#aaa' }}>Inquiry Topic</label>
                  <select
                    id="contact-subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    style={{
                      background: '#141414',
                      border: '1.5px solid #222',
                      borderRadius: '8px',
                      padding: '12px 14px',
                      color: '#fff',
                      fontSize: '0.88rem',
                      fontFamily: 'inherit',
                      outline: 'none',
                      cursor: 'pointer',
                    }}
                  >
                    <option value="Warranty Claim Inquiry">Warranty Claim Inquiry</option>
                    <option value="Product Verification Error">Product Verification Error</option>
                    <option value="Repair Status Delay">Repair Status Delay</option>
                    <option value="General Support Question">General Support Question</option>
                  </select>
                </div>

                {/* Message */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <label htmlFor="contact-message" style={{ fontSize: '0.82rem', fontWeight: 600, color: '#aaa' }}>Message Details</label>
                  <textarea
                    id="contact-message"
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Please explain your issue in detail..."
                    style={{
                      background: '#141414',
                      border: validationErrors.message ? '1.5px solid var(--red)' : '1.5px solid #222',
                      borderRadius: '8px',
                      padding: '12px 14px',
                      color: '#fff',
                      fontSize: '0.88rem',
                      fontFamily: 'inherit',
                      outline: 'none',
                      resize: 'vertical',
                    }}
                  />
                  {validationErrors.message && (
                    <span style={{ color: 'var(--red)', fontSize: '0.75rem', fontWeight: 500 }}>{validationErrors.message}</span>
                  )}
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  style={{
                    background: 'var(--red)',
                    color: '#fff',
                    fontSize: '0.92rem',
                    fontWeight: 700,
                    padding: '14px 20px',
                    borderRadius: '8px',
                    cursor: isSubmitting ? 'not-allowed' : 'pointer',
                    transition: 'background 0.2s, opacity 0.2s',
                    opacity: isSubmitting ? 0.7 : 1,
                  }}
                  onMouseEnter={e => { if(!isSubmitting) e.currentTarget.style.background = 'var(--red-dark)'; }}
                  onMouseLeave={e => { if(!isSubmitting) e.currentTarget.style.background = 'var(--red)'; }}
                >
                  {isSubmitting ? 'Sending Request...' : 'Send Message'}
                </button>
              </form>
            )}
          </div>
        </div>
      </main>

      {/* Global Footer */}
      <Footer />
    </div>
  );
}
