import styled from 'styled-components';

export const ContainerFull = styled.div`
	display: flex;
	flex-direction: column;

	.ant-typography {
		display: flex;
		flex-direction: column;
	}

	.text {
		flex: 1;
	}
`;
export const ContainerBrief = styled.div`
	flex-direction: row;
	overflow: hidden;
	text-overflow: ellipsis;

	.text {
		flex: 1;
	}
`;

export const CoursesInfoContainer = styled.div`
	border: 1px solid #f0f0f0;
	display: flex;
	flex-direction: column;
	align-items: flex-start;

	.text {
		flex: 1;
	}
`;
