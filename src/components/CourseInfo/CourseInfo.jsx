import React, { useEffect, useState } from 'react';

import { LeftOutlined } from '@ant-design/icons';
import { Button, Typography } from 'antd';
import moment from 'moment';
import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom';
import TextTruncate from 'react-text-truncate';

import { coursesApi } from '../../api/coursesApi';
import { getTimeFromMin } from '../../utils/utils';
import {
	ContainerFull,
	CoursesInfoContainer,
	Description,
	Detail,
	FullInfo,
} from './CourseInfo.styled';

const { Title } = Typography;

function CourseInfo({ authors, courseId }) {
	const location = useLocation();
	const [course, setCourse] = useState();
	useEffect(() => {
		const getCourseById = async () => {
			const res = await coursesApi.getCourse(courseId);
			setCourse(res.data.result);
		};
		location.pathname === `/courses/${courseId}` && getCourseById();
	}, [courseId, location.pathname]);

	return (
		<CoursesInfoContainer>
			<Button type='link' href='/courses' icon={<LeftOutlined />}>
				Back to courses
			</Button>
			<Title level={2} className='title'>
				{course?.title}
			</Title>
			<FullInfo>
				<Description>
					<TextTruncate line={5} truncateText='…' text={course?.description} />
				</Description>
				<Detail>
					<CourseId id={courseId} />
					<Duration duration={course?.duration} />
					<CreationDate creationDate={course?.creationDate} />
					<Authors authors={authors} />
				</Detail>
			</FullInfo>
		</CoursesInfoContainer>
	);
}

export const Duration = ({ duration }) => {
	return (
		<Typography>
			<b>Duration:</b> {getTimeFromMin(duration)} hours
		</Typography>
	);
};

const Authors = ({ authors }) => {
	const listAuthors = authors?.map((author) => (
		<div key={author.id}>{author.name}</div>
	));

	return (
		<ContainerFull>
			<Typography>
				<b>Authors:</b>
				<div>{listAuthors}</div>
			</Typography>
		</ContainerFull>
	);
};
export const CreationDate = ({ creationDate }) => {
	return (
		<Typography>
			<b>Created:</b> {moment(creationDate).format('MM.DD.YYYY')}
		</Typography>
	);
};
export const CourseId = ({ id }) => {
	return (
		<Typography>
			<b>ID: </b>
			{id}
		</Typography>
	);
};

CourseInfo.propTypes = {
	type: PropTypes.string.isRequired,
	courseId: PropTypes.string,
	duration: PropTypes.number,
	creationDate: PropTypes.string,
	authors: PropTypes.array,
};
export default CourseInfo;
