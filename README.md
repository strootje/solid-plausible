[![@strootje/solid-plausible](https://jsr-badge.deno.dev/@strootje/solid-plausible/stable.svg)](https://jsr.io/@strootje/solid-plausible)
[![publish.yml](https://github.com/strootje/solid-plausible/actions/workflows/publish.yml/badge.svg)](https://github.com/strootje/solid-plausible/actions/workflows/publish.yml)

# Solid Plausible

Plausible provider for your [SolidJS](https://solidjs.com) app.

All credit should go to [barbapapazes](https://github.com/barbapapazes) for updating the [plausible-tracker](https://github.com/barbapapazes/plausible-tracker)

## Usage

Install with [pnpm](https://pnpm.io/) (`solid-js` should be installed as a dev dependency):

```sh
pnpx jsr add -D @strootje/solid-plausible
```

Add the `PlausibleProvider` to your app component:

```tsx
export default function App() {
   return (
      <PlausibleProvider>
         // ...
      </PlausibleProvider>
	);
}
```

## License

Licensed under the [MPL-2.0](LICENSE) license.<br/>
Copyright &copy; 2024, Bastiaan Stroosnijder
