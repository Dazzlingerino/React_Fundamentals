import React from 'react';

import { Button, Form, Input, message, Typography } from 'antd';
import PropTypes from 'prop-types';

import { coursesApi } from '../../api/coursesApi';
import Header from '../Header/Header';
import Authors from './Authors/Authors';
import { Container, Title } from './CreateCourse.styled';
import Duration from './Duration/Duration';

const { TextArea } = Input;

function CreateCourse({ passChildData, authorsList }) {
	const [form] = Form.useForm();
	const onFinish = (values) => {
		const course = {
			...values,
			duration: +values.duration,
			//creationDate: moment().format('DD/MM/YYYY'),
			//id: new Date().getTime().toString(),
		};
		const createCourse = async () => {
			const res = await coursesApi.add(course);
			if (res.status === 200) {
				return <>{message.success('Course created successfully')}</>;
			} else {
				return <>{message.error('Course creation failed')}</>;
			}
		};
		createCourse().then(() => {});
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
			;
		</>
	);
}

CreateCourse.propTypes = {
	passChildData: PropTypes.func.isRequired,
	authorsList: PropTypes.array,
};
export default CreateCourse;
