import { expect } from "@std/expect";
import { Plausible } from "./mod.ts";

Deno.test(function stuff_should_not_be_null() {
  expect(Plausible.AutoFileDownloadsTracking).not.toBeNull();
  expect(Plausible.AutoOutboundTracking).not.toBeNull();
  expect(Plausible.AutoPageviewTracking).not.toBeNull();
  expect(Plausible.Provider).not.toBeNull();
});
