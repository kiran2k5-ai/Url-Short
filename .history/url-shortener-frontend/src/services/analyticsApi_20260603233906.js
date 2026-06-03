import api from "./api";

export const getAnalyticsRequest = (urlId) => api.get(`/analytics/${urlId}`);
