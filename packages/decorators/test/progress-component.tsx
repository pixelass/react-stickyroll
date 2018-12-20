import { progress } from "../src";
import { IContext } from "@stickyroll/stickyroll";
import React from "react";

@progress
export default class Progress extends React.Component<Partial<IContext>> {
	render() {
		return this.props.progress;
	}
}
