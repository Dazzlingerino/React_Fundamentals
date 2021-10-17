import { authorsApi } from '../../api/authorsApi';
import { setAppError } from '../app/actionCreators';
import { transformHttpErrorToAppError } from '../app/transformHttpError';
import {
	finishSaveAuthor,
	getAuthors,
	startSaveAuthor,
} from './actionCreators';

export const getAuthorsThunk = () => async (dispatch) => {
	let response;
	try {
		response = await authorsApi.getAll();
	} catch (error) {
		dispatch(setAppError(transformHttpErrorToAppError(error)));
		return;
	}
	const { status, data } = response;
	if (status === 200) {
		const { result } = data;
		dispatch(getAuthors(result));
	} else {
		dispatch(setAppError(transformHttpErrorToAppError(status)));
	}
};

export const saveAuthorThunk = (author) => async (dispatch) => {
	dispatch(startSaveAuthor());
	let response;
	try {
		response = await authorsApi.add(author);
	} catch (error) {
		dispatch(setAppError(transformHttpErrorToAppError(error)));
		return;
	}
	const { status, data } = response;
	if (status === 201) {
		const { result } = data;
		dispatch(finishSaveAuthor(result));
	} else {
		dispatch(setAppError(transformHttpErrorToAppError(status)));
	}
};
