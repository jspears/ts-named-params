import type { Fn, AllArgFn } from "./types";

const asKeyValue = (all: any[]) => {
  const ret = {} as Record<string, unknown>;
  for (let i = 0; i < all.length; i += 2) {
    const cur = all[i];
    if (cur == null) {
      return;
    }

    const arg = typeof cur;

    if (arg === "string" || arg === "number" || arg === "symbol") {
      ret[cur] = all[i + 1];
    } else {
      return;
    }
  }
  return ret;
};

export const named =
  <T extends Fn>(fn: T): AllArgFn<T> =>
  (...all) => {
    if (all.length === 1) {
      return fn(all[0]);
    }
    const obj = asKeyValue(all);
    if (!obj) {
      throw new Error("not a valid call signature");
    }
    return fn(obj);
  };
