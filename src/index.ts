import type {
  IsAny,
  IsEqual,
  IsNever,
  IsUnknown,
} from "type-fest";

export const s_assert = true as const;

export type Assert<
  Condition,
  Message extends string
> =
  IsAny<Condition> extends true
    ? Message
    : [Condition] extends [true]
      ? true
      : Message;

export type AssertEqual<
  A,
  B,
  Message extends string
> =
  Assert<IsEqual<A, B>, Message>;

type Unhandled<T> =
  IsAny<T> extends true
    ? "Cannot exhaustively match `any`"
    : IsUnknown<T> extends true
      ? "Cannot exhaustively match `unknown`"
      : string extends T
        ? "Cannot exhaustively match `string`"
        : number extends T
          ? "Cannot exhaustively match `number`"
          : bigint extends T
            ? "Cannot exhaustively match `bigint`"
            : T extends string | number | bigint | boolean
              ? `Unhandled case: ${T}`
              : "Unhandled case";

export type AssertExhaustive<T> =
  Assert<IsNever<T>, Unhandled<T>>;
