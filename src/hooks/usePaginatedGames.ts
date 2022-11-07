import { useMemo } from 'react';
import { Game } from '../service/games/models';

export const usePaginatedGames = (
	games: Game[],
	currentPage: number,
	itemsPerPage: number
) => {
	const paginatedGames = useMemo(() => {
		const firstPageIndex = (currentPage - 1) * itemsPerPage;
		const lastPageIndex = firstPageIndex + itemsPerPage;

		return games.slice(firstPageIndex, lastPageIndex);
	}, [currentPage, games, itemsPerPage]);

	return paginatedGames;
};
