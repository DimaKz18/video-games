import { useCallback, useMemo, useState } from 'react';
import debounce from 'lodash.debounce';
import { useGames } from 'context/GamesContext';
import { useFilteredGames, useSearchedGames } from 'hooks';
import { mockedGames } from './helpers';
import { SearchInput } from './components/SearchInput';
import { Providers } from './components/Providers';
import { GameList } from './components/GameList';
import styles from './styles.module.scss';

export const GameListPage = () => {
	const [selectedProvider, setSelectedProvider] = useState<string | null>(null);
	const [searchQuery, setSearchQuery] = useState('');

	const { games, providers, loadingGames, loadingProviders } = useGames();

	const searchedGames = useSearchedGames(games, searchQuery);
	const searchedAndFilteredGames = useFilteredGames(searchedGames, selectedProvider);

	const handleSearchChange = useCallback((query: string) => {
		setSearchQuery(query);
	}, []);

	const handleDebouncedSearchChange = useMemo(() => {
		return debounce(handleSearchChange, 200);
	}, [handleSearchChange]);

	const handleProviderChange = useCallback((provider: string | null) => {
		setSelectedProvider(provider);
	}, []);

	return (
		<div className={styles.container}>
			<div className={styles.filtersContainer}>
				<SearchInput onSearchChange={handleDebouncedSearchChange} />
				<Providers
					providers={providers}
					loading={loadingProviders}
					onProviderChange={handleProviderChange}
				/>
			</div>
			<GameList games={searchedAndFilteredGames} loading={loadingGames} />
		</div>
	);
};
