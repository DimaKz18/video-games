import { memo, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { AnimatePresence, motion } from 'framer-motion';
import { useWindowSize } from 'hooks';
import { Game } from 'service/games/models';
import { CONTAINER_PADDING, GAME_ITEM_SIZE } from '../../helpers';
import { GameItem } from './GameItem';
import { Loader } from 'components/Loader';
import styles from './styles.module.scss';

type Props = {
	games: Game[];
	loading: boolean;
};

export const GameList = memo(({ games, loading }: Props) => {
	const { t } = useTranslation();
	const windowSize = useWindowSize();

	const itemsPerRow = useMemo(() => {
		return Math.floor((windowSize.width - CONTAINER_PADDING) / GAME_ITEM_SIZE);
	}, [windowSize.width]);

	const hasGame = games.length > 0;
	const showNoResultText = !hasGame && !loading;

	const containerStyle = {
		gridTemplateColumns: `repeat(${itemsPerRow}, auto)`,
	};

	return (
		<>
			{hasGame && (
				<motion.div layout className={styles.container} style={containerStyle}>
					<AnimatePresence>
						{games.map((game) => {
							return <GameItem key={game.title} {...game} />;
						})}
					</AnimatePresence>
				</motion.div>
			)}
			{showNoResultText && (
				<p className={styles.noResultTitle}>{t('game_list_no_games')}</p>
			)}
			<Loader show={loading} className={styles.loader} />
		</>
	);
});
