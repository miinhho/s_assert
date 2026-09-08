import { type AssertExhaustive, s_assert } from "../src";

type Status = "idle" | "loading" | "success" | "error";

// All cases handled: status narrows to never in default.
function handleAll(status: Status): string {
  switch (status) {
    case "idle":
      return "idle";
    case "loading":
      return "loading";
    case "success":
      return "success";
    case "error":
      return "error";
    default:
      s_assert satisfies AssertExhaustive<typeof status>;
      return status;
  }
}

// Missing "error": status is "error" (not never) in default, so the build breaks.
function handleMissing(status: Status): string {
  switch (status) {
    case "idle":
      return "idle";
    case "loading":
      return "loading";
    case "success":
      return "success";
    default:
      // @ts-expect-error "error" is unhandled.
      s_assert satisfies AssertExhaustive<typeof status>;
      return "";
  }
}

export { handleAll, handleMissing };
