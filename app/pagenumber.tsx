import {page} from "@stickyroll/decorators";
import React from "react";

@page
class Pagenumber extends React.Component<any, {}> {
	render() {
		return `${this.props.page + 1} of ${this.props.pages}`;
	}
}

export default Pagenumber;
