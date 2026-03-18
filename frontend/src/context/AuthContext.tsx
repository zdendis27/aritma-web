import { createContext, useEffect, useState } from "react";
import type { ReactNode } from "react";
import { authService } from "../services/authService";
import type { User } from "../types/User";

type AuthContextValue = {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
};

export const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("aritma_token");
    if (!token) {
      setLoading(false);
      return;
    }

    authService
      .me()
      .then((currentUser) => setUser(currentUser))
      .catch(() => {
        localStorage.removeItem("aritma_token");
      })
      .finally(() => setLoading(false));
  }, []);

  const value = {
    user,
    loading,
    login: async (email: string, password: string) => {
      const response = await authService.login({ email, password });
      localStorage.setItem("aritma_token", response.token);
      setUser(response.user);
    },
    logout: () => {
      localStorage.removeItem("aritma_token");
      setUser(null);
    }
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
