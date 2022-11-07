import { Game, Provider } from 'service/games/models';
import { ProviderOption } from 'pages/GameListPage/types';

export type GamesContextProviderProps = {
	children: React.ReactNode;
};

export type GamesContextType = {
	games: Game[];
	providers: Provider[];
	searchQuery: string;
	debouncedSearchQuery: string;
	selectedProvider: ProviderOption | null;
	currentPage: number;
	loadingGames: boolean;
	loadingProviders: boolean;
	handleSearchChange: (query: string) => void;
	handleProviderChange: (provider: ProviderOption | null) => void;
	handleCurrentPageChange: (page: number) => void;
};
