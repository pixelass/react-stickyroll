import React from "react";

type Pages = number | any[];
interface Options {
	factor?: number;
	pages: Pages;
}

interface Props {
	currentPage: number;
	pageCount: number;
	pageIndex: number;
	progress: number;
	height: string;
}

type UseStickyroll = (options: Options) => [React.RefObject<any>, Props];

export const useStickyroll: UseStickyroll = ({ factor = 1, pages }) => {
	const ref = React.useRef();
	const [pageIndex, setPageIndex] = React.useState(0);
	const [progress, setProgress] = React.useState(0);
	const pageCount =
		typeof pages === "number" ? pages : Array.isArray(pages) && pages.length;
	const handleScroll = React.useCallback(() => {
		const { current } = ref;
		if (current !== undefined) {
			const end = window.innerHeight * -pageCount * factor;
			const { top } = (current as HTMLElement).getBoundingClientRect();
			if (top <= 0 && top >= end) {
				const time = -top / window.innerHeight / factor;
				const nextPageIndex = Math.floor(time);
				const nextProgress = time - nextPageIndex;
				setProgress(nextProgress);
				setPageIndex(nextPageIndex);
			} else if (top < end) {
				setProgress(1);
				setPageIndex(pageCount - 1);
			} else if (top > 0) {
				setProgress(0);
				setPageIndex(0);
			}
		}
	}, [ref, setPageIndex, setProgress, pageCount, factor]);
	React.useEffect(() => {
		window.addEventListener("scroll", handleScroll);
		return () => {
			window.removeEventListener("scroll", handleScroll);
		};
	}, [handleScroll]);

	const height = React.useMemo(() => `${pageCount * factor * 100 + 100}vh`, [
		pageCount,
		factor
	]);

	const props = {
		currentPage: pageIndex + 1,
		pageCount,
		pageIndex,
		progress,
		height
	};

	return [ref as React.RefObject<any>, props];
};
