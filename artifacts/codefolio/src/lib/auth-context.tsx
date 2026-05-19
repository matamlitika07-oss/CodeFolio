import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { AuthResponse, AuthUser } from "@workspace/api-client-react";

interface AuthContextType {
  token: string | null;
  user: AuthUser | null;
  login: (data: AuthResponse) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<AuthUser | null>(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("codefolio_token");
    const storedUser = localStorage.getItem("codefolio_user");
    
    if (storedToken && storedUser) {
      setToken(storedToken);
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        console.error("Failed to parse stored user", e);
      }
    }
  }, []);

  const login = (data: AuthResponse) => {
    setToken(data.token);
    setUser(data.user);
    localStorage.setItem("codefolio_token", data.token);
    localStorage.setItem("codefolio_user", JSON.stringify(data.user));
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("codefolio_token");
    localStorage.removeItem("codefolio_user");
  };

  return (
    <AuthContext.Provider value={{ token, user, login, logout, isAuthenticated: !!token }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
