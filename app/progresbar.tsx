import {progress} from "@stickyroll/decorators";
import React from "react";

@progress
class Progressbar extends React.Component<any, {}> {
	render() {
		return (
			<div
				style={{
					background: "currentColor",
					height: "3rem",
					width: `${this.props.progress * 100}%`
				}}
			/>
		);
	}
}

export default Progressbar;
