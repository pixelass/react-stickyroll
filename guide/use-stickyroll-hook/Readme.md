---
displayName: "Stickyroll hook"
description: "Stickyroll with the power of react hooks"
tags:
    - Guide
options:
    order: 5
---

# Simple and lightweight with react hooks.

> :timer_clock: **Time invest**: 10 Minutes ––– :woman_student: **Level**: Intermediate

## What to expect

When React introduced hooks many libraries were able to simplify their usage by providing hooks.
We decided to do the same and want to show how to use the stickyroll hook.

We will …

-   … install an additional stickyroll package
-   … Configure the hook
-   … Use the hook instead of the component

## You'll need

-   [Getting started](https://stickyroll.github.io/react-stickyroll/doc/guide/getting-started/Readme.html?guides-enabled=true)

## Using Hooks with Stickyroll

Follow these 3 simple steps to learn how to use hooks.

### 1. Installing Hooks

While in your app folder `my-app`, run a single command:

```shell
npm install --save @stickyroll/hooks
```

### 2. Configure the hook

The hook takes the same props as our previously used component.  
It returns an array with a `refObject` and some properties.

Since we don't have any visual component we need to provide some custom styles.
The wrapper needs to be assigned a height, which we can grab from the properties,

```jsx
const [wrapper, {height, ...context}] = useStickyroll({
	pages: headlines
});
return <div ref={wrapper} style={{height}} />;
```

### 3. Make use of the hook

To use the hook we have to remove the Stickyroll component and add the hook instead.
The property names are slightly different to the component
(which will have the same names in the next major release).

-   `page` => `currentPage`
-   `pages` => `pageCount`

```js
const [wrapper, {height, currentPage, pageCount, pageIndex, progress}] = useStickyroll({
	pages: headlines
});
```

Remember to make the content element sticky, otherwise it will simply scroll away.  
Open the file `my-app/src/App.css` in your text editor and add this
css snippet

```css
.stickyroll-content {
	position: sticky;
	top: 0;
	height: 100vh;
}
```

```jsx
const App = () => {
	const [wrapper, {height, currentPage, pageCount, pageIndex, progress}] = useStickyroll({
		pages: headlines
	});
	return (
		<div ref={wrapper} style={{height}}>
			<div className="stickyroll-content">
				<strong>{currentPage}</strong> of <strong>{pageCount}</strong>
				<br />
				Progress: <strong>{progress}</strong>
				<h1>{headlines[pageIndex]}</h1>
			</div>
		</div>
	);
};
```

Your `App.js` should now look like this:

```jsx
import React from "react";
import {Stickyroll} from "@stickyroll/stickyroll";
import "./App.css";

const headlines = [
	"Hello World!",
	"Hello React!",
	"Hello Stickyroll!",
	"Let's continue with the next lesson!"
];

const App = () => {
	const [wrapper, {height, currentPage, pageCount, pageIndex, progress}] = useStickyroll({
		pages: headlines
	});
	return (
		<div ref={wrapper} style={{height}}>
			<div className="stickyroll-content">
				<strong>{currentPage}</strong> of <strong>{pageCount}</strong>
				<br />
				Progress: <strong>{progress}</strong>
				<h1>{headlines[pageIndex]}</h1>
			</div>
		</div>
	);
};

export default App;
```


Your `App.css` should now look like this:

```css
body {
  margin: 0;
}
* {
  box-sizing: border-box;
}
.stickyroll-content {
	position: sticky;
	top: 0;
	height: 100vh;
}
```

Enjoy!

## Next steps

Hooks are still very new and limited. Wait for more to come.

If anything is missing or seems unclear feel free to open an issue
in our [github repo](https://github.com/stickyroll/react-stickyroll/issues).

**Thank you**
