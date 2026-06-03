import api from "./api";

export const signupUser = async (data) => {

    const response =
        await api.post(
            "/auth/signup",
            data
        );

    return response.data;
};

export const loginUser = async (data) => {

    const response =
        await api.post(
            "/auth/login",
            data
        );

    return response.data;
};