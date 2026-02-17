# Implementation Guide: 10/10 Website Redesign
## Practical Code Changes & Quick Wins

**Timeline**: 4-6 hours for full implementation  
**Effort**: Moderate - CSS + React components, no major refactoring  
**Impact**: Transforms from 5/10 → 10/10 aesthetic

---

## Phase 1: Color System Update (30 minutes)

### Updated CSS Variables
```css
/* website/styles/globals.css - Replace :root variables */

:root {
  /* PRIMARY COLORS */
  --color-primary-dark: #0a0e27;      /* Main background */
  --color-primary-darker: #050812;    /* Footer, accents */
  
  /* ACCENT COLORS - QUANTUM THEME */
  --color-accent-cyan: #00d9ff;       /* Interactive, glow */
  --color-accent-cyan-dark: #00a8cc;  /* Hover states */
  --color-accent-magenta: #ff00ff;    /* Rare accents */
  --color-accent-green: #00ff88;      /* Success, trust */
  --color-accent-orange: #ffaa00;     /* Warnings */
  
  /* SUPPORTING COLORS */
  --color-neutral-cream: #fafbf8;     /* Text, light elements */
  --color-neutral-sage: #6b8e7f;      /* Muted accent, borders */
  --color-neutral-gray: #999999;      /* Secondary text */
  --color-neutral-gray-light: #f5f5f5; /* Light backgrounds */
  
  /* TEXT COLORS */
  --text-primary: #fafbf8;            /* Changed to cream on dark */
  --text-secondary: #c0c0c0;          /* Light gray */
  --text-tertiary: #999999;           /* Muted gray */
  
  /* BACKGROUNDS */
  --bg-primary: #0a0e27;              /* Main background */
  --bg-secondary: #0f1535;            /* Slightly lighter */
  --bg-tertiary: #fafbf8;             /* Light sections */
  
  /* BORDERS */
  --border: #1a2455;                  /* Subtle dark borders */
  --border-light: #c0c0c0;            /* Light borders */
  
  /* SHADOWS & GLOW EFFECTS */
  --shadow-sm: 0 1px 2px rgba(0, 0, 0, 0.2);
  --shadow-md: 0 4px 6px rgba(0, 0, 0, 0.3);
  --shadow-lg: 0 10px 25px rgba(0, 0, 0, 0.4);
  
  --glow-sm: 0 0 15px rgba(0, 217, 255, 0.3);
  --glow-md: 0 0 25px rgba(0, 217, 255, 0.5);
  --glow-lg: 0 0 40px rgba(0, 217, 255, 0.8);
  
  --glow-green-sm: 0 0 15px rgba(0, 255, 136, 0.3);
  --glow-magenta-sm: 0 0 15px rgba(255, 0, 255, 0.3);
  
  /* FILTERS */
  --filter-glow-cyan: drop-shadow(0 0 10px rgba(0, 217, 255, 0.4));
  --filter-glow-green: drop-shadow(0 0 10px rgba(0, 255, 136, 0.4));
  
  /* FONTS */
  --font-heading: 'Syne', 'Space Grotesk', sans-serif;
  --font-body: 'Inter', -apple-system, BlinkMacSystemFont, sans-serif;
  --font-mono: 'IBM Plex Mono', 'Courier New', monospace;
  
  /* SPACING (8px base) */
  --spacing-xs: 4px;
  --spacing-sm: 8px;
  --spacing-md: 16px;
  --spacing-lg: 24px;
  --spacing-xl: 32px;
  --spacing-2xl: 48px;
  --spacing-3xl: 64px;
  
  /* ANIMATIONS */
  --animation-fast: 150ms cubic-bezier(0.4, 0, 0.2, 1);
  --animation-normal: 300ms cubic-bezier(0.4, 0, 0.2, 1);
  --animation-slow: 600ms cubic-bezier(0.4, 0, 0.2, 1);
}

/* DARK MODE OVERALL */
html, body {
  background: var(--bg-primary);
  color: var(--text-primary);
}
```

