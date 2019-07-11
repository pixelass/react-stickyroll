import { page } from "@stickyroll/decorators";
import { IContext } from "@stickyroll/stickyroll";
import React from "react";

class PageCounter extends React.Component<Partial<IContext>> {
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
export default page(PageCounter);
