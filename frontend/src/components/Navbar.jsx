import React, { useState, useEffect } from 'react';
import { Link, NavLink, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useTheme } from '../context/ThemeContext';
import SearchBar from './SearchBar';

function Navbar({ onSearch }) {
  const { currentUser, isAuthenticated, logout } = useAuth();
  const { theme, toggleTheme, isDark } = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handler, { passive: true });
    return () => window.removeEventListener('scroll', handler);
  }, []);

  // Close menu on route change
  useEffect(() => { setMenuOpen(false); setDropdownOpen(false); }, [location]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const isHome = location.pathname === '/';

  return (
    <nav className={`bs-navbar navbar navbar-expand-lg ${scrolled ? 'scrolled' : ''}`}>
      <div className="container">
        {/* Brand */}
        <Link to="/" className="navbar-brand navbar-brand-custom d-flex align-items-center gap-2">
          <span className="brand-dot" />
          BlogSphere
        </Link>

        {/* Mobile: right side controls */}
        <div className="d-flex align-items-center gap-2 d-lg-none">
          <button
            className="btn-icon"
            onClick={toggleTheme}
            title="Toggle theme"
            aria-label="Toggle theme"
          >
            <i className={`bi ${isDark ? 'bi-sun' : 'bi-moon-stars'}`} />
          </button>
          <button
            className="navbar-toggler border-0 btn-icon"
            type="button"
            aria-label="Toggle navigation"
            onClick={() => setMenuOpen((o) => !o)}
            style={{ width: 'auto', padding: '0.4rem 0.6rem' }}
          >
            <i className={`bi ${menuOpen ? 'bi-x-lg' : 'bi-list'} fs-5`} />
          </button>
        </div>

        {/* Collapsible nav */}
        <div className={`collapse navbar-collapse ${menuOpen ? 'show' : ''}`}>
          {/* Search (shown on home only on desktop, always in mobile) */}
          <div className="mx-auto d-flex" style={{ maxWidth: 360, width: '100%', padding: '0.5rem 0' }}>
            {onSearch && <SearchBar onSearch={onSearch} compact />}
          </div>

          <ul className="navbar-nav ms-auto align-items-lg-center gap-1">
            <li className="nav-item">
              <NavLink
                to="/"
                end
                className={({ isActive }) => `nav-link nav-link-custom ${isActive ? 'active' : ''}`}
              >
                <i className="bi bi-house me-1" />Home
              </NavLink>
            </li>

            {isAuthenticated ? (
              <>
                <li className="nav-item">
                  <NavLink
                    to="/posts/new"
                    className={({ isActive }) => `nav-link nav-link-custom ${isActive ? 'active' : ''}`}
                  >
                    <i className="bi bi-pencil-square me-1" />Write
                  </NavLink>
                </li>

                {/* User dropdown */}
                <li className="nav-item position-relative">
                  <button
                    className="nav-user-btn d-flex align-items-center gap-2"
                    onClick={() => setDropdownOpen((o) => !o)}
                    style={{
                      background: 'none', border: 'none', cursor: 'pointer',
                      padding: '0.3rem 0.5rem', borderRadius: '0.5rem',
                      transition: 'background 0.2s',
                    }}
                  >
                    <span className="user-avatar-sm">
                      {currentUser?.avatar || currentUser?.name?.slice(0, 2).toUpperCase()}
                    </span>
                    <span className="d-none d-lg-inline" style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', fontWeight: 600 }}>
                      {currentUser?.name?.split(' ')[0]}
                    </span>
                    <i className={`bi bi-chevron-${dropdownOpen ? 'up' : 'down'} d-none d-lg-inline`}
                       style={{ color: 'var(--text-faint)', fontSize: '0.7rem' }} />
                  </button>

                  {dropdownOpen && (
                    <div className="nav-dropdown">
                      <Link to="/profile" className="nav-dropdown-item">
                        <i className="bi bi-person" /> Profile
                      </Link>
                      <div className="nav-dropdown-divider" />
                      <button className="nav-dropdown-item text-danger-item" onClick={handleLogout}>
                        <i className="bi bi-box-arrow-right" /> Sign Out
                      </button>
                    </div>
                  )}

                  {/* Mobile links */}
                  <div className="d-lg-none mt-1 ps-2">
                    <Link to="/profile" className="nav-link nav-link-custom d-flex align-items-center gap-2 py-1">
                      <i className="bi bi-person" /> Profile ({currentUser?.name})
                    </Link>
                    <button
                      className="nav-link nav-link-custom d-flex align-items-center gap-2 py-1 border-0 w-100 text-start"
                      style={{ background: 'none', color: 'var(--danger)' }}
                      onClick={handleLogout}
                    >
                      <i className="bi bi-box-arrow-right" /> Sign Out
                    </button>
                  </div>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item">
                  <Link
                    to="/login"
                    className="nav-link nav-link-custom"
                  >
                    Sign In
                  </Link>
                </li>
                <li className="nav-item">
                  <NavLink to="/signup">
                    <span className="btn-primary-custom" style={{ fontSize: '0.875rem', padding: '0.5rem 1.2rem' }}>
                      Get Started
                    </span>
                  </NavLink>
                </li>
              </>
            )}

            {/* Theme toggle (desktop) */}
            <li className="nav-item d-none d-lg-flex">
              <button
                className="btn-icon ms-1"
                onClick={toggleTheme}
                title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
              >
                <i className={`bi ${isDark ? 'bi-sun' : 'bi-moon-stars'}`} />
              </button>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
