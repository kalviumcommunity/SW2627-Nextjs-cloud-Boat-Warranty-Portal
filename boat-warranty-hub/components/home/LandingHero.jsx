import Image from 'next/image';

export default function LandingHero() {
  return (
    <section
      style={{
        position: 'relative',
        width: '100%',
        minHeight: '85vh',
        background: '#0d0d0d',
        overflow: 'hidden',
        fontFamily: "'Inter', sans-serif",
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingTop: '76px', /* navbar offset */
        boxSizing: 'border-box',
      }}
    >
      {/* ─────────────────────────────────────────────────────────
          BACKGROUND LAYER & ANIMATIONS
      ───────────────────────────────────────────────────────── */}
      <style>{`
        @keyframes subtleZoom {
          0% { transform: scale(1); }
          50% { transform: scale(1.05); }
          100% { transform: scale(1); }
        }
        @keyframes floatUp {
          0% { transform: translateY(0) scale(1); opacity: 0; }
          10% { opacity: 1; }
          90% { opacity: 1; }
          100% { transform: translateY(-300px) scale(0.5); opacity: 0; }
        }
        .spark {
          position: absolute;
          background: radial-gradient(circle, #ffea00 0%, #ff3300 50%, transparent 100%);
          border-radius: 50%;
          opacity: 0;
          pointer-events: none;
          z-index: 1;
          filter: drop-shadow(0 0 6px #ff1a00) blur(0.5px);
        }
      `}</style>
      
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: 0,
          animation: 'subtleZoom 20s infinite ease-in-out',
        }}
      >
        <Image
          src="/fiery-bg.png"
          alt=""
          fill
          priority
          style={{ objectFit: 'cover', objectPosition: 'center' }}
        />
      </div>

      {/* Floating Sparks */}
      <div className="spark" style={{ width: '8px', height: '8px', bottom: '-5%', left: '10%', animation: 'floatUp 4.2s infinite linear 0s' }} />
      <div className="spark" style={{ width: '5px', height: '5px', bottom: '-10%', left: '25%', animation: 'floatUp 5.1s infinite linear 1.2s' }} />
      <div className="spark" style={{ width: '12px', height: '12px', bottom: '0%', left: '40%', animation: 'floatUp 3.5s infinite linear 0.5s' }} />
      <div className="spark" style={{ width: '6px', height: '6px', bottom: '-15%', left: '55%', animation: 'floatUp 6s infinite linear 2.1s' }} />
      <div className="spark" style={{ width: '9px', height: '9px', bottom: '5%', left: '70%', animation: 'floatUp 4.8s infinite linear 0.8s' }} />
      <div className="spark" style={{ width: '4px', height: '4px', bottom: '-5%', left: '85%', animation: 'floatUp 5.5s infinite linear 1.5s' }} />
      
      <div className="spark" style={{ width: '10px', height: '10px', bottom: '-20%', left: '15%', animation: 'floatUp 4.5s infinite linear 3s' }} />
      <div className="spark" style={{ width: '7px', height: '7px', bottom: '-5%', left: '35%', animation: 'floatUp 5s infinite linear 2.5s' }} />
      <div className="spark" style={{ width: '5px', height: '5px', bottom: '2%', left: '50%', animation: 'floatUp 6.2s infinite linear 0.3s' }} />
      <div className="spark" style={{ width: '11px', height: '11px', bottom: '-10%', left: '65%', animation: 'floatUp 3.8s infinite linear 1.8s' }} />
      <div className="spark" style={{ width: '6px', height: '6px', bottom: '-15%', left: '80%', animation: 'floatUp 5.3s infinite linear 2.9s' }} />
      <div className="spark" style={{ width: '8px', height: '8px', bottom: '5%', left: '92%', animation: 'floatUp 4.1s infinite linear 0.7s' }} />

      <div className="spark" style={{ width: '4px', height: '4px', bottom: '10%', left: '8%', animation: 'floatUp 5.8s infinite linear 1.1s' }} />
      <div className="spark" style={{ width: '9px', height: '9px', bottom: '-5%', left: '28%', animation: 'floatUp 4.4s infinite linear 3.2s' }} />
      <div className="spark" style={{ width: '6px', height: '6px', bottom: '-12%', left: '45%', animation: 'floatUp 5.6s infinite linear 0.9s' }} />
      <div className="spark" style={{ width: '10px', height: '10px', bottom: '0%', left: '60%', animation: 'floatUp 3.9s infinite linear 2.4s' }} />
      <div className="spark" style={{ width: '5px', height: '5px', bottom: '-8%', left: '75%', animation: 'floatUp 6.5s infinite linear 1.6s' }} />
      <div className="spark" style={{ width: '7px', height: '7px', bottom: '-18%', left: '88%', animation: 'floatUp 4.7s infinite linear 3.5s' }} />

      {/* Main Content Area */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          alignItems: 'center',
          justifyContent: 'center',
          width: '100%',
          maxWidth: '1280px',
          padding: '40px 20px',
          flex: 1,
          gap: '40px',
          zIndex: 4,
        }}
      >
        {/* Left Column: Text */}
        <div
          style={{
            flex: '1 1 500px',
            textAlign: 'left',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            boxSizing: 'border-box',
          }}
        >
          <h1
            style={{
              margin: 0,
              fontSize: 'clamp(2.5rem, 5vw, 4.8rem)',
              fontWeight: 900,
              letterSpacing: '-1.5px',
              lineHeight: 1.1,
              color: '#ffffff',
            }}
          >
            I am a{' '}
            <span>
              bo<span style={{ color: '#E31E24' }}>A</span>t
            </span>
            head.
          </h1>

          <p
            style={{
              marginTop: '18px',
              fontSize: 'clamp(0.85rem, 1vw, 1rem)',
              fontWeight: 800,
              letterSpacing: '3px',
              textTransform: 'uppercase',
              color: '#e5e5e5',
            }}
          >
            WELCOME TO THE boAt WARRANTY HUB
          </p>

          <div
            style={{
              marginTop: '16px',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '12px',
              flexWrap: 'wrap',
            }}
          >
            <div style={{ width: '28px', height: '1.5px', background: '#E31E24', flexShrink: 0 }} />
            <p
              style={{
                margin: 0,
                fontSize: 'clamp(0.85rem, 1vw, 1rem)',
                fontWeight: 600,
                color: '#d4d4d4',
                letterSpacing: '0.2px',
              }}
            >
              Your product. Our promise. Always covered.
            </p>
            <div style={{ width: '28px', height: '1.5px', background: '#E31E24', flexShrink: 0 }} />
          </div>
        </div>

        {/* Right Column: Image */}
        <div
          style={{
            flex: '1 1 400px',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'relative',
          }}
        >
          <Image
            src="/boat-lion-transparent.png"
            alt="boAt mascot"
            width={780}
            height={580}
            priority
            style={{
              width: '100%',
              height: 'auto',
              maxHeight: '600px',
              objectFit: 'contain',
              filter: 'drop-shadow(0 30px 60px rgba(0,0,0,0.4))',
            }}
          />
        </div>
      </div>

      {/* ─────────────────────────────────────────────────────────
          Bottom Feature Highlights Bar
      ───────────────────────────────────────────────────────── */}
      <div
        style={{
          position: 'relative',
          zIndex: 5,
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          padding: '24px 0',
          background: 'linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 100%)',
          borderTop: '1px solid rgba(255,255,255,0.05)',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-around',
            width: '100%',
            maxWidth: '1200px',
            padding: '0 20px',
            flexWrap: 'wrap',
            gap: '16px',
          }}
        >
          {[
            {
              icon: (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="#E31E24" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              ),
              title: 'Secure & Reliable',
              desc: 'Encrypted database validation.',
            },
            {
              icon: (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M3 18v-6a9 9 0 0118 0v6" stroke="#E31E24" strokeWidth="1.8" strokeLinecap="round" />
                  <path d="M21 19a2 2 0 01-2 2h-1a2 2 0 01-2-2v-3a2 2 0 012-2h3zM3 19a2 2 0 002 2h1a2 2 0 002-2v-3a2 2 0 00-2-2H3z" stroke="#E31E24" strokeWidth="1.8" strokeLinecap="round" />
                </svg>
              ),
              title: '24/7 Priority Support',
              desc: 'Dedicated assistance anytime.',
            },
            {
              icon: (
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <circle cx="12" cy="12" r="10" stroke="#E31E24" strokeWidth="1.8" />
                  <path d="M9 12l2 2 4-4" stroke="#E31E24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              ),
              title: 'Hassle-Free Replacement',
              desc: 'Doorstep pick & drop service.',
            },
          ].map(({ icon, title, desc }, i, arr) => (
            <div
              key={title}
              style={{
                flex: '1 1 250px',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '12px 20px',
                boxSizing: 'border-box',
                borderRight: i < arr.length - 1 ? '1px solid rgba(255,255,255,0.08)' : 'none',
              }}
            >
              <div style={{ flexShrink: 0 }}>{icon}</div>
              <div>
                <div style={{ fontSize: '0.9rem', fontWeight: 800, color: '#ffffff', letterSpacing: '-0.2px', marginBottom: '2px' }}>
                  {title}
                </div>
                <div style={{ fontSize: '0.75rem', color: '#a3a3a3', letterSpacing: '0.1px' }}>
                  {desc}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
