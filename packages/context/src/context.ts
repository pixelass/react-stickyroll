import React from "react";
import {ContextProps} from "./types";

export const StickyrollContext = React.createContext<ContextProps>({
	anchors: {
		triggers: []
	},
	pageCount: 0,
	currentPage: 0,
	pageIndex: 0,
	progress: 0,
	time: 0
});

export const {Provider: StickyrollProvider, Consumer: StickyrollConsumer} = StickyrollContext;
