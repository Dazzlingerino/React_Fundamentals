import * as actions from './actionTypes';

export const saveAuthor = (author) => ({
	type: actions.SAVE_AUTHOR,
	payload: author,
});

export const deleteAuthor = (id) => ({
	type: actions.DELETE_AUTHOR,
	payload: id,
});

export const getAuthors = (authors) => ({
	type: actions.GET_AUTHORS,
	payload: authors,
});
