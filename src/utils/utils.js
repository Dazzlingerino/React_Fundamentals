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

export function validate(elementId, message) {
	const regName = /^[a-zA-Z]+ [a-zA-Z]+$/;
	const name = document.getElementById(elementId).value;
	if (!regName.test(name)) {
		message.error('Please enter your full name (first & last name).');
		document.getElementById('name').focus();
		return false;
	} else {
		message.success('Author created successfully');
		return true;
	}
}

export const makeUniqueAuthorsList = (authors) =>
	Array.from(new Set(authors.map((el) => el.name))).map((name) => {
		return {
			name: name,
			id: authors.find((el) => el.name === name).id,
		};
	});
