# s_assert

Compile-time assertions for TypeScript, expressed through the type system — modeled on C++ `static_assert`. A failing assertion surfaces during type checking, not at runtime.

## How it works

Every assertion is a conditional type that resolves to `true` on success or to a **message string** on failure. Anchor it to the exported `s_assert` value (which is `true`) with `satisfies`:

```ts
s_assert satisfies Assert<Condition, "message when it fails">;
```

- Pass → the type is `true`, so `true satisfies true` compiles.
- Fail → the type is the message string, so `true satisfies "message"` is a type error and the compiler prints the message.

## Install

```sh
npm install @miinhho/s_assert
yarn add @miinhho/s_assert
pnpm add @miinhho/s_assert
```

Requires TypeScript 5.9+ with `strict: true`, and is ESM-only.

## API

Every assertion except `AssertExhaustive` takes an optional `Message` (shown on failure) with a default.

### `Assert<Condition, Message?>`

Resolves to `true` when `Condition` is exactly `true`, otherwise to `Message`. Both `any` and `never` count as failures, so a condition that collapses — a distributive predicate evaluated at `never`, or booleans joined with `&` — never passes silently; combine conditions with `And`/`AndAll` instead. `Condition` is any `boolean`, so drive it with your own conditional types or ready-made predicates from a library like [type-fest](https://github.com/sindresorhus/type-fest):

```ts
import { s_assert, type Assert } from "@miinhho/s_assert";
import type { AndAll, GreaterThan, IsLiteral } from "type-fest";

s_assert satisfies Assert<1 extends number ? true : false, "1 is not a number">;
s_assert satisfies Assert<AndAll<[IsLiteral<"x">, GreaterThan<3, 2>]>, "compound">;
```

### `AssertFalse<Condition, Message?>`

Passes when `Condition` is exactly `false`.

### `AssertEqual<A, B, Message?>` / `AssertNotEqual<A, B, Message?>`

Pass when `A` and `B` are (not) the same type — invariant (exact) equality.

```ts
type User = { id: number };

s_assert satisfies AssertEqual<User["id"], number, "User.id must stay a number">;
```

### `AssertExtends<Sub, Super, Message?>` / `AssertNotExtends<Sub, Super, Message?>`

Pass when `Sub` is (not) assignable to `Super`. A `Sub` of `any` passes, so guard `any` explicitly with `AssertNotAny`.

```ts
type BaseConfig = { name: string; retries: number };
type AppConfig = BaseConfig & { endpoint: string };

s_assert satisfies AssertExtends<AppConfig, BaseConfig, "AppConfig must satisfy BaseConfig">;
s_assert satisfies AssertNotExtends<BaseConfig, AppConfig, "BaseConfig is not an AppConfig">;
```

### `AssertNotAny<T, Message?>` / `AssertNotUnknown<T, Message?>`

Pass when `T` is not `any` / not `unknown` — catch `any` leaking in from loose generics, `JSON.parse`, or a widened return type.

```ts
interface ParseResult { id: number }

s_assert satisfies AssertNotAny<ParseResult, "ParseResult must not be `any`">;
```

### `AssertExhaustive<T>`

Passes when `T` is `never`, for exhaustive `switch` checks. An unhandled case leaves a non-`never` type, which is reported in the message.

```ts
type Status = "idle" | "loading" | "success" | "error";

function handle(status: Status): string {
  switch (status) {
    case "idle": return "idle";
    case "loading": return "loading";
    case "success": return "success";
    case "error": return "error";
    default:
      s_assert satisfies AssertExhaustive<typeof status>;
      return status;
  }
}
```

Drop the `"error"` case and the assertion fails with `"Unhandled case: error"`.

See [`example/`](./example) for passing and (intentionally) failing assertions.

## Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md) for setup, scripts, and the test and release workflow.

## License

MIT © miinhho
