import React, { useState } from 'react';

import { Button, Form, Input, message, Typography } from 'antd';
import moment from 'moment';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { saveCourse } from '../../store/courses/actionCreators';
import Header from '../Header/Header';
import Authors from './Authors/Authors';
import { Container, Title } from './CreateCourse.styled';
import Duration from './Duration/Duration';

const { TextArea } = Input;

function CreateCourse({ passChildData }) {
	const [form] = Form.useForm();
	const dispatch = useDispatch();
	const history = useHistory();
	const [description, setDescription] = useState();
	const [title, setTitle] = useState();
	const onFinish = (values) => {
		const course = {
			...values,
			duration: +values.duration,
			creationDate: moment(), //TODO delete id when using api call
			id: new Date().getTime().toString(), //TODO delete id when using api call
		};
		dispatch(saveCourse(course));
		history.push('/courses');
		return <>{message.success('Course created successfully')}</>;
	};

	const onFinishFailed = () => {
		return <>{message.error('Please, fill in all fields')}</>;
	};

	return (
		<>
			<Header />
			<Form
				form={form}
				name='createCourse'
				labelCol={{ span: 8 }}
				wrapperCol={{ span: 16 }}
				initialValues={{ remember: true }}
				onFinish={onFinish}
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
					<Authors passChildData={passChildData} form={form} />
					<Duration />
				</Container>
			</Form>
		</>
	);
}

CreateCourse.propTypes = {
	passChildData: PropTypes.func.isRequired,
};
export default CreateCourse;
