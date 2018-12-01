import {ScrollConsumer} from "@stickyroll/context";
import React from "react";

/**
 * @typedef {function} TPage
 * @param {React.ComponentClass} BaseComponent
 * @return {any}
 */
export type TPage = (BaseComponent: React.ComponentClass) => any;

/**
 * Add page and pages to the component properties
 * @type {TPage}
 */
export const page: TPage = BaseComponent => {
	return (props: any) => (
		<ScrollConsumer>
			{({page, pages}) => <BaseComponent {...props} page={page} pages={pages} />}
		</ScrollConsumer>
	);
};
