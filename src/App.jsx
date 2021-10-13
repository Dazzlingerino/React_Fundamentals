import React, { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { Redirect, Route, Switch, useLocation } from 'react-router-dom';

import { authorsApi } from './api/authorsApi';
import CourseInfo from './components/CourseInfo/CourseInfo';
import Courses from './components/Courses/Courses';
import CreateCourse from './components/CreateCourse/CreateCourse';
import Header from './components/Header/Header';
import Login from './components/Login/Login';
import Registration from './components/Registration/Registration';
import { getAuthors } from './store/authors/actionCreators';
import { selectAuthors } from './store/selectors/selectors';
import useToken from './utils/customHooks/useToken';

import './App.scss';

const App = React.memo(() => {
	const { token, setToken } = useToken();
	const location = useLocation();
	const dispatch = useDispatch();

	const authors = useSelector(selectAuthors);
	const [, setAuthors] = useState();

	useEffect(() => {
		const getData = async () => (await authorsApi.getAll()).data.result;
		getData().then((data) => dispatch(getAuthors(data)));
	}, [dispatch, location.pathname]);

	return (
		<main className='App'>
			<Switch>
				<Route exact path='/'>
					{<Redirect to='/login' />}
				</Route>
				{!token ? (
					<Route path='/login'>
						<Login setToken={setToken} />
					</Route>
				) : (
					<Route exact path='/login'>
						{<Redirect to='/courses' />}
					</Route>
				)}
				<Route exact path='/registration' component={Registration} />
				<Route exact path='/courses'>
					<Courses authors={authors} />
				</Route>
				<Route path='/courses/add'>
					<CreateCourse passChildData={setAuthors} />
				</Route>
				<Route
					path='/courses/:courseId'
					render={({ match }) => (
						<>
							<Header />
							<CourseInfo authors={authors} courseId={match.params.courseId} />
						</>
					)}
				/>
			</Switch>
		</main>
	);
});

export default App;
