# Biome Config

Shared [Biome](https://biomejs.dev/) linting/formatting configuration.

- [Usage](#usage)
- [License](#license)

## Usage

Install with [pnpm](https://pnpm.io/) (`solid-js` should be installed as a dev dependency):

```sh
pnpx jsr add -D @strootje/solid-plausible
```

Add this to your `biome.json` file:

```json
{
  "$schema": "https://biomejs.dev/schemas/1.8.3/schema.json",
  "extends": ["@strootje/biomejs/strict"]
}
```

## License

Licensed under the [MPL-2.0](LICENSE) license.<br/>
Copyright &copy; 2024, Bastiaan Stroosnijder
