import { describe, expectTypeOf, it } from "vitest";
import type { AssertNotEqual } from "../src";

describe("AssertNotEqual", () => {
  it("passes when the types differ", () => {
    expectTypeOf<AssertNotEqual<number, string, "eq">>().toEqualTypeOf<true>();
  });

  it("fails when the types are identical", () => {
    expectTypeOf<AssertNotEqual<number, number, "eq">>().toEqualTypeOf<"eq">();
  });
});
