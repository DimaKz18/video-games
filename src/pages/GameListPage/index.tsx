import { useGames } from 'context/GamesContext';
import { usePaginatedGames, useFilteredGames, useSearchedGames } from 'hooks';
import { GAMES_PER_PAGE_COUNT } from './helpers';
import { SearchInput } from './components/SearchInput';
import { Pagination } from './components/Pagination';
import { Providers } from './components/Providers';
import { GameList } from './components/GameList';
import styles from './styles.module.scss';

export const GameListPage = () => {
	const {
		games,
		providers,
		searchQuery,
		selectedProvider,
		currentPage,
		loadingGames,
		loadingProviders,
		handleSearchChange,
		handleProviderChange,
		handleCurrentPageChange,
	} = useGames();

	const paginatedGames = usePaginatedGames(games, currentPage, GAMES_PER_PAGE_COUNT);
	const searchedGames = useSearchedGames(paginatedGames, searchQuery);
	const searchedAndFilteredGames = useFilteredGames(
		searchedGames,
		selectedProvider?.value
	);

	return (
		<div className={styles.container}>
			<div className={styles.controllersContainer}>
				<SearchInput onSearchChange={handleSearchChange} />
				<Pagination
					totalItemsCount={games.length}
					itemsPerPage={30}
					currentPage={currentPage}
					loading={loadingGames}
					onPageChange={handleCurrentPageChange}
				/>
				<Providers
					providers={providers}
					selectedProvider={selectedProvider}
					loading={loadingProviders}
					onProviderChange={handleProviderChange}
				/>
			</div>
			<GameList games={searchedAndFilteredGames} loading={loadingGames} />
		</div>
	);
};
