import axios from "axios";
import instanceAxios from "@/utils/axios";

export const contact = async (data: any) => {
  const res = await instanceAxios.post("/contact", data);
  return res.data;
};
