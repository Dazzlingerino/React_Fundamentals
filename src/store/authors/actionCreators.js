import * as actions from './actionTypes';

export const deleteAuthor = (id) => ({
	type: actions.DELETE_AUTHOR,
	payload: id,
});

export const getAuthors = (authors) => ({
	type: actions.GET_AUTHORS,
	payload: authors,
});
export const startSaveAuthor = () => ({
	type: actions.START_SAVE_AUTHOR,
});

export const finishSaveAuthor = (author) => ({
	type: actions.FINISH_SAVE_AUTHOR,
	payload: author,
});

export const addCourseAuthor = (courseAuthor) => ({
	type: actions.ADD_COURSE_AUTHOR,
	payload: courseAuthor,
});

export const deleteCourseAuthor = (courseAuthor) => ({
	type: actions.DELETE_COURSE_AUTHOR,
	payload: courseAuthor,
});

export const setCourseAuthors = (courseAuthors) => ({
	type: actions.SET_COURSE_AUTHORS,
	payload: courseAuthors,
});
