import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import styles from './styles.module.scss';

type Props = {
	title: string;
	gameId: string;
};

export const GameItem = memo(({ title, gameId }: Props) => {
	const { t } = useTranslation();
	const navigate = useNavigate();

	const gameSrc = `https://cdn.softswiss.net/i/s3/${gameId}.png`;

	const onPlayClick = () => {
		navigate(`/${gameId}`);
	};

	return (
		<motion.div
			layout
			animate={{ opacity: 1 }}
			initial={{ opacity: 0 }}
			exit={{ opacity: 0 }}
			transition={{ duration: 0.3 }}
			className={styles.container}
		>
			<img alt={title} src={gameSrc} className={styles.image} />
			<p className={styles.title}>{title}</p>
			<button className={styles.playButton} onClick={onPlayClick}>
				{t('game_list_play_button')}
			</button>
		</motion.div>
	);
});
