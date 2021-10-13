import React from 'react';

import { Button, Form, Input, Typography } from 'antd';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';

import { authApi } from '../../api/authApi';
import { login } from '../../store/user/actionCreators';

const { Title } = Typography;

function Login({ setToken }) {
	const history = useHistory();
	const dispatch = useDispatch();

	const onSubmit = async (values) => {
		try {
			const { result, user } = (await authApi.loginUser(values)).data;
			const { email, name } = user;
			dispatch(login({ result, email, name }));
			setToken(result);
			history.push('/courses');
			debugger;
		} catch (e) {
			console.log(e.message);
		}
	};

	const onSubmitFailed = (errorInfo) => {
		console.log('Failed:', errorInfo);
	};

	return (
		<div className='login'>
			<Title level={4}>Login</Title>
			<Form
				name='login'
				labelCol={{ span: 12 }}
				wrapperCol={{ span: 16 }}
				initialValues={{ remember: true }}
				onFinish={onSubmit}
				onFinishFailed={onSubmitFailed}
				autoComplete='off'
			>
				<Form.Item
					label='Email'
					name='email'
					placeholder='Enter email'
					rules={[{ required: true, message: 'Please input your email!' }]}
					initialValue='hey@epam.com'
				>
					<Input />
				</Form.Item>

				<Form.Item
					label='Password'
					name='password'
					placeholder='Enter password'
					rules={[{ required: true, message: 'Please input your password!' }]}
					initialValue='12345678'
				>
					<Input />
				</Form.Item>

				<Form.Item wrapperCol={{ offset: 8, span: 16 }}>
					<Button type='default' htmlType='submit'>
						Login
					</Button>
				</Form.Item>
			</Form>
			<div>
				If you not have an account you can
				<a href='registration'> Registration</a>
			</div>
		</div>
	);
}

Login.propTypes = {
	setToken: PropTypes.func.isRequired,
};
export default Login;
