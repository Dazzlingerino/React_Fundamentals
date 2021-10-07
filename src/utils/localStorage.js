const TOKEN = 'token';

export class LocalStorage {
	static setToken = (token) =>
		localStorage.setItem(TOKEN, JSON.stringify(token));
	static removeToken = () => localStorage.removeItem(TOKEN);
	static getToken = () => {
		const userToken = localStorage.getItem(TOKEN);
		return userToken ? JSON.parse(userToken) : null;
	};
}
