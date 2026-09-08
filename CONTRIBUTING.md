# Contributing

## Prerequisites

- Node.js 22 or newer (CI and the publish workflow run on 24)
- pnpm

## Setup

```sh
pnpm install
```

## Scripts

| Command | Description |
| --- | --- |
| `pnpm test` | Runtime and type-level tests (Vitest `--typecheck`) |
| `pnpm test:watch` | Tests in watch mode |
| `pnpm typecheck` | Type-check the project (`tsc --noEmit`) |
| `pnpm check` | Lint and format check (Biome) |
| `pnpm check:fix` | Auto-fix lint and format (Biome) |
| `pnpm format` | Format only |
| `pnpm build` | Emit `dist/` (JS, `.d.ts`, sourcemaps) |

## Tests

Type-level assertions live in `test/**/*.test-d.ts` and run under Vitest's typecheck mode with `expectTypeOf`. Runtime tests live in `test/**/*.test.ts`.

```ts
import { expectTypeOf } from "vitest";
import type { AssertExhaustive } from "@miinhho/s_assert";

expectTypeOf<AssertExhaustive<never>>().toEqualTypeOf<true>();
```

A new assertion needs both a passing and a failing case. Negated and relational assertions (`AssertNotAny`, `AssertExtends`, …) should also cover the `any` and `never` edges, not only concrete types.

## CI

`.github/workflows/ci.yml` runs Biome, typecheck, tests, and build on every push to `main` and every pull request.

## Releasing

`.github/workflows/publish.yml` publishes to npm on a published GitHub Release, using Trusted Publishing (OIDC) with provenance.

One-time setup on npmjs.com: *Package → Settings → Trusted Publisher → GitHub Actions*, pointing at this repo and `publish.yml`. Then publish a GitHub Release to trigger it. See the [npm docs](https://docs.npmjs.com/trusted-publishers).
