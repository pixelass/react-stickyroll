import {hot} from "imhotep";
import {ThemeProvider} from "styled-components";
import React from "react";
import {Stickyroll, Listener} from "@stickyroll/stickyroll";
import {dark, indigo, yellow, deepOrange} from "@stickyroll/themes";
import {Pagers, Skip} from "@stickyroll/pagers";
import {Inner, Content} from "@stickyroll/inner";
import Pagenumber from "./pagenumber";
import Progressbar from "./progresbar";
import {GlobalStyle} from "./style";

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
					pages={rolls}
					anchors={"!/default"}
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
							<Skip useContext={true} />
						</Inner>
					)}
				</Stickyroll>
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
