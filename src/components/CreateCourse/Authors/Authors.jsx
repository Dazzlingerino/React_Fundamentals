import React, { useEffect, useRef, useState } from 'react';

import { Alert, Button, Form, Input, List, Typography } from 'antd';
import PropTypes from 'prop-types';

import { authorsApi } from '../../../api/authorsApi';
import { removeItem } from '../../../utils/utils';
import { AuthorContainer, ListContainer } from './Authors.styled';

const { Title } = Typography;

function Authors(props) {
	const [authorsList, setAuthorsList] = useState();

	useEffect(() => {
		const getData = async () => {
			const authorsRes = await authorsApi.getAll();
			setAuthorsList(authorsRes.data.result);
		};
		getData();
	}, []);

	const [courseAuthorsList, setCourseAuthorsList] = useState([]);
	const [name, setName] = useState();
	const [isDisabled, setDisabled] = useState(true);
	const inputEl = useRef(null);

	useEffect(() => {
		if (name && name?.split('').length > 1) {
			setDisabled(false);
		} else {
			setDisabled(true);
		}
	}, [name]);

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
					disabled={isDisabled}
					onClick={createAuthorHandle}
					style={{ marginTop: '10px' }}
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
							itemLayout='horizontal'
							dataSource={courseAuthorsList}
							locale={{ emptyText: ' ' }}
							renderItem={(item) => (
								<AuthorContainer>
									<List.Item key={item.id}>{item.name}</List.Item>
									<Button onClick={() => deleteAuthorHandle(item)}>
										Delete author
									</Button>
								</AuthorContainer>
							)}
						/>
					</Form.Item>
				</ListContainer>
			</section>
		</>
	);
}

Authors.propTypes = {
	passChildData: PropTypes.func.isRequired,
	authorsList: PropTypes.array.isRequired,
	form: PropTypes.object.isRequired,
};
export default Authors;
