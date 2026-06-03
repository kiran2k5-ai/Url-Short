import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

import { loginRequest, signupRequest } from "../services/authApi";

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
	const [token, setToken] = useState(() => localStorage.getItem("token"));
	const [user, setUser] = useState(() => readStoredUser());

	useEffect(() => {
		if (!token) {
			return;
		}

		const decoded = decodeToken(token);

		if (!decoded) {
			return;
		}

		setUser((currentUser) => currentUser || {
			id: decoded.id,
			email: decoded.email,
			name: buildDisplayName(decoded.email)
		});
	}, [token]);

	const signup = useCallback(async (payload) => {
		const response = await signupRequest(payload);
		const storedUser = {
			...response.data.user,
			name: response.data.user?.name || buildDisplayName(response.data.user?.email)
		};

		localStorage.setItem(AUTH_USER_KEY, JSON.stringify(storedUser));
		setUser(storedUser);

		return response.data;
	}, []);

	const login = useCallback(async (payload) => {
		const response = await loginRequest(payload);
		const decoded = decodeToken(response.data.token);
		const storedUser = readStoredUser();
		const nextUser = {
			id: decoded?.id,
			email: decoded?.email || payload.email,
			name: storedUser?.email === (decoded?.email || payload.email)
				? storedUser.name
				: buildDisplayName(decoded?.email || payload.email)
		};

		localStorage.setItem("token", response.data.token);
		localStorage.setItem(AUTH_USER_KEY, JSON.stringify(nextUser));
		setToken(response.data.token);
		setUser(nextUser);

		return response.data;
	}, []);

	const logout = useCallback(() => {
		localStorage.removeItem("token");
		localStorage.removeItem(AUTH_USER_KEY);
		setToken(null);
		setUser(null);
	}, []);

	const value = useMemo(() => ({
		token,
		user,
		isAuthenticated: Boolean(token),
		signup,
		login,
		logout,
		setUser
	}), [token, user, signup, login, logout]);

	return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export const useAuth = () => {
	const context = useContext(AuthContext);

	if (!context) {
		throw new Error("useAuth must be used within an AuthProvider");
	}

	return context;
};
