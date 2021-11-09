import { KeysToCamelCase, MovieDTO } from "./DTO";

export interface Dictionary<T> {
  [Key: string]: T;
}

export type Movie = KeysToCamelCase<MovieDTO>;
