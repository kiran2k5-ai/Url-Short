import { createContext, useContext, useState, useEffect, useCallback } from "react";
import { jwtDecode } from "jwt-decode";

const AuthContext = createContext();
const API_BASE_URL = "https://url-short-caxa.onrender.com/api";

export function AuthProvider({ children }) {
  const [token, setToken] = useState(
    localStorage.getItem("token")
  );
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Extract user from JWT or fetch from backend
  const extractUserFromToken = useCallback((jwtToken) => {
    try {
      const decoded = jwtDecode(jwtToken);
      return {
        id: decoded.id || decoded.userId,
        email: decoded.email,
        name: decoded.name || "User",
      };
    } catch (err) {
      console.error("Failed to decode token:", err);
      return null;
    }
  }, []);

  // Fetch user profile from backend
  const fetchUserProfile = useCallback(async (jwtToken) => {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/profile`, {
        headers: { Authorization: `Bearer ${jwtToken}` },
      });
      if (response.ok) {
        const data = await response.json();
        return data.user || data.data;
      }
    } catch (err) {
      console.error("Failed to fetch user profile:", err);
    }
    return null;
  }, []);

  const login = useCallback(async (jwtToken) => {
    setLoading(true);
    setError(null);
    try {
      localStorage.setItem("token", jwtToken);
      setToken(jwtToken);

      // Try to get user from backend first, fallback to JWT
      const profileData = await fetchUserProfile(jwtToken);
      const userData = profileData || extractUserFromToken(jwtToken);
      
      setUser(userData);
    } catch (err) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [fetchUserProfile, extractUserFromToken]);

  const logout = useCallback(() => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
    setError(null);
  }, []);

  const updateProfile = useCallback(async (updates) => {
    if (!token) throw new Error("Not authenticated");
    try {
      const response = await fetch(`${API_BASE_URL}/auth/profile`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updates),
      });

      if (!response.ok) throw new Error("Failed to update profile");
      
      const data = await response.json();
      setUser(data.user || { ...user, ...updates });
      return data;
    } catch (err) {
      setError(err.message);
      throw err;
    }
  }, [token, user]);

  // Initialize user on mount or when token changes
  useEffect(() => {
    if (token) {
      const userData = extractUserFromToken(token);
      setUser(userData);
    }
  }, [token, extractUserFromToken]);

  return (
    <AuthContext.Provider
      value={{
        token,
        user,
        loading,
        error,
        login,
        logout,
        updateProfile,
        isAuthenticated: !!token,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};