import { memo } from 'react';
import clsx from 'clsx';
import { DOTS, usePagination } from 'hooks';
import { Loader } from 'components/Loader';
import styles from './styles.module.scss';

type Props = {
	totalItemsCount: number;
	itemsPerPage: number;
	currentPage: number;
	loading: boolean;
	siblingCount?: number;
	onPageChange: (page: number) => void;
};

export const Pagination = memo(
	({
		totalItemsCount,
		itemsPerPage,
		currentPage,
		loading,
		siblingCount,
		onPageChange,
	}: Props) => {
		const paginationRange = usePagination({
			totalItemsCount,
			itemsPerPage,
			currentPage,
			siblingCount,
		});

		let lastPage = paginationRange[paginationRange.length - 1];

		const leftArrowContainerClass = clsx(
			styles.paginationItem,
			currentPage === 1 && styles.disabledPagination
		);
		const leftArrowClass = clsx(styles.arrow, styles.leftArrow);
		const rightArrowContainerClass = clsx(
			styles.paginationItem,
			currentPage === lastPage && styles.disabledPagination
		);
		const rightArrowClass = clsx(styles.arrow, styles.rightArrow);
		const dotsClass = clsx(styles.paginationItem, styles.dots);

		const onPreviousPageClick = () => {
			onPageChange(currentPage - 1);
		};

		const onNextPageClick = () => {
			onPageChange(currentPage + 1);
		};

		return !loading ? (
			<ul className={styles.container}>
				<li className={leftArrowContainerClass} onClick={onPreviousPageClick}>
					<div className={leftArrowClass} />
				</li>
				{paginationRange.map((pageNumber) => {
					if (pageNumber === DOTS) {
						return (
							<li className={dotsClass} key={pageNumber}>
								&#8230;
							</li>
						);
					}

					const paginationItemClass = clsx(
						styles.paginationItem,
						pageNumber === currentPage && styles.selectedPage
					);

					return (
						<li
							key={pageNumber}
							className={paginationItemClass}
							onClick={() => onPageChange(Number(pageNumber))}
						>
							{pageNumber}
						</li>
					);
				})}
				<li className={rightArrowContainerClass} onClick={onNextPageClick}>
					<div className={rightArrowClass} />
				</li>
			</ul>
		) : (
			<Loader show />
		);
	}
);
