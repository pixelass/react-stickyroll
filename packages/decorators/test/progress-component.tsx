import {IContext} from "@stickyroll/stickyroll";
import React from "react";
import {progress} from "../src";

class Progress extends React.Component<Partial<IContext>> {
	render() {
		return this.props.progress;
	}
}

export default progress(Progress);
