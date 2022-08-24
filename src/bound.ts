import type { Fn, Never } from "./types";

type WithRequired<T> = Never<{
  [K in keyof T]-?: {} extends Pick<T, K> ? never : T[K];
}>;

type Vals<T, Keys> = Keys extends [infer K extends keyof T, ...infer Rest]
  ? K extends keyof WithRequired<T>
    ? [T[K], ...Vals<T, Rest>]
    : [T[K]?, ...Vals<T, Rest>]
  : [];

/**
 * This function allows for an object parameter to be turned into named like
 * parameters.   It lists the required parameters, followed by the optional parameters.
 * It returns a function that takes values for the corresponding parameters.
 *
 * @param fn - A function that has a single object parameter
 * @param keys - Keys to that object that you want bound, optional parameters are not required
 * @returns a function that takes the corresponding vals to the function.
 */
export const bound =
  <T extends Fn, K extends (keyof Parameters<T>[0])[]>(fn: T, ...keys: K) =>
  (...vals: Vals<Parameters<T>[0], K>) =>
    fn(
      keys.reduce((ret, key, idx) => {
        ret[key] = vals[idx];
        return ret;
      }, {} as any)
    );
