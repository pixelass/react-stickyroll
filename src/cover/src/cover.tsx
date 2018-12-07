import React from "react";
import Helmet from "react-helmet";
import {DeviceSupport} from "./device-spport";
import {GlobalStyle} from "./styles";
import { Card, Copy, Footer, FooterContent, Header, HeaderContent, Headline } from "./elements";
import { GithubCorner } from "./github-corner";
import Favicon from "./favicon"


export default () => (
	<React.Fragment>
		<Helmet
			title="Stickyroll"
			link={[
				{
					rel: "icon",
					type: "text/svg",
					href: Favicon.svg
				},
				{
					rel: "icon",
					type: "image/png",
					href: Favicon.png
				}
			]}
			meta={[
				{
					name: "viewport",
					content:
						"width=device-width, initial-scale=1.0, viewport-fit=cover, user-scalable=yes"
				}
			]}
		/>
		<GlobalStyle />
		<Header>
			<HeaderContent>
				<Headline as="h1">React Stickyroll</Headline>
			</HeaderContent>
			<GithubCorner href="https://github.com/stickyroll/react-stickyroll"/>
		</Header>
		<Card>
			<Headline>It's time to scroll!</Headline>
			<Headline as="h3">What is stickyroll?</Headline>
			<Copy>
				Stickyroll provides a fullscreen view with a progression listener.
				<br/>
				While the view stays in place, scrolling is translated to pages, each with a progressing
				timeline while the user scrolls. Building amazing parallax landing pages has never been this easy.
			</Copy>

			<Headline as="h3">What about dependencies?</Headline>
			<Copy>
				On top of the basic features Stickyroll provides some useful components via "Styled Components".
				The use of these components is fully optional. Stickyroll is purely built using React.js and
				Loadashs throttle function. Aside from these two libraries stickyroll only relies on it's own packages.
			</Copy>

			<Headline as="h3">What about browser support?</Headline>
			<Copy>
				We test Stickyroll in various browsers on multiple platforms to ensure a stable build.
				All modern browsers should return the same behavior. Older browsers might be supported by the core Components
				but the styled elements use css variables and can therefore not work in IE.
				<br/>
				We do our best to support Edge as long as it has market share.
			</Copy>
		</Card>
		<DeviceSupport />
		<Footer>
			<FooterContent>
				<Copy>
					© 2018 | Coded with 💖 by Gregor Adams.
				</Copy>
			</FooterContent>
		</Footer>
	</React.Fragment>
);
