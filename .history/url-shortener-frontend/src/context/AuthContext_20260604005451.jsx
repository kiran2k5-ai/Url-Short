import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";

import { loginRequest, signupRequest } from "../services/authApi";
import { registerUnauthorizedCallback } from "../services/api";

const AuthContext = createContext(null);
const AUTH_USER_KEY = "authUser";

const readStoredUser = () => {
	try {
		const raw = localStorage.getItem(AUTH_USER_KEY);

		return raw ? JSON.parse(raw) : null;
	} catch {
		return null;
	}
};

const decodeToken = (token) => {
	try {
		const payload = token.split(".")[1];
		const normalizedPayload = payload.replace(/-/g, "+").replace(/_/g, "/");
		const decoded = atob(normalizedPayload);

		return JSON.parse(
			decodeURIComponent(
				decoded
					.split("")
					.map((char) => `%${char.charCodeAt(0).toString(16).padStart(2, "0")}`)
					.join("")
			)
		);
	} catch {
		return null;
	}
};

const buildDisplayName = (email) => {
	if (!email) {
		return "Member";
	}

	const localPart = email.split("@")[0] || "member";

	return localPart
		.replace(/[._-]+/g, " ")
		.replace(/\b\w/g, (char) => char.toUpperCase());
};

export function AuthProvider({ children }) {
	const [token, setToken] = useState(null);
	const [user, setUser] = useState(null);
	const [loading, setLoading] = useState(true);

	// Initialize auth state
	useEffect(() => {
		const initAuth = () => {
			try {
				const storedToken = localStorage.getItem("token");
				const storedUser = readStoredUser();

				if (storedToken) {
					const decoded = decodeToken(storedToken);
					const isExpired = decoded && decoded.exp ? decoded.exp * 1000 < Date.now() : false;

					if (decoded && !isExpired) {
						setToken(storedToken);
						setUser(storedUser || {
							id: decoded.id,
							email: decoded.email,
							name: buildDisplayName(decoded.email)
						});
					} else {
						// Token is invalid or expired, clear it
						localStorage.removeItem("token");
						localStorage.removeItem(AUTH_USER_KEY);
					}
				}
			} catch (error) {
				console.error("Error restoring auth session:", error);
			} finally {
				setLoading(false);
			}
		};

		initAuth();
	}, []);

	// Register Axios 401 interceptor callback
	useEffect(() => {
		registerUnauthorizedCallback(() => {
			setToken(null);
			setUser(null);
			toast.error("Session expired. Please log in again.");
		});

		return () => {
			registerUnauthorizedCallback(null);
		};
	}, []);

	const signup = useCallback(async (payload) => {
		const response = await signupUser(payload);
		const storedUser = {
			...response.user,
			name: response.user?.name || buildDisplayName(response.user?.email)
		};

		localStorage.setItem(AUTH_USER_KEY, JSON.stringify(storedUser));
		setUser(storedUser);

		return response;
	}, []);

	const login = useCallback(async (payload) => {
		const response = await loginUser(payload);
		const decoded = decodeToken(response.token);
		const storedUser = readStoredUser();
		const nextUser = {
			id: decoded?.id,
			email: decoded?.email || payload.email,
			name: storedUser?.email === (decoded?.email || payload.email)
				? storedUser.name
				: buildDisplayName(decoded?.email || payload.email)
		};

		localStorage.setItem("token", response.token);
		localStorage.setItem(AUTH_USER_KEY, JSON.stringify(nextUser));
		setToken(response.token);
		setUser(nextUser);

		return response;
	}, []);

	const logout = useCallback(() => {
		localStorage.removeItem("token");
		localStorage.removeItem(AUTH_USER_KEY);
		setToken(null);
		setUser(null);
		toast.success("Logged out successfully.");
	}, []);

	const value = useMemo(() => ({
		token,
		user,
		loading,
		isAuthenticated: Boolean(token),
		signup,
		login,
		logout,
		setUser
	}), [token, user, loading, signup, login, logout]);

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
	const context = useContext(AuthContext);

	if (!context) {
		throw new Error("useAuth must be used within an AuthProvider");
	}

	return context;
};
