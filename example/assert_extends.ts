import { type AssertExtends, type AssertNotExtends, s_assert } from "../src";

type BaseConfig = {
  name: string;
  retries: number;
};

type AppConfig = {
  name: string;
  retries: number;
  endpoint: string;
};

// AppConfig has every BaseConfig member.
s_assert satisfies AssertExtends<
  AppConfig,
  BaseConfig,
  "AppConfig must satisfy BaseConfig"
>;

// BaseConfig lacks `endpoint`, so it is not an AppConfig.
s_assert satisfies AssertNotExtends<
  BaseConfig,
  AppConfig,
  "BaseConfig is not an AppConfig"
>;

// @ts-expect-error BaseConfig lacks `endpoint`.
s_assert satisfies AssertExtends<
  BaseConfig,
  AppConfig,
  "BaseConfig must satisfy AppConfig"
>;
