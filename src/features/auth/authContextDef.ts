import { createContext } from 'react';
import { User, UserRole } from '@/types/user';

export interface AuthContextValue {
  user: User | null;
  role: UserRole | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  loginAsDemoUser: (role: UserRole) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextValue | undefined>(undefined);
