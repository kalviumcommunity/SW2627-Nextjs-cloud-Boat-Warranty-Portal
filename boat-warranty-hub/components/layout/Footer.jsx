'use client';
import Link from 'next/link';

const trustItems = [
  {
    id: 'trust-secure',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <path d="M12 2L4 6v6c0 5.55 3.84 10.74 8 12 4.16-1.26 8-6.45 8-12V6l-8-4z" stroke="#E8001D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M9 12l2 2 4-4" stroke="#E8001D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    title: 'Secure & Reliable',
    desc: 'Your data is safe with us',
  },
  {
    id: 'trust-official',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <rect x="3" y="11" width="18" height="11" rx="2" stroke="#E8001D" strokeWidth="2"/>
        <path d="M7 11V7a5 5 0 0110 0v4" stroke="#E8001D" strokeWidth="2" strokeLinecap="round"/>
      </svg>
    ),
    title: 'Official Support',
    desc: 'Direct from boAt',
  },
  {
    id: 'trust-247',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="10" stroke="#E8001D" strokeWidth="2"/>
        <polyline points="12,6 12,12 16,14" stroke="#E8001D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    title: '24x7 Assistance',
    desc: "We're always here",
  },
  {
    id: 'trust-hassle',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
        <circle cx="12" cy="12" r="10" stroke="#E8001D" strokeWidth="2"/>
        <path d="M9 12l2 2 4-4" stroke="#E8001D" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    title: 'Hassle Free Process',
    desc: 'Simple and transparent',
  },
];

export default function Footer() {
  return (
    <footer style={{
      background: 'var(--black)',
      borderTop: '1px solid #222',
      padding: '40px 24px 30px',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '30px',
      width: '100%',
      boxSizing: 'border-box',
    }}>
      {/* Top Tier: Trust Badges */}
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '20px 0',
        width: '100%',
        maxWidth: '1200px',
      }}>
        {trustItems.map((item, idx) => (
          <div
            key={item.id}
            id={item.id}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '14px',
              flex: '1 1 230px',
              maxWidth: '280px',
              padding: '12px 24px',
              boxSizing: 'border-box',
              borderRight: idx < trustItems.length - 1 ? '1px solid #2a2a2a' : 'none',
            }}
          >
            <div style={{
              width: '44px',
              height: '44px',
              borderRadius: '50%',
              border: '1.5px solid rgba(232,0,29,0.4)',
              background: 'rgba(232,0,29,0.07)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              flexShrink: 0,
            }}>
              {item.icon}
            </div>
            <div>
              <div style={{ color: 'var(--white)', fontSize: '0.85rem', fontWeight: 700, marginBottom: '3px' }}>
                {item.title}
              </div>
              <div style={{ color: '#777', fontSize: '0.72rem', lineHeight: 1.3 }}>
                {item.desc}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Horizontal Divider Line */}
      <div style={{ width: '100%', maxWidth: '1200px', height: '1px', background: '#222' }} />

      {/* Bottom Tier: Links & Copyright */}
      <div style={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: '16px',
        width: '100%',
        maxWidth: '1200px',
        fontSize: '0.78rem',
        color: '#666',
        padding: '0 12px',
        boxSizing: 'border-box',
      }}>
        <div>
          © {new Date().getFullYear()} boAt Warranty Portal. Official Support Services.
        </div>
        
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          {[
            { label: 'About Us', href: '/about' },
            { label: 'FAQs', href: '/faq' },
            { label: 'Contact Support', href: '/contact' },
          ].map((link) => (
            <Link 
              key={link.label}
              href={link.href} 
              style={{
                color: '#888',
                textDecoration: 'none',
                transition: 'color 0.2s',
                fontWeight: 500,
              }}
              onMouseEnter={e => e.currentTarget.style.color = 'var(--red)'}
              onMouseLeave={e => e.currentTarget.style.color = '#888'}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}
