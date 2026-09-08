import { describe, expectTypeOf, it } from "vitest";
import type { AssertNotAny } from "../src";

describe("AssertNotAny", () => {
  it("passes for a concrete type", () => {
    expectTypeOf<AssertNotAny<number, "any">>().toEqualTypeOf<true>();
  });

  it("fails for `any`", () => {
    expectTypeOf<AssertNotAny<any, "any">>().toEqualTypeOf<"any">();
  });

  it("does not treat `unknown` as `any`", () => {
    expectTypeOf<AssertNotAny<unknown, "any">>().toEqualTypeOf<true>();
  });
});
