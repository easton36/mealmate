import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@material-tailwind/react';
import { Provider } from 'react-redux';

import App from './App';
import store from './redux/store.redux';

import { MaterialTailwindControllerProvider } from '@/context';
import './css/tailwind.css';

ReactDOM.createRoot(document.getElementById('root')).render(
	<React.StrictMode>
		<Provider store={store}>
			<BrowserRouter>
				<ThemeProvider>
					<MaterialTailwindControllerProvider>
						<App />
					</MaterialTailwindControllerProvider>
				</ThemeProvider>
			</BrowserRouter>
		</Provider>
	</React.StrictMode>
);