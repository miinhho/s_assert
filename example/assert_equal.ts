import { type AssertEqual, s_assert } from "../src";

type User = {
  id: number;
}

s_assert satisfies AssertEqual<
  User["id"],
  string,
  "User.id must remain a string"
>;
