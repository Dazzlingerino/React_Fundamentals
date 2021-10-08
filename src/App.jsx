import React from 'react';

import {
	BrowserRouter as Router,
	Redirect,
	Route,
	Switch,
} from 'react-router-dom';

import CourseInfoContainer from './components/CourseInfo/CourseInfo';
import Courses from './components/Courses/Courses';
import Header from './components/Header/Header';
import Login from './components/Login/Login';
import Registration from './components/Registration/Registration';
import useToken from './utils/customHooks/useToken';

import './App.scss';

function App() {
	const { token, setToken } = useToken();

	return (
		<main className='App'>
			<Router>
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
					<Route exact path='/courses' component={Courses} />
					<Route
						path='/courses/:courseId'
						render={({ match }) => (
							<>
								<Header />
								{/*TODO get info from server*/}
								<CourseInfoContainer
									type='full'
									courseId={match.params.courseId}
								/>
							</>
						)}
					/>
				</Switch>
			</Router>
		</main>
	);
}

export default App;
