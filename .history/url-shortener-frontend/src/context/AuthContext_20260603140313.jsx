import { createContext, useContext, useMemo, useState } from "react";
import toast from "react-hot-toast";
import api from "../api";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [token, setToken] = useState(localStorage.getItem("token") || "");
  const [loading, setLoading] = useState(false);

  const isAuthenticated = Boolean(token);

  const login = async ({ email, password }) => {
    setLoading(true);
    try {
      const response = await api.post("/auth/login", { email, password });
      const tokenValue = response.data.token;

      localStorage.setItem("token", tokenValue);
      setToken(tokenValue);
      toast.success("Welcome back!");
      return true;
    } catch (error) {
      const errorMessage = error?.response?.data?.message || "Login failed. Please try again.";
      toast.error(errorMessage);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const signup = async ({ name, email, password }) => {
    setLoading(true);
    try {
      await api.post("/auth/signup", { name, email, password });
      toast.success("Account created successfully. Please sign in.");
      return true;
    } catch (error) {
      const errorMessage = error?.response?.data?.message || "Signup failed. Please try again.";
      toast.error(errorMessage);
      return false;
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken("");
    toast.success("Logged out successfully.");
  };

  const value = useMemo(
    () => ({ token, loading, isAuthenticated, login, signup, logout }),
    [token, loading, isAuthenticated]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
