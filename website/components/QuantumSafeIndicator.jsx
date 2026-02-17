'use client';

import React from 'react';
import styles from './QuantumSafeIndicator.module.css';

export default function QuantumSafeIndicator({ label = 'Quantum-Safe Protected' }) {
  return (
    <div className={styles.indicator}>
      <span className={styles.badge}>
        <svg 
          className={styles.icon} 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2"
        >
          <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z" />
        </svg>
        <span className={styles.text}>{label}</span>
      </span>
    </div>
  );
}
