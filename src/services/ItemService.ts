import axios from "axios";
import { API } from "utils/constants";
import { getHeaders } from "utils/functions";

export const getItemList = (cateId: number, page?: number) => {
  return axios.get(`${API}/categories/${cateId}/items`, {
    params: { page: page || 1 },
  });
};

export const createItem = (cateId: number, name: string, description: string) => {
  return axios.post(
    `${API}/categories/${cateId}/items`,
    {
      name,
      description,
    },
    {
      headers: getHeaders(),
    },
  );
};

export const updateItem = (cateId: number, itemId: number, name: string, description: string) => {
  return axios.put(
    `${API}/categories/${cateId}/items/${itemId}`,
    {
      name,
      description,
    },
    {
      headers: getHeaders(),
    },
  );
};

export const deleteItem = (cateId: number, itemId: number) => {
  return axios.delete(`${API}/categories/${cateId}/items/${itemId}`, {
    headers: getHeaders(),
  });
};
