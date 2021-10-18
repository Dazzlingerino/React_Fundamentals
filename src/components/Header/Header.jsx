import React from 'react';

import { Button, PageHeader, Typography } from 'antd';
import { useDispatch, useSelector } from 'react-redux';

import {
	selectUserName,
	selectUserRole,
} from '../../store/selectors/selectors';
import { logoutThunk } from '../../store/user/thunk';
import { StyledHeader } from './Header.styled';

function Header() {
	const name = useSelector(selectUserName);
	const role = useSelector(selectUserRole);

	const dispatch = useDispatch();

	return (
		<StyledHeader>
			<PageHeader
				className='site-page-header'
				avatar={{
					src: 'https://www.techsoup.org/SiteCollectionImages/Content/courses-icon.svg',
					size: { xs: 60 },
				}}
				extra={
					<>
						<Typography>{role === 'admin' ? 'ADMIN' : name}</Typography>
						<Button type='inherit' onClick={() => dispatch(logoutThunk())}>
							Log Out
						</Button>
					</>
				}
			/>
		</StyledHeader>
	);
}

export default Header;
