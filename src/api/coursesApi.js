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
};
axiosInstance.interceptors.response.use(
	(response) => {
		if (response.status === 201 && response.config.url === 'courses/add') {
			window.location.pathname = '/courses';
		}
		return response;
	},
	(error) => {
		return error.response;
	}
);
