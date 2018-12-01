import {progress} from "@stickyroll/decorators";
import React from "react";

@progress
class Progressbar extends React.Component<any, {}> {
	render() {
		return (
			<div style={{
				background: "white",
				height: "1rem",
				width: `${this.props.progress * 100}%`
			}}/>
		)
	}
}

export default Progressbar;
