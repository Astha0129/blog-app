import React, { useState } from 'react';
import { Link, useNavigate, useLocation, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { validateLoginForm } from '../utils/validation';

function Login() {
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';

  const [form, setForm] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  if (isAuthenticated) {
    return <Navigate to={from} replace />;
  }

  const handleChange = (e) => {
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));
    setErrors((p) => ({ ...p, [e.target.name]: '' }));
    setServerError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validateLoginForm(form);
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    setSubmitting(true);
    try {
      await login(form.email, form.password);
      navigate(from, { replace: true });
    } catch (err) {
      setServerError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="auth-page page-enter">
      <div className="auth-card">
        {/* Header */}
        <div className="auth-header">
          <div className="auth-logo">✦</div>
          <h1 className="auth-title">Welcome back</h1>
          <p className="auth-subtitle">Sign in to your BlogSphere account</p>
        </div>

        {serverError && (
          <div className="alert-custom alert-danger" style={{ marginBottom: '1rem' }}>
            <i className="bi bi-exclamation-triangle-fill" />
            {serverError}
          </div>
        )}

        <form onSubmit={handleSubmit} id="login-form" noValidate>
          {/* Email */}
          <div className="form-group">
            <label className="form-label-custom" htmlFor="login-email">
              <i className="bi bi-envelope" /> Email
            </label>
            <input
              id="login-email"
              name="email"
              type="email"
              className={`form-control-custom ${errors.email ? 'input-error' : ''}`}
              placeholder="you@example.com"
              value={form.email}
              onChange={handleChange}
              autoComplete="email"
            />
            {errors.email && <p className="field-error">{errors.email}</p>}
          </div>

          {/* Password */}
          <div className="form-group">
            <div className="d-flex justify-content-between align-items-center mb-1">
              <label className="form-label-custom mb-0" htmlFor="login-password">
                <i className="bi bi-lock" /> Password
              </label>
            </div>
            <div className="input-with-icon">
              <input
                id="login-password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                className={`form-control-custom ${errors.password ? 'input-error' : ''}`}
                placeholder="••••••••"
                value={form.password}
                onChange={handleChange}
                autoComplete="current-password"
              />
              <button
                type="button"
                className="input-icon-btn"
                onClick={() => setShowPassword((s) => !s)}
                tabIndex={-1}
              >
                <i className={`bi ${showPassword ? 'bi-eye-slash' : 'bi-eye'}`} />
              </button>
            </div>
            {errors.password && <p className="field-error">{errors.password}</p>}
          </div>

          <button
            type="submit"
            className="btn-primary-custom w-100 justify-content-center"
            disabled={submitting}
            style={{ marginTop: '0.5rem', padding: '0.8rem' }}
            id="login-submit-btn"
          >
            {submitting ? (
              <><span className="spinner-ring" style={{ width: 16, height: 16, borderWidth: 2 }} /> Signing in…</>
            ) : (
              <><i className="bi bi-box-arrow-in-right" /> Sign In</>
            )}
          </button>
        </form>

        <div className="auth-footer">
          Don't have an account?{' '}
          <Link to="/signup" className="auth-link">Create one</Link>
        </div>
      </div>
    </div>
  );
}

export default Login;
