import React from 'react';

import { Button, PageHeader, Typography } from 'antd';

import { authApi } from '../../api/authApi';

import './Header.module.scss';

function Header() {
	const handleLogout = async () => {
		await authApi.logout();
	};
	return (
		<div className='Header'>
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
		</div>
	);
}

export default Header;
