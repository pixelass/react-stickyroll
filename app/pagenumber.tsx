import {page} from "@stickyroll/decorators";
import React from "react";

class Pagenumber extends React.Component<any, {}> {
	render() {
		return `${this.props.page} of ${this.props.pages}`;
	}
}

export default page(Pagenumber);
