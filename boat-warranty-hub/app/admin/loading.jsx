export default function AdminLoading() {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      minHeight: '100vh',
      backgroundColor: '#f5f5f5',
      fontFamily: 'Inter, sans-serif'
    }}>
      <div style={{
        width: '50px',
        height: '50px',
        border: '4px solid rgba(232,0,29,0.2)',
        borderTop: '4px solid #E8001D',
        borderRadius: '50%',
        animation: 'spin 1s linear infinite'
      }} />
      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
      <h2 style={{
        marginTop: '20px',
        color: '#000000',
        fontWeight: 600,
        letterSpacing: '0.5px'
      }}>
        Loading Admin Portal...
      </h2>
      <p style={{
        color: '#666666',
        fontSize: '0.9rem',
        marginTop: '8px'
      }}>
        Fetching secure data securely.
      </p>
    </div>
  );
}
