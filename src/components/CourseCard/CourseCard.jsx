import React from 'react';

import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Button, Typography } from 'antd';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import TextTruncate from 'react-text-truncate';

import { coursesApi } from '../../api/coursesApi';
import { deleteCourse } from '../../store/courses/actionCreators';
import BriefCourseInfo from '../BriefCourseInfo/BriefCourseInfo';
import { ButtonGroup, Container } from './CourseCard.styled';

const { Title } = Typography;

const CourseCard = React.memo(({ authors, coursesList, showCourseHandle }) => {
	const extractNames = (course) => {
		let arrayOfAuthors;
		arrayOfAuthors = course.authors?.map(
			(id) => authors?.find((a) => a.id === id)?.name
		);
		return arrayOfAuthors.filter((el) => !!el);
	};

	const dispatch = useDispatch();
	const deleteCourseHandle = async (id) => {
		dispatch(deleteCourse(id));
		await coursesApi.delete(id);
	};

	const editCourseHandle = (id) => {
		console.log(
			`You will be able to edit course with ID: ${id} in the next module`
		);
	};
	return (
		<Container>
			{coursesList?.map((course) => {
				const authors = extractNames(course);
				return (
					<section key={course.id} className='course-card'>
						<div className='title-and-description'>
							<Title level={4}>{course.title}</Title>
							<TextTruncate
								line={5}
								truncateText='…'
								text={course.description}
							/>
						</div>
						<div className='course-brief-info'>
							<BriefCourseInfo
								authors={authors ? authors : []}
								course={course}
							/>
							<ButtonGroup>
								<Button type='inherit' onClick={() => showCourseHandle(course)}>
									Show course
								</Button>
								<Button
									type='inherit'
									icon={<EditOutlined />}
									onClick={() => editCourseHandle(course.id)}
								/>
								<Button
									danger
									icon={<DeleteOutlined />}
									onClick={() => deleteCourseHandle(course.id)}
								/>
							</ButtonGroup>
						</div>
					</section>
				);
			})}
		</Container>
	);
});
CourseCard.propTypes = {
	authors: PropTypes.array,
	coursesList: PropTypes.array,
	showCourseHandle: PropTypes.func.isRequired,
};
export default CourseCard;
