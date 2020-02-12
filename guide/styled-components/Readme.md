---
displayName: "Styled Components"
description: "Use Stickyroll with styled components."
tags: 
 - Guide
options:
  order: 4
---

# Integrate styled components into your stickyroll

> :timer_clock: **Time invest**: 5 Minutes ––– :woman_student: **Level**: Intermediate

## What to expect

Sometimes it is hard to build additional features into existing libraries. Stickyroll
provides various options to make this very easy.
In about 5 minutes we will build a small PageCounter that displays the current page.

We will …

* … install an additional stickyroll package
* … create a new file with a component
* … add the component to our existing app

## You'll need

You should have finished at least the first course.

* [Getting started](https://stickyroll.github.io/react-stickyroll/doc/guide/getting-started/Readme.html?guides-enabled=true)
* [Configure Stickyroll](https://stickyroll.github.io/react-stickyroll/doc/guide/configure-stickyroll/Readme.html?guides-enabled=true)

## Building plugins with decorators

Follow these 3 simple steps to build your first Plugin.

### 1. Installing Decorators

While in your app folder `my-app`, run a single command:

```shell
npm install --save @stickyroll/decorators
```

### 2. Creating a Plugin

Create a file `my-app/src/PageCounter.js` in your text editor and paste this code.

```jsx
import { page } from "@stickyroll/decorators";
import React from "react";

class PageCounter extends React.Component {
	render() {
		return (
			<React.Fragment>
				<strong>{this.props.page}</strong>{" "}
				of{" "}
				<strong>{this.props.pages}</strong>
			</React.Fragment>
		);
	}
}

export default page(PageCounter);
```

### 3. Using the plugin

We can now use the plugin to replace our previously local implementation.

All we need to do is replace the following section 

```html
<strong>{page}</strong> of <strong>{pages}</strong>
```

with this new Snippet

```html
<PageCounter/>
```

and import our plugin

```jsx
import PageCounter from "./PageCounter";
```

Your `App.js` should now look like this:

```jsx
import React from 'react';
import {Stickyroll} from '@stickyroll/stickyroll';
import PageCounter from "./PageCounter";

const headlines = [
	"Hello World!",
	"Hello React!",
	"Hello Stickyroll!",
	"Let's continue with the next lesson!"
]

const App = () => {
	return (
		<Stickyroll pages={headlines}>
			{({pageIndex, progress}) => {
				return (
				<div>
					<PageCounter/>
					<br/>
					Progress: <strong>{progress}</strong>
					<h1>{headlines[pageIndex]}</h1>
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

You can now repeat the same process with `{progress} from "@stickyroll/decorators"`.

In this case we want to replace 

```html
Progress: <strong>{progress}</strong>
```

with this new snippet

```html
<ProgressCounter/>
```

You should now be able to do this on your own.

You can now continue with this course.

* [Creating Plugins](https://stickyroll.github.io/react-stickyroll/doc/guide/creating-plugins/Readme.html?guides-enabled=true)


If anything is missing or seems unclear feel free to open an issue 
in our [github repo](https://github.com/stickyroll/react-stickyroll/issues).

**Thank you**
