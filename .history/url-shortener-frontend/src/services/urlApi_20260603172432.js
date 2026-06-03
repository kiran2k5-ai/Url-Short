import api from "./api";

export const getUrls = () =>
    api.get("/urls");

export const createUrl = (data) =>
    api.post("/urls", data);

export const updateUrl = (id, data) =>
    api.put(`/urls/${id}`, data);

export const deleteUrl = (id) =>
    api.delete(`/urls/${id}`);