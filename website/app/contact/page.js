'use client';

import Link from 'next/link';
import { useState } from 'react';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', company: '', email: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setFormData({ name: '', company: '', email: '', message: '' });
      setSubmitted(false);
    }, 3000);
  };

  return (
    <main style={{ background: 'var(--bg-primary)', color: 'var(--text-primary)' }}>
      {/* Header */}
      <header className="header" style={{ background: 'var(--bg-primary)', borderBottom: '1px solid var(--border)' }}>
        <div className="header-content container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h1 style={{ margin: 0, fontSize: '28px', fontFamily: 'var(--font-serif)', letterSpacing: '-0.02em' }}>IMA SYSTEMS GROUP</h1>
          </div>
          <nav className="nav">
            <Link href="/" style={{ marginRight: '24px', textDecoration: 'none', color: 'var(--text-primary)' }}>Home</Link>
            <Link href="/about" style={{ marginRight: '24px', textDecoration: 'none', color: 'var(--text-primary)' }}>About</Link>
            <Link href="/contact" className="nav-active" style={{ marginRight: '24px', textDecoration: 'none', color: 'var(--text-primary)', borderBottom: '2px solid var(--accent)' }}>Contact</Link>
          </nav>
        </div>
      </header>

      <div className="container" style={{ maxWidth: '800px', margin: '0 auto', padding: '0 40px' }}>
        {/* Hero */}
        <section style={{ paddingTop: '80px', paddingBottom: '80px', borderBottom: '1px solid var(--border)' }}>
          <h1 style={{
            fontSize: '56px',
            marginBottom: '24px',
            fontFamily: 'var(--font-serif)',
            textAlign: 'center',
            letterSpacing: '-0.02em'
          }}>
            Get in Touch
          </h1>
          <p style={{
            fontSize: '18px',
            color: 'var(--text-secondary)',
            lineHeight: 1.8,
            textAlign: 'center'
          }}>
            We'd love to hear from you. Send us a message and we'll respond as soon as possible.
          </p>
        </section>

        {/* Contact Info */}
        <section style={{ paddingTop: '80px', paddingBottom: '80px', borderBottom: '1px solid var(--border)' }}>
          <h2 style={{
            fontSize: '24px',
            marginBottom: '32px',
            fontFamily: 'var(--font-serif)',
            letterSpacing: '-0.02em'
          }}>
            Contact Information
          </h2>
          <div style={{ display: 'grid', gap: '24px' }}>
            <div>
              <p style={{ fontSize: '14px', color: 'var(--accent)', fontWeight: 600, margin: '0 0 8px 0', textTransform: 'uppercase' }}>General Inquiries</p>
              <p style={{ fontSize: '18px', color: 'var(--text-primary)', margin: 0 }}>
                <a href="mailto:contact@imasystems.com" style={{ color: 'var(--text-primary)', textDecoration: 'none' }}>
                  contact@imasystems.com
                </a>
              </p>
            </div>
            <div>
              <p style={{ fontSize: '14px', color: 'var(--accent)', fontWeight: 600, margin: '0 0 8px 0', textTransform: 'uppercase' }}>Press & Media</p>
              <p style={{ fontSize: '18px', color: 'var(--text-primary)', margin: 0 }}>
                <a href="mailto:press@imasystems.com" style={{ color: 'var(--text-primary)', textDecoration: 'none' }}>
                  press@imasystems.com
                </a>
              </p>
            </div>
            <div>
              <p style={{ fontSize: '14px', color: 'var(--accent)', fontWeight: 600, margin: '0 0 8px 0', textTransform: 'uppercase' }}>Partnerships</p>
              <p style={{ fontSize: '18px', color: 'var(--text-primary)', margin: 0 }}>
                <a href="mailto:partners@imasystems.com" style={{ color: 'var(--text-primary)', textDecoration: 'none' }}>
                  partners@imasystems.com
                </a>
              </p>
            </div>
            <div>
              <p style={{ fontSize: '14px', color: 'var(--accent)', fontWeight: 600, margin: '0 0 8px 0', textTransform: 'uppercase' }}>Early Access</p>
              <p style={{ fontSize: '18px', color: 'var(--text-primary)', margin: 0 }}>
                <a href="mailto:early-access@imasystems.com" style={{ color: 'var(--text-primary)', textDecoration: 'none' }}>
                  early-access@imasystems.com
                </a>
              </p>
            </div>
          </div>
        </section>

        {/* Contact Form */}
        <section style={{ paddingTop: '80px', paddingBottom: '80px' }}>
          <h2 style={{
            fontSize: '24px',
            marginBottom: '32px',
            fontFamily: 'var(--font-serif)',
            letterSpacing: '-0.02em'
          }}>
            Send us a Message
          </h2>

          {submitted ? (
            <div style={{
              background: 'rgba(107, 142, 127, 0.1)',
              border: '1px solid var(--accent)',
              padding: '32px',
              borderRadius: '4px',
              textAlign: 'center'
            }}>
              <p style={{
                fontSize: '18px',
                color: 'var(--accent)',
                margin: 0,
                fontWeight: 600
              }}>
                ✓ Thank you for reaching out.
              </p>
              <p style={{
                fontSize: '16px',
                color: 'var(--text-secondary)',
                margin: '8px 0 0 0'
              }}>
                We'll get back to you shortly.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600, color: 'var(--text-primary)' }}>
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    borderRadius: '4px',
                    border: '1px solid var(--border)',
                    background: 'var(--bg-primary)',
                    color: 'var(--text-primary)',
                    fontSize: '16px',
                    fontFamily: 'inherit'
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600, color: 'var(--text-primary)' }}>
                  Company (Optional)
                </label>
                <input
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    borderRadius: '4px',
                    border: '1px solid var(--border)',
                    background: 'var(--bg-primary)',
                    color: 'var(--text-primary)',
                    fontSize: '16px',
                    fontFamily: 'inherit'
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600, color: 'var(--text-primary)' }}>
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    borderRadius: '4px',
                    border: '1px solid var(--border)',
                    background: 'var(--bg-primary)',
                    color: 'var(--text-primary)',
                    fontSize: '16px',
                    fontFamily: 'inherit'
                  }}
                />
              </div>

              <div>
                <label style={{ display: 'block', marginBottom: '8px', fontWeight: 600, color: 'var(--text-primary)' }}>
                  Message
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="6"
                  style={{
                    width: '100%',
                    padding: '12px 16px',
                    borderRadius: '4px',
                    border: '1px solid var(--border)',
                    background: 'var(--bg-primary)',
                    color: 'var(--text-primary)',
                    fontSize: '16px',
                    fontFamily: 'inherit',
                    resize: 'vertical'
                  }}
                />
              </div>

              <button
                type="submit"
                style={{
                  background: 'var(--bg-secondary)',
                  color: '#f5f1e8',
                  border: '1px solid var(--accent)',
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
                Send Message
              </button>
            </form>
          )}
        </section>
      </div>

      {/* Footer */}
      <footer style={{
        background: 'var(--bg-primary)',
        border: '1px solid var(--border)',
        padding: '48px 40px',
        textAlign: 'center',
        marginTop: '80px'
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
