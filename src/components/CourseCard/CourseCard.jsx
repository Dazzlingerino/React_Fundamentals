import React from 'react';

import { Button, Typography } from 'antd';

import CourseInfo from '../CourseInfo/CourseInfo';

import './CourseCard.module.scss';

const { Title, Text } = Typography;

function CourseCard({ authorsList, coursesList, authorsFromLocalStorage }) {
	const extractNames = (course, authorsList) => {
		let arrayOfAuthors;
		arrayOfAuthors = course.authors.map(
			(id) => authorsList.find((a) => a.id === id)?.name
		);
		return arrayOfAuthors.filter((el) => !!el);
	};

	return (
		<>
			{coursesList.map((course) => {
				const authors = extractNames(course, authorsList);
				return (
					<section key={course.id} className='courseCard'>
						<article className='title-and-description'>
							<Title level={4}>{course.title}</Title>
							<Text>{course.description}</Text>
						</article>
						<article className='courseInfo'>
							<CourseInfo
								authors={authors ? authors : authorsFromLocalStorage}
								duration={course.duration}
								creationDate={course.creationDate}
							/>
							<Button type='inherit'>Show course</Button>
						</article>
					</section>
				);
			})}
		</>
	);
}

export default CourseCard;
