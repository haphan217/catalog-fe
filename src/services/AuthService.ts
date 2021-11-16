import axios from "axios";
import { API } from "utils/constants";

export const register = (username: string, password: string, email: string) => {
  return axios.post(`${API}/users`, {
    username,
    password,
    email,
  });
};

export const login = (username: string, password: string) => {
  return axios.post(`${API}/auth`, {
    username,
    password,
  });
};

export const logout = () => {
  localStorage.removeItem("token");
};
