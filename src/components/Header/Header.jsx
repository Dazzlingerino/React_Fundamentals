import React from 'react';

import { Button, PageHeader, Typography } from 'antd';
import { useDispatch } from 'react-redux';

import { logoutThunk } from '../../store/user/thunk';
import { StyledHeader } from './Header.styled';

function Header() {
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
						<Typography>User's Name</Typography>
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
