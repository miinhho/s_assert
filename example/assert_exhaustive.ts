import { s_assert, type AssertExhaustive } from "../src";

type Status = 'idle' | 'loading' | 'success' | 'error'

function handle(status: Status) {
  switch (status) {
    case "idle":
      return "idle";

    case "loading":
      return "loading";

    case "success":
      return "success";

    default:
      s_assert satisfies AssertExhaustive<typeof status>;
      return "";
  }
}
