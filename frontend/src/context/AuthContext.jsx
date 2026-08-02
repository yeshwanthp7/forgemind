import React, { createContext, useContext, useState, useEffect } from 'react';
import { apiClient } from '../api/apiClient';

export const DEMO_ACCOUNTS = [
  {
    role: 'Worker',
    title: 'Shift Operator',
    email: 'worker@forgemind.ai',
    password: 'password123',
    name: 'Marcus Vance',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    zone: 'Zone A - Stamping',
    badgeId: 'EMP-9042'
  },
  {
    role: 'Safety Officer',
    title: 'EHS Safety Inspector',
    email: 'safety@forgemind.ai',
    password: 'password123',
    name: 'Elena Rostova',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    zone: 'Plant Wide Surveillance',
    badgeId: 'EHS-1092'
  },
  {
    role: 'Plant Manager',
    title: 'Executive Plant Director',
    email: 'manager@forgemind.ai',
    password: 'password123',
    name: 'Cmdr. Alex Vance',
    avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&auto=format&fit=crop&q=80',
    zone: 'All Production Zones',
    badgeId: 'EXEC-001'
  }
];

const AuthContext = createContext({
  isAuthenticated: false,
  user: null,
  loading: false,
  login: async () => {},
  register: async () => {},
  logout: () => {},
  selectDemoAccount: () => {}
});

// Map backend role values to frontend display roles used in routing
const normalizeRole = (backendRole) => {
  if (!backendRole) return backendRole;
  const r = String(backendRole).toLowerCase();
  if (r === 'worker') return 'Worker';
  if (r === 'manager' || r === 'admin' || r === 'plant_manager') return 'Plant Manager';
  if (r.includes('safety')) return 'Safety Officer';
  return backendRole;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('forgemind-user');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        return null;
      }
    }
    return null;
  });

  const [token, setToken] = useState(() => {
    return localStorage.getItem('forgemind-token') || null;
  });

  const [isAuthenticated, setIsAuthenticated] = useState(() => !!localStorage.getItem('forgemind-token'));

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      localStorage.setItem('forgemind-user', JSON.stringify(user));
    } else {
      localStorage.removeItem('forgemind-user');
    }

    if (token) {
      localStorage.setItem('forgemind-token', token);
      apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    } else {
      localStorage.removeItem('forgemind-token');
      delete apiClient.defaults.headers.common['Authorization'];
    }

    localStorage.setItem('forgemind-auth', JSON.stringify(isAuthenticated));
  }, [user, token, isAuthenticated]);

  const login = async (email, password) => {
    setLoading(true);
    try {
      const res = await apiClient.post('/auth/login', { email, password });
      const { user: u, token: t } = res.data;
      // Normalize backend role to frontend display role
      const normalizedRole = normalizeRole(u.role);
      const userWithRole = { ...u, role: normalizedRole };
      setUser(userWithRole);
      setToken(t);
      setIsAuthenticated(true);
      setLoading(false);
      return userWithRole;
    } catch (err) {
      setLoading(false);
      throw err;
    }
  };

  const register = async (payload) => {
    setLoading(true);
    try {
      const res = await apiClient.post('/auth/register', payload);
      const { user: u, token: t } = res.data;
      const normalizedRole = normalizeRole(u.role);
      const userWithRole = { ...u, role: normalizedRole };
      setToken(t);
      setIsAuthenticated(true);
      setLoading(false);
      return userWithRole;
    } catch (err) {
      setLoading(false);
      throw err;
    }
  };

  const selectDemoAccount = (demoAccount) => {
    // Fill form fields in the UI via Demo buttons — do not auto-login here.
    // kept for compatibility with UI helpers
    setUser(demoAccount);
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('forgemind-user');
    localStorage.setItem('forgemind-auth', JSON.stringify(false));
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
        loading,
        login,
        register,
        logout,
        selectDemoAccount,
        demoAccounts: DEMO_ACCOUNTS
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
