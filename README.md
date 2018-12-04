# Stickyroll

## It's about time

#### [DEMO](https://stickyroll.netlify.com/) | [DOCUMENTATION](https://stickyroll.github.io/react-stickyroll/)

[![npm](https://img.shields.io/npm/v/@stickyroll/stickyroll.svg?style=for-the-badge)](https://www.npmjs.com/org/stickyroll)
[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg?style=for-the-badge)](https://raw.githubusercontent.com/sinnerschrader/dekk/master/LICENSE)
[![Travis branch](https://img.shields.io/travis/stickyroll/react-stickyroll/master.svg?style=for-the-badge&logo=travis)](https://travis-ci.org/stickyroll/react-stickyroll)

<!--
[![node](https://img.shields.io/node/v/@stickyroll/stickyroll.svg?style=for-the-badge)](https://nodejs.org)

[![Browserstack](https://img.shields.io/badge/browserstack-device_tests-brightgreen.svg?style=for-the-badge)](https://www.browserstack.com)
[![Karma](https://img.shields.io/badge/karma-browser_tests-blue.svg?style=for-the-badge)](https://github.com/karma-runner/karma)
[![Ava](https://img.shields.io/badge/ava-node_tests-4b4b77.svg?style=for-the-badge)](https://github.com/avajs/ava)

[![Lerna](https://img.shields.io/badge/lerna-0.1.1-cd00ff.svg?style=for-the-badge)](https://github.com/avajs/ava)
-->

[![David](https://img.shields.io/david/stickyroll/react-stickyroll.svg?style=for-the-badge)](https://github.com/stickyroll/react-stickyroll)
[![David](https://img.shields.io/david/dev/stickyroll/react-stickyroll.svg?style=for-the-badge)](https://github.com/stickyroll/react-stickyroll)

##### Powered by

<!-- [![Webstorm](https://img.shields.io/badge/Webstorm-open_source-06e0e2.svg?style=for-the-badge&logo=webstorm)](https://www.jetbrains.com/buy/opensource/) -->

[![Browserstack](https://img.shields.io/badge/browserstack-open_source-132434.svg?style=for-the-badge)](https://www.browserstack.com/open-source)

<!-- toc -->

-   [Intro](#intro)
-   [Values](#values)
-   [Browser matrix](#browser-matrix)
-   [Render prop vs children](#render-prop-vs-children)
-   [Event listeners](#event-listeners)
-   [Decorators (context based)](#decorators-context-based)
-   [Plugins](#plugins)
-   [Styled components](#styled-components)
    -   [Available components](#available-components)
-   [Examples](#examples)
    -   [Codesandboxes](#codesandboxes)
    -   [Example 1](#example-1)
    -   [Example 2](#example-2)
-   [Development](#development)

<!-- tocstop -->

## Intro

Stickyroll is the successor of [react-over-scroll](https://github.com/pixelass/react-over-scroll/).

## Values

Stickyroll translates page scroll to paging and a progress timeline.
The view uses `position: sticky` to remain in-view.

**Some reasons why you should give it a try**

-   Tested in all modern browsers.
-   Host multiple instances on one page.
-   Smooth transitions from docked to undocked states
-   No scroll-jacking
-   Fully Accessible
-   Allows deep links
-   Allows skipping the entire content

**Use cases**

Stickyroll offers some very unique features to build views for different use cases. Here are some basic examples.

-   fixed position Parallax views (e.g. for product landing pages)
    -   [Parallax Example](https://stickyroll.netlify.com/#!/device-support/1)  
        ![Parallax Example](./doc/assets/stickyroll_2.gif)
-   scrollable animation scenes (e.g. using [lottie-web](https://github.com/airbnb/lottie-web))
    -   [Lottie Example](https://stickyroll.netlify.com/#!/bodymovin/1)  
        ![Parallax Example](./doc/assets/stickyroll.gif)

**In the wild**

If you are using stickyroll on your web page you can add it here via a pull request or by creating an issue.

1. [Stickyroll](https://stickyroll.netlify.com/)

## Browser matrix

Stickyroll uses modern browser features and is therefore limited to these browsers. (Other browsers might work but are not being tested)

-   **Chrome**: last 2 versions
-   **Firefox**: last 2 versions
-   **Safari**: last 2 versions
-   **iOS**: last 2 versions
-   **Opera**: last 2 versions
-   **Edge**: last 2 versions

Stickyroll is tested in various environments.
With the help of [Browserstack](https://www.browserstack.com) and [Karma](https://github.com/karma-runner/karma)
tests are run on actual machines.

### Browserstack remote tests:

Thanks to the Browserstack [open source offer](<(https://www.browserstack.com/open-source)>)
we are able to test multiple browsers and platforms to ensure the best stability.

-   windows 10
    -   chrome 68.0
    -   firefox 61.0
    -   edge 17
-   os x High Sierra
    -   chrome 68.0
    -   firefox 61.0
    -   safari 11.1

## Render prop vs children

Stickyroll accepts the same function as a render property or child function.

-   `props.children` gives access to context based plugins and decorators
-   `props.render` is the lightweight version without context.

## Event listeners

Stickyroll has 3 very basic listeners. They all allow to be synchronous or asynchronous

-   `onStart(): void | Promise<void>`: fired when the start has been reached (undocked)
-   `onEnd(): void | Promise<void>`: fired when the end has been reached (undocked)
-   `onPage(currentPage: number): void | Promise<void>`: fired every time a page changes. `currentPage` has a 0 based index. (docked)

More complex listeners can be implemented as Plugins using `@stickyroll/decorators` or `@stickyroll/context`
(`{Listener}` is also available from `@stickyroll/stickyroll`)

## Decorators (context based)

Stickyroll provides a set of decorators to allow injecting properties on-the-fly.

-   `@page`: injects `page: number`, `pageIndex: number` and `pages: number`
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

### Codesandboxes

-   [Getting started](https://codesandbox.io/s/m1wxp21rx)
-   [Using Components and themes](https://codesandbox.io/s/843o0630z2)

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
									{JSON.stringify({
										...context,
										content: myContent[context.pageIndex]
									}, null, 2)}
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

**Testing**

Basic tests:

```bash
yarn test
```

Karma runner:

```bash
yarn karma # [--local [--watch] | --remote]  [--chrome --firefox --safari --edge]
```

copyright © 2018 [Gregor Adams](https://github.com/pixelass)
