import { Button, Input } from 'antd';
import './Search.scss';
import { useEffect, useState } from 'react';

function Search({ handleSearch }) {
	const [text, setText] = useState();

	useEffect(() => {
		if (!text) {
			handleSearch('');
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [text]);

	return (
		<section className='search'>
			<Input type={'text'} onChange={(e) => setText(e.target.value)} />
			<Button type='inherit' onClick={() => handleSearch(text)}>
				Search
			</Button>
		</section>
	);
}

export default Search;
