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
	authors: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
	course: PropTypes.shape({
		title: PropTypes.string.isRequired,
		description: PropTypes.string.isRequired,
		creationDate: PropTypes.string.isRequired,
		duration: PropTypes.number.isRequired,
		id: PropTypes.string,
		authors: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
	}).isRequired,
};

export default BriefCourseInfo;
