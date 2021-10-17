import { message } from 'antd';

import { authApi } from '../../api/authApi';
import { registrationApi } from '../../api/registrationApi';
import { usersApi } from '../../api/usersApi';
import { LocalStorage } from '../../utils/localStorage';
import { setAppError } from '../app/actionCreators';
import { transformHttpErrorToAppError } from '../app/transformHttpError';
import { login, logout, setCurrentUserRole } from './actionCreators';

export const registrationThunk = (values, history) => async (dispatch) => {
	let response;
	try {
		response = await registrationApi.register(values);
	} catch (error) {
		dispatch(setAppError(transformHttpErrorToAppError(error)));
		return;
	}
	const { status } = response;
	if (status === 201) {
		message.success(`User with email ${values.email} was created.`);
		setTimeout(() => history.push('/login'), 1500);
	} else {
		dispatch(setAppError('User with this email already exists'));
	}
};

export const loginThunk = (values, setToken) => async (dispatch) => {
	let response;
	try {
		response = await authApi.loginUser(values);
	} catch (error) {
		dispatch(setAppError(transformHttpErrorToAppError(error)));
		return;
	}
	const { status, data } = response;
	if (status === 201) {
		const token = data.result;
		const { email, name } = data.user;
		dispatch(login({ token, email, name }));
		setToken(token);
	} else {
		dispatch(setAppError(transformHttpErrorToAppError(status)));
	}
};

export const logoutThunk = () => async (dispatch) => {
	let response;
	try {
		response = await authApi.logout();
	} catch (error) {
		dispatch(setAppError(transformHttpErrorToAppError(error)));
		return;
	}
	const { status } = response;
	if (status === 200) {
		LocalStorage.removeToken();
		dispatch(logout());
	} else {
		LocalStorage.removeToken();
		dispatch(setAppError(transformHttpErrorToAppError(status)));
	}
};

export const getCurrentUserThunk = () => async (dispatch) => {
	let response;
	try {
		response = await usersApi.me();
	} catch (error) {
		dispatch(setAppError(transformHttpErrorToAppError(error)));
		return;
	}
	const { status, data } = response;
	if (status === 200) {
		const { role } = data.result;
		dispatch(setCurrentUserRole(role));
	} else {
		dispatch(setAppError(transformHttpErrorToAppError(status)));
	}
};
