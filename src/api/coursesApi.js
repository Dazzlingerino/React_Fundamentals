import { axiosInstance } from './index';

const baseUrl = 'courses';

export const coursesApi = {
	getAll: async () => {
		return await axiosInstance.get(`${baseUrl}/all`);
	},
	getCourse: async (id) => {
		return await axiosInstance.get(`${baseUrl}/${id}`);
	},
	add: async (payload) => {
		return await axiosInstance.post(`${baseUrl}/add`, { ...payload });
	},
	delete: async (id) => {
		return await axiosInstance.delete(`${baseUrl}/${id}`);
	},
	update: async (id, body) => {
		return await axiosInstance.put(`${baseUrl}/${id}`, { ...body });
	},
};
