'use client';

const steps = [
  {
    number: '01',
    title: 'Enter Serial Number',
    desc: 'Locate the 10-digit serial number on your boAt product box or earbud case label and enter it above.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <rect x="3" y="4" width="18" height="16" rx="2" stroke="#E31E24" strokeWidth="2" />
        <line x1="7" y1="8" x2="17" y2="8" stroke="#E31E24" strokeWidth="2" strokeLinecap="round" />
        <line x1="7" y1="12" x2="13" y2="12" stroke="#E31E24" strokeWidth="2" strokeLinecap="round" />
        <line x1="7" y1="16" x2="10" y2="16" stroke="#E31E24" strokeWidth="2" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    number: '02',
    title: 'Instant Verification',
    desc: 'Our portal checks warranty active period, product model specs, and generates your digital certificate.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" stroke="#E31E24" strokeWidth="2" />
        <path d="M9 12l2 2 4-4" stroke="#E31E24" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
  },
  {
    number: '03',
    title: 'Doorstep Pickup / Swap',
    desc: 'Raise a claim in 1 click for free courier pick & drop or visit your nearest authorized boAt service center.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <rect x="1" y="3" width="15" height="13" rx="2" stroke="#E31E24" strokeWidth="2" />
        <polygon points="16,8 20,8 23,11 23,16 16,16" stroke="#E31E24" strokeWidth="2" />
        <circle cx="5.5" cy="18.5" r="2.5" stroke="#E31E24" strokeWidth="2" />
        <circle cx="18.5" cy="18.5" r="2.5" stroke="#E31E24" strokeWidth="2" />
      </svg>
    ),
  },
];

export default function ProcessTimeline() {
  return (
    <section
      style={{
        background: '#ffffff',
        padding: '80px 48px',
        position: 'relative',
      }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Section Header */}
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <span
            style={{
              color: '#E31E24',
              fontSize: '0.75rem',
              fontWeight: 800,
              letterSpacing: '3px',
              textTransform: 'uppercase',
              display: 'inline-block',
              marginBottom: '10px',
            }}
          >
            HOW IT WORKS
          </span>
          <h2
            style={{
              color: '#0d0d0d',
              fontSize: 'clamp(1.8rem, 3.2vw, 2.6rem)',
              fontWeight: 900,
              letterSpacing: '-1px',
              margin: '0 0 14px 0',
              fontFamily: "'Inter', sans-serif",
            }}
          >
            3 Simple Steps to Claim Your Warranty
          </h2>
          <p
            style={{
              color: '#666666',
              fontSize: '0.92rem',
              maxWidth: '560px',
              margin: '0 auto',
              lineHeight: 1.6,
            }}
          >
            Fast, digital, and completely transparent warranty validation designed for all boAt heads.
          </p>
        </div>

        {/* Steps Grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '32px',
            position: 'relative',
          }}
        >
          {steps.map((step, _index) => (
            <div
              key={step.number}
              style={{
                background: '#f8f9fa',
                borderRadius: '16px',
                padding: '36px 30px',
                border: '1px solid #eaeaea',
                position: 'relative',
                transition: 'transform 0.2s ease, box-shadow 0.2s ease, border-color 0.2s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.borderColor = '#E31E24';
                e.currentTarget.style.boxShadow = '0 12px 30px rgba(0,0,0,0.06)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.borderColor = '#eaeaea';
                e.currentTarget.style.boxShadow = 'none';
              }}
            >
              {/* Number Badge */}
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  marginBottom: '24px',
                }}
              >
                <div
                  style={{
                    width: '50px',
                    height: '50px',
                    borderRadius: '12px',
                    background: 'rgba(227, 30, 36, 0.08)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  {step.icon}
                </div>
                <span
                  style={{
                    fontSize: '2.5rem',
                    fontWeight: 900,
                    color: 'rgba(227, 30, 36, 0.15)',
                    fontFamily: "'Inter', sans-serif",
                    lineHeight: 1,
                  }}
                >
                  {step.number}
                </span>
              </div>

              {/* Text */}
              <h3
                style={{
                  fontSize: '1.2rem',
                  fontWeight: 800,
                  color: '#111111',
                  margin: '0 0 10px 0',
                }}
              >
                {step.title}
              </h3>
              <p
                style={{
                  fontSize: '0.86rem',
                  color: '#666666',
                  lineHeight: 1.6,
                  margin: 0,
                }}
              >
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
