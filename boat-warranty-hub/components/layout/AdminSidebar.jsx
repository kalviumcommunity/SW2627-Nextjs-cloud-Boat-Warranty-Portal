'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { signOut } from 'next-auth/react';
import { useRouter as useNextRouter } from 'next/navigation';

const CONTEXT_COLORS = {
  success: '#10b981',
  warning: '#f59e0b',
  error: '#ef4444',
  process: '#3b82f6',
};

export default function AdminNavbar({ admin }) {
  const router = useNextRouter();
  const [showDropdown, setShowDropdown] = useState(false);
  const [showMore, setShowMore] = useState(false);
  const [showNotif, setShowNotif] = useState(false);

  const [notifications, setNotifications] = useState([]);
  const [pendingCount, setPendingCount] = useState(0);

  useEffect(() => {
    async function fetchNotifs() {
      try {
        const res = await fetch('/api/admin/notifications');
        const data = await res.json();
        if (res.ok && data.success) {
          setNotifications(data.data || []);
          setPendingCount(data.pendingCount || 0);
        }
      } catch (err) {
        console.error('Failed to fetch admin notifications:', err);
      }
    }

    fetchNotifs();
    const interval = setInterval(fetchNotifs, 10000); // refresh every 10s
    return () => clearInterval(interval);
  }, []);

  const handleLogout = async () => {
    await signOut({ redirect: false });
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
      fontFamily: 'Inter, system-ui, sans-serif',
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
          { label: 'Categories', arrow: true, href: '#' },
          { label: 'Daily Deals', arrow: false, href: '#' },
          { label: 'Gift with boAt', arrow: false, href: '#' },
        ].map(({ label, arrow, href }) => (
          <li key={label}>
            <Link href={href} style={{
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
            border: 'none',
            fontFamily: 'inherit'
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

      <div style={{ flex: 1 }} />

      <div style={{ display: 'flex', alignItems: 'center', gap: '20px', flexShrink: 0 }}>
        {/* Notification Bell Dropdown */}
        <div style={{ position: 'relative' }}>
          <div 
            onClick={() => setShowNotif(!showNotif)} 
            style={{ position: 'relative', cursor: 'pointer', padding: '4px' }}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="var(--white)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
              <path d="M13.73 21a2 2 0 0 1-3.46 0" />
            </svg>
            {pendingCount > 0 && (
              <span style={{
                position: 'absolute', top: '-2px', right: '-4px',
                background: 'var(--red)', color: '#fff', fontSize: '0.62rem',
                fontWeight: 900, borderRadius: '0px', width: '18px', height: '18px',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                clipPath: 'polygon(3px 0, 100% 0, 100% calc(100% - 3px), calc(100% - 3px) 100%, 0 100%, 0 3px)',
                boxShadow: '0 0 8px rgba(232,0,29,0.8)',
              }}>
                {pendingCount}
              </span>
            )}
          </div>

          {/* Edgy Notification Drawer */}
          {showNotif && (
            <div style={{
              position: 'absolute',
              right: 0,
              top: '44px',
              width: '380px',
              maxWidth: '92vw',
              background: '#0a0a0a',
              border: '1.5px solid #e8001d',
              borderRadius: '0px', // sharp edgy boAt style
              boxShadow: '0 16px 48px rgba(0,0,0,0.85), 0 0 16px rgba(232,0,29,0.3)',
              zIndex: 300,
              clipPath: 'polygon(12px 0, 100% 0, 100% calc(100% - 12px), calc(100% - 12px) 100%, 0 100%, 0 12px)',
            }}>
              <div style={{
                padding: '14px 18px',
                background: '#121212',
                borderBottom: '1px solid #262626',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <span style={{
                    fontSize: '0.7rem',
                    fontWeight: 900,
                    color: '#e8001d',
                    background: 'rgba(232,0,29,0.15)',
                    border: '1px solid rgba(232,0,29,0.4)',
                    padding: '2px 8px',
                    letterSpacing: '1px',
                  }}>
                    [LIVE ALERTS]
                  </span>
                  <span style={{ fontSize: '0.88rem', fontWeight: 800, color: '#fff' }}>
                    Repair Notifications
                  </span>
                </div>
                <button
                  onClick={() => setShowNotif(false)}
                  style={{ background: 'none', border: 'none', color: '#888', cursor: 'pointer', fontSize: '1.1rem' }}
                >
                  ×
                </button>
              </div>

              <div style={{ maxHeight: '360px', overflowY: 'auto', padding: '8px 0' }}>
                {notifications.length === 0 ? (
                  <div style={{ padding: '24px 18px', textAlign: 'center', color: '#888', fontSize: '0.82rem' }}>
                    No active repair notifications.
                  </div>
                ) : (
                  notifications.map((item) => {
                    const ctxColor = CONTEXT_COLORS[item.context] || '#3b82f6';
                    return (
                      <div
                        key={item.id}
                        onClick={() => {
                          setShowNotif(false);
                          if (item.serialNumber) {
                            router.push(`/admin/repair-history?serial=${encodeURIComponent(item.serialNumber)}`);
                          } else {
                            router.push('/admin');
                          }
                        }}
                        style={{
                          padding: '12px 18px',
                          borderBottom: '1px solid #1a1a1a',
                          borderLeft: `4px solid ${ctxColor}`,
                          background: item.status === 'PENDING' ? 'rgba(245,158,11,0.06)' : 'transparent',
                          cursor: 'pointer',
                          transition: 'background 0.2s',
                        }}
                        onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(255,255,255,0.05)')}
                        onMouseLeave={(e) =>
                          (e.currentTarget.style.background =
                            item.status === 'PENDING' ? 'rgba(245,158,11,0.06)' : 'transparent')
                        }
                      >
                        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                          <span style={{ fontSize: '0.8rem', fontWeight: 800, color: '#fff' }}>
                            {item.title}
                          </span>
                          <span style={{
                            fontSize: '0.65rem',
                            fontWeight: 700,
                            color: ctxColor,
                            background: `${ctxColor}18`,
                            border: `1px solid ${ctxColor}44`,
                            padding: '1px 6px',
                            textTransform: 'uppercase',
                          }}>
                            {item.status}
                          </span>
                        </div>
                        <p style={{ margin: '0 0 6px', fontSize: '0.78rem', color: '#ccc', lineHeight: 1.35 }}>
                          {item.message}
                        </p>
                        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.68rem', color: '#777' }}>
                          <span>{item.productName}</span>
                          <span>{new Date(item.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>

              <div style={{
                padding: '10px 18px',
                background: '#121212',
                borderTop: '1px solid #262626',
                textAlign: 'center',
              }}>
                <Link
                  href="/admin"
                  onClick={() => setShowNotif(false)}
                  style={{ color: '#e8001d', fontSize: '0.78rem', fontWeight: 700, textDecoration: 'none' }}
                >
                  View All Notifications on Dashboard →
                </Link>
              </div>
            </div>
          )}
        </div>

        {/* User Profile */}
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
          onMouseLeave={e => { e.currentTarget.style.borderColor = '#333'; e.currentTarget.style.background = 'transparent'; }}
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
