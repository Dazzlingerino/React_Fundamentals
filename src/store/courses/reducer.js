import { updateObjectInArray } from '../../utils/utils';
import * as actions from './actionTypes';

const coursesInitialState = {
	courses: [],
	course: null,
	isCoursesLoading: false,
	isEditLoading: false,
	isSaveLoading: false,
	isDeleteLoading: false,
};

export default function coursesReducer(state = coursesInitialState, action) {
	const { type, payload } = action;
	switch (type) {
		case actions.RESET_COURSE:
			return {
				...state,
				course: null,
			};
		case actions.GET_COURSE:
			return {
				...state,
				course: payload,
			};
		case actions.GET_COURSES:
			return {
				...state,
				courses: payload,
			};
		case actions.START_SAVE_COURSE:
			return {
				...state,
				isSaveLoading: true,
			};
		case actions.FINISH_SAVE_COURSE:
			return {
				...state,
				isSaveLoading: false,
				courses: [...state.courses, payload],
			};
		case actions.START_UPDATE_COURSE:
			return {
				...state,
				isEditLoading: true,
			};
		case actions.FINISH_UPDATE_COURSE:
			return {
				...state,
				isEditLoading: false,
				courses: updateObjectInArray(state.courses, payload.id, 'id', {
					...payload.course,
				}),
			};
		case actions.START_DELETE_COURSE:
			return {
				...state,
				isDeleteLoading: true,
			};
		case actions.FINISH_DELETE_COURSE:
			return {
				...state,
				isDeleteLoading: false,
				courses: state.courses.filter((course) => course.id !== payload),
			};
		default:
			return state;
	}
}
