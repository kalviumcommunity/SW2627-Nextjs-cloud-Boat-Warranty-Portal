'use client';

import { useSession } from 'next-auth/react';
import Link from 'next/link';
import Navbar from '@/components/layout/Navbar';
import UserNavbar from '@/components/layout/UserNavbar';
import Footer from '@/components/layout/Footer';

export default function AboutPage() {
  const { status } = useSession();
  const isAuthenticated = status === 'authenticated';

  return (
    <div style={{ background: '#080808', color: '#ffffff', minHeight: '100vh', display: 'flex', flexDirection: 'column', fontFamily: 'Inter, sans-serif' }}>
      {/* Dynamic Navbar */}
      {isAuthenticated ? <UserNavbar /> : <Navbar />}

      {/* Hero Section */}
      <section style={{
        position: 'relative',
        padding: '100px 24px 80px',
        textAlign: 'center',
        background: 'radial-gradient(circle at top, rgba(232,0,29,0.12) 0%, rgba(8,8,8,0) 70%)',
        borderBottom: '1px solid #1a1a1a',
      }}>
        <span style={{
          color: 'var(--red)',
          fontSize: '0.8rem',
          fontWeight: 700,
          letterSpacing: '3px',
          textTransform: 'uppercase',
          display: 'block',
          marginBottom: '16px'
        }}>
          ABOUT BOAT WARRANTY
        </span>
        <h1 style={{
          fontSize: 'clamp(2.2rem, 5vw, 3.8rem)',
          fontWeight: 900,
          lineHeight: 1.1,
          letterSpacing: '-1px',
          marginBottom: '24px',
          background: 'linear-gradient(180deg, #ffffff 0%, #bbbbbb 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
        }}>
          Empowering Your Sound Journey<span style={{ color: 'var(--red)', WebkitTextFillColor: 'initial' }}>.</span>
        </h1>
        <p style={{
          color: '#aaaaaa',
          fontSize: 'clamp(0.95rem, 1.2vw, 1.15rem)',
          lineHeight: 1.6,
          maxWidth: '650px',
          margin: '0 auto 40px',
        }}>
          At boAt, we believe every beat matters. Our digital warranty portal is designed to provide immediate, transparent, and seamless post-purchase service for your authentic boAt gear.
        </p>

        {/* Stats Row */}
        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          justifyContent: 'center',
          gap: '24px',
          maxWidth: '1000px',
          margin: '0 auto',
        }}>
          {[
            { value: '1M+', label: 'Warranties Verified' },
            { value: '98%', label: 'Satisfaction Rate' },
            { value: '350+', label: 'Support Centers' },
            { value: '24 hrs', label: 'Average Turnaround' }
          ].map((stat, idx) => (
            <div key={idx} style={{
              flex: '1 1 200px',
              background: 'rgba(255,255,255,0.02)',
              border: '1px solid rgba(255,255,255,0.05)',
              borderRadius: '12px',
              padding: '24px 16px',
            }}>
              <div style={{ fontSize: '2rem', fontWeight: 900, color: 'var(--red)', marginBottom: '8px' }}>{stat.value}</div>
              <div style={{ fontSize: '0.8rem', fontWeight: 600, color: '#888', textTransform: 'uppercase', letterSpacing: '1px' }}>{stat.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Core Values Section */}
      <section style={{
        padding: '80px 24px',
        maxWidth: '1200px',
        margin: '0 auto',
        width: '100%',
        boxSizing: 'border-box',
      }}>
        <h2 style={{
          fontSize: '2rem',
          fontWeight: 800,
          textAlign: 'center',
          marginBottom: '50px',
        }}>
          Our Commitment to boAtheads
        </h2>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '30px',
        }}>
          {[
            {
              title: '100% Genuine Service',
              desc: 'Every warranty repair or replacement is handled using authentic boat original spares. No compromises on sound, comfort, or build quality.',
              icon: (
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--red)" strokeWidth="2">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/>
                </svg>
              )
            },
            {
              title: 'Hassle-Free Digital Claims',
              desc: 'Forget tedious call center loops and lost paper bills. Register claims online, generate digital certificate receipts, and monitor progress instantly.',
              icon: (
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--red)" strokeWidth="2">
                  <rect x="2" y="3" width="20" height="14" rx="2" ry="2"/>
                  <line x1="8" y1="21" x2="16" y2="21"/>
                  <line x1="12" y1="17" x2="12" y2="21"/>
                </svg>
              )
            },
            {
              title: 'Transparent Repair Progress',
              desc: 'From service log updates to technician notes and estimated completion timelines, view everything in real-time straight from your user dashboard.',
              icon: (
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="var(--red)" strokeWidth="2">
                  <circle cx="12" cy="12" r="10"/>
                  <polyline points="12 6 12 12 16 14"/>
                </svg>
              )
            }
          ].map((item, idx) => (
            <div key={idx} style={{
              background: 'rgba(255,255,255,0.02)',
              border: '1px solid rgba(255,255,255,0.05)',
              borderRadius: '16px',
              padding: '36px',
              display: 'flex',
              flexDirection: 'column',
              gap: '20px',
              transition: 'transform 0.25s, border-color 0.25s',
              cursor: 'default',
            }}
              onMouseEnter={e => {
                e.currentTarget.style.transform = 'translateY(-5px)';
                e.currentTarget.style.borderColor = 'rgba(232,0,29,0.3)';
              }}
              onMouseLeave={e => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.05)';
              }}
            >
              <div style={{
                width: '60px',
                height: '60px',
                borderRadius: '12px',
                background: 'rgba(232,0,29,0.06)',
                border: '1px solid rgba(232,0,29,0.15)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
                {item.icon}
              </div>
              <h3 style={{ fontSize: '1.25rem', fontWeight: 700 }}>{item.title}</h3>
              <p style={{ color: '#888', fontSize: '0.9rem', lineHeight: 1.6 }}>{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section style={{
        background: 'linear-gradient(180deg, rgba(8,8,8,0) 0%, rgba(232,0,29,0.06) 100%)',
        padding: '90px 24px',
        textAlign: 'center',
        borderTop: '1px solid #1a1a1a',
      }}>
        <h2 style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '16px' }}>Ready to check your boAt product warranty?</h2>
        <p style={{ color: '#aaa', fontSize: '0.95rem', marginBottom: '32px' }}>Enter your serial number now to verify details instantly.</p>
        <Link 
          href={isAuthenticated ? "/home#warranty-form" : "/#warranty-form"}
          style={{
            background: 'var(--red)',
            color: '#fff',
            fontWeight: 700,
            fontSize: '0.95rem',
            padding: '16px 36px',
            borderRadius: '10px',
            textDecoration: 'none',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            boxShadow: '0 8px 20px rgba(232,0,29,0.2)',
            transition: 'background 0.2s, transform 0.15s',
          }}
          onMouseEnter={e => { e.currentTarget.style.background = 'var(--red-dark)'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
          onMouseLeave={e => { e.currentTarget.style.background = 'var(--red)'; e.currentTarget.style.transform = 'translateY(0)'; }}
        >
          Verify Warranty Status
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <line x1="5" y1="12" x2="19" y2="12"></line>
            <polyline points="12 5 19 12 12 19"></polyline>
          </svg>
        </Link>
      </section>

      {/* Global Footer */}
      <Footer />
    </div>
  );
}
