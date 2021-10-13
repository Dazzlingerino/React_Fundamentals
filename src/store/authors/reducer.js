import * as actions from './actionTypes';

const authorsInitialState = {
	authors: [],
};
export default function authorsReducer(state = authorsInitialState, action) {
	switch (action.type) {
		case actions.GET_AUTHORS:
			return {
				...state,
				authors: action.payload,
			};
		case actions.SAVE_AUTHOR:
			return {
				...state,
				authors: [...state.authors, action.payload],
			};

		case actions.DELETE_AUTHOR:
			return {
				...state,
				authors: state.authors.filter((author) => author.id !== action.payload),
			};
		default:
			return state;
	}
}
