import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { tokenStorage } from '@/lib/token-storage';
import { loginApi, User } from '@/lib/auth-api';

interface AuthContextType {
  token: string | null;
  user: User | null;
  isHydrated: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  setUser: (user: User | null) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);
  const [isHydrated, setIsHydrated] = useState(false);

  // Hydrate token from SecureStore on app startup
  useEffect(() => {
    async function loadToken() {
      const storedToken = await tokenStorage.getToken();
      setToken(storedToken);
      setIsHydrated(true);
    }
    loadToken();
  }, []);

  const login = async (email: string, password: string) => {
    const response = await loginApi(email, password);
    await tokenStorage.setToken(response.token);
    setToken(response.token);
    setUser(response.user);
  };

  const logout = async () => {
    await tokenStorage.removeToken();
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ token, user, isHydrated, login, logout, setUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
