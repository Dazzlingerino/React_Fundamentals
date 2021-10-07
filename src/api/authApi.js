import { axiosInstance } from './index';

const urlLogin = 'login';
const urlLogout = 'logout';

export const authApi = {
	loginUser: async (payload) => {
		return await axiosInstance.post(urlLogin, { ...payload });
	},
	logout: async () => {
		return await axiosInstance.delete(urlLogout);
	},
};
