'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { auth } from '@/lib/auth';

export default function Home() {
  const [isAdmin, setIsAdmin] = useState(false);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = () => {
    setIsAdmin(auth.isAuthenticated());
  };

  return (
    <main>
      {/* Header */}
      <header className="header">
        <div className="header-content container">
          <div>
            <h1>IMA Systems Group</h1>
            <p className="tagline">The future of intelligent systems</p>
          </div>
          <nav className="nav">
            <Link href="/" className="nav-active">Home</Link>
            {isAdmin ? (
              <Link href="/admin" className="btn-admin">Dashboard</Link>
            ) : (
              <Link href="/admin/login" className="btn-admin">Login</Link>
            )}
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="hero">
        <h2>Building the Future of Intelligent Systems</h2>
        <p>We're pioneering breakthrough technologies that transform how the world works. From concept to deployment, we deliver intelligent solutions that matter.</p>
        <Link href="#mission" className="cta-button">Learn Our Story</Link>
      </section>

      <div className="container">
        {/* Mission Section */}
        <section id="mission" style={{ marginBottom: 'var(--spacing-4xl)', paddingTop: 'var(--spacing-2xl)' }}>
          <h2 style={{ fontSize: 'var(--font-size-3xl)', marginBottom: 'var(--spacing-lg)', fontWeight: 700 }}>Our Mission</h2>
          <p style={{ fontSize: 'var(--font-size-lg)', color: 'var(--text-secondary)', lineHeight: 1.8, maxWidth: 800 }}>
            At IMA Systems Group, we believe that intelligent systems represent the next frontier of human achievement. We're committed to developing technologies that are not just powerful, but thoughtful—designed to enhance human capability, solve real-world problems, and create lasting value for our partners and the broader ecosystem.
          </p>
        </section>

        {/* Vision Section */}
        <section style={{ 
          background: 'var(--bg-secondary)',
          padding: 'var(--spacing-3xl) var(--spacing-xl)',
          borderRadius: 8,
          marginBottom: 'var(--spacing-4xl)'
        }}>
          <h2 style={{ fontSize: 'var(--font-size-3xl)', marginBottom: 'var(--spacing-lg)', fontWeight: 700 }}>Our Vision</h2>
          <div style={{ 
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: 'var(--spacing-xl)',
            marginTop: 'var(--spacing-xl)'
          }}>
            <div>
              <h3 style={{ fontSize: 'var(--font-size-lg)', fontWeight: 600, marginBottom: 'var(--spacing-md)', color: 'var(--accent)' }}>Technology</h3>
              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7 }}>Creating intelligent systems that are reliable, secure, and built for the real world. We invest heavily in research and development to stay at the cutting edge.</p>
            </div>
            <div>
              <h3 style={{ fontSize: 'var(--font-size-lg)', fontWeight: 600, marginBottom: 'var(--spacing-md)', color: 'var(--accent)' }}>Impact</h3>
              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7 }}>Delivering solutions that solve meaningful problems. We measure success not just by innovation, but by the real-world outcomes we enable for our customers.</p>
            </div>
            <div>
              <h3 style={{ fontSize: 'var(--font-size-lg)', fontWeight: 600, marginBottom: 'var(--spacing-md)', color: 'var(--accent)' }}>Excellence</h3>
              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7 }}>Maintaining the highest standards in everything we do. From product quality to customer support, excellence is our baseline, not our goal.</p>
            </div>
          </div>
        </section>

        {/* Why Choose Us */}
        <section style={{ marginBottom: 'var(--spacing-4xl)' }}>
          <h2 style={{ fontSize: 'var(--font-size-3xl)', marginBottom: 'var(--spacing-2xl)', fontWeight: 700, textAlign: 'center' }}>Why Choose IMA Systems</h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 'var(--spacing-xl)',
            marginTop: 'var(--spacing-xl)'
          }}>
            {[
              { title: 'Proven Expertise', desc: 'Years of experience delivering enterprise-grade intelligent systems' },
              { title: 'Cutting-Edge Tech', desc: 'Always on the forefront of technological advancement and innovation' },
              { title: 'Customer-First', desc: 'Your success is our success. We partner with you, not just for you' },
              { title: 'Scalable Solutions', desc: 'From startups to enterprises, our systems grow with your ambitions' }
            ].map((item, idx) => (
              <div key={idx} style={{
                padding: 'var(--spacing-lg)',
                border: '1px solid var(--border)',
                borderRadius: 8,
                transition: 'all var(--transition-base)'
              }}
              onMouseEnter={(e) => e.currentTarget.style.boxShadow = 'var(--shadow-md)'}
              onMouseLeave={(e) => e.currentTarget.style.boxShadow = 'none'}>
                <h3 style={{ fontSize: 'var(--font-size-lg)', fontWeight: 600, marginBottom: 'var(--spacing-sm)', color: 'var(--text-primary)' }}>
                  {item.title}
                </h3>
                <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, margin: 0 }}>
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA Section */}
        <section style={{
          background: 'var(--accent)',
          color: 'white',
          padding: 'var(--spacing-3xl) var(--spacing-xl)',
          borderRadius: 8,
          textAlign: 'center',
          marginBottom: 'var(--spacing-3xl)'
        }}>
          <h2 style={{ fontSize: 'var(--font-size-3xl)', fontWeight: 700, marginBottom: 'var(--spacing-md)' }}>
            Get Started with IMA Systems
          </h2>
          <p style={{ fontSize: 'var(--font-size-lg)', marginBottom: 'var(--spacing-lg)', opacity: 0.95 }}>
            Join us in building the future of intelligent systems.
          </p>
          <Link href="/admin/login" className="cta-button" style={{ background: 'white', color: 'var(--accent)' }}>
            Sign In
          </Link>
        </section>
      </div>

      {/* Footer */}
      <footer style={{
        background: 'var(--bg-tertiary)',
        border: '1px solid var(--border)',
        padding: 'var(--spacing-2xl) 0',
        textAlign: 'center',
        marginTop: 'var(--spacing-2xl)'
      }}>
        <p style={{ color: 'var(--text-secondary)', margin: 0 }}>
          © 2026 IMA Systems Group, Inc. All rights reserved.
        </p>
      </footer>
    </main>
  );
}
