'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import '../styles/globals.css';
import QuantumSafeIndicator from '../components/QuantumSafeIndicator.jsx';

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
      const response = await fetch('/api/hub/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.detail || 'Login failed');
      }

      // Store hub session token
      localStorage.setItem('hub_token', data.hub_token);
      localStorage.setItem('hub_user', JSON.stringify(data.user));

      router.push('/hub');
    } catch (err) {
      setError(err.message || 'Failed to login');
      console.error('Hub login error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="container" style={{ maxWidth: '500px', margin: '50px auto' }}>
      <div style={{
        background: 'white',
        padding: 'var(--spacing-xl)',
        borderRadius: '12px',
        boxShadow: 'var(--shadow-lg)',
      }}>
        <h1 style={{ textAlign: 'center', marginBottom: 'var(--spacing-xl)' }}>
          Cloud Hub Access
        </h1>

        <div style={{ marginBottom: 'var(--spacing-lg)' }}>
          <QuantumSafeIndicator label="Secure Hub Connection" />
        </div>

        {error && (
          <div className="alert alert-error" style={{ marginBottom: 'var(--spacing-lg)' }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="your.email@example.com"
              required
              disabled={loading}
            />
          </div>

          <div className="form-group">
            <label>Password</label>
            <input
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
            style={{ width: '100%' }}
          >
            {loading ? 'Connecting to Hub...' : 'Connect to Hub'}
          </button>
        </form>

        <div style={{
          marginTop: 'var(--spacing-xl)',
          padding: 'var(--spacing-lg)',
          backgroundColor: 'var(--light)',
          borderRadius: '8px',
          borderLeft: '4px solid var(--primary)',
        }}>
          <p style={{ margin: '0 0 8px 0', fontWeight: '600', fontSize: '0.85rem', color: 'var(--primary)' }}>
            🔐 Hub Portal Features
          </p>
          <ul style={{ margin: '8px 0', paddingLeft: '20px', fontSize: '0.9rem', color: 'var(--gray)' }}>
            <li>Access all cloud hub resources</li>
            <li>Create and manage idea projects</li>
            <li>Chat with the hub system</li>
            <li>Work across all workspaces</li>
            <li>Real-time knowledge sync</li>
          </ul>
        </div>

        <div style={{ textAlign: 'center', marginTop: 'var(--spacing-xl)' }}>
          <a href="/" style={{ color: 'var(--primary)', textDecoration: 'none', fontSize: '0.9rem' }}>
            ← Back to Home
          </a>
        </div>
      </div>
    </main>
  );
}
