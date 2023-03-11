import React from 'react';
import {
	HomeIcon,
	UserCircleIcon,
	TableCellsIcon,
	BellIcon
} from '@heroicons/react/24/solid';
import {
	Home,
	Profile,
	Tables,
	Notifications
} from '@/pages/dashboard';

const icon = {
	className: 'w-5 h-5 text-inherit'
};

export const routes = [
	{
		layout: 'dashboard',
		pages: [
			{
				icon: <HomeIcon {...icon}/>,
				name: 'dashboard',
				path: '/home',
				element: <Home />
			},
			{
				icon: <UserCircleIcon {...icon}/>,
				name: 'profile',
				path: '/profile',
				element: <Profile />
			},
			{
				icon: <TableCellsIcon {...icon}/>,
				name: 'tables',
				path: '/tables',
				element: <Tables />
			},
			{
				icon: <BellIcon {...icon}/>,
				name: 'notifactions',
				path: '/notifactions',
				element: <Notifications / >
			}
		]
	}
];

export default routes;