**Import New Fonts** (Add to layout.js):
```jsx
import { Syne, Space_Grotesk, Inter, IBM_Plex_Mono } from 'next/font/google';

const syne = Syne({ 
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-heading'
});

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-body'
});

const ibmPlexMono = IBM_Plex_Mono({ 
  subsets: ['latin'],
  weight: ['400', '700'],
  variable: '--font-mono'
});

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${syne.variable} ${inter.variable} ${ibmPlexMono.variable}`}>
      <head>
        {/* ... */}
      </head>
      <body>{children}</body>
    </html>
  );
}
```

---

## Phase 2: Hero Section Redesign (2 hours)

### Hero Component with Animations
```jsx
// website/app/components/HeroSection.jsx

'use client';

import { useEffect, useState } from 'react';
import styles from './HeroSection.module.css';

export default function HeroSection() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const handleScroll = () => {
    document.getElementById('vision-section')?.scrollIntoView({ 
      behavior: 'smooth' 
    });
  };

  return (
    <section className={styles.hero}>
      {/* Animated Gradient Background */}
      <div className={styles.gradientBg} />
      
      {/* Floating Particles */}
      <div className={styles.particlesContainer}>
        {[...Array(25)].map((_, i) => (
          <div 
            key={i}
            className={styles.particle}
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              delay: `${i * 0.05}s`,
              duration: `${20 + Math.random() * 10}s`
            }}
          />
        ))}
      </div>

      {/* Content */}
      <div className={styles.content}>
        <h1 className={`${styles.heading} ${isLoaded ? styles.animate : ''}`}>
          Where <span className={styles.accent}>Quantum</span>
          <br />
          <span className={styles.accent}>Meets</span> Intelligence
        </h1>

        <p className={`${styles.subheading} ${isLoaded ? styles.animate : ''}`}>
          Cryptographically Secured AI Systems
        </p>

        <div className={`${styles.ctaContainer} ${isLoaded ? styles.animate : ''}`}>
          <button 
            onClick={handleScroll}
            className={styles.ctaButton}
          >
            <span>⚡ Join Early Access ⚡</span>
            <div className={styles.glowRing} />
          </button>
        </div>

        {/* Scroll Indicator */}
        <div className={`${styles.scrollIndicator} ${isLoaded ? styles.bounce : ''}`}>
          <span>↓ Discover More</span>
        </div>
      </div>
    </section>
  );
}
```

### Hero Styles (CSS Module)
```css
/* website/app/components/HeroSection.module.css */

.hero {
  position: relative;
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  margin-bottom: var(--spacing-2xl);
}

.gradientBg {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    -45deg,
    #0a0e27,
    #00d9ff,
    #0a0e27
  );
  background-size: 200% 200%;
  animation: gradientShift 20s ease infinite;
  z-index: 0;
}

