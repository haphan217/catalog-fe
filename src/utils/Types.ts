import { CategoryDTO, KeysToCamelCase, ItemDTO, UserDTO } from "./DTO";

export interface Dictionary<T> {
  [Key: string]: T;
}

export type LoginForm = {
  username: string;
  password: string;
};

export type SignupForm = {
  email: string;
  username: string;
  password: string;
};

export type Item = KeysToCamelCase<ItemDTO>;
export type Category = KeysToCamelCase<CategoryDTO>;
export type User = KeysToCamelCase<UserDTO>;
