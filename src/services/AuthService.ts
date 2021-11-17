import axios from "axios";
import { API } from "utils/constants";
import { getHeaders } from "utils/functions";

export const register = (username: string, password: string, email: string) => {
  return axios.post(`${API}/users`, {
    name: username,
    password,
    email,
  });
};

export const login = (email: string, password: string) => {
  return axios.post(`${API}/auth`, {
    email,
    password,
  });
};

export const getUser = () => {
  return axios.get(`${API}/users/me`, {
    headers: getHeaders(),
  });
};