@keyframes gradientShift {
  0% { background-position: 0% 50%; }
  50% { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}

/* Floating Particles */
.particlesContainer {
  position: absolute;
  inset: 0;
  overflow: hidden;
  z-index: 1;
}

.particle {
  position: absolute;
  width: 2px;
  height: 2px;
  background: rgba(0, 217, 255, 0.5);
  border-radius: 50%;
  animation: float linear infinite;
  
  --delay: 0s;
  --duration: 20s;
  
  animation-delay: var(--delay);
  animation-duration: var(--duration);
}

@keyframes float {
  0%, 100% {
    transform: translate(0, 0);
    opacity: 0;
  }
  10% {
    opacity: 0.8;
  }
  90% {
    opacity: 0.8;
  }
  100% {
    transform: translate(
      calc(sin(var(--delay) * 100) * 100px),
      var(--duration, 20s) * -5px
    );
    opacity: 0;
  }
}

/* Content Container */
.content {
  position: relative;
  z-index: 2;
  text-align: center;
  pointer-events: none;
}

.heading {
  font-family: var(--font-heading);
  font-size: clamp(48px, 8vw, 84px);
  font-weight: 900;
  line-height: 1.1;
  letter-spacing: -0.02em;
  color: var(--text-primary);
  margin: 0 0 var(--spacing-lg) 0;
  
  opacity: 0;
  transform: translateY(30px);
}

.heading.animate {
  animation: slideInUp var(--animation-slow) ease-out forwards;
  animation-delay: 200ms;
}

.accent {
  color: var(--color-accent-cyan);
  text-shadow: 0 0 30px rgba(0, 217, 255, 0.5);
}

.subheading {
  font-family: var(--font-body);
  font-size: clamp(18px, 3vw, 28px);
  font-weight: 500;
  color: var(--text-primary);
  margin: 0 0 var(--spacing-2xl) 0;
  
  opacity: 0;
  transform: translateY(30px);
}

.subheading.animate {
  animation: slideInUp var(--animation-slow) ease-out forwards;
  animation-delay: 400ms;
}

/* CTA Container */
.ctaContainer {
  pointer-events: all;
  
  opacity: 0;
  transform: translateY(30px);
}

.ctaContainer.animate {
  animation: slideInUp var(--animation-slow) ease-out forwards;
  animation-delay: 600ms;
}

.ctaButton {
  position: relative;
  display: inline-block;
  padding: 18px 48px;
  font-size: 18px;
  font-weight: 600;
  font-family: var(--font-body);
  color: var(--text-primary);
  background: transparent;
  border: 2px solid var(--color-accent-cyan);
  border-radius: 8px;
  cursor: pointer;
  
  box-shadow: var(--glow-md);
  transition: all var(--animation-normal);
}

.ctaButton:hover {
  transform: scale(1.08);
  box-shadow: var(--glow-lg);
  border-color: #00ffff; /* Even brighter on hover */
}

.ctaButton:active {
  transform: scale(0.98);
}

.glowRing {
  position: absolute;
  inset: 0;
  border: 2px solid var(--color-accent-cyan);
  border-radius: 8px;
  opacity: 0;
  animation: glowPulse 2s ease-in-out infinite;
}

@keyframes glowPulse {
  0%, 100% {
    opacity: 0;
    transform: scale(1);
  }
  50% {
    opacity: 0.5;
    transform: scale(1.1);
  }
}

/* Scroll Indicator */
.scrollIndicator {
  position: absolute;
  bottom: var(--spacing-2xl);
  left: 50%;
  transform: translateX(-50%);
  font-size: 14px;
  color: var(--color-accent-cyan);
  animation: none;
  opacity: 0;
}

.scrollIndicator.bounce {
  animation: bounce 2s ease-in-out infinite;
  opacity: 1;
}

@keyframes bounce {
  0%, 100% {
    transform: translateX(-50%) translateY(0);
  }
  50% {
    transform: translateX(-50%) translateY(-10px);
  }
}

/* Animations */
@keyframes slideInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Mobile Responsive */
@media (max-width: 768px) {
  .hero {
    height: 80vh;
    min-height: 500px;
  }
  
  .heading {
    font-size: 42px;
  }
  
  .ctaButton {
    padding: 14px 32px;
    font-size: 16px;
  }
}
```

---

## Phase 3: Feature Section Redesign (1.5 hours)

### Alternating Feature Layout
```jsx
// website/app/components/FeaturesSection.jsx

'use client';

import { useInView } from 'react-intersection-observer';
import styles from './FeaturesSection.module.css';

const features = [
  {
    id: 1,
    title: 'Quantum Ready',
    description: 'Built from ground zero for post-quantum cryptography standards. ML-KEM-768 and ML-DSA-87 integrated into every decision.',
    icon: '⚛️',
    color: 'cyan'
  },
  {
    id: 2,
    title: 'Autonomous Governance',
    description: '105 intelligent personas voting across 3 councils. Distributed decision-making that scales to millions of interactions.',
    icon: '🏛️',
    color: 'green'
  },
  {
    id: 3,
    title: 'Enterprise Grade',
    description: '12 AWS resources, real-time auditing, zero-knowledge proofs, and governance at scale. Built for mission-critical systems.',
    icon: '🏢',
    color: 'magenta'
  }
];

function FeatureCard({ feature, index }) {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.3
  });

  const isEven = index % 2 === 0;

  return (
    <div
      ref={ref}
      className={`${styles.feature} ${styles[`feature${index}`]} ${inView ? styles.visible : ''}`}
    >
      {/* Image Side */}
      <div className={styles.imageSide}>
        <div className={`${styles.illustration} ${styles[`color${feature.color}`]}`}>
          <span className={styles.icon}>{feature.icon}</span>
          <div className={styles.decorationShapes} />
        </div>
      </div>

      {/* Text Side */}
      <div className={styles.textSide}>
        <h3 className={styles.title}>{feature.title}</h3>
        <p className={styles.description}>{feature.description}</p>
        <div className={styles.badge}>
          {feature.title.split(' ')[0].toUpperCase()}
        </div>
      </div>
    </div>
  );
}

