export type Fn = (arg: any) => any;

// oh boy don't do this
type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends (
  k: infer I
) => void
  ? I
  : never;

type LastOf<T> = UnionToIntersection<
  T extends any ? () => T : never
> extends () => infer R
  ? R
  : never;

// TS4.1+
type TuplifyUnion<
  T,
  L = LastOf<T>,
  N = [T] extends [never] ? true : false
> = true extends N ? [] : [...TuplifyUnion<Exclude<T, L>>, L];

/**
 * Sometimes you want to be able to take named parameters,
 * and or
 *
 * Should put optional parameters last.
 */
export type Never<T> = {
  [K in keyof T as T[K] extends never
    ? never
    : K extends "prototype"
    ? never
    : K]: T[K];
};

type WithRequiredKeys<T> = Never<{
  [K in keyof T]-?: {} extends Pick<T, K> ? never : [K, T[K]];
}>;
type WithOptionalKeys<T> = Never<{
  [K in keyof T]-?: {} extends Pick<T, K> ? [K, T[K]] : never;
}>;
type NamedParameters_<T> = TuplifyUnion<T[keyof T]>;

type FlattenName<T> = T extends [[infer Name, infer Type], ...infer Rest]
  ? [Name, Type, ...FlattenName<Rest>]
  : [];

type Optional<T> = T extends [infer K, infer V, ...infer Rest]
  ? [K, (V | null)?, ...Optional<Rest>] | Optional<Rest>
  : [];

/**
 * In a Tuple of Key, Values,  return only the Keys
 */
export type Keys<T> = T extends [infer K, any, ...infer Rest]
  ? [K, ...Keys<Rest>]
  : [];
/**
 * In a tupple of Key, Value, return only the Values;
 */
export type Vals<T, Keys> = Keys extends [
  infer K extends keyof T,
  ...infer Rest
]
  ? [T[K], ...Vals<T, Rest>]
  : [];
/**
 * Return a tuple of [Key, Value,...] with optional paramters after required parameters.
 */
export type KeyValueArgs<T> = [
  ...FlattenName<NamedParameters_<WithRequiredKeys<T>>>,
  ...Optional<FlattenName<NamedParameters_<WithOptionalKeys<T>>>>
];

export type AllArgs<T> = [T] | KeyValueArgs<T>;

export type AllArgFn<T extends Fn> = (
  this: unknown | undefined | null,
  ...a: AllArgs<Parameters<T>[0]>
) => ReturnType<T>;
