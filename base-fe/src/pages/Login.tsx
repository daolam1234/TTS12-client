import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import type { FormValues } from "@/types/auth/auth";

export default function Login() {
  const { register, handleSubmit, formState: { errors } } = useForm<FormValues>();
  const loginMutation = useAuth({ resource: "login" });

  const onSubmit = (data: FormValues) => {
    loginMutation.mutate(data);
  };

  return (
    <div className="min-h-screen flex">
      {/* Left section */}
      <div className="w-1/2 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-3xl font-semibold mb-2">Đăng nhập</h2>
          <div className="w-30 h-1 bg-black mx-auto"></div>
        </div>
      </div>

      {/* Right section */}
      <div className="w-1/2 flex items-center justify-center border-l">
        <form onSubmit={handleSubmit(onSubmit)} className="w-full max-w-sm space-y-5">
          {/* Email input */}
          <input
            type="email"
            placeholder="Email"
            {...register("email", { required: "Email là bắt buộc" })}
            className="w-full px-4 py-3 bg-gray-100 rounded"
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}

          {/* Password input */}
          <input
            type="password"
            placeholder="Mật khẩu"
            {...register("password", { required: "Mật khẩu là bắt buộc" })}
            className="w-full px-4 py-3 bg-gray-100 rounded"
          />
          {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}

          {/* Login error */}
          {loginMutation.isError && (
            <p className="text-red-500 text-sm">Đăng nhập thất bại.</p>
          )}

          {/* Submit + links */}
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
                hoặc{" "}
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
