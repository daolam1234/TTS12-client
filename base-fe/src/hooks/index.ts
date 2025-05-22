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
};

export const useList = ({ resource = "products" }: Props) => {
  return useQuery({
    queryKey: [resource],
    queryFn: () => getList({ resource }),
  });
};

// export const useOne = ({ resource = "products", id }: Props) => {
//   return useQuery({
//     queryKey: [resource, id],
//     queryFn: () => getOne({ resource, id }),
//   });
// };

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


export const useAuth = ({ resource }: Props) => {
  const navigate = useNavigate();

  return useMutation({
    mutationFn: (values: any) => auth({ resource, values }),
    onSuccess: (data) => {
      if (resource === "users") {
        alert("Đăng ký thành công!");
        navigate("/login");
        return;
      }

      // Xử lý đăng nhập thành công
      const { accessToken, user } = data;

      localStorage.setItem("token", accessToken);
      localStorage.setItem("user", JSON.stringify(user));
      localStorage.setItem("role", user.role ?? "user"); // fallback role nếu không có

     alert("Đăng nhập thành công!");

      // Điều hướng tùy theo role
      if (user.role === "admin") {
        navigate("/admin/dashboard");
      } else {
        navigate("/");
      }
    },
    onError: (error: any) => {
      alert(error?.message || "Đăng nhập thất bại. Vui lòng kiểm tra lại thông tin.");
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

