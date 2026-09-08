import { describe, expectTypeOf, it } from "vitest";
import type { AssertNotUnknown } from "../src";

describe("AssertNotUnknown", () => {
  it("passes for a concrete type", () => {
    expectTypeOf<AssertNotUnknown<number, "unk">>().toEqualTypeOf<true>();
  });

  it("fails for `unknown`", () => {
    expectTypeOf<AssertNotUnknown<unknown, "unk">>().toEqualTypeOf<"unk">();
  });
});
