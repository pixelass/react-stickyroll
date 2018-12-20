import {hashClassNames} from "../src";
import {classNames} from "@stickyroll/utils";

interface MarkupOptions {
	anchors?: string;
	className?: string;
	content?: string;
	factor?: number;
	pages?: number;
}

export const DEFAULT_OPTIONS: MarkupOptions = {
	anchors: "",
	className: "",
	content: "",
	factor: 1,
	pages: 1
};

export const createMarkup = ({
	anchors = DEFAULT_OPTIONS.anchors,
	className = DEFAULT_OPTIONS.className,
	content = DEFAULT_OPTIONS.content,
	factor = DEFAULT_OPTIONS.factor,
	pages = DEFAULT_OPTIONS.pages
}: MarkupOptions = DEFAULT_OPTIONS): string =>
	`<div class="${classNames(hashClassNames.wrapper, className)}" `
	+ `style="height:${100 + 100 * factor * pages}vh">${anchors}<div class="${hashClassNames.overlay}">${content}</div></div>`;

export const createAnchors = (
	prefix: string = "",
	pages: number = DEFAULT_OPTIONS.pages,
	factor: number = DEFAULT_OPTIONS.factor
): string =>
	`<div class="${hashClassNames.targets}">${Array(pages)
		.fill(Boolean)
		.map(
			(x, i) =>
				`<span id="${prefix}${prefix === "" ? "" : "/"}${i +
					1}" class="${hashClassNames.target}" style="height:${100 * factor}vh"></span>`
		)
		.join("")}<span id="${prefix}${
		prefix === "" ? "" : "/"
		}${pages + 1}" class="${hashClassNames.target}"></span><span id="${prefix}${
		prefix === "" ? "" : "/"
		}skip" class="${hashClassNames.skip}"></span></div>`;
