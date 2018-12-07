import {createGlobalStyle} from "styled-components";
import { pink } from "@stickyroll/themes";

export const GlobalStyle = createGlobalStyle`
	body {
		margin: 0;
		font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif;
		background: ${pink.backgroundColor};
		color: ${pink.color};
	}
	* {
		box-sizing: border-box;
	}
`;
