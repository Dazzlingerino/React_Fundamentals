import React from 'react';

import { useDispatch, useSelector } from 'react-redux';
import {
	BrowserRouter as Router,
	Redirect,
	Route,
	Switch,
} from 'react-router-dom';

import CourseForm from './components/CourseForm/CourseForm';
import CourseInfo from './components/CourseInfo/CourseInfo';
import Courses from './components/Courses/Courses';
import ErrorDialog from './components/ErrorDialog/ErrorDialog';
import Login from './components/Login/Login';
import PrivateRoutes from './components/PrivateRouter/PrivateRouter';
import Registration from './components/Registration/Registration';
import { clearAppError } from './store/app/actionCreators';
import { selectAppError } from './store/selectors/selectors';
import useToken from './utils/customHooks/useToken';

import './App.scss';

const App = () => {
	const { token, setToken } = useToken();

	const appError = useSelector(selectAppError);

	const dispatch = useDispatch();

	return (
		<main className='App'>
			<ErrorDialog
				error={!!appError ? appError : ''}
				onClose={() => dispatch(clearAppError())}
				open={!!appError}
			/>
			<Router>
				<Switch>
					<Route
						exact
						path='/login'
						render={() =>
							token ? (
								<Redirect to={{ pathname: '/courses' }} />
							) : (
								<Login setToken={setToken} />
							)
						}
					/>
					<Route exact path='/registration' component={Registration} />
					<Route exact path='/'>
						{<Redirect to='/login' />}
					</Route>
					<Route exact path='/courses' component={Courses} />
					<PrivateRoutes>
						<Route
							exact
							path='/courses/update/:courseId'
							render={() => <CourseForm mode='update' />}
						/>
						<Route
							exact
							path='/courses/add'
							render={() => <CourseForm mode='add' />}
						/>
					</PrivateRoutes>
					<Route
						exact
						path='/courses/:courseId'
						render={() => <CourseInfo />}
					/>
				</Switch>
			</Router>
		</main>
	);
};

export default App;
