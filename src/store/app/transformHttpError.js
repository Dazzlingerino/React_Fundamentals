import Mapper from '../../utils/mapper';

export const transformHttpErrorToAppError = (error) => {
	console.log('HttpError:', error);

	if (error) {
		return Mapper.mapHttpError(error) || 'Unknown Error';
	}

	return 'Unknown Error';
};
