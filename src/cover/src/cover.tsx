import React from "react";
import {DeviceSupport} from "./device-support";
import {GlobalStyle} from "./styles";
import styled, {ThemeProvider} from "styled-components";
import {
	Background,
	Copy,
	Footer,
	FooterContent,
	GhostTile,
	Header,
	HeaderContent,
	Headline,
	Tile,
	Tiles,
	Nav,
	Link
} from "./elements";
import {GithubCorner} from "./github-corner";
import {
	light,
	dark,
	deepOrange,
	deepPurple,
	pink
} from "@stickyroll/themes";
import {Logo} from "./logo";

const Heart = props => (
	<svg className={props.className} viewBox="0 0 24 24">
		<path
			fill="currentColor"
			d="M12,21.35L10.55,20.03C5.4,15.36 2,12.27 2,8.5C2,5.41 4.42,3 7.5,3C9.24,3 10.91,3.81 12,5.08C13.09,3.81 14.76,3 16.5,3C19.58,3 22,5.41 22,8.5C22,12.27 18.6,15.36 13.45,20.03L12,21.35Z"
		/>
	</svg>
);

const StyledLink = styled(Link)`
	padding: 0.5rem;
	&:hover {
		text-decoration: underline;
	}
`;

const StyledHeart = styled(Heart)`
	display: inline-flex;
	height: 1.5rem;
	width: 1.5rem;
	margin: -0.5rem 0.5rem;
	color: ${(p: any) => p.theme.backgroundColor};
	stroke: ${(p: any) => p.theme.color};
	stroke-width: 2;
`;

const pagerTheme = {
	pagerSize: "1.5rem",
	pagerGap: "2vh",
	markerSize: "2px",
	strokeWidth: "2px"
};

const themeScale = {
	primary: {...deepPurple, ...pagerTheme},
	secondary: {...deepOrange, ...pagerTheme},
	tertiary: {...pink, ...pagerTheme},
	controls: {...dark, ...pagerTheme}
};

const siteTheme = {
	dark: themeScale.primary,
	light: themeScale.secondary,
	header: themeScale.primary,
	github: themeScale.primary,
	tiles: themeScale.primary,
	footer: themeScale.secondary,
	heart: themeScale.tertiary,
	wrapper: {...themeScale.tertiary, backgroundColor: "transparent"},
	pagers: {
		...themeScale.controls,
		pagerColor: themeScale.controls.markerColor,
		pagerColorActive: themeScale.secondary.backgroundColor
	},
	button: themeScale.controls
};

export default () => (
	<ThemeProvider theme={light}>
		<React.Fragment>
			<GlobalStyle />
			<Background dark={siteTheme.dark} light={siteTheme.light} />
			<ThemeProvider theme={siteTheme.header}>
				<Header>
					<HeaderContent>
						<Headline as="h1">
							<Logo size="1em" /> React Stickyroll
						</Headline>
						<Nav>
							<StyledLink href="https://stickyroll.github.io/react-stickyroll/doc/guide/getting-started/Readme.html?guides-enabled=true">
								Docs
							</StyledLink>
							<StyledLink href="https://github.com/stickyroll/react-stickyroll">
								Github
							</StyledLink>
						</Nav>
					</HeaderContent>
					<ThemeProvider theme={siteTheme.github}>
						<GithubCorner href="https://github.com/stickyroll/react-stickyroll" />
					</ThemeProvider>
				</Header>
			</ThemeProvider>
			<ThemeProvider theme={siteTheme.tiles}>
				<Tiles>
					<Tile>
						<Headline as="h3">What is stickyroll?</Headline>
						<Copy>
							Stickyroll provides a fullscreen view with a progression listener.
							<br />
							While the view stays in place, scrolling is translated to pages, each
							with a progressing timeline while the user scrolls. Building amazing
							parallax landing pages has never been this easy.
						</Copy>
					</Tile>
				</Tiles>
			</ThemeProvider>

			<DeviceSupport
				wrapperTheme={siteTheme.wrapper}
				pagerTheme={siteTheme.pagers}
				buttonTheme={siteTheme.button}
			/>
			<ThemeProvider theme={siteTheme.tiles}>
				<Tiles>
					<Tile>
						<Headline as="h3">A11y</Headline>
						<Copy>
							Stickyroll is fully accessible.
							<br />
							It relies on simple event listeners and therefore allows the power of
							native accessibility features.
						</Copy>
					</Tile>
					<Tile>
						<Headline as="h3">Low dependency tree</Headline>
						<Copy>
							Stickyroll only has React as a dependency. All other packages are part
							of the Stickyroll monorepo and only use React as a dependency. or none
							at all.
							<br />
							Having control over dependencies can greatly improve debugging and
							deciding where to look for help.
							<br />
							On top of the basic features Stickyroll provides some useful components
							via "Styled Components". The use of these components is fully optional.
						</Copy>
					</Tile>
					<Tile>
						<Headline as="h3">Amazing API</Headline>
						<Copy>
							Stickyroll is very easy to use and always a joy to work with.
							<br />
							It follows the best practices provided by the React team and other
							amazing developers. Rendering is either done via a render prop or a
							child function as seen in many popular libraries.
						</Copy>
					</Tile>
					<Tile>
						<Headline as="h3">Typescript</Headline>
						<Copy>
							Stickyroll is fully typed. Types come with stickyroll. There is no need
							to install them from another repository.
						</Copy>
					</Tile>
					<Tile>
						<Headline as="h3">Browser support</Headline>
						<Copy>
							We test Stickyroll in various browsers on multiple platforms to ensure a
							stable build. All modern browsers should return the same behavior. Older
							browsers might be supported by the core Components but the styled
							elements use css variables and can therefore not work in IE.
							<br />
							We do our best to support Edge as long as it has market share.
						</Copy>
					</Tile>
					<Tile>
						<Headline as="h3">Documentation</Headline>
						<Copy>
							We put a lot of work into documentation. Take a look at our Guides to
							learn about Stickyroll in small courses.
							<br />
							Most courses are small enough to do them in a few minutes and written
							for beginners.
						</Copy>
					</Tile>
					<GhostTile />
					<GhostTile />
					<GhostTile />
				</Tiles>
			</ThemeProvider>
			<ThemeProvider theme={siteTheme.footer}>
				<Footer>
					<FooterContent>
						<Copy>
							© 2018 | Coded with{" "}
							<ThemeProvider theme={siteTheme.heart}>
								<StyledHeart />
							</ThemeProvider>{" "}
							by Gregor Adams.
						</Copy>
					</FooterContent>
				</Footer>
			</ThemeProvider>
		</React.Fragment>
	</ThemeProvider>
);
