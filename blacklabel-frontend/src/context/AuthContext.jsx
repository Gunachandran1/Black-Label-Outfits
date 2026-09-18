import React, { createContext, useContext, useState } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(() => localStorage.getItem('bl-token') || null);
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('bl-user');
    if (savedUser) {
      try { return JSON.parse(savedUser); }
      catch { localStorage.removeItem('bl-user'); return null; }
    }
    return null;
  });

  const login = async (email, password) => {
    // Try real API first
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      if (res.ok) {
        const data = await res.json();
        const userData = data.data?.user || data.user;
        const tokenStr = data.data?.token || data.token;
        setUser(userData);
        setToken(tokenStr);
        localStorage.setItem('bl-token', tokenStr);
        localStorage.setItem('bl-user', JSON.stringify(userData));
        return userData;
      }
    } catch {}

    // ─── Hardcoded credentials ───
    // Admin: ONLY this exact email + password
    if (email === 'admin@blacklabel.com' && password === 'blacklabelblr') {
      const adminUser = { id: 1, name: 'Admin', email: 'admin@blacklabel.com', role: 'admin' };
      const mockToken = 'admin-jwt-' + Date.now();
      setUser(adminUser);
      setToken(mockToken);
      localStorage.setItem('bl-token', mockToken);
      localStorage.setItem('bl-user', JSON.stringify(adminUser));
      return adminUser;
    }

    // Regular user login — any email with any password works as customer
    if (email && password) {
      const localPart = email.split('@')[0];
      const rawName = localPart.split(/[._\-]/)[0];
      const name = rawName.charAt(0).toUpperCase() + rawName.slice(1).toLowerCase();
      const userData = { id: Date.now(), name, email, role: 'user' };
      const mockToken = 'user-jwt-' + Date.now();
      setUser(userData);
      setToken(mockToken);
      localStorage.setItem('bl-token', mockToken);
      localStorage.setItem('bl-user', JSON.stringify(userData));
      return userData;
    }

    throw new Error('Invalid credentials');
  };

  const googleLogin = async (targetRole = 'user', googleEmail = '') => {
    // Google login is ONLY for regular users — NOT for admin
    if (targetRole === 'admin') {
      throw new Error('Google login is not available for admin. Use email & password.');
    }

    const emailToUse = googleEmail || 'user@gmail.com';
    const localPart = emailToUse.split('@')[0];
    const rawFirstName = localPart.split(/[._\-]/)[0];
    const name = rawFirstName.charAt(0).toUpperCase() + rawFirstName.slice(1).toLowerCase();

    const userData = { id: Date.now(), name, email: emailToUse, role: 'user', provider: 'google' };
    const mockToken = 'google-jwt-' + Date.now();
    setUser(userData);
    setToken(mockToken);
    localStorage.setItem('bl-token', mockToken);
    localStorage.setItem('bl-user', JSON.stringify(userData));
    return userData;
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('bl-token');
    localStorage.removeItem('bl-user');
  };

  return (
    <AuthContext.Provider value={{ user, token, login, googleLogin, logout, isAuthenticated: !!user, isAdmin: user?.role === 'admin' }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
