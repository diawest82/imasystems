'use client';

import Link from 'next/link';

export default function About() {
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
            <Link href="/about" className="nav-active" style={{ marginRight: '24px', textDecoration: 'none', color: 'var(--text-primary)', borderBottom: '2px solid var(--accent)' }}>About</Link>
            <Link href="/contact" style={{ marginRight: '24px', textDecoration: 'none', color: 'var(--text-primary)' }}>Contact</Link>
          </nav>
        </div>
      </header>

      <div className="container" style={{ maxWidth: '1000px', margin: '0 auto', padding: '0 40px' }}>
        {/* Hero */}
        <section style={{ paddingTop: '80px', paddingBottom: '80px', borderBottom: '1px solid var(--border)' }}>
          <h1 style={{
            fontSize: '56px',
            marginBottom: '24px',
            fontFamily: 'var(--font-serif)',
            textAlign: 'center',
            letterSpacing: '-0.02em'
          }}>
            About IMA Systems
          </h1>
          <p style={{
            fontSize: '18px',
            color: 'var(--text-secondary)',
            lineHeight: 1.8,
            maxWidth: '700px',
            margin: '0 auto',
            textAlign: 'center'
          }}>
            Founded by leaders in enterprise technology, IMA Systems Group is building the next generation of intelligent systems.
          </p>
        </section>

        {/* Who We Are */}
        <section style={{ paddingTop: '80px', paddingBottom: '80px', borderBottom: '1px solid var(--border)' }}>
          <h2 style={{
            fontSize: '40px',
            marginBottom: '48px',
            fontFamily: 'var(--font-serif)',
            letterSpacing: '-0.02em'
          }}>
            Who We Are
          </h2>
          <div style={{ maxWidth: '700px', margin: '0 auto' }}>
            <p style={{
              fontSize: '18px',
              color: 'var(--text-secondary)',
              lineHeight: 1.8,
              marginBottom: '24px'
            }}>
              IMA Systems Group was founded by a team of experienced technologists who share a vision for enterprise intelligence. Our team brings together expertise from leading technology companies and research institutions.
            </p>
            <p style={{
              fontSize: '18px',
              color: 'var(--text-secondary)',
              lineHeight: 1.8,
              marginBottom: '24px'
            }}>
              We're headquartered in the United States and backed by leading investors who share our commitment to excellence and innovation.
            </p>
            <p style={{
              fontSize: '18px',
              color: 'var(--text-secondary)',
              lineHeight: 1.8
            }}>
              Our focus is unwavering: build intelligent systems that earn the trust of the world's leading organizations.
            </p>
          </div>
        </section>

        {/* What We're Building */}
        <section style={{ paddingTop: '80px', paddingBottom: '80px', borderBottom: '1px solid var(--border)' }}>
          <h2 style={{
            fontSize: '40px',
            marginBottom: '48px',
            fontFamily: 'var(--font-serif)',
            letterSpacing: '-0.02em'
          }}>
            What We're Building
          </h2>
          <div style={{ maxWidth: '700px', margin: '0 auto' }}>
            <p style={{
              fontSize: '18px',
              color: 'var(--text-secondary)',
              lineHeight: 1.8,
              marginBottom: '24px',
              fontStyle: 'italic'
            }}>
              Something extraordinary.
            </p>
            <p style={{
              fontSize: '18px',
              color: 'var(--text-secondary)',
              lineHeight: 1.8,
              marginBottom: '24px'
            }}>
              We're developing enterprise-grade intelligent platforms that combine cutting-edge technology with principled design. Every detail matters.
            </p>
            <p style={{
              fontSize: '18px',
              color: 'var(--text-secondary)',
              lineHeight: 1.8,
              marginBottom: '24px'
            }}>
              Security, elegance, and trust are built into every layer of what we create. We're not rushing. We're focused on getting every detail right.
            </p>
            <p style={{
              fontSize: '18px',
              color: 'var(--text-secondary)',
              lineHeight: 1.8
            }}>
              Full technical details will be shared as we approach launch.
            </p>
          </div>
        </section>

        {/* Our Approach */}
        <section style={{ paddingTop: '80px', paddingBottom: '80px', borderBottom: '1px solid var(--border)' }}>
          <h2 style={{
            fontSize: '40px',
            marginBottom: '48px',
            fontFamily: 'var(--font-serif)',
            letterSpacing: '-0.02em'
          }}>
            Our Approach
          </h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '32px'
          }}>
            {[
              {
                title: 'Excellence in Every Detail',
                desc: 'From product design to customer experience, we maintain the highest standards. Excellence is our baseline, not our goal.'
              },
              {
                title: 'Enterprise Trust',
                desc: 'We earn trust through consistent delivery, transparent practices, and unwavering commitment to our customers.'
              },
              {
                title: 'Elegant Solutions',
                desc: 'We believe sophistication and simplicity can coexist. Our systems are powerful yet elegant.'
              }
            ].map((item, idx) => (
              <div key={idx} style={{
                padding: '32px',
                border: '1px solid var(--border)',
                borderRadius: '4px',
                background: 'var(--bg-primary)'
              }}>
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

        {/* Coming Soon */}
        <section style={{ paddingTop: '80px', paddingBottom: '80px' }}>
          <div style={{
            background: 'var(--bg-secondary)',
            color: '#f5f1e8',
            padding: '60px 40px',
            borderRadius: '4px',
            textAlign: 'center'
          }}>
            <h2 style={{
              fontSize: '40px',
              marginBottom: '24px',
              fontFamily: 'var(--font-serif)',
              letterSpacing: '-0.02em'
            }}>
              Coming Soon
            </h2>
            <p style={{
              fontSize: '18px',
              marginBottom: '32px',
              color: '#f5f1e8',
              opacity: 0.95
            }}>
              We're shipping something special. Detailed information about our technology and approach will be available as we prepare for launch.
            </p>
            <Link href="/#early-access" style={{
              display: 'inline-block',
              background: '#f5f1e8',
              color: 'var(--bg-secondary)',
              padding: '14px 32px',
              borderRadius: '4px',
              textDecoration: 'none',
              fontWeight: 600,
              transition: 'all 300ms ease'
            }}
            onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
            onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
            >
              Join Early Access List
            </Link>
          </div>
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
