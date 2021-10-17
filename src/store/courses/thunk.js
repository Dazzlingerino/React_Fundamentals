import { message } from 'antd';

import { coursesApi } from '../../api/coursesApi';
import { setAppError } from '../app/actionCreators';
import { transformHttpErrorToAppError } from '../app/transformHttpError';
import {
	finishDeleteCourse,
	finishSaveCourse,
	finishUpdateCourse,
	getCourseById,
	getCourses,
	startDeleteCourse,
	startSaveCourse,
	startUpdateCourse,
} from './actionCreators';

export const getCourseByIdThunk = (courseId) => async (dispatch) => {
	let response;
	try {
		response = await coursesApi.getCourse(courseId);
	} catch (error) {
		dispatch(setAppError(transformHttpErrorToAppError(error)));
		return;
	}
	const { status, data } = response;
	if (status === 200) {
		const { result } = data;
		dispatch(getCourseById(result));
	} else {
		dispatch(setAppError(transformHttpErrorToAppError(status)));
	}
};

export const getCoursesThunk = () => async (dispatch) => {
	let response;
	try {
		response = await coursesApi.getAll();
	} catch (error) {
		dispatch(setAppError(transformHttpErrorToAppError(error)));
		return;
	}
	const { status, data } = response;
	if (status === 200) {
		const { result } = data;
		dispatch(getCourses(result));
	} else {
		dispatch(setAppError(transformHttpErrorToAppError(status)));
	}
};

export const saveCourseThunk = (course, history) => async (dispatch) => {
	dispatch(startSaveCourse());
	let response;
	try {
		response = await coursesApi.add(course);
	} catch (error) {
		dispatch(setAppError(transformHttpErrorToAppError(error)));
		return;
	}
	const { status, data } = response;
	const { result, errors } = data;
	if (status === 201) {
		dispatch(finishSaveCourse(result));
		message.success('Course created successfully');
		history.push('/courses');
	} else {
		dispatch(setAppError(errors));
	}
};

export const deleteCourseThunk = (id) => async (dispatch) => {
	dispatch(startDeleteCourse(id));
	let response;
	try {
		response = await coursesApi.delete(id);
	} catch (error) {
		dispatch(setAppError(transformHttpErrorToAppError(error)));
		return;
	}
	const { status } = response;
	if (status === 200) {
		dispatch(finishDeleteCourse(id));
		message.success('Course deleted successfully');
	} else {
		dispatch(setAppError(transformHttpErrorToAppError(status)));
	}
};

export const updateCourseThunk = (id, values, history) => async (dispatch) => {
	dispatch(startUpdateCourse(id));
	let response;
	try {
		response = await coursesApi.update(id, values);
	} catch (error) {
		dispatch(setAppError(transformHttpErrorToAppError(error)));
		return;
	}
	const { data, status } = response;
	if (status === 200) {
		const { successful, result } = data;
		if (successful) {
			dispatch(finishUpdateCourse(data));
			history.push('/courses');
			message.success('Course updated successfully');
			dispatch(getCoursesThunk());
		} else {
			dispatch(setAppError(result));
			return false;
		}
	} else {
		dispatch(setAppError(transformHttpErrorToAppError(status)));
	}
};
