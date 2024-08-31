# Solid Plausible

Plausible provider for your [SolidJS](https://solidjs.com) app.

> All credit should go to [barbapapazes](https://github.com/barbapapazes)
> for making this [plausible-tracker](https://github.com/barbapapazes/plausible-tracker)

- [Usage](#usage)
- [License](#license)

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
