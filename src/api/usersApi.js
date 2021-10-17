import { axiosInstance } from './index';

const baseUrl = 'users';

export const usersApi = {
	me: async () => {
		return await axiosInstance.get(`${baseUrl}/me`);
	},
};
