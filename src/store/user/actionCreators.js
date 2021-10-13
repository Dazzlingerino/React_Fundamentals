import * as actions from './actionTypes';

export const login = (credentials) => ({
	type: actions.LOGIN,
	payload: { isAuth: true, ...credentials },
});

export const logout = () => ({
	type: actions.LOGOUT,
	payload: {
		isAuth: false,
		name: '',
		email: '',
		token: '',
	},
});
