import { createContext, useContext } from 'react';
import { useQuery } from '@tanstack/react-query';
import { fetchGamesCall, fetchProvidersCall } from 'service/games/service';
import { GamesContextProviderProps, GamesContextType } from './types';

const initialContext: GamesContextType = {
	games: [],
	providers: [],
	loadingGames: false,
	loadingProviders: false,
};

const GamesContext = createContext(initialContext);

export const useGames = (): GamesContextType => useContext(GamesContext);

export const GamesContextProvider = ({ children }: GamesContextProviderProps) => {
	const gamesQuery = useQuery(['games'], fetchGamesCall, {
		staleTime: 60000,
	});
	const providersQuery = useQuery(['providers'], fetchProvidersCall, {
		staleTime: 60000,
	});

	const modifiedGames = Object.entries(gamesQuery.data || []).map((game) => ({
		...game[1],
	}));

	const contextValue = {
		games: modifiedGames.slice(0, 60),
		providers: providersQuery.data || [],
		loadingGames: gamesQuery.isLoading,
		loadingProviders: providersQuery.isLoading,
	};

	return <GamesContext.Provider value={contextValue}>{children}</GamesContext.Provider>;
};
