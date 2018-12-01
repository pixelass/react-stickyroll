import {hot} from "imhotep";
import styled, {ThemeProvider} from "styled-components";
import React from "react";
import {Stickyroll, Listener} from "@stickyroll/stickyroll";
import {dark, indigo, yellow, deepOrange} from "@stickyroll/themes";
import {Pagers, Skip} from "@stickyroll/pagers";
import {Inner, Content} from "@stickyroll/inner";
import Pagenumber from "./pagenumber";
import Progressbar from "./progresbar";
import {GlobalStyle} from "./style";
import Markus from "./markus";

const Card = styled.section`
	max-width: 60rem;
	margin: 2rem auto;
	padding: 1rem;
	background: white;
	border-radius: 2px;
	color: black;
	box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
`;

const rolls = [1, 2, 3];

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

const handlePage = (currentPage: number) => {
	console.log(`Page: ${currentPage + 1} of ${rolls.length}`);
};

const handleStart = () => {
	console.log(`Hit the start`);
};

const handleEnd = () => {
	console.log(`Hit the end`);
};

class App extends React.Component {
	public render() {
		return (
			<React.Fragment>
				<GlobalStyle />
				<Stickyroll
					pages={2}
					onPage={handlePage}
					onStart={handleStart}
					onEnd={handleEnd}>
					{() => (
						<Inner>
							<Content>
								<Debugger useContext={true} />
								<Progressbar />
								<br />
								<Pagenumber />
							</Content>
						</Inner>
					)}
				</Stickyroll>
				<Card>
					<h2>Using Bodymovin (a.k.a. lottie)</h2>
					<p>
						The next example uses the animation from{" "}
						<a href="https://codepen.io/airnan/pen/MPmQQB">airnan@codepen</a> via{" "}
						<a href="https://github.com/airbnb/lottie-web">lottie-web</a>
					</p>
					<p>
						The animation was made by{" "}
						<a href="https://twitter.com/MotionMarkus">Markus Magnusson</a>. You can
						support him on
						<a href="https://www.patreon.com/motionmarkus">patreon</a>
					</p>
				</Card>
				<Stickyroll pages={1} factor={4} anchors={"!/bodymovin"}>
					{() => (
						<React.Fragment>
							<Markus />
							<Skip useContext={true} />
						</React.Fragment>
					)}
				</Stickyroll>
				<Card>
					<h2>Themes</h2>
					<p>
						The next examples use themes and styled-components
					</p>
					<p>
						Themes can be combined or inherited to nested components.
					</p>
				</Card>
				<Stickyroll pages={rolls} anchors={"!/dark"}>
					{context => (
						<ThemeProvider theme={dark}>
							<Inner withPagers={"left"}>
								<Pagers useContext={true} />
								<Content>
									<Pagenumber />
									<br />
									{context.progress}
								</Content>
								<Skip useContext={true} />
							</Inner>
						</ThemeProvider>
					)}
				</Stickyroll>
				<Stickyroll pages={rolls} anchors={"!/indigo"}>
					{context => (
						<ThemeProvider theme={indigo}>
							<Inner withPagers={"right"}>
								<Pagers useContext={true} position={"right"} />
								<Content>
									<Pagenumber />
									<br />
									{context.progress}
								</Content>
								<Skip useContext={true} />
							</Inner>
						</ThemeProvider>
					)}
				</Stickyroll>
				<Stickyroll pages={rolls} anchors={"!/mixed"}>
					{context => (
						<ThemeProvider theme={yellow}>
							<Inner withPagers={"right"}>
								<ThemeProvider theme={deepOrange}>
									<Pagers useContext={true} position={"right"} />
								</ThemeProvider>
								<ThemeProvider theme={dark}>
									<Content>
										<Pagenumber />
										<br />
										{context.progress}
									</Content>
								</ThemeProvider>
								<Skip useContext={true} />
							</Inner>
						</ThemeProvider>
					)}
				</Stickyroll>
			</React.Fragment>
		);
	}
}

export default hot(module)(App);
