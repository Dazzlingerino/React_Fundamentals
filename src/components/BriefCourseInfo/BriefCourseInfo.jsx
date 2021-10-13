import React from 'react';

import PropTypes from 'prop-types';

import {
	BriefAuthors,
	CreationDate,
	Duration,
} from '../../helpers/courseInfoHelpers.jsx';

function BriefCourseInfo({ authors, course }) {
	const { duration, creationDate } = course;
	return (
		<>
			<BriefAuthors authors={authors} />
			<Duration duration={duration} />
			<CreationDate creationDate={creationDate} />
		</>
	);
}

BriefCourseInfo.propTypes = {
	authors: PropTypes.array.isRequired,
	course: PropTypes.shape({
		creationDate: PropTypes.string,
		duration: PropTypes.number.isRequired,
	}),
};
export default BriefCourseInfo;
