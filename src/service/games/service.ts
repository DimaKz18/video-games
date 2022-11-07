import { $publicApi, getGamesRoute, getProvidersRoute } from '../api';
import { Provider, ServerGame } from './models';

export const fetchGamesCall = async (): Promise<ServerGame> => {
	return await (
		await $publicApi.get(getGamesRoute())
	).data;
};

export const fetchProvidersCall = async (): Promise<Provider[]> => {
	return await (
		await $publicApi.get(getProvidersRoute())
	).data;
};
