import { ChangeEvent, memo } from 'react';
import { useTranslation } from 'react-i18next';
import styles from './styles.module.scss';

type Props = {
	onSearchChange: (value: string) => void;
};

export const SearchInput = memo(({ onSearchChange }: Props) => {
	const { t } = useTranslation();

	const onChange = (e: ChangeEvent<HTMLInputElement>) => {
		onSearchChange(e.currentTarget.value);
	};

	return (
		<input
			className={styles.input}
			placeholder={t('game_list_search_title')}
			onChange={onChange}
		/>
	);
});
