import { progress } from "@stickyroll/decorators";
import { IContext } from "@stickyroll/stickyroll";
import React from "react";

class ProgressCounter extends React.Component<Partial<IContext>> {
	render() {
		return (
			<React.Fragment>
				Progress: <strong>{this.props.progress}</strong>
			</React.Fragment>
		);
	}
}

export default progress(ProgressCounter);
