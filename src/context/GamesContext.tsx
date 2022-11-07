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
	currentPage: 1,
	loadingGames: false,
	loadingProviders: false,
	handleSearchChange: () => {},
	handleProviderChange: () => {},
	handleCurrentPageChange: () => {},
};

const GamesContext = createContext(initialContext);

export const useGames = (): GamesContextType => useContext(GamesContext);

export const GamesContextProvider = ({ children }: GamesContextProviderProps) => {
	const [searchQuery, setSearchQuery] = useState('');
	const [selectedProvider, setSelectedProvider] = useState<ProviderOption | null>(null);
	const [currentPage, setCurrentPage] = useState(1);

	const gamesQuery = useQuery(['games'], fetchGamesCall, {
		staleTime: 60000,
	});
	const providersQuery = useQuery(['providers'], fetchProvidersCall, {
		staleTime: 60000,
	});

	const modifiedGames = Object.entries(gamesQuery.data || []).map((game) => ({
		...game[1],
		gameId: game[0],
	}));

	const handleSearchChange = useCallback((query: string) => {
		setSearchQuery(query);
	}, []);

	const handleDebouncedSearchChange = useMemo(() => {
		return debounce(handleSearchChange, 200);
	}, [handleSearchChange]);

	const handleProviderChange = useCallback((provider: ProviderOption | null) => {
		setSelectedProvider(provider);
	}, []);

	const handleCurrentPageChange = useCallback((page: number) => {
		setCurrentPage(page);
	}, []);

	const contextValue = {
		games: modifiedGames,
		providers: providersQuery.data || [],
		searchQuery,
		selectedProvider,
		currentPage,
		loadingGames: gamesQuery.isLoading,
		loadingProviders: providersQuery.isLoading,
		handleSearchChange: handleDebouncedSearchChange,
		handleProviderChange,
		handleCurrentPageChange,
	};

	return <GamesContext.Provider value={contextValue}>{children}</GamesContext.Provider>;
};
