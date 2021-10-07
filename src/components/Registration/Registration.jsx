import { Button, Form, Input, message, Typography } from 'antd';
import { useEffect } from 'react';
import { registrationApi } from '../../api/registrationApi';

const { Title } = Typography;

function Registration() {
	const emailValidator = new RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/);
	const onSubmit = (values) => {
		registrationApi.register(values).then((res) => {
			console.log(res);
			if (res.status === 400) {
				return message.error('User with this email already exists');
			}
		});
	};

	const onSubmitFailed = (errorInfo) => {
		console.log('Failed:', errorInfo);
	};
	useEffect(() => {}, []);
	return (
		<article className='registration'>
			<Title level={4}>Registration</Title>
			<Form
				name='registration'
				initialValues={{ remember: true }}
				onFinish={onSubmit}
				onFinishFailed={onSubmitFailed}
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
					rules={[{ required: true, message: 'Please input your password!' }]}
				>
					<Input />
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
		</article>
	);
}

export default Registration;
