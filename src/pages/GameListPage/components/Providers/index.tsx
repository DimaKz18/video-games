import { memo } from 'react';
import Select from 'react-select';
import { Provider } from 'service/games/models';
import { ProviderOption } from '../../types';
import { Loader } from 'components/Loader';
import styles from './styles.module.scss';

type Props = {
	providers: Provider[];
	selectedProvider: ProviderOption | null;
	loading: boolean;
	onProviderChange: (value: ProviderOption | null) => void;
};

export const Providers = memo(
	({ providers, selectedProvider, loading, onProviderChange }: Props) => {
		const showProviders = !loading && providers.length > 0;
		const modifiedProviders = providers.map((provider) => {
			return {
				value: provider.id,
				label: provider.title,
			};
		});

		const onChange = (option: ProviderOption | null) => {
			const selectedOption = option || null;
			onProviderChange(selectedOption);
		};

		return (
			<div className={styles.container}>
				<Loader show={loading} />
				{showProviders && (
					<Select
						isClearable
						isSearchable
						value={selectedProvider}
						options={modifiedProviders}
						className={styles.selector}
						onChange={onChange}
					/>
				)}
			</div>
		);
	}
);
