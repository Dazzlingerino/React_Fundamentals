import React, { useEffect, useState } from 'react';

import { Form, Typography } from 'antd';
import PropTypes from 'prop-types';

import { getTimeFromMin } from '../../../utils/utils';
import { DurationBody } from './Duration.styled';

const { Title } = Typography;

function Duration({ mode, initialDuration }) {
	const [duration, setDuration] = useState(
		mode === 'update' ? initialDuration : '00:00'
	);

	const inputNumberHandle = (e) => {
		let min = e.target.value;
		if (min >= 24 * 60) {
			min = 1439;
		} else if (min < 0) {
			min = 0;
		}
		setDuration(getTimeFromMin(min));
	};

	useEffect(() => {
		if (initialDuration) {
			setDuration(getTimeFromMin(initialDuration));
		}
	}, [initialDuration]);

	return (
		<section className='duration c'>
			<Title level={3}>Duration</Title>
			<DurationBody>
				<Typography>Duration</Typography>
				<Form.Item
					name='duration'
					rules={[
						{
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
						value={duration}
						onChange={(e) => inputNumberHandle(e)}
					/>
				</Form.Item>
				<Typography className='duration-label'>
					Duration: <b>{duration}</b> hours
				</Typography>
			</DurationBody>
		</section>
	);
}

Duration.propsTypes = {
	mode: PropTypes.oneOf(['update', 'add']),
	initialDuration: PropTypes.oneOfType([PropTypes.number, PropTypes.any]),
};

export default Duration;
