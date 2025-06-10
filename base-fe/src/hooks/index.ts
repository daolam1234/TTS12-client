import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { auth, create, deleteOne, getList, getOne, update } from "../providers";
// import { message, notification } from "antd";
import { useNavigate } from "react-router-dom";
import axios from "axios";
// import { jwtDecode } from "jwt-decode";
import { toast } from "react-toastify";

type Props = {
  resource: string;
  id?: number | string;
  params?: Record<string, any>;
};

export const useList = ({ resource = "products", params = {} }: Props) => {
  return useQuery({
    queryKey: [resource, params],
    queryFn: () => getList({ resource, params }),
  });
};

export const useOne = ({ resource = "products", id }: Props) => {
  return useQuery({
    queryKey: [resource, id],
    queryFn: () => getOne({ resource, id }),
  });
};

// export const useCreate = ({ resource = "products" }: Props) => {
//   const queryClient = useQueryClient();
//   return useMutation({
//     mutationFn: (values: any) => create({ resource, values }),
//     onSuccess: () => {
//       message.success("Them thanh cong");
//       queryClient.invalidateQueries({ queryKey: [resource] });
//     },
//     onError: () => {},
//   });
// };

// export const useUpdate = ({ resource = "products", id }: Props) => {
//   return useMutation({
//     mutationFn: (values: any) => update({ resource, id, values }),
//     onSuccess: () => {
//       message.success("Update thanh cong");
//     },
//     onError: () => {},
//   });
// };

// export const useDelete = ({ resource = "products" }: Props) => {
//   const queryClient = useQueryClient();
//   return useMutation({
//     mutationFn: (id?: number | string) => deleteOne({ resource, id }),
//     onSuccess: () => {
//       message.success("Xoa thanh cong");
//       // cap nhat danh sach sau khi xoa
//       queryClient.invalidateQueries({ queryKey: [resource] });
//     },
//     onError: () => {},
//   });
// };


export const useRegister = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: (values: any) => auth({ resource: "auth/register", values }),
    onSuccess: (data) => {
      toast.success("Đăng ký thành công! Vui lòng kiểm tra email để xác thực tài khoản.");
      navigate(`/verify-email/${data.token}`);
    },
    onError: (error: any) => {
      const message = error?.response?.data?.message || "Đăng ký thất bại. Vui lòng thử lại.";
      toast.error(message);
      
    },
  });
};

export const useLogin = () => {
  const navigate = useNavigate();
  return useMutation({
    mutationFn: (values: any) => auth({ resource: "auth/login", values }),
    onSuccess: (data) => {
      const { account, accessToken } = data.data || {};
      if (!account) {
        toast.error("Đăng nhập thất bại: Không tìm thấy thông tin người dùng.");
        return;
      }
      localStorage.setItem("token", accessToken);
      localStorage.setItem("user", JSON.stringify(account));
      localStorage.setItem("role", account.admin ? "admin" : "user");
      toast.success("Đăng nhập thành công!");
      if (account.admin) {
        navigate("/admin/dashboard");
      } else {
        navigate("/homepage");
      }
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || "Đăng nhập thất bại. Vui lòng kiểm tra lại thông tin.");
      console.log("Login error:", error);
    },
  });
};
     

//       const { accessToken, user } = data;
//       const decodedToken: any = jwtDecode(accessToken);

//       console.log(decodedToken);

//       if (user.status === "banned") {
//         notification.error({
//           message: "Login Failed",
//           description: "Tài khoản của bạn đã bị khóa.",
//           duration: 5,
//         });
//         return;
//       }

//       const userData = {
//         id: user.id,
//         name: user.name,
//         email: user.email,
//         phone: user.phone,
//       };

//       localStorage.setItem("token", accessToken);
//       localStorage.setItem("role", user.role);
//       localStorage.setItem("user", JSON.stringify(userData));

//       notification.success({ message: "Đăng nhập thành công!" });

//       if (user.role === "user") {
//         nav("/");
//         window.location.reload();
//       } else {
//         nav("/admin");
//       }
//     },

    
//     onError: () => {},
//   });
// };

