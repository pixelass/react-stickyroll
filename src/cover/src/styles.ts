import {createGlobalStyle} from "styled-components";
import {deepPurple, deepOrange} from "@stickyroll/themes";

export const GlobalStyle = createGlobalStyle`
	body {
		margin: 0;
		font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif;
		background: ${(p: any) => p.dark.backgroundColor}
			linear-gradient(-155deg, ${(p: any) => p.dark.backgroundColor} 25%, ${(p: any) =>
	p.light.backgroundColor} 75%);
		background-size: 100vw 100vh;
		background-attachment: fixed;
		color: ${(p: any) => p.light.color};
	}
	* {
		box-sizing: border-box;
	}
`;

GlobalStyle.defaultProps = {
	dark: deepPurple,
	light: deepOrange
};
