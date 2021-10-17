import * as actions from './actionTypes';

export const setCurrentUserRole = (role) => ({
	type: actions.SET_CURRENT_USER_ROLE,
	payload: role,
});

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
