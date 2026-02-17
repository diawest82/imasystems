'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import QuantumSafeIndicator from '@/components/QuantumSafeIndicator.jsx';
import { api } from '@/lib/api';
import { auth } from '@/lib/auth';

export default function AdminLogin() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await api.login(username, password);
      auth.setToken(response.data.access_token);
      auth.setUser({ username: response.data.username });
      router.push('/admin');
    } catch (err) {
      setError(err.response?.data?.detail || 'Invalid username or password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="container">
      <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 'var(--spacing-lg) 0' }}>
        <div className="admin-container" style={{ maxWidth: '500px', width: '100%' }}>
          {/* Logo / Branding */}
          <div style={{ textAlign: 'center', marginBottom: 'var(--spacing-xl)' }}>
            <h1 style={{ color: 'var(--primary)', fontSize: '2rem', marginBottom: 'var(--spacing-md)' }}>
              IMA Systems
            </h1>
            <p style={{ color: 'var(--gray)', fontSize: '0.95rem' }}>
              Admin Portal
            </p>
            <div style={{ marginTop: 'var(--spacing-lg)', display: 'flex', justifyContent: 'center' }}>
              <QuantumSafeIndicator label="Quantum-Safe Login" />
            </div>
          </div>

          {/* Error Alert */}
          {error && (
            <div className="alert alert-error" style={{ marginBottom: 'var(--spacing-lg)' }}>
              <strong>Login Failed</strong>
              <p style={{ margin: '4px 0 0 0' }}>{error}</p>
            </div>
          )}

          {/* Login Form */}
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input
                id="username"
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Enter your username"
                required
                disabled={loading}
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
                disabled={loading}
              />
            </div>

            <button 
              type="submit" 
              className="btn btn-primary"
              disabled={loading}
              style={{ width: '100%', fontSize: '1rem', padding: '12px' }}
            >
              {loading ? '⏳ Logging in...' : '🔐 Sign In'}
            </button>
          </form>

          {/* Demo Credentials Info */}
          <div style={{
            marginTop: 'var(--spacing-xl)',
            padding: 'var(--spacing-lg)',
            backgroundColor: 'var(--light)',
            borderRadius: '8px',
            borderLeft: '4px solid var(--primary)',
          }}>
            <p style={{ margin: '0 0 8px 0', fontWeight: '600', fontSize: '0.85rem', textTransform: 'uppercase', color: 'var(--primary)' }}>
              Demo Credentials
            </p>
            <p style={{ margin: '0', fontSize: '0.9rem', color: 'var(--gray)' }}>
              <strong>Username:</strong> admin
            </p>
            <p style={{ margin: '4px 0 0 0', fontSize: '0.9rem', color: 'var(--gray)' }}>
              <strong>Password:</strong> changeme123
            </p>
          </div>

          {/* Back to Home */}
          <div style={{ textAlign: 'center', marginTop: 'var(--spacing-xl)' }}>
            <p style={{ color: 'var(--gray)', fontSize: '0.9rem', margin: '0' }}>
              <Link href="/" style={{ color: 'var(--primary)' }}>← Back to Home</Link>
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
