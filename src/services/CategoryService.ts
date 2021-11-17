import axios from "axios";
import { API } from "utils/constants";
import { getHeaders } from "utils/functions";

export const getCategoryList = (page: number) => {
  return axios.get(`${API}/categories`, {
    params: { page },
  });
};

export const createCategory = (name: string) => {
  return axios.post(
    `${API}/categories`,
    {
      name,
    },
    {
      headers: getHeaders(),
    },
  );
};

export const deleteCategory = (id: number) => {
  return axios.delete(`${API}/categories/${id}`, {
    headers: getHeaders(),
  });
};
