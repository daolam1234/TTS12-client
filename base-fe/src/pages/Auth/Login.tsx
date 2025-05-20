import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Link } from "react-router-dom";
import { useAuth } from "@/hooks";
import { useForm } from "react-hook-form";
import axios from "axios";


type FormValuesLogin = {
  email: string;
  password: string;
};
  
export default function Login() {
const { mutate } = useAuth({ resource: "users" });

  const { handleSubmit, register } = useForm<FormValuesLogin>();
 const onSubmit = async (data: FormValuesLogin) => {
  const res = await axios.get(
    `http://localhost:3000/users?email=${data.email}&password=${data.password}`
  );
  if (res.data.length === 0) {
    alert("Sai tài khoản hoặc mật khẩu!");
    return;
  }
  mutate(data);
};
  return (
   <div className="min-h-screen flex">
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