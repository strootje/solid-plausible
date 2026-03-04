import { Plausible } from "#/mod.ts";
import { expect } from "@std/expect";

Deno.test(function stuff_should_not_be_null() {
  expect(Plausible.Init).not.toBeNull();
  expect(Plausible.Track).not.toBeNull();
});
