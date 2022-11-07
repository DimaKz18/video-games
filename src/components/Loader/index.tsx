import { memo } from 'react';
import { Oval } from 'react-loader-spinner';

type Props = {
	show: boolean;
	className?: string;
};

export const Loader = memo(({ show, className }: Props) => {
	return show ? (
		<Oval
			height={32}
			width={32}
			color='#405DE6'
			visible={true}
			secondaryColor='#405DE6'
			strokeWidth={2}
			strokeWidthSecondary={2}
			wrapperClass={className}
		/>
	) : null;
});
