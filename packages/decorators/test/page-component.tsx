import {IContext} from "@stickyroll/stickyroll";
import React from "react";
import {page} from "../src";

class Page extends React.Component<Partial<IContext>> {
	render() {
		return `${this.props.page}:${this.props.pageIndex}:${this.props.pages}`;
	}
}

export default page(Page);
