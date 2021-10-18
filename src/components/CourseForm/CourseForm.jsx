import React, { useEffect, useState } from 'react';

import { Button, Form, Input, message, Typography } from 'antd';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';

import { setCourseAuthors } from '../../store/authors/actionCreators';
import { getAuthorsThunk } from '../../store/authors/thunk';
import {
	getCourseByIdThunk,
	saveCourseThunk,
	updateCourseThunk,
} from '../../store/courses/thunk';
import {
	selectAuthors,
	selectCourseAuthorsIds,
	selectCourseById,
} from '../../store/selectors/selectors';
import { authorsFinder } from '../../utils/utils';
import Header from '../Header/Header';
import Authors from './Authors/Authors';
import { Container, Title } from './CourseForm.styled';
import Duration from './Duration/Duration';

const { TextArea } = Input;

const CourseForm = ({ mode }) => {
	const history = useHistory();

	const { courseId } = useParams();

	const [addForm] = Form.useForm();
	const [updateForm] = Form.useForm();

	const authorsIDs = useSelector(selectCourseAuthorsIds(courseId));
	const course = useSelector(selectCourseById);
	const authors = useSelector(selectAuthors);

	const [description, setDescription] = useState();
	const [title, setTitle] = useState();

	const dispatch = useDispatch();

	const courseAuthorsNames = authorsFinder(authorsIDs, authors);

	const defaultValues = {
		duration: 0,
		title: '',
		description: '',
		authors: [],
	};

	useEffect(() => {
		dispatch(getAuthorsThunk());
	}, [dispatch]);

	useEffect(() => {
		if (courseId) {
			dispatch(getCourseByIdThunk(courseId));
		}
	}, [courseId, dispatch]);

	useEffect(() => {
		if (mode === 'update') {
			updateForm.setFieldsValue(course);
		}
	}, [course, mode, updateForm]);

	useEffect(() => {
		if (mode === 'update') {
			dispatch(setCourseAuthors(courseAuthorsNames));
		} else if (mode === 'add') {
			dispatch(setCourseAuthors([]));
		}
	}, [courseAuthorsNames, dispatch, mode]);

	const onAdd = (values) => {
		const course = {
			...values,
			duration: +values.duration,
		};
		dispatch(saveCourseThunk(course, history));
	};

	const onUpdate = (values) => {
		const course = {
			...values,
			duration: +values.duration,
		};
		dispatch(updateCourseThunk(courseId, course, history));
	};

	const onFinishFailed = () => {
		return <>{message.error('Please, fill in all required fields')}</>;
	};

	return (
		<>
			<Header />
			{mode === 'add' ? (
				<Form
					form={addForm}
					name='addCourse'
					labelCol={{ span: 8 }}
					wrapperCol={{ span: 16 }}
					initialValues={{ remember: true }}
					onFinish={onAdd}
					onFinishFailed={onFinishFailed}
					autoComplete='off'
				>
					<Title>
						<div className='input'>
							<Typography>Title</Typography>
							<Form.Item
								name='title'
								className='input-title'
								rules={[
									{
										type: 'string',
										required: true,
										message: 'Please enter course title!',
									},
								]}
							>
								<Input
									placeholder='Enter title...'
									value={title}
									onChange={(e) => setTitle(e.target.value)}
								/>
							</Form.Item>
						</div>
						<Button htmlType='submit'>Create course</Button>
					</Title>

					<section className='description'>
						<Typography>Description</Typography>
						<Form.Item
							name='description'
							className='input-description'
							rules={[
								{
									type: 'string',
									required: true,
									min: 2,
									message: 'Please enter course description!',
								},
							]}
						>
							<TextArea
								placeholder='Enter description'
								rows={4}
								value={description}
								onChange={(e) => setDescription(e.target.value)}
							/>
						</Form.Item>
					</section>
					<Container>
						<Authors form={addForm} mode={mode} />
						<Duration mode={mode} />
					</Container>
				</Form>
			) : (
				mode === 'update' &&
				course && (
					<Form
						form={updateForm}
						name='updateCourse'
						labelCol={{ span: 8 }}
						wrapperCol={{ span: 16 }}
						initialValues={{ ...defaultValues }}
						onFinish={onUpdate}
						onFinishFailed={onFinishFailed}
						autoComplete='off'
					>
						<Title>
							<div className='input'>
								<Typography>Title</Typography>
								<Form.Item
									name='title'
									className='input-title'
									rules={[
										{
											type: 'string',
											required: true,
											message: 'Please enter course title!',
										},
									]}
								>
									<Input
										placeholder='Enter title...'
										value={course?.title || title}
										onChange={(e) => setTitle(e.target.value)}
									/>
								</Form.Item>
							</div>
							<Button htmlType='submit'>Update course</Button>
						</Title>

						<section className='description'>
							<Typography>Description</Typography>
							<Form.Item
								name='description'
								className='input-description'
								rules={[
									{
										type: 'string',
										required: true,
										min: 2,
										message: 'Please enter course description!',
									},
								]}
							>
								<TextArea
									placeholder='Enter description'
									rows={4}
									value={description}
									onChange={(e) => setDescription(e.target.value)}
								/>
							</Form.Item>
						</section>
						<Container>
							<Authors
								mode={mode}
								form={updateForm}
								courseAuthorsNames={courseAuthorsNames}
							/>
							<Duration mode={mode} initialduration={course.duration} />
						</Container>
					</Form>
				)
			)}
		</>
	);
};

CourseForm.propTypes = {
	mode: PropTypes.oneOf(['update', 'add']),
};

export default CourseForm;
