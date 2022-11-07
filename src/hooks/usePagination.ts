import { useMemo, useCallback } from 'react';

export const DOTS = '...';

type Props = {
	totalItemsCount: number;
	itemsPerPage: number;
	currentPage: number;
	siblingCount?: number;
};

export const usePagination = ({
	totalItemsCount,
	itemsPerPage,
	currentPage,
	siblingCount = 1,
}: Props) => {
	const getPaginationRange = useCallback((start: number, end: number) => {
		const length = end - start + 1;
		return Array.from({ length }, (_, index) => index + start);
	}, []);

	const paginationRange = useMemo(() => {
		const totalPageCount = Math.ceil(totalItemsCount / itemsPerPage);
		const totalPageNumbers = siblingCount + 5;

		if (totalPageNumbers >= totalPageCount) {
			return getPaginationRange(1, totalPageCount);
		}

		const leftSiblingIndex = Math.max(currentPage - siblingCount, 1);
		const rightSiblingIndex = Math.min(currentPage + siblingCount, totalPageCount);

		const showLeftDots = leftSiblingIndex > 2;
		const showRightDots = rightSiblingIndex < totalPageCount - 2;

		const firstPageIndex = 1;
		const lastPageIndex = totalPageCount;

		if (!showLeftDots && showRightDots) {
			let leftItemCount = 5 * siblingCount;
			let leftRange = getPaginationRange(1, leftItemCount);
			return [...leftRange, DOTS, totalPageCount];
		}

		if (showLeftDots && !showRightDots) {
			let rightItemCount = 5 * siblingCount;
			let rightRange = getPaginationRange(
				totalPageCount - rightItemCount + 1,
				totalPageCount
			);
			return [firstPageIndex, DOTS, ...rightRange];
		}

		if (showLeftDots && showRightDots) {
			let middleRange = getPaginationRange(leftSiblingIndex, rightSiblingIndex);
			return [firstPageIndex, DOTS, ...middleRange, DOTS, lastPageIndex];
		}
	}, [totalItemsCount, itemsPerPage, currentPage, siblingCount, getPaginationRange]);

	return paginationRange || [];
};
