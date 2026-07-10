import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { usePosts } from '../context/PostContext';

function Hero({ onSearch }) {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const { posts } = usePosts();
  const [searchVal, setSearchVal] = useState('');
  const [visible, setVisible] = useState(false);
  const inputRef = useRef(null);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 50);
    return () => clearTimeout(t);
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    if (onSearch) onSearch(searchVal);
    if (inputRef.current) inputRef.current.blur();
  };

  const totalAuthors = [...new Set(posts.map((p) => p.author?.name || p.author))].length;
  const totalLikes = posts.reduce((sum, p) => sum + (p.likes || 0), 0);

  return (
    <section className="hero-section">
      <div className="hero-bg-mesh" />

      <div className={`container hero-content ${visible ? 'visible' : ''}`}>
        {/* Badge */}
        <div className="hero-badge">
          <i className="bi bi-stars" />
          The place for great stories
        </div>

        {/* Title */}
        <h1 className="hero-title">
          <span className="hero-title-line1">Ideas Worth</span>
          <span className="hero-title-line2">Sharing</span>
        </h1>

        {/* Subtitle */}
        <p className="hero-subtitle">
          Discover insightful articles on technology, design, lifestyle, travel, and food —
          or share your own story with thousands of readers.
        </p>

        {/* Search */}
        <form className="hero-search-form" onSubmit={handleSearch}>
          <div className="hero-search-wrapper">
            <i className="bi bi-search hero-search-icon" />
            <input
              ref={inputRef}
              type="text"
              className="hero-search-input"
              placeholder="Search articles, authors, or topics…"
              value={searchVal}
              onChange={(e) => setSearchVal(e.target.value)}
              id="hero-search-input"
            />
            <button type="submit" className="hero-search-btn">
              Search
            </button>
          </div>
        </form>

        {/* CTA */}
        <div className="hero-cta-group">
          <button
            className="btn-primary-custom"
            onClick={() => navigate(isAuthenticated ? '/posts/new' : '/signup')}
            id="hero-write-btn"
          >
            <i className="bi bi-pencil-square" />
            {isAuthenticated ? 'Write a Post' : 'Start Writing'}
          </button>
          <button
            className="btn-secondary-custom"
            onClick={() => document.getElementById('posts-section')?.scrollIntoView({ behavior: 'smooth' })}
          >
            <i className="bi bi-arrow-down" />
            Explore Posts
          </button>
        </div>

        {/* Stats */}
        <div className="hero-stats">
          <div className="hero-stat">
            <div className="hero-stat-num">{posts.length}</div>
            <div className="hero-stat-label">Articles</div>
          </div>
          <div className="hero-stat-divider" />
          <div className="hero-stat">
            <div className="hero-stat-num">{totalAuthors}</div>
            <div className="hero-stat-label">Authors</div>
          </div>
          <div className="hero-stat-divider" />
          <div className="hero-stat">
            <div className="hero-stat-num">{totalLikes.toLocaleString()}</div>
            <div className="hero-stat-label">Likes</div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
