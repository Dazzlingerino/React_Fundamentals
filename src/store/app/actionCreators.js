import * as actions from './actionTypes';

export const setAppError = (message) => ({
	type: actions.SET_APP_ERROR,
	payload: message,
});
export const clearAppError = () => ({
	type: actions.CLEAR_APP_ERROR,
});
