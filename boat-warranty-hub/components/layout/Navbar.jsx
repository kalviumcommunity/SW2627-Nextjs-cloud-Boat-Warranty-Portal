'use client';
import { useState } from 'react';
import Link from 'next/link';

export default function Navbar() {
  const [searchVal, setSearchVal] = useState('');
  const [showMore, setShowMore] = useState(false);

  return (
    <nav style={{
      display: 'flex',
      alignItems: 'center',
      gap: '24px',
      padding: '0 24px',
      height: '60px',
      background: 'var(--black)',
      position: 'sticky',
      top: 0,
      zIndex: 100,
      borderBottom: '1px solid #222',
    }}>
      {/* Logo */}
      <Link href="/" style={{
        fontSize: '1.6rem',
        fontWeight: 900,
        color: 'var(--white)',
        letterSpacing: '-1px',
        fontStyle: 'italic',
        flexShrink: 0,
        textTransform: 'lowercase',
        textDecoration: 'none',
      }}>
        bo<span style={{ color: 'var(--red)', textTransform: 'uppercase' }}>A</span>t
      </Link>

      {/* Nav Links */}
      <ul style={{ display: 'flex', listStyle: 'none', gap: '2px', flexShrink: 0 }}>
        {[
          { label: 'Categories', arrow: true, href: '#' },
          { label: 'Daily Deals', arrow: false, href: '#' },
          { label: 'Gift with boAt', arrow: false, href: '#' },
        ].map(({ label, arrow, href }) => (
          <li key={label}>
            <Link href={href} style={{
              display: 'flex',
              alignItems: 'center',
              gap: '4px',
              padding: '6px 10px',
              color: 'var(--gray-300)',
              fontSize: '0.82rem',
              fontWeight: 500,
              borderRadius: '6px',
              textDecoration: 'none',
              transition: 'color 0.2s',
            }}
              onMouseEnter={e => { e.currentTarget.style.color = 'white'; e.currentTarget.style.background = 'rgba(255,255,255,0.06)'; }}
              onMouseLeave={e => { e.currentTarget.style.color = 'var(--gray-300)'; e.currentTarget.style.background = 'transparent'; }}
            >
              {label}
              {arrow && (
                <svg width="11" height="11" viewBox="0 0 12 12" fill="none">
                  <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              )}
            </Link>
          </li>
        ))}
        {/* Interactive More Dropdown */}
        <li 
          onMouseEnter={() => setShowMore(true)}
          onMouseLeave={() => setShowMore(false)}
          style={{ position: 'relative' }}
        >
          <button style={{
            display: 'flex',
            alignItems: 'center',
            gap: '4px',
            padding: '6px 10px',
            color: showMore ? 'white' : 'var(--gray-300)',
            background: showMore ? 'rgba(255,255,255,0.06)' : 'transparent',
            fontSize: '0.82rem',
            fontWeight: 500,
            borderRadius: '6px',
            textDecoration: 'none',
            transition: 'color 0.2s, background 0.2s',
            cursor: 'pointer',
          }}>
            More
            <svg width="11" height="11" viewBox="0 0 12 12" fill="none" style={{ transform: showMore ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s' }}>
              <path d="M2 4l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </button>
          
          {showMore && (
            <div style={{
              position: 'absolute',
              top: '100%',
              left: 0,
              background: '#141414',
              border: '1px solid #2a2a2a',
              borderRadius: '8px',
              padding: '6px 0',
              minWidth: '150px',
              boxShadow: '0 8px 24px rgba(0,0,0,0.5)',
              display: 'flex',
              flexDirection: 'column',
              zIndex: 1000,
              marginTop: '4px',
            }}>
              {[
                { label: 'About Us', href: '/about' },
                { label: 'FAQs', href: '/faq' },
                { label: 'Contact Us', href: '/contact' },
              ].map((item) => (
                <Link 
                  key={item.label}
                  href={item.href} 
                  style={{ 
                    padding: '8px 16px', 
                    color: 'var(--gray-300)', 
                    fontSize: '0.82rem', 
                    textDecoration: 'none',
                    fontWeight: 500,
                    transition: 'background 0.2s, color 0.2s',
                  }}
                  onMouseEnter={e => { e.currentTarget.style.color = 'white'; e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; }}
                  onMouseLeave={e => { e.currentTarget.style.color = 'var(--gray-300)'; e.currentTarget.style.background = 'transparent'; }}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          )}
        </li>
      </ul>

      {/* Search */}
      <div style={{
        flex: 1,
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
        background: '#1c1c1c',
        border: '1px solid #333',
        borderRadius: '8px',
        padding: '0 14px',
        height: '38px',
        maxWidth: '340px',
      }}>
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
          <circle cx="11" cy="11" r="7" stroke="#999" strokeWidth="2" />
          <path d="M20 20l-3-3" stroke="#999" strokeWidth="2" strokeLinecap="round" />
        </svg>
        <input
          type="text"
          placeholder='Search "boAt Rockerz 550"'
          value={searchVal}
          onChange={e => setSearchVal(e.target.value)}
          style={{
            background: 'transparent',
            border: 'none',
            outline: 'none',
            color: 'var(--gray-300)',
            fontSize: '0.82rem',
            fontFamily: 'inherit',
            width: '100%',
          }}
        />
      </div>

      {/* Right Actions */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '16px', flexShrink: 0, marginLeft: 'auto' }}>
        <Link href="/signup" style={{
          display: 'flex', alignItems: 'center', gap: '6px',
          color: 'var(--gray-300)', fontSize: '0.8rem', fontWeight: 500,
          textDecoration: 'none', whiteSpace: 'nowrap',
        }}>
          <svg width="17" height="17" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="8" r="4" stroke="currentColor" strokeWidth="2" />
            <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
          Login / Sign up
        </Link>

        <Link href="/product" style={{ color: 'var(--gray-300)', display: 'flex', alignItems: 'center' }}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
            <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <line x1="3" y1="6" x2="21" y2="6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            <path d="M16 10a4 4 0 01-8 0" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </Link>

        <Link href="/admin/login" style={{
          display: 'flex', alignItems: 'center', gap: '8px',
          background: 'var(--red)', color: 'var(--white)',
          fontSize: '0.8rem', fontWeight: 600,
          padding: '8px 16px', borderRadius: '8px',
          textDecoration: 'none', whiteSpace: 'nowrap',
          transition: 'background 0.2s',
        }}>
          <svg width="15" height="15" viewBox="0 0 24 24" fill="none">
            <rect x="3" y="3" width="8" height="8" rx="1" fill="white" />
            <rect x="13" y="3" width="8" height="8" rx="1" fill="white" opacity="0.7" />
            <rect x="3" y="13" width="8" height="8" rx="1" fill="white" opacity="0.7" />
            <rect x="13" y="13" width="8" height="8" rx="1" fill="white" opacity="0.5" />
          </svg>
          Admin Dashboard
        </Link>
      </div>

      {/* Warranty Lookup Badge */}
      <Link href="#warranty-form" style={{
        display: 'flex', alignItems: 'center', gap: '8px',
        background: 'var(--red)', color: 'var(--white)',
        fontSize: '0.72rem', fontWeight: 600,
        padding: '10px 14px', lineHeight: 1.3,
        textAlign: 'center', height: '60px',
        marginLeft: '8px', marginRight: '-24px',
        textDecoration: 'none', flexShrink: 0,
      }}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
          <path d="M12 2L4 6v6c0 5.55 3.84 10.74 8 12 4.16-1.26 8-6.45 8-12V6l-8-4z" stroke="white" strokeWidth="2" strokeLinecap="round" />
          <path d="M9 12l2 2 4-4" stroke="white" strokeWidth="2" strokeLinecap="round" />
        </svg>
        <span>Warranty<br />Lookup</span>
      </Link>
    </nav>
  );
}
