import { describe, expectTypeOf, it } from "vitest";
import type { AssertFalse } from "../src";

describe("AssertFalse", () => {
  it("passes when the condition is `false`", () => {
    expectTypeOf<AssertFalse<false, "nf">>().toEqualTypeOf<true>();
  });

  it("fails when the condition is `true`", () => {
    expectTypeOf<AssertFalse<true, "nf">>().toEqualTypeOf<"nf">();
  });
});
