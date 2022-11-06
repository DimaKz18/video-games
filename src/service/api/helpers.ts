import axios from 'axios';

export const $publicApi = axios.create({
	baseURL: `http://test-proxy-server-lup-env.eba-2ipxdf96.ap-southeast-2.elasticbeanstalk.com/api/games`,
	headers: {
		Accept: '*/*',
	},
});