export default function FeaturesSection() {
  const { ref: sectionRef, inView: sectionInView } = useInView({
    triggerOnce: true,
    threshold: 0.1
  });

  return (
    <section ref={sectionRef} className={styles.section}>
      <div className={styles.header}>
        <h2 className={`${styles.sectionTitle} ${sectionInView ? styles.visible : ''}`}>
          Why Choose IMA
        </h2>
        <p className={`${styles.sectionSubtitle} ${sectionInView ? styles.visible : ''}`}>
          Three core advantages that set us apart
        </p>
      </div>

      <div className={styles.featuresContainer}>
        {features.map((feature, index) => (
          <FeatureCard key={feature.id} feature={feature} index={index} />
        ))}
      </div>
    </section>
  );
}
```

### Features Section Styles
```css
/* website/app/components/FeaturesSection.module.css */

.section {
  background: var(--bg-primary);
  padding: var(--spacing-4xl) var(--spacing-lg);
  margin: var(--spacing-3xl) 0;
}

.header {
  text-align: center;
  margin-bottom: var(--spacing-3xl);
}

.sectionTitle {
  font-family: var(--font-heading);
  font-size: clamp(36px, 6vw, 56px);
  font-weight: 700;
  color: var(--text-primary);
  margin: 0 0 var(--spacing-md) 0;
  
  opacity: 0;
  transform: translateY(20px);
}

.sectionTitle.visible {
  animation: slideInUp var(--animation-slow) ease-out forwards;
}

.sectionSubtitle {
  font-size: 18px;
  color: var(--text-secondary);
  margin: 0;
  
  opacity: 0;
  transform: translateY(20px);
}

.sectionSubtitle.visible {
  animation: slideInUp var(--animation-slow) ease-out forwards;
  animation-delay: 100ms;
}

/* Features Container */
.featuresContainer {
  max-width: 1200px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: var(--spacing-3xl);
}

/* Feature Cards - Alternating */
.feature {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: var(--spacing-3xl);
  align-items: center;
  
  opacity: 0;
  transform: translateY(40px);
}

.feature.visible {
  animation: slideInUp var(--animation-slow) ease-out forwards;
}

.feature0 { animation-delay: 200ms; }
.feature1 { animation-delay: 400ms; }
.feature2 { animation-delay: 600ms; }

/* Reverse alternate layouts */
.feature1 {
  direction: rtl; /* Flips the grid */
}

.imageSide,
.textSide {
  direction: ltr; /* Reset direction for content */
}

/* Illustration */
.imageSide {
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  min-height: 350px;
}

.illustration {
  position: relative;
  width: 280px;
  height: 280px;
  border-radius: 16px;
  display: flex;
  align-items: center;
  justify-content: center;
  
  transition: all var(--animation-normal);
}

.illustrationCyan {
  background: linear-gradient(135deg, rgba(0, 217, 255, 0.15), rgba(0, 217, 255, 0.05));
  border: 1px solid rgba(0, 217, 255, 0.3);
  box-shadow: inset 0 0 20px rgba(0, 217, 255, 0.1), var(--glow-sm);
}

.illustrationGreen {
  background: linear-gradient(135deg, rgba(0, 255, 136, 0.15), rgba(0, 255, 136, 0.05));
  border: 1px solid rgba(0, 255, 136, 0.3);
  box-shadow: inset 0 0 20px rgba(0, 255, 136, 0.1), var(--glow-green-sm);
}

