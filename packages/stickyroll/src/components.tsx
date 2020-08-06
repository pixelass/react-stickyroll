/** @jsx jsx */
import {jsx, css} from "@emotion/core";
import React from "react";
import {Target} from "./types";

export const contentStyle = css`
	height: 100vh;
	top: 0;
	position: sticky;
`;

export const targetsStyle = css`
	position: absolute;
	top: 0;
	right: 0;
	bottom: 0;
	left: 0;
	z-index: -1;
`;

export const wrapperStyle = css`
	position: relative;
`;

export function Pages({targets}: {targets: Target[]}) {
	return targets.length ? (
		<div css={targetsStyle}>
			{targets.map(target => (
				<div id={target.id} key={target.id} style={target.style} />
			))}
		</div>
	) : null;
}
