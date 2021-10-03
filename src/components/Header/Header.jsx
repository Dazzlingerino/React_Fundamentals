import { Button, PageHeader, Typography } from 'antd';
import './Header.scss';

function Header() {
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
						<Button type='inherit'>Log Out</Button>
					</>
				}
			/>
		</div>
	);
}

export default Header;
