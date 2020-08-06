import React from "react";
import {StickyrollContext, ContextProps} from "@stickyroll/context";

export function useStickyrollContext(): ContextProps {
	return React.useContext<ContextProps>(StickyrollContext);
}
