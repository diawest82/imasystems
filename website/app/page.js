'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Logo from '../components/Logo';
import { auth } from '../lib/auth';

export default function Home() {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = () => {
    setIsAdmin(auth.isAuthenticated());
  };

  const handleEarlyAccess = (e) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
      setTimeout(() => {
        setEmail('');
        setSubmitted(false);
      }, 3000);
    }
  };

  return (
    <main style={{ background: 'var(--bg-primary)', color: 'var(--text-primary)' }}>
      {/* Header */}
      <header className="header" style={{ background: 'var(--bg-primary)', borderBottom: '1px solid var(--border)' }}>
        <div className="header-content container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '16px 24px', width: '100%', gap: '32px', minHeight: '60px' }}>
          <div style={{ minWidth: '140px', flexShrink: 0 }}>
            <Logo variant="default" size="normal" />
          </div>
          <nav className="nav" style={{ display: 'flex', gap: '24px', alignItems: 'center', flexWrap: 'nowrap', marginLeft: 'auto' }}>
            <Link href="/" className="nav-active" style={{ textDecoration: 'none', color: 'var(--text-primary)', whiteSpace: 'nowrap' }}>Home</Link>
            <Link href="/about" style={{ textDecoration: 'none', color: 'var(--text-primary)', whiteSpace: 'nowrap' }}>About</Link>
            <Link href="/contact" style={{ textDecoration: 'none', color: 'var(--text-primary)', whiteSpace: 'nowrap' }}>Contact</Link>
            {isAdmin ? (
              <Link href="/admin" className="btn-admin" style={{ background: 'var(--accent)', color: 'white', padding: '10px 16px', borderRadius: '4px', textDecoration: 'none', whiteSpace: 'nowrap' }}>Dashboard</Link>
            ) : (
              <Link href="/admin/login" className="btn-admin" style={{ background: 'var(--accent)', color: 'white', padding: '10px 16px', borderRadius: '4px', textDecoration: 'none', whiteSpace: 'nowrap' }}>Login</Link>
            )}
          </nav>
        </div>
      </header>

      {/* Hero Section - Premium Stealth */}
      <section style={{
        background: 'var(--bg-secondary)',
        color: '#f5f1e8',
        padding: '120px 40px',
        textAlign: 'center',
        minHeight: '600px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        borderBottom: '1px solid var(--border)'
      }}>
        <h2 style={{
          fontSize: '56px',
          margin: '0 0 24px 0',
          fontFamily: 'var(--font-serif)',
          fontWeight: 700,
          letterSpacing: '-0.02em',
          maxWidth: '800px',
          lineHeight: 1.2
        }}>
          Building Tomorrow's<br />Intelligent Systems
        </h2>
        <p style={{
          fontSize: '20px',
          margin: '0 0 12px 0',
          color: '#f5f1e8',
          opacity: 0.95,
          maxWidth: '600px'
        }}>
          Enterprise intelligence platforms designed with elegance
        </p>
        <p style={{
          fontSize: '18px',
          margin: '0 0 40px 0',
          color: 'var(--accent-light)',
          fontStyle: 'italic',
          maxWidth: '600px'
        }}>
          Details coming soon
        </p>
        <button 
          onClick={() => document.getElementById('early-access').scrollIntoView({ behavior: 'smooth' })}
          style={{
            background: '#f5f1e8',
            color: 'var(--bg-secondary)',
            border: '1px solid #f5f1e8',
            padding: '14px 32px',
            borderRadius: '4px',
            fontSize: '16px',
            fontWeight: 600,
            cursor: 'pointer',
            transition: 'all 300ms ease',
            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)'
          }}
          onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
          onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
        >
          Request Early Access
        </button>
      </section>

      <div className="container" style={{ maxWidth: '1000px', margin: '0 auto', padding: '0 40px' }}>
        {/* Brand Statement */}
        <section style={{ paddingTop: '80px', paddingBottom: '80px', borderBottom: '1px solid var(--border)' }}>
          <h2 style={{
            fontSize: '40px',
            marginBottom: '32px',
            fontFamily: 'var(--font-serif)',
            textAlign: 'center',
            letterSpacing: '-0.02em'
          }}>
            Engineered for Excellence
          </h2>
          <p style={{
            fontSize: '18px',
            color: 'var(--text-secondary)',
            lineHeight: 1.8,
            maxWidth: '700px',
            margin: '0 auto',
            textAlign: 'center'
          }}>
            We develop intelligent systems that power enterprise decisions. Our approach combines cutting-edge innovation with unwavering commitment to excellence, elegance, and trust. Full details about our platform will be shared as we approach launch.
          </p>
        </section>

        {/* Coming Soon */}
        <section style={{ paddingTop: '80px', paddingBottom: '80px', borderBottom: '1px solid var(--border)' }}>
          <h2 style={{
            fontSize: '40px',
            marginBottom: '24px',
            fontFamily: 'var(--font-serif)',
            textAlign: 'center',
            letterSpacing: '-0.02em'
          }}>
            Something Extraordinary
          </h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
            gap: '32px',
            marginTop: '48px'
          }}>
            {[
              {
                title: 'Intelligence Meets Elegance',
                desc: 'Sophisticated systems designed for enterprise excellence'
              },
              {
                title: 'Security Built In',
                desc: 'Enterprise-grade security from inception, not afterthought'
              },
              {
                title: 'Enterprise Trust',
                desc: 'Engineered to earn the trust of the world\'s leading organizations'
              }
            ].map((item, idx) => (
              <div key={idx} style={{
                padding: '40px',
                border: '1px solid var(--border)',
                borderRadius: '4px',
                background: 'var(--bg-primary)',
                transition: 'all 300ms ease'
              }}
              onMouseEnter={(e) => e.currentTarget.style.boxShadow = '0 8px 24px rgba(0, 0, 0, 0.08)'}
              onMouseLeave={(e) => e.currentTarget.style.boxShadow = 'none'}>
                <h3 style={{
                  fontSize: '20px',
                  fontWeight: 600,
                  marginBottom: '12px',
                  color: 'var(--accent)',
                  fontFamily: 'var(--font-serif)'
                }}>
                  {item.title}
                </h3>
                <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, margin: 0 }}>
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* Values */}
        <section style={{ paddingTop: '80px', paddingBottom: '80px', borderBottom: '1px solid var(--border)' }}>
          <h2 style={{
            fontSize: '40px',
            marginBottom: '48px',
            fontFamily: 'var(--font-serif)',
            textAlign: 'center',
            letterSpacing: '-0.02em'
          }}>
            Our Approach
          </h2>
          <div style={{ maxWidth: '700px', margin: '0 auto' }}>
            <div style={{ marginBottom: '32px', paddingBottom: '32px', borderBottom: '1px solid var(--border)' }}>
              <h3 style={{
                fontSize: '20px',
                marginBottom: '12px',
                color: 'var(--accent)',
                fontFamily: 'var(--font-serif)'
              }}>
                Excellence in Every Detail
              </h3>
              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, margin: 0 }}>
                From product design to customer experience, we maintain the highest standards in everything we do.
              </p>
            </div>
            <div style={{ marginBottom: '32px', paddingBottom: '32px', borderBottom: '1px solid var(--border)' }}>
              <h3 style={{
                fontSize: '20px',
                marginBottom: '12px',
                color: 'var(--accent)',
                fontFamily: 'var(--font-serif)'
              }}>
                Enterprise Trust Through Integrity
              </h3>
              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, margin: 0 }}>
                We earn trust through consistent delivery, transparent practices, and unwavering commitment to our customers.
              </p>
            </div>
            <div>
              <h3 style={{
                fontSize: '20px',
                marginBottom: '12px',
                color: 'var(--accent)',
                fontFamily: 'var(--font-serif)'
              }}>
                Elegant Solutions to Complex Problems
              </h3>
              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, margin: 0 }}>
                We believe that sophistication and simplicity can coexist. Our systems are powerful yet elegant.
              </p>
            </div>
          </div>
        </section>
      </div>

      {/* Early Access CTA */}
      <section id="early-access" style={{
        background: 'var(--bg-secondary)',
        color: '#f5f1e8',
        padding: '80px 40px',
        textAlign: 'center',
        borderBottom: '1px solid var(--border)'
      }}>
        <h2 style={{
          fontSize: '40px',
          fontWeight: 700,
          marginBottom: '24px',
          fontFamily: 'var(--font-serif)',
          letterSpacing: '-0.02em'
        }}>
          Get First Access
        </h2>
        <p style={{
          fontSize: '18px',
          marginBottom: '32px',
          color: '#f5f1e8',
          opacity: 0.95,
          maxWidth: '600px',
          margin: '0 auto 32px'
        }}>
          Be among the first to experience what we're creating.
        </p>
        
        {submitted ? (
          <div style={{
            background: 'rgba(245, 241, 232, 0.1)',
            border: '1px solid var(--accent-light)',
            padding: '24px',
            borderRadius: '4px',
            maxWidth: '400px',
            margin: '0 auto'
          }}>
            <p style={{ color: '#f5f1e8', margin: 0, fontSize: '18px' }}>
              ✓ Thank you for your interest.
            </p>
            <p style={{ color: 'var(--accent-light)', margin: '8px 0 0 0' }}>
              We'll be in touch as we approach launch.
            </p>
          </div>
        ) : (
          <form onSubmit={handleEarlyAccess} style={{
            display: 'flex',
            gap: '12px',
            justifyContent: 'center',
            maxWidth: '500px',
            margin: '0 auto',
            flexWrap: 'wrap'
          }}>
            <input
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{
                padding: '14px 16px',
                borderRadius: '4px',
                border: '1px solid var(--accent-light)',
                background: '#f5f1e8',
                color: 'var(--text-primary)',
                fontSize: '16px',
                minWidth: '250px'
              }}
            />
            <button
              type="submit"
              style={{
                background: '#f5f1e8',
                color: 'var(--bg-secondary)',
                border: '1px solid #f5f1e8',
                padding: '14px 32px',
                borderRadius: '4px',
                fontSize: '16px',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 300ms ease'
              }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
            >
              Request Access
            </button>
          </form>
        )}
      </section>

      {/* Footer */}
      <footer style={{
        background: 'var(--bg-primary)',
        border: '1px solid var(--border)',
        padding: '48px 40px',
        textAlign: 'center'
      }}>
        <p style={{ color: 'var(--text-secondary)', margin: '0 0 16px 0' }}>
          © 2026 IMA Systems Group, Inc. All rights reserved.
        </p>
        <div style={{ fontSize: '14px', color: 'var(--text-tertiary)' }}>
          <Link href="/privacy" style={{ color: 'var(--accent)', textDecoration: 'none', marginRight: '16px' }}>Privacy</Link>
          <Link href="/terms" style={{ color: 'var(--accent)', textDecoration: 'none' }}>Terms</Link>
        </div>
      </footer>
    </main>
  );
}
