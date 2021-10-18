import React from 'react';

import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';
import ReactRouterPropTypes from 'react-router-prop-types';

import { selectUserRole } from '../../store/selectors/selectors';

function PrivateRoute(props) {
	const role = useSelector(selectUserRole);
	return role === 'admin' ? <Route {...props} /> : <Redirect to='/courses' />;
}

PrivateRoute.propTypes = {
	props: PropTypes.shape({
		exact: PropTypes.bool,
		path: PropTypes.string.isRequired,
		location: ReactRouterPropTypes.location.isRequired,
		computedMatch: ReactRouterPropTypes.match.isRequired,
		children: PropTypes.oneOfType([
			PropTypes.arrayOf(PropTypes.node).isRequired,
			PropTypes.node.isRequired,
		]).isRequired,
	}),
};

export default PrivateRoute;
