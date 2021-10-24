import { screen } from '@testing-library/dom';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';

import Header from '../Header';

const mockedState = {
	user: {
		isAuth: true,
		name: 'Test Name',
	},
};

const mockedStore = {
	getState: () => mockedState,
	subscribe: jest.fn(),
	dispatch: jest.fn(),
};

describe('Header component', () => {
	test("header has user's name", () => {
		render(
			<Provider store={mockedStore}>
				<Header />
			</Provider>
		);
		expect(screen.queryByText('Test Name')).toBeInTheDocument();
	});

	test('header has logo', () => {
		const { getByAltText } = render(
			<Provider store={mockedStore}>
				<Header />
			</Provider>
		);
		getByAltText('logo');
	});
});
