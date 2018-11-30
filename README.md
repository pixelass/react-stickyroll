# Stickyroll

### [DEMO](https://stickyroll.netlify.com/) | [DOCUMENTATION](https://stickyroll.github.io/react-stickyroll/)

[![npm](https://img.shields.io/npm/v/@stickyroll/react-stickyroll.svg?style=for-the-badge)](https://www.npmjs.com/org/stickyroll)
[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg?style=for-the-badge)](https://raw.githubusercontent.com/sinnerschrader/dekk/master/LICENSE)

[![Travis branch](https://img.shields.io/travis/stickyroll/react-stickyroll/master.svg?style=for-the-badge)](https://travis-ci.org/stickyroll/react-stickyroll)

[![David](https://img.shields.io/david/stickyroll/react-stickyroll.svg?style=for-the-badge)](https://github.com/stickyroll/react-stickyroll)
[![David](https://img.shields.io/david/dev/stickyroll/react-stickyroll.svg?style=for-the-badge)](https://github.com/stickyroll/react-stickyroll)
[![David](https://img.shields.io/david/optional/stickyroll/react-stickyroll.svg?style=for-the-badge)](https://github.com/stickyroll/react-stickyroll)
[![David](https://img.shields.io/david/peer/stickyroll/react-stickyroll.svg?style=for-the-badge)](https://github.com/stickyroll/react-stickyroll)



Stickyroll is the successor of [react-over-scroll](https://github.com/pixelass/react-over-scroll/).

This project is maintained as a monorepo via [lerna](https://github.com/lerna/lerna).

**Status**: _active development_  
**Version**: _unreleased_

Stickyroll translates page scroll to paging and a progress timeline.
The view uses `position: sticky` to remain in-view.

## Styled components

Stickyroll provides styled components. It will remain fully optional to use styled-components but can help to 
get started with some basic themes and plugins (See Pagers & Inner).

## Plugins

Stickyroll allows the creation and usage of plugins. With the help of context-aware
helpers it is easy to add a little spark to your roll.

Looking at `Pagers` is a good start to understand the plugin mechanism.  

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
