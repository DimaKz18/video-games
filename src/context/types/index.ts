import { Game, Provider } from 'service/games/models';

export type GamesContextProviderProps = {
	children: React.ReactNode;
};

export type GamesContextType = {
	games: Game[];
	providers: Provider[];
	loadingGames: boolean;
	loadingProviders: boolean;
};
