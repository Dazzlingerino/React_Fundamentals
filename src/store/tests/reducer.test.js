import { MOCK_STATE } from '../../App';
import { mockedCoursesList } from '../../constants/constants';
import { finishSaveCourse } from '../courses/actionCreators';
import { GET_COURSES } from '../courses/actionTypes';
import coursesReducer from '../courses/reducer';

describe('coursesReducer', () => {
	test('should return the initial state', () => {
		expect(coursesReducer(MOCK_STATE.courses, {})).toEqual({
			...MOCK_STATE.courses,
		});
	});

	test('should handle SAVE_COURSE and return new state', () => {
		const action = finishSaveCourse(mockedCoursesList[0]);

		let newState = coursesReducer(MOCK_STATE.courses, action);

		expect(newState.courses.length).toBe(3);
	});

	test('should handle GET_COURSES and return new state', () => {
		const action = {
			type: GET_COURSES,
			payload: mockedCoursesList,
		};

		expect(coursesReducer({}, action)).toEqual({
			courses: mockedCoursesList,
		});
	});
});
