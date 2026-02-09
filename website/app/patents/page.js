'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import '../../styles/globals.css';

export default function PatentsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredPatents, setFilteredPatents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPatents = async () => {
      try {
        const response = await fetch('/api/patents');
        const data = await response.json();
        setFilteredPatents(data);
      } catch (error) {
        console.error('Error fetching patents:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPatents();
  }, []);

  useEffect(() => {
    if (searchTerm) {
      const filtered = filteredPatents.filter(p =>
        p.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredPatents(filtered);
    }
  }, [searchTerm]);

  return (
    <main className="container">
      {/* Header */}
      <header className="header">
        <div className="header-content container">
          <div>
            <h1>Patents & Demonstrations</h1>
            <p className="tagline">Explore our innovative solutions in distributed intelligence</p>
          </div>
          <nav className="nav">
            <Link href="/">Home</Link>
            <Link href="/patents" className="nav-active">Patents & Demos</Link>
          </nav>
        </div>
      </header>

      {/* Search Bar */}
      <div style={{
        background: 'white',
        padding: 'var(--spacing-xl)',
        borderRadius: '12px',
        marginBottom: 'var(--spacing-xl)',
        boxShadow: 'var(--shadow-md)',
      }}>
        <input
          type="text"
          placeholder="🔍 Search patents by title or description..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={{
            width: '100%',
            padding: 'var(--spacing-md)',
            border: '1px solid var(--border)',
            borderRadius: '8px',
            fontSize: '1rem',
            fontFamily: 'var(--font-family)',
          }}
        />
      </div>

      {/* Patents Section */}
      <section className="patents-section">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 'var(--spacing-xl)' }}>
          <h2>Published Patents ({filteredPatents.length})</h2>
          <Link href="/" className="view-more">← Back Home</Link>
        </div>

        {loading ? (
          <div className="loading">Loading patents...</div>
        ) : filteredPatents.length > 0 ? (
          <div className="patents-grid">
            {filteredPatents.map((patent) => (
              <div key={patent.id} className="patent-card">
                <span className="patent-card-badge">Patent #{patent.id}</span>
                <h3>{patent.title}</h3>
                <p>{patent.description}</p>

                {patent.video_url && (
                  <div className="video-container">
                    <iframe
                      src={patent.video_url}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                    />
                  </div>
                )}

                <div className="patent-meta">
                  <span>📅 {new Date(patent.created_at).getFullYear()}</span>
                  <span>✓ Published</span>
                </div>

                <Link href={`/patents/${patent.id}`} className="view-more">
                  Learn More →
                </Link>
              </div>
            ))}
          </div>
        ) : searchTerm ? (
          <div className="empty-state">
            <h3>No Results Found</h3>
            <p>Try searching with different keywords or <Link href="/patents" style={{ color: 'var(--primary)' }}>view all patents</Link></p>
          </div>
        ) : (
          <div className="empty-state">
            <h3>No Patents Published Yet</h3>
            <p>Check back soon for our latest innovations and demonstrations.</p>
            <Link href="/" className="cta-button" style={{ marginTop: 'var(--spacing-lg)' }}>
              Return Home →
            </Link>
          </div>
        )}
      </section>

      {/* Footer */}
      <footer className="footer">
        <p>&copy; 2026 IMA Systems Group, Inc. All rights reserved.</p>
      </footer>
    </main>
  );
}
