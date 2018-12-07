import React, { Component } from "react";
import { css, createGlobalStyle } from "styled-components";
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
	${Array(4).fill(Boolean).map((x, i) => css`
		.custom-trigger--${i} {
			transition: background-color 0.3s ease-in-out;
			background-color: hsl(${(props: {steps: number}) => 360 / props.steps * i}, 100%, 70%);
		}
	`)}
`;


class App extends Component {
	componentDidMount() {
		document.body.style.margin = "0";
	}
	render() {
		const steps = 3;
		const className = progress =>
			`custom-trigger--${Math.round(progress * steps)}`;
		return (
			<React.Fragment>
				<GlobalStyle steps={steps}/>
				<Stickyroll pages={headlines} factor={2} throttle={250} anchors="">
					{({ page, pageIndex, pages, progress }) => {
						return (
							<div className={className(progress)}>
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
