import axios from "axios";
import instanceAxios from "@/utils/axios";
import type { CheckoutData } from "@/types/order/order.type";


export const createOrder = async (data: CheckoutData) => {
  
  const res = await instanceAxios.post("orders", data);
  return res.data;
};
