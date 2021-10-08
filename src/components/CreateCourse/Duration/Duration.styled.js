import styled from 'styled-components';

export const DurationBody = styled.div`
	display: flex;
	flex-direction: column;
	justify-content: flex-start;

	.ant-form-item {
		max-width: 300px;
	}

	.ant-input-number {
		align-self: flex-start;
		width: 100%;
		max-width: 210px;
		padding: 4px 11px;
	}

	.duration-label {
		font-size: 200%;
	}
`;
