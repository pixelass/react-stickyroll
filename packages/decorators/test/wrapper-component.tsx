import {ScrollConsumer, ScrollProvider} from "@stickyroll/context";
import React from "react";

export const Wrapper = ({context, children}) => (
	<ScrollProvider value={context}>
		<ScrollConsumer>{children}</ScrollConsumer>
	</ScrollProvider>
);
