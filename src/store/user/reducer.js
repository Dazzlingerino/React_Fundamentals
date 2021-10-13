import * as actions from './actionTypes';

export const userInitialState = {
	isAuth: false,
	name: '',
	email: '',
	token: '',
};

export default function userReducer(state = userInitialState, action) {
	switch (action.type) {
		case actions.LOGIN:
			return {
				...state,
				...action.payload,
			};
		case actions.LOGOUT:
			return {
				...state,
				...action.payload,
			};
		default:
			return state;
	}
}
