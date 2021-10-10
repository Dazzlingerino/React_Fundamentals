import styled from 'styled-components';

export const ContainerFull = styled.div`
	display: flex;
	flex-direction: column;

	.ant-typography {
		display: flex;
		flex-direction: column;
	}
`;
export const ContainerBrief = styled.div`
	flex-direction: row;
	overflow: hidden;
	text-overflow: ellipsis;
`;

export const Description = styled.article`
	width: 60%;
	padding: 0 40px 20px;
	margin-right: 40px;
`;

export const Detail = styled.div`
	width: 40%;
	padding: 0 40px 20px;
`;

export const FullInfo = styled.div`
	display: flex;
`;

export const CoursesInfoContainer = styled.div`
	border: 1px solid #f0f0f0;
	display: flex;
	flex-direction: column;
	align-items: flex-start;

	.title {
		align-self: center;
		margin-bottom: 80px;
	}
`;
