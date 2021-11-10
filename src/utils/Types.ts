import { CategoryDTO, KeysToCamelCase, ItemDTO } from "./DTO";

export interface Dictionary<T> {
  [Key: string]: T;
}

export type Item = KeysToCamelCase<ItemDTO>;
export type Category = KeysToCamelCase<CategoryDTO>;
