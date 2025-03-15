import {
  createPlausibleTracker,
  type EventOptions,
  type Plausible,
  type PlausibleOptions,
} from "@barbapapazes/plausible-tracker";
import { useAutoOutboundTracking as _useAutoOutboundTracking } from "@barbapapazes/plausible-tracker/extensions/auto-outbound-tracking";
import { useAutoPageviews as _useAutoPageviews } from "@barbapapazes/plausible-tracker/extensions/auto-pageviews";
import { type Context, createContext, onCleanup, useContext } from "solid-js";
import { isServer } from "solid-js/web";

const PlausibleContext: Context<Partial<PlausibleOptions> | undefined> =
  createContext<
    Partial<PlausibleOptions>
  >();
export const PlausibleProvider = PlausibleContext.Provider;

let plausible: Plausible;
const usePlausible = () =>
  plausible ??= createPlausibleTracker(useContext(PlausibleContext));

export const useTrackEvent = (
  args: Parameters<typeof plausible.trackEvent>,
) => {
  if (isServer) return;
  usePlausible().trackEvent(...args);
};

export const useTrackPageview = (
  args: Parameters<typeof plausible.trackPageview>,
) => {
  if (isServer) return;
  usePlausible().trackPageview(...args);
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

export const useAutoPageviews = (opts?: EventOptions) => {
  if (isServer) return;
  const { cleanup, install } = _useAutoPageviews(usePlausible(), opts);

  try {
    install();
  } finally {
    onCleanup(cleanup);
  }
};
