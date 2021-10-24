import * as actions from './actionTypes';

export const userInitialState = {
	isAuth: false,
	name: 'Test Name',
	email: '',
	token: '',
};

export default function userReducer(state = userInitialState, action) {
	const { type, payload } = action;
	switch (type) {
		case actions.SET_CURRENT_USER_ROLE:
			return {
				...state,
				role: payload,
			};
		case actions.LOGIN:
			return {
				...state,
				...payload,
			};
		case actions.LOGOUT:
			return {
				...state,
				...payload,
			};
		default:
			return state;
	}
}
