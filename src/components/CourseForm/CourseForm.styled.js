import styled from 'styled-components';

export const Title = styled.div`
	display: flex;
	justify-content: space-between;
	margin-bottom: 20px;

	.input-title {
		flex-direction: column;
	}
`;

export const Container = styled.div`
	display: grid;
	grid-template-areas:
		'top-left top-right'
		'bottom-left bottom-right';
	grid-auto-columns: auto;
	grid-auto-rows: auto;
	grid-column-gap: 80px;
	grid-row-gap: 60px;
	margin-top: 20px;
	border: solid 1px #d9d9d9;
	padding: 15px 40px 15px 15px;
	@media screen and (max-width: 600px) {
		display: flex;
		flex-direction: column;
	}

	.a {
		grid-area: top-left;
		display: flex;
		align-content: center;
		align-items: center;
		flex-direction: column;

		.label {
			align-self: start;
		}

		.create-author-button {
			margin-top: 10px;
		}
	}

	.b {
		grid-area: top-right;
		display: flex;
		flex-direction: column;
		align-items: center;
	}

	.c {
		grid-area: bottom-left;
	}

	.d {
		grid-area: bottom-right;
		display: flex;
		flex-direction: column;
		align-items: center;
	}
`;
