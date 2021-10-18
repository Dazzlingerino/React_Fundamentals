import React, { useEffect, useMemo } from 'react';

import { LeftOutlined } from '@ant-design/icons';
import { Typography } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useParams } from 'react-router-dom';

import {
	Authors,
	CourseId,
	CreationDate,
	Duration,
} from '../../helpers/courseInfoHelpers.jsx';
import { setCourseAuthors } from '../../store/authors/actionCreators';
import { getCourseByIdThunk } from '../../store/courses/thunk';
import {
	selectAuthors,
	selectCourseAuthors,
	selectCourseAuthorsIds,
	selectCourseById,
} from '../../store/selectors/selectors';
import { authorsFinder } from '../../utils/utils';
import Header from '../Header/Header';
import {
	CoursesInfoContainer,
	Description,
	Detail,
	FullInfo,
} from './CourseInfo.styled';

const { Title, Text } = Typography;

const CourseInfo = () => {
	const { courseId } = useParams();

	const authors = useSelector(selectAuthors);
	const authorsIDs = useSelector(selectCourseAuthorsIds(courseId));
	const courseAuthors = useSelector(selectCourseAuthors);
	const course = useSelector(selectCourseById);

	const dispatch = useDispatch();

	const courseAuthorsNames = useMemo(
		() => authorsFinder(authorsIDs, authors),
		[authorsIDs, authors]
	);

	useEffect(() => {
		if (courseId) {
			dispatch(getCourseByIdThunk(courseId));
		}
	}, [courseId, dispatch]);

	useEffect(() => {
		dispatch(setCourseAuthors(courseAuthorsNames));
	}, [courseAuthorsNames, dispatch]);

	return (
		course && (
			<>
				<Header />
				<CoursesInfoContainer>
					<NavLink className='back-to-courses' to='/courses'>
						<LeftOutlined />
						Back to courses
					</NavLink>
					<Title level={2} className='title'>
						{course.title}
					</Title>
					<FullInfo>
						<Description>
							<Text>{course.description}</Text>
						</Description>
						<Detail>
							<CourseId id={courseId} />
							<Duration duration={course.duration} />
							<CreationDate creationDate={course.creationDate} />
							<Authors authors={courseAuthors} />
						</Detail>
					</FullInfo>
				</CoursesInfoContainer>
			</>
		)
	);
};

export default CourseInfo;
