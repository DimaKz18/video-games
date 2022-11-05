import { RouteItem } from '../types';
import { root, other, currentGame } from '../routes';
import { GameListPage } from '../../pages/GameListPage';
import { CurrentGamePage } from '../../pages/CurrentGamePage';

export const PUBLIC_ROUTES: RouteItem[] = [
	{
		path: root,
		element: <GameListPage />,
	},
	{
		path: other,
		element: <GameListPage />,
	},
	{
		path: currentGame,
		element: <CurrentGamePage />,
	},
];
