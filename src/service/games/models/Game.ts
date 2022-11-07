export type Game = {
	title: string;
	provider: string;
	demo: string;
};

export type ServerGame = {
	[key: string]: Game;
};
