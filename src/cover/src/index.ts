// import Helmet from "react-helmet";
import Cover from "./cover";
import {Stickyroll} from "@stickyroll/stickyroll";

// export const head = () => Helmet.rewind();

export const head = () => `
	<meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover, user-scalable=yes"/>
	<meta charSet="utf-8" />
	<title>Stickyroll</title>
	<link rel="canonical" href="https://stickyroll.github.io/reac-stickyroll"/>
	<link rel="icon" type="text/png" href="https://stickyroll.github.io/media/images/favicon.png" />
	<link rel="icon" type="text/svg" href="https://stickyroll.github.io/media/images/logo.svg" />
	${Stickyroll.getStyleTag()}
`;

export default Cover;
