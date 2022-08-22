
type Fn = (arg: any) => any;

// oh boy don't do this
type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends ((k: infer I) => void) ? I : never

type LastOf<T> = UnionToIntersection<T extends any ? () => T : never> extends () => (infer R) ? R : never

// TS4.1+
type TuplifyUnion<T, L = LastOf<T>, N = [T] extends [never] ? true : false> = true extends N ? [] : [...TuplifyUnion<Exclude<T, L>>, L]


/**
 * Sometimes you want to be able to take named parameters,
 * and or 
 * 
 * Should put optional parameters last.
 */
type Never<T> = { [K in keyof T as T[K] extends never ? never : K extends 'prototype' ? never : K]: T[K] }

type WithRequiredKeys<T> = Never<{ [K in keyof T]-?: {} extends Pick<T, K> ? never : [K, T[K]] }>;
type WithOptionalKeys<T> = Never<{ [K in keyof T]-?: {} extends Pick<T, K> ? [K, T[K]] : never }>;
type NamedParameters_<T> = TuplifyUnion<T[keyof T]>

type FlattenName<T> = T extends [[infer Name, infer Type], ...infer Rest] ? [Name, Type, ...FlattenName<Rest>] : [];

type Optional<T> = T extends [infer K, infer V, ...infer Rest] ? ([K, (V | null)?, ...Optional<Rest>] | Optional<Rest>) : [];

type AllArgs<T> = [T] | [...FlattenName<NamedParameters_<WithRequiredKeys<T>>>, ...Optional<FlattenName<NamedParameters_<WithOptionalKeys<T>>>>];

type AllArgFn<T extends Fn> = (...a: AllArgs<Parameters<T>[0]>) => ReturnType<T>;
