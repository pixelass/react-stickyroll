---
displayName: "Creating Plugins"
description: "Plugins can interact with your Stickyroll."
tags: 
 - Guide
options:
  order: 3
---

# It's time to learn something about navigation.

> :timer_clock: **Time invest**: 10 Minutes ––– :woman_student: **Level**: Intermediate

## What to expect

Interacting with timeline based libraries can be tricky. Learn how Stickyroll uses
hash-links to allow easy navigation.
In about 10 minutes we will build a small Skip Component that allows us to skip the entire view.

We will …

* … install an additional stickyroll package
* … create a new file with a component
* … add the component to our existing app

## You'll need

You should have finished the second or third course course.

* [Getting started](https://stickyroll.github.io/react-stickyroll/doc/guide/getting-started/Readme.html?guides-enabled=true)
* [Configure Stickyroll](https://stickyroll.github.io/react-stickyroll/doc/guide/configue-stickyroll/Readme.html?guides-enabled=true)
* [Using Decorators](https://stickyroll.github.io/react-stickyroll/doc/guide/using-decorators/Readme.html?guides-enabled=true)

## Building plugins with context and utils

Follow these 3 simple steps to build your first Plugin.

### 1. Installing Utils

While in your app folder `my-app`, run a single command:

```shell
npm install --save @stickyroll/utils
```

### 2. Creating a Plugin

Create a file `my-app/src/Skip.js` in your text editor and paste this code.
This creates a simple Link that allows users to skip the entire Content.  

> :information_source: 
> To ensure that this Plugin works with and without context, we need to add a component
> to make the switch for us.

To get access to Stickyrolls context we need to `import { Listener } from "@stickyroll/stickyroll"`.  
With the helper of Stickyrolls `scrollTo()` we can trigger a scroll to the desired section of our app.  
We will use `assert()` to check if `prefix` is a `string`, when no context is being used.

```jsx
import { Listener } from "@stickyroll/stickyroll";
import { assert, scrollTo } from "@stickyroll/utils";
import React from "react";

export const SkipBase = props => {
	const handleClick = e => {
		e.preventDefault();
		scrollTo(`${props.prefix}/skip`, e.target, {
			noFocus: true, 
			noHash: true
		});
	};

	return (
		<a
			href={`#${props.prefix}/skip`}
			onClick={handleClick}>
			Skip
		</a>
	);
};

const Skip = props => {
	if (props.useContext) {
		return (
			<Listener>
				{context => (
					<SkipBase prefix={context.anchors} />
				)}
			</Listener>
		);
	}
	assert(props.prefix, "string");
	return <SkipBase prefix={props.prefix} />;
};

export default Skip;
```

We can now use this Plugin with or without context

> :information_source: 
> Context is only available when using the child function.
> We will talk about the render property in a later course.

### 3. Using the plugin

We can now use the plugin to allow users to skip the entire view.

We need to do a few steps to use our component. 

Import our plugin

```jsx
import Skip from "./Skip";
```
 
and add this new snippet

```html
<Skip useContext={true}/>
```

> :information_source:
> If you already added anchors in "Configure Stickyroll", you can skip this part.

Now we have to add an attribute to `Stickyroll`. 

```jsx
<Stickyroll page={headlines} anchors=""/>
```

Setting `anchors` injects elements with corresponding IDs to allow hash navigation.

**Examples:**

* `""` => "example.com#1"
* `"examples"` => "example.com#examples/1"
* `"!"` => "example.com#!/1"
* `"!/examples"` => "example.com#!/examples/1"

Your `App.js` should now look like this:

```jsx
import React from 'react';
import {Stickyroll} from '@stickyroll/stickyroll';
import PageCounter from "./PageCounter";
import ProgressCounter from "./ProgressCounter";
import Skip from "./Skip";

const headlines = [
	"Hello World!",
	"Hello React!",
	"Hello Stickyroll!",
	"Let's continue with the next lesson!"
]

const App = () => {
	return (
		<Stickyroll pages={headlines} anchors="">
			{({pageIndex}) => {
				return (
				<div>
					<PageCounter/>
					<br/>
					<ProgressCounter/>
					<h1>{headlines[pageIndex]}</h1>
					<Skip useContext={true}/>
				</div>
				);
			}}
		</Stickyroll>
	)
};

export default App;
```

Enjoy!

## Next steps

You can now repeat the same process with for all other pages to allow users to jump 
directly to each page. The anchor targets are already set up. Using the same `scrollTo` function,
you can build complex navigation components.

We already built a pager component with styled-components. We will look at the cosmetic
components in the next step.

* [Styled Components](https://stickyroll.github.io/react-stickyroll/doc/guide/styled-components/Readme.html?guides-enabled=true)


You should now be able to do this on your own.

If anything is missing or seems unclear feel free to open an issue 
in our [github repo](https://github.com/stickyroll/react-stickyroll/issues).

**Thank you**
