import React, { useEffect, useState } from 'react';

import { Button } from 'antd';
import PropTypes from 'prop-types';
import { useHistory } from 'react-router-dom';

import { coursesApi } from '../../api/coursesApi';
import CourseCard from '../CourseCard/CourseCard';
import Header from '../Header/Header';
import Search from '../Search/Search';
import { Container } from './Courses.styled';

function Courses({ authors }) {
	const [courses, setCourses] = useState();

	useEffect(() => {
		const getData = async () => {
			const coursesRes = await coursesApi.getAll();
			setCourses(coursesRes.data.result);
		};
		getData().then(() => {});
	}, []);

	const [filteredCourses, setFilteredCourses] = useState(courses);
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

	const history = useHistory();
	const [, setShownCourse] = useState();
	const [, setCourseId] = useState(0);
	const showCourseHandle = ({ course, authors }) => {
		setCourseId(() => course.id);
		setShownCourse({ course, authors });
		history.push(`/courses/${course.id}`);
	};

	return (
		<>
			<Header />
			<Container>
				<Search handleSearch={handleSearch} />
				<Button
					onClick={() => {
						history.push('/courses/add');
					}}
				>
					Add New Course
				</Button>
			</Container>
			<CourseCard
				showCourseHandle={showCourseHandle}
				authorsList={authors}
				coursesList={filteredCourses ? filteredCourses : courses}
			/>
		</>
	);
}

Courses.propTypes = {
	authors: PropTypes.array,
};
export default Courses;
