import React from 'react';

import { fireEvent, screen } from '@testing-library/dom';
import { render } from '@testing-library/react';
import * as ReactRedux from 'react-redux';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';

import { MOCK_STATE } from '../../../App';
import store from '../../../store';
import Courses from '../Courses';

const mockDispatch = jest.fn();
const mockHistoryPush = jest.fn();

const MOCK_STATE_EMPTY_COURSES = {
	...MOCK_STATE,
	courses: { ...MOCK_STATE.courses, courses: [] },
};

jest.mock('react-router-dom', () => ({
	...jest.requireActual('react-router-dom'),
	useHistory: () => ({
		push: mockHistoryPush,
	}),
}));

jest.mock('react-text-truncate', () => {
	return ({ text }) => <div data-testid='description'>{text}</div>;
});

jest.mock('react-redux', () => {
	const ActualReactRedux = jest.requireActual('react-redux');

	return {
		...ActualReactRedux,

		useSelector: jest.fn().mockImplementation(() => {
			return MOCK_STATE;
		}),

		useDispatch: () => mockDispatch,
		subscribe: jest.fn(),
		dispatch: jest.fn(),
	};
});

const reduxHooksMocker = (testId) => {
	const mockedDispatch = jest.fn();
	if (testId === 'default') {
		ReactRedux.useSelector.mockImplementation((selectorFn) =>
			selectorFn(MOCK_STATE)
		);
	} else if (testId === 'emptyCoursesArray') {
		ReactRedux.useSelector.mockImplementation((selectorFn) =>
			selectorFn(MOCK_STATE_EMPTY_COURSES)
		);
	}

	ReactRedux.useDispatch.mockReturnValue(mockedDispatch);
};

describe('Courses component', () => {
	beforeAll(() => {
		ReactRedux.useDispatch = jest.fn().mockImplementation(() => mockDispatch);
	});

	beforeEach(() => {
		ReactRedux.useDispatch.mockClear();
	});
	test('Courses should display amount of CoursesCard equal length of courses array', () => {
		reduxHooksMocker('default');
		render(
			<Provider store={store}>
				<Courses />
			</Provider>
		);
		const coursesList = screen.getAllByTestId('courseCard');

		expect(coursesList.length).toEqual(MOCK_STATE.courses.courses.length);
	});

	test('Courses should display Empty container if courses array length is 0', () => {
		reduxHooksMocker('emptyCoursesArray');
		render(
			<Provider store={store}>
				<Courses />
			</Provider>
		);
		const coursesCardsContainer = screen.getByTestId('courseCardContainer');

		expect(coursesCardsContainer).toBeDefined();
		expect(coursesCardsContainer.children.length).toBe(0);
	});

	test('CourseForm should be showed after a click on a button "Add new course"', () => {
		reduxHooksMocker('default');
		const { getByText } = render(
			<Provider store={store}>
				<MemoryRouter>
					<Courses />
				</MemoryRouter>
			</Provider>
		);
		fireEvent.click(getByText(/Add New Course/i));

		expect(mockHistoryPush).toHaveBeenCalledWith('/courses/add');
	});
});
