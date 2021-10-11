import React, { useEffect, useState } from 'react';

import { Redirect, Route, Switch, useLocation } from 'react-router-dom';

import { authorsApi } from './api/authorsApi';
import CourseInfo from './components/CourseInfo/CourseInfo';
import Courses from './components/Courses/Courses';
import CreateCourse from './components/CreateCourse/CreateCourse';
import Header from './components/Header/Header';
import Login from './components/Login/Login';
import Registration from './components/Registration/Registration';
import useToken from './utils/customHooks/useToken';

import './App.scss';

const App = React.memo(() => {
	const { token, setToken } = useToken();
	const [authors, setAuthors] = useState();
	const location = useLocation();
	useEffect(() => {
		const getData = async () => {
			const authorsRes = await authorsApi.getAll();
			setAuthors(authorsRes.data.result);
		};
		getData().then(() => {});
	}, [location.pathname]);
	return (
		<main className='App'>
			<Switch>
				<Route exact path='/'>
					{<Redirect to='/login' />}
				</Route>
				{!token ? (
					<Route path='/login' component={Login}>
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
					<CreateCourse passChildData={setAuthors} authorsList={authors} />
				</Route>
				<Route
					path='/courses/:courseId'
					render={({ match }) => (
						<>
							<Header />
							<CourseInfo
								authors={authors}
								type='full'
								courseId={match.params.courseId}
							/>
						</>
					)}
				/>
				) )
			</Switch>
		</main>
	);
});

export default App;
