"use client";

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage('');
    
    try {
      const res = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email })
      });
      const data = await res.json();
      setMessage(data.message || 'If an account exists, a reset link has been sent.');
    } catch (error) {
      console.error('Forgot password error:', error);
      setMessage('An error occurred. Please try again.');
    } finally {
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
      justifyContent: 'center',
      alignItems: 'center',
      position: 'relative',
      overflow: 'hidden'
    }}>

      {/* Embedded Styles */}
      <style dangerouslySetInnerHTML={{
        __html: `
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
        .input-field::placeholder { color: #999999; }
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
        .btn-submit:hover:not(:disabled) {
          background-color: #c40019;
          box-shadow: 0 6px 20px rgba(232, 0, 29, 0.35);
        }
        .btn-submit:active:not(:disabled) {
          transform: scale(0.98);
        }
        .btn-submit:disabled {
          background: #555;
          cursor: not-allowed;
        }
      ` }} />

      <aside style={{
        borderRadius: '28px',
        background: '#ffffff',
        color: '#0a0a0a',
        padding: '48px 40px',
        boxShadow: '0 25px 60px rgba(0, 0, 0, 0.4)',
        width: '100%',
        maxWidth: '480px',
        position: 'relative',
        zIndex: 3
      }}>
        <div style={{ marginBottom: '32px' }}>
          <h2 style={{ margin: 0, fontSize: '2.2rem', fontWeight: 700, letterSpacing: '-0.02em' }}>Reset Password</h2>
          <p style={{ margin: '8px 0 0', color: '#666666', fontSize: '0.92rem' }}>
            Enter your email to receive a password reset link.
          </p>
        </div>

        {message && (
          <div style={{
            background: 'rgba(232, 0, 29, 0.08)',
            border: '1px solid rgba(232, 0, 29, 0.4)',
            borderRadius: '12px',
            padding: '14px 18px',
            marginBottom: '20px',
            color: '#e8001d',
            fontSize: '0.88rem',
            fontWeight: 600,
            textAlign: 'center'
          }}>
            {message}
          </div>
        )}

        <form style={{ display: 'grid', gap: '16px' }} onSubmit={handleSubmit}>
          {/* Email Field */}
          <div style={{ position: 'relative' }}>
            <span style={{
              position: 'absolute', left: '18px', top: '50%', transform: 'translateY(-50%)',
              color: '#999999', display: 'flex', alignItems: 'center', pointerEvents: 'none'
            }}>
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                <polyline points="22 6 12 13 2 6" />
              </svg>
            </span>
            <input
              required
              placeholder="Email Address"
              type="email"
              className="input-field"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <button type="submit" className="btn-submit" disabled={isLoading}>
            {isLoading ? 'Sending...' : 'Send Reset Link'}
            {!isLoading && (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <line x1="5" y1="12" x2="19" y2="12" />
                <polyline points="12 5 19 12 12 19" />
              </svg>
            )}
          </button>
        </form>

        <div style={{ marginTop: '28px', textAlign: 'center' }}>
          <Link href="/login" style={{ color: '#666666', textDecoration: 'none', fontSize: '0.92rem', fontWeight: 600 }}>
            &larr; Back to Login
          </Link>
        </div>
      </aside>
    </main>
  );
}
