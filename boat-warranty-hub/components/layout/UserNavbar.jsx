'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';

export default function UserNavbar() {
  const [user, setUser] = useState(null);
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        console.error('Failed to parse user from localStorage', e);
      }
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('user');
    setUser(null);
    setShowDropdown(false);
    window.location.href = '/login';
  };

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
      <Link href="/home" style={{
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
          { label: 'Categories', arrow: true },
          { label: 'Daily Deals', arrow: false },
          { label: 'Gift with boAt', arrow: false },
          { label: 'More', arrow: true },
        ].map(({ label, arrow }) => (
          <li key={label}>
            <Link href="#" style={{
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
      </ul>

      {/* Search Bar */}
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
      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        gap: '24px', 
        flexShrink: 0,
        marginLeft: 'auto',
      }}>


        {/* My Account / Welcome Back */}
        <div style={{ position: 'relative' }}>
          <div 
            onClick={() => setShowDropdown(!showDropdown)}
            style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '8px', 
              cursor: 'pointer',
              color: 'var(--white)',
              userSelect: 'none'
            }}
          >
            {/* User Avatar Icon */}
            <div style={{
              width: '30px',
              height: '30px',
              borderRadius: '50%',
              border: '1.5px solid #444',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
              background: '#1a1a1a',
            }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--gray-300)' }}>
                <circle cx="12" cy="8" r="4" />
                <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
              </svg>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', textAlign: 'left', lineHeight: 1.25 }}>
              <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--white)' }}>My Account</span>
              <span style={{ fontSize: '0.72rem', color: 'var(--gray-300)' }}>Welcome Back!</span>
            </div>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" style={{ color: 'var(--gray-300)' }}>
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </div>

          {/* Dropdown Menu */}
          {showDropdown && (
            <div style={{
              position: 'absolute',
              right: 0,
              top: '42px',
              background: '#141414',
              border: '1px solid #2a2a2a',
              borderRadius: '8px',
              padding: '8px 0',
              minWidth: '160px',
              boxShadow: '0 10px 25px rgba(0,0,0,0.6)',
              zIndex: 200
            }}>
              <div style={{
                padding: '8px 16px',
                fontSize: '0.78rem',
                color: 'var(--gray-500)',
                borderBottom: '1px solid #222',
                wordBreak: 'break-all'
              }}>
                {user ? (user.email || user.name) : 'User Account'}
              </div>
              <button 
                onClick={handleLogout}
                style={{
                  width: '100%',
                  textAlign: 'left',
                  padding: '10px 16px',
                  background: 'transparent',
                  color: 'var(--red)',
                  fontSize: '0.85rem',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'background 0.2s',
                  display: 'block',
                  border: 'none'
                }}
                onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.05)'}
                onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
              >
                Logout
              </button>
            </div>
          )}
        </div>

        {/* Cart Button */}
        <Link href="/cart" style={{
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
          border: '1px solid #333',
          borderRadius: '8px',
          padding: '8px 16px',
          color: 'var(--white)',
          fontSize: '0.85rem',
          fontWeight: 500,
          textDecoration: 'none',
          transition: 'background 0.2s, border-color 0.2s',
        }}
          onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; e.currentTarget.style.borderColor = '#555'; }}
          onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.borderColor = '#333'; }}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="9" cy="21" r="1"></circle>
            <circle cx="20" cy="21" r="1"></circle>
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
          </svg>
          Cart
        </Link>
      </div>
    </nav>
  );
}
