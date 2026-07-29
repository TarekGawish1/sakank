'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { fetchApi } from '@/api/client';
import { Eye, EyeOff, Lock, Mail } from 'lucide-react';

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetchApi('/auth/login', {
        method: 'POST',
        body: JSON.stringify({ email, password }),
      });

      if (res.data?.accessToken) {
        localStorage.setItem('admin_token', res.data.accessToken);
        // Force hard navigation to reload layout and data
        window.location.href = '/';
      } else {
        setError('حدث خطأ أثناء تسجيل الدخول: الاستجابة غير متوقعة');
      }
    } catch (err: any) {
      setError(err.message || 'بيانات الدخول غير صحيحة أو السيرفر لا يستجيب');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #f0f4f8 0%, #d9e2ec 100%)',
      }}
    >
      <div
        className="card fade-in"
        style={{
          width: '100%',
          maxWidth: '440px',
          padding: '48px',
          backgroundColor: '#ffffff',
          borderRadius: '24px',
          boxShadow: '0 20px 40px rgba(0, 0, 0, 0.08), 0 1px 3px rgba(0,0,0,0.05)',
          border: '1px solid rgba(255,255,255,0.4)',
          backdropFilter: 'blur(10px)',
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '64px',
              height: '64px',
              borderRadius: '16px',
              backgroundColor: 'var(--color-blue-50)',
              color: 'var(--brand-primary)',
              marginBottom: '16px',
            }}
          >
            <Lock size={32} />
          </div>
          <h1
            style={{
              fontSize: '28px',
              fontWeight: 700,
              color: 'var(--text-primary)',
              marginBottom: '8px',
              letterSpacing: '-0.5px',
            }}
          >
            مرحباً بك مجدداً 👋
          </h1>
          <p className="text-secondary" style={{ fontSize: '15px' }}>
            تسجيل الدخول للوصول إلى لوحة تحكم سكنك
          </p>
        </div>

        {error && (
          <div
            style={{
              padding: '14px 16px',
              backgroundColor: '#FEF2F2',
              color: '#991B1B',
              borderRadius: '12px',
              marginBottom: '24px',
              fontSize: '14px',
              border: '1px solid #F87171',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              fontWeight: 500,
              animation: 'fade-in 0.3s ease-out',
            }}
          >
            {error}
          </div>
        )}

        <form
          onSubmit={handleLogin}
          style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}
        >
          <div className="form-group" style={{ marginBottom: 0 }}>
            <label
              style={{
                fontSize: '14px',
                fontWeight: 600,
                color: 'var(--text-primary)',
                marginBottom: '8px',
                display: 'block',
              }}
            >
              البريد الإلكتروني
            </label>
            <div style={{ position: 'relative' }}>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                style={{
                  direction: 'ltr',
                  width: '100%',
                  padding: '14px 44px 14px 16px',
                  borderRadius: '12px',
                  border: '1.5px solid var(--border-subtle)',
                  outline: 'none',
                  transition: 'all 0.2s',
                  fontSize: '15px',
                }}
                onFocus={(e) => (e.target.style.borderColor = 'var(--brand-primary)')}
                onBlur={(e) => (e.target.style.borderColor = 'var(--border-subtle)')}
              />
              <Mail
                size={20}
                style={{
                  position: 'absolute',
                  top: '50%',
                  right: '16px',
                  transform: 'translateY(-50%)',
                  color: 'var(--text-secondary)',
                }}
              />
            </div>
          </div>

          <div className="form-group" style={{ marginBottom: 0 }}>
            <label
              style={{
                fontSize: '14px',
                fontWeight: 600,
                color: 'var(--text-primary)',
                marginBottom: '8px',
                display: 'block',
              }}
            >
              كلمة المرور
            </label>
            <div style={{ position: 'relative' }}>
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                style={{
                  direction: 'ltr',
                  width: '100%',
                  padding: '14px 44px 14px 44px',
                  borderRadius: '12px',
                  border: '1.5px solid var(--border-subtle)',
                  outline: 'none',
                  transition: 'all 0.2s',
                  fontSize: '15px',
                }}
                onFocus={(e) => (e.target.style.borderColor = 'var(--brand-primary)')}
                onBlur={(e) => (e.target.style.borderColor = 'var(--border-subtle)')}
              />
              <Lock
                size={20}
                style={{
                  position: 'absolute',
                  top: '50%',
                  right: '16px',
                  transform: 'translateY(-50%)',
                  color: 'var(--text-secondary)',
                }}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: 'absolute',
                  top: '50%',
                  left: '16px',
                  transform: 'translateY(-50%)',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  color: 'var(--text-secondary)',
                  padding: 0,
                  display: 'flex',
                }}
                aria-label="Toggle password visibility"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            className="btn-primary"
            style={{
              width: '100%',
              marginTop: '8px',
              padding: '16px',
              borderRadius: '12px',
              fontSize: '16px',
              fontWeight: 600,
              transition: 'all 0.2s',
              boxShadow: '0 4px 12px rgba(37, 99, 235, 0.2)',
            }}
            disabled={loading}
          >
            {loading ? 'جاري الدخول...' : 'تسجيل الدخول'}
          </button>
        </form>
      </div>
    </div>
  );
}
