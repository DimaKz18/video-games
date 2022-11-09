import { useGames } from 'context/GamesContext';
import { useFilteredGames } from 'hooks';
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
		debouncedSearchQuery,
		selectedProvider,
		currentPage,
		loadingGames,
		loadingProviders,
		handleSearchChange,
		handleProviderChange,
		handleCurrentPageChange,
	} = useGames();

	const filteredGames = useFilteredGames(
		games,
		currentPage,
		GAMES_PER_PAGE_COUNT,
		debouncedSearchQuery,
		selectedProvider?.value
	);

	return (
		<div className={styles.container}>
			<div className={styles.controllersContainer}>
				<SearchInput value={searchQuery} onSearchChange={handleSearchChange} />
				<Pagination
					totalItemsCount={games.length}
					itemsPerPage={GAMES_PER_PAGE_COUNT}
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
			<GameList games={filteredGames} loading={loadingGames} />
		</div>
	);
};
