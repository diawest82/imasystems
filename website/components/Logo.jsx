/**
 * IMA Systems Group Logo Component
 * Modern quantum-forward design with animated elements
 */

'use client';

import styles from './Logo.module.css';

export default function Logo({ variant = 'default', size = 'normal' }) {
  return (
    <div className={`${styles.logoWrapper} ${styles[variant]} ${styles[size]}`}>
      <div className={styles.logoIcon}>
        <svg
          viewBox="0 0 56 56"
          width="48"
          height="48"
          xmlns="http://www.w3.org/2000/svg"
          role="img"
          aria-label="IMA Systems Logo"
        >
          <defs>
            <filter id="glow-cyan">
              <feGaussianBlur stdDeviation="1.5" result="coloredBlur" />
              <feMerge>
                <feMergeNode in="coloredBlur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          {/* Central quantum core */}
          <circle cx="28" cy="28" r="5" fill="#00d9ff" opacity="0.9" filter="url(#glow-cyan)" />
          <circle cx="28" cy="28" r="5" fill="none" stroke="#00d9ff" strokeWidth="1" opacity="0.3" className={styles.pulseBorder} />

          {/* Top node - I (Intelligence) */}
          <circle cx="28" cy="10" r="3" fill="#00d9ff" filter="url(#glow-cyan)" className={styles.nodeI} />
          <line x1="28" y1="13" x2="28" y2="23" stroke="#00d9ff" strokeWidth="1" opacity="0.4" className={styles.connectorTop} />

          {/* Bottom-left node - M (Model) */}
          <circle cx="12" cy="42" r="3" fill="#00ff88" filter="url(#glow-cyan)" className={styles.nodeM} />
          <line x1="18" y1="37" x2="24" y2="31" stroke="#00ff88" strokeWidth="1" opacity="0.4" className={styles.connectorBL} />

          {/* Bottom-right node - A (AI) */}
          <circle cx="44" cy="42" r="3" fill="#ff00ff" filter="url(#glow-cyan)" className={styles.nodeA} />
          <line x1="38" y1="37" x2="32" y2="31" stroke="#ff00ff" strokeWidth="1" opacity="0.4" className={styles.connectorBR} />

          {/* Subtle orbital suggestion */}
          <circle cx="28" cy="28" r="20" fill="none" stroke="#00d9ff" strokeWidth="0.5" opacity="0.15" className={styles.orbit} />
        </svg>
      </div>

      <div className={styles.logoText}>
        <div className={styles.mainText}>
          <span className={styles.ima}>IMA</span>
          <span className={styles.systems}>SYSTEMS</span>
        </div>
      </div>
    </div>
  );
}
