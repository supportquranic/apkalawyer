import React, { useState, useEffect } from 'react';
import { User, UserRole } from '@/types/user';
import { DEMO_USERS } from './mockAuth';
import { safeStorage } from '@/lib/storage';
import { AuthContext, AuthContextValue } from './authContextDef';

const STORAGE_KEY = 'apkalawyer_demo_auth_user';

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(() => {
    return safeStorage.getItem<User | null>(STORAGE_KEY, DEMO_USERS.client);
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    if (user) {
      safeStorage.setItem(STORAGE_KEY, user);
    } else {
      safeStorage.removeItem(STORAGE_KEY);
    }
  }, [user]);

  const loginAsDemoUser = (role: UserRole) => {
    setIsLoading(true);
    setTimeout(() => {
      setUser(DEMO_USERS[role] || null);
      setIsLoading(false);
    }, 250);
  };

  const logout = () => {
    setUser(null);
  };

  const value: AuthContextValue = {
    user,
    role: user?.role || null,
    isAuthenticated: !!user,
    isLoading,
    loginAsDemoUser,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

// Re-exports for convenience
export { AuthContext } from './authContextDef';
export type { AuthContextValue } from './authContextDef';
export { useAuth } from './useAuth';
