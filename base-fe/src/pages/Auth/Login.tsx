import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Link } from "react-router-dom";
import { useAuth } from "@/hooks";
import { useForm } from "react-hook-form";
import axios from "axios";
import type { FormValuesLogin } from "@/types/auth/auth";



export default function Login() {
  const {
    register,
    handleSubmit,
    // formState: { errors },
  } = useForm<FormValuesLogin>();

  const loginMutation = useAuth({ resource: "users" });

  const onSubmit = (data: FormValuesLogin) => {
    loginMutation.mutate(data);
  };

  return (
   <div className="min-h-screen flex flex-col justify-center items-center gap-10">
      <div className="w-1/2 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-3xl font-semibold mb-2">Đăng nhập</h2>
          <div className="w-30 h-1 bg-black mx-auto"></div>
        </div>
      </div>

      <div className="w-1/2 flex items-center justify-center border-l">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full max-w-sm space-y-5"
        >
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
  );
}