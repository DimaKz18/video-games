export type Game = {
	title: string;
	provider: string;
	demo: string;
	gameId: string;
};

export type ServerGame = {
	[key: string]: Game;
};
