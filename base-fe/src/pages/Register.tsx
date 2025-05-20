import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import type { FormValues } from "@/types/auth/auth";



export default function Register() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const registerMutation = useAuth({ resource: "register" });

  const onSubmit = (data: FormValues) => {
    registerMutation.mutate(data);
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
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full max-w-sm space-y-5"
        >
          <input
            type="text"
            placeholder="Họ"
            {...register("lastName", { required: "Họ là bắt buộc" })}
            className="w-full px-4 py-3 bg-gray-100 rounded"
          />
          {errors.lastName && (
            <p className="text-red-500 text-sm">{errors.lastName.message}</p>
          )}

          <input
            type="text"
            placeholder="Tên"
            {...register("firstName", { required: "Tên là bắt buộc" })}
            className="w-full px-4 py-3 bg-gray-100 rounded"
          />
          {errors.firstName && (
            <p className="text-red-500 text-sm">{errors.firstName.message}</p>
          )}

          <input
            type="date"
            {...register("dob", { required: "Ngày sinh là bắt buộc" })}
            className="w-full px-4 py-3 bg-gray-100 rounded text-gray-400"
          />
          {errors.dob && (
            <p className="text-red-500 text-sm">{errors.dob.message}</p>
          )}

          <div className="flex items-center space-x-4">
            <label className="flex items-center">
              <input
                type="radio"
                value="male"
                {...register("gender", { required: "Giới tính là bắt buộc" })}
                className="mr-2"
              />
              Nam
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                value="female"
                {...register("gender")}
                className="mr-2"
              />
              Nữ
            </label>
          </div>
          {errors.gender && (
            <p className="text-red-500 text-sm">{errors.gender.message}</p>
          )}

          <input
            type="email"
            placeholder="Email"
            {...register("email", { required: "Email là bắt buộc" })}
            className="w-full px-4 py-3 bg-gray-100 rounded"
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email.message}</p>
          )}

          <input
            type="password"
            placeholder="Mật khẩu"
            {...register("password", { required: "Mật khẩu là bắt buộc" })}
            className="w-full px-4 py-3 bg-gray-100 rounded"
          />
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password.message}</p>
          )}

          <div className="flex items-center justify-between">
            <button
              type="submit"
              disabled={registerMutation.isLoading}
              className="bg-black text-white px-6 py-3 font-semibold rounded hover:opacity-90"
            >
              {registerMutation.isLoading ? "Đang đăng ký..." : "ĐĂNG KÝ"}
            </button>
          </div>

          <div className="mt-6">
            <Link
              to="/"
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
