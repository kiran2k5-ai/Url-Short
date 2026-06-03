import axios from "axios";

export const API_BASE_URL = "https://url-short-caxa.onrender.com/api";

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        "Content-Type": "application/json"
    }
});

let onUnauthorizedCallback = null;

export const registerUnauthorizedCallback = (callback) => {
    onUnauthorizedCallback = callback;
};

api.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");

    if (token) {
        config.headers = {
            ...config.headers,
            Authorization: `Bearer ${token}`
        };
    }

    return config;
});

api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            localStorage.removeItem("token");
            localStorage.removeItem("authUser");
            if (onUnauthorizedCallback) {
                onUnauthorizedCallback();
            }
        }

        return Promise.reject(error);
    }
);

export default api;