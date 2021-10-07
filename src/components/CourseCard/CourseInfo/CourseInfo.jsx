import React from 'react';

import { Typography } from 'antd';
import moment from 'moment';

import { getTimeFromMin } from '../../../utils/utils';

function CourseInfo({ authors, duration, creationDate }) {
	return (
		<>
			<Typography>
				<b>Authors:</b>
				{' ' + authors.join(', ')}
			</Typography>
			<Typography>
				<b>Duration:</b>
				{` ${getTimeFromMin(duration)} hours`}
			</Typography>
			<Typography>
				<b>Created:</b>
				{` ${moment(creationDate).format('MM.DD.YYYY')}`}
			</Typography>
		</>
	);
}

export default CourseInfo;
