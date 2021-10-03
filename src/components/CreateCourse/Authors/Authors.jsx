import { Alert, Button, Form, Input, List, Typography } from 'antd';
import './Authors.scss';
import { useEffect, useRef, useState } from 'react';
import { removeItem, setItemToLocalStorage } from '../../../utils/utils';

const { Title } = Typography;

function Authors(props) {
	const [authorsList, setAuthorsList] = useState(props.authorsList);
	const [courseAuthorsList, setCourseAuthorsList] = useState([]);
	const [isDisabled, setDisabled] = useState(true);
	const [name, setName] = useState();
	const inputEl = useRef(null);

	const fields = props.form.getFieldsValue();

	const addAuthorHandle = (author) => {
		const { id } = author;

		if (fields.authors === undefined) {
			Object.assign(fields, { authors: [] });
		}

		Object.assign(fields, {
			authors: [id, ...fields.authors],
		});

		setAuthorsList((authorsList) => removeItem(authorsList, id));
		setItemToLocalStorage('courseAuthors', [...courseAuthorsList, author]);
		setCourseAuthorsList((courseAuthorsList) => [...courseAuthorsList, author]);
	};

	const deleteAuthorHandle = (author) => {
		const { id, name } = author;
		setAuthorsList((authorsList) => [...authorsList, { id, name }]);
		setCourseAuthorsList((courseAuthorsList) =>
			removeItem(courseAuthorsList, id)
		);
	};

	const createAuthorHandle = () => {
		name &&
			setAuthorsList((authorsList) => [
				...authorsList,
				{ id: new Date().getTime().toString(), name },
			]);
		setName('');
		setDisabled(true);
	};

	useEffect(() => {
		fields.authors = courseAuthorsList.map((author) => author.id);
		props.form.setFieldsValue(fields);
	}, [props.form, fields, courseAuthorsList]);

	useEffect(() => {
		props.passChildData(courseAuthorsList);
	}, [courseAuthorsList, props]);

	const inputHandle = (e) => {
		setName(e.target.value);
		setDisabled(false);
	};

	return (
		<>
			<article className='add-author a'>
				<Title level={3}>Add author</Title>
				<Typography className='label'>Author name</Typography>
				<Input
					ref={inputEl}
					className='author-input'
					placeholder='Enter author name...'
					onChange={inputHandle}
					value={name}
				/>
				<Button disabled={isDisabled} onClick={createAuthorHandle}>
					Create author
				</Button>
			</article>
			<article className='b'>
				<Title level={3}>Authors</Title>
				{authorsList.length ? (
					authorsList.map((author, index) => {
						return (
							<div
								key={`${author.id + index.toString()}`}
								className='author-name-and-button'
							>
								<Typography>{author?.name}</Typography>
								{author.name && (
									<Button onClick={() => addAuthorHandle(author)}>
										Add author
									</Button>
								)}
							</div>
						);
					})
				) : (
					<Alert
						onClick={() => inputEl.current.focus()}
						message='Create new author'
						type='warning'
						showIcon
						style={{ cursor: 'pointer' }}
					/>
				)}
			</article>
			<article className='d'>
				<Title level={3}>Course authors</Title>
				<List
					itemLayout='horizontal'
					dataSource={courseAuthorsList}
					locale={{ emptyText: 'Authors list is empty' }}
					renderItem={(item) => (
						<div className='author-name-and-button'>
							<Form.Item name='authors'>
								<List.Item key={item.id}>{item.name}</List.Item>
							</Form.Item>
							<Button onClick={() => deleteAuthorHandle(item)}>
								Delete author
							</Button>
						</div>
					)}
				/>
			</article>
		</>
	);
}

export default Authors;
