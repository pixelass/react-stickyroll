import type { RefObject } from "react";
import { useEffect, useRef } from "react";
import type { Except } from "type-fest";

import { CLASS_NAMES, CSS_VARS } from "./constants";
import type { UseStickyrollOptions } from "./types";

function removeClassNames<T extends HTMLElement>(
	element: T,
	classNames: (keyof Except<typeof CLASS_NAMES, "page">)[],
	pages = 0
) {
	element.classList.remove(
		...classNames.map(className => CLASS_NAMES[className]),
		...Array.from({ length: pages ? pages + 1 : 0 }, (_, index) => CLASS_NAMES.page(index - 1))
	);
}

function addClassNames<T extends HTMLElement>(
	element: T,
	classNames: (keyof Except<typeof CLASS_NAMES, "page">)[],
	page?: number
) {
	element.classList.add(...classNames.map(className => CLASS_NAMES[className]));
	if (page !== undefined) {
		element.classList.add(CLASS_NAMES.page(page));
	}
}

function setCSSVariables<T extends HTMLElement>(
	element: T,
	record: Partial<Record<keyof typeof CSS_VARS, string | number>>
) {
	Object.entries(record).forEach(([key, value]) => {
		element.style.setProperty(CSS_VARS[key], value.toString());
	});
}

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

		setCSSVariables(ref.current, {
			height: `calc(${pages * factor + 1} * var(--100vh, 100vh))`,
			pages,
			factor,
			progress: 0,
			page: -1,
		});
		addClassNames(ref.current, ["root"]);

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

				setCSSVariables(ref.current, {
					progress: time,
					page: -1,
				});
				removeClassNames(ref.current, ["sticky", "below"], pages);
				addClassNames(ref.current, ["nonSticky", "above"], -1);
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

				setCSSVariables(ref.current, {
					progress: nextProgress,
					page: nextPageIndex,
				});
				removeClassNames(ref.current, ["nonSticky", "above", "below"], pages);
				addClassNames(ref.current, ["sticky"], nextPageIndex);

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

					setCSSVariables(ref.current, {
						progress: 1,
						page: pages - 1,
					});
					removeClassNames(ref.current, ["sticky", "above"], pages);
					addClassNames(ref.current, ["nonSticky", "below"], pages - 1);

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
