import React from 'react';

import PropTypes from 'prop-types';
import { useSelector } from 'react-redux';
import { Redirect } from 'react-router-dom';

import { selectUserRole } from '../../store/selectors/selectors';

function PrivateRoutes({ children }) {
	const role = useSelector(selectUserRole);
	return role === 'admin' ? children : <Redirect to='/courses' />;
}

PrivateRoutes.propTypes = {
	children: PropTypes.oneOfType([
		PropTypes.arrayOf(PropTypes.node),
		PropTypes.node,
	]),
};

export default PrivateRoutes;
