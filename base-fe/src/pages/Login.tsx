import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import { Link } from "react-router-dom";

export default function Login() {
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
          
          className="w-full max-w-sm space-y-5"
        >
          <input
            type="email"
            name="email"
            placeholder="Email"
            
            className="w-full px-4 py-3 bg-gray-100 rounded focus:outline-none"
            required
          />
          <input
            type="password"
            name="password"
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