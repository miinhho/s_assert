import { describe, expect, it } from "vitest";
import { s_assert } from "../src";

describe("s_assert", () => {
  it("is the literal `true` used as the assertion carrier value", () => {
    expect(s_assert).toBe(true);
  });
});
