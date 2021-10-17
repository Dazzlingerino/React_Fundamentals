import React, { useEffect } from 'react';

import { LeftOutlined } from '@ant-design/icons';
import { Typography } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { NavLink, useParams } from 'react-router-dom';
import TextTruncate from 'react-text-truncate';

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

const { Title } = Typography;

const CourseInfo = () => {
	const dispatch = useDispatch();
	const courseAuthors = useSelector(selectCourseAuthors);
	const { courseId } = useParams();
	const authorsIDs = useSelector(selectCourseAuthorsIds(courseId));
	const authors = useSelector(selectAuthors);

	const courseAuthorsNames = authorsFinder(authorsIDs, authors);

	useEffect(() => {
		if (courseId) {
			dispatch(getCourseByIdThunk(courseId));
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [courseId, dispatch]);

	const course = useSelector(selectCourseById);

	useEffect(() => {
		dispatch(setCourseAuthors(courseAuthorsNames));
		//eslint-disable-next-line react-hooks/exhaustive-deps
	}, [dispatch]);

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
							<TextTruncate
								line={5}
								truncateText='…'
								text={course.description}
							/>
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
