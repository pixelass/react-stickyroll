# Stickyroll

```bash
yarn add @stickyroll/stickyroll
```

## Codesandbox

-   [Getting started](https://codesandbox.io/s/m1wxp21rx)

## Example 1

```jsx
import React from "react";
import {Stickyroll} from "@stickyroll/stickyroll";

export default () => (
	<Stickyroll pages={5}>{({page, progress}) => `${page}:${progress}`}</Stickyroll>
);
```

## Example 2

```jsx
import React from "react";
import {Stickyroll} from "@stickyroll/stickyroll";

const myContent = ["a", "b", "c", "d"];

function handlePage(pageIndex) {
	console.log(pageIndex);
};

export default class App extends React.Component {
	public render() {
		return (
			<React.Fragment>
				<GlobalStyle/>
				<Stickyroll
					pages={myContent}
					anchors={"!/examples"}
					onPage={handlePage}>
					{(context) => (
						<pre>
							<code>
								{JSON.stringify({
									...context,
									content: myContent[context.pageIndex]
								}, null, 2)}
							</code>
						</pre>
					)}
				</Stickyroll>
			</React.Fragment>
		);
	}
}
```
