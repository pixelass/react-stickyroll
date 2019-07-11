import React from "react";
import styled, {css, StyledComponent} from "styled-components";

/**
 * @type {StyledComponent<"div", {}>}
 * @return {React.ReactHTMLElement<HTMLElement>}
 */
export const StyledMarker: StyledComponent<"div", {}> = styled.div`
	position: absolute;
	z-index: 1;
	top: calc((var(--pager-size) / 2) + var(--pager-gap));
	left: calc(0.5rem + (var(--pager-size) - var(--marker-width)) / 2);
	width: var(--marker-width);
	background: var(--marker-color);
	visibility: visible;

	&::before,
	&::after {
		position: absolute;
		content: "";
		display: block;
		height: calc(var(--marker-width) / 2);
		width: var(--marker-width);
		left: 0;
		background: inherit;
	}

	&::before {
		bottom: 100%;
		border-radius: calc(var(--marker-width) / 2) calc(var(--marker-width) / 2) 0 0;
	}

	&::after {
		top: 100%;
		border-radius: 0 0 calc(var(--marker-width) / 2) calc(var(--marker-width) / 2);
	}
`;

/**
 * @typedef {object} IMarkerProps
 * @property {number} page
 * @property {number} progress
 */
export interface IMarkerProps {
	page: number;
	progress: number;
}

/**
 * @type {StyledComponent<"nav", {}>}
 * @param {IMarkerProps} props
 * @param {number} props.page
 * @param {number} props.progress
 * @return {React.ReactHTMLElement<HTMLElement>}
 */
export const Marker: React.FunctionComponent<IMarkerProps> = props => {
	return (
		<StyledMarker
			style={{
				height: `calc(${props.progress} * (var(--pager-gap) * 2 + var(--pager-size)) + ${props.page} * (var(--pager-gap) * 2 + var(--pager-size)))`
			}}
		/>
	);
};
