import { createContext, useCallback, useContext, useMemo, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchGamesCall, fetchProvidersCall } from 'service/games/service';
import { GamesContextProviderProps, GamesContextType } from './types';
import { ProviderOption } from 'pages/GameListPage/types';
import { debounce } from 'lodash';

const initialContext: GamesContextType = {
	games: [],
	providers: [],
	searchQuery: '',
	selectedProvider: null,
	loadingGames: false,
	loadingProviders: false,
	handleSearchChange: () => {},
	handleProviderChange: () => {},
};

const GamesContext = createContext(initialContext);

export const useGames = (): GamesContextType => useContext(GamesContext);

export const GamesContextProvider = ({ children }: GamesContextProviderProps) => {
	const [searchQuery, setSearchQuery] = useState('');
	const [selectedProvider, setSelectedProvider] = useState<ProviderOption | null>(null);

	const gamesQuery = useQuery(['games'], fetchGamesCall, {
		staleTime: 60000,
	});
	const providersQuery = useQuery(['providers'], fetchProvidersCall, {
		staleTime: 60000,
	});

	const modifiedGames = Object.entries(gamesQuery.data || [])
		.map((game) => ({
			...game[1],
			gameId: game[0],
		}))
		.slice(0, 60);

	const handleSearchChange = useCallback((query: string) => {
		setSearchQuery(query);
	}, []);

	const handleDebouncedSearchChange = useMemo(() => {
		return debounce(handleSearchChange, 200);
	}, [handleSearchChange]);

	const handleProviderChange = useCallback((provider: ProviderOption | null) => {
		setSelectedProvider(provider);
	}, []);

	const contextValue = {
		games: modifiedGames,
		providers: providersQuery.data || [],
		searchQuery,
		selectedProvider,
		loadingGames: gamesQuery.isLoading,
		loadingProviders: providersQuery.isLoading,
		handleSearchChange: handleDebouncedSearchChange,
		handleProviderChange: handleProviderChange,
	};

	return <GamesContext.Provider value={contextValue}>{children}</GamesContext.Provider>;
};
