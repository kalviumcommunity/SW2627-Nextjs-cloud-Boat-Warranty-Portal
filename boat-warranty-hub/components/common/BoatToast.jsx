'use client';

import toast from 'react-hot-toast';

const CONTEXT_CONFIG = {
  success: {
    color: '#10b981',
    bg: '#0a0a0a',
    border: '#10b981',
    glow: 'rgba(16, 185, 129, 0.4)',
    badgeBg: 'rgba(16, 185, 129, 0.15)',
    label: 'SUCCESS',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="2.5" strokeLinecap="square">
        <polyline points="20 6 9 17 4 12" />
      </svg>
    ),
  },
  warning: {
    color: '#f59e0b',
    bg: '#0a0a0a',
    border: '#f59e0b',
    glow: 'rgba(245, 158, 11, 0.4)',
    badgeBg: 'rgba(245, 158, 11, 0.15)',
    label: 'WARNING',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#f59e0b" strokeWidth="2.5" strokeLinecap="square">
        <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
        <line x1="12" y1="9" x2="12" y2="13" />
        <line x1="12" y1="17" x2="12.01" y2="17" />
      </svg>
    ),
  },
  error: {
    color: '#ef4444',
    bg: '#0a0a0a',
    border: '#e8001d',
    glow: 'rgba(232, 0, 29, 0.5)',
    badgeBg: 'rgba(232, 0, 29, 0.18)',
    label: 'ERROR',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2.5" strokeLinecap="square">
        <circle cx="12" cy="12" r="10" />
        <line x1="15" y1="9" x2="9" y2="15" />
        <line x1="9" y1="9" x2="15" y2="15" />
      </svg>
    ),
  },
  process: {
    color: '#3b82f6',
    bg: '#0a0a0a',
    border: '#3b82f6',
    glow: 'rgba(59, 130, 246, 0.4)',
    badgeBg: 'rgba(59, 130, 246, 0.15)',
    label: 'PROCESSING',
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="2.5" strokeLinecap="square" className="spin-icon">
        <line x1="12" y1="2" x2="12" y2="6" />
        <line x1="12" y1="18" x2="12" y2="22" />
        <line x1="4.93" y1="4.93" x2="7.76" y2="7.76" />
        <line x1="16.24" y1="16.24" x2="19.07" y2="19.07" />
        <line x1="2" y1="12" x2="6" y2="12" />
        <line x1="18" y1="12" x2="22" y2="12" />
        <line x1="4.93" y1="19.07" x2="7.76" y2="16.24" />
        <line x1="16.24" y1="7.76" x2="19.07" y2="4.93" />
      </svg>
    ),
  },
};

export function BoatToastContent({ t, type = 'success', message, title }) {
  const config = CONTEXT_CONFIG[type] || CONTEXT_CONFIG.success;

  return (
    <div
      style={{
        position: 'relative',
        minWidth: '320px',
        maxWidth: '440px',
        background: '#0a0a0a',
        color: '#ffffff',
        border: `1.5px solid ${config.border}`,
        borderRadius: '0px', // Sharp borders
        boxShadow: `0 8px 32px rgba(0,0,0,0.8), 0 0 16px ${config.glow}`,
        padding: '0',
        fontFamily: 'Inter, system-ui, sans-serif',
        overflow: 'hidden',
        /* Edgy slanted side edges matching boAt electronics design */
        clipPath: 'polygon(14px 0, 100% 0, 100% calc(100% - 14px), calc(100% - 14px) 100%, 0 100%, 0 14px)',
        opacity: t.visible ? 1 : 0,
        transform: t.visible ? 'translateY(0) scale(1)' : 'translateY(-12px) scale(0.96)',
        transition: 'all 0.25s cubic-bezier(0.16, 1, 0.3, 1)',
        display: 'flex',
      }}
    >
      {/* CSS Animation for spinner */}
      <style>{`
        @keyframes boatToastSpin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .spin-icon {
          animation: boatToastSpin 1.2s linear infinite;
        }
      `}</style>

      {/* Left Slanted Context Bar */}
      <div
        style={{
          width: '6px',
          background: config.color,
          flexShrink: 0,
        }}
      />

      {/* Main Container */}
      <div style={{ flex: 1, padding: '14px 16px 14px 14px', position: 'relative' }}>
        {/* Top Header Row */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '6px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span
              style={{
                fontSize: '0.65rem',
                fontWeight: 900,
                color: config.color,
                background: config.badgeBg,
                border: `1px solid ${config.color}44`,
                padding: '2px 8px',
                letterSpacing: '1.2px',
                textTransform: 'uppercase',
                borderRadius: '0px',
              }}
            >
              [{title ? title.toUpperCase() : config.label}]
            </span>
            <span style={{ color: '#e8001d', fontSize: '0.68rem', fontWeight: 800, fontStyle: 'italic' }}>
              bo<span style={{ textTransform: 'uppercase', color: '#fff' }}>A</span>t
            </span>
          </div>

          {/* Close Button */}
          <button
            onClick={() => toast.dismiss(t.id)}
            style={{
              background: 'transparent',
              border: 'none',
              color: '#888888',
              cursor: 'pointer',
              padding: '2px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              lineHeight: 1,
              transition: 'color 0.15s',
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = '#e8001d')}
            onMouseLeave={(e) => (e.currentTarget.style.color = '#888888')}
          >
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>
        </div>

        {/* Content Body */}
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px' }}>
          <div style={{ marginTop: '2px', flexShrink: 0 }}>{config.icon}</div>
          <div style={{ flex: 1 }}>
            <p
              style={{
                margin: 0,
                fontSize: '0.85rem',
                fontWeight: 600,
                color: '#f3f4f6',
                lineHeight: 1.4,
                letterSpacing: '0.2px',
              }}
            >
              {message}
            </p>
          </div>
        </div>

        {/* Bottom Edgy Accent Line */}
        <div
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '2px',
            background: `linear-gradient(90deg, ${config.color} 0%, #e8001d 60%, transparent 100%)`,
          }}
        />
      </div>
    </div>
  );
}

// Global Custom Toast Helper Functions
export const showToast = {
  success: (message, title) => {
    return toast.custom((t) => <BoatToastContent t={t} type="success" message={message} title={title || 'SUCCESS'} />);
  },
  warning: (message, title) => {
    return toast.custom((t) => <BoatToastContent t={t} type="warning" message={message} title={title || 'WARNING'} />);
  },
  error: (message, title) => {
    return toast.custom((t) => <BoatToastContent t={t} type="error" message={message} title={title || 'ERROR'} />);
  },
  process: (message, title) => {
    return toast.custom((t) => <BoatToastContent t={t} type="process" message={message} title={title || 'IN PROCESS'} />);
  },
  // Alias for process/info
  info: (message, title) => {
    return toast.custom((t) => <BoatToastContent t={t} type="process" message={message} title={title || 'INFO'} />);
  },
};
