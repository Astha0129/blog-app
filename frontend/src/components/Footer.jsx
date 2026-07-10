import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { CATEGORIES } from '../data/posts';

function Footer() {
  const year = new Date().getFullYear();
  const navigate = useNavigate();

  return (
    <footer className="site-footer">
      <div className="container">
        {/* Top row */}
        <div className="footer-top d-flex flex-wrap justify-content-between align-items-start gap-4 pb-4">
          {/* Brand */}
          <div style={{ maxWidth: 280 }}>
            <div className="footer-brand mb-2">✦ BlogSphere</div>
            <p style={{ color: 'var(--text-faint)', fontSize: '0.85rem', lineHeight: 1.7 }}>
              A place for ideas, stories, and insights. Read, write, and share
              your perspective with the world.
            </p>
          </div>

          {/* Categories */}
          <div>
            <div className="footer-section-title">Categories</div>
            <div className="d-flex flex-column gap-1 mt-2">
              {CATEGORIES.filter((c) => c !== 'All').map((cat) => (
                <button
                  key={cat}
                  className="footer-link text-start border-0 bg-transparent p-0"
                  onClick={() => navigate(`/?category=${cat}`)}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <div className="footer-section-title">Quick Links</div>
            <div className="d-flex flex-column gap-1 mt-2">
              <Link to="/" className="footer-link">Home</Link>
              <Link to="/posts/new" className="footer-link">Write a Post</Link>
              <Link to="/login" className="footer-link">Sign In</Link>
              <Link to="/signup" className="footer-link">Create Account</Link>
            </div>
          </div>

          {/* Social placeholder */}
          <div>
            <div className="footer-section-title">Connect</div>
            <div className="d-flex gap-2 mt-2">
              {[
                { icon: 'bi-twitter-x', label: 'Twitter' },
                { icon: 'bi-github', label: 'GitHub' },
                { icon: 'bi-linkedin', label: 'LinkedIn' },
                { icon: 'bi-rss', label: 'RSS' },
              ].map(({ icon, label }) => (
                <button
                  key={label}
                  className="btn-icon"
                  title={label}
                  aria-label={label}
                >
                  <i className={`bi ${icon}`} />
                </button>
              ))}
            </div>
          </div>
        </div>

        <div className="gradient-divider" style={{ margin: '0 0 1.25rem' }} />

        {/* Bottom row */}
        <div className="d-flex flex-wrap align-items-center justify-content-between gap-2">
          <p className="footer-copy m-0">
            © {year} <span style={{ color: 'var(--primary-light)' }}>BlogSphere</span>. Built with React, Vite &amp; ❤️
          </p>
          <div className="d-flex gap-3">
            <span className="footer-link" style={{ cursor: 'default' }}>Privacy</span>
            <span className="footer-link" style={{ cursor: 'default' }}>Terms</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
