import { describe, expectTypeOf, it } from "vitest";
import type { AssertExhaustive } from "../src";

describe("AssertExhaustive", () => {
  it("passes when the input is `never`", () => {
    expectTypeOf<AssertExhaustive<never>>().toEqualTypeOf<true>();
  });

  it("reports a leftover string-literal case", () => {
    expectTypeOf<AssertExhaustive<"error">>().toEqualTypeOf<"Unhandled case: error">();
  });

  it("reports a leftover numeric-literal case", () => {
    expectTypeOf<AssertExhaustive<42>>().toEqualTypeOf<"Unhandled case: 42">();
  });

  it("rejects the wide `string` type", () => {
    expectTypeOf<
      AssertExhaustive<string>
    >().toEqualTypeOf<"Cannot exhaustively match `string`">();
  });

  it("rejects the wide `number` type", () => {
    expectTypeOf<
      AssertExhaustive<number>
    >().toEqualTypeOf<"Cannot exhaustively match `number`">();
  });

  it("rejects the wide `bigint` type", () => {
    expectTypeOf<
      AssertExhaustive<bigint>
    >().toEqualTypeOf<"Cannot exhaustively match `bigint`">();
  });

  it("rejects `any`", () => {
    expectTypeOf<
      AssertExhaustive<any>
    >().toEqualTypeOf<"Cannot exhaustively match `any`">();
  });

  it("rejects `unknown`", () => {
    expectTypeOf<
      AssertExhaustive<unknown>
    >().toEqualTypeOf<"Cannot exhaustively match `unknown`">();
  });

  it("falls back to a generic message for non-primitive leftovers", () => {
    expectTypeOf<AssertExhaustive<{ kind: "x" }>>().toEqualTypeOf<"Unhandled case">();
  });
});
