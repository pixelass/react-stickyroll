---
displayName: "Getting Started"
description: "Stickyroll is easy to use and very intuitive."
tags: 
 - Guide
options:
  order: 0
---

# Your kickstart into Stickyroll

> :timer_clock: **Time invest**: 5 Minutes ––– :woman_student: **Level**: Beginner

## What to expect

Building scroll aware fullscreen views can be a complex process but Stickyroll is made for this
exact purpose.
In about 5 minutes we will have a simple app that allows endless possibilities.

We will …

* … learn how to set up a react app with `create-react-app`
* … install Stickyroll from npm
* … build our first scrollview

## You'll need

* :computer: Terminal (MacOS: `Terminal.app` or [iTerm](https://www.iterm2.com/) | Windows: [cmder](http://cmder.net/))
* :turtle: Node.js `>=8` ([Install](https://nodejs.org/en/))


## Installing node.js

This project requires node.js, so please make sure it is installed on your
machine. You can find the [downloads here](https://nodejs.org/en/download/).

This guide expects Node.js >=8.

## Creating a React App

To get started with Stickyroll you need a simple react project. 
In this guide we will use create-react-app to make easier.

*The next section is quoted from the github readme of create-react-app. (Wed Dec 05 2018 23:51:26 GMT+0100 (Central European Standard Time))*

> :information_source: 
> To create a new app, run a single command:
> 
> ```sh
> npx create-react-app my-app
> ```
> *(npx comes with npm 5.2+ and higher.)  
>
> It will create a directory called `my-app` inside the current folder.  
> [...]
> Once the installation is done, you can open your project folder:
> 
> ```sh
> cd my-app
> ```
> 
> [source](https://github.com/facebook/create-react-app)



## Your first Stickyroll

Follow these 3 simple steps to build your first Stickyroll.

### 1. Installing Stickyroll

While in your app folder `my-app`, run a single command:

```shell
npm install --save @stickyroll/stickyroll
```

### 2. Creating a Stickyroll

Open the file `my-app/src/App.css` in your text editor and replace
the entire content with this code.

```css
body {
  margin: 0;
}
* {
  box-sizing: border-box;
}
```

Open the file `my-app/src/App.js` in your text editor and replace
the entire content with this code.

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
	return (
		<Stickyroll pages={headlines}>
			{({page, pageIndex, pages, progress}) => {
				return (
				<div>
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

### 3. Starting the app

To start the app run a single command:

```
npm start
```

The browser should open the app. If for some reason your browser des not automatically show the app, 
simply navigate to http://localhost:3000/ and you're good to go.

`@stickyroll/stickyroll` provides the main component and a `{Listener}` to build context aware plugins.
But that is a topic for later. 

#### Explore your Stickyroll

Stickyroll stays in the visible area of the viewport while you scroll the page.

* Try using the "arrow down key" on your keyboard to navigate the page.
* The "arrow up key" allows you to scroll back, reverting the progress.
* You can use the scrollbar, a mouse, trackpad or any other device to navigate the page.
* Open the app on your mobile device and test it's behavior.

You can now add more logic to your Stickyroll.

Enjoy!

## Advanced usage

Stickyroll allows a lot more than just writing numbers on the screen. If you are
familiar with React.js or are comfortable with your demo app and want
to add custom behaviour you can take a look at the next steps in this guide.

## Next steps

* [Configure Stickyroll](https://stickyroll.github.io/react-stickyroll/doc/guide/configue-stickyroll/Readme.html?guides-enabled=true)
* [Using Decorators](https://stickyroll.github.io/react-stickyroll/doc/guide/using-decorators/Readme.html?guides-enabled=true)

If anything is missing or seems unclear feel free to open an issue 
in our [github repo](https://github.com/stickyroll/react-stickyroll/issues).

**Thank you**
