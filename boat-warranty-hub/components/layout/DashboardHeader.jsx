export default function AdminHero() {
  return (
    <section style={{
      position: 'relative',
      backgroundColor: '#ffffff',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-start',
      minHeight: 'clamp(300px, 38vw, 480px)',
      padding: 'clamp(32px, 4vw, 60px) clamp(24px, 5vw, 64px) clamp(40px, 5.5vw, 80px)',
      overflow: 'hidden',
      boxSizing: 'border-box',
    }}>
      {/* Right Side Slashed Image Container */}
      <div style={{
        position: 'absolute', right: 0, top: 0, bottom: 0,
        width: '60%', zIndex: 1,
      }}>
        {/* Black slash border */}
        <div style={{
          position: 'absolute', left: 0, top: 0, bottom: 0, right: 0,
          background: '#000000',
          clipPath: 'polygon(15% 0%, 100% 0%, 100% 100%, 0% 100%)',
          transform: 'translateX(-4px)',
        }} />
        {/* The Hero Image */}
        <div style={{
          position: 'absolute', left: 0, top: 0, bottom: 0, right: 0,
          backgroundImage: 'url("/hero-banner-2.png")',
          backgroundSize: 'cover', backgroundPosition: 'center center', backgroundRepeat: 'no-repeat',
          clipPath: 'polygon(15% 0%, 100% 0%, 100% 100%, 0% 100%)',
        }} />
      </div>

      {/* Left Content
          Right image panel is 60% wide; its clip starts at 15% of the panel,
          so the image occupies ~60% – (60%×15%) = ~51% from the right,
          leaving ~49% of white on the left. We constrain to ~40vw max to stay well clear. */}
      <div style={{
        position: 'relative',
        zIndex: 5,
        width: '100%',
        maxWidth: 'clamp(260px, 38vw, 620px)',
        paddingRight: 'clamp(12px, 2vw, 24px)',
        flexShrink: 0,
        boxSizing: 'border-box',
      }}>
        <span style={{
          display: 'inline-block',
          color: 'var(--red)',
          fontSize: 'clamp(0.6rem, 0.68vw, 0.72rem)',
          fontWeight: 700,
          letterSpacing: '2px',
          textTransform: 'uppercase',
          marginBottom: 'clamp(8px, 1vw, 14px)',
        }}>
          ADMINISTRATOR PANEL
        </span>

        <h1 style={{
          fontSize: 'clamp(1.4rem, 2.8vw, 2.8rem)',
          fontWeight: 900,
          color: '#000000',
          lineHeight: 1.15,
          marginBottom: 'clamp(10px, 1.2vw, 18px)',
          letterSpacing: '-0.5px',
          wordBreak: 'break-word',
        }}>
          Manage Portal<br />
          Overview<span style={{ color: 'var(--red)' }}>.</span>
        </h1>

        <p style={{
          color: '#444444',
          fontSize: 'clamp(0.72rem, 0.82vw, 0.875rem)',
          lineHeight: 1.6,
          marginBottom: 'clamp(16px, 2vw, 28px)',
          maxWidth: '100%',
        }}>
          Monitor products, manage warranty claims, and oversee repairs efficiently from a central dashboard.
        </p>

        {/* Feature Badges — 2-column grid that scales with viewport */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, minmax(0, 1fr))',
          gap: 'clamp(8px, 1vw, 14px) clamp(10px, 1.2vw, 18px)',
          width: '100%',
        }}>
          {[
            {
              icon: (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path d="M12 2L4 6v6c0 5.55 3.84 10.74 8 12 4.16-1.26 8-6.45 8-12V6l-8-4z" stroke="#E8001D" strokeWidth="2" strokeLinecap="round"/>
                  <path d="M9 12l2 2 4-4" stroke="#E8001D" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              ),
              title: '100% Genuine', sub: 'Authentic Products',
            },
            {
              icon: (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" stroke="#E8001D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              ),
              title: 'Instant Results', sub: 'Quick & Easy',
            },
            {
              icon: (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" stroke="#E8001D" strokeWidth="2" strokeLinecap="round"/>
                  <polyline points="14,2 14,8 20,8" stroke="#E8001D" strokeWidth="2" strokeLinecap="round"/>
                  <line x1="9" y1="13" x2="15" y2="13" stroke="#E8001D" strokeWidth="2" strokeLinecap="round"/>
                  <line x1="9" y1="17" x2="12" y2="17" stroke="#E8001D" strokeWidth="2" strokeLinecap="round"/>
                </svg>
              ),
              title: 'Digital Certificate', sub: 'Download PDF',
            },
            {
              icon: (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" stroke="#E8001D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <polyline points="14 2 14 8 20 8" stroke="#E8001D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M12 18v-6M9.5 14.5L12 12l2.5 2.5" stroke="#E8001D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              ),
              title: 'Upload Warranty', sub: 'PDF Document',
            },
          ].map(({ icon, title, sub }) => (
            <div key={title} style={{ display: 'flex', alignItems: 'center', gap: 'clamp(6px, 0.7vw, 10px)', minWidth: 0 }}>
              <div style={{
                width: 'clamp(30px, 2.8vw, 40px)',
                height: 'clamp(30px, 2.8vw, 40px)',
                borderRadius: '50%',
                border: '1.5px solid rgba(232,0,29,0.5)',
                background: 'rgba(232,0,29,0.06)',
                display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
              }}>{icon}</div>
              <div style={{ minWidth: 0 }}>
                <div style={{
                  color: '#000000',
                  fontSize: 'clamp(0.68rem, 0.76vw, 0.82rem)',
                  fontWeight: 700,
                  lineHeight: 1.25,
                  whiteSpace: 'nowrap',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis',
                }}>{title}</div>
                <div style={{
                  color: '#666666',
                  fontSize: 'clamp(0.6rem, 0.66vw, 0.72rem)',
                  marginTop: '3px',
                  lineHeight: 1.25,
                }}>{sub}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Removed old Right Product Image as it's replaced by the background banner */}
    </section>
  );
}
