export const ModalKey = {
  ADD_ITEM: "addItem",
  ADD_CATEGORY: "addCategory",
  DELETE_ITEM: "deleteItem",
};

export const AuthTestData = {
  EMAIL: "email@example.com",
  EXISTED_EMAIL: "exist@example.com",
  INVALID_EMAIL: "invalidEmail",
  PASSWORD: "1Password",
  INVALID_PASSWORD: "invalid",
  WRONG_PASSWORD: "1wrongPassword",
  NAME: "name",
  ERROR: "Bad request",
  TOKEN: "Ey123",
};

export const FormValidation = {
  EMAIL_REGEX: "^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,4}$",
  EMAIL_ERROR: "Please enter a valid email address.",
  PASSWORD_REGEX: "^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[a-zA-Z\\d]{6,}$",
  PASSWORD_ERROR:
    "Password must have at least 6 characters, including at least one lowercase letter, one uppercase letter, one digit.",
};

// export const API = "http://192.168.131.100:5001";
export const API = "http://51df-27-72-105-96.ngrok.io";
