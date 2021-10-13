import React, { useEffect, useState } from 'react';

import { Button } from 'antd';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { coursesApi } from '../../api/coursesApi';
import { getCourses } from '../../store/courses/actionCreators';
import { selectCourses } from '../../store/selectors/selectors';
import CourseCard from '../CourseCard/CourseCard';
import Header from '../Header/Header';
import Search from '../Search/Search';
import { Container } from './Courses.styled';

const Courses = React.memo(({ authors }) => {
	const dispatch = useDispatch();
	const courses = useSelector(selectCourses);

	useEffect(() => {
		const getData = async () => (await coursesApi.getAll()).data.result;
		if (!courses.length) {
			getData().then((data) => dispatch(getCourses(data)));
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [dispatch]);

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

	const showCourseHandle = (course) => {
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
				authors={authors}
				coursesList={filteredCourses ? filteredCourses : courses}
			/>
		</>
	);
});

Courses.propTypes = {
	authors: PropTypes.array,
};
export default Courses;
