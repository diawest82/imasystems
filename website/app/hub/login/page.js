'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import '../../../styles/globals.css';
import QuantumSafeIndicator from '../../../components/QuantumSafeIndicator.jsx';

export default function HubLogin() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8080/api';
      const response = await fetch(`${apiUrl}/hub/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.detail || 'Login failed');
      }

      localStorage.setItem('hub_token', data.access_token);
      localStorage.setItem('hub_user', JSON.stringify({ email }));

      router.push('/hub');
    } catch (err) {
      setError(err.message || 'Failed to login');
      console.error('Hub login error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main style={{
      minHeight: '100vh',
      background: 'var(--bg-primary)',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      padding: 'var(--spacing-lg)',
      overflow: 'hidden',
      position: 'relative',
    }}>
      {/* Background gradient effects */}
      <div style={{
        position: 'absolute',
        top: '-50%',
        right: '-20%',
        width: '600px',
        height: '600px',
        background: 'radial-gradient(circle, rgba(0, 229, 255, 0.1) 0%, transparent 70%)',
        borderRadius: '50%',
        pointerEvents: 'none',
      }}></div>
      <div style={{
        position: 'absolute',
        bottom: '-30%',
        left: '-20%',
        width: '500px',
        height: '500px',
        background: 'radial-gradient(circle, rgba(0, 153, 221, 0.08) 0%, transparent 70%)',
        borderRadius: '50%',
        pointerEvents: 'none',
      }}></div>

      {/* Content */}
      <div style={{
        position: 'relative',
        zIndex: 10,
        width: '100%',
        maxWidth: '480px',
      }}>
        {/* Logo area */}
        <div style={{
          textAlign: 'center',
          marginBottom: 'var(--spacing-3xl)',
        }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            width: '56px',
            height: '56px',
            borderRadius: 'var(--radius-lg)',
            background: 'linear-gradient(135deg, var(--accent) 0%, var(--accent-secondary) 100%)',
            marginBottom: 'var(--spacing-lg)',
            boxShadow: '0 0 32px rgba(0, 229, 255, 0.3)',
          }}>
            <span style={{
              fontSize: '24px',
              fontWeight: '700',
              color: 'var(--bg-primary)',
            }}>⚡</span>
          </div>
          <h1 style={{
            fontSize: 'var(--font-size-3xl)',
            marginBottom: 'var(--spacing-sm)',
            color: 'var(--text-primary)',
            fontFamily: 'var(--font-serif)',
          }}>Cloud Hub</h1>
          <p style={{
            color: 'var(--text-secondary)',
            fontSize: 'var(--font-size-sm)',
            margin: 0,
          }}>Quantum-safe distributed intelligence platform</p>
        </div>

        {/* Login card */}
        <div style={{
          background: 'linear-gradient(135deg, var(--bg-secondary) 0%, var(--bg-tertiary) 100%)',
          border: '1px solid',
          borderColor: 'rgba(0, 229, 255, 0.2)',
          padding: 'var(--spacing-2xl)',
          borderRadius: 'var(--radius-lg)',
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4), inset 1px 1px 0 rgba(0, 229, 255, 0.1)',
          marginBottom: 'var(--spacing-xl)',
        }}>
          <div style={{ marginBottom: 'var(--spacing-xl)' }}>
            <QuantumSafeIndicator />
          </div>

          <form onSubmit={handleSubmit}>
            <div style={{ marginBottom: 'var(--spacing-lg)' }}>
              <label style={{
                display: 'block',
                marginBottom: 'var(--spacing-sm)',
                fontSize: 'var(--font-size-sm)',
                fontWeight: '600',
                color: 'var(--text-primary)',
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
              }}>Email Address</label>
              <input
                type="email"
                placeholder="your.email@example.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
                style={{
                  width: '100%',
                  padding: 'var(--spacing-md)',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid rgba(0, 229, 255, 0.2)',
                  background: 'rgba(10, 13, 26, 0.5)',
                  color: 'var(--text-primary)',
                  fontSize: 'var(--font-size-sm)',
                  transition: 'all var(--transition-base)',
                  boxSizing: 'border-box',
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = 'var(--accent)';
                  e.target.style.boxShadow = '0 0 16px rgba(0, 229, 255, 0.2)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = 'rgba(0, 229, 255, 0.2)';
                  e.target.style.boxShadow = 'none';
                }}
              />
            </div>

            <div style={{ marginBottom: 'var(--spacing-xl)' }}>
              <label style={{
                display: 'block',
                marginBottom: 'var(--spacing-sm)',
                fontSize: 'var(--font-size-sm)',
                fontWeight: '600',
                color: 'var(--text-primary)',
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
              }}>Password</label>
              <input
                type="password"
                placeholder="Enter your password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading}
                style={{
                  width: '100%',
                  padding: 'var(--spacing-md)',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid rgba(0, 229, 255, 0.2)',
                  background: 'rgba(10, 13, 26, 0.5)',
                  color: 'var(--text-primary)',
                  fontSize: 'var(--font-size-sm)',
                  transition: 'all var(--transition-base)',
                  boxSizing: 'border-box',
                }}
                onFocus={(e) => {
                  e.target.style.borderColor = 'var(--accent)';
                  e.target.style.boxShadow = '0 0 16px rgba(0, 229, 255, 0.2)';
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = 'rgba(0, 229, 255, 0.2)';
                  e.target.style.boxShadow = 'none';
                }}
              />
            </div>

            {error && (
              <div style={{
                padding: 'var(--spacing-md)',
                borderRadius: 'var(--radius-md)',
                background: 'rgba(231, 76, 60, 0.15)',
                border: '1px solid rgba(231, 76, 60, 0.3)',
                color: '#ff6b6b',
                fontSize: 'var(--font-size-sm)',
                marginBottom: 'var(--spacing-lg)',
              }}>
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              style={{
                width: '100%',
                padding: 'var(--spacing-md)',
                borderRadius: 'var(--radius-md)',
                border: 'none',
                background: loading
                  ? 'rgba(0, 229, 255, 0.3)'
                  : 'linear-gradient(135deg, var(--accent) 0%, var(--accent-secondary) 100%)',
                color: 'var(--bg-primary)',
                fontSize: 'var(--font-size-sm)',
                fontWeight: '600',
                cursor: loading ? 'not-allowed' : 'pointer',
                transition: 'all var(--transition-base)',
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
                boxShadow: '0 0 24px rgba(0, 229, 255, 0.2)',
              }}
              onMouseEnter={(e) => {
                if (!loading) {
                  e.target.style.boxShadow = '0 0 32px rgba(0, 229, 255, 0.4)';
                  e.target.style.transform = 'translateY(-2px)';
                }
              }}
              onMouseLeave={(e) => {
                if (!loading) {
                  e.target.style.boxShadow = '0 0 24px rgba(0, 229, 255, 0.2)';
                  e.target.style.transform = 'translateY(0)';
                }
              }}
            >
              {loading ? 'Connecting to Hub...' : 'Connect to Hub'}
            </button>
          </form>
        </div>

        {/* Features grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: 'var(--spacing-md)',
          marginBottom: 'var(--spacing-xl)',
        }}>
          {[
            { icon: '🌐', title: 'Global Access', desc: 'Work across all workspaces' },
            { icon: '🔐', title: 'Quantum-Safe', desc: 'NIST-approved encryption' },
            { icon: '💡', title: 'AI Powered', desc: 'Intelligent systems' },
            { icon: '⚡', title: 'Real-time', desc: 'Live collaboration' },
          ].map((feature, i) => (
            <div
              key={i}
              style={{
                padding: 'var(--spacing-md)',
                borderRadius: 'var(--radius-md)',
                background: 'rgba(0, 229, 255, 0.05)',
                border: '1px solid rgba(0, 229, 255, 0.15)',
                textAlign: 'center',
              }}
            >
              <div style={{ fontSize: '24px', marginBottom: 'var(--spacing-sm)' }}>{feature.icon}</div>
              <div style={{
                fontSize: 'var(--font-size-xs)',
                fontWeight: '600',
                color: 'var(--accent)',
                marginBottom: '2px',
              }}>{feature.title}</div>
              <div style={{
                fontSize: 'var(--font-size-xs)',
                color: 'var(--text-secondary)',
              }}>{feature.desc}</div>
            </div>
          ))}
        </div>

        {/* Footer link */}
        <div style={{ textAlign: 'center' }}>
          <a
            href="/"
            style={{
              color: 'var(--text-secondary)',
              textDecoration: 'none',
              fontSize: 'var(--font-size-sm)',
              transition: 'color var(--transition-base)',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '4px',
            }}
            onMouseEnter={(e) => e.target.style.color = 'var(--accent)'}
            onMouseLeave={(e) => e.target.style.color = 'var(--text-secondary)'}
          >
            ← Back to Home
          </a>
        </div>
      </div>
    </main>
  );
}
