// API CRUD

import instanceAxios from "@/utils/axios";
// import axios from "axios";

const token = localStorage.getItem("token");



type Props = {
  resource: string;
  id?: number | string;
  values?: any;
};

export const getList = async ({ resource = "products" }) => {
  const { data } = await instanceAxios.get(resource);
  return data;
};


export const getOne = async ({ resource = "products", id }: Props) => {
  if (!id) return;
  const { data } = await instanceAxios.get(`${resource}/${id}`); 
  return data;
};

export const create = async ({ resource = "products", values }: Props) => {
  const { data } = await instanceAxios.post(resource, values); 
  return data;
};

export const update = async ({ resource = "products", id, values }: Props) => {
  const { data } = await instanceAxios.put(`${resource}/${id}`, values);
  return data;
};

export const deleteOne = async ({ resource = "products", id }: Props) => {
  if (!id) return;
  const { data } = await instanceAxios.delete(`${resource}/${id}`);
  return data;
};

export const auth = async ({ resource = "register", values }: Props) => {
  const { data } = await instanceAxios.post(resource, values);
  return data;
};
