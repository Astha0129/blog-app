import React from 'react';

/**
 * Loading component with multiple variants.
 * @param {'spinner' | 'skeleton' | 'dots'} variant
 * @param {number} count - number of skeleton cards to show
 */
function Loading({ variant = 'spinner', count = 6, message = 'Loading…' }) {
  if (variant === 'dots') {
    return (
      <div className="spinner-container">
        <div className="loading-dots">
          <div className="loading-dot" />
          <div className="loading-dot" />
          <div className="loading-dot" />
        </div>
        {message && <span style={{ color: 'var(--text-faint)', fontSize: '0.875rem' }}>{message}</span>}
      </div>
    );
  }

  if (variant === 'skeleton') {
    return (
      <div className="posts-grid">
        {Array.from({ length: count }).map((_, i) => (
          <div key={i} className="skeleton-card">
            <div className="skeleton skeleton-cover" />
            <div className="skeleton-body">
              <div className="skeleton skeleton-line" style={{ width: '35%', height: 10, marginBottom: '0.5rem' }} />
              <div className="skeleton skeleton-title" />
              <div className="skeleton skeleton-line" />
              <div className="skeleton skeleton-line" style={{ width: '75%' }} />
              <div className="skeleton skeleton-line skeleton-short" style={{ marginTop: '1rem' }} />
            </div>
          </div>
        ))}
      </div>
    );
  }

  // Default: spinner
  return (
    <div className="spinner-container">
      <div className="spinner-ring" />
      <span style={{ color: 'var(--text-muted)' }}>{message}</span>
    </div>
  );
}

export default Loading;
