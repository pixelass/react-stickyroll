import React from "react";
import {DeviceSupport} from "./device-spport";

export default class extends React.Component {
	componentDidMount() {
		// This is needed due to patternplate not rendering CSS injections correctly.
		const {body} = document;
		const style = document.createElement("style");
		style.innerHTML = `
			body {
				margin: 0;
				font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif;
				background: #E0E0E0;
				color: black;
			}
			* {
				box-sizing: border-box;
			}
		`;
		document.head.appendChild(style);
		//body.style.margin = "0";
		//body.style.fontFamily = "-apple-system, BlinkMacSystemFont, \"Segoe UI\", Roboto, Oxygen-Sans, Ubuntu, Cantarell, \"Helvetica Neue\", sans-serif";
	}
	render() {
		return <DeviceSupport/>;
	}
};
