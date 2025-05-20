import instanceAxios from "@/utils/axios";
import axios from "axios";
import bcrypt from "bcryptjs";



type Props = {
  resource: "login" | "register";
  values?: any;
};

export const auth = async ({ resource, values }: Props) => {
  if (resource === "register") {

    const hashedPassword = await bcrypt.hash(values.password, 10);
    const newUser = { ...values, password: hashedPassword };

    const { data } = await instanceAxios.post("users", newUser);
    return data;
  }

  if (resource === "login") {
    // Lấy user theo email
    const { data } = await instanceAxios.get(`users?email=${values.email}`);

    if (data.length === 0) {
      throw new Error("Email không tồn tại");
    }

    const user = data[0];

  
    const isMatch = await bcrypt.compare(values.password, user.password);

    if (!isMatch) {
      throw new Error("Mật khẩu không đúng");
    }

   
    return {
      accessToken: "dummy-token",
      user,
    };
  }

  throw new Error("Resource không hợp lệ");
};
