import { Game } from '../../../service/games/models';

export const CONTAINER_PADDING = 100;
export const GAME_ITEM_SIZE = 300;

export const mockedGames: Game[] = [
	{
		title: '10 Lucky Spins',
		provider: 'belatra',
		demo: 'https://image.tmdb.org/t/p/w500/y5Z0WesTjvn59jP6yo459eUsbli.jpg',
	},
	{
		title: 'All Ways Egypt',
		provider: 'belatra',
		demo: 'https://image.tmdb.org/t/p/w500//bQXAqRx2Fgc46uCVWgoPz5L5Dtr.jpg',
	},
	{
		title: 'Outback Heat',
		provider: 'igtech',
		demo: 'https://image.tmdb.org/t/p/w500//pGx6O6IwqADOsgmqWzPysmWnOyr.jpg',
	},
	{
		title: 'Farm Ville',
		provider: 'lucky',
		demo: 'https://image.tmdb.org/t/p/w500/naNXYdBzTEb1KwOdi1RbBkM9Zv1.jpg',
	},
	{
		title: 'Farm Ville 2',
		provider: 'lucky',
		demo: 'https://image.tmdb.org/t/p/w500/bJa3RcFKgtVKJqTJCSSuBQeP9c8.jpg',
	},
	{
		title: 'Pai Gow',
		provider: 'booongo',
		demo: 'https://image.tmdb.org/t/p/w500/askg3SMvhqEl4OL52YuvdtY40Yb.jpg',
	},
	{
		title: 'Red Dog',
		provider: 'booongo',
		demo: 'https://image.tmdb.org/t/p/w500/tIX6j3NzadlwGcJ52nuWdmtOQkg.jpg',
	},
	{
		title: 'Aztec Magic Deluxe',
		provider: 'booming',
		demo: 'https://image.tmdb.org/t/p/w500/1DBDwevWS8OhiT3wqqlW7KGPd6m.jpg',
	},
	{
		title: 'Aztec Magic Megaways',
		provider: 'booming',
		demo: 'https://image.tmdb.org/t/p/w500/iS9U3VHpPEjTWnwmW56CrBlpgLj.jpg',
	},
];
