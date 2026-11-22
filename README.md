# Data structures

![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white)
![Jest](https://img.shields.io/badge/Jest-C21325?style=flat-square&logo=jest&logoColor=white)
[![License: GPL-3.0](https://img.shields.io/badge/License-GPL--3.0-blue?style=flat-square)](LICENSE)

TypeScript data-structure implementations with Jest tests and ESLint validation.

## Layout

- [`src/`](src/): implementations.
- [`test/`](test/): tests.
- [`package.json`](package.json): dependency and script definitions.
- [`tsconfig.json`](tsconfig.json): TypeScript compiler configuration.

## Development

Use the Node version declared in [`.nvmrc`](.nvmrc) and the package engine settings.
The repository tracks a Yarn lockfile.

```sh
yarn install
yarn test
yarn lint
yarn build
```

These commands map to the existing package scripts; tests use
[`jest.config.js`](jest.config.js). See [LICENSE](LICENSE) for license terms.
