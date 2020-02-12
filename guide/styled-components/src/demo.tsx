import React, { Component } from "react";
import { createGlobalStyle, ThemeProvider } from "styled-components";
import {Stickyroll} from '@stickyroll/stickyroll';
import { Inner } from "@stickyroll/inner";
import { Pagers } from "@stickyroll/pagers";
import { orange } from "@stickyroll/themes";

const headlines = [
	"Hello World!",
	"Hello React!",
	"Hello Stickyroll!",
	"Let's continue with the next lesson!"
];

const GlobalStyle = createGlobalStyle`
	body {
		margin: 0;
	}
	* {
		box-sizing: border-box;
	}
`;


class App extends Component {
	componentDidMount() {
		document.body.style.margin = "0";
	}
	render() {
		return (
			<ThemeProvider theme={orange}>
				<GlobalStyle/>
				<Stickyroll pages={headlines}>
					{({ pageIndex }) => {
						return (
							<Inner>
								<Pagers/>
								<br/>
								<h1>{headlines[pageIndex]}</h1>
							</Inner>
						);
					}}
				</Stickyroll>
			</ThemeProvider>
		)
	}
}

export default App;
