import React from 'react';
import { useNavigate } from 'react-router-dom';

function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="not-found-wrapper page-enter">
      <div className="not-found-number">404</div>
      <h1 className="not-found-title">Page Not Found</h1>
      <p className="not-found-sub">
        The page you're looking for doesn't exist, has been moved, or the link might be broken.
      </p>
      <div className="hero-cta-group">
        <button className="btn-primary-custom" onClick={() => navigate('/')}>
          <i className="bi bi-house" /> Back to Home
        </button>
        <button className="btn-secondary-custom" onClick={() => navigate(-1)}>
          <i className="bi bi-arrow-left" /> Go Back
        </button>
      </div>
    </div>
  );
}

export default NotFound;
