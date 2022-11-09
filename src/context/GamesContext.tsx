import { createContext, useCallback, useContext, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchGamesCall, fetchProvidersCall } from 'service/games/service';
import { useDebounce } from 'hooks';
import { GamesContextProviderProps, GamesContextType } from './types';
import { ProviderOption } from 'pages/GameListPage/types';

const GamesContext = createContext({} as GamesContextType);

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
	const debouncedSearchQuery = useDebounce(searchQuery);

	const handleSearchChange = useCallback((query: string) => {
		setSearchQuery(query);
	}, []);

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
		debouncedSearchQuery,
		selectedProvider,
		currentPage,
		loadingGames: gamesQuery.isLoading,
		loadingProviders: providersQuery.isLoading,
		handleSearchChange,
		handleProviderChange,
		handleCurrentPageChange,
	};

	return <GamesContext.Provider value={contextValue}>{children}</GamesContext.Provider>;
};
