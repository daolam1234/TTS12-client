import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Link } from "react-router-dom";
import { useLogin } from "@/hooks";
import { useForm } from "react-hook-form";
import axios from "axios";
import type { FormValuesLogin } from "@/types/auth/auth";



export default function Login() {
  const {
    register,
    handleSubmit,
    // formState: { errors },
  } = useForm<FormValuesLogin>();

  const loginMutation = useLogin();

  const onSubmit = (data: FormValuesLogin) => {
    loginMutation.mutate(data);
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
            <h2 className="text-3xl font-semibold mb-2">Đăng Nhập</h2>
            <div className="w-30 h-1 bg-black mx-auto"></div>
          </div>
        </div>

        <div className="w-full flex items-center justify-center border-l">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="w-full max-w-sm space-y-5"
          >
            <input
              type="email"
              {...register("email")}
              placeholder="Email"
              className="w-full px-4 py-3 bg-gray-100 rounded focus:outline-none max-sm:w-40"
              required
            />
            <input
              type="password"
              {...register("password")}
              placeholder="Mật khẩu"
              className="w-full px-4 py-3 bg-gray-100 rounded focus:outline-none max-sm:w-40"
              required
            />
            <div className="flex flex-col gap-5 items-center justify-between ">
              <button
                type="submit"
                className="bg-black text-white px-6 py-3 font-semibold rounded hover:opacity-90 w-40"
              >
                ĐĂNG NHẬP
              </button>
              <div className="text-sm text-right space-y-1">
                <Link to="/forgot-password" className="text-gray-600 hover:underline">
                  Quên mật khẩu?
                </Link>
                <div>
                  hoặc{' '}
                  <Link to="/register" className="text-gray-900 font-medium hover:underline">
                    Đăng ký
                  </Link>
                </div>
              </div>
            </div>
          </form>
        </div>
      </div>

    </div>
  );
}