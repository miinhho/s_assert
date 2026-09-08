import { describe, expectTypeOf, it } from "vitest";
import type { AssertEqual } from "../src";

describe("AssertEqual", () => {
  it("passes on identical types", () => {
    expectTypeOf<AssertEqual<number, number, "neq">>().toEqualTypeOf<true>();
  });

  it("fails on differing types", () => {
    expectTypeOf<AssertEqual<number, string, "neq">>().toEqualTypeOf<"neq">();
  });

  it("is invariant: `any` is not equal to a concrete type", () => {
    expectTypeOf<AssertEqual<any, number, "neq">>().toEqualTypeOf<"neq">();
  });

  it("distinguishes structurally different object types", () => {
    expectTypeOf<AssertEqual<{ a: 1 }, { a: 1; b: 2 }, "neq">>().toEqualTypeOf<"neq">();
  });
});
