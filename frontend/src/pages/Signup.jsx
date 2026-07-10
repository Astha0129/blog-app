import React, { useState } from 'react';
import { Link, useNavigate, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { validateSignupForm } from '../utils/validation';

function Signup() {
  const { signup, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({ name: '', email: '', password: '', confirmPassword: '' });
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [showPass, setShowPass] = useState(false);

  if (isAuthenticated) { return <Navigate to="/" replace />; }

  const handleChange = (e) => {
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));
    setErrors((p) => ({ ...p, [e.target.name]: '' }));
    setServerError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errs = validateSignupForm(form);
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }
    try {
      setSubmitting(true);
      await new Promise((r) => setTimeout(r, 600));
      signup(form.name, form.email, form.password);
      navigate('/');
    } catch (err) {
      setServerError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  const passwordStrength = (pw) => {
    if (!pw) return 0;
    let score = 0;
    if (pw.length >= 8) score++;
    if (/[A-Z]/.test(pw)) score++;
    if (/[0-9]/.test(pw)) score++;
    if (/[^A-Za-z0-9]/.test(pw)) score++;
    return score;
  };
  const strength = passwordStrength(form.password);
  const strengthLabels = ['', 'Weak', 'Fair', 'Good', 'Strong'];
  const strengthColors = ['', '#ef4444', '#f59e0b', '#06b6d4', '#10b981'];

  return (
    <div className="auth-page page-enter">
      <div className="auth-card">
        <div className="auth-header">
          <div className="auth-logo">✦</div>
          <h1 className="auth-title">Create Account</h1>
          <p className="auth-subtitle">Join BlogSphere and start sharing your story</p>
        </div>

        {serverError && (
          <div className="alert-custom alert-danger">
            <i className="bi bi-exclamation-triangle-fill" />
            {serverError}
          </div>
        )}

        <form onSubmit={handleSubmit} id="signup-form" noValidate>
          {/* Name */}
          <div className="form-group">
            <label className="form-label-custom" htmlFor="signup-name">
              <i className="bi bi-person" /> Full Name
            </label>
            <input
              id="signup-name"
              name="name"
              type="text"
              className={`form-control-custom ${errors.name ? 'input-error' : ''}`}
              placeholder="Your full name"
              value={form.name}
              onChange={handleChange}
              autoComplete="name"
            />
            {errors.name && <p className="field-error">{errors.name}</p>}
          </div>

          {/* Email */}
          <div className="form-group">
            <label className="form-label-custom" htmlFor="signup-email">
              <i className="bi bi-envelope" /> Email
            </label>
            <input
              id="signup-email"
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
            <label className="form-label-custom" htmlFor="signup-password">
              <i className="bi bi-lock" /> Password
            </label>
            <div className="input-with-icon">
              <input
                id="signup-password"
                name="password"
                type={showPass ? 'text' : 'password'}
                className={`form-control-custom ${errors.password ? 'input-error' : ''}`}
                placeholder="Min. 6 characters"
                value={form.password}
                onChange={handleChange}
                autoComplete="new-password"
              />
              <button type="button" className="input-icon-btn" onClick={() => setShowPass((s) => !s)} tabIndex={-1}>
                <i className={`bi ${showPass ? 'bi-eye-slash' : 'bi-eye'}`} />
              </button>
            </div>
            {/* Strength meter */}
            {form.password && (
              <div className="mt-1">
                <div style={{ display: 'flex', gap: '4px', marginBottom: '4px' }}>
                  {[1, 2, 3, 4].map((level) => (
                    <div
                      key={level}
                      style={{
                        flex: 1, height: 3, borderRadius: 2,
                        background: strength >= level ? strengthColors[strength] : 'var(--border-subtle)',
                        transition: 'background 0.3s',
                      }}
                    />
                  ))}
                </div>
                <span style={{ fontSize: '0.75rem', color: strengthColors[strength] || 'var(--text-faint)' }}>
                  {strengthLabels[strength]}
                </span>
              </div>
            )}
            {errors.password && <p className="field-error">{errors.password}</p>}
          </div>

          {/* Confirm Password */}
          <div className="form-group">
            <label className="form-label-custom" htmlFor="signup-confirm">
              <i className="bi bi-lock-fill" /> Confirm Password
            </label>
            <input
              id="signup-confirm"
              name="confirmPassword"
              type={showPass ? 'text' : 'password'}
              className={`form-control-custom ${errors.confirmPassword ? 'input-error' : ''}`}
              placeholder="Repeat password"
              value={form.confirmPassword}
              onChange={handleChange}
              autoComplete="new-password"
            />
            {errors.confirmPassword && <p className="field-error">{errors.confirmPassword}</p>}
          </div>

          <button
            type="submit"
            className="btn-primary-custom w-100 justify-content-center"
            disabled={submitting}
            style={{ padding: '0.8rem' }}
            id="signup-submit-btn"
          >
            {submitting ? (
              <><span className="spinner-ring" style={{ width: 16, height: 16, borderWidth: 2 }} /> Creating Account…</>
            ) : (
              <><i className="bi bi-person-plus" /> Create Account</>
            )}
          </button>
        </form>

        <p style={{ color: 'var(--text-faint)', fontSize: '0.78rem', textAlign: 'center', marginTop: '1rem', lineHeight: 1.6 }}>
          By signing up you agree to our{' '}
          <span style={{ color: 'var(--primary-light)' }}>Terms of Service</span>
          {' '}and{' '}
          <span style={{ color: 'var(--primary-light)' }}>Privacy Policy</span>.
        </p>

        <div className="auth-footer">
          Already have an account?{' '}
          <Link to="/login" className="auth-link">Sign in</Link>
        </div>
      </div>
    </div>
  );
}

export default Signup;
