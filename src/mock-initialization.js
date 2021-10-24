const { MOCK_STATE } = require('./App');
const store = require('./store');
if (process.env.REACT_APP_MOCK) {
	const state = store.getState();
	Object.entries(state).forEach(
		([key, value]) => (state[key] = { ...value, ...MOCK_STATE[key] })
	);
}
