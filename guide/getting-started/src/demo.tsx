import React, { Component } from "react";
import { createGlobalStyle } from "styled-components";
import {Stickyroll} from '@stickyroll/stickyroll';

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
			<React.Fragment>
				<GlobalStyle/>
				<Stickyroll pages={headlines}>
					{({ page, pageIndex, pages, progress }) => {
						return (
							<div>
								<strong>{page}</strong> of <strong>{pages}</strong>
								<br/>
								Progress: <strong>{progress}</strong>
								<h1>{headlines[pageIndex]}</h1>
							</div>
						);
					}}
				</Stickyroll>
			</React.Fragment>
		)
	}
}

export default App;
