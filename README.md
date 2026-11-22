# Data structures

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
