import { $publicApi, getGamesRoute, getProvidersRoute } from '../api';
import { Game, Provider } from './models';

export const fetchGamesCall = async (): Promise<Game[]> => {
	return await (
		await $publicApi.get(getGamesRoute())
	).data;
};

export const fetchProvidersCall = async (): Promise<Provider[]> => {
	return await (
		await $publicApi.get(getProvidersRoute())
	).data;
};
