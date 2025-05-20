import axios from "axios";

const token = localStorage.getItem("token");

const axiosClient = axios.create({
  baseURL: "http://localhost:3000/",
  headers: {
    Authorization: token ? `Bearer ${token}` : "",
  },
});

type Props = {
  resource: string;
  values?: any;
};

export const auth = async ({ resource = "login", values }: Props) => {
  const { data } = await axiosClient.post(resource, values);
  return data;
};
