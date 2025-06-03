import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Link, } from "react-router-dom";
import { useRegister } from "@/hooks";
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

  const registerMutation = useRegister();

  const onSubmit = async (data: FormValues) => {

    try {
      registerMutation.mutate(data);
    } catch (error) {
      toast.error("Lỗi khi kiểm tra email. Vui lòng thử lại.");
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50 max-sm:items-center max-sm:justify-center ">

      <div className="w-1/2 flex justify-center items-center max-sm:hidden">
        <img
          src="https://i.pinimg.com/originals/47/67/b8/4767b82fe7c0743c05a19a77e592550c.jpg"
          alt=""
          className="object-cover h-full w-full"
        />
      </div>
    
      <div className="w-1/2 flex flex-col justify-center items-center gap-10">
        <div className="w-full flex items-center justify-center">
          <div className="text-center">
            <h2 className="text-3xl font-semibold mb-2">Đăng ký</h2>
            <div className="w-30 h-1 bg-black mx-auto"></div>
          </div>
        </div>
        <div className="w-full flex items-center justify-center border-l">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="w-full max-w-sm space-y-5"
          >
            <input
              type="text"
              {...register("fullName")}
              placeholder="Họ và tên"
              className="w-full px-4 py-3 bg-gray-100 rounded focus:outline-none"
              required
            />
            <input
              type="text"
              {...register("phone")}
              placeholder="Số điện thoại"
              className="w-full px-4 py-3 bg-gray-100 rounded focus:outline-none"
              required
            />

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
            <div className="mt-6">
              <Link
                to="/homepage"
                className="flex items-center text-gray-600 hover:text-black transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 mr-2"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
                Quay về trang chủ
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>

  );
}