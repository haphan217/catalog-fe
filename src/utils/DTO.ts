/* eslint-disable camelcase */

import { Dictionary } from "./Types";

type CamelCase<S extends string> = S extends `${infer P1}_${infer P2}${infer P3}`
  ? `${Lowercase<P1>}${Uppercase<P2>}${CamelCase<P3>}`
  : Lowercase<S>;

export type KeysToCamelCase<T> = {
  [K in keyof T as CamelCase<string & K>]: T[K] extends Dictionary<T> ? KeysToCamelCase<T[K]> : T[K];
};

export type ItemDTO = {
  id?: number;
  name: string;
  description: string;
  category_id?: number;
  created_at?: string;
  updated_at?: string;
  author_id?: number;
};

export type CategoryDTO = {
  id?: number;
  name: string;
  author_id?: number;
  created_at?: string;
  updated_at?: string;
};

export type UserDTO = {
  id?: number;
  name: string;
  email?: string;
};

export type CategoryResponseDTO = {
  item_per_page: number;
  total_items: number;
  items: KeysToCamelCase<CategoryDTO>[];
};
