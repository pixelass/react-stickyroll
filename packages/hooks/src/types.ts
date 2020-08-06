import React from "react";

export type Pages = number | any[];

export interface Options {
	factor?: number;
	throttle?: number;
	pages: Pages;
}

export interface Props {
	currentPage: number;
	pageCount: number;
	pageIndex: number;
	progress: number;
	time: number;
	style: React.CSSProperties & {
		"--stickyroll-time": number;
		"--stickyroll-progress": number;
		"--stickyroll-currentPage": number;
		"--stickyroll-pageCount": number;
		"--stickyroll-pageIndex": number;
	};
}
export interface UseAnchorsProps {
	name: string;
	factor: number;
	pageCount: number;
	pageIndex: number;
	progress: number;
	smooth?: boolean;
}

export interface Target {
	id: string;
	style: React.CSSProperties;
}

export interface Trigger {
	href: string;
	scrollTo: (e: React.ChangeEvent<unknown>) => void;
	active: boolean;
}

export interface Anchors {
	triggers: Trigger[];
}

export interface UseAnchorsReturn {
	triggers: Trigger[];
	targets: Target[];
}

export type Ref = React.RefObject<any>;