.illustrationMagenta {
  background: linear-gradient(135deg, rgba(255, 0, 255, 0.15), rgba(255, 0, 255, 0.05));
  border: 1px solid rgba(255, 0, 255, 0.3);
  box-shadow: inset 0 0 20px rgba(255, 0, 255, 0.1), var(--glow-magenta-sm);
}

.feature:hover .illustration {
  transform: translateY(-8px) scale(1.05);
}

.icon {
  font-size: 96px;
  filter: drop-shadow(0 0 20px rgba(0, 217, 255, 0.4));
}

.decorationShapes {
  position: absolute;
  width: 100%;
  height: 100%;
  border-radius: 16px;
  opacity: 0.3;
  background: 
    radial-gradient(circle at 20% 50%, #00d9ff 0%, transparent 50%),
    radial-gradient(circle at 80% 80%, #00d9ff 0%, transparent 50%);
  animation: shift 20s ease-in-out infinite;
}

@keyframes shift {
  0%, 100% { transform: translate(0, 0); }
  50% { transform: translate(10px, 10px); }
}

/* Text Side */
.textSide {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
}

.title {
  font-family: var(--font-heading);
  font-size: clamp(24px, 4vw, 36px);
  font-weight: 700;
  color: var(--text-primary);
  margin: 0;
}

.description {
  font-size: 16px;
  line-height: 1.7;
  color: var(--text-secondary);
  margin: 0;
}

.badge {
  display: inline-block;
  padding: var(--spacing-sm) var(--spacing-md);
  background: rgba(0, 217, 255, 0.1);
  border: 1px solid rgba(0, 217, 255, 0.3);
  border-radius: 4px;
  font-size: 12px;
  font-weight: 600;
  color: var(--color-accent-cyan);
  width: fit-content;
}

/* Mobile */
@media (max-width: 768px) {
  .feature {
    grid-template-columns: 1fr;
    gap: var(--spacing-2xl);
  }
  
  .feature1 {
    direction: ltr;
  }
  
  .imageSide {
    order: 1;
  }
  
  .textSide {
    order: 2;
  }
}
```

---

## Phase 4: Updated Navigation (45 minutes)

```jsx
// website/app/components/Header.jsx

'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import styles from './Header.module.css';

export default function Header() {
  const [isSticky, setIsSticky] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsSticky(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`${styles.header} ${isSticky ? styles.sticky : ''}`}>
      <div className={styles.container}>
        {/* Logo */}
        <Link href="/" className={styles.logo}>
          <span className={styles.logoCyan}>IMA</span> SYSTEMS
        </Link>

        {/* Navigation */}
        <nav className={`${styles.nav} ${mobileMenuOpen ? styles.open : ''}`}>
          <Link href="#vision" onClick={() => setMobileMenuOpen(false)}>Vision</Link>
          <Link href="#features" onClick={() => setMobileMenuOpen(false)}>Why Us</Link>
          <Link href="/about" onClick={() => setMobileMenuOpen(false)}>About</Link>
          <Link href="/contact" onClick={() => setMobileMenuOpen(false)}>Contact</Link>
        </nav>

        {/* CTA Button */}
        <button className={styles.ctaButton}>
          Early Access
        </button>

        {/* Mobile Menu Toggle */}
        <button 
          className={styles.menuToggle}
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>
    </header>
  );
}
```

```css
/* website/app/components/Header.module.css */

.header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background: transparent;
  padding: var(--spacing-lg) 0;
  z-index: 1000;
  transition: all var(--animation-normal);
}

