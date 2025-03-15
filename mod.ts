import {
  createPlausibleTracker,
  type EventName,
  type EventOptions,
  type Plausible as PlausibleType,
  type PlausibleOptions,
} from "@barbapapazes/plausible-tracker";
import {
  defaultFileTypes,
  useAutoFileDownloadsTracking as _useAutoFileDownloadsTracking,
  useAutoOutboundTracking as _useAutoOutboundTracking,
  useAutoPageviews as _useAutoPageviews,
} from "@barbapapazes/plausible-tracker/extensions";
import {
  type Component,
  type Context,
  type ContextProviderComponent,
  createContext,
  onCleanup,
  useContext,
} from "solid-js";
import { isServer } from "solid-js/web";

const PlausibleContext: Context<Partial<PlausibleOptions> | undefined> =
  createContext<
    Partial<PlausibleOptions>
  >();

let plausible: PlausibleType;
const usePlausible = () =>
  plausible ??= createPlausibleTracker(useContext(PlausibleContext));

export const useTrackEvent = (
  name: EventName,
  opts?: Partial<EventOptions>,
) => {
  if (isServer) return;
  usePlausible().trackEvent(name, opts);
};

export const useTrackPageview = (opts?: Partial<EventOptions>) => {
  if (isServer) return;
  usePlausible().trackPageview(opts);
};

export const useAutoFileDownloadsTracking = (
  opts?: Partial<EventOptions>,
  fileTypes: string[] = defaultFileTypes,
) => {
  if (isServer) return;
  const { cleanup, install } = _useAutoFileDownloadsTracking(usePlausible(), {
    fileTypes,
  }, opts);

  try {
    install();
  } finally {
    onCleanup(cleanup);
  }
};

export const useAutoOutboundTracking = (opts?: EventOptions) => {
  if (isServer) return;
  const { cleanup, install } = _useAutoOutboundTracking(usePlausible(), opts);

  try {
    install();
  } finally {
    onCleanup(cleanup);
  }
};

export const useAutoPageviewTracking = (opts?: EventOptions) => {
  if (isServer) return;
  const { cleanup, install } = _useAutoPageviews(usePlausible(), opts);

  try {
    install();
  } finally {
    onCleanup(cleanup);
  }
};

type PlausibleStruct = {
  Provider: ContextProviderComponent<Partial<PlausibleOptions>>;
  TrackEvent: Component<{ name: EventName } & Partial<EventOptions>>;
  TrackPageview: Component<Partial<EventOptions>>;
  AutoFileDownloadsTracking: Component<
    { fileTypes: string[] } & Partial<EventOptions>
  >;
  AutoOutboundTracking: Component<Partial<EventOptions>>;
  AutoPageviewTracking: Component<Partial<EventOptions>>;
};
export const Plausible: PlausibleStruct = {
  Provider: PlausibleContext.Provider,
  TrackEvent: (
    { name, ...opts }: { name: EventName } & Partial<EventOptions>,
  ) => {
    useTrackEvent(name, opts);
    return null;
  },
  TrackPageview: (opts?: Partial<EventOptions>) => {
    useTrackPageview(opts);
    return null;
  },
  AutoFileDownloadsTracking: (
    { fileTypes, ...opts }: { fileTypes: string[] } & Partial<EventOptions>,
  ) => {
    useAutoFileDownloadsTracking(opts, fileTypes);
    return null;
  },
  AutoOutboundTracking: (opts?: Partial<EventOptions>) => {
    useAutoOutboundTracking(opts);
    return null;
  },
  AutoPageviewTracking: (opts?: Partial<EventOptions>) => {
    useAutoPageviewTracking(opts);
    return null;
  },
};
