import React from "react";
import throttleFn from "lodash.throttle";
import {Options, Props, Ref} from "./types";

export function useStickyroll({factor = 1, pages, throttle}: Options): [Ref, Props] {
	const ref = React.useRef();
	const [pageIndex, setPageIndex] = React.useState(0);
	const [progress, setProgress] = React.useState(0);
	const pageCount = typeof pages === "number" ? pages : Array.isArray(pages) && pages.length;
	const handleScroll = React.useCallback(() => {
		const {current} = ref;
		if (current !== undefined) {
			const end = window.innerHeight * -pageCount * factor;
			const {top} = (current as HTMLElement).getBoundingClientRect();
			if (top <= 0 && top > end) {
				const time = -top / window.innerHeight / factor;
				const nextPageIndex = Math.floor(time);
				const nextProgress = time - nextPageIndex;
				setProgress(nextProgress);
				setPageIndex(nextPageIndex);
			} else if (top <= end) {
				setProgress(1);
				setPageIndex(pageCount - 1);
			} else if (top > 0) {
				setProgress(0);
				setPageIndex(0);
			}
		}
	}, [ref, setPageIndex, setProgress, pageCount, factor]);

	const throttledScroll = React.useMemo(
		() => (throttle ? throttleFn(handleScroll, throttle) : handleScroll),
		[throttle]
	);

	React.useEffect(() => {
		window.addEventListener("scroll", throttledScroll);
		return () => {
			window.removeEventListener("scroll", throttledScroll);
		};
	}, [throttledScroll]);

	const props: Props = {
		currentPage: pageIndex + 1,
		pageCount,
		pageIndex,
		progress,
		time: pageIndex + progress,
		style: {
			height: `${pageCount * factor * 100 + 100}vh`,
			"--stickyroll-time": pageIndex + progress,
			"--stickyroll-progress": progress,
			"--stickyroll-currentPage": pageIndex + 1,
			"--stickyroll-pageCount": pageCount,
			"--stickyroll-pageIndex": pageIndex
		}
	};

	return [ref, props];
}
