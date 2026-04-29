'use client';

import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { authAPI } from './api';
import { IUser } from '../types';

interface AuthContextType {
  user: IUser | null;
  loading: boolean;
  login: (mobile: string, otp: string) => Promise<void>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<IUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    refreshUser();
  }, []);

  const refreshUser = async () => {
    try {
      const res = await authAPI.getMe();
      if (res.data.success && res.data.data) {
        setUser(res.data.data);
        // Set role cookie for middleware
        document.cookie = `user_role=${res.data.data.role}; path=/; max-age=604800`;
      } else {
        setUser(null);
      }
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  const login = async (mobile: string, otp: string) => {
    try {
      const res = await authAPI.verifyOTP(mobile, otp);
      if (res.data.success) {
        if (res.data.user) {
          document.cookie = `user_role=${res.data.user.role}; path=/; max-age=604800`;
          await refreshUser();
          window.location.href = `/${res.data.user.role}`;
        } else if (res.data.registered === false) {
          throw new Error('This mobile number is not registered in our database.');
        }
      }
    } catch (error: any) {
      console.error('Login Error:', error);
      throw error;
    }
  };

  const logout = async () => {
    // Clear cookies
    document.cookie = "auth_token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie = "user_role=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    setUser(null);
    window.location.href = '/login';
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout, refreshUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used within AuthProvider');
  return ctx;
};

export const getDashboardRoute = (role: string) => `/${role.toLowerCase()}`;

