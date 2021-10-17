import moment from 'moment';

export const getTimeFromMin = (min) => {
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

export function truncate(str) {
	return str.length > 34 ? str.substring(0, 34) + '...' : str;
}

export const updateObjectInArray = (items, itemId, id, newObjProps) => {
	return items.map((updated) => {
		if (updated[id] === itemId) {
			return { ...updated, ...newObjProps };
		}
		return updated;
	});
};

export const authorsFinder = (authorsIDs, authors) => {
	let arrayOfAuthors;
	arrayOfAuthors = authorsIDs?.map((id) => authors?.find((a) => a.id === id));
	return arrayOfAuthors?.filter((el) => !!el);
};
