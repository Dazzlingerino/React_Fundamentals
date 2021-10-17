import React, { useEffect } from 'react';

import { Button, Form, Input, Typography } from 'antd';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { emailValidator, passValidator } from '../../constants/constants';
import { registrationThunk } from '../../store/user/thunk';
import { LocalStorage } from '../../utils/localStorage';

const { Title } = Typography;

const Registration = () => {
	const history = useHistory();
	const dispatch = useDispatch();

	const onSubmit = (values) => {
		dispatch(registrationThunk(values, history));
	};

	useEffect(() => {
		LocalStorage.removeToken();
	}, []);

	return (
		<div className='registration'>
			<Title level={4}>Registration</Title>
			<Form
				name='registration'
				initialValues={{ remember: true }}
				onFinish={onSubmit}
				autoComplete='off'
			>
				<Form.Item
					label='Name'
					name='name'
					placeholder='Enter name'
					rules={[{ required: true, message: 'Please input your name!' }]}
				>
					<Input />
				</Form.Item>

				<Form.Item
					label='Email'
					name='email'
					placeholder='Enter email'
					extra='e.g. smth@domain.com'
					rules={[
						{
							required: true,
							message: 'Please input your email!',
							pattern: emailValidator,
						},
					]}
				>
					<Input />
				</Form.Item>

				<Form.Item
					label='Password'
					name='password'
					placeholder='Enter password'
					extra='Password must contain at least 8 characters, 1 letter and 1 number'
					rules={[
						{
							required: true,
							pattern: passValidator,
							message: 'Please input your password!',
						},
					]}
				>
					<Input.Password />
				</Form.Item>

				<Form.Item wrapperCol={{ offset: 8, span: 16 }}>
					<Button type='default' htmlType='submit'>
						Registration
					</Button>
				</Form.Item>
			</Form>
			<div>
				If you have an account you can
				<a href='/login'> Login</a>
			</div>
		</div>
	);
};
export default Registration;
