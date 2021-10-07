import Search from '../Search/Search';
import CourseCard from '../CourseCard/CourseCard';
import CreateCourse from '../CreateCourse/CreateCourse';
import { useEffect, useState } from 'react';
import {
	mockedAuthorsList,
	mockedCoursesList,
} from '../../constants/constants';
import { Button } from 'antd';
import './Courses.scss';
import {
	getItemFromLocalStorage,
	setItemToLocalStorage,
} from '../../utils/utils';
import Header from '../Header/Header';

function Courses() {
	const courses = getItemFromLocalStorage('courses');
	const authors = getItemFromLocalStorage('authors');
	const courseAuthors = getItemFromLocalStorage('courseAuthors');
	const [isNewCourse, setNewCourse] = useState(false);
	const [coursesList, setCoursesList] = useState(
		courses ? courses : mockedCoursesList
	);
	const [filteredCourses, setFilteredCourses] = useState(coursesList);
	const [authorsList, setAuthorsList] = useState(
		courseAuthors ? mockedAuthorsList.concat(courseAuthors) : mockedAuthorsList
	);

	const handleSearch = (text) => {
		const lowerCaseText = text.toLowerCase();
		const filteredArray = coursesList.filter(
			({ title, id }) =>
				title.toLowerCase().includes(lowerCaseText) ||
				id.toLowerCase().includes(lowerCaseText)
		);
		setFilteredCourses(filteredArray);
	};

	const createCourseHandle = (newCourse) => {
		setCoursesList((coursesList) => [...coursesList, newCourse]);
		setNewCourse((isNewCourse) => !isNewCourse);
		setItemToLocalStorage('courses', [...coursesList, newCourse]);
	};

	useEffect(() => {
		setFilteredCourses(coursesList);
	}, [coursesList]);

	return (
		<>
			<Header />
			{isNewCourse ? (
				<CreateCourse
					passChildData={setAuthorsList}
					authorsList={mockedAuthorsList}
					createCourseHandle={createCourseHandle}
				/>
			) : (
				<>
					<section className='search-and-createCourse'>
						<Search handleSearch={handleSearch} />
						<Button onClick={() => setNewCourse((isNewCourse) => !isNewCourse)}>
							Create course
						</Button>
					</section>
					<CourseCard
						authorsList={authorsList}
						coursesList={filteredCourses}
						authorsFromLocalStorage={authors}
					/>
				</>
			)}
		</>
	);
}

export default Courses;
