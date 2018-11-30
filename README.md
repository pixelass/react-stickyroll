# Stickyroll

Stickyroll is the successor of [react-over-scroll](https://github.com/pixelass/react-over-scroll/).

Stickyroll is maintained as a monorepo. This allows several packages to be installed from its namesoace

Status: Prototype/active development
Version: unreleased

Stickyroll translates page scroll to paging and a progress timeline.
The view uses `position: sticky` to remain in-view.

## Styled components

Stickyroll provides a styled-components version. It will remain fully optional but can help to 
get started with some basic themed components (See Pagers & Inner).

## Plugins

Stickyroll allows the creation and usage of plugins. With the help of context-aware
helpers it is easy to add a little spark to your roll.

## Examples

Simple Examples (using internal-packages as prototype)


### Example 1

**roll.tsx**

```jsx
import React from "react";
import {Frame as Stickyroll} from "@stickyroll/frame";

export default () => (
	<Stickyroll pages={5}>
		{({page, progress}) =>
			`${page}:${progress}`}
	</Stickyroll>
);
 ```

### Example 2

**style.ts**

```jsx
import {createGlobalStyle} from "styled-components";

export const GlobalStyle = createGlobalStyle`
	body {
		margin: 0;
	}
	* {
		box-sizing: border-box;
	}
`;
```
**app.tsx**

```jsx
import React from "react";
import {Frame as Stickyroll} from "@stickyroll/frame";
import {Pagers, Skip} from "@stickyroll/pagers";
import {Inner} from "@stickyroll/inner";
import {GlobalStyle} from "./style";

const myContent = ["a", "b", "c", "d"];

export default class App extends React.Component {
	public render() {
		return (
			<React.Fragment>
				<GlobalStyle/>
				<Stickyroll pages={myContent} anchors={"!/examples"} onPage={p => {console.log(p)}}>
					{(context) => (
						<Inner withPagers={true}>
							<Pagers useContext={true}/>
							<pre>
								<code>
									{JSON.stringify({...context, content: myContent[context.page]}, null, 2)}
								</code>
							</pre>
							<Skip useContext={true}/>
						</Inner>
					)}
				</Stickyroll>
			</React.Fragment>
		);
	}
}
```
