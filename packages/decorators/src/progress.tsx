import {ScrollConsumer} from "@stickyroll/context";
import React from "react";

/**
 * @typedef {function} TProgress
 * @param {React.ComponentClass} BaseComponent
 * @return {any}
 */
export type TProgress = (BaseComponent: React.ComponentClass) => any;

/**
 * Add progress to the component properties
 * @type {TProgress}
 */
export const progress: TProgress = BaseComponent => {
	return (props: any) => (
		<ScrollConsumer>
			{({progress}) => <BaseComponent {...props} progress={progress} />}
		</ScrollConsumer>
	);
};
