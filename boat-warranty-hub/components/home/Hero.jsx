import Image from 'next/image';

export default function Hero() {
  return (
    <section style={{
      position: 'relative',
      backgroundColor: '#000000',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-start',
      minHeight: 'clamp(420px, 50vw, 680px)',
      padding: 'clamp(32px, 4vw, 60px) clamp(28px, 5vw, 64px)',
      overflow: 'hidden',
      boxSizing: 'border-box',
    }}>
      {/* Right Side Slashed Image Container */}
      <div style={{
        position: 'absolute',
        right: 0, top: 0, bottom: 0,
        width: '75%',
        zIndex: 1,
      }}>
        {/* White slash border */}
        <div style={{
          position: 'absolute',
          left: 0, top: 0, bottom: 0, right: 0,
          background: '#ffffff',
          clipPath: 'polygon(15% 0%, 100% 0%, 100% 100%, 0% 100%)',
          transform: 'translateX(-4px)',
        }} />

        {/* The Panda Image */}
        <div style={{
          position: 'absolute',
          left: 0, top: 0, bottom: 0, right: 0,
          backgroundImage: 'url("/hero-banner.png")',
          backgroundSize: 'cover',
          backgroundPosition: 'center center',
          backgroundRepeat: 'no-repeat',
          clipPath: 'polygon(15% 0%, 100% 0%, 100% 100%, 0% 100%)',
        }} />
      </div>

      {/* Left — Content
          The right image panel occupies 75% of width and its clip starts at 15% of that panel,
          meaning the image actually starts at: 75% * 15% = ~11.25% from the right edge,
          i.e. the black area covers roughly the left 28–30% of the section width.
          We clamp maxWidth well inside that safe zone so content never bleeds into the image. */}
      <div style={{
        position: 'relative',
        zIndex: 5,
        width: '100%',
        maxWidth: 'clamp(260px, 28vw, 500px)',
        paddingTop: 'clamp(8px, 1.5vw, 20px)',
        flexShrink: 0,
        boxSizing: 'border-box',
      }}>

        <span style={{
          display: 'inline-block',
          color: 'var(--red)',
          fontSize: 'clamp(0.6rem, 0.7vw, 0.75rem)',
          fontWeight: 700,
          letterSpacing: '2px',
          textTransform: 'uppercase',
          marginBottom: 'clamp(6px, 0.8vw, 10px)',
        }}>
          WARRANTY LOOKUP
        </span>

        <h1 style={{
          fontSize: 'clamp(1.4rem, 2.8vw, 2.8rem)',
          fontWeight: 900,
          color: 'var(--white)',
          lineHeight: 1.15,
          marginBottom: 'clamp(10px, 1.2vw, 18px)',
          letterSpacing: '-0.5px',
          wordBreak: 'break-word',
        }}>
          Verify Your Warranty<br />
          Instantly<span style={{ color: 'var(--red)' }}>.</span>
        </h1>

        <p style={{
          color: '#aaaaaa',
          fontSize: 'clamp(0.72rem, 0.85vw, 0.9rem)',
          lineHeight: 1.6,
          marginBottom: 'clamp(20px, 2.5vw, 36px)',
          maxWidth: '100%',
        }}>
          Enter your product serial number to verify warranty status,{' '}
          view repair history and download your warranty certificate.
        </p>

        {/* Feature Badges */}
        <div style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 'clamp(10px, 1.2vw, 18px)',
        }}>
          {[
            {
              icon: (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path d="M12 2L4 6v6c0 5.55 3.84 10.74 8 12 4.16-1.26 8-6.45 8-12V6l-8-4z" stroke="var(--red)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M9 12l2 2 4-4" stroke="var(--red)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              ),
              title: '100% Genuine',
              sub: 'Authentic Products',
            },
            {
              icon: (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" stroke="var(--red)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              ),
              title: 'Instant Results',
              sub: 'Quick & Easy',
            },
            {
              icon: (
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                  <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" stroke="var(--red)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <polyline points="14,2 14,8 20,8" stroke="var(--red)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <line x1="9" y1="13" x2="15" y2="13" stroke="var(--red)" strokeWidth="2" strokeLinecap="round" />
                  <line x1="9" y1="17" x2="12" y2="17" stroke="var(--red)" strokeWidth="2" strokeLinecap="round" />
                </svg>
              ),
              title: 'Digital Certificate',
              sub: 'Download PDF',
            },
          ].map(({ icon, title, sub }) => (
            <div key={title} style={{ display: 'flex', alignItems: 'center', gap: 'clamp(6px, 0.8vw, 10px)' }}>
              <div style={{
                width: 'clamp(34px, 3.2vw, 44px)',
                height: 'clamp(34px, 3.2vw, 44px)',
                borderRadius: '50%',
                border: '1px solid rgba(232,0,29,0.5)',
                background: 'rgba(232,0,29,0.06)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexShrink: 0,
              }}>
                {icon}
              </div>
              <div>
                <div style={{
                  color: 'var(--white)',
                  fontSize: 'clamp(0.68rem, 0.78vw, 0.8rem)',
                  fontWeight: 700,
                }}>{title}</div>
                <div style={{
                  color: '#888',
                  fontSize: 'clamp(0.6rem, 0.68vw, 0.72rem)',
                  marginTop: '2px',
                }}>{sub}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
