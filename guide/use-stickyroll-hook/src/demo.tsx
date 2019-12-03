import {useStickyroll} from "@stickyroll/hooks";
import React from "react";
import styled, {createGlobalStyle} from "styled-components";

const headlines = [
	"Hello World!",
	"Hello React!",
	"Hello Stickyroll!",
	"Let's continue with the next lesson!"
];

const Content = styled.div`
	position: sticky;
	top: 0;
	padding: 1rem;
	height: 100vh;
	background: hsl(200, 50%, 70%);
`;

const GlobalStyle = createGlobalStyle`
	body {
		margin: 0;
	}
	* {
		box-sizing: border-box;
	}
`;

function App() {
	const [wrapper, {height, currentPage, pageCount, pageIndex, progress}] = useStickyroll({
		pages: headlines
	});

	return (
		<React.Fragment>
			<GlobalStyle />
			<div ref={wrapper} style={{height}}>
				<Content>
					<div>
						<strong>{currentPage}</strong> of <strong>{pageCount}</strong>
						<br />
						Progress: <strong>{progress}</strong>
						<h1>{headlines[pageIndex]}</h1>
					</div>
				</Content>
			</div>
		</React.Fragment>
	);
}

export default App;
