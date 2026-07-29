'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';



export default function CTA({ badgeType }) {
  const [serial, setSerial] = useState('');
  const [error, setError] = useState('');

  const router = useRouter();
  const { status } = useSession();

  const handleVerify = () => {
    if (!serial.trim()) {
      setError('Please enter a serial number.');
    } else if (status !== 'authenticated') {
      router.push(`/login?callbackUrl=/warranty-result?serial=${encodeURIComponent(serial)}`);
    } else {
      setError('');
      router.push(`/warranty-result?serial=${encodeURIComponent(serial)}`);
    }
  };

  return (
    <div
      id="warranty-form"
      style={{
        position: 'relative',
        zIndex: 20,
        marginTop: '-36px',
        padding: '0 48px',
        maxWidth: '1100px',
        margin: '-36px auto 0 auto',
      }}
    >
      <div
        style={{
          background: '#ffffff',
          borderRadius: '20px',
          padding: '32px 36px 26px',
          boxShadow: '0 20px 40px rgba(0, 0, 0, 0.08), 0 1px 3px rgba(0, 0, 0, 0.05)',
          border: '1px solid #e5e7eb',
        }}
      >
        {/* Title */}
        <div style={{ marginBottom: '18px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '10px' }}>
          <div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#111827', margin: 0, fontFamily: "'Inter', sans-serif" }}>
              Check Warranty Status Instantly
            </h3>
            <p style={{ fontSize: '0.8rem', color: '#6b7280', margin: '3px 0 0 0' }}>
              Enter your product serial number below to verify coverage & download certificate.
            </p>
          </div>


        </div>

        {/* Input Row */}
        <div style={{ display: 'flex', gap: '14px', alignItems: 'stretch', flexWrap: 'wrap' }}>
          {/* Input Container */}
          <div
            style={{
              flex: '1 1 340px',
              display: 'flex',
              alignItems: 'center',
              gap: '14px',
              border: '2px solid #e5e7eb',
              borderRadius: '12px',
              padding: '12px 18px',
              background: '#ffffff',
              transition: 'border-color 0.2s',
            }}
            onFocus={(e) => (e.currentTarget.style.borderColor = '#E31E24')}
            onBlur={(e) => (e.currentTarget.style.borderColor = '#e5e7eb')}
          >
            {/* Input Badge Icon */}
            {badgeType === 'sn' ? (
              <div
                style={{
                  flexShrink: 0,
                  background: 'rgba(227, 30, 36, 0.08)',
                  borderRadius: '8px',
                  width: '42px',
                  height: '42px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  border: '1px solid rgba(227, 30, 36, 0.2)',
                }}
              >
                <span
                  style={{
                    color: '#E31E24',
                    fontSize: '0.85rem',
                    fontWeight: 800,
                    letterSpacing: '0.5px',
                  }}
                >
                  [SN]
                </span>
              </div>
            ) : (
              <div
                style={{
                  flexShrink: 0,
                  background: '#f3f4f6',
                  borderRadius: '8px',
                  width: '42px',
                  height: '42px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                  <rect x="3" y="4" width="2" height="16" rx="0.5" fill="#4b5563" />
                  <rect x="7" y="4" width="1" height="16" rx="0.5" fill="#4b5563" />
                  <rect x="10" y="4" width="2" height="16" rx="0.5" fill="#4b5563" />
                  <rect x="14" y="4" width="1" height="16" rx="0.5" fill="#4b5563" />
                  <rect x="17" y="4" width="2" height="16" rx="0.5" fill="#4b5563" />
                  <rect x="21" y="4" width="1" height="16" rx="0.5" fill="#4b5563" />
                </svg>
              </div>
            )}

            {/* Text Inputs */}
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '2px' }}>
              <input
                id="serial-number-input"
                type="text"
                value={serial}
                onChange={(e) => {
                  setSerial(e.target.value);
                  setError('');
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') handleVerify();
                }}
                placeholder="Enter Serial Number"
                style={{
                  border: 'none',
                  outline: 'none',
                  fontSize: '0.98rem',
                  fontFamily: "'Inter', sans-serif",
                  color: '#111827',
                  background: 'transparent',
                  fontWeight: 600,
                  width: '100%',
                }}
              />
              <span style={{ fontSize: '0.72rem', color: '#9ca3af' }}>
                Found on product barcode or original box
              </span>
            </div>
          </div>

          {/* Verify Button */}
          <button
            id="verify-warranty-btn"
            onClick={handleVerify}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '10px',
              background: '#E31E24',
              color: '#ffffff',
              fontSize: '1.02rem',
              fontWeight: 800,
              padding: '0 36px',
              borderRadius: '12px',
              minHeight: '62px',
              whiteSpace: 'nowrap',
              border: 'none',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              letterSpacing: '0.2px',
              boxShadow: '0 6px 20px rgba(227, 30, 36, 0.3)',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = '#c41920';
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = '0 10px 24px rgba(227, 30, 36, 0.4)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = '#E31E24';
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = '0 6px 20px rgba(227, 30, 36, 0.3)';
            }}
          >
            Verify Warranty
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path
                d="M5 12h14M13 6l6 6-6 6"
                stroke="white"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>

        {/* Error */}
        {error && (
          <p style={{ color: '#E31E24', fontSize: '0.8rem', marginTop: '10px', fontWeight: 600 }}>
            ⚠️ {error}
          </p>
        )}

        {/* Helper Footer */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            marginTop: '16px',
            color: '#6b7280',
            fontSize: '0.78rem',
            paddingTop: '12px',
            borderTop: '1px solid #f3f4f6',
          }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="10" stroke="#9ca3af" strokeWidth="2" />
            <line x1="12" y1="8" x2="12" y2="12" stroke="#9ca3af" strokeWidth="2" strokeLinecap="round" />
            <circle cx="12" cy="16" r="0.5" fill="#9ca3af" stroke="#9ca3af" strokeWidth="1" />
          </svg>
          <span>Need assistance finding your serial number? See our visual guide below.</span>
        </div>
      </div>
    </div>
  );
}
