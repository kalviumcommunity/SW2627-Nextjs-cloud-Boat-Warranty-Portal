import Image from 'next/image';

export default function AdminHero() {
  return (
    <section style={{
      position: 'relative',
      background: '#111111',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      minHeight: '320px',
      padding: '48px 64px 80px',
      overflow: 'hidden',
    }}>
      {/* Red Geometric Chevron */}
      <div style={{
        position: 'absolute', right: 0, top: 0, bottom: 0,
        width: '55%', pointerEvents: 'none', zIndex: 1,
      }}>
        <div style={{
          position: 'absolute', right: '-40px', top: '-30px',
          width: '100%', height: '130%',
          background: 'var(--red)',
          clipPath: 'polygon(28% 0%, 100% 0%, 100% 100%, 18% 100%, 0% 50%)',
          opacity: 0.92,
        }} />
        <div style={{
          position: 'absolute', right: 0, top: 0,
          width: '100%', height: '100%',
          background: 'linear-gradient(135deg, rgba(0,0,0,0.5) 0%, transparent 60%)',
          clipPath: 'polygon(28% 0%, 100% 0%, 100% 100%, 18% 100%, 0% 50%)',
          zIndex: 2,
        }} />
      </div>

      {/* Left Content */}
      <div style={{ position: 'relative', zIndex: 5, maxWidth: '500px' }}>
        <span style={{
          display: 'inline-block', color: 'var(--red)',
          fontSize: '0.72rem', fontWeight: 700,
          letterSpacing: '2px', textTransform: 'uppercase', marginBottom: '14px',
        }}>
          WARRANTY LOOKUP
        </span>
        <h1 style={{
          fontSize: 'clamp(2rem, 3.2vw, 2.8rem)',
          fontWeight: 900, color: 'var(--white)',
          lineHeight: 1.15, marginBottom: '18px', letterSpacing: '-0.5px',
        }}>
          Verify Your Warranty.<br />
          Instantly<span style={{ color: 'var(--red)' }}>.</span>
        </h1>
        <p style={{
          color: '#aaaaaa', fontSize: '0.875rem',
          lineHeight: 1.6, marginBottom: '32px', maxWidth: '420px',
        }}>
          Enter your product serial number to verify warranty status,<br />
          view repair history and download your warranty certificate.
        </p>
        <div style={{ display: 'flex', gap: '28px', flexWrap: 'wrap' }}>
          {[
            {
              icon: (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path d="M12 2L4 6v6c0 5.55 3.84 10.74 8 12 4.16-1.26 8-6.45 8-12V6l-8-4z" stroke="#E8001D" strokeWidth="2" strokeLinecap="round"/>
                  <path d="M9 12l2 2 4-4" stroke="#E8001D" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              ),
              title: '100% Genuine', sub: 'Authentic Products',
            },
            {
              icon: (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" stroke="#E8001D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              ),
              title: 'Instant Results', sub: 'Quick & Easy',
            },
            {
              icon: (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" stroke="#E8001D" strokeWidth="2" strokeLinecap="round"/>
                  <polyline points="14,2 14,8 20,8" stroke="#E8001D" strokeWidth="2" strokeLinecap="round"/>
                  <line x1="9" y1="13" x2="15" y2="13" stroke="#E8001D" strokeWidth="2" strokeLinecap="round"/>
                  <line x1="9" y1="17" x2="12" y2="17" stroke="#E8001D" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              ),
              title: 'Digital Certificate', sub: 'Download PDF',
            },
          ].map(({ icon, title, sub }) => (
            <div key={title} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{
                width: '38px', height: '38px', borderRadius: '50%',
                border: '1.5px solid rgba(232,0,29,0.5)',
                background: 'rgba(232,0,29,0.06)',
                display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
              }}>{icon}</div>
              <div>
                <div style={{ color: 'var(--white)', fontSize: '0.82rem', fontWeight: 700 }}>{title}</div>
                <div style={{ color: '#888', fontSize: '0.72rem', marginTop: '2px' }}>{sub}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right Product Image */}
      <div style={{ position: 'relative', zIndex: 5, flexShrink: 0 }}>
        <Image
          src="/boat_headphones.png"
          alt="boAt headphones product"
          width={460}
          height={360}
          priority
          style={{
            width: '420px', height: 'auto', objectFit: 'contain',
            filter: 'drop-shadow(0 20px 60px rgba(0,0,0,0.7))',
            transform: 'translateX(20px)',
          }}
        />
      </div>
    </section>
  );
}
