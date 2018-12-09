import Helmet from "react-helmet";
import Cover from "./cover";

// export const head = () => `
// 	<meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover, user-scalable=yes"/>
// `;
// export const css = () => `
// 	body {
// 		background: red;
// 	}
// `;

export const head = () => Helmet.rewind();

export default Cover;
