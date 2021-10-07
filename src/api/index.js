import axios from 'axios';
import { LocalStorage } from '../utils/localStorage';

const headers = {
	'Content-Type': 'application/json',
};
const baseURL = 'http://localhost:3000/';
export const axiosInstance = axios.create({
	baseURL,
	headers,
});

axiosInstance.interceptors.request.use(function (config) {
	const token = LocalStorage.getToken();
	if (token) {
		config.headers.Authorization = token;
	}

	return config;
});

axiosInstance.interceptors.response.use(
	(response) => {
		if (response.status === 200 && response.config.url === 'logout') {
			LocalStorage.removeToken();
			window.location.pathname = '/login';
		}
		return response;
	},
	(error) => {
		console.log('error', error);
		if (error.response.status === 401) {
			LocalStorage.removeToken();
			window.location.pathname = '/login';
		}
		return error.response;
	}
);
