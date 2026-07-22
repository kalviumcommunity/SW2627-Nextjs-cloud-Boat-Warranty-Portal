"use client";

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';

export default function LoginPage() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage('');
    setIsLoading(true);
    try {
      const result = await signIn('credentials', {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        setErrorMessage('Invalid email/phone or password. Please try again.');
        setIsLoading(false);
        return;
      }

      const callbackUrl = (typeof window !== 'undefined' && new URLSearchParams(window.location.search).get('callbackUrl')) || '/home';
      router.push(callbackUrl);
    } catch (error) {
      console.error('Login error:', error);
      setErrorMessage(error.message || 'Login failed. Please try again.');
      setIsLoading(false);
    }
  };

  return (
    <main className="page-main" style={{
      minHeight: '100vh',
      background: '#000000',
      backgroundImage: `
        radial-gradient(circle at 10% 20%, rgba(232, 0, 29, 0.07) 0%, transparent 45%),
        radial-gradient(circle at 90% 80%, rgba(232, 140, 29, 0.05) 0%, transparent 45%),
        linear-gradient(135deg, #020305 0%, #0c0804 50%, #020305 100%)
      `,
      color: '#fff',
      fontFamily: 'Inter, system-ui, sans-serif',
      padding: '40px 60px 20px 60px',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'space-between',
      position: 'relative',
      overflow: 'hidden'
    }}>

      {/* Background Decorative Radial */}
      <div style={{
        position: 'absolute',
        bottom: '0',
        left: '0',
        width: '100%',
        height: '450px',
        background: 'radial-gradient(ellipse at bottom, rgba(160, 90, 30, 0.12) 0%, transparent 70%)',
        zIndex: 0,
        pointerEvents: 'none'
      }} />

      {/* Embedded Styles */}
      <style dangerouslySetInnerHTML={{
        __html: `
        .main-grid {
          display: grid;
          grid-template-columns: 1.15fr 0.85fr;
          gap: 50px;
          align-items: center;
          margin-bottom: 50px;
          position: relative;
        }

        .hero-left {
          position: relative;
          overflow: hidden;
          border-radius: 20px;
          padding: 52px 48px 52px 48px;
          min-height: 540px;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        .hero-bg-image {
          position: absolute;
          inset: 0;
          z-index: 0;
          pointer-events: none;
          -webkit-mask-image: 
            linear-gradient(to right, 
              transparent 0%, 
              rgba(0,0,0,0.3) 15%, 
              rgba(0,0,0,0.85) 40%, 
              black 60%, 
              black 75%, 
              transparent 100%
            );
          mask-image: 
            linear-gradient(to right, 
              transparent 0%, 
              rgba(0,0,0,0.3) 15%, 
              rgba(0,0,0,0.85) 40%, 
              black 60%, 
              black 75%, 
              transparent 100%
            );
        }

        .hero-content {
          position: relative;
          z-index: 1;
        }

        .input-field {
          width: 100%;
          border-radius: 12px;
          border: 1px solid #e2e8f0;
          padding: 16px 16px 16px 52px;
          font-size: 0.95rem;
          color: #0a0a0a;
          background: #fff;
          outline: none;
          transition: border-color 0.2s, box-shadow 0.2s;
          box-sizing: border-box;
        }

        .input-field::placeholder {
          color: #999999;
          opacity: 1;
        }

        .input-field:focus {
          border-color: #e8001d !important;
          box-shadow: 0 0 0 3px rgba(232, 0, 29, 0.1) !important;
        }

        .btn-submit {
          margin-top: 10px;
          width: 100%;
          border-radius: 12px;
          background: #e8001d;
          color: #fff;
          font-size: 1rem;
          font-weight: 600;
          padding: 16px;
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 10px;
          cursor: pointer;
          border: none;
          transition: background-color 0.2s, transform 0.1s, box-shadow 0.2s;
        }

        .btn-submit:hover {
          background-color: #c40019;
          box-shadow: 0 6px 20px rgba(232, 0, 29, 0.35);
        }

        .btn-submit:active {
          transform: scale(0.98);
        }

        .link-red {
          color: #e8001d;
          font-weight: 600;
          transition: color 0.2s;
        }

        .link-red:hover {
          text-decoration: underline !important;
        }

        .footer-link:hover {
          color: #ffffff !important;
        }

        .header-btn {
          background: #e8001d;
          color: #fff;
          font-size: 0.85rem;
          font-weight: 600;
          padding: 10px 20px;
          border-radius: 8px;
          display: inline-flex;
          align-items: center;
          gap: 8px;
          transition: background-color 0.2s, transform 0.1s;
          text-decoration: none;
        }

        .header-btn:hover {
          background-color: #c40019;
        }

        .header-btn:active {
          transform: scale(0.97);
        }

        .forgot-link {
          color: #e8001d;
          font-size: 0.88rem;
          font-weight: 600;
          text-align: right;
          display: block;
          margin-top: 4px;
          transition: opacity 0.2s;
          text-decoration: none;
        }

        .forgot-link:hover {
          text-decoration: underline;
          opacity: 0.85;
        }

        @media (max-width: 1200px) {
          .hero-left {
            padding: 40px 36px;
          }
        }

        @media (max-width: 1024px) {
          .main-grid {
            grid-template-columns: 1fr;
            gap: 40px;
            margin-bottom: 40px;
          }
          .hero-left {
            min-height: 420px;
            padding: 40px 32px;
            border-radius: 16px;
          }
          .hero-section {
            text-align: center;
            display: flex;
            flex-direction: column;
            align-items: center;
          }
          .hero-section p {
            margin-left: auto;
            margin-right: auto;
          }
          .features-list {
            margin-left: auto;
            margin-right: auto;
            text-align: left;
          }
          .card-aside {
            justify-self: center !important;
          }
        }

        @media (max-width: 768px) {
          .page-main {
            padding: 20px 24px 20px 24px !important;
          }
          .header-nav {
            margin-bottom: 30px !important;
          }
          .hero-section h1 {
            font-size: 2.8rem !important;
          }
          .footer-features {
            justify-content: flex-start !important;
            gap: 20px !important;
            display: grid !important;
            grid-template-columns: 1fr 1fr !important;
          }
        }

        @media (max-width: 480px) {
          .footer-features {
            grid-template-columns: 1fr !important;
          }
          .hero-section h1 {
            font-size: 2.2rem !important;
          }
          .card-aside {
            padding: 32px 20px !important;
          }
        }
      ` }} />

      <div style={{ maxWidth: '1440px', margin: '0 auto', width: '100%', zIndex: 1 }}>
        {/* HEADER */}
        <header className="header-nav" style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '40px',
        }}>
          {/* boAt Logo */}
          <div style={{ fontSize: '2rem', fontWeight: 800, letterSpacing: '-0.03em', display: 'flex', alignItems: 'center' }}>
            <span style={{ color: '#fff' }}>bo</span>
            <span style={{ color: '#e8001d', fontSize: '2.3rem', lineHeight: '1', display: 'inline-block', transform: 'translateY(-1px)' }}>A</span>
            <span style={{ color: '#fff' }}>t</span>
          </div>
          <Link href="/admin/login" className="header-btn">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="3" width="7" height="7" />
              <rect x="14" y="3" width="7" height="7" />
              <rect x="14" y="14" width="7" height="7" />
              <rect x="3" y="14" width="7" height="7" />
            </svg>
            Admin Dashboard
          </Link>
        </header>

        {/* MAIN BODY LAYOUT */}
        <div className="main-grid">

          {/* LEFT SIDE: HERO CONTENT with Blended Background Image */}
          <div className="hero-left">

            {/* Background earbuds image — blended into the dark page */}
            <div className="hero-bg-image">
              <Image
                src="/boat_earbuds.png"
                alt=""
                fill
                style={{
                  objectFit: 'cover',
                  objectPosition: 'right center',
                }}
                priority
              />
            </div>

            {/* Foreground hero content */}
            <section className="hero-section hero-content">
              <div style={{ marginBottom: '12px' }}>
                <span style={{
                  fontSize: '0.8rem',
                  letterSpacing: '0.2em',
                  textTransform: 'uppercase',
                  color: '#e8001d',
                  fontWeight: 700,
                }}>
                  Welcome Back
                </span>
              </div>
              <h1 style={{
                fontSize: '3.8rem',
                fontWeight: '800',
                lineHeight: 1.15,
                margin: '0 0 24px',
                letterSpacing: '-0.02em',
              }}>
                Login to Your <br />
                <span style={{ color: '#e8001d' }}>Warranty Hub.</span>
              </h1>
              <p style={{
                fontSize: '1rem',
                lineHeight: 1.6,
                color: '#cccccc',
                maxWidth: '380px',
                marginBottom: '48px',
              }}>
                Login to access your warranty dashboard, track repairs, download certificates and get support.
              </p>

              {/* Feature List */}
              <div className="features-list" style={{ display: 'grid', gap: '28px', maxWidth: '400px' }}>
                {[
                  {
                    title: "100% Genuine Products",
                    desc: "Authentic products you can trust.",
                    icon: (
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#e8001d" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                        <path d="M9 11l2 2 4-4" />
                      </svg>
                    )
                  },
                  {
                    title: "Digital Warranty Certificate",
                    desc: "Access and download anytime.",
                    icon: (
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#e8001d" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                        <polyline points="14 2 14 8 20 8" />
                        <line x1="16" y1="13" x2="8" y2="13" />
                        <line x1="16" y1="17" x2="8" y2="17" />
                      </svg>
                    )
                  },
                  {
                    title: "Hassle Free Support",
                    desc: "We're here to help, always.",
                    icon: (
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#e8001d" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M3 18v-6a9 9 0 0 1 18 0v6" />
                        <path d="M21 19a2 2 0 0 1-2 2h-1a2 2 0 0 1-2-2v-3a2 2 0 0 1 2-2h3zM3 19a2 2 0 0 0 2 2h1a2 2 0 0 0 2-2v-3a2 2 0 0 0-2-2H3z" />
                      </svg>
                    )
                  }
                ].map((item, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                    <div style={{
                      width: '46px',
                      height: '46px',
                      borderRadius: '50%',
                      border: '1.5px solid rgba(232, 0, 29, 0.35)',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                      flexShrink: 0
                    }}>
                      {item.icon}
                    </div>
                    <div>
                      <h4 style={{ margin: 0, fontSize: '1rem', fontWeight: 700 }}>{item.title}</h4>
                      <p style={{ margin: '3px 0 0', fontSize: '0.85rem', color: '#aaaaaa' }}>{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* RIGHT SIDE: LOGIN FORM CARD */}
          <aside className="card-aside" style={{
            borderRadius: '28px',
            background: '#ffffff',
            color: '#0a0a0a',
            padding: '48px 40px',
            boxShadow: '0 25px 60px rgba(0, 0, 0, 0.4)',
            width: '100%',
            maxWidth: '480px',
            justifySelf: 'end',
            position: 'relative',
            zIndex: 3
          }}>
            <div style={{ marginBottom: '32px' }}>
              <h2 style={{ margin: 0, fontSize: '2.2rem', fontWeight: 700, letterSpacing: '-0.02em' }}>Login</h2>
              <p style={{ margin: '8px 0 0', color: '#666666', fontSize: '0.92rem' }}>
                Welcome back! Please login to continue.
              </p>
            </div>

            {errorMessage && (
              <div style={{
                background: 'rgba(232, 0, 29, 0.08)',
                border: '1.5px solid rgba(232, 0, 29, 0.4)',
                borderRadius: '12px',
                padding: '14px 18px',
                marginBottom: '20px',
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
              }}>
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#e8001d" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="8" x2="12" y2="12" />
                  <line x1="12" y1="16" x2="12.01" y2="16" />
                </svg>
                <span style={{ color: '#e8001d', fontSize: '0.88rem', fontWeight: 600 }}>
                  {errorMessage}
                </span>
              </div>
            )}

            <form style={{ display: 'grid', gap: '16px' }} onSubmit={handleSubmit}>

              {/* Email / Phone Field */}
              <div style={{ position: 'relative' }}>
                <span style={{
                  position: 'absolute',
                  left: '18px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: '#999999',
                  display: 'flex',
                  alignItems: 'center',
                  pointerEvents: 'none'
                }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                    <polyline points="22 6 12 13 2 6" />
                  </svg>
                </span>
                <input
                  id="login-email"
                  placeholder="Email or Phone Number"
                  type="text"
                  className="input-field"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>

              {/* Password Field */}
              <div style={{ position: 'relative' }}>
                <span style={{
                  position: 'absolute',
                  left: '18px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  color: '#999999',
                  display: 'flex',
                  alignItems: 'center',
                  pointerEvents: 'none'
                }}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                  </svg>
                </span>
                <input
                  id="login-password"
                  placeholder="Password"
                  type={showPassword ? 'text' : 'password'}
                  className="input-field"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                {/* Eye Toggle */}
                <span
                  onClick={() => setShowPassword(!showPassword)}
                  style={{
                    position: 'absolute',
                    right: '18px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    color: '#999999',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center'
                  }}
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
                </span>
              </div>

              {/* Forgot Password */}
              <div style={{ textAlign: 'right', marginTop: '-4px' }}>
                <Link href="/forgot-password" className="forgot-link">
                  Forgot Password?
                </Link>
              </div>

              {/* Login Button */}
              <button type="submit" className="btn-submit">
                Login
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="5" y1="12" x2="19" y2="12" />
                  <polyline points="12 5 19 12 12 19" />
                </svg>
              </button>
            </form>

            {/* Sign Up Link */}
            <div style={{ marginTop: '28px', textAlign: 'center' }}>
              <p style={{ color: '#666666', fontSize: '0.92rem', margin: '0 0 14px' }}>
                Don&apos;t have an account?
              </p>
              <Link href="/signup" style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                width: '100%',
                padding: '14px',
                borderRadius: '12px',
                border: '2px solid #e8001d',
                background: 'transparent',
                color: '#e8001d',
                fontSize: '1rem',
                fontWeight: 600,
                textDecoration: 'none',
                transition: 'all 0.2s ease',
              }}
                onMouseEnter={e => { e.currentTarget.style.background = '#e8001d'; e.currentTarget.style.color = '#fff'; }}
                onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#e8001d'; }}
              >
                Sign Up
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                  <circle cx="9" cy="7" r="4" />
                  <line x1="19" y1="8" x2="19" y2="14" />
                  <line x1="22" y1="11" x2="16" y2="11" />
                </svg>
              </Link>
            </div>
          </aside>
        </div>

        {/* FOOTER */}
        <footer style={{
          borderTop: '1px solid rgba(255,255,255,0.08)',
          paddingTop: '40px',
          paddingBottom: '20px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '40px'
        }}>
          {/* 4 Trust Points */}
          <div className="footer-features" style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '50px',
            flexWrap: 'wrap',
            width: '100%'
          }}>
            {[
              {
                title: "Secure & Reliable",
                desc: "Your data is safe with us",
                icon: (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#e8001d" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                    <path d="M9 11l2 2 4-4" />
                  </svg>
                )
              },
              {
                title: "Official Support",
                desc: "Direct from boAt",
                icon: (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#e8001d" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
                    <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                  </svg>
                )
              },
              {
                title: "24x7 Assistance",
                desc: "We're always here",
                icon: (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#e8001d" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12 6 12 12 16 14" />
                  </svg>
                )
              },
              {
                title: "Hassle Free Process",
                desc: "Simple and transparent",
                icon: (
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#e8001d" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                )
              }
            ].map((f, idx) => (
              <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                <div style={{
                  width: '36px',
                  height: '36px',
                  borderRadius: '50%',
                  border: '1.5px solid rgba(232,0,29,0.3)',
                  display: 'grid',
                  placeItems: 'center',
                  flexShrink: 0
                }}>
                  {f.icon}
                </div>
                <div>
                  <div style={{ fontSize: '0.9rem', fontWeight: 700 }}>{f.title}</div>
                  <div style={{ fontSize: '0.78rem', color: '#888888', marginTop: '2px' }}>{f.desc}</div>
                </div>
              </div>
            ))}
          </div>

          {/* Copyright & Links */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '24px',
            fontSize: '0.78rem',
            color: '#666666',
            borderTop: '1px solid rgba(255, 255, 255, 0.08)',
            paddingTop: '24px',
            width: '100%',
            flexWrap: 'wrap'
          }}>
            <span>© 2025 boAt Lifestyle. All Rights Reserved.</span>
            <span style={{ color: '#222222' }}>|</span>
            <Link href="/privacy" className="footer-link" style={{ transition: 'color 0.2s' }}>Privacy Policy</Link>
            <span style={{ color: '#222222' }}>|</span>
            <Link href="/terms" className="footer-link" style={{ transition: 'color 0.2s' }}>Terms & Conditions</Link>
          </div>
        </footer>
      </div>
    </main>
  );
}
