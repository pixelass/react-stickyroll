import {Target, Trigger, UseAnchorsProps, UseAnchorsReturn} from "./types";
import {scrollTo} from "@stickyroll/utils";

export function useAnchors({
	name,
	smooth,
	progress,
	factor = 1,
	pageCount,
	pageIndex
}: UseAnchorsProps): UseAnchorsReturn {
	const targets: Target[] =
		typeof name === "string"
			? new Array(pageCount + 1).fill(Boolean).map((_, i) => ({
					id: `${name}${name.length ? "/" : ""}${i + 1}`,
					style: {
						height: `${100 * factor}vh`
					}
			  }))
			: [];
	const triggers: Trigger[] = targets.map((target, i) => ({
		href: `#${target.id}`,
		scrollTo: (e: React.ChangeEvent<unknown>) => {
			scrollTo(`#${target.id}`, e.target as HTMLElement, {smooth});
		},
		active: (i === pageIndex && progress < 1) || (i === pageCount && progress === 1)
	}));
	return {targets, triggers};
}
