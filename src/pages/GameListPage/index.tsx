import { useGames } from 'context/GamesContext';
import { useFilteredGames, useSearchedGames } from 'hooks';
import { mockedGames } from './helpers';
import { SearchInput } from './components/SearchInput';
import { Providers } from './components/Providers';
import { GameList } from './components/GameList';
import styles from './styles.module.scss';

export const GameListPage = () => {
	const {
		games,
		providers,
		searchQuery,
		selectedProvider,
		loadingGames,
		loadingProviders,
		handleSearchChange,
		handleProviderChange,
	} = useGames();

	const searchedGames = useSearchedGames(mockedGames, searchQuery);
	const searchedAndFilteredGames = useFilteredGames(
		searchedGames,
		selectedProvider?.value
	);

	return (
		<div className={styles.container}>
			<div className={styles.filtersContainer}>
				<SearchInput onSearchChange={handleSearchChange} />
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
