> A sticky view with scroll listener API for parallax style views.

# Stickyroll

## [Site][site] | [Getting started][getting-started]

[![npm](https://img.shields.io/npm/v/@stickyroll/stickyroll.svg?style=for-the-badge)](https://www.npmjs.com/org/stickyroll)
[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg?style=for-the-badge)](https://raw.githubusercontent.com/sinnerschrader/dekk/master/LICENSE)
[![Travis branch](https://img.shields.io/travis/stickyroll/react-stickyroll/master.svg?style=for-the-badge&logo=travis)](https://travis-ci.org/stickyroll/react-stickyroll)

<!--
[![node](https://img.shields.io/node/v/@stickyroll/stickyroll.svg?style=for-the-badge)](https://nodejs.org)

[![Browserstack](https://img.shields.io/badge/browserstack-device_tests-brightgreen.svg?style=for-the-badge)](https://www.browserstack.com)
[![Karma](https://img.shields.io/badge/karma-browser_tests-blue.svg?style=for-the-badge)](https://github.com/karma-runner/karma)
[![Ava](https://img.shields.io/badge/ava-node_tests-4b4b77.svg?style=for-the-badge)](https://github.com/avajs/ava)

[![Lerna](https://img.shields.io/badge/lerna-0.1.1-cd00ff.svg?style=for-the-badge)](https://github.com/avajs/ava)

[![David](https://img.shields.io/david/stickyroll/react-stickyroll.svg?style=for-the-badge)](https://david-dm.org/stickyroll/react-stickyroll)
[![David](https://img.shields.io/david/dev/stickyroll/react-stickyroll.svg?style=for-the-badge)](https://david-dm.org/stickyroll/react-stickyroll?type=dev)
-->

##### Powered by

<!-- [![Webstorm](https://img.shields.io/badge/Webstorm-open_source-06e0e2.svg?style=for-the-badge&logo=webstorm)](https://www.jetbrains.com/buy/opensource/) -->

[![Browserstack](https://img.shields.io/badge/browserstack-open_source-132434.svg?style=for-the-badge)](https://www.browserstack.com/open-source)

<!-- toc -->

-   [Intro](#intro)
-   [Values](#values)
-   [Browser matrix](#browser-matrix)
    -   [Browserstack remote tests:](#browserstack-remote-tests)
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

This is the contributor documentation for the `react-stickyroll` mono-repository.
For user docs see [stickyroll.github.io/react-stickyroll](https://stickyroll.github.io/react-stickyroll)

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

## Contribute to Stickyroll

```sh
git clone https://github.com/stickyroll/react-stickyroll.git
cd react-stickyroll
yarn
yarn dev

# Test your changes
yarn test
# scpoped tests
yarn lerna run test --scope @stickyroll/<package_name>
```

## Develop guides (via patternplate)

```bash
yarn patternplate:dev
```

## License

Copyright by [Gregor Adams](mailto:greg@pixelass.com). All `@stickyroll` packages are released under the MIT license.

[site]: https://stickyroll.netlify.com/
[getting-started]: https://stickyroll.github.io/react-stickyroll/doc/guide/getting-started/Readme.html?guides-enabled=true
