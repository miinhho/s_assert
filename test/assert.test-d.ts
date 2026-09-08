import { describe, expectTypeOf, it } from "vitest";
import type { Assert } from "../src";
import { s_assert } from "../src";

describe("Assert", () => {
  it("resolves to `true` when the condition is `true`", () => {
    expectTypeOf<Assert<true, "boom">>().toEqualTypeOf<true>();
  });

  it("resolves to the message when the condition is `false`", () => {
    expectTypeOf<Assert<false, "boom">>().toEqualTypeOf<"boom">();
  });

  it("resolves to the message for `any` (never silently passes)", () => {
    expectTypeOf<Assert<any, "boom">>().toEqualTypeOf<"boom">();
  });

  it("treats non-`true` booleans as failures", () => {
    expectTypeOf<Assert<boolean, "boom">>().toEqualTypeOf<"boom">();
  });

  it("resolves to the message for `never` (collapsed conditions never pass)", () => {
    expectTypeOf<Assert<never>>().toEqualTypeOf<"Assertion failed">();
    expectTypeOf<Assert<never, "boom">>().toEqualTypeOf<"boom">();
  });

  it("falls back to the default message when none is given", () => {
    expectTypeOf<Assert<false>>().toEqualTypeOf<"Assertion failed">();
  });

  it("carries a failing assertion into a build error via `satisfies`", () => {
    // @ts-expect-error a failed assertion resolves to a string, not `true`.
    s_assert satisfies Assert<false, "boom">;
  });
});

describe("s_assert (carrier type)", () => {
  it("is the literal `true`, not the wider `boolean`", () => {
    // The `satisfies` mechanism relies on this being exactly `true`.
    expectTypeOf(s_assert).toEqualTypeOf<true>();
  });
});
