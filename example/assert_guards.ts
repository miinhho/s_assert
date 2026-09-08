import {
  type AssertFalse,
  type AssertNotAny,
  type AssertNotEqual,
  type AssertNotUnknown,
  s_assert,
} from "../src";

// Guard a value's type against silently widening to `any` or `unknown`.
interface ParseResult {
  id: number;
}

s_assert satisfies AssertNotAny<ParseResult, "ParseResult must not be `any`">;
s_assert satisfies AssertNotUnknown<ParseResult, "ParseResult must not be `unknown`">;

type Loosened = any;
// @ts-expect-error Loosened is `any`.
s_assert satisfies AssertNotAny<Loosened, "must not be any">;

// Two branded ids that must not collapse into each other.
type UserId = number & { readonly __brand: "UserId" };
type PostId = number & { readonly __brand: "PostId" };

s_assert satisfies AssertNotEqual<UserId, PostId, "UserId and PostId must stay distinct">;

type IsReadonlyArray<T> = T extends readonly unknown[]
  ? T extends unknown[]
    ? false
    : true
  : false;

s_assert satisfies AssertFalse<IsReadonlyArray<number[]>, "number[] is mutable">;
