import {hot} from "imhotep";
import React from "react";
import {Frame as Stickyroll} from "@stickyroll/frame";
import {Pagers, Skip} from "@stickyroll/pagers";
import {Inner} from "@stickyroll/inner";
import {GlobalStyle} from "./style";

const pages = ["a", "b", "c", "d"];

class App extends React.Component {
	public render() {
		return (
			<React.Fragment>
				<GlobalStyle/>
				<Stickyroll pages={pages} anchors={"!/examples"} onPage={p => {console.log(p)}}>
					{(context) => (
						<Inner withPagers={true}>
							<Pagers useContext={true} showLabels={false}/>
							<pre style={{fontSize: "3rem"}}>
								<code>
									{JSON.stringify({...context, content: pages[context.page]}, null, 2)}
								</code>
							</pre>
							<Skip useContext={true}/>
						</Inner>)}
				</Stickyroll>
			</React.Fragment>
		);
	}
}

export default hot(module)(App);
