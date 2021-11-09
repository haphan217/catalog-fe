/* eslint-disable camelcase */

import { Dictionary } from "./Types";

type CamelCase<S extends string> = S extends `${infer P1}_${infer P2}${infer P3}`
  ? `${Lowercase<P1>}${Uppercase<P2>}${CamelCase<P3>}`
  : Lowercase<S>;

export type KeysToCamelCase<T> = {
  [K in keyof T as CamelCase<string & K>]: T[K] extends Dictionary<T> ? KeysToCamelCase<T[K]> : T[K];
};

export type MovieDTO = {
  id?: number;
  title: string;
  description: string;
  genre: string;
};

export type GenreDTO = {
  id?: number;
  title: string;
};