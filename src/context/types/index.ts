import { Game, Provider } from 'service/games/models';
import { ProviderOption } from 'pages/GameListPage/types';

export type GamesContextProviderProps = {
	children: React.ReactNode;
};

export type GamesContextType = {
	games: Game[];
	providers: Provider[];
	searchQuery: string;
	selectedProvider: ProviderOption | null;
	loadingGames: boolean;
	loadingProviders: boolean;
	handleSearchChange: (query: string) => void;
	handleProviderChange: (provider: ProviderOption | null) => void;
};
