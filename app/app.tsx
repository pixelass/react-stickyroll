import {hot} from "imhotep";
import React from "react";
import {Stickyroll, Listener} from "@stickyroll/stickyroll";
import {Pagers, Skip} from "@stickyroll/pagers";
import {Inner} from "@stickyroll/inner";
import {GlobalStyle} from "./style";

const rolls = ["a", "b", "c", "d"];

const Debugger = (props: any) => props.useContext ? (<Listener>
	{(context) => (
		<pre>
			<code>
				{JSON.stringify(context, null, 2)}
			</code>
		</pre>
	)}
</Listener>) : (
	<pre>
		<code>
			{JSON.stringify(props, null, 2)}
		</code>
	</pre>
);

const handlePage = (currentPage: number) => {
	console.log(`Page: ${currentPage + 1} of ${rolls.length}`)
};

const handleStart = () => {
	console.log(`Hit the start`)
};

const handleEnd = () => {
	console.log(`Hit the end`)
};

class App extends React.Component {
	public render() {
		return (
			<React.Fragment>
				<GlobalStyle/>
				<Stickyroll pages={rolls} anchors={"!/examples"} onPage={handlePage} onStart={handleStart} onEnd={handleEnd}>
					{(context) => (
						<Inner withPagers={true}>
							<Pagers useContext={true}/>
							<Debugger useContext={true}/>
							<Debugger {...context}/>
							<Skip useContext={true}/>
						</Inner>)}
				</Stickyroll>
			</React.Fragment>
		);
	}
}

export default hot(module)(App);
