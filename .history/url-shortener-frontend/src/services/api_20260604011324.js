import axios from "axios";

const api = axios.create({
    baseURL:
        "https://url-short-caxa.onrender.com/api",
    timeout: 15000
});

api.interceptors.request.use(
    (config) => {

        const token =
            localStorage.getItem(
                "token"
            );

        if (token) {

            config.headers.Authorization =
                `Bearer ${token}`;
        }

        return config;
    }
);
// src/services/authApi.js

import api from "./api";

export const loginUser = async (data) => {

    const response =
        await api.post(
            "/auth/login",
            data
        );

    return response.data;
};

export const signupUser = async (data) => {

    const response =
        await api.post(
            "/auth/signup",
            data
        );

    return response.data;
};
export default api;