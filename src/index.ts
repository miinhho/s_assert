import type { ExtendsStrict, IsAny, IsEqual, IsNever, IsUnknown } from "type-fest";

/**
 * The carrier value for compile-time assertions. It is the literal `true`, so
 * `s_assert satisfies Assert<...>` compiles when the assertion resolves to
 * `true` and fails (printing the message) when it resolves to a string.
 */
export const s_assert = true as const;

/** Boolean negation; `type-fest`'s `Not` is internal, so define a local one. */
type Not<Condition extends boolean> = Condition extends true ? false : true;

/**
 * Core assertion. Resolves to `true` when `Condition` is exactly `true`,
 * otherwise to `Message`. Both `any` and `never` are treated as failures so a
 * condition that collapses (e.g. a distributive predicate evaluated at `never`)
 * can never silently pass.
 */
export type Assert<Condition, Message extends string = "Assertion failed"> =
  IsAny<Condition> extends true
    ? Message
    : IsNever<Condition> extends true
      ? Message
      : [Condition] extends [true]
        ? true
        : Message;

/**
 * Passes when `Condition` is exactly `false`.
 */
export type AssertFalse<
  Condition extends boolean,
  Message extends string = "Condition must be false",
> = Assert<Not<Condition>, Message>;

/**
 * Passes when `A` and `B` are the same type (invariant equality).
 */
export type AssertEqual<A, B, Message extends string = "Types are not equal"> = Assert<
  IsEqual<A, B>,
  Message
>;

/**
 * Passes when `A` and `B` are *not* the same type.
 */
export type AssertNotEqual<A, B, Message extends string = "Types must differ"> = Assert<
  Not<IsEqual<A, B>>,
  Message
>;

/**
 * Passes when `Sub` is assignable to `Super`.
 *
 * Uses `type-fest`'s `ExtendsStrict` with its defaults (`strictNever: true`,
 * `strictAny: false`). Note that a `Sub` of `any` passes; guard against `any`
 * leaks explicitly with {@link AssertNotAny}.
 */
export type AssertExtends<
  Sub,
  Super,
  Message extends string = "Sub does not extend Super",
> = Assert<ExtendsStrict<Sub, Super>, Message>;

/**
 * Passes when `Sub` is *not* assignable to `Super`.
 */
export type AssertNotExtends<
  Sub,
  Super,
  Message extends string = "Sub must not extend Super",
> = Assert<Not<ExtendsStrict<Sub, Super>>, Message>;

/**
 * Passes when `T` is not `any` — catches accidental `any` leaks.
 */
export type AssertNotAny<T, Message extends string = "Type must not be `any`"> = Assert<
  Not<IsAny<T>>,
  Message
>;

/**
 * Passes when `T` is not `unknown`.
 */
export type AssertNotUnknown<
  T,
  Message extends string = "Type must not be `unknown`",
> = Assert<Not<IsUnknown<T>>, Message>;

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

/**
 * Passes when `T` is `never` — ideal for exhaustive `switch` checks. On failure
 * the leftover (unhandled) type is reported in the message.
 */
export type AssertExhaustive<T> = Assert<IsNever<T>, Unhandled<T>>;
