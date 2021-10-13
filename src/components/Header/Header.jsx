import React from 'react';

import { Button, PageHeader, Typography } from 'antd';
import { useDispatch } from 'react-redux';

import { authApi } from '../../api/authApi';
import { logout } from '../../store/user/actionCreators';
import { StyledHeader } from './Header.styled';

function Header() {
	const dispatch = useDispatch();

	const handleLogout = async () => {
		dispatch(logout());
		await authApi.logout();
	};

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
						<Typography>User's Name</Typography>
						<Button type='inherit' onClick={handleLogout}>
							Log Out
						</Button>
					</>
				}
			/>
		</StyledHeader>
	);
}

export default Header;
