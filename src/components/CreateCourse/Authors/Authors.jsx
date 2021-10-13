import React, { useEffect, useRef, useState } from 'react';

import { Alert, Button, Form, Input, List, Typography } from 'antd';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';

import { saveAuthor } from '../../../store/authors/actionCreators';
import { selectAuthors } from '../../../store/selectors/selectors';
import { removeItem } from '../../../utils/utils';
import {
	AuthorContainer,
	ListContainer,
	TitleAndButton,
} from './Authors.styled';

const { Title } = Typography;

const Authors = ({ form, passChildData }) => {
	const dispatch = useDispatch();
	const authors = useSelector(selectAuthors);
	const [authorsList, setAuthorsList] = useState(authors);
	const [courseAuthorsList, setCourseAuthorsList] = useState([]);
	const [name, setName] = useState();
	const [isDisabled, setDisabled] = useState(true);

	const inputEl = useRef(null);

	useEffect(() => {
		authorsList.length < 1 && setAuthorsList(authors);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [authors]);

	useEffect(() => {
		if (name && name?.split('').length > 1) {
			setDisabled(false);
		} else {
			setDisabled(true);
		}
	}, [name]);

	let fields = form.getFieldsValue();

	const addAuthorHandle = (author) => {
		const { id } = author;
		fields.authors?.unshift(id);
		setAuthorsList((authorsList) => removeItem(authorsList, id));
		setCourseAuthorsList((courseAuthorsList) => [...courseAuthorsList, author]);
	};

	const deleteAuthorHandle = ({ id, name }) => {
		setAuthorsList((authorsList) => [...authorsList, { id, name }]);
		setCourseAuthorsList((courseAuthorsList) =>
			removeItem(courseAuthorsList, id)
		);
	};

	const createAuthorHandle = () => {
		if (name) {
			const newAuthor = { name, id: new Date().getTime().toString() };
			setAuthorsList((authorsList) => [...authorsList, newAuthor]);
			dispatch(saveAuthor(newAuthor));
		}
		setName('');
		setDisabled(true);
	};

	useEffect(() => {
		fields.authors = courseAuthorsList.map((author) => author.id);
		form.setFieldsValue(fields);
	}, [form, fields, courseAuthorsList]);

	useEffect(() => {
		passChildData(courseAuthorsList);
	}, [courseAuthorsList, passChildData]);

	const inputHandle = (e) => {
		setName(e.target.value);
	};

	return (
		<>
			<section className='add-author a'>
				<Title level={3}>Add author</Title>
				<Typography className='label'>Author name</Typography>
				<Input
					ref={inputEl}
					className='author-input'
					placeholder='Enter author name...'
					onChange={inputHandle}
					value={name}
				/>
				<Button
					className='create-author-button'
					disabled={isDisabled}
					onClick={createAuthorHandle}
				>
					Create author
				</Button>
			</section>
			<section className='b'>
				<Title level={3}>Authors</Title>
				{authorsList?.length ? (
					authorsList?.map((author, index) => {
						return (
							<AuthorContainer
								key={`${author.id + index.toString()}`}
								className='author-name-and-button'
							>
								<Typography>{author?.name}</Typography>
								{author.name && (
									<Button onClick={() => addAuthorHandle(author)}>
										Add author
									</Button>
								)}
							</AuthorContainer>
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
			</section>
			<section className='d'>
				<Title level={3}>Course authors</Title>
				<ListContainer>
					<Form.Item
						name='authors'
						rules={[
							{
								type: 'array',
								required: true,
								min: 1,
								message: 'Authors list is empty. Please add authors!',
							},
						]}
					>
						<List
							className='authors-list'
							itemLayout='horizontal'
							dataSource={courseAuthorsList}
							locale={{ emptyText: ' ' }}
							renderItem={(item) => (
								<TitleAndButton>
									<List.Item key={item.id}>{item.name}</List.Item>
									<Button onClick={() => deleteAuthorHandle(item)}>
										Delete author
									</Button>
								</TitleAndButton>
							)}
						/>
					</Form.Item>
				</ListContainer>
			</section>
		</>
	);
};

Authors.propTypes = {
	passChildData: PropTypes.func.isRequired,
	form: PropTypes.object.isRequired,
};
export default Authors;
