import api from "./api";

export const getAnalytics = () =>
    api.get("/analytics");