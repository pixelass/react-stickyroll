import React from "react";
import styled, {createGlobalStyle, ThemeProvider} from "styled-components";
import * as themes from "@stickyroll/themes";
import {Content, Inner} from "./";

/* stylelint-disable */
const GlobalStyle = createGlobalStyle`
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
/* stylelint-enable */
const Box = styled.div`
	display: inline-flex;
	height: 7rem;
	width: 14rem;
	position: relative;
	margin: 0.5rem;
`;

const Headline = styled.h2`
	font-weight: lighter;
	padding: 1rem 0.5rem;
	margin: 0.5rem 0;
	background: white;
`;

const Demo = () => (
	<React.Fragment>
		<Headline>Inner</Headline>
		{Object.entries(themes).map(([name, theme]) => (
			<Box key={name}>
				<ThemeProvider theme={theme}>
					<Inner>{name}</Inner>
				</ThemeProvider>
			</Box>
		))}
		<Headline>Content</Headline>
		{Object.entries(themes).map(([name, theme]) => (
			<Box key={name}>
				<ThemeProvider theme={theme}>
					<Content>{name}</Content>
				</ThemeProvider>
			</Box>
		))}
		<Headline>Inner with Content</Headline>
		{Object.entries(themes).map(([name, theme]) => (
			<Box key={name}>
				<ThemeProvider theme={theme}>
					<Inner>
						<Content>{name}</Content>
					</Inner>
				</ThemeProvider>
			</Box>
		))}
		<Headline>Combining themes</Headline>
		{Object.entries(themes).map(([name, theme], i) => {
			const contentThemes = Object.entries(themes)
				.map(([name, theme]) => ({name, theme}))
				.reverse();
			return (
				<Box key={name}>
					<ThemeProvider theme={theme}>
						<Inner>
							<ThemeProvider theme={contentThemes[i].theme}>
								<Content>
									{name} + {contentThemes[i].name}
								</Content>
							</ThemeProvider>
						</Inner>
					</ThemeProvider>
				</Box>
			);
		})}
	</React.Fragment>
);

export default () => (
	<React.Fragment>
		<GlobalStyle />
		<Demo />
	</React.Fragment>
);
