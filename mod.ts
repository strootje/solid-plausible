import { init, type PlausibleConfig, type PlausibleEventOptions, track } from "@plausible-analytics/tracker";
import { onMount } from "solid-js";
import { isServer } from "solid-js/web";

type PlausibleTrackProps = {
  eventName: string;
  opts?: PlausibleEventOptions;
};

export const Plausible = {
  Init: (props: PlausibleConfig) => {
    onMount(() => !isServer && init(props));
    return null;
  },

  Track: (props: PlausibleTrackProps) => {
    onMount(() => !isServer && track(props.eventName, props.opts ?? {}));
    return null;
  },
} as const;
