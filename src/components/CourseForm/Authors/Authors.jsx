import React, { useEffect, useMemo, useRef, useState } from 'react';

import { Alert, Button, Form, Input, List, Typography, message } from 'antd';
import PropTypes from 'prop-types';
import { useDispatch, useSelector } from 'react-redux';

import {
	addCourseAuthor,
	deleteCourseAuthor,
} from '../../../store/authors/actionCreators';
import { saveAuthorThunk } from '../../../store/authors/thunk';
import {
	selectAuthors,
	selectCourseAuthors,
} from '../../../store/selectors/selectors';
import {
	makeUniqueAuthorsList,
	removeItem,
	validate,
} from '../../../utils/utils';
import {
	AuthorContainer,
	ListContainer,
	TitleAndButton,
} from './Authors.styled';

const { Title } = Typography;

const Authors = ({ mode, form, courseAuthorsNames }) => {
	const authors = useSelector(selectAuthors);
	const courseAuthors = useSelector(selectCourseAuthors);

	const [name, setName] = useState();
	const [isDisabled, setDisabled] = useState(true);
	const [courseAuthorsList, setCourseAuthorsList] = useState(
		courseAuthorsNames
			? mode === 'update'
				? courseAuthorsNames
				: courseAuthors
			: []
	);
	const uniqueAuthorsList = useMemo(
		() => makeUniqueAuthorsList(authors),
		[authors]
	);
	const [authorsList, setAuthorsList] = useState(uniqueAuthorsList);

	let fields = form.getFieldsValue();

	const inputEl = useRef(null);

	const dispatch = useDispatch();

	useEffect(() => {
		setAuthorsList(
			uniqueAuthorsList.filter(
				(el) => !courseAuthors?.some((val) => el.id === val.id)
			)
		);
	}, [authors, courseAuthors, uniqueAuthorsList]);

	useEffect(() => {
		if (name && name?.split('').length > 1) {
			setDisabled(false);
		} else {
			setDisabled(true);
		}
	}, [name]);

	useEffect(() => {
		fields.authors = courseAuthorsList.map((author) => author.id);
		form.setFieldsValue(fields);
	}, [form, fields, courseAuthorsList]);

	const addAuthorHandle = (author) => {
		const { id } = author;
		fields.authors?.unshift(id);
		dispatch(addCourseAuthor(author));
		setAuthorsList((authorsList) => removeItem(authorsList, id));
		setCourseAuthorsList((courseAuthorsList) => [...courseAuthorsList, author]);
	};

	const deleteAuthorHandle = ({ id, name }) => {
		dispatch(deleteCourseAuthor({ id, name }));
		setAuthorsList((authorsList) => [...authorsList, { name, id }]);
		setCourseAuthorsList((courseAuthorsList) =>
			removeItem(courseAuthorsList, id)
		);
	};

	const createAuthorHandle = () => {
		if (validate('name', message)) {
			dispatch(saveAuthorThunk(name?.trim()));
			setName('');
		}
		setDisabled(true);
	};

	const inputHandle = (e) => {
		setName(e.target.value);
	};

	return (
		<>
			<section className='add-author a'>
				<Title level={3}>Add author</Title>
				<Typography className='label'>Author name</Typography>
				<Input
					id='name'
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
	mode: PropTypes.oneOf(['update', 'add']),
	form: PropTypes.object.isRequired,
	courseAuthorsNames: PropTypes.arrayOf(
		PropTypes.shape({
			name: PropTypes.string.isRequired,
			id: PropTypes.string.isRequired,
		})
	),
};

export default Authors;
