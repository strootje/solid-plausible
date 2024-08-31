import { type PlausibleOptions, createPlausibleTracker } from "@barbapapazes/plausible-tracker";
import { useAutoOutboundTracking } from "@barbapapazes/plausible-tracker/extensions/auto-outbound-tracking";
import { useAutoPageviews } from "@barbapapazes/plausible-tracker/extensions/auto-pageviews";
import { type Accessor, type ParentProps, createContext, createEffect, createSignal, onCleanup } from "solid-js";
import { isServer } from "solid-js/web";

type ContextType = ReturnType<typeof createPlausibleTracker>;

const [client, setClient] = createSignal<ContextType>();
const PlausibleContext = createContext<Accessor<ContextType | undefined>>(client);

type PlausibleProviderProps = ParentProps & Partial<PlausibleOptions>;
export const PlausibleProvider = (props: PlausibleProviderProps) => {
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

  return <PlausibleContext.Provider value={client}>{children}</PlausibleContext.Provider>;
};