.header.sticky {
  background: rgba(10, 14, 39, 0.95);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(0, 217, 255, 0.2);
  padding: var(--spacing-md) 0;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 var(--spacing-lg);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo {
  font-family: var(--font-heading);
  font-size: 20px;
  font-weight: 700;
  color: var(--text-primary);
  text-decoration: none;
  transition: all var(--animation-fast);
}

.logoCyan {
  color: var(--color-accent-cyan);
}

.logo:hover {
  filter: drop-shadow(0 0 15px rgba(0, 217, 255, 0.5));
}

.nav {
  display: flex;
  gap: var(--spacing-lg);
  list-style: none;
  margin: 0;
  padding: 0;
}

.nav a {
  color: var(--text-secondary);
  text-decoration: none;
  font-size: 14px;
  font-weight: 500;
  position: relative;
  transition: color var(--animation-fast);
}

.nav a::after {
  content: '';
  position: absolute;
  bottom: -4px;
  left: 0;
  right: 0;
  height: 2px;
  background: var(--color-accent-cyan);
  transform: scaleX(0);
  transform-origin: left;
  transition: transform var(--animation-fast);
}

.nav a:hover {
  color: var(--text-primary);
}

.nav a:hover::after {
  transform: scaleX(1);
}

.ctaButton {
  padding: 12px 24px;
  background: transparent;
  border: 1px solid var(--color-accent-cyan);
  color: var(--text-primary);
  border-radius: 6px;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
  transition: all var(--animation-fast);
  box-shadow: var(--glow-sm);
}

.ctaButton:hover {
  box-shadow: var(--glow-md);
  transform: translateY(-2px);
}

/* Mobile Menu Toggle */
.menuToggle {
  display: none;
  flex-direction: column;
  gap: 6px;
  background: none;
  border: none;
  cursor: pointer;
}

.menuToggle span {
  width: 24px;
  height: 2px;
  background: var(--text-primary);
  transition: all var(--animation-fast);
}

/* Mobile Responsive */
@media (max-width: 768px) {
  .nav {
    display: none;
  }
  
  .menuToggle {
    display: flex;
  }
  
  .nav.open {
    display: flex;
    flex-direction: column;
    position: absolute;
    top: 100%;
    left: 0;
    right: 0;
    background: var(--bg-primary);
    border-bottom: 1px solid var(--border);
    padding: var(--spacing-lg);
  }
}
```

---

## Phase 5: CTA Section Redesign (45 minutes)

```jsx
// website/app/components/CTASection.jsx

'use client';

import { useState } from 'react';
import styles from './CTASection.module.css';

export default function CTASection() {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState('idle'); // idle | loading | success | error

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus('loading');
    
    // Simulate API call
    setTimeout(() => {
      setStatus('success');
      setEmail('');
      setTimeout(() => setStatus('idle'), 3000);
    }, 1000);
  };

  return (
    <section className={styles.section}>
      <div className={styles.background} />
      
      <div className={styles.content}>
        <h2 className={styles.title}>
          Ready for Quantum-Safe Intelligence?
        </h2>
        
        <p className={styles.subtitle}>
          Limited spots available for early access partners
        </p>

        <form onSubmit={handleSubmit} className={styles.form}>
          <input
            type="email"
            placeholder="you@enterprise.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            disabled={status === 'loading'}
            className={styles.input}
          />
          
          <button
            type="submit"
            disabled={status === 'loading' || status === 'success'}
            className={`${styles.button} ${styles[status]}`}
          >
            {status === 'idle' && '⚡ Secure Early Access'}
            {status === 'loading' && '⏳ Checking...'}
            {status === 'success' && '✓ Spot Reserved!'}
            {status === 'error' && '❌ Try Again'}
          </button>
        </form>

        <p className={styles.subtext}>
          No credit card required • Instant confirmation
        </p>
      </div>
    </section>
  );
}
```

```css
/* website/app/components/CTASection.module.css */

.section {
  position: relative;
  padding: var(--spacing-4xl) var(--spacing-lg);
  margin: var(--spacing-3xl) 0;
  overflow: hidden;
  min-height: 400px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.background {
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, 
    rgba(0, 217, 255, 0.15) 0%,
    rgba(255, 0, 255, 0.08) 50%,
    rgba(0, 217, 255, 0.15) 100%);
  opacity: 0.8;
  z-index: 0;
}

.content {
  position: relative;
  z-index: 1;
  text-align: center;
  max-width: 600px;
  margin: 0 auto;
}

