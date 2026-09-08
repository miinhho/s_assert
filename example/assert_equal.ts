import { type AssertEqual, s_assert } from "../src";

type User = {
  id: number;
};

// Locks User.id to number.
s_assert satisfies AssertEqual<User["id"], number, "User.id must remain a number">;

// Would break the build if User.id ever drifted from number.
// @ts-expect-error User.id is number, not string.
s_assert satisfies AssertEqual<User["id"], string, "User.id must remain a string">;
