import api from "./api";

export const getUrlsRequest = () => api.get("/url/all");
export const createUrlRequest = (payload) => api.post("/url/create", payload);
export const updateUrlRequest = (id, payload) => api.put(`/url/${id}`, payload);
export const deleteUrlRequest = (id) => api.delete(`/url/${id}`);
export const bulkUploadUrlsRequest = (formData) =>
	api.post("/url/bulk-upload", formData, {
		headers: {
			"Content-Type": "multipart/form-data"
		}
	});
