import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

const DEMO_USERS = [
  { id: 'u1', name: 'Aria Chen',    email: 'aria@example.com',   password: 'password123', avatar: 'AC', bio: 'Full-stack developer & tech writer.', joinedAt: '2024-01-01' },
  { id: 'u2', name: 'Marcus Webb',  email: 'marcus@example.com', password: 'password123', avatar: 'MW', bio: 'UX designer and design systems enthusiast.', joinedAt: '2024-02-15' },
  { id: 'u3', name: 'Priya Mehta',  email: 'priya@example.com',  password: 'password123', avatar: 'PM', bio: 'Travel blogger, wanderer, storyteller.', joinedAt: '2024-03-10' },
];

export function AuthProvider({ children }) {
  const [currentUser, setCurrentUser] = useState(null);
  const [users, setUsers] = useState(DEMO_USERS);
  const [loading, setLoading] = useState(true);

  // Restore session from localStorage
  useEffect(() => {
    const stored = localStorage.getItem('bs_user');
    if (stored) {
      try { setCurrentUser(JSON.parse(stored)); }
      catch { localStorage.removeItem('bs_user'); }
    }
    const storedUsers = localStorage.getItem('bs_users');
    if (storedUsers) {
      try { setUsers(JSON.parse(storedUsers)); }
      catch { /* ignore */ }
    }
    setLoading(false);
  }, []);

  const persistUser = (user) => {
    setCurrentUser(user);
    if (user) localStorage.setItem('bs_user', JSON.stringify(user));
    else localStorage.removeItem('bs_user');
  };

  const persistUsers = (list) => {
    setUsers(list);
    localStorage.setItem('bs_users', JSON.stringify(list));
  };

  /** Sign in with email + password */
  const login = (email, password) => {
    const found = users.find(
      (u) => u.email.toLowerCase() === email.toLowerCase() && u.password === password
    );
    if (!found) throw new Error('Invalid email or password.');
    const { password: _pw, ...safeUser } = found;
    persistUser(safeUser);
    return safeUser;
  };

  /** Register a new account */
  const signup = (name, email, password) => {
    const exists = users.find((u) => u.email.toLowerCase() === email.toLowerCase());
    if (exists) throw new Error('An account with this email already exists.');
    const initials = name.trim().split(' ').map((n) => n[0].toUpperCase()).join('').slice(0, 2);
    const newUser = {
      id: `u_${Date.now()}`,
      name: name.trim(),
      email,
      password,
      avatar: initials,
      bio: '',
      joinedAt: new Date().toISOString().split('T')[0],
    };
    const updated = [...users, newUser];
    persistUsers(updated);
    const { password: _pw, ...safeUser } = newUser;
    persistUser(safeUser);
    return safeUser;
  };

  /** Sign out */
  const logout = () => persistUser(null);

  /** Update profile info */
  const updateProfile = (updates) => {
    const updated = { ...currentUser, ...updates };
    persistUser(updated);
    const updatedUsers = users.map((u) =>
      u.id === updated.id ? { ...u, ...updates } : u
    );
    persistUsers(updatedUsers);
  };

  const isAuthenticated = !!currentUser;

  return (
    <AuthContext.Provider value={{ currentUser, isAuthenticated, loading, login, logout, signup, updateProfile }}>
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
