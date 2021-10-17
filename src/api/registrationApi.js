import { axiosInstance } from './index';

const baseUrl = 'register';

export const registrationApi = {
	register: async (payload) => {
		return await axiosInstance.post(`${baseUrl}`, { ...payload });
	},
};
