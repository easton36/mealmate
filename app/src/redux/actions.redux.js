import {
	login,
	logout
} from './slice.redux';

const OPTIONS = {
	method: 'POST',
	headers: {
		'Content-Type': 'application/json'
	},
	credentials: 'include'
};

export function handleLogin() {
	return (dispatch) => {
		// Call your API here to log in the user
		// Once the API returns, dispatch the LOGIN action
		fetch('/api/auth/login', OPTIONS)
			.then((response) => response.json())
			.then(() => {
				dispatch(login());
			});
	};
}

export function handleLogout() {
	return (dispatch) => {
		// Call your API here to log out the user
		// Once the API returns, dispatch the LOGOUT action
		fetch('/api/auth/logout', OPTIONS)
			.then((response) => response.json())
			.then(() => {
				dispatch(logout());
			});
	};
}