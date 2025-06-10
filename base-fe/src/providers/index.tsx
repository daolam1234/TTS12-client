// API CRUD

import instanceAxios from "@/utils/axios";





type Props = {
  resource: string;
  id?: number | string;
  values?: any;
  params?: Record<string, any>; // Thêm params
};

export const getList = async ({ resource = "products", params = {} }: Props) => {
  // Build query string từ params
  const queryString = params && Object.keys(params).length > 0
    ? "?" + new URLSearchParams(params).toString()
    : "";
  const res = await instanceAxios.get(`${resource}${queryString}`);
  console.log("res.data:", res.data);
  return res.data.data.products; // ✅ Trả về mảng sản phẩm
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
