# Stickyroll

<p align="center"><img src="https://raw.githubusercontent.com/pixelass/stickyroll/4126e6adef588513c8309886014cf3d046091e8c/resources/logo.svg" width="400" alt="logo"/></p>

<p>A sticky view with scroll listener API for parallax style views.</p>

![Codacy coverage](https://img.shields.io/codacy/coverage/7c2869c31a824536b44725f79dcfa02e?style=for-the-badge)
![Codacy grade](https://img.shields.io/codacy/grade/7c2869c31a824536b44725f79dcfa02e?style=for-the-badge)

## Table of Contents

<!-- toc -->

- [Getting started](#getting-started)
- [Basic usage](#basic-usage)
- [Adjusting pages and factor usage](#adjusting-pages-and-factor-usage)
- [Using listeners](#using-listeners)
- [Using CSS variables](#using-css-variables)
- [Using ClassNames](#using-classnames)
- [Using the hook](#using-the-hook)
- [Advanced usage](#advanced-usage)
- [Why we don't use States](#why-we-dont-use-states)
- [Typescript](#typescript)
- [Testing](#testing)

<!-- tocstop -->

## Getting started

Please install stickyroll and react. Stickyroll does not have any additional dependencies.

**With NPM**

```shell
npm install @stickyroll/react react react-dom
```

**With Yarn**

```shell
yarn add @stickyroll/react react react-dom
```

## Basic usage

```jsx
import Stickyroll from "@stickyroll/react/stickyroll";

export default function App() {
  return <Stickyroll pages={1}>Scroll here.</Stickyroll>;
}
```

## Adjusting pages and factor usage

```jsx
import Stickyroll from "@stickyroll/react/stickyroll";

export default function App() {
  return (
    // Uses 10 poages of 300vh each
    <Stickyroll pages={10} factor={3}>
      Scroll here.
    </Stickyroll>
  );
}
```

## Using listeners

```jsx
import Stickyroll from "@stickyroll/react/stickyroll";

export default function App() {
  return (
    <Stickyroll
      pages={1}
      onStart={() => {
        console.log("onStart");
      }}
      onPage={(page, index) => {
        console.log("onPage", page, index);
      }}
      onProgress={(progress, page, index) => {
        console.log("onProgress", progress, page, index);
      }}
      onEnd={() => {
        console.log("onEnd");
      }}
    >
      Scroll here.
    </Stickyroll>
  );
}
```

## Using CSS variables

- height: `CSS_VARS.height`
- pages: `CSS_VARS.pages`
- factor: `CSS_VARS.factor`
- progress: `CSS_VARS.progress`
- page: `CSS_VARS.page`

```jsx
import Stickyroll from "@stickyroll/react/stickyroll";
import { CSS_VARS } from "@stickyroll/react/constants";

export default function App() {
  return (
    <Stickyroll pages={1}>
      <div
        style={{
          height: 10,
          background: "red",
          transform: `scaleX(var(${CSS_VARS.progress}, 0))`,
        }}
      />
    </Stickyroll>
  );
}
```

## Using ClassNames

- root: `CLASS_NAMES.root`
- above: `CLASS_NAMES.above`
- scrolling: `CLASS_NAMES.scrolling`
- below: `CLASS_NAMES.below`
- sticky: `CLASS_NAMES.sticky`
- nonSticky: `CLASS_NAMES.nonSticky`
- page: `CLASS_NAMES.page` (`type: function`)

```jsx
import styled from "@emotion/styled";
import Stickyroll from "@stickyroll/react/stickyroll";
import { CLASS_NAMES } from "@stickyroll/react/constants";

const StyledComponent = styled.div`
  height: 10px;
  background: red;

  /* Active while in sticky mode */
  &.${CLASS_NAMES.sticky} {
    background: yellow;
  }

  /* Active before sticky mode */
  &.${CLASS_NAMES.above} {
    background: blue;
  }

  /* Active after sticky mode */
  &.${CLASS_NAMES.below} {
    background: hotpink;
  }

  /* Active while on page 0 (index) */
  &.${CLASS_NAMES.page(0)} {
    background: rebeccapurple;
  }
`;

export default function App() {
  return (
    <Stickyroll pages={1}>
      <StyledComponent />
    </Stickyroll>
  );
}
```

## Using the hook

```jsx
import { CSS_VARS, STYLE } from "@stickyroll/react/constants";
import useStickyroll from "@stickyroll/react/use-stickyroll";
import { useRef } from "react";

export default function App() {
  const ref = useRef();
  useStickyroll(ref, { pages: 1 });
  return (
    <div
      ref={ref}
      style={{
        height: `var(${CSS_VARS.height}, var(--100vh, 100vh))`,
      }}
    >
      <div style={STYLE}>Scroll here.</div>
    </div>
  );
}
```

## Advanced usage

You can provide your own styles and behavior to adjust stickyroll to your needs. Take a look at the
examples:

- [Demo](https://react-stickyroll.vercel.app/?path=/story/examples--apple)
- [Source](https://github.com/pixelass/react-stickyroll/blob/main/src/examples.stories.tsx)

## Why we don't use States

While you can write the output of stickyroll to a state we recommend to work without states, to
optimize performance.

You can access the ref (see
[the example](https://github.com/pixelass/react-stickyroll/blob/main/src/examples.stories.tsx)) and
modify the styles and additional behavior from there.

If you still need a state, we recommend using a global state that can then be accessed in child
components to prevent re-rendering the top level component.

You can take a look at these state management libraries or use your own preferred library:

- [Zustand](https://github.com/pmndrs/zustand)
- [Jotai](https://github.com/pmndrs/jotai)

## Typescript

Stickyroll provides types and is fully typed. Use them, don't use them… if you ever need them, we've
got you covered.

## Testing

We test stickyroll in real browsers with real interactions to ensure full coverage and reliability
of this library.
