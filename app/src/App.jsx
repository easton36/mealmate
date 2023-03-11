import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Dashboard } from '@/layouts';
import { useSelector } from 'react-redux';

import { SignIn, SignUp } from '@/pages/auth';

function App() {
	const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

	const AUTH_ROUTES = [{
		name: 'sign in',
		path: '/sign-in',
		element: <SignIn />
	},
	{
		name: 'sign up',
		path: '/sign-up',
		element: <SignUp />
	}];

	return (
		<Routes>
			{isAuthenticated
				? (
					<Route path="/dashboard/*" element={<Dashboard />} />
				)
				: (
					AUTH_ROUTES.map(({ path, element }, index) => (
						<Route exact path={path} element={element} key={index} />
					))
				)
			}
			<Route path="*" element={<Navigate to={isAuthenticated ? '/dashboard/home' : '/sign-in'} replace/>} />
		</Routes>
	);
}

export default App;