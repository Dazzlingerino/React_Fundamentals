import { combineReducers, createStore } from 'redux';

import authorsReducer from './authors/reducer';
import coursesReducer from './courses/reducer';
import userReducer from './user/reducer';

let rootReducer = combineReducers({
	user: userReducer,
	courses: coursesReducer,
	authors: authorsReducer,
});

const store = createStore(rootReducer);

export default store;
