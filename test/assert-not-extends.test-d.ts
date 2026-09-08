import { describe, expectTypeOf, it } from "vitest";
import type { AssertNotExtends } from "../src";

describe("AssertNotExtends", () => {
  it("passes when Sub is not assignable to Super", () => {
    expectTypeOf<AssertNotExtends<string, "a", "ext">>().toEqualTypeOf<true>();
  });

  it("fails when Sub is assignable to Super", () => {
    expectTypeOf<AssertNotExtends<"a", string, "ext">>().toEqualTypeOf<"ext">();
  });
});
