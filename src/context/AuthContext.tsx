import { createContext, useContext, useState, useEffect, type ReactNode } from "react";

/* ───────── types ───────── */
export interface User {
  email: string;
  name: string;
  role: "user" | "admin";
}

interface AuthContextValue {
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
  isAuthenticated: boolean;
  isAdmin: boolean;
  login: (user: User, tokens?: { accessToken?: string; refreshToken?: string }) => void;
  logout: () => void;
}

/* ───────── context ───────── */
const AuthContext = createContext<AuthContextValue | undefined>(undefined);

const STORAGE_KEY = "cinesphere_user";
const ACCESS_TOKEN_KEY = "cinesphere_access_token";
const REFRESH_TOKEN_KEY = "cinesphere_refresh_token";

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      return stored ? (JSON.parse(stored) as User) : null;
    } catch {
      return null;
    }
  });
  const [accessToken, setAccessToken] = useState<string | null>(() => localStorage.getItem(ACCESS_TOKEN_KEY));
  const [refreshToken, setRefreshToken] = useState<string | null>(() => localStorage.getItem(REFRESH_TOKEN_KEY));

  useEffect(() => {
    if (user) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(STORAGE_KEY);
    }
  }, [user]);

  const login = (userData: User, tokens?: { accessToken?: string; refreshToken?: string }) => {
    setUser(userData);

    if (tokens?.accessToken) {
      setAccessToken(tokens.accessToken);
      localStorage.setItem(ACCESS_TOKEN_KEY, tokens.accessToken);
    }

    if (tokens?.refreshToken) {
      setRefreshToken(tokens.refreshToken);
      localStorage.setItem(REFRESH_TOKEN_KEY, tokens.refreshToken);
    }
  };

  const logout = () => {
    setUser(null);
    setAccessToken(null);
    setRefreshToken(null);
    localStorage.removeItem(ACCESS_TOKEN_KEY);
    localStorage.removeItem(REFRESH_TOKEN_KEY);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        accessToken,
        refreshToken,
        isAuthenticated: !!user,
        isAdmin: user?.role === "admin",
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within an AuthProvider");
  return ctx;
};
