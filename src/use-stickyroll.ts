import type { RefObject } from "react";
import { useEffect, useRef } from "react";

import { CLASS_NAMES, CSS_VARS } from "./constants";
import type { UseStickyrollOptions } from "./types";

/**
 *
 * @param ref
 * @param pages
 * @param factor
 * @param onPage
 * @param onProgress
 * @param onStart
 * @param onEnd
 * @example
 * const ref = useRef<HTMLDivElement>(null);
 * useStickyroll(ref, { pages: 5 });
 *
 * return (
 *   <div ref={ref}
 *        style={{
 *          height: `var(${CSS_VARS.height})`,
 *        }}>
 *     <div style={{position: "sticky", inset: 0}}>
 *       Hello Stickyroll
 *     </div>
 *   </div>
 * );
 */
export default function useStickyroll<T extends HTMLElement>(
	ref: RefObject<T>,
	{ pages, factor = 1, onPage, onProgress, onStart, onEnd }: UseStickyrollOptions
) {
	const handlers = useRef({ onPage, onProgress, onStart, onEnd });

	useEffect(() => {
		let started = false;
		let ended = false;
		let page = -1;
		ref.current.style.setProperty(
			CSS_VARS.height,
			`calc(${pages * factor + 1} * var(--100vh, 100vh))`
		);
		ref.current.style.setProperty(CSS_VARS.pages, pages.toString());
		ref.current.style.setProperty(CSS_VARS.factor, factor.toString());
		ref.current.style.setProperty(CSS_VARS.progress, "0");
		ref.current.style.setProperty(CSS_VARS.page, "0");
		ref.current.classList.add(
			CLASS_NAMES.root,
			CLASS_NAMES.above,
			CLASS_NAMES.nonSticky,
			CLASS_NAMES.page(-1)
		);
		function eventHandler() {
			const { innerHeight } = window;
			const end = innerHeight * (pages * factor) * -1;
			const { top } = ref.current.getBoundingClientRect();

			// Above the sticky box (once)
			if (top > 0 && started) {
				started = false;
				page = -1;

				if (handlers.current.onProgress) {
					handlers.current.onProgress(0, 0, -1);
				}
			}
			// Approaching sticky box
			if (top > 0 && !started) {
				const time = Math.max(-1, (top / innerHeight) * -1);
				ref.current.style.setProperty(CSS_VARS.progress, time.toString());
				ref.current.style.setProperty(CSS_VARS.page, "-1");
				ref.current.classList.remove(
					CLASS_NAMES.sticky,
					CLASS_NAMES.scrolling,
					CLASS_NAMES.below,
					CLASS_NAMES.page(-1),
					...Array.from({ length: pages }, (_, index) => CLASS_NAMES.page(index))
				);
				ref.current.classList.add(
					CLASS_NAMES.nonSticky,
					CLASS_NAMES.above,
					CLASS_NAMES.page(-1)
				);
			}

			// During the sticky phase
			else if (top <= 0 && top >= end) {
				const firstRun = !started;
				const time = (top / innerHeight / factor) * -1;
				const nextPageIndex = Math.abs(Math.floor(time));
				const nextProgress = time - nextPageIndex;
				const pageChange = page !== nextPageIndex;

				ended = false;
				started = true;
				page = nextPageIndex;

				ref.current.style.setProperty(CSS_VARS.progress, nextProgress.toString());
				ref.current.style.setProperty(CSS_VARS.page, nextPageIndex.toString());
				ref.current.classList.remove(
					CLASS_NAMES.nonSticky,
					CLASS_NAMES.above,
					CLASS_NAMES.below,
					CLASS_NAMES.page(-1),
					...Array.from({ length: pages }, (_, index) => CLASS_NAMES.page(index))
				);
				ref.current.classList.add(
					CLASS_NAMES.sticky,
					CLASS_NAMES.scrolling,
					CLASS_NAMES.page(nextPageIndex)
				);

				if (firstRun && handlers.current.onStart) {
					handlers.current.onStart();
				}

				if (pageChange && handlers.current.onPage) {
					handlers.current.onPage(nextPageIndex + 1, nextPageIndex);
				}

				if (handlers.current.onProgress && nextProgress < 1 && nextProgress > 0) {
					handlers.current.onProgress(nextProgress, nextPageIndex + 1, nextPageIndex);
				}
			}

			// Below the sticky box (once)
			else {
				if (top < end && !ended) {
					ended = true;
					page = pages;
					ref.current.style.setProperty(CSS_VARS.progress, "1");
					ref.current.style.setProperty(CSS_VARS.page, (pages - 1).toString());
					ref.current.classList.remove(
						CLASS_NAMES.sticky,
						CLASS_NAMES.scrolling,
						CLASS_NAMES.above,
						CLASS_NAMES.page(-1),
						...Array.from({ length: pages }, (_, index) => CLASS_NAMES.page(index))
					);
					ref.current.classList.add(
						CLASS_NAMES.nonSticky,
						CLASS_NAMES.below,
						CLASS_NAMES.page(pages - 1)
					);

					if (handlers.current.onEnd) {
						handlers.current.onEnd();
					}

					if (handlers.current.onProgress) {
						handlers.current.onProgress(1, pages, pages - 1);
					}
				}
			}
		}

		eventHandler();

		window.addEventListener("scroll", eventHandler, { passive: true });
		window.addEventListener("resize", eventHandler, { passive: true });
		window.addEventListener("orientationchange", eventHandler, { passive: true });

		return () => {
			window.removeEventListener("scroll", eventHandler);
			window.removeEventListener("resize", eventHandler);
			window.removeEventListener("orientationchange", eventHandler);
		};
	}, [ref, pages, factor, handlers]);
}
