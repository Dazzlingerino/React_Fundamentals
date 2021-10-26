import React from 'react';

import { screen } from '@testing-library/dom';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';

import {
	mockedAuthorsList,
	mockedCoursesList,
} from '../../../constants/constants';
import CourseCard from '../CourseCard';

jest.mock('react-text-truncate', () => {
	return ({ text }) => <div data-testid='description'>{text}</div>;
});

const mockShowCourseHandle = jest.fn();

const mockedState = {
	courses: mockedCoursesList,
	authors: mockedAuthorsList,
};

const mockedStore = {
	getState: () => mockedState,
	subscribe: jest.fn(),
	dispatch: jest.fn(),
};

describe('CourseCard component', () => {
	beforeEach(() => {
		render(
			<Provider store={mockedStore}>
				<CourseCard
					coursesList={mockedState.courses}
					authors={mockedState.authors}
					showCourseHandle={mockShowCourseHandle}
				/>
			</Provider>
		);
	});

	test('CourseCard should display title', () => {
		const courseTitleArray = screen.getAllByRole('title');

		expect(courseTitleArray.length).toEqual(2);
		expect(courseTitleArray[0]).toHaveTextContent('JavaScript');
		expect(courseTitleArray[1]).toHaveTextContent('Angular');
	});

	test('CourseCard should display description', () => {
		const courseDescriptionArray = screen.getAllByTestId('description');

		expect(courseDescriptionArray.length).toEqual(2);
		expect(courseDescriptionArray[0]).toHaveTextContent('some text');
		expect(courseDescriptionArray[1]).toHaveTextContent('some text 2');
	});

	test('CourseCard should display duration in the correct format', () => {
		const courseDurationArray = screen.getAllByTestId('duration');

		expect(courseDurationArray.length).toEqual(2);
		expect(courseDurationArray[0]).toHaveTextContent('2:40 hours');
		expect(courseDurationArray[1]).toHaveTextContent('3:30 hours');
	});

	test('CourseCard should display authors list', () => {
		const courseAuthorsArray = screen.getAllByTestId('authors');

		expect(courseAuthorsArray.length).toEqual(2);
		expect(courseAuthorsArray[0]).toHaveTextContent(
			'Vasiliy Dobkin, Nicolas Kim'
		);
		expect(courseAuthorsArray[1]).toHaveTextContent(
			'Anna Sidorenko, Valentina Larina'
		);
	});

	test('CourseCard should display created date in the correct format', () => {
		const courseCreationDateArray = screen.getAllByTestId('creationDate');

		expect(courseCreationDateArray.length).toEqual(2);
		expect(courseCreationDateArray[0]).toHaveTextContent('08.03.2021');
		expect(courseCreationDateArray[1]).toHaveTextContent('10.11.2020');
	});
});
