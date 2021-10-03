import { InputNumber, Typography, Form } from 'antd';
import { getTimeFromMin } from '../../../utils/utils';
import { useState } from 'react';
import './Duration.scss';

const { Title } = Typography;

function Duration() {
	const [duration, setDuration] = useState('00:00');

	const inputNumberHandle = (time) => {
		setDuration(getTimeFromMin(time));
	};

	return (
		<article className='duration c'>
			<Title level={3}>Duration</Title>
			<section className='duration-body'>
				<Typography>Duration</Typography>
				<Form.Item
					name='duration'
					rules={[
						{
							type: 'integer',
							required: true,
							pattern: new RegExp(/^[0-9]+$/),
							message: 'Please enter course duration! (e.g. 220)',
						},
					]}
				>
					<InputNumber
						min={1}
						step={5}
						placeholder='Enter duration in minutes...'
						onChange={inputNumberHandle}
					/>
				</Form.Item>
				<Typography className='duration-label'>
					Duration: <b>{duration}</b> hours
				</Typography>
			</section>
		</article>
	);
}

export default Duration;
