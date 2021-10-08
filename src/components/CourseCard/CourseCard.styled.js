import styled from 'styled-components';

export const Container = styled.div`
	.ant-card-extra {
		display: flex;

		.courseInfo {
			margin-left: 10vw;
		}
	}

	.courseCard {
		display: flex;
		height: 200px;
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

		.courseBriefInfo {
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
