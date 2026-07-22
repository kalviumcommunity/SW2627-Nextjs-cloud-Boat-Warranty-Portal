'use client';

export default function GlobalLoading() {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      backgroundColor: '#080808',
      fontFamily: 'Inter, sans-serif',
      color: '#ffffff',
      padding: '24px',
      boxSizing: 'border-box'
    }}>
      <div style={{
        width: '56px',
        height: '56px',
        border: '4.5px solid rgba(232,0,29,0.15)',
        borderTop: '4.5px solid #E8001D',
        borderRadius: '50%',
        animation: 'spin 0.8s linear infinite',
        boxShadow: '0 0 15px rgba(232,0,29,0.1)'
      }} />
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
      <h2 style={{
        marginTop: '24px',
        color: '#ffffff',
        fontWeight: 800,
        fontSize: '1.25rem',
        letterSpacing: '0.5px'
      }}>
        Loading boAt Portal...
      </h2>
      <p style={{
        color: '#888888',
        fontSize: '0.85rem',
        marginTop: '8px',
        textAlign: 'center',
        maxWidth: '300px',
        lineHeight: '1.4'
      }}>
        Preparing your secure dashboard and verifying authenticity.
      </p>
    </div>
  );
}
