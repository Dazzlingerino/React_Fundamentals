import * as actions from './actionTypes';

const appInitialState = {
	appError: null,
};

export default function appReducer(state = appInitialState, action) {
	const { type, payload } = action;
	switch (type) {
		case actions.SET_APP_ERROR:
			return {
				...state,
				appError: payload,
			};
		case actions.CLEAR_APP_ERROR:
			return {
				...state,
				appError: null,
			};
		default:
			return state;
	}
}
