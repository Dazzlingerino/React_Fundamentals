import React from 'react';

import { Typography } from 'antd';
import moment from 'moment';
import PropTypes from 'prop-types';

import { ContainerBrief } from '../components/BriefCourseInfo/BriefCourseInfo.styled';
import { ContainerFull } from '../components/CourseInfo/CourseInfo.styled';
import { getTimeFromMin, truncate } from '../utils/utils';

export const Authors = ({ authors }) => {
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

export const BriefAuthors = ({ authors }) => {
	return (
		<ContainerBrief>
			<Typography>
				<b>Authors:</b>
				{truncate(' ' + authors.map((a) => a.trim()).join(', '))}
			</Typography>
		</ContainerBrief>
	);
};

export const CreationDate = ({ creationDate }) => {
	return (
		<Typography>
			<b>Created:</b>{' '}
			{creationDate && moment(creationDate, 'DD/MM/YYYY').format('DD.MM.YYYY')}
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

export const Duration = ({ duration }) => {
	return (
		<Typography>
			<b>Duration:</b> {getTimeFromMin(duration)} hours
		</Typography>
	);
};

Authors.propTypes = {
	authors: PropTypes.arrayOf(
		PropTypes.shape({
			name: PropTypes.string.isRequired,
			id: PropTypes.string.isRequired,
		})
	).isRequired,
};

BriefAuthors.propTypes = {
	authors: PropTypes.arrayOf(PropTypes.string.isRequired).isRequired,
};

CreationDate.propTypes = {
	creationDate: PropTypes.string.isRequired,
};

CourseId.propTypes = {
	id: PropTypes.string.isRequired,
};

Duration.propTypes = {
	duration: PropTypes.number.isRequired,
};
