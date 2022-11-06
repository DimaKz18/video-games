import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import styles from './styles.module.scss';

type Props = {
	title: string;
	src: string;
};

export const GameItem = memo(({ title, src }: Props) => {
	const { t } = useTranslation();

	return (
		<motion.div
			layout
			animate={{ opacity: 1 }}
			initial={{ opacity: 0 }}
			exit={{ opacity: 0 }}
			transition={{ duration: 0.3 }}
			className={styles.container}
		>
			<img alt={title} src={src} className={styles.image} />
			<p className={styles.title}>{title}</p>
			<button className={styles.playButton}>{t('game_list_play_button')}</button>
		</motion.div>
	);
});
