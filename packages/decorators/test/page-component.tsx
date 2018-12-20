import {page} from "../src";
import {IContext} from "@stickyroll/stickyroll";
import React from "react";

@page
export default class Page extends React.Component<Partial<IContext>> {
	render() {
		return `${this.props.page}:${this.props.pageIndex}:${this.props.pages}`;
	}
}
