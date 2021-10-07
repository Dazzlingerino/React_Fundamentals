import { useState } from 'react';
import { LocalStorage } from '../localStorage';

export default function useToken() {
	const getToken = () => {
		return LocalStorage.getToken();
	};

	const [token, setToken] = useState(getToken());

	const saveToken = (userToken) => {
		LocalStorage.setToken(userToken);
		setToken(userToken);
	};

	return {
		setToken: saveToken,
		token,
	};
}
