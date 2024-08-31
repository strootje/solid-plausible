import { type PlausibleOptions, createPlausibleTracker } from "@barbapapazes/plausible-tracker";
import { useAutoOutboundTracking } from "@barbapapazes/plausible-tracker/extensions/auto-outbound-tracking";
import { useAutoPageviews } from "@barbapapazes/plausible-tracker/extensions/auto-pageviews";
import { type Accessor, type Component, type ParentProps, createComponent, createContext, createEffect, createSignal, onCleanup } from "solid-js";
import { isServer } from "solid-js/web";

type ContextType = ReturnType<typeof createPlausibleTracker>;

const [client, setClient] = createSignal<ContextType>();
const PlausibleContext = createContext<Accessor<ContextType | undefined>>(client);

type PlausibleProviderProps = ParentProps & Partial<PlausibleOptions>;

/**
 * Wrap around your page to provide pageview tracking
 *
 * @param props https://github.com/Barbapapazes/plausible-tracker/blob/4dde4fa4b70c16fdf4df98825e5fd32f6b659d16/src/types.ts#L20
 */
export const PlausibleProvider: Component<PlausibleProviderProps> = (props: PlausibleProviderProps) => {
  const listeners: (() => void)[] = [];
  const { children, ...opts } = props;

  createEffect(() => {
    if (isServer) {
      return;
    }

    const client = setClient(createPlausibleTracker(opts));

    const { install: installPageviewTracker, cleanup: cleanupPageviewTracker } = useAutoPageviews(client);
    listeners.push(cleanupPageviewTracker);
    installPageviewTracker();

    const { install: installOutboundTracker, cleanup: cleanupOutboundTracker } = useAutoOutboundTracking(client);
    listeners.push(cleanupOutboundTracker);
    installOutboundTracker();
  });

  onCleanup(() => listeners.map((cleanup) => cleanup()));

  return createComponent(PlausibleContext.Provider, { value: client, children });
};
