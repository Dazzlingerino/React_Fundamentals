import { Button, Form, Input, Typography } from 'antd';
import { useHistory } from 'react-router-dom';
import PropTypes from 'prop-types';
import { authApi } from '../../api/authApi';

const { Title } = Typography;

function Login({ setToken }) {
	const history = useHistory();
	const onSubmit = async (values) => {
		try {
			const res = await authApi.loginUser(values);
			const token = res.data.result;
			setToken(token);
			history.push('/courses');
		} catch (e) {
			console.log(e.message);
		}
	};

	const onSubmitFailed = (errorInfo) => {
		console.log('Failed:', errorInfo);
	};

	return (
		<article className='login'>
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
		</article>
	);
}

Login.propTypes = {
	setToken: PropTypes.func.isRequired,
};
export default Login;
