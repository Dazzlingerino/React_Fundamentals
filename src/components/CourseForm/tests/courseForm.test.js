import React from 'react';

import { fireEvent, screen } from '@testing-library/dom';
import { render } from '@testing-library/react';
import { Input } from 'antd';
import { createMemoryHistory } from 'history';
import * as ReactRedux from 'react-redux';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';

import { MOCK_STATE } from '../../../App';
import store from '../../../store';
import { saveAuthorThunk } from '../../../store/authors/thunk';
import CourseForm from '../CourseForm';

jest.mock('react-router-dom', () => ({
	...jest.requireActual('react-router-dom'),
	useHistory: () => ({
		push: jest.fn(),
	}),
	useParams: () => ({
		courseId: 'de5aaa59-90f5-4dbc-b8a9-aaf205c551ba',
	}),
}));

const mockDispatch = jest.fn();
jest.mock('react-redux', () => {
	const ActualReactRedux = jest.requireActual('react-redux');

	return {
		...ActualReactRedux,

		useSelector: jest.fn().mockImplementation(() => {
			return MOCK_STATE;
		}),

		useDispatch: () => jest.fn(),
		subscribe: jest.fn(),
		dispatch: () => mockDispatch,
	};
});

const reduxHooksMocker = () => {
	const mockedDispatch = jest.fn();
	ReactRedux.useSelector.mockImplementation((selectorFn) =>
		selectorFn(MOCK_STATE)
	);
	ReactRedux.useDispatch.mockReturnValue(mockedDispatch);
};

const thunk =
	({ dispatch, getState }) =>
	(next) =>
	(action) => {
		if (typeof action === 'function') {
			return action(dispatch, getState);
		}

		return next(action);
	};

const create = () => {
	const store = {
		getState: jest.fn(() => ({})),
		dispatch: jest.fn(),
	};
	const next = jest.fn();

	const invoke = (action) => thunk(store)(next)(action);

	return { store, next, invoke };
};

const setup = () => {
	const utils = render(<Input />);
	const input = utils.getByLabelText('author-input');
	return {
		input,
		...utils,
	};
};

describe('CourseForm component', () => {
	beforeAll(() => {
		ReactRedux.useDispatch = jest.fn().mockImplementation(() => jest.fn());
	});

	beforeEach(() => {
		const history = createMemoryHistory();
		reduxHooksMocker();
		ReactRedux.useDispatch.mockClear();
		history.push('/courses/update/de5aaa59-90f5-4dbc-b8a9-aaf205c551ba');
		render(
			<Provider store={store}>
				<Router history={history}>
					<CourseForm mode='update' />
				</Router>
			</Provider>
		);
	});

	test('CourseForm should show authors lists (all and course authors)', () => {
		expect(screen.queryAllByTestId('courseAuthorsList').length).toBe(2);
		expect(screen.queryAllByTestId('authorsList').length).toBe(2);
	});

	test("CourseForm 'Create author' click button should call dispatch", () => {
		const { input } = setup();
		const { store, invoke } = create();

		expect(store.dispatch).toHaveBeenCalledTimes(0);

		fireEvent.change(input, { target: { value: 'john deer' } });
		invoke((dispatch) => {
			dispatch(saveAuthorThunk(input.value));
		});

		expect(store.dispatch).toHaveBeenCalledTimes(1);
	});

	test("CourseForm 'Add author' button click should add an author to course authors list", () => {
		// all buttons are the same
		fireEvent.click(screen.getAllByTestId('addAuthorBtn')[0]);

		expect(screen.queryAllByTestId('courseAuthorsList')[2].innerHTML).toBe(
			'Anna Sidorenko'
		);
	});

	test("CourseForm 'Delete author' button click should delete an author from the course list", () => {
		// all buttons are the same
		fireEvent.click(screen.getAllByTestId('deleteAuthorBtn')[0]);

		expect(screen.queryAllByTestId('courseAuthorsList').length).toBe(1);
		expect(screen.queryAllByTestId('authorsList').length).toBe(3);
	});
});
