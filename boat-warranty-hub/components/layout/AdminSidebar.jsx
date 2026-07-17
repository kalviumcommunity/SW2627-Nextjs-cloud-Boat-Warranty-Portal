'use client';
import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function AdminNavbar({ admin }) {
  const router = useRouter();
  const [showDropdown, setShowDropdown] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('admin');
    router.push('/admin/login');
  };

  const adminName = admin?.name || (admin?.email ? admin.email.split('@')[0] : 'Admin');

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
      <Link href="/admin" style={{
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

      <ul style={{ display: 'flex', listStyle: 'none', gap: '2px', flexShrink: 0, margin: 0, padding: 0 }}>
        {[
          { label: 'Categories', arrow: true },
          { label: 'Daily Deals', arrow: false },
          { label: 'Gift with boAt', arrow: false },
          { label: 'More', arrow: true },
        ].map(({ label, arrow }) => (
          <li key={label}>
            <Link href="#" style={{
              display: 'flex', alignItems: 'center', gap: '4px',
              padding: '6px 10px', color: 'var(--gray-300)',
              fontSize: '0.82rem', fontWeight: 500, borderRadius: '6px',
              textDecoration: 'none', transition: 'color 0.2s',
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

      <div style={{ flex: 1 }} />

      <div style={{ display: 'flex', alignItems: 'center', gap: '20px', flexShrink: 0 }}>
        <div style={{ position: 'relative', cursor: 'pointer' }}>
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--white)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
            <path d="M13.73 21a2 2 0 0 1-3.46 0" />
          </svg>
          <span style={{
            position: 'absolute', top: '-6px', right: '-6px',
            background: 'var(--red)', color: '#fff', fontSize: '0.6rem',
            fontWeight: 800, borderRadius: '50%', width: '16px', height: '16px',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>3</span>
        </div>

        <div style={{ position: 'relative' }}>
          <div onClick={() => setShowDropdown(!showDropdown)} style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', userSelect: 'none' }}>
            <div style={{
              width: '32px', height: '32px', borderRadius: '50%',
              background: 'rgba(232,0,29,0.15)', border: '1.5px solid rgba(232,0,29,0.4)',
              display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
            }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#e8001d" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="8" r="4" />
                <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
              </svg>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', textAlign: 'left', lineHeight: 1.25 }}>
              <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--white)' }}>{adminName}</span>
              <span style={{ fontSize: '0.72rem', color: 'var(--gray-300)' }}>Warranty Admin</span>
            </div>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="var(--gray-300)" strokeWidth="2.5">
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </div>

          {showDropdown && (
            <div style={{
              position: 'absolute', right: 0, top: '42px',
              background: '#141414', border: '1px solid #2a2a2a',
              borderRadius: '10px', padding: '8px 0', minWidth: '180px',
              boxShadow: '0 10px 30px rgba(0,0,0,0.6)', zIndex: 200,
            }}>
              <div style={{ padding: '10px 16px', fontSize: '0.78rem', color: '#555', borderBottom: '1px solid #222', wordBreak: 'break-all' }}>
                {admin?.email || 'admin@boat.com'}
              </div>
              <Link href="/admin" style={{ display: 'block', padding: '10px 16px', color: 'rgba(255,255,255,0.75)', fontSize: '0.85rem', fontWeight: 500, textDecoration: 'none' }}
                onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.05)'}
                onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
                onClick={() => setShowDropdown(false)}
              >Dashboard</Link>
              <button onClick={handleLogout} style={{
                width: '100%', textAlign: 'left', padding: '10px 16px',
                background: 'transparent', color: 'var(--red)', fontSize: '0.85rem',
                fontWeight: 600, cursor: 'pointer', border: 'none', display: 'block', fontFamily: 'inherit',
              }}
                onMouseEnter={e => e.currentTarget.style.background = 'rgba(255,255,255,0.05)'}
                onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
              >Logout</button>
            </div>
          )}
        </div>

        <button onClick={handleLogout} style={{
          display: 'flex', alignItems: 'center', gap: '8px',
          border: '1px solid #333', borderRadius: '8px', padding: '8px 16px',
          color: 'var(--white)', fontSize: '0.82rem', fontWeight: 600,
          background: 'transparent', cursor: 'pointer', whiteSpace: 'nowrap',
          transition: 'background 0.2s, border-color 0.2s', fontFamily: 'inherit',
        }}
          onMouseEnter={e => { e.currentTarget.style.background = 'rgba(232,0,29,0.1)'; e.currentTarget.style.borderColor = 'rgba(232,0,29,0.5)'; }}
          onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.borderColor = '#333'; }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
            <polyline points="16 17 21 12 16 7" />
            <line x1="21" y1="12" x2="9" y2="12" />
          </svg>
          Logout
        </button>
      </div>
    </nav>
  );
}
