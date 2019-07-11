import {page} from "@stickyroll/decorators";
import React from "react";
import styled, {StyledComponent} from "styled-components";

export const StyledPagenumber: StyledComponent<any, any> = styled.div`
	position: absolute;
	bottom: 0;
	left: 0;
	padding: 0.5rem 1rem;
	color: currentColor;
	font-size: 1rem;
`;

class Pagenumber extends React.Component<any, {}> {
	render() {
		return (
			<StyledPagenumber>
				<strong>{this.props.page}</strong> of <strong>{this.props.pages}</strong>
			</StyledPagenumber>
		);
	}
}

export default page(Pagenumber);
