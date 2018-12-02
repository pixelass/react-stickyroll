# Stickyroll

### [DEMO](https://stickyroll.netlify.com/) | [DOCUMENTATION](https://stickyroll.github.io/react-stickyroll/)

[![npm](https://img.shields.io/npm/v/@stickyroll/stickyroll.svg?style=for-the-badge)](https://www.npmjs.com/org/stickyroll)
[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg?style=for-the-badge)](https://raw.githubusercontent.com/sinnerschrader/dekk/master/LICENSE)

[![Travis branch](https://img.shields.io/travis/stickyroll/react-stickyroll/master.svg?style=for-the-badge)](https://travis-ci.org/stickyroll/react-stickyroll)

[![David](https://img.shields.io/david/dev/stickyroll/react-stickyroll.svg?style=for-the-badge)](https://github.com/stickyroll/react-stickyroll)

<!-- toc -->

-   [Intro](#intro)
-   [Values](#values)
-   [Render prop vs children](#render-prop-vs-children)
-   [Event listeners](#event-listeners)
-   [Decorators (context based)](#decorators-context-based)
-   [Plugins](#plugins)
-   [Styled components](#styled-components)
    -   [Available components](#available-components)
-   [Examples](#examples)
    -   [Example 1](#example-1)
    -   [Example 2](#example-2)
-   [Development](#development)

<!-- tocstop -->

## Intro

Stickyroll is the successor of [react-over-scroll](https://github.com/pixelass/react-over-scroll/).

This project is maintained as a monorepo via [lerna](https://github.com/lerna/lerna).

## Values

Stickyroll translates page scroll to paging and a progress timeline.
The view uses `position: sticky` to remain in-view.

**Some reasons why you should give it a try**

-   Multiple instances on one page.
-   Perfect transition from docked to undocked states
-   No scroll-jacking
-   Fully Accessible
-   Allows deep links
-   Allows skipping the entire content

**Use cases**

Stickyroll offers some very unique features to build views for different use cases.

-   fixed position Parallax views (e.g. for product landing pages)
    -    [Parallax Example](https://stickyroll.netlify.com/#!/device-support/1)
-   scrollable animation scenes (e.g. using [Bodymovin](https://github.com/airbnb/lottie-web))
    -    [Bodymovin Example](https://stickyroll.netlify.com/#!/bodymovin/1)

**In the wild**

If you are using stickyroll on your web page you can add it here via a pull request or by creating an issue.

1. [Stickyroll](https://stickyroll.netlify.com/)

## Render prop vs children

Stickyroll accepts the same function as a render property or child function.  
`props.children` gives access to context based plugins and decorators
`props.render` is the lightweight version without context.

## Event listeners

Stickyroll has 3 very basic listeners.

-   `onStart(): void`: fired when the start has been reached (undocked)
-   `onEnd(): void`: fired when the end has been reached (undocked)
-   `onPage(currentPage: number): void`: fired every time a page changes. `currentPage` has a 0 based index. (docked)

More complex listeners can be implemented as Plugins using `@stickyroll/decorators` or `@stickyroll/context`
(`{Listener}` is also available from `@stickyroll/stickyroll`)

## Decorators (context based)

Stickyroll provides a set of decorators to allow injecting properties on-the-fly.

-   `@page`: injects `page: number` and `pages: number`
-   `@progress`: injects `progress: number`

**Example: page numbers**

```js
import {page} from "@stickyroll/decorators";
import React from "react";

@page
export default class Pagenumber extends React.Component {
	render() {
		return `${this.props.page + 1} of ${this.props.pages}`;
	}
}
```

## Plugins

Stickyroll allows the creation and usage of plugins. With the help of context-aware
helpers it is easy to add a little spark to your roll.

Looking at `Pagers` is a good start to understand the plugin mechanism.

## Styled components

Stickyroll provides styled components. It will remain fully optional to use styled-components since
the core is build purely on [React](https://www.npmjs.com/package/react) and [lodash.throttle](https://www.npmjs.com/package/lodash.throttle)

### Available components

-   `@stickyroll/pagers`: Paging components to navigate to pages
-   `@stickyroll/inner`: Content components to help with layout.
-   `@stickyroll/themes`: A set of themes to use with styled-components

## Examples

### Example 1

**roll.tsx**

```jsx
import React from "react";
import {Stickyroll} from "@stickyroll/stickyroll";

export default () => (
	<Stickyroll pages={5}>{({page, progress}) => `${page}:${progress}`}</Stickyroll>
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
import {Stickyroll} from "@stickyroll/stickyroll";
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
						<Inner withPagers="left">
							<Pagers useContext={true} position="left"/>
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

## Development

To help develop Stickyroll follow these steps.

```bash
git clone git@github.com:stickyroll/react-stickyroll.git
cd react-stickyroll
yarn
```

For fast development use the `dev` script.  
This will start a webpack dev-server on `port:3000` and watch all packages.

**Dev server (hot)** (watches packages)

```bash
yarn dev
```

**Build (production)**

```bash
yarn build
```

**Build packages**

```bash
yarn rollup
```

**Watch packages**

```bash
yarn rollup:watch
```

copyright © 2018 [Gregor Adams](https://github.com/pixelass)
