import { useMemo } from 'react';
import { Game } from '../service/games/models';

const usePaginatedGames = (games: Game[], currentPage: number, itemsPerPage: number) => {
	const paginatedGames = useMemo(() => {
		const firstPageIndex = (currentPage - 1) * itemsPerPage;
		const lastPageIndex = firstPageIndex + itemsPerPage;

		return games.slice(firstPageIndex, lastPageIndex);
	}, [currentPage, games, itemsPerPage]);

	return paginatedGames;
};

const useSearchedGames = (games: Game[], searchQuery: string) => {
	const searchedGames = useMemo(() => {
		return games.filter((game) =>
			game.title.toLowerCase().includes(searchQuery.toLowerCase())
		);
	}, [games, searchQuery]);

	return searchedGames;
};

export const useFilteredGames = (
	games: Game[],
	currentPage: number,
	itemsPerPage: number,
	searchQuery: string,
	filter?: string | null
) => {
	const paginatedGames = usePaginatedGames(games, currentPage, itemsPerPage);
	const searchGames = useSearchedGames(paginatedGames, searchQuery);

	const filteredGames = useMemo(() => {
		return searchGames.filter((game) => (filter ? game.provider === filter : game));
	}, [searchGames, filter]);

	return filteredGames;
};
