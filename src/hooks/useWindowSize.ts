import { useEffect, useState } from 'react';

export const useWindowSize = () => {
	const [windowSize, setWindowSize] = useState(() => {
		return {
			width: window.innerWidth || 0,
			height: window.innerHeight || 0,
		};
	});

	const handleResize = () => {
		setWindowSize({
			width: window.innerWidth,
			height: window.innerHeight,
		});
	};

	useEffect(() => {
		let delay = 0;

		window.addEventListener('resize', () => {
			clearTimeout(delay);
			delay = window.setTimeout(handleResize, 100);
		});
		handleResize();

		return () => window.removeEventListener('resize', handleResize);
	}, []);

	return windowSize;
};
