import React from "react";

export type Renderer = (context: StickyrollContext) => React.ReactNode;

export interface StickyrollProps {
	pages: number | any[];
	factor?: number;
	throttle?: number;
	anchors?: string;
	smooth?: boolean;
	children?: React.ReactNode;
	className?: string;
	render?: Renderer;
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

export interface StickyrollContext {
	currentPage: number;
	progress: number;
	time: number;
	pageIndex: number;
	pageCount: number;
	anchors: Anchors;
}
