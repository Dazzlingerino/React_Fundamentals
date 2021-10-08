import React from 'react';

import { Button, Form, Input, message, Typography } from 'antd';
import moment from 'moment';
import PropTypes from 'prop-types';

import Authors from './Authors/Authors';
import { Container, Title } from './CreateCourse.styled';
import Duration from './Duration/Duration';

const { TextArea } = Input;

function CreateCourse({ passChildData, authorsList, createCourseHandle }) {
	const [form] = Form.useForm();
	const onFinish = (values) => {
		const course = {
			...values,
			duration: +values.duration,
			creationDate: moment().format('DD/MM/YYYY'),
			id: new Date().getTime().toString(),
		};
		createCourseHandle(course);
		return <>{message.success('Course created successfully')}</>;
	};

	const onFinishFailed = () => {
		return <>{message.error('Please, fill in all fields')}</>;
	};

	return (
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
						<Input placeholder='Enter title...' />
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
					<TextArea placeholder='Enter description' rows={4} />
				</Form.Item>
			</section>
			<Container>
				<Authors
					passChildData={passChildData}
					authorsList={authorsList}
					form={form}
				/>
				<Duration />
			</Container>
		</Form>
	);
}

CreateCourse.propTypes = {
	passChildData: PropTypes.func.isRequired,
	createCourseHandle: PropTypes.func.isRequired,
	authorsList: PropTypes.array.isRequired,
};
export default CreateCourse;
