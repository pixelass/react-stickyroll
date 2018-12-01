import React from "react";

export type TProgressable = (
	component: React.ReactElement<any>,
	progress: number
) => React.ReactElement<any>;
export const progressable: TProgressable = (component, progress) =>
	React.cloneElement(component, {
		style: {
			...(component.props.style || {}),
			"--progress": progress
		}
	});
