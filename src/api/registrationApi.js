import { axiosInstance } from './index';

const baseUrl = 'register';

export const registrationApi = {
	register: async (payload) => {
		return await axiosInstance.post(`${baseUrl}`, { ...payload });
	},
};
axiosInstance.interceptors.response.use(
	(response) => {
		if (response.status === 201 && response.config.url === 'register') {
			window.location.pathname = '/login';
		}
		return response;
	},
	(error) => {
		return error.response;
	}
);
