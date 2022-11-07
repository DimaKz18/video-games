import { ChangeEvent, memo } from 'react';
import { useTranslation } from 'react-i18next';
import styles from './styles.module.scss';

type Props = {
	value: string;
	onSearchChange: (value: string) => void;
};

export const SearchInput = memo(({ value, onSearchChange }: Props) => {
	const { t } = useTranslation();

	const onChange = (e: ChangeEvent<HTMLInputElement>) => {
		onSearchChange(e.currentTarget.value);
	};

	return (
		<input
			value={value}
			className={styles.input}
			placeholder={t('game_list_search_title')}
			onChange={onChange}
		/>
	);
});
