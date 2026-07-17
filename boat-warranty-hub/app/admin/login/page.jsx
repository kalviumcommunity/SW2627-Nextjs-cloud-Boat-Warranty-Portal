"use client";

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { loginApi } from '../../../services/frontendAuth.service';

export default function AdminLoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let userData;
      try {
        userData = await loginApi(email, password);
      } catch (apiError) {
        console.warn('Backend API failed, falling back to frontend mock authentication:', apiError);
        // Temporary data for testing admin login routing without a backend database
        if (email === 'admin@boat.com' && password === 'admin123') {
          userData = {
            id: 1,
            name: "Admin",
            email: "admin@boat.com",
            role: "ADMIN"
          };
        } else if (email && password) {
          // Allow any login in mock mode for testing convenience
          userData = {
            id: 1,
            name: "Admin",
            email: email,
            role: "ADMIN"
          };
        } else {
          throw new Error("Please fill in email and password");
        }
      }

      if (userData.role === 'ADMIN') {
        localStorage.setItem('admin', JSON.stringify(userData));
        router.push('/admin');
      } else {
        alert('Unauthorized: You do not have Admin privileges.');
      }
    } catch (error) {
      console.error('Admin Login error:', error);
      alert(error.message || 'Login failed');
    }
  };

  return (
    <main style={{
      minHeight: '100vh',
      background: '#06060e',
      backgroundImage: `
        radial-gradient(ellipse at 20% 50%, rgba(0, 60, 120, 0.35) 0%, transparent 55%),
        radial-gradient(ellipse at 80% 20%, rgba(0, 180, 180, 0.15) 0%, transparent 50%),
        radial-gradient(ellipse at 50% 80%, rgba(30, 0, 80, 0.4) 0%, transparent 60%),
        linear-gradient(160deg, #06060e 0%, #0a0a1a 50%, #060610 100%)
      `,
      color: '#fff',
      fontFamily: "'Inter', system-ui, -apple-system, sans-serif",
      display: 'flex',
      flexDirection: 'column',
      position: 'relative',
      overflow: 'hidden',
    }}>

      {/* ─── Embedded Styles ─── */}
      <style dangerouslySetInnerHTML={{ __html: `
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');

        * { box-sizing: border-box; }

        .admin-input {
          width: 100%;
          background: rgba(255,255,255,0.06);
          border: 1px solid rgba(255,255,255,0.13);
          border-radius: 10px;
          padding: 15px 15px 15px 48px;
          font-size: 0.95rem;
          color: #fff;
          outline: none;
          transition: border-color 0.25s, box-shadow 0.25s, background 0.25s;
          font-family: 'Inter', sans-serif;
        }

        .admin-input::placeholder {
          color: rgba(255,255,255,0.38);
        }

        .admin-input:focus {
          border-color: rgba(232, 0, 29, 0.7);
          background: rgba(255,255,255,0.09);
          box-shadow: 0 0 0 3px rgba(232, 0, 29, 0.15);
        }

        .login-btn {
          width: 100%;
          background: #e8001d;
          color: #fff;
          border: none;
          border-radius: 10px;
          padding: 16px;
          font-size: 1rem;
          font-weight: 700;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          transition: background 0.2s, transform 0.15s, box-shadow 0.2s;
          font-family: 'Inter', sans-serif;
          letter-spacing: 0.01em;
        }

        .login-btn:hover {
          background: #c5001a;
          box-shadow: 0 8px 28px rgba(232, 0, 29, 0.45);
          transform: translateY(-1px);
        }

        .login-btn:active {
          transform: scale(0.98) translateY(0);
        }

        .forgot-link {
          color: #e8001d;
          font-size: 0.85rem;
          font-weight: 600;
          text-decoration: none;
          transition: opacity 0.2s;
        }

        .forgot-link:hover {
          text-decoration: underline;
          opacity: 0.8;
        }

        .feature-item {
          display: flex;
          align-items: flex-start;
          gap: 18px;
        }

        .feature-icon-wrap {
          width: 44px;
          height: 44px;
          border-radius: 50%;
          border: 1.5px solid rgba(232,0,29,0.4);
          background: rgba(232,0,29,0.08);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          transition: border-color 0.2s, background 0.2s;
        }

        .feature-item:hover .feature-icon-wrap {
          border-color: rgba(232,0,29,0.7);
          background: rgba(232,0,29,0.14);
        }

        .footer-badge {
          display: flex;
          align-items: center;
          gap: 14px;
        }

        .footer-badge-icon {
          width: 38px;
          height: 38px;
          border-radius: 50%;
          border: 1.5px solid rgba(232,0,29,0.3);
          display: grid;
          place-items: center;
          flex-shrink: 0;
        }

        .footer-link {
          color: #555;
          text-decoration: none;
          transition: color 0.2s;
        }

        .footer-link:hover {
          color: #fff;
        }

        .eye-btn {
          position: absolute;
          right: 16px;
          top: 50%;
          transform: translateY(-50%);
          background: none;
          border: none;
          cursor: pointer;
          color: rgba(255,255,255,0.4);
          display: flex;
          align-items: center;
          transition: color 0.2s;
          padding: 0;
        }

        .eye-btn:hover {
          color: rgba(255,255,255,0.75);
        }

        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        @keyframes floatSpeaker {
          0%, 100% { transform: translateY(0px); }
          50%       { transform: translateY(-12px); }
        }

        .hero-animate {
          animation: fadeInUp 0.65s ease both;
        }

        .card-animate {
          animation: fadeInUp 0.75s 0.1s ease both;
        }

        .speaker-float {
          animation: floatSpeaker 5s ease-in-out infinite;
        }

        @media (max-width: 1024px) {
          .admin-grid {
            grid-template-columns: 1fr !important;
          }
          .hero-left-admin {
            min-height: 320px !important;
            padding: 40px 32px !important;
          }
        }

        @media (max-width: 768px) {
          .admin-main {
            padding: 24px !important;
          }
          .footer-badges-row {
            flex-wrap: wrap !important;
            gap: 20px !important;
          }
        }
      `}} />

      {/* ─── HEADER ─── */}
      <div style={{
        maxWidth: '1440px',
        margin: '0 auto',
        width: '100%',
        padding: '0 48px',
        position: 'relative',
        zIndex: 10
      }}>
        <header style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '24px 0 20px 0',
          borderBottom: '1px solid rgba(255,255,255,0.05)',
        }}>
          {/* boAt Logo */}
          <Link href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '1px' }}>
            <span style={{ color: '#fff', fontSize: '2rem', fontWeight: 900, fontStyle: 'italic', letterSpacing: '-0.03em', lineHeight: 1 }}>bo</span>
            <span style={{ color: '#e8001d', fontSize: '2.3rem', fontWeight: 900, fontStyle: 'italic', letterSpacing: '-0.03em', lineHeight: 1, display: 'inline-block', transform: 'translateY(-1px)' }}>A</span>
            <span style={{ color: '#fff', fontSize: '2rem', fontWeight: 900, fontStyle: 'italic', letterSpacing: '-0.03em', lineHeight: 1 }}>t</span>
          </Link>

          {/* Login / Sign up link */}
          <Link href="/login" style={{
            display: 'flex', alignItems: 'center', gap: '8px',
            color: 'rgba(255,255,255,0.75)', fontSize: '0.88rem', fontWeight: 500,
            textDecoration: 'none', transition: 'color 0.2s',
          }}
            onMouseEnter={e => e.currentTarget.style.color = '#fff'}
            onMouseLeave={e => e.currentTarget.style.color = 'rgba(255,255,255,0.75)'}
          >
            <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="8" r="4" />
              <path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
            </svg>
            Login / Sign up
          </Link>
        </header>
      </div>

      {/* ─── MAIN CONTENT ─── */}
      <div className="admin-main" style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        padding: '24px 48px 0 48px',
        maxWidth: '1440px',
        width: '100%',
        margin: '0 auto',
        position: 'relative',
        zIndex: 2,
      }}>

        {/* Two-column grid */}
        <div className="admin-grid" style={{
          display: 'grid',
          gridTemplateColumns: '1.1fr 0.9fr',
          gap: '40px',
          alignItems: 'center',
          flex: 1,
          paddingBottom: '32px',
        }}>

          {/* ── LEFT: Hero + Speaker image ── */}
          <div className="hero-left-admin hero-animate" style={{
            position: 'relative',
            minHeight: '520px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            borderRadius: '24px',
            overflow: 'hidden',
            padding: '52px 48px',
          }}>

            {/* Blended speaker background image */}
            <div style={{
              position: 'absolute',
              inset: 0,
              zIndex: 0,
              pointerEvents: 'none',
              maskImage: `
                radial-gradient(ellipse 80% 90% at 55% 60%,
                  black 0%,
                  rgba(0,0,0,0.85) 40%,
                  rgba(0,0,0,0.4) 65%,
                  transparent 100%
                )
              `,
              WebkitMaskImage: `
                radial-gradient(ellipse 80% 90% at 55% 60%,
                  black 0%,
                  rgba(0,0,0,0.85) 40%,
                  rgba(0,0,0,0.4) 65%,
                  transparent 100%
                )
              `,
            }}>
              <Image
                src="/boat_speakers.png"
                alt=""
                fill
                style={{
                  objectFit: 'cover',
                  objectPosition: 'center 35%',
                  mixBlendMode: 'luminosity',
                  opacity: 0.55,
                }}
                priority
              />
            </div>

            {/* Coloured aurora glow overlay */}
            <div style={{
              position: 'absolute',
              inset: 0,
              zIndex: 1,
              background: `
                radial-gradient(ellipse 60% 45% at 65% 30%, rgba(0,200,200,0.18) 0%, transparent 70%),
                radial-gradient(ellipse 50% 40% at 40% 70%, rgba(0,80,200,0.22) 0%, transparent 65%)
              `,
              pointerEvents: 'none',
            }} />

            {/* Hero text content */}
            <div style={{ position: 'relative', zIndex: 2 }}>
              <span style={{
                fontSize: '0.75rem',
                letterSpacing: '0.22em',
                textTransform: 'uppercase',
                color: '#e8001d',
                fontWeight: 700,
                display: 'block',
                marginBottom: '14px',
              }}>
                Welcome Back
              </span>

              <h1 style={{
                fontSize: '3.6rem',
                fontWeight: 900,
                lineHeight: 1.1,
                margin: '0 0 16px',
                letterSpacing: '-0.025em',
              }}>
                Admin Access<br />
                <span style={{ color: '#e8001d' }}>Welcome Back!</span>
              </h1>

              <p style={{
                fontSize: '0.97rem',
                lineHeight: 1.65,
                color: 'rgba(255,255,255,0.65)',
                maxWidth: '360px',
                marginBottom: '40px',
              }}>
                Secure access to your dashboard.<br />
                Manage warranty requests, users,<br />
                and system activities.
              </p>

              {/* Feature list */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', maxWidth: '380px' }}>
                {[
                  {
                    title: 'Secure Access',
                    desc: 'Only authorized personnel can access the admin dashboard.',
                    icon: (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#e8001d" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                        <path d="M9 11l2 2 4-4" />
                      </svg>
                    ),
                  },
                  {
                    title: 'Manage Efficiently',
                    desc: 'View reports, manage requests and monitor system performance.',
                    icon: (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#e8001d" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="18" y1="20" x2="18" y2="10" />
                        <line x1="12" y1="20" x2="12" y2="4" />
                        <line x1="6"  y1="20" x2="6"  y2="14" />
                      </svg>
                    ),
                  },
                  {
                    title: 'Full Control',
                    desc: 'Complete control over users, products and warranty operations.',
                    icon: (
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#e8001d" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                        <circle cx="12" cy="12" r="3" />
                        <path d="M19.07 4.93a10 10 0 0 1 0 14.14M4.93 4.93a10 10 0 0 0 0 14.14" />
                        <circle cx="12" cy="12" r="7" stroke="#e8001d" strokeWidth="1" strokeDasharray="3 3" />
                      </svg>
                    ),
                  },
                ].map((item, i) => (
                  <div key={i} className="feature-item">
                    <div className="feature-icon-wrap">
                      {item.icon}
                    </div>
                    <div>
                      <div style={{ fontSize: '0.95rem', fontWeight: 700, marginBottom: '3px' }}>{item.title}</div>
                      <div style={{ fontSize: '0.82rem', color: 'rgba(255,255,255,0.5)', lineHeight: 1.5 }}>{item.desc}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ── RIGHT: Login Card ── */}
          <div className="card-animate" style={{
            background: 'rgba(14,14,24,0.85)',
            backdropFilter: 'blur(24px)',
            WebkitBackdropFilter: 'blur(24px)',
            border: '1px solid rgba(255,255,255,0.1)',
            borderRadius: '24px',
            padding: '48px 44px',
            boxShadow: '0 32px 80px rgba(0,0,0,0.7), 0 0 0 1px rgba(255,255,255,0.05)',
            width: '100%',
            maxWidth: '480px',
            justifySelf: 'end',
          }}>

            {/* Shield icon */}
            <div style={{ textAlign: 'center', marginBottom: '28px' }}>
              <div style={{
                width: '72px',
                height: '72px',
                borderRadius: '50%',
                background: 'rgba(232,0,29,0.12)',
                border: '2px solid rgba(232,0,29,0.35)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 20px',
              }}>
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#e8001d" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" fill="rgba(232,0,29,0.15)" />
                  <circle cx="12" cy="10" r="3" />
                  <path d="M12 13v4" />
                </svg>
              </div>
              <h2 style={{ margin: 0, fontSize: '1.9rem', fontWeight: 800, letterSpacing: '-0.02em', color: '#fff' }}>
                Admin Login
              </h2>
              <p style={{ margin: '8px 0 0', color: 'rgba(255,255,255,0.5)', fontSize: '0.88rem' }}>
                Enter your credentials to access the admin dashboard.
              </p>
            </div>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>

              {/* Email field */}
              <div style={{ position: 'relative' }}>
                <span style={{
                  position: 'absolute', left: '16px', top: '50%',
                  transform: 'translateY(-50%)', color: 'rgba(255,255,255,0.4)',
                  display: 'flex', alignItems: 'center', pointerEvents: 'none',
                }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                </span>
                <input
                  id="admin-email"
                  type="email"
                  placeholder="Admin Email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  className="admin-input"
                  required
                />
              </div>

              {/* Password field */}
              <div style={{ position: 'relative' }}>
                <span style={{
                  position: 'absolute', left: '16px', top: '50%',
                  transform: 'translateY(-50%)', color: 'rgba(255,255,255,0.4)',
                  display: 'flex', alignItems: 'center', pointerEvents: 'none',
                }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                  </svg>
                </span>
                <input
                  id="admin-password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  className="admin-input"
                  required
                />
                <button
                  type="button"
                  className="eye-btn"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label="Toggle password visibility"
                >
                  {showPassword ? (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                      <circle cx="12" cy="12" r="3" />
                    </svg>
                  ) : (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                      <line x1="1" y1="1" x2="23" y2="23" />
                    </svg>
                  )}
                </button>
              </div>

              {/* Forgot Password */}
              <div style={{ textAlign: 'right', marginTop: '-4px' }}>
                <Link href="#" className="forgot-link">Forgot Password?</Link>
              </div>

              {/* Login Button */}
              <button type="submit" className="login-btn" style={{ marginTop: '4px' }}>
                Login
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* ─── FOOTER ─── */}
      <footer style={{
        borderTop: '1px solid rgba(255,255,255,0.07)',
        padding: '28px 48px 20px',
        position: 'relative',
        zIndex: 2,
      }}>

        {/* 4 trust badges */}
        <div className="footer-badges-row" style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '48px',
          flexWrap: 'wrap',
          marginBottom: '24px',
        }}>
          {[
            {
              title: 'Secure & Protected',
              desc: 'Your data is safe with us',
              icon: (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#e8001d" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                  <path d="M9 11l2 2 4-4" />
                </svg>
              ),
            },
            {
              title: '24x7 Support',
              desc: "We're always here to help",
              icon: (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#e8001d" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M3 18v-6a9 9 0 0 1 18 0v6" />
                  <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3z" />
                  <path d="M3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z" />
                </svg>
              ),
            },
            {
              title: 'Reliable System',
              desc: 'Built for performance and security',
              icon: (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#e8001d" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <polyline points="12 6 12 12 16 14" />
                </svg>
              ),
            },
            {
              title: 'Real-time Management',
              desc: 'Track and manage everything in real-time',
              icon: (
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#e8001d" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="3" y="3" width="7" height="7" />
                  <rect x="14" y="3" width="7" height="7" />
                  <rect x="14" y="14" width="7" height="7" />
                  <rect x="3" y="14" width="7" height="7" />
                </svg>
              ),
            },
          ].map((b, i) => (
            <div key={i} className="footer-badge">
              <div className="footer-badge-icon">{b.icon}</div>
              <div>
                <div style={{ fontSize: '0.88rem', fontWeight: 700, color: '#fff' }}>{b.title}</div>
                <div style={{ fontSize: '0.76rem', color: 'rgba(255,255,255,0.42)', marginTop: '2px' }}>{b.desc}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Copyright row */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '20px',
          borderTop: '1px solid rgba(255,255,255,0.06)',
          paddingTop: '18px',
          fontSize: '0.78rem',
          color: 'rgba(255,255,255,0.3)',
          flexWrap: 'wrap',
        }}>
          <span>© 2025 boAt Lifestyle. All Rights Reserved.</span>
          <span style={{ color: '#222' }}>|</span>
          <Link href="#" className="footer-link" style={{ color: 'rgba(255,255,255,0.35)' }}>Privacy Policy</Link>
          <span style={{ color: '#222' }}>|</span>
          <Link href="#" className="footer-link" style={{ color: 'rgba(255,255,255,0.35)' }}>Terms &amp; Conditions</Link>
        </div>
      </footer>
    </main>
  );
}
