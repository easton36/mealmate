import {
	configureStore
} from '@reduxjs/toolkit';
import authReducer from './slice.redux';

const store = configureStore({
	reducer: {
		auth: authReducer
	}
});

export default store;