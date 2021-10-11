import { axiosInstance } from './index';

const baseUrl = 'authors';

export const authorsApi = {
	getAll: async () => {
		return await axiosInstance.get(`${baseUrl}/all`);
	},
	add: async (payload) => {
		return await axiosInstance.post(`${baseUrl}/add`, { ...payload });
	},
};
