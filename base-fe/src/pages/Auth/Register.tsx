import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Link,  } from "react-router-dom";
import { useAuth } from "@/hooks";
import { useForm } from "react-hook-form";
import axios from "axios";
import type { FormValues } from "@/types/auth/auth";
import { toast } from "react-toastify";



export default function Register() {
  const {
    register,
    handleSubmit,
    // formState: { errors },
  } = useForm<FormValues>();

  const registerMutation = useAuth({ resource: "users" });

  const onSubmit = async (data: FormValues) => {
    // if (data.password !== data.confirmPassword) {
    //   toast.error("Mật khẩu xác nhận không khớp!");
    //   return;
    // }

    try {
      // Kiểm tra email đã tồn tại chưa
      const res = await axios.get(`http://localhost:3000/users?email=${data.email}`);
      if (res.data.length > 0) {
        toast.error("Email đã tồn tại!");
        return;
      }

      registerMutation.mutate(data);
    } catch (error) {
      toast.error("Lỗi khi kiểm tra email. Vui lòng thử lại.");
    }
  };
  
  return (
    <div className="min-h-screen flex">
      <div className="w-1/2 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-3xl font-semibold mb-2">Đăng ký</h2>
          <div className="w-30 h-1 bg-black mx-auto"></div>
        </div>
      </div>

      <div className="w-1/2 flex items-center justify-center border-l">
        <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-sm space-y-5"
        >
         <input
          type="text"
          {...register("lastName")}
          placeholder="Họ"
          className="w-full px-4 py-3 bg-gray-100 rounded focus:outline-none"
          required
        />
        <input
          type="text"
          {...register("firstName")}
          placeholder="Tên"
          className="w-full px-4 py-3 bg-gray-100 rounded focus:outline-none"
          required
        />
        <input
          type="date"
          {...register("dob")}
          placeholder="Ngày sinh"
          className="w-full px-4 py-3 bg-gray-100 rounded focus:outline-none text-gray-400 "
          required
        />
        <div className="flex items-center space-x-4">
          <label className="flex items-center">
            <input
              type="radio"
              {...register("gender")}
              value="male"
              className="mr-2"
              required
            />
            Nam
          </label>
          <label className="flex items-center">
            <input
              type="radio"
              {...register("gender")}
              value="female"
              className="mr-2"
            />
            Nữ
          </label>
        </div>
        <input
          type="email"
          {...register("email")}
          placeholder="Email"
          className="w-full px-4 py-3 bg-gray-100 rounded focus:outline-none"
          required
        />
        <input
          type="password"
          {...register("password")}
          placeholder="Mật khẩu"
          className="w-full px-4 py-3 bg-gray-100 rounded focus:outline-none"
          required
        />
          <div className="flex items-center justify-between">
            <button
              type="submit"
              className="bg-black text-white px-6 py-3 font-semibold rounded hover:opacity-90"
            >
              ĐĂNG KÝ
            </button>

          </div>
          <div className="mt-6  ">
            <Link to="/" className="flex items-center text-gray-600 hover:text-black transition-colors">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 mr-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
              </svg>
              Quay về trang chủ
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}