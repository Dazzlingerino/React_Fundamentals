import styled from 'styled-components';

export const ButtonGroup = styled.div`
	display: flex;
	justify-content: center;

	.ant-btn-edit {
		color: #197ef1;
		border-color: #197ef1;
		background: #fff;
		transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
		opacity: 0.7;
		user-select: none;
		touch-action: manipulation;

		:hover {
			opacity: 0.9;
			color: #1f74f1;
			border-color: #1f74f1;
		}

		.ant-tooltip-inner {
			padding: 2px;
		}
	}

	button {
		margin-left: 10px;
	}
`;
export const Container = styled.div`
	.ant-card-extra {
		display: flex;
	}

	.course-card {
		display: flex;
		padding: 15px;
		gap: 10px;
		justify-content: space-between;
		align-self: flex-start;
		border: solid 1px #d9d9d9;
		margin-bottom: 20px;

		.title-and-description {
			width: 700px;
			overflow: hidden;
			text-overflow: ellipsis;
		}

		.course-brief-info {
			display: flex;
			flex-direction: column;
			min-width: 300px;

			button {
				margin-top: 10px;
				align-self: center;
			}
		}
	}

	.ant-card-head-wrapper {
		display: block;
	}
`;
