import styled from 'styled-components';

export const TitleAndButton = styled.div`
	display: flex;
	width: 270px;

	align-content: center;
	justify-content: space-between;
	padding-bottom: 5px;
`;

export const ListContainer = styled.div`
	display: flex;
	align-content: center;
	justify-content: space-between;
	padding-bottom: 5px;

	.ant-spin-container {
		display: flex;
		flex-direction: column;
	}

	.ant-list-empty-text {
		color: red;
	}
`;
export const AuthorContainer = styled.div`
	display: flex;
	align-content: center;
	justify-content: space-between;
	padding-bottom: 5px;
	width: 270px;

	.ant-spin-nested-loading {
		display: flex;
	}

	.button {
		margin-top: 10px;
		min-width: 150px;
	}
`;
