import {hot} from "imhotep";
import styled, {ThemeProvider} from "styled-components";
import React from "react";
import {Stickyroll, Listener} from "@stickyroll/stickyroll";
import {
	dark,
	indigo,
	yellow,
	deepOrange,
	teal,
	pink,
	blue,
	green,
	light,
	red,
	deepPurple,
	cyan,
	lime,
	purple,
	orange,
	amber
} from "@stickyroll/themes";
import {Pagers, Skip} from "@stickyroll/pagers";
import {Inner, Content} from "@stickyroll/inner";
import Pagenumber from "./pagenumber";
import {GlobalStyle} from "./style";
import Markus from "./markus";
import {GithubCorner} from "./github-corner";
import {Copy, Header, Headline, Title} from "./elements";

const Card = styled.section`
	max-width: 60rem;
	margin: 2rem auto;
	padding: 1rem;
	background: white;
	border-radius: 2px;
	color: black;
	box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
`;

const themeSwitcher = [
	dark,
	light,
	blue,
	teal,
	cyan,
	green,
	lime,
	yellow,
	amber,
	orange,
	deepOrange,
	red,
	pink,
	purple,
	deepPurple,
	indigo
];

const themeNames = [
	"dark",
	"light",
	"blue",
	"teal",
	"cyan",
	"green",
	"lime",
	"yellow",
	"amber",
	"orange",
	"deepOrange",
	"red",
	"pink",
	"purple",
	"deepPurple",
	"indigo"
];

const rolls = themeSwitcher.map((x, i) => ({children}) => (
	<React.Fragment>
		<Headline as={"h2"}>
			{children} {themeNames[i]}
		</Headline>
	</React.Fragment>
));

const Debugger = (props: any) =>
	props.useContext ? (
		<Listener>
			{context => (
				<pre>
					<code>{JSON.stringify(context, null, 2)}</code>
				</pre>
			)}
		</Listener>
	) : (
		<pre>
			<code>{JSON.stringify(props, null, 2)}</code>
		</pre>
	);

class App extends React.Component {
	public render() {
		return (
			<React.Fragment>
				<GlobalStyle />
				<Header>
					<Title>Sickyroll</Title>
					<GithubCorner />
				</Header>
				<Card>
					<Headline as={"h2"}>Using 3rd party libraries</Headline>
					<p>
						This example uses the animation from{" "}
						<a href="https://codepen.io/airnan/pen/JmOqbN">airnan@codepen</a> via{" "}
						<a href="https://github.com/airbnb/lottie-web">lottie-web</a>
					</p>
					<p>
						The animation was made by{" "}
						<a href="https://twitter.com/MotionMarkus">Markus Magnusson</a>.
					</p>
				</Card>
				<Stickyroll pages={4} factor={2} anchors={"!/lottie-web"}>
					{() => (
						<ThemeProvider theme={dark}>
							<Inner withPagers={"left"}>
								<Pagers useContext={true} />
								<Markus />
								<Skip useContext={true} />
							</Inner>
						</ThemeProvider>
					)}
				</Stickyroll>
				<Card>
					<Headline as={"h2"}>Themes</Headline>
					<Copy>The next examples use themes and styled-components</Copy>
					<Copy>Themes can be combined or inherited to nested components.</Copy>
				</Card>
				<Stickyroll pages={Math.ceil(rolls.length / 3)} anchors={"!/themes"}>
					{context => {
						const {anchors, page, pageIndex, pages, progress} = context;
						const themeA = themeSwitcher[pageIndex];
						const pageIndexB = (pageIndex + Math.floor(pages / 3)) % pages;
						const pageIndexC = (pageIndex + Math.floor((pages / 3) * 2)) % pages;
						const themeB = themeSwitcher[pageIndexB];
						const themeC = themeSwitcher[pageIndexC];
						return (
							<ThemeProvider theme={themeA}>
								<Inner withPagers={"left"}>
									<ThemeProvider theme={themeC}>
										<Pagers useContext={true} />
									</ThemeProvider>
									<ThemeProvider theme={themeB}>
										<Content>
											<Pagenumber />
											<Debugger {...context} />
											<Headline as="h4">
												Deep link: #{anchors}/{page + Math.floor(progress)}
											</Headline>
											{React.createElement(rolls[pageIndex], null, "Inner:")}
											{React.createElement(
												rolls[pageIndexC],
												null,
												"Pagers:"
											)}
											{React.createElement(
												rolls[pageIndexB],
												null,
												"Content:"
											)}
										</Content>
									</ThemeProvider>
									<Skip useContext={true} />
								</Inner>
							</ThemeProvider>
						);
					}}
				</Stickyroll>
			</React.Fragment>
		);
	}
}

export default hot(module)(App);
