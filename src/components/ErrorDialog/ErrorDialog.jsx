import React from 'react';

import { Button, Modal } from 'antd';
import PropTypes from 'prop-types';
import { useDispatch } from 'react-redux';

import { clearAppError } from '../../store/app/actionCreators';
import Mapper from '../../utils/mapper';
import { ErrorContainer } from './ErrorDialog.styled';

export default function ErrorDialog({ onClose, open, error }) {
	const dispatch = useDispatch();

	return (
		<Modal
			title='An error occurred'
			visible={open}
			onCancel={onClose}
			footer={null}
		>
			<ErrorContainer>
				<div className='error-dialog'>
					<div className='error'>
						{error ? `${Mapper.mapError(error)}` : 'Unknown error'}
					</div>
				</div>
				<Button
					className='ok-button'
					type='primary'
					onClick={() => dispatch(clearAppError())}
				>
					{'OK'}
				</Button>
			</ErrorContainer>
		</Modal>
	);
}

ErrorDialog.propTypes = {
	onClose: PropTypes.func.isRequired,
	open: PropTypes.bool.isRequired,
	error: PropTypes.string.isRequired,
};
