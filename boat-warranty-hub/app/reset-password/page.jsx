"use client";

import { useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

function ResetPasswordForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get('token');
  const email = searchParams.get('email');

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    if (password.length < 8) {
      setError("Password must be at least 8 characters");
      return;
    }

    setIsLoading(true);
    setError('');
    setMessage('');
    
    try {
      const res = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, token, newPassword: password })
      });
      const data = await res.json();
      
      if (!res.ok) {
        throw new Error(data.message || 'Failed to reset password');
      }

      setMessage('Password reset successfully! Redirecting to login...');
      setTimeout(() => {
        router.push('/login');
      }, 2000);

    } catch (err) {
      console.error('Reset password error:', err);
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
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
        <h2 style={{ margin: 0, fontSize: '2.2rem', fontWeight: 700, letterSpacing: '-0.02em' }}>New Password</h2>
        <p style={{ margin: '8px 0 0', color: '#666666', fontSize: '0.92rem' }}>
          Please enter your new password below.
        </p>
      </div>

      {error && (
        <div style={{
          background: 'rgba(232, 0, 29, 0.08)', border: '1px solid rgba(232, 0, 29, 0.4)',
          borderRadius: '12px', padding: '14px 18px', marginBottom: '20px',
          color: '#e8001d', fontSize: '0.88rem', fontWeight: 600, textAlign: 'center'
        }}>
          {error}
        </div>
      )}

      {message && (
        <div style={{
          background: 'rgba(0, 200, 0, 0.08)', border: '1px solid rgba(0, 200, 0, 0.4)',
          borderRadius: '12px', padding: '14px 18px', marginBottom: '20px',
          color: '#008000', fontSize: '0.88rem', fontWeight: 600, textAlign: 'center'
        }}>
          {message}
        </div>
      )}

      <form style={{ display: 'grid', gap: '16px' }} onSubmit={handleSubmit}>
        {/* Password Field */}
        <div style={{ position: 'relative' }}>
          <span style={{
            position: 'absolute', left: '18px', top: '50%', transform: 'translateY(-50%)',
            color: '#999999', display: 'flex', alignItems: 'center', pointerEvents: 'none'
          }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
          </span>
          <input
            required
            placeholder="New Password"
            type={showPassword ? 'text' : 'password'}
            className="input-field"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <span
            onClick={() => setShowPassword(!showPassword)}
            style={{
              position: 'absolute', right: '18px', top: '50%', transform: 'translateY(-50%)',
              color: '#999999', cursor: 'pointer', display: 'flex', alignItems: 'center'
            }}
          >
            {showPassword ? (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" />
              </svg>
            ) : (
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                <line x1="1" y1="1" x2="23" y2="23" />
              </svg>
            )}
          </span>
        </div>

        {/* Confirm Password Field */}
        <div style={{ position: 'relative' }}>
          <span style={{
            position: 'absolute', left: '18px', top: '50%', transform: 'translateY(-50%)',
            color: '#999999', display: 'flex', alignItems: 'center', pointerEvents: 'none'
          }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
            </svg>
          </span>
          <input
            required
            placeholder="Confirm New Password"
            type={showPassword ? 'text' : 'password'}
            className="input-field"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>

        <button type="submit" className="btn-submit" disabled={isLoading}>
          {isLoading ? 'Updating...' : 'Update Password'}
        </button>
      </form>
    </aside>
  );
}

export default function ResetPasswordPage() {
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

      <Suspense fallback={<div style={{ color: 'white' }}>Loading...</div>}>
        <ResetPasswordForm />
      </Suspense>
    </main>
  );
}