.title {
  font-family: var(--font-heading);
  font-size: clamp(32px, 6vw, 48px);
  font-weight: 700;
  color: var(--text-primary);
  margin: 0 0 var(--spacing-md) 0;
}

.subtitle {
  font-size: 16px;
  color: var(--text-secondary);
  margin: 0 0 var(--spacing-2xl) 0;
}

.form {
  display: flex;
  flex-direction: column;
  gap: var(--spacing-md);
  margin-bottom: var(--spacing-lg);
}

.input {
  padding: 14px 20px;
  background: rgba(255, 255, 255, 0.05);
  border: 1px solid var(--color-accent-cyan);
  border-radius: 8px;
  color: var(--text-primary);
  font-size: 14px;
  font-family: var(--font-body);
  transition: all var(--animation-fast);
}

.input::placeholder {
  color: var(--text-tertiary);
}

.input:focus {
  outline: none;
  box-shadow: var(--glow-md);
  background: rgba(255, 255, 255, 0.08);
}

.button {
  padding: 16px 32px;
  background: transparent;
  border: 2px solid var(--color-accent-cyan);
  color: var(--text-primary);
  border-radius: 8px;
  font-size: 16px;
  font-weight: 600;
  font-family: var(--font-body);
  cursor: pointer;
  transition: all var(--animation-normal);
  box-shadow: var(--glow-md);
}

.button:hover:not(:disabled) {
  box-shadow: var(--glow-lg);
  transform: translateY(-2px);
  background: rgba(0, 217, 255, 0.05);
}

.button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.button.loading {
  animation: pulse 1.5s ease-in-out infinite;
}

.button.success {
  border-color: var(--color-accent-green);
  color: var(--color-accent-green);
  box-shadow: 0 0 20px rgba(0, 255, 136, 0.4);
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
}

.subtext {
  font-size: 12px;
  color: var(--text-tertiary);
  margin: 0;
}

@media (max-width: 768px) {
  .form {
    flex-direction: column;
  }
  
  .input, .button {
    width: 100%;
  }
}
```

---

## Quick Implementation Checklist

```markdown
## Implementation Tasks

### CSS Updates (30 min)
- [ ] Update :root variables in globals.css
- [ ] Import new fonts in layout.js
- [ ] Verify all color names are consistent

### Hero Section (2 hours)
- [ ] Create HeroSection.jsx component
- [ ] Add HeroSection.module.css with animations
- [ ] Replace old hero in page.js
- [ ] Test animations on different devices

### Features Section (1.5 hours)
- [ ] Create FeaturesSection.jsx
- [ ] Add FeaturesSection.module.css
- [ ] Install react-intersection-observer
- [ ] Test responsive layout on mobile

### Navigation (45 minutes)
- [ ] Update Header.jsx
- [ ] Add Header.module.css
- [ ] Test sticky behavior
- [ ] Test mobile menu toggle

### CTA Section (45 minutes)
- [ ] Create CTASection.jsx
- [ ] Add CTASection.module.css
- [ ] Wire up form submission
- [ ] Test loading and success states

### Testing & Polish (1 hour)
- [ ] Full page responsive test (mobile, tablet, desktop)
- [ ] Performance check (Lighthouse)
- [ ] Cross-browser testing (Chrome, Safari, Firefox)
- [ ] Accessibility audit (contrast, keyboard nav)

### Deployment (30 minutes)
- [ ] Build: npm run build (should be < 2s)
- [ ] Deploy to Vercel: vercel --prod
- [ ] Verify live site looks correct
- [ ] Share new URL with team
```

---

## Total Implementation Time

| Phase | Task | Time |
|-------|------|------|
| 1 | Color system + fonts | 30 min |
| 2 | Hero section redesign | 2 hours |
| 3 | Features section | 1.5 hours |
| 4 | Navigation polish | 45 min |
| 5 | CTA section | 45 min |
| 6 | Testing & deployment | 1.5 hours |
| **TOTAL** | **Complete redesign** | **~7 hours** |

**Result**: 5/10 → 10/10 website ready to deploy 🚀

---

**Ready to start implementation?** Just confirm the direction and we'll have a world-class website live in 4-6 hours!
