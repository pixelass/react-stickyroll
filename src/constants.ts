import type { CSSProperties } from "react";

export const STYLE: CSSProperties = {
	position: "sticky",
	top: 0,
	right: 0,
	left: 0,
	minHeight: "var(--100vh, 100vh)",
};

export const CSS_VARS = {
	height: "--Stickyroll_height",
	pages: "--Stickyroll_pages",
	factor: "--Stickyroll_factor",
	progress: "--Stickyroll_progress",
	page: "--Stickyroll_page",
};

export const CLASS_NAMES = {
	root: "Stickyroll_root",
	above: "Stickyroll_above",
	below: "Stickyroll_below",
	sticky: "Stickyroll_sticky",
	nonSticky: "Stickyroll_nonSticky",
	page(page: number) {
		return `Stickyroll_page_${page}`;
	},
};
