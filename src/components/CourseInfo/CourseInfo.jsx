import React from 'react';

import { LeftOutlined } from '@ant-design/icons';
import { Button, Typography } from 'antd';
import moment from 'moment';
import PropTypes from 'prop-types';
import TextTruncate from 'react-text-truncate';

import { getTimeFromMin, truncate } from '../../utils/utils';
import {
	ContainerBrief,
	ContainerFull,
	CoursesInfoContainer,
	Description,
	Detail,
	FullInfo,
} from './CourseInfo.styled';

const { Title } = Typography;

const Duration = ({ duration }) => {
	return (
		<Typography>
			<b>Duration:</b> {getTimeFromMin(duration)} hours
		</Typography>
	);
};

const Authors = ({ type, authors }) => {
	const listAuthors = authors?.map((name) => <div key={name}>{name}</div>);
	if (type === 'brief') {
		return (
			<Typography>
				<b>Authors:</b>
				{truncate(' ' + authors.join(', '))}
			</Typography>
		);
	}
	if (type === 'full') {
		return (
			<ContainerFull>
				<Typography>
					<b>Authors:</b>
					<div>{listAuthors}</div>
				</Typography>
			</ContainerFull>
		);
	}
};
const CreationDate = (type, creationDate) => {
	return (
		<Typography>
			<b>Created:</b> {moment(creationDate).format('MM.DD.YYYY')}
		</Typography>
	);
};
const CourseId = ({ id }) => {
	return (
		<Typography>
			<b>ID: </b>
			{id}
		</Typography>
	);
};

function CourseInfo(props) {
	const { duration, authors, creationDate, title, description, courseId } =
		props;
	if (props.type === 'brief') {
		return (
			<>
				<ContainerBrief>
					<Authors type={props.type} authors={authors} />
				</ContainerBrief>
				<Duration duration={duration} />
				<CreationDate type={props.type} creationDate={creationDate} />
			</>
		);
	}
	if (props.type === 'full')
		return (
			//TODO styles
			<CoursesInfoContainer>
				<Button type='link' href='/courses' icon={<LeftOutlined />}>
					Back to courses
				</Button>
				<Title level={2} className='title'>
					{title ? title : 'Title'}
				</Title>
				<FullInfo>
					<Description>
						<TextTruncate
							line={5}
							truncateText='…'
							text={
								description
									? description
									: ' Lorem ipsum dolor sit amet, consectetur adipisicing elit. Commodi dicta esse ex, fugit iste itaque magnam minima officia quisquam reiciendis?'
							}
						/>
					</Description>
					<Detail>
						<CourseId id={courseId} />
						<Duration duration={duration ? duration : 120} />
						<CreationDate type={props.type} creationDate={creationDate} />
						<Authors
							type={props.type}
							authors={authors ? authors : ['John Johnson', 'Michael Peterson']}
						/>
					</Detail>
				</FullInfo>
			</CoursesInfoContainer>
		);
}

CourseInfo.propTypes = {
	type: PropTypes.string.isRequired,
	courseId: PropTypes.string,
	duration: PropTypes.number,
	creationDate: PropTypes.string,
	authors: PropTypes.array,
};
export default CourseInfo;
