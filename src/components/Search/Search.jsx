import React, { useEffect, useState } from 'react';

import { Button, Input } from 'antd';

import { Container } from './Search.styled';

function Search({ handleSearch }) {
	const [text, setText] = useState();

	useEffect(() => {
		if (!text) {
			handleSearch('');
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [text]);

	return (
		<Container>
			<Input type={'text'} onChange={(e) => setText(e.target.value)} />
			<Button type='inherit' onClick={() => handleSearch(text)}>
				Search
			</Button>
		</Container>
	);
}

export default Search;
