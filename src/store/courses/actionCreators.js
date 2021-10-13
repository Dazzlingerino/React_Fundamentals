import * as actions from './actionTypes';

export const saveCourse = (course) => ({
	type: actions.SAVE_COURSE,
	payload: course,
});

export const deleteCourse = (id) => ({
	type: actions.DELETE_COURSE,
	payload: id,
});

export const updateCourse = (id) => ({
	type: actions.UPDATE_COURSE,
	payload: id,
});

export const getCourses = (courses) => ({
	type: actions.GET_COURSES,
	payload: courses,
});
