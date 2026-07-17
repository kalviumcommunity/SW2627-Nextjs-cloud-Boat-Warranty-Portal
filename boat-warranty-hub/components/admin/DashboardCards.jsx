'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';

export default function AdminCTA() {
  const [serial, setSerial] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const handleVerify = () => {
    if (serial.length < 9 || serial.length > 20) {
      setError('Please enter a valid serial number (9-20 characters).');
    } else {
      setError('');
      router.push('/warranty-result?serial=' + encodeURIComponent(serial));
    }
  };

  return (
    <div style={{ position: 'relative', zIndex: 10, marginTop: '-44px', padding: '0 48px' }}>
      {/* Main Warranty Input Card */}
      <div style={{
        background: 'var(--white)', borderRadius: '16px',
        padding: '28px 32px 22px',
        boxShadow: 'var(--card-shadow)', border: '1px solid var(--gray-200)',
      }}>
        <div style={{ display: 'flex', gap: '16px', alignItems: 'stretch' }}>
          {/* Input Container */}
          <div style={{
            flex: 1, display: 'flex', alignItems: 'center', gap: '14px',
            border: '1.5px solid var(--gray-200)', borderRadius: '10px',
            padding: '14px 16px', background: 'var(--white)',
          }}>
            {/* SN Badge */}
            <div style={{
              flexShrink: 0, background: 'rgba(232,0,29,0.06)', borderRadius: '8px',
              width: '44px', height: '44px', display: 'flex',
              alignItems: 'center', justifyContent: 'center',
              border: '1.5px solid rgba(232,0,29,0.1)',
            }}>
              <span style={{ color: 'var(--red)', fontSize: '0.85rem', fontWeight: 700, letterSpacing: '0.5px' }}>[SN]</span>
            </div>
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '3px' }}>
              <input
                id="admin-serial-input"
                type="text"
                value={serial}
                onChange={e => { setSerial(e.target.value); setError(''); }}
                placeholder="Enter 9 to 20 character serial number"
                maxLength={20}
                style={{
                  border: 'none', outline: 'none', fontSize: '0.92rem',
                  fontFamily: 'inherit', color: 'var(--black)',
                  background: 'transparent', fontWeight: 500, width: '100%',
                }}
              />
              <span style={{ fontSize: '0.72rem', color: 'var(--gray-500)' }}>e.g. SN1234567890</span>
            </div>
            <button aria-label="Help" style={{ background: 'transparent', border: 'none', cursor: 'pointer', display: 'flex', padding: '4px' }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="10" stroke="#aaa" strokeWidth="2" />
                <path d="M9.09 9a3 3 0 015.83 1c0 2-3 3-3 3" stroke="#aaa" strokeWidth="2" strokeLinecap="round" />
                <circle cx="12" cy="17" r="0.5" fill="#aaa" stroke="#aaa" strokeWidth="1" />
              </svg>
            </button>
          </div>

          {/* Verify Button */}
          <button
            id="admin-verify-btn"
            onClick={handleVerify}
            style={{
              display: 'flex', alignItems: 'center', gap: '10px',
              background: 'var(--red)', color: 'var(--white)',
              fontSize: '1rem', fontWeight: 700, padding: '0 36px',
              borderRadius: '10px', minHeight: '72px', whiteSpace: 'nowrap',
              border: 'none', cursor: 'pointer',
              transition: 'background 0.2s, transform 0.15s, box-shadow 0.2s',
              letterSpacing: '0.2px',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = 'var(--red-dark)'; e.currentTarget.style.transform = 'translateY(-2px)'; e.currentTarget.style.boxShadow = 'var(--btn-shadow)'; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'var(--red)'; e.currentTarget.style.transform = 'translateY(0)'; e.currentTarget.style.boxShadow = 'none'; }}
          >
            Verify Warranty
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <path d="M5 12h14M13 6l6 6-6 6" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
        </div>

        {error && <p style={{ color: 'var(--red)', fontSize: '0.78rem', marginTop: '10px', fontWeight: 500 }}>{error}</p>}

        <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '14px', color: 'var(--gray-500)', fontSize: '0.78rem' }}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="10" stroke="#888" strokeWidth="2" />
            <line x1="12" y1="8" x2="12" y2="12" stroke="#888" strokeWidth="2" strokeLinecap="round" />
            <circle cx="12" cy="16" r="0.5" fill="#888" stroke="#888" strokeWidth="1" />
          </svg>
          <span>You can find the serial number on the product box or on the product label.</span>
        </div>
      </div>

      {/* Admin Extra Row: Where to find serial number (left) + Add New Product (right) */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 320px',
        gap: '20px',
        marginTop: '20px',
        padding: '0',
      }}>
        {/* Left — Where to Find Serial Number */}
        <div style={{
          background: 'var(--white)',
          borderRadius: '14px',
          padding: '28px 32px',
          border: '1px solid var(--gray-200)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
        }}>
          <h2 style={{
            fontSize: '1.1rem',
            fontWeight: 800,
            color: 'var(--black)',
            marginBottom: '24px',
            marginTop: 0,
          }}>
            Where to find serial number?
          </h2>

          <div style={{ display: 'flex', alignItems: 'center' }}>
            {/* Product Label */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '20px', flex: 1 }}>
              <div style={{
                flexShrink: 0,
                background: 'var(--gray-100)',
                borderRadius: '10px',
                width: '130px',
                height: '110px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden',
              }}>
                <Image
                  src="/boat_product_label.png"
                  alt="boAt product label showing serial number"
                  width={130}
                  height={110}
                  style={{ objectFit: 'contain', width: '100%', height: '100%' }}
                />
              </div>
              <div>
                <div style={{ fontSize: '0.92rem', fontWeight: 700, color: 'var(--black)', marginBottom: '6px' }}>
                  On Product Label
                </div>
                <div style={{ fontSize: '0.78rem', color: 'var(--gray-500)', lineHeight: 1.5, maxWidth: '200px' }}>
                  Check the label on your product for the serial number.
                </div>
              </div>
            </div>

            {/* Divider */}
            <div style={{ width: '1px', height: '100px', background: 'var(--gray-200)', margin: '0 32px', flexShrink: 0 }} />

            {/* Product Box */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '20px', flex: 1 }}>
              <div style={{
                flexShrink: 0,
                background: 'var(--gray-100)',
                borderRadius: '10px',
                width: '130px',
                height: '110px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                overflow: 'hidden',
              }}>
                <Image
                  src="/boat_product_box.png"
                  alt="boAt product box showing barcode label"
                  width={130}
                  height={110}
                  style={{ objectFit: 'contain', width: '100%', height: '100%' }}
                />
              </div>
              <div>
                <div style={{ fontSize: '0.92rem', fontWeight: 700, color: 'var(--black)', marginBottom: '6px' }}>
                  On Product Box
                </div>
                <div style={{ fontSize: '0.78rem', color: 'var(--gray-500)', lineHeight: 1.5, maxWidth: '200px' }}>
                  Check the barcode label on the product box.
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right — Add New Product Card */}
        <div style={{
          background: 'var(--white)',
          borderRadius: '14px',
          padding: '24px',
          border: '1px solid var(--gray-200)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          gap: '20px',
        }}>
          <div style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
            <div style={{
              width: '52px', height: '52px', borderRadius: '50%',
              border: '1.5px solid rgba(232,0,29,0.25)',
              background: 'rgba(232,0,29,0.05)',
              display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
            }}>
              <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
                <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" stroke="#E8001D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <polyline points="3.27 6.96 12 12.01 20.73 6.96" stroke="#E8001D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <line x1="12" y1="22.08" x2="12" y2="12" stroke="#E8001D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div>
              <h3 style={{ fontSize: '1rem', fontWeight: 800, color: 'var(--black)', marginBottom: '8px' }}>
                Add New Product
              </h3>
              <p style={{ fontSize: '0.78rem', color: 'var(--gray-500)', lineHeight: 1.55 }}>
                Add a new product to the system by entering product details and serial information.
              </p>
            </div>
          </div>

          <Link
            id="add-new-product-btn"
            href="/Add product"
            style={{
              display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
              border: '1.5px solid var(--red)', color: 'var(--red)',
              fontSize: '0.85rem', fontWeight: 700, padding: '12px 20px',
              borderRadius: '10px', textDecoration: 'none',
              transition: 'background 0.2s, color 0.2s',
            }}
            onMouseEnter={e => { e.currentTarget.style.background = 'var(--red)'; e.currentTarget.style.color = 'var(--white)'; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--red)'; }}
          >
            Add New Product
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
              <path d="M5 12h14M13 6l6 6-6 6" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>
        </div>
      </div>
    </div>
  );
}
