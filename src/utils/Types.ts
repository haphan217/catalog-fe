import { CategoryDTO, KeysToCamelCase, ItemDTO, UserDTO, CategoryResponseDTO } from "./DTO";

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

export type ModalProps = {
  header: string;
  body: any;
  primaryBtn: string;
  primaryBtnVariant?: string;
  primaryBtnDisabled: boolean;
  secondaryBtn?: string;
  onClickPrimary: () => void;
  onClickSecondary?: () => void;
  onClose: () => void;
};

export type Item = KeysToCamelCase<ItemDTO>;
export type Category = KeysToCamelCase<CategoryDTO>;
export type CategoryResponse = KeysToCamelCase<CategoryResponseDTO>;
export type User = KeysToCamelCase<UserDTO>;
