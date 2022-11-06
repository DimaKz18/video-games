import { memo } from 'react';
import { Oval } from 'react-loader-spinner';
import Select from 'react-select';
import { Provider } from 'service/games/models';
import { ProviderOption } from '../../types';
import styles from './styles.module.scss';

type Props = {
	providers: Provider[];
	loadingProviders: boolean;
	onProviderChange: (value: string | null) => void;
};

export const Providers = memo(
	({ providers, loadingProviders, onProviderChange }: Props) => {
		const showProviders = !loadingProviders && providers.length > 0;
		const modifiedProviders = providers.map((provider) => {
			return {
				value: provider.id,
				label: provider.title,
			};
		});

		const onChange = (option: ProviderOption | null) => {
			const selectedOption = option?.value || null;
			onProviderChange(selectedOption);
		};

		return (
			<div className={styles.container}>
				{loadingProviders && (
					<Oval
						height={32}
						width={32}
						color='#405DE6'
						visible={true}
						secondaryColor='#405DE6'
						strokeWidth={2}
						strokeWidthSecondary={2}
					/>
				)}
				{showProviders && (
					<Select
						isClearable
						isSearchable
						className={styles.selector}
						name='providers'
						options={modifiedProviders}
						onChange={onChange}
					/>
				)}
			</div>
		);
	}
);
