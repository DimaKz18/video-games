import { BrowserRouter } from 'react-router-dom';
import { I18nextProvider } from 'react-i18next';
import { i18next } from './translations';
import { AppRoutes } from './routes';
import { QueryClient } from '@tanstack/query-core';
import { QueryClientProvider } from '@tanstack/react-query';
import { GamesContextProvider } from 'context/GamesContext';

const queryClient = new QueryClient();

function App() {
	return (
		<BrowserRouter>
			<I18nextProvider i18n={i18next}>
				<QueryClientProvider client={queryClient}>
					<GamesContextProvider>
						<AppRoutes />
					</GamesContextProvider>
				</QueryClientProvider>
			</I18nextProvider>
		</BrowserRouter>
	);
}

export default App;
