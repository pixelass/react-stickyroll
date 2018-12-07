---
displayName: "Guide: Configure Stickyroll"
description: "Modify the behavior of Stickyroll."
tags: 
 - Guide
options:
  order: 1
---

# When the default behavior is not enough.

> :timer_clock: **Time invest**: 5 Minutes ––– :woman_student: **Level**: Beginner

## What to expect

Every application can have several use cases for Stickyroll. With some basic options we can modify
the behavior of the scroll listener.
In about 5 minutes we will explore the `factor`, `throttle` and `anchors` properties.

We will …

* … Change the scroll factor
* … Use throttle to improve performance
* … Add anchors to allow deep linking to a page

## You'll need

* :computer: Terminal (MacOS: `Terminal.app` or [iTerm](https://www.iterm2.com/) | Windows: [cmder](http://cmder.net/))
* :turtle: Node.js `>=8` ([Install](https://nodejs.org/en/))
* :woman_student: The app from "Getting started"

## Using Options to modify Stickyroll

Follow these 3 simple steps to learn all the possibilities.

### 1. Change the factor

To change the amount, a user has to scroll to progress though the view can be configured.
In this example we want to double the amount so the timeline is longer.

We have add an attribute to `Stickyroll`.

```jsx
<Stickyroll page={headlines} factor={2}/>
```

Play around with this option until you have the effect that suits you best.

### 2. Add throttle

Sometimes performance is more important than smooth animations.
While Stickyroll already uses `requestAnimationFrame` internally on top of a
passive `eventListener`, performance should not be an issue. Obviously the internal logic of your
application has the most impact.

Let's pretend to have a case where we can to throttle the scroll to `250ms`.  
If all we do on scroll is trigger a className at a certain progress, then `throttle`
might do exactly what we want.

We have add an attribute to `Stickyroll`.

```jsx
<Stickyroll page={headlines} factor={2} throttle={250}/>
```

and change the className of our content container based on the progress.  
Lets add `custom-trigger--${Math.round(progress * 3)}` to add 3 classNames
while scrolling

* "custom-trigger--0"  (Start of page)
* "custom-trigger--..."
* "custom-trigger--3" (End of page)

```html
<div className={`custom-trigger--${Math.round(progress * 3)}`}/>
```

You can add these Styles to your stylesheet if you want to see some action:

> :information_source: 
> You can use [styled-components](https://www.styled-components.com/) or a similar library
> to add these styles for you.  
> To keep things simple we will just add them to the `document.head` manually

```js
Array(4).fill(Boolean).map((x, i) => `
	.custom-trigger {
		transition: background-color 0.3s ease-in-out;
	}
	.custom-trigger--${i} {
		background-color: hsl(${i * 36}, 100%, 70%);
	}
`);
```

Open the file `my-app/src/App.css` in your text editor and add this
css snippet

```css
.custom-trigger {
	transition: background-color 0.3s ease-in-out;
}
.custom-trigger--0{
	background-color:hsl(0,100%,70%);
}
.custom-trigger--1{
	background-color:hsl(120,100%,70%);
}
.custom-trigger--2{
	background-color:hsl(240,100%,70%);
}
.custom-trigger--3{
	background-color:hsl(360,100%,70%);
}
```

> :information_source: 
> Throttle will improve performance but return a stuttering `progress`.

### 3. Adding deep links

To allow linking directly to pages we can inject elements with target IDs.
While you are free to build your own Logic for this, Stickyroll already provides
a solution that nicely ties into the mechanism.

We have to add an attribute to `Stickyroll`.

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

const headlines = [
	"Hello World!",
	"Hello React!",
	"Hello Stickyroll!",
	"Let's continue with the next lesson!"
]

const App = () => {
	const className = progress =>
		`custom-trigger custom-trigger--${Math.round(progress * 3)}`
	return (
		<Stickyroll
			pages={headlines}
			factor={2}
			throttle={250
			anchors="">
			{({page, pageIndex, pages, progress}) => {
				return (
				<div
					className={className(progress)}/>
					<strong>{page}</strong> of <strong>{pages}</strong>
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

Your `App.css` should now look like this:

```css
.App {
  text-align: center;
}

.App-logo {
  animation: App-logo-spin infinite 20s linear;
  height: 40vmin;
}

.App-header {
  background-color: #282c34;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: calc(10px + 2vmin);
  color: white;
}

.App-link {
  color: #61dafb;
}

@keyframes App-logo-spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

.custom-trigger {
  transition: background-color 0.3s ease-in-out;
}
.custom-trigger--0{
  background-color:hsl(0,100%,70%);
}
.custom-trigger--1{
  background-color:hsl(120,100%,70%);
}
.custom-trigger--2{
  background-color:hsl(240,100%,70%);
}
.custom-trigger--3{
  background-color:hsl(360,100%,70%);
}
```

Enjoy!

## Next steps

These options are fully optional. It's noe time to take a step to the next level
and explore more internal features of Stickyroll.


If anything is missing or seems unclear feel free to open an issue 
in our [github repo](https://github.com/stickyroll/react-stickyroll/issues).

**Thank you**
