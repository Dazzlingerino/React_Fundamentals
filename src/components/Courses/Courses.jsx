import React, { useEffect, useState } from 'react';

import { Button } from 'antd';

import {
	mockedAuthorsList,
	mockedCoursesList,
} from '../../constants/constants';
import {
	getItemFromLocalStorage,
	setItemToLocalStorage,
} from '../../utils/utils';
import CourseCard from '../CourseCard/CourseCard';
import CreateCourse from '../CreateCourse/CreateCourse';
import Header from '../Header/Header';
import Search from '../Search/Search';

import './Courses.module.scss';

function Courses() {
	const courses = getItemFromLocalStorage('courses');
	const authors = getItemFromLocalStorage('authors');
	const courseAuthors = getItemFromLocalStorage('courseAuthors');
	const [isNewCourse, setNewCourse] = useState(false);
	const [coursesList, setCoursesList] = useState(
		courses ? courses : mockedCoursesList
	);
	const [filteredCourses, setFilteredCourses] = useState(coursesList);
	const [authorsList, setAuthorsList] = useState(
		courseAuthors ? mockedAuthorsList.concat(courseAuthors) : mockedAuthorsList
	);

	const handleSearch = (text) => {
		const textForSearch = text ? text : '';
		const lowerCaseText = textForSearch.toLowerCase();
		const filteredArray = coursesList.filter(
			({ title, id }) =>
				title.toLowerCase().includes(lowerCaseText) ||
				id.toLowerCase().includes(lowerCaseText)
		);
		setFilteredCourses(filteredArray);
	};

	const createCourseHandle = (newCourse) => {
		setCoursesList((coursesList) => [...coursesList, newCourse]);
		setNewCourse((isNewCourse) => !isNewCourse);
		setItemToLocalStorage('courses', [...coursesList, newCourse]);
	};

	useEffect(() => {
		setFilteredCourses(coursesList);
	}, [coursesList]);

	return (
		<>
			<Header />
			{isNewCourse ? (
				<CreateCourse
					passChildData={setAuthorsList}
					authorsList={mockedAuthorsList}
					createCourseHandle={createCourseHandle}
				/>
			) : (
				<>
					<section className='search-and-createCourse'>
						<Search handleSearch={handleSearch} />
						<Button onClick={() => setNewCourse((isNewCourse) => !isNewCourse)}>
							Create course
						</Button>
					</section>
					<CourseCard
						authorsList={authorsList}
						coursesList={filteredCourses}
						authorsFromLocalStorage={authors}
					/>
				</>
			)}
		</>
	);
}

export default Courses;
