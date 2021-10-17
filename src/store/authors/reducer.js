import * as actions from './actionTypes';

const authorsInitialState = {
	authors: [],
	courseAuthors: [],
	isSaveLoading: false,
};

export default function authorsReducer(state = authorsInitialState, action) {
	const { type, payload } = action;
	switch (type) {
		case actions.GET_AUTHORS:
			return {
				...state,
				authors: payload,
			};
		case actions.SET_COURSE_AUTHORS:
			return {
				...state,
				courseAuthors: payload,
			};
		case actions.ADD_COURSE_AUTHOR:
			return {
				...state,
				courseAuthors: [...state.courseAuthors, payload],
			};
		case actions.DELETE_COURSE_AUTHOR:
			return {
				...state,
				courseAuthors: state.courseAuthors.filter(
					(author) => author.id !== payload.id
				),
			};
		case actions.START_SAVE_AUTHOR:
			return {
				...state,
				isSaveLoading: true,
			};
		case actions.FINISH_SAVE_AUTHOR:
			return {
				...state,
				isSaveLoading: false,
				authors: [...state.authors, payload],
			};
		case actions.DELETE_AUTHOR:
			return {
				...state,
				authors: state.authors.filter((author) => author.id !== payload),
			};
		default:
			return state;
	}
}
