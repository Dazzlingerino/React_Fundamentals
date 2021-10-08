import React, { useEffect, useState } from 'react';

import { Button } from 'antd';
import { useHistory } from 'react-router-dom';

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
import { Container } from './Courses.styled';

function Courses() {
	const courses = getItemFromLocalStorage('courses');
	const courseAuthors = getItemFromLocalStorage('courseAuthors');
	const [isNewCourse, setNewCourse] = useState(false);
	const [coursesList, setCoursesList] = useState(
		courses ? courses : mockedCoursesList
	);
	const [filteredCourses, setFilteredCourses] = useState(coursesList);
	//TODO fix authorsList display
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

	const history = useHistory();
	const [, setShownCourse] = useState();
	const [, setCourseId] = useState(0);
	//TODO get info from server and put into courseInfo
	const showCourseHandle = ({ course, authors }) => {
		setCourseId(() => course.id);
		setShownCourse({ course, authors });
		history.push(`/courses/${course.id}`);
	};

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
					<Container>
						<Search handleSearch={handleSearch} />
						<Button onClick={() => setNewCourse((isNewCourse) => !isNewCourse)}>
							Create course
						</Button>
					</Container>
					{/*TODO get info from server and put into courseInfo*/}
					<CourseCard
						showCourseHandle={showCourseHandle}
						authorsList={authorsList}
						coursesList={filteredCourses}
						authorsFromLocalStorage={courseAuthors}
					/>
				</>
			)}
		</>
	);
}

export default Courses;
