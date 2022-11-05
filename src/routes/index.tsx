import { Route, Routes } from 'react-router-dom';
import { PUBLIC_ROUTES } from './helpers';

export const AppRoutes = () => {
	const renderPublicRoutes = () => {
		return PUBLIC_ROUTES.map((route) => (
			<Route key={route.path} path={route.path} element={route.element} />
		));
	};

	return <Routes>{renderPublicRoutes()}</Routes>;
};
