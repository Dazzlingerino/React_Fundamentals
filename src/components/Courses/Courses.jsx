import React, { useEffect, useState } from 'react';

import { Button } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { getAuthorsThunk } from '../../store/authors/thunk';
import { getCoursesThunk } from '../../store/courses/thunk';
import {
	selectAuthors,
	selectCourses,
	selectUserRole,
} from '../../store/selectors/selectors';
import { getCurrentUserThunk } from '../../store/user/thunk';
import CourseCard from '../CourseCard/CourseCard';
import Header from '../Header/Header';
import Search from '../Search/Search';
import { Container } from './Courses.styled';

const Courses = () => {
	const history = useHistory();

	const role = useSelector(selectUserRole);
	const courses = useSelector(selectCourses);
	const authors = useSelector(selectAuthors);

	const [filteredCourses, setFilteredCourses] = useState(courses);

	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getCurrentUserThunk());
		dispatch(getAuthorsThunk());
		dispatch(getCoursesThunk());
	}, [dispatch]);

	const handleSearch = (text) => {
		const textForSearch = text ? text : '';
		const lowerCaseText = textForSearch.toLowerCase();
		const filteredArray = courses?.filter(
			({ title, id }) =>
				title.toLowerCase().includes(lowerCaseText) ||
				id.toLowerCase().includes(lowerCaseText)
		);
		setFilteredCourses(filteredArray);
	};

	useEffect(() => {
		courses && setFilteredCourses(courses);
	}, [courses]);

	const showCourseHandle = (course) => {
		history.push(`/courses/${course.id}`);
	};

	return (
		<>
			<Header />
			<Container>
				<Search handleSearch={handleSearch} />
				{role === 'admin' && (
					<Button
						onClick={() => {
							history.push('/courses/add');
						}}
					>
						Add New Course
					</Button>
				)}
			</Container>
			<CourseCard
				role={role}
				showCourseHandle={showCourseHandle}
				authors={authors}
				coursesList={filteredCourses ? filteredCourses : courses ? courses : []}
			/>
		</>
	);
};

export default Courses;
