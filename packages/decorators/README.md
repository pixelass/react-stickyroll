# Stickyroll decorators


```bash
yarn add @stickyroll/decorators
```

## Codesandbox

-   [Getting started](https://codesandbox.io/s/6vr769903)

## Example 1

```jsx
import { page } from "@stickyroll/decorators";
import React from "react";

@page
export default class Decorated extends React.Component {
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
