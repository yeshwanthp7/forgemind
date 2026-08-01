import React, { createContext, useContext, useState, useEffect } from 'react';

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
  isAuthenticated: true,
  user: null,
  loading: false,
  login: async () => {},
  logout: () => {},
  selectDemoAccount: () => {}
});

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem('forgemind-user');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        // Fallback default user
      }
    }
    return DEMO_ACCOUNTS[2]; // Default to Plant Manager for initial dashboard viewing
  });

  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    const savedAuth = localStorage.getItem('forgemind-auth');
    return savedAuth !== null ? JSON.parse(savedAuth) : true;
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      localStorage.setItem('forgemind-user', JSON.stringify(user));
    }
    localStorage.setItem('forgemind-auth', JSON.stringify(isAuthenticated));
  }, [user, isAuthenticated]);

  const login = async (email, password) => {
    setLoading(true);
    // Simulate network authentication request
    await new Promise((resolve) => setTimeout(resolve, 600));

    const matchedAccount = DEMO_ACCOUNTS.find(
      (acc) => acc.email.toLowerCase() === (email || '').toLowerCase()
    ) || DEMO_ACCOUNTS[2];

    setUser(matchedAccount);
    setIsAuthenticated(true);
    setLoading(false);
    return matchedAccount;
  };

  const selectDemoAccount = (demoAccount) => {
    setUser(demoAccount);
    setIsAuthenticated(true);
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
