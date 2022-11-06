import { useCallback, useMemo, useState } from 'react';
import debounce from 'lodash.debounce';
import { useFilteredGames, useMountEffect, useSearchedGames } from 'hooks';
import { Provider } from 'service/games/models';
import { fetchProvidersCall } from 'service/games/service';
import { mockedGames } from './helpers';
import { SearchInput } from './components/SearchInput';
import { Providers } from './components/Providers';
import { GameList } from './components/GameList';
import styles from './styles.module.scss';

export const GameListPage = () => {
	const [providers, setProviders] = useState<Provider[]>([]);
	const [loadingProviders, setLoadingProviders] = useState(false);

	const [selectedProvider, setSelectedProvider] = useState<string | null>(null);
	const [searchQuery, setSearchQuery] = useState('');

	const searchedGames = useSearchedGames(mockedGames, searchQuery);
	const searchedAndFilteredGames = useFilteredGames(searchedGames, selectedProvider);

	const fetchProviders = async () => {
		setLoadingProviders(true);
		const providers = await fetchProvidersCall();
		setProviders(providers);
		setLoadingProviders(false);
	};

	useMountEffect(() => {
		fetchProviders();
	});

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
					loadingProviders={loadingProviders}
					onProviderChange={handleProviderChange}
				/>
			</div>
			<GameList games={searchedAndFilteredGames} />
		</div>
	);
};
