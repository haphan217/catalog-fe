import axios from "axios";

export const register = (username: string, password: string, email: string) => {
  console.log("register user", username, password, email);
  localStorage.setItem("token", username);
  return username;
};

export const login = (username: string, password: string) => {
  console.log("login user", username, password);
  localStorage.setItem("token", username);
  return username;
};

export const logout = () => {
  localStorage.removeItem("token");
};
