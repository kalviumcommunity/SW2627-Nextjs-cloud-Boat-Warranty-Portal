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
        zIndex: 10,
        marginTop: '-44px',
        padding: '0 48px',
      }}
    >
      {/* Background fill to extend the lower white body up to the banner */}
      <div style={{
        position: 'absolute',
        top: '44px', // Starts precisely where the overlap ends
        left: 0,
        right: 0,
        bottom: '-20px', // Extends down to merge with the next section
        background: '#f8f9fa', // Using a light off-white/white to match lower body (adjust if needed to var(--white))
        zIndex: -1,
      }} />
      <div style={{
        background: 'var(--white)',
        borderRadius: '16px',
        padding: '28px 32px 22px',
        boxShadow: 'var(--card-shadow)',
        border: '1px solid var(--gray-200)',
      }}>
        {/* Input Row */}
        <div style={{ display: 'flex', gap: '16px', alignItems: 'stretch' }}>
          {/* Input Container */}
          <div style={{
            flex: 1,
            display: 'flex',
            alignItems: 'center',
            gap: '14px',
            border: '1.5px solid var(--gray-200)',
            borderRadius: '10px',
            padding: '14px 16px',
            background: 'var(--white)',
          }}>
            {/* Input Badge Icon */}
            {badgeType === 'sn' ? (
              <div style={{
                flexShrink: 0,
                background: 'rgba(232, 0, 29, 0.06)',
                borderRadius: '8px',
                width: '44px',
                height: '44px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '1.5px solid rgba(232, 0, 29, 0.1)',
              }}>
                <span style={{
                  color: 'var(--red)',
                  fontSize: '0.85rem',
                  fontWeight: 700,
                  letterSpacing: '0.5px',
                }}>
                  [SN]
                </span>
              </div>
            ) : (
              <div style={{
                flexShrink: 0,
                background: 'var(--gray-100)',
                borderRadius: '8px',
                width: '44px',
                height: '44px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                  <rect x="3" y="4" width="2" height="16" rx="0.5" fill="#555" />
                  <rect x="7" y="4" width="1" height="16" rx="0.5" fill="#555" />
                  <rect x="10" y="4" width="2" height="16" rx="0.5" fill="#555" />
                  <rect x="14" y="4" width="1" height="16" rx="0.5" fill="#555" />
                  <rect x="17" y="4" width="2" height="16" rx="0.5" fill="#555" />
                  <rect x="21" y="4" width="1" height="16" rx="0.5" fill="#555" />
                </svg>
              </div>
            )}

            {/* Text Inputs */}
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '3px' }}>
              <input
                id="serial-number-input"
                type="text"
                value={serial}
                onChange={e => { setSerial(e.target.value); setError(''); }}
                placeholder="Enter serial number"
                style={{
                  border: 'none',
                  outline: 'none',
                  fontSize: '0.92rem',
                  fontFamily: 'inherit',
                  color: 'var(--black)',
                  background: 'transparent',
                  fontWeight: 500,
                  width: '100%',
                }}
              />
              <span style={{ fontSize: '0.72rem', color: 'var(--gray-500)' }}>
                e.g. SN1234567890
              </span>
            </div>

            {/* Help Button */}
            <button
              aria-label="Help"
              style={{ background: 'transparent', border: 'none', cursor: 'pointer', display: 'flex', padding: '4px' }}
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="10" stroke="#aaa" strokeWidth="2" />
                <path d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3" stroke="#aaa" strokeWidth="2" strokeLinecap="round" />
                <circle cx="12" cy="17" r="0.5" fill="#aaa" stroke="#aaa" strokeWidth="1" />
              </svg>
            </button>
          </div>

          {/* Verify Button */}
          <button
            id="verify-warranty-btn"
            onClick={handleVerify}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              background: 'var(--red)',
              color: 'var(--white)',
              fontSize: '1rem',
              fontWeight: 700,
              padding: '0 36px',
              borderRadius: '10px',
              minHeight: '72px',
              whiteSpace: 'nowrap',
              border: 'none',
              cursor: 'pointer',
              transition: 'background 0.2s, transform 0.15s, box-shadow 0.2s',
              letterSpacing: '0.2px',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.background = 'var(--red-dark)';
              e.currentTarget.style.transform = 'translateY(-2px)';
              e.currentTarget.style.boxShadow = 'var(--btn-shadow)';
            }}
            onMouseLeave={e => {
              e.currentTarget.style.background = 'var(--red)';
              e.currentTarget.style.transform = 'translateY(0)';
              e.currentTarget.style.boxShadow = 'none';
            }}
          >
            Verify Warranty
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path d="M5 12h14M13 6l6 6-6 6" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>

        {/* Error */}
        {error && (
          <p style={{ color: 'var(--red)', fontSize: '0.78rem', marginTop: '10px', fontWeight: 500 }}>
            {error}
          </p>
        )}

        {/* Helper Text */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          marginTop: '14px',
          color: 'var(--gray-500)',
          fontSize: '0.78rem',
        }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="10" stroke="#888" strokeWidth="2" />
            <line x1="12" y1="8" x2="12" y2="12" stroke="#888" strokeWidth="2" strokeLinecap="round" />
            <circle cx="12" cy="16" r="0.5" fill="#888" stroke="#888" strokeWidth="1" />
          </svg>
          <span>You can find the serial number on the product box or on the product label.</span>
        </div>
      </div>
    </div>
  );
}
