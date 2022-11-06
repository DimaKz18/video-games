import { useMemo } from 'react';
import { Game } from '../service/games/models';

export const useFilteredGames = (games: Game[], filter: string | null) => {
	const filteredGames = useMemo(() => {
		return games.filter((game) => filter ? game.provider === filter : game);
	}, [games, filter]);

	return filteredGames;
};
