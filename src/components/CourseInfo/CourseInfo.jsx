import React, { useEffect, useState } from 'react';

import { LeftOutlined } from '@ant-design/icons';
import { Button, Typography } from 'antd';
import moment from 'moment';
import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom';
import TextTruncate from 'react-text-truncate';

import { coursesApi } from '../../api/coursesApi';
import {
	Authors,
	CourseId,
	CreationDate,
	Duration,
} from '../../helpers/courseInfoHelpers.jsx';
import {
	CoursesInfoContainer,
	Description,
	Detail,
	FullInfo,
} from './CourseInfo.styled';

const { Title } = Typography;

const CourseInfo = React.memo(({ authors, courseId }) => {
	const location = useLocation();
	const [course, setCourse] = useState();
	useEffect(() => {
		const getCourseById = async () =>
			(await coursesApi.getCourse(courseId)).data.result;
		location.pathname === `/courses/${courseId}` &&
			getCourseById().then((data) => setCourse(data));
	}, [courseId, location.pathname]);

	return (
		<CoursesInfoContainer>
			<Button type='link' href='/courses' icon={<LeftOutlined />}>
				Back to courses
			</Button>
			<Title level={2} className='title'>
				{course?.title || 'Default Title'}
			</Title>
			<FullInfo>
				<Description>
					<TextTruncate
						line={5}
						truncateText='…'
						text={course?.description || 'Default Description'}
					/>
				</Description>
				<Detail>
					<CourseId id={courseId} />
					<Duration duration={course?.duration || 120} />
					<CreationDate creationDate={course?.creationDate || moment()} />
					<Authors authors={authors} />
				</Detail>
			</FullInfo>
		</CoursesInfoContainer>
	);
});

CourseInfo.propTypes = {
	courseId: PropTypes.string,
	authors: PropTypes.array,
};
export default CourseInfo;
