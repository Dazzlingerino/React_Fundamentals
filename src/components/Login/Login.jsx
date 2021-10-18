import React, { useRef } from 'react';

import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
import { Button, Form, Input, Switch, Typography } from 'antd';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';

import { loginThunk } from '../../store/user/thunk';

const { Title } = Typography;

const Login = ({ setToken }) => {
	const [form] = Form.useForm();

	const loginRef = useRef(null);

	const dispatch = useDispatch();

	const onSubmit = (values) => {
		dispatch(loginThunk(values, setToken));
	};

	/*safe to delete after test*/
	const onToggle = (e) => {
		if (e) {
			loginRef.current.focus();
			form.setFieldsValue({
				email: 'admin@email.com',
				password: 'admin123',
			});
		} else {
			form.resetFields();
		}
	};
	/*safe to delete after test*/

	return (
		<div className='login'>
			<Title level={4}>Login</Title>
			<Form
				form={form}
				name='login'
				labelCol={{ span: 12 }}
				wrapperCol={{ span: 16 }}
				initialValues={{ remember: true }}
				onFinish={onSubmit}
				autoComplete='off'
			>
				<Form.Item
					label='Email'
					name='email'
					placeholder='Enter email'
					rules={[{ required: true, message: 'Please input your email!' }]}
				>
					<Input />
				</Form.Item>

				<Form.Item
					label='Password'
					name='password'
					placeholder='Enter password'
					rules={[{ required: true, message: 'Please input your password!' }]}
				>
					<Input.Password />
				</Form.Item>

				<Form.Item wrapperCol={{ offset: 8, span: 16 }}>
					<Button ref={loginRef} type='default' htmlType='submit'>
						Login
					</Button>
				</Form.Item>
			</Form>
			<div>
				If you not have an account you can
				<a href='registration'> Registration</a>
			</div>
			{/*safe to delete after test*/}
			<div className='switch-container'>
				<div>Set admin credentials</div>
				<Switch
					checkedChildren={<CheckOutlined />}
					unCheckedChildren={<CloseOutlined />}
					onChange={onToggle}
				/>
			</div>
			{/*safe to delete after test*/}
		</div>
	);
};

Login.propTypes = {
	setToken: PropTypes.func.isRequired,
};

export default Login;
