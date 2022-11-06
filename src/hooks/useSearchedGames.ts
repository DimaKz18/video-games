import { useMemo } from 'react';
import { Game } from '../service/games/models';

export const useSearchedGames = (games: Game[], searchQuery: string) => {
	const searchedGames = useMemo(() => {
		return games.filter((game) =>
			game.title.toLowerCase().includes(searchQuery.toLowerCase())
		);
	}, [games, searchQuery]);

	return searchedGames;
};
