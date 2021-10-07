import './App.scss';
import Courses from './components/Courses/Courses';
import {
	BrowserRouter as Router,
	Redirect,
	Route,
	Switch,
} from 'react-router-dom';
import Login from './components/Login/Login';
import Registration from './components/Registration/Registration';
import useToken from './utils/customHooks/useToken';

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
					<Route path='/registration' component={Registration} />
					<Route path='/courses' component={Courses} />
				</Switch>
			</Router>
		</main>
	);
}

export default App;
