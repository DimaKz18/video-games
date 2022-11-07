import { useTranslation } from 'react-i18next';
import { useNavigate, useLocation } from 'react-router-dom';
import { useGames } from 'context/GamesContext';
import { Loader } from 'components/Loader';
import styles from './styles.module.scss';

export const CurrentGamePage = () => {
	const { t } = useTranslation();
	const navigate = useNavigate();
	const location = useLocation();
	const { games, loadingGames } = useGames();

	const currentGameId = location.pathname.substring(1);
	const currentGame = games.find((game) => game.gameId === currentGameId);

	const iframeSrc = `https://www.domain.com/it${currentGame?.demo}`;
	const showNoResultText = !currentGame && !loadingGames;

	const onBackClick = () => {
		navigate('/');
	};

	return (
		<div className={styles.container}>
			<p className={styles.backIcon} onClick={onBackClick} />
			{currentGame && (
				<>
					<p className={styles.title}>{currentGame?.title}</p>
					<p className={styles.provider}>{currentGame?.provider}</p>
					<iframe
						title={currentGame?.title}
						src={iframeSrc}
						className={styles.frame}
					></iframe>
				</>
			)}
			{showNoResultText && (
				<p className={styles.noResultTitle}>{t('current_game_no_result')}</p>
			)}
			<Loader show={loadingGames} className={styles.loader} />
		</div>
	);
};
