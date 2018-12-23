> A sticky view with scroll listener API for parallax style views.

# Stickyroll

<p align="center"><img width="200" src="https://stickyroll.github.io/media/images/logo_deepPurple.svg" alt="Stickyroll logo"></p>

## [Site][site] | [Getting started][getting-started] | [Live support][live-support] | [Typedoc][typedoc]

<!-- [![npm][npm-badge]][npm] -->
[![GitHub license][license-badge]][license]
[![Travis build][build-badge]][build]
[![Codecov][codecov-badge]][codecov]
[![Codeclimate][codeclimate-badge]][codeclimate]

**Powered by**

<!-- [![Webstorm][webstorm-badge]][webstorm] -->

[![Browserstack][browserstack-badge]][browserstack]

This is the contributor documentation for the `react-stickyroll` mono-repository.
For user docs see [Getting started][getting-started]


## Core Packages

| version                                                  | description |
|:---------------------------------------------------------|:------------|
| [![stickyroll][stickyroll-badge]][stickyroll]            | The core component and listener |
| [![stickyroll decorators][decorators-badge]][decorators] | Decorators for plugins and smart components |
| [![stickyroll utils][utils-badge]][utils]                | Utilities to build plugins |

## Styled Components

| version                                      | description |
|:---------------------------------------------|:------------|
| [![stickyroll inner][inner-badge]][inner]    | A themed inner frame (made for pagers) |
| [![stickyroll pagers][pagers-badge]][pagers] | Themed pagers (made for inner) |
| [![stickyroll themes][themes-badge]][themes] | A collection of themes to select and combine |

## Contribute to Stickyroll

Please read our [contributing guide][contribute]

```sh
git clone https://github.com/stickyroll/react-stickyroll.git
cd react-stickyroll
yarn
yarn dev

# Test your changes
yarn test
# scoped tests
yarn lerna run test --scope @stickyroll/<package_name>
```

## Develop guides (via patternplate)

```bash
yarn patternplate:dev
```

## License

Copyright by [Gregor Adams][pixelass]. All `@stickyroll` packages are released under the [MIT license][license].

<!-- User support -->

[site]: https://stickyroll.github.io/react-stickyroll/
[getting-started]: https://stickyroll.github.io/react-stickyroll/doc/guide/getting-started/Readme.html?guides-enabled=true
[live-support]: https://spectrum.chat/stickyroll
[typedoc]: https://stickyroll.github.io/react-stickyroll/typedoc/

<!-- Badges -->

[npm-badge]: https://img.shields.io/npm/v/@stickyroll/stickyroll.svg?style=for-the-badge&logo=npm&colorB=cb3837
[npm]: https://www.npmjs.com/org/stickyroll
[license-badge]: https://img.shields.io/badge/license-MIT-blue.svg?style=for-the-badge
[license]: https://raw.githubusercontent.com/sinnerschrader/dekk/master/LICENSE
[build-badge]: https://img.shields.io/travis/stickyroll/react-stickyroll/master.svg?style=for-the-badge&logo=travis&logoColor=white
[build]: https://travis-ci.org/stickyroll/react-stickyroll
[browserstack-badge]: https://img.shields.io/badge/browserstack-open_source-132434.svg?style=for-the-badge
[browserstack]: https://www.browserstack.com/open-source
[webstorm-badge]: https://img.shields.io/badge/Webstorm-open_source-06e0e2.svg?style=for-the-badge&logo=webstorm
[webstorm]: https://www.jetbrains.com/buy/opensource/
[codecov-badge]: https://img.shields.io/codecov/c/github/stickyroll/react-stickyroll.svg?style=for-the-badge&logo=codecov&logoColor=white
[codecov]: https://codecov.io/gh/stickyroll/react-stickyroll
[codeclimate-badge]: https://img.shields.io/codeclimate/maintainability/stickyroll/react-stickyroll.svg?style=for-the-badge
[codeclimate]: https://codeclimate.com/github/stickyroll/react-stickyroll/

[stickyroll-badge]: https://img.shields.io/badge/dynamic/json.svg?label=npm&url=https%3A%2F%2Fraw.githubusercontent.com%2Fstickyroll%2Freact-stickyroll%2Fmaster%2Fpackages%2Fstickyroll%2Fpackage.json&query=version&&colorB=555555&prefix=@stickyroll/stickyroll@&style=for-the-badge&logo=npm
[stickyroll]: https://www.npmjs.com/package/@stickyroll/stickyroll
[decorators-badge]: https://img.shields.io/badge/dynamic/json.svg?label=npm&url=https%3A%2F%2Fraw.githubusercontent.com%2Fstickyroll%2Freact-stickyroll%2Fmaster%2Fpackages%2Fdecorators%2Fpackage.json&query=version&colorB=555555&prefix=@stickyroll/decorators@&style=for-the-badge&logo=npm
[decorators]: https://www.npmjs.com/package/@stickyroll/decorators
[utils-badge]: https://img.shields.io/badge/dynamic/json.svg?label=npm&url=https%3A%2F%2Fraw.githubusercontent.com%2Fstickyroll%2Freact-stickyroll%2Fmaster%2Fpackages%2Futils%2Fpackage.json&query=version&colorB=555555&prefix=@stickyroll/utils@&style=for-the-badge&logo=npm
[utils]: https://www.npmjs.com/package/@stickyroll/utils
[inner-badge]: https://img.shields.io/badge/dynamic/json.svg?label=npm&url=https%3A%2F%2Fraw.githubusercontent.com%2Fstickyroll%2Freact-stickyroll%2Fmaster%2Fcomponents%2Finner%2Fpackage.json&query=version&colorB=555555&prefix=@stickyroll/inner@&style=for-the-badge&logo=npm
[inner]: https://www.npmjs.com/package/@stickyroll/inner
[pagers-badge]: https://img.shields.io/badge/dynamic/json.svg?label=npm&url=https%3A%2F%2Fraw.githubusercontent.com%2Fstickyroll%2Freact-stickyroll%2Fmaster%2Fcomponents%2Fpagers%2Fpackage.json&query=version&colorB=555555&prefix=@stickyroll/pagers@&style=for-the-badge&logo=npm
[pagers]: https://www.npmjs.com/package/@stickyroll/pagers
[themes-badge]: https://img.shields.io/badge/dynamic/json.svg?label=npm&url=https%3A%2F%2Fraw.githubusercontent.com%2Fstickyroll%2Freact-stickyroll%2Fmaster%2Fcomponents%2Fthemes%2Fpackage.json&query=version&colorB=555555&prefix=@stickyroll/themes@&style=for-the-badge&logo=npm
[themes]: https://www.npmjs.com/package/@stickyroll/themes

<!-- Misc Links -->

[contribute]: https://github.com/stickyroll/react-stickyroll/blob/master/.github/CONTRIBUTING.md
[pixelass]: mailto:greg@pixelass.com
