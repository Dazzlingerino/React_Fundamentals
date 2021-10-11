import React from 'react';

import { Button, Typography } from 'antd';
import PropTypes from 'prop-types';
import TextTruncate from 'react-text-truncate';

import BriefCourseInfo from '../BriefCourseInfo/BriefCourseInfo';
import { Container } from './CourseCard.styled';

const { Title } = Typography;

const CourseCard = React.memo(
	({ authorsList, coursesList, showCourseHandle }) => {
		const extractNames = (course) => {
			let arrayOfAuthors;
			arrayOfAuthors = course?.authors?.map(
				(id) => authorsList?.find((a) => a.id === id)?.name
			);
			return arrayOfAuthors.filter((el) => !!el);
		};
		return (
			<Container>
				{coursesList?.map((course) => {
					const authors = extractNames(course);
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
								<BriefCourseInfo
									authors={authors ? authors : []}
									course={course}
								/>
								<Button
									type='inherit'
									onClick={() =>
										showCourseHandle({
											course,
											authors: authors ? authors : [],
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
);
CourseCard.propTypes = {
	authorsList: PropTypes.array,
	coursesList: PropTypes.array,
	showCourseHandle: PropTypes.func.isRequired,
};
export default CourseCard;
