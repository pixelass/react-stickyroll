export interface Trigger {
	href: string;
	scrollTo: (e: React.ChangeEvent<unknown>) => void;
	active: boolean;
}

export interface Anchors {
	triggers: Trigger[];
}

export interface ContextProps {
	anchors: Anchors;
	currentPage: number;
	pageCount: number;
	pageIndex: number;
	progress: number;
	time: number;
}
