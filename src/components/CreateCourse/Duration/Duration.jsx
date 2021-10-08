import React, { useState } from 'react';

import { Form, Typography } from 'antd';

import { getTimeFromMin } from '../../../utils/utils';
import { DurationBody } from './Duration.styled';

const { Title } = Typography;

function Duration() {
	const [duration, setDuration] = useState('00:00');

	const inputNumberHandle = (e) => {
		let min = e.target.value;
		if (min >= 24 * 60) {
			min = 1439;
		} else if (min < 0) {
			min = 0;
		}
		setDuration(getTimeFromMin(min));
	};

	return (
		<section className='duration c'>
			<Title level={3}>Duration</Title>
			<DurationBody>
				<Typography>Duration</Typography>
				<Form.Item
					name='duration'
					rules={[
						{
							max: 4,
							required: true,
							message:
								'Please enter course duration! Course duration value must be in between 0 and 1440',
						},
					]}
				>
					<input
						className='ant-input-number'
						type='number'
						min='0'
						max='1440'
						placeholder='Enter duration in minutes...'
						onChange={inputNumberHandle}
					/>
				</Form.Item>
				<Typography className='duration-label'>
					Duration: <b>{duration}</b> hours
				</Typography>
			</DurationBody>
		</section>
	);
}

export default Duration;
