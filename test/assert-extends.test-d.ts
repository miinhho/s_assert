import { describe, expectTypeOf, it } from "vitest";
import type { AssertExtends } from "../src";

describe("AssertExtends", () => {
  it("passes when Sub is assignable to Super", () => {
    expectTypeOf<AssertExtends<"a", string, "ne">>().toEqualTypeOf<true>();
  });

  it("passes for a subtype object relationship", () => {
    expectTypeOf<AssertExtends<{ a: 1; b: 2 }, { a: 1 }, "ne">>().toEqualTypeOf<true>();
  });

  it("fails when Sub is not assignable to Super", () => {
    expectTypeOf<AssertExtends<string, "a", "ne">>().toEqualTypeOf<"ne">();
  });

  it("fails for a `never` Sub (ExtendsStrict, not raw `extends`)", () => {
    expectTypeOf<AssertExtends<never, string, "ne">>().toEqualTypeOf<"ne">();
  });

  it("lets an `any` Sub through (documented caveat — guard with AssertNotAny)", () => {
    expectTypeOf<AssertExtends<any, string, "ne">>().toEqualTypeOf<true>();
  });
});
