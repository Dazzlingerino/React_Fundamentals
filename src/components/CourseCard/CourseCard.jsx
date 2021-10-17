import React from 'react';

import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Button, Tooltip, Typography } from 'antd';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import TextTruncate from 'react-text-truncate';

import { deleteCourseThunk } from '../../store/courses/thunk';
import BriefCourseInfo from '../BriefCourseInfo/BriefCourseInfo';
import { ButtonGroup, Container } from './CourseCard.styled';

const { Title } = Typography;

const CourseCard = ({ role, authors, coursesList, showCourseHandle }) => {
	const history = useHistory();

	const extractNames = (course) => {
		let arrayOfAuthors;
		arrayOfAuthors = course.authors?.map(
			(id) => authors?.find((a) => a.id === id)?.name
		);
		return arrayOfAuthors.filter((el) => !!el);
	};

	const dispatch = useDispatch();

	const deleteCourseHandle = (id) => {
		dispatch(deleteCourseThunk(id));
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
								{role === 'admin' && (
									<>
										<Tooltip
											className='ant-tooltip'
											placement='bottom'
											title='edit course'
											color='#1f74f1'
										>
											<Button
												type='inherit'
												className='ant-btn-edit'
												icon={<EditOutlined />}
												onClick={() => {
													history.push(`/courses/update/${course.id}`);
												}}
											/>
										</Tooltip>
										<Tooltip
											placement='bottom'
											title='delete course'
											color='#ff4d4f'
										>
											<Button
												danger
												icon={<DeleteOutlined />}
												onClick={() => deleteCourseHandle(course.id)}
											/>
										</Tooltip>
									</>
								)}
							</ButtonGroup>
						</div>
					</section>
				);
			})}
		</Container>
	);
};
CourseCard.propTypes = {
	role: PropTypes.oneOf(['user', 'admin']),
	authors: PropTypes.arrayOf(
		PropTypes.shape({
			name: PropTypes.string.isRequired,
			id: PropTypes.string.isRequired,
		})
	).isRequired,
	coursesList: PropTypes.oneOfType([
		PropTypes.arrayOf(
			PropTypes.shape({
				title: PropTypes.string.isRequired,
				description: PropTypes.string.isRequired,
				creationDate: PropTypes.string.isRequired,
				duration: PropTypes.number.isRequired,
				id: PropTypes.string.isRequired,
				authors: PropTypes.arrayOf(
					PropTypes.shape({
						name: PropTypes.string.isRequired,
						id: PropTypes.string.isRequired,
					})
				).isRequired,
			})
		).isRequired,
		PropTypes.any,
	]),
	showCourseHandle: PropTypes.func.isRequired,
};
export default CourseCard;
