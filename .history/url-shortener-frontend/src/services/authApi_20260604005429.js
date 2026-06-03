import api from "./api";

export const signupRequest = (payload) => api.post("/auth/signup", payload);
export const loginRequest = (payload) => api.post("/auth/login", payload);
