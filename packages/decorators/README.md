# Stickyroll decorators

Decorators for stickyroll.

```bash
yarn add @stickyroll/decorators
```

## Codesandbox

-   [Using decorators](https://codesandbox.io/s/6vr769903)

## Example 1

```jsx
import { page } from "@stickyroll/decorators";
import React from "react";

@page
export default class WithPage extends React.Component {
  render() {
    return (
      <React.Fragment>
        <div>PageIndex: {this.props.pageIndex}</div>
        <div>Page: {this.props.page}</div>
      </React.Fragment>
    );
  }
}
```

## Example 2

```jsx
import { progress } from "@stickyroll/decorators";
import React from "react";

@progress
export default class WithProgress extends React.Component {
  render() {
    return <div>Progress: {this.props.progress}</div>;
  }
}
```

## Example 3

```jsx
import { page, progress } from "@stickyroll/decorators";
import * as React from "react";

@page
@progress
export default class WithWithPageAndProgresss extends React.Component {
  render() {
    return (
      <React.Fragment>
        <div>PageIndex: {this.props.pageIndex}</div>
        <div>Page: {this.props.page}</div>
        <div>Progress: {this.props.progress}</div>
      </React.Fragment>
    );
  }
}
```
