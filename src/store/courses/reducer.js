import * as actions from './actionTypes';

const coursesInitialState = {
	courses: [],
};

export default function coursesReducer(state = coursesInitialState, action) {
	switch (action.type) {
		case actions.GET_COURSES:
			return {
				...state,
				courses: action.payload,
			};
		case actions.SAVE_COURSE:
			return {
				...state,
				courses: [...state.courses, action.payload],
			};
		case actions.UPDATE_COURSE:
			return {
				...state,
			};
		case actions.DELETE_COURSE:
			return {
				...state,
				courses: state.courses.filter((course) => course.id !== action.payload),
			};
		default:
			return state;
	}
}
