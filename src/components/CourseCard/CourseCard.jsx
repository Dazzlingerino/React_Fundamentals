import React from 'react';

import { Button, Typography } from 'antd';
import PropTypes from 'prop-types';
import TextTruncate from 'react-text-truncate';

import CourseInfoContainer from '../CourseInfo/CourseInfo';
import { Container } from './CourseCard.styled';

const { Title } = Typography;

function CourseCard({
	authorsList,
	coursesList,
	authorsFromLocalStorage,
	showCourseHandle,
}) {
	const extractNames = (course, authorsList) => {
		let arrayOfAuthors;
		arrayOfAuthors = course.authors.map(
			(id) => authorsList.find((a) => a.id === id)?.name
		);
		return arrayOfAuthors.filter((el) => !!el);
	};
	return (
		<Container>
			{coursesList.map((course) => {
				const authors = extractNames(course, authorsList);
				return (
					<section key={course.id} className='courseCard'>
						<div className='title-and-description'>
							<Title level={4}>{course.title}</Title>
							<TextTruncate
								line={5}
								truncateText='…'
								text={course.description}
							/>
						</div>
						<div className='courseBriefInfo'>
							<CourseInfoContainer
								type='brief'
								authors={authors ? authors : authorsFromLocalStorage}
								duration={course.duration}
								creationDate={course.creationDate}
							/>
							<Button
								type='inherit'
								onClick={() =>
									showCourseHandle({
										course,
										authors: authors ? authors : authorsFromLocalStorage,
									})
								}
							>
								Show course
							</Button>
						</div>
					</section>
				);
			})}
		</Container>
	);
}

CourseCard.propTypes = {
	authorsList: PropTypes.array.isRequired,
	authorsFromLocalStorage: PropTypes.array.isRequired,
	coursesList: PropTypes.array.isRequired,
	showCourseHandle: PropTypes.func.isRequired,
};
export default CourseCard;
