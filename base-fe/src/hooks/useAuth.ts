import { auth } from "@/providers";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

import { toast } from "react-toastify";

type Props = {
  resource: "login" | "register";
};

export const useAuth = ({ resource }: Props) => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (values: any) => auth({ resource, values }),
    onSuccess: (data) => {
      if (resource === "register") {
        toast.success("Đăng ký thành công!");
        navigate("/auth/login");
        return;
      }

      // Xử lý đăng nhập thành công
      const { accessToken, user } = data;

      localStorage.setItem("token", accessToken);
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("role", user.role ?? "user"); // fallback role nếu không có

      toast.success("Đăng nhập thành công!");

      // Điều hướng tùy theo role
      if (user.role === "admin") {
        navigate("/admin/dashboard");
      } else {
        navigate("/");
      }
    },
    onError: (error: any) => {
      toast.error(error?.message || "Đăng nhập thất bại. Vui lòng kiểm tra lại thông tin.");
    },
  });
};
