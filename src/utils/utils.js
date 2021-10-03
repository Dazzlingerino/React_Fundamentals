import moment from 'moment';

export const getTimeFromMin = (min) => {
	if (min >= 24 * 60 || min < 0) {
		throw new RangeError(
			'Valid input should be greater than or equal to 0 and less than 1440.'
		);
	}
	const h = (min / 60) | 0,
		m = min % 60 | 0;
	return moment.utc().hours(h).minutes(m).format('HH:mm');
};

export function removeItem(arr, value) {
	return arr.filter((ele) => {
		return ele.id !== value;
	});
}

export const getItemFromLocalStorage = (key) => {
	return JSON.parse(localStorage.getItem(key));
};

export const setItemToLocalStorage = (key, value) => {
	localStorage.setItem(key, JSON.stringify(value));
};
