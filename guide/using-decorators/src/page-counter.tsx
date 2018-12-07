import { page } from "@stickyroll/decorators";
import { IContext } from "@stickyroll/stickyroll";
import React from "react";

@page
export default class PageCounter extends React.Component<Partial<IContext>> {
	render() {
		return (
			<React.Fragment>
				<strong>{this.props.page}</strong>{" "}
				of{" "}
				<strong>{this.props.pages}</strong>
			</React.Fragment>
		);
	}
}
