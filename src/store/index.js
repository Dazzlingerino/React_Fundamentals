import { applyMiddleware, combineReducers, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import ReduxThunk from 'redux-thunk';

import appReducer from './app/reducer';
import authorsReducer from './authors/reducer';
import coursesReducer from './courses/reducer';
import userReducer from './user/reducer';

let rootReducer = combineReducers({
	app: appReducer,
	authors: authorsReducer,
	user: userReducer,
	courses: coursesReducer,
});

const middleware = [ReduxThunk];
const store = createStore(
	rootReducer,
	composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
