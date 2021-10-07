import { Typography } from 'antd';
import { getTimeFromMin } from '../../utils/utils';
import moment from 'moment';

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
