import React from 'react';

import { Typography } from 'antd';
import PropTypes from 'prop-types';

import { truncate } from '../../utils/utils';
import { CreationDate, Duration } from '../CourseInfo/CourseInfo';
import { ContainerBrief } from './BriefCourseInfo.styled';

function BriefCourseInfo({ authors, course }) {
	const { duration, creationDate } = course;
	return (
		<>
			<ContainerBrief>
				<Authors authors={authors} />
			</ContainerBrief>
			<Duration duration={duration} />
			<CreationDate creationDate={creationDate} />
		</>
	);
}

const Authors = ({ authors }) => {
	return (
		<Typography>
			<b>Authors:</b>
			{truncate(' ' + authors.join(', '))}
		</Typography>
	);
};
BriefCourseInfo.propTypes = {
	authors: PropTypes.array.isRequired,
	course: PropTypes.shape({
		creationDate: PropTypes.string.isRequired,
		duration: PropTypes.number.isRequired,
	}),
};
export default BriefCourseInfo;
