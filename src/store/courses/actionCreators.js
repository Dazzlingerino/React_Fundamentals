import * as actions from './actionTypes';

export const getCourseById = (course) => ({
	type: actions.GET_COURSE,
	payload: course,
});

export const resetCourse = () => ({
	type: actions.RESET_COURSE,
});

export const getCourses = (courses) => ({
	type: actions.GET_COURSES,
	payload: courses,
});

export const startSaveCourse = () => ({
	type: actions.START_SAVE_COURSE,
});

export const finishSaveCourse = (course) => ({
	type: actions.FINISH_SAVE_COURSE,
	payload: course,
});

export const startDeleteCourse = (id) => ({
	type: actions.START_DELETE_COURSE,
	payload: id,
});

export const finishDeleteCourse = (id) => ({
	type: actions.FINISH_DELETE_COURSE,
	payload: id,
});

export const startUpdateCourse = (id) => ({
	type: actions.START_UPDATE_COURSE,
	payload: id,
});

export const finishUpdateCourse = (id, course) => ({
	type: actions.FINISH_UPDATE_COURSE,
	payload: { id, course },
});
