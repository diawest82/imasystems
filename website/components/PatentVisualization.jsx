'use client';

import React from 'react';
import styles from './PatentVisualization.module.css';

export default function PatentVisualization({ patents = [] }) {
  // Analyze patent data
  const getStats = () => {
    const categories = {};
    const years = {};
    
    patents.forEach(patent => {
      const category =
        patent.category ||
        patent.category_name ||
        patent.categoryLabel ||
        'Uncategorized';
      categories[category] = (categories[category] || 0) + 1;

      const rawYear = patent.created_at || patent.createdAt;
      const year = rawYear ? new Date(rawYear).getFullYear() : new Date().getFullYear();
      if (!Number.isNaN(year)) {
        years[year] = (years[year] || 0) + 1;
      }
    });
    
    return { categories, years, total: patents.length };
  };

  const stats = getStats();
  const yearEntries = Object.entries(stats.years)
    .sort((a, b) => Number(b[0]) - Number(a[0]));
  const maxYearCount = Math.max(
    1,
    ...yearEntries.map(([, count]) => count)
  );

  return (
    <div className={styles.container}>
      {/* Stats Overview */}
      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
          <div className={styles.statNumber}>{stats.total}</div>
          <div className={styles.statLabel}>Patents</div>
        </div>
        <div className={styles.statCard}>
          <div className={styles.statNumber}>{Object.keys(stats.categories).length}</div>
          <div className={styles.statLabel}>Categories</div>
        </div>
      </div>

      {/* Category Distribution */}
      <div className={styles.chartContainer}>
        <h3 className={styles.chartTitle}>Patent Distribution by Category</h3>
        <div className={styles.barChart}>
          {Object.entries(stats.categories).map(([category, count], index) => {
            const percentage = (count / stats.total) * 100;
            return (
              <div key={category} className={styles.barItem}>
                <div className={styles.barLabel}>{category}</div>
                <div className={styles.barTrack}>
                  <div 
                    className={styles.bar}
                    style={{
                      width: `${percentage}%`,
                      animationDelay: `${index * 0.1}s`
                    }}
                  >
                    <span className={styles.barValue}>{count}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Year Timeline */}
      {yearEntries.length > 0 && (
        <div className={styles.chartContainer}>
          <h3 className={styles.chartTitle}>Patent Timeline by Year</h3>
          <div className={styles.yearChart}>
            {yearEntries.map(([year, count], index) => {
              const percentage = (count / maxYearCount) * 100;
              return (
                <div key={year} className={styles.yearItem}>
                  <div className={styles.yearLabel}>{year}</div>
                  <div className={styles.yearBarTrack}>
                    <div
                      className={styles.yearBar}
                      style={{
                        width: `${percentage}%`,
                        animationDelay: `${index * 0.1}s`
                      }}
                    >
                      <span className={styles.yearValue}>{count}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
}
