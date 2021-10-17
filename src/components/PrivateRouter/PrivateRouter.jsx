import React from 'react';

import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { Redirect, Route } from 'react-router-dom';
import ReactRouterPropTypes from 'react-router-prop-types';

import { selectUserRole } from '../../store/selectors/selectors';

export const PrivateRoute = (props, { children }) => {
	let isAdmin = useSelector(selectUserRole);
	let redirectPath = '';

	if (!isAdmin) {
		redirectPath = '/courses';
	}
	if (redirectPath) {
		const renderComponent = () => <Redirect to={{ pathname: redirectPath }} />;
		return <Route {...props}>{renderComponent}</Route>;
	} else {
		return <Route {...props}>{children}</Route>;
	}
};
PrivateRoute.propTypes = {
	children: PropTypes.oneOfType([
		PropTypes.arrayOf(PropTypes.node),
		PropTypes.node,
	]),
	props: PropTypes.shape({
		history: ReactRouterPropTypes.history.isRequired,
		location: ReactRouterPropTypes.location.isRequired,
		match: ReactRouterPropTypes.match.isRequired,
		route: ReactRouterPropTypes.route.isRequired,
	}),
};
