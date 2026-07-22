'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { showToast } from '@/components/common/BoatToast';

const CONTEXT_COLORS = {
  success: '#10b981',
  warning: '#f59e0b',
  error: '#ef4444',
  process: '#3b82f6',
};

export default function AdminCTA({ stats }) {
  const [serial, setSerial] = useState('');
  const [error, setError] = useState('');
  const router = useRouter();

  const [loading, setLoading] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [loadingNotifs, setLoadingNotifs] = useState(true);

  useEffect(() => {
    async function fetchNotifs() {
      try {
        const res = await fetch('/api/admin/notifications');
        const data = await res.json();
        if (res.ok && data.success) {
          setNotifications(data.data || []);
        }
      } catch (err) {
        console.error('Failed to fetch admin notifications:', err);
      } finally {
        setLoadingNotifs(false);
      }
    }

    fetchNotifs();
  }, []);

  const handleVerify = async () => {
    if (!serial) {
      setError('Please enter a serial number.');
      showToast.warning('Please enter a serial number before verifying.', 'INPUT REQUIRED');
      return;
    }
    setLoading(true);
    showToast.process(`Looking up serial number ${serial}...`, 'WARRANTY SEARCH');
    try {
      const res = await fetch(`/api/warranty/${encodeURIComponent(serial)}`);
      if (res.ok) {
        setError('');
        showToast.success(`Product record found for ${serial}! Redirecting...`, 'PRODUCT FOUND');
        router.push('/admin/warranty-lookup?serial=' + encodeURIComponent(serial));
      } else {
        const data = await res.json();
        const msg = data.message || 'Product not found.';
        setError(msg);
        showToast.error(msg, 'SEARCH FAILED');
      }
    } catch {
      setError('An error occurred connecting to the server.');
      showToast.error('An error occurred connecting to the server.', 'CONNECTION ERROR');
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    { label: 'Total Products', value: stats?.totalProducts ?? '-', icon: 'M3 7l9 5 9-5M3 7l9-5 9 5M3 7v10l9 5 9-5V7M12 12v10' },
    { label: 'Active Warranties', value: stats?.activeWarranties ?? '-', icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z' },
    { label: 'Expired Warranties', value: stats?.expiredWarranties ?? '-', icon: 'M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z' },
    { label: 'Total Repairs', value: stats?.totalRepairs ?? '-', icon: 'M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z' },
    { label: 'Pending Repairs', value: stats?.pendingRepairs ?? '-', icon: 'M12 22a10 10 0 100-20 10 10 0 000 20zM12 6v6l4 2' },
    { label: 'Completed Repairs', value: stats?.completedRepairs ?? '-', icon: 'M5 13l4 4L19 7' }
  ];

  return (
    <div style={{ position: 'relative', zIndex: 10, marginTop: '-30px', padding: '0 clamp(24px, 5vw, 64px) 80px', background: 'transparent', width: '100%', boxSizing: 'border-box' }}>
      
      {/* Stats Grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
        gap: '18px',
        marginBottom: '40px'
      }}>
        {statCards.map((stat, idx) => (
          <div key={idx} style={{
            background: '#ffffff',
            borderRadius: '12px',
            padding: '24px',
            border: '1px solid #e8e8e8',
            display: 'flex',
            alignItems: 'center',
            gap: '20px'
          }}>
            <div style={{
              width: '50px', height: '50px',
              borderRadius: '50%',
              background: 'var(--red)',
              display: 'flex', alignItems: 'center', justifyContent: 'center'
            }}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d={stat.icon} />
              </svg>
            </div>
            <div>
              <div style={{ color: '#666666', fontSize: '0.9rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '6px' }}>
                {stat.label}
              </div>
              <div style={{ color: '#000000', fontSize: '2rem', fontWeight: 800 }}>
                {stat.value}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Main Warranty Input Card */}
      <div style={{
        background: '#ffffff', borderRadius: '16px',
        padding: '28px 32px 22px',
        border: '1px solid #e8e8e8',
        marginBottom: '20px'
      }}>
        <div style={{ display: 'flex', gap: '16px', alignItems: 'stretch' }}>
          {/* Input Container */}
          <div style={{
            flex: 1, display: 'flex', alignItems: 'center', gap: '14px',
            border: '2px solid #e8e8e8', borderRadius: '10px',
            padding: '14px 16px', background: '#f5f5f5',
          }}>
            {/* SN Badge */}
            <div style={{
              flexShrink: 0, background: 'var(--red)', borderRadius: '8px',
              width: '44px', height: '44px', display: 'flex',
              alignItems: 'center', justifyContent: 'center',
            }}>
              <span style={{ color: '#ffffff', fontSize: '0.85rem', fontWeight: 700, letterSpacing: '0.5px' }}>[SN]</span>
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
                  fontFamily: 'inherit', color: '#000000',
                  background: 'transparent', fontWeight: 500, width: '100%',
                }}
              />
              <span style={{ fontSize: '0.72rem', color: '#666666' }}>e.g. SN1234567890</span>
            </div>
          </div>

          {/* Verify Button */}
          <button
            id="admin-verify-btn"
            onClick={handleVerify}
            disabled={loading}
            style={{
              display: 'flex', alignItems: 'center', gap: '10px',
              background: 'var(--red)', color: 'var(--white)',
              fontSize: '1rem', fontWeight: 700, padding: '0 36px',
              borderRadius: '10px', minHeight: '72px', whiteSpace: 'nowrap',
              border: 'none', cursor: loading ? 'not-allowed' : 'pointer',
              transition: 'background 0.2s',
              letterSpacing: '0.2px',
              opacity: loading ? 0.7 : 1,
            }}
            onMouseEnter={e => { if(!loading) { e.currentTarget.style.background = '#ffffff'; e.currentTarget.style.color = 'var(--red)'; } }}
            onMouseLeave={e => { if(!loading) { e.currentTarget.style.background = 'var(--red)'; e.currentTarget.style.color = 'var(--white)'; } }}
          >
            {loading ? 'Verifying...' : 'Verify Warranty'}
            {!loading && (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <path d="M5 12h14M13 6l6 6-6 6" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            )}
          </button>
        </div>

        {error && <p style={{ color: 'var(--red)', fontSize: '0.9rem', marginTop: '14px', fontWeight: 600 }}>{error}</p>}
      </div>

      {/* Add New Product Card */}
      <div style={{
        background: '#ffffff',
        borderRadius: '14px',
        padding: '24px',
        border: '1px solid #e8e8e8',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '20px',
        marginBottom: '24px',
      }}>
        <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
          <div style={{
            width: '52px', height: '52px', borderRadius: '50%',
            background: 'var(--red)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
          }}>
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none">
              <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <polyline points="3.27 6.96 12 12.01 20.73 6.96" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <line x1="12" y1="22.08" x2="12" y2="12" stroke="#ffffff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
          <div>
            <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: '#000000', margin: '0 0 8px 0' }}>
              Add New Product
            </h3>
            <p style={{ fontSize: '0.9rem', color: '#666666', margin: 0 }}>
              Add a new product to the system by entering product details and serial information.
            </p>
          </div>
        </div>

        <Link
          id="add-new-product-btn"
          href="/add-product"
          style={{
            display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px',
            background: 'var(--red)', color: '#ffffff',
            fontSize: '1rem', fontWeight: 700, padding: '16px 28px',
            borderRadius: '10px', textDecoration: 'none',
            transition: 'background 0.2s',
          }}
          onMouseEnter={e => { e.currentTarget.style.background = '#ffffff'; e.currentTarget.style.color = 'var(--red)'; }}
          onMouseLeave={e => { e.currentTarget.style.background = 'var(--red)'; e.currentTarget.style.color = '#ffffff'; }}
        >
          Add New Product
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <path d="M5 12h14M13 6l6 6-6 6" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </Link>
      </div>

      {/* Admin Repair Notifications & Live Alerts Section */}
      <div style={{
        background: '#0a0a0a',
        border: '1.5px solid #e8001d',
        borderRadius: '0px', // sharp borders boAt style
        padding: '28px',
        boxShadow: '0 16px 40px rgba(0,0,0,0.8), 0 0 20px rgba(232,0,29,0.25)',
        position: 'relative',
        overflow: 'hidden',
        clipPath: 'polygon(16px 0, 100% 0, 100% calc(100% - 16px), calc(100% - 16px) 100%, 0 100%, 0 16px)',
      }}>
        {/* Header bar */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderBottom: '1px solid #222222',
          paddingBottom: '18px',
          marginBottom: '20px',
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{
              background: '#e8001d',
              color: '#ffffff',
              padding: '4px 10px',
              fontSize: '0.72rem',
              fontWeight: 900,
              letterSpacing: '1.5px',
              textTransform: 'uppercase',
            }}>
              [ADMIN NOTIFICATIONS]
            </div>
            <h2 style={{ color: '#ffffff', fontSize: '1.35rem', fontWeight: 900, margin: 0 }}>
              Recent Repair Requests &amp; Live Alerts
            </h2>
          </div>
          <span style={{ color: '#888888', fontSize: '0.8rem', fontWeight: 600 }}>
            Color Coded Context: <span style={{ color: '#10b981' }}>Green (Success)</span> • <span style={{ color: '#f59e0b' }}>Yellow (Warning)</span> • <span style={{ color: '#ef4444' }}>Red (Error)</span> • <span style={{ color: '#3b82f6' }}>Blue (Process)</span>
          </span>
        </div>

        {loadingNotifs ? (
          <p style={{ color: '#888', fontSize: '0.9rem', textAlign: 'center', padding: '20px' }}>Loading repair notifications...</p>
        ) : notifications.length === 0 ? (
          <p style={{ color: '#888', fontSize: '0.9rem', textAlign: 'center', padding: '20px' }}>No repair request notifications recorded yet.</p>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {notifications.slice(0, 5).map((notif) => {
              const ctxColor = CONTEXT_COLORS[notif.context] || '#3b82f6';
              return (
                <div
                  key={notif.id}
                  style={{
                    background: '#121212',
                    border: `1.5px solid ${ctxColor}55`,
                    borderLeft: `5px solid ${ctxColor}`,
                    padding: '16px 20px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '16px',
                    borderRadius: '0px', // Sharp
                    boxShadow: `0 4px 16px rgba(0,0,0,0.6), 0 0 10px ${ctxColor}22`,
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px', flex: 1 }}>
                    <div style={{
                      width: '36px', height: '36px',
                      background: `${ctxColor}18`,
                      border: `1px solid ${ctxColor}66`,
                      display: 'flex', alignItems: 'center', justifyContent: 'center',
                      color: ctxColor, fontWeight: 900, fontSize: '0.85rem', flexShrink: 0,
                    }}>
                      !
                    </div>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '4px' }}>
                        <span style={{ color: '#ffffff', fontWeight: 800, fontSize: '0.95rem' }}>
                          {notif.title}
                        </span>
                        <span style={{
                          color: ctxColor,
                          background: `${ctxColor}22`,
                          border: `1px solid ${ctxColor}66`,
                          fontSize: '0.68rem',
                          fontWeight: 900,
                          padding: '2px 8px',
                          textTransform: 'uppercase',
                        }}>
                          [{notif.status}]
                        </span>
                        <span style={{ color: '#666666', fontSize: '0.75rem' }}>
                          {new Date(notif.createdAt).toLocaleString()}
                        </span>
                      </div>
                      <p style={{ color: '#cccccc', fontSize: '0.86rem', margin: 0, lineHeight: 1.4 }}>
                        {notif.message}
                      </p>
                    </div>
                  </div>

                  <Link
                    href={`/admin/repair-history?serial=${encodeURIComponent(notif.serialNumber)}`}
                    style={{
                      background: '#e8001d',
                      color: '#ffffff',
                      textDecoration: 'none',
                      fontSize: '0.82rem',
                      fontWeight: 800,
                      padding: '10px 18px',
                      whiteSpace: 'nowrap',
                      border: 'none',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '6px',
                      clipPath: 'polygon(6px 0, 100% 0, 100% calc(100% - 6px), calc(100% - 6px) 100%, 0 100%, 0 6px)',
                    }}
                  >
                    View Ticket →
                  </Link>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
