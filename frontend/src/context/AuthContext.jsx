import React, { createContext, useContext, useState, useEffect } from 'react';
import api from '../api/axios';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Restore session from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem('bs_user');
    if (stored) {
      try { setCurrentUser(JSON.parse(stored)); }
      catch { localStorage.removeItem('bs_user'); }
    }
    setLoading(false);
  }, []);

  const persistUser = (user, token) => {
    setCurrentUser(user);
    if (user) {
      localStorage.setItem('bs_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('bs_user');
      localStorage.removeItem('bs_token');
    }
    if (token) {
      localStorage.setItem('bs_token', token);
    }
  };

  /** Sign in — calls the real backend; throws a user-friendly error on failure */
  const login = async (email, password) => {
    try {
      const res = await api.post('/auth/login', { email, password });
      const { user, token } = res.data;
      persistUser(user, token);
      return user;
    } catch (err) {
      // Surface the backend's own message, or a clean fallback
      const msg =
        err.response?.data?.message ||
        (err.code === 'ERR_NETWORK'
          ? 'Cannot reach the server. Please make sure the backend is running.'
          : 'Invalid email or password.');
      throw new Error(msg);
    }
  };

  /** Register a new account then auto-login */
  const signup = async (name, email, password) => {
    try {
      await api.post('/auth/register', { name, email, password });
      // Auto-login after successful registration
      return await login(email, password);
    } catch (err) {
      // If login was already thrown, rethrow it
      if (err.message.includes('Cannot reach')) throw err;
      const msg =
        err.response?.data?.message ||
        'Registration failed. Please try again.';
      throw new Error(msg);
    }
  };

  /** Sign out — clear all stored auth state */
  const logout = () => persistUser(null, null);

  /** Update profile locally (name display etc.) */
  const updateProfile = (updates) => {
    const updated = { ...currentUser, ...updates };
    setCurrentUser(updated);
    localStorage.setItem('bs_user', JSON.stringify(updated));
  };

  const isAuthenticated = !!currentUser;

  return (
    <AuthContext.Provider
      value={{ currentUser, isAuthenticated, loading, login, logout, signup, updateProfile }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider');
  return ctx;
}

export default AuthContext;
