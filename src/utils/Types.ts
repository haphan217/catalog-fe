import { GenreDTO, KeysToCamelCase, MovieDTO } from "./DTO";

export interface Dictionary<T> {
  [Key: string]: T;
}

export type Movie = KeysToCamelCase<MovieDTO>;
export type Genre = KeysToCamelCase<GenreDTO>;
