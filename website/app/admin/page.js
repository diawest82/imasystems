'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { api } from '@/lib/api';
import { auth } from '@/lib/auth';
import '../styles/globals.css';

export default function AdminDashboard() {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [patents, setPatents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all'); // all, published, draft

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    const token = auth.getToken();
    if (!token) {
      router.push('/admin/login');
      return;
    }

    try {
      const response = await api.getCurrentUser(token);
      setUser(response.data);
      loadPatents();
    } catch (error) {
      auth.logout();
      router.push('/admin/login');
    }
  };

  const loadPatents = async () => {
    try {
      const response = await api.getPatents();
      setPatents(response.data || []);
    } catch (error) {
      console.error('Error loading patents:', error);
      setPatents([]);
    } finally {
      setLoading(false);
    }
  };

  const deletePatent = async (id) => {
    if (confirm('Are you sure you want to delete this patent?')) {
      try {
        await api.deletePatent(id);
        setPatents(patents.filter(p => p.id !== id));
      } catch (error) {
        console.error('Error deleting patent:', error);
      }
    }
  };

  const handleLogout = () => {
    auth.logout();
    router.push('/');
  };

  const filteredPatents = patents.filter(p => {
    if (filter === 'published') return p.is_published;
    if (filter === 'draft') return !p.is_published;
    return true;
  });

  const stats = {
    total: patents.length,
    published: patents.filter(p => p.is_published).length,
    draft: patents.filter(p => !p.is_published).length,
  };

  if (!user) {
    return <div className="container" style={{ padding: '40px' }}>Loading...</div>;
  }

  return (
    <main className="container">
      {/* Admin Header */}
      <div className="admin-header">
        <div>
          <h1>Admin Dashboard</h1>
          <p style={{ color: 'var(--gray)', marginBottom: 0 }}>Welcome back, <strong>{user.username}</strong></p>
        </div>
        <button onClick={handleLogout} className="btn btn-secondary">
          Logout
        </button>
      </div>

      <div className="admin-content">
        {/* Main Content */}
        <div className="admin-main">
          {/* Quick Stats */}
          <div className="stats-section" style={{ marginBottom: '40px' }}>
            <div className="stats-grid">
              <div className="stat-item">
                <div className="stat-number">{stats.total}</div>
                <div className="stat-label">Total Patents</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">{stats.published}</div>
                <div className="stat-label">Published</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">{stats.draft}</div>
                <div className="stat-label">Drafts</div>
              </div>
            </div>
          </div>

          {/* Patents Management */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
              <h2>Patents Management</h2>
              <Link href="/admin/patents/new" className="btn btn-primary">
                + Add New Patent
              </Link>
            </div>

            {/* Filter Tabs */}
            <div style={{ display: 'flex', gap: '12px', marginBottom: '24px', borderBottom: '2px solid var(--border)', paddingBottom: '12px' }}>
              {['all', 'published', 'draft'].map(f => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  style={{
                    padding: '8px 16px',
                    border: 'none',
                    background: 'none',
                    cursor: 'pointer',
                    textTransform: 'capitalize',
                    fontWeight: '600',
                    borderBottom: filter === f ? '3px solid var(--primary)' : 'none',
                    color: filter === f ? 'var(--primary)' : 'var(--gray)',
                    transition: 'all var(--transition-base)',
                  }}
                >
                  {f}
                </button>
              ))}
            </div>

            {/* Patents List */}
            {loading ? (
              <div className="loading">Loading patents...</div>
            ) : filteredPatents.length > 0 ? (
              <div className="patents-list">
                {filteredPatents.map((patent) => (
                  <div key={patent.id} className="patent-list-item">
                    <div className="patent-list-info">
                      <h4>{patent.title}</h4>
                      <p>{patent.description?.substring(0, 100)}...</p>
                    </div>
                    <span className={`patent-list-status ${patent.is_published ? 'published' : 'draft'}`}>
                      {patent.is_published ? '✓ Published' : '• Draft'}
                    </span>
                    <div className="patent-list-actions">
                      <Link href={`/admin/patents/${patent.id}`} className="btn btn-primary btn-small">
                        Edit
                      </Link>
                      <button
                        onClick={() => deletePatent(patent.id)}
                        className="btn btn-danger btn-small"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="empty-state">
                <h3>
                  {filter === 'all' ? 'No Patents Yet' : `No ${filter} Patents`}
                </h3>
                <p>
                  {filter === 'all' 
                    ? 'Create your first patent to get started.' 
                    : `Try changing the filter or create a new patent.`}
                </p>
                <Link href="/admin/patents/new" className="cta-button" style={{ marginTop: '16px' }}>
                  Create First Patent →
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* Sidebar */}
        <aside className="admin-sidebar">
          <h3>Quick Links</h3>
          <div className="admin-sidebar-item">
            <Link href="/" style={{ display: 'block', padding: '8px 12px', borderRadius: '6px' }}>
              View Website
            </Link>
          </div>
          <div className="admin-sidebar-item">
            <Link href="/patents" style={{ display: 'block', padding: '8px 12px', borderRadius: '6px' }}>
              Public Patents
            </Link>
          </div>
          
          <h3 style={{ marginTop: '24px' }}>System Info</h3>
          <div style={{ fontSize: '0.85rem', color: 'var(--gray)', padding: '12px' }}>
            <p><strong>User:</strong> {user.username}</p>
            <p><strong>Role:</strong> Administrator</p>
            <p style={{ fontSize: '0.75rem', marginTop: '12px', color: 'var(--gray)' }}>
              Last login: {new Date().toLocaleDateString()}
            </p>
          </div>
        </aside>
      </div>
    </main>
  );
}
