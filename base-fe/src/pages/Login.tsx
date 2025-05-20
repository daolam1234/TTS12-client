import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { useLogin } from '../hooks/useLogin';
import type { FormValues } from '@/types/auth/auth';



export default function Login() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormValues>();

  const navigate = useNavigate();
  const loginMutation = useLogin();

  const onSubmit = async (data: FormValues) => {
    try {
      const response = await loginMutation.mutateAsync(data);
      console.log('Đăng nhập thành công:', response);

      // Lưu token và role
      localStorage.setItem('token', response.token);
      localStorage.setItem('role', response.role);

      // Điều hướng theo role
      if (response.role === 'admin') {
        navigate('/admin/dashboard');
      } else {
        navigate('/');
      }
    } catch (err) {
      console.error('Lỗi đăng nhập:', err);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left side */}
      <div className="w-1/2 flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-3xl font-semibold mb-2">Đăng nhập</h2>
          <div className="w-30 h-1 bg-black mx-auto"></div>
        </div>
      </div>

      {/* Right side */}
      <div className="w-1/2 flex items-center justify-center border-l">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full max-w-sm space-y-5"
        >
          {/* Email input */}
          <input
            type="email"
            placeholder="Email"
            {...register('email', {
              required: 'Email là bắt buộc',
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: 'Email không hợp lệ',
              },
            })}
            className="w-full px-4 py-3 bg-gray-100 rounded focus:outline-none"
          />
          {errors.email && (
            <p className="text-red-500 text-sm">{errors.email.message}</p>
          )}

          {/* Password input */}
          <input
            type="password"
            placeholder="Mật khẩu"
            {...register('password', {
              required: 'Mật khẩu là bắt buộc',
              minLength: {
                value: 6,
                message: 'Mật khẩu phải có ít nhất 6 ký tự',
              },
            })}
            className="w-full px-4 py-3 bg-gray-100 rounded focus:outline-none"
          />
          {errors.password && (
            <p className="text-red-500 text-sm">{errors.password.message}</p>
          )}

          {/* Login error */}
          {loginMutation.isError && (
            <p className="text-red-500 text-sm">
              Đăng nhập thất bại. Vui lòng kiểm tra thông tin.
            </p>
          )}

          {/* Submit & Links */}
          <div className="flex items-center justify-between">
            <button
              type="submit"
              disabled={loginMutation.isLoading}
              className="bg-black text-white px-6 py-3 font-semibold rounded hover:opacity-90"
            >
              {loginMutation.isLoading ? 'Đang đăng nhập...' : 'ĐĂNG NHẬP'}
            </button>

            <div className="text-sm text-right space-y-1">
              <Link
                to="/forgot-password"
                className="text-gray-600 hover:underline"
              >
                Quên mật khẩu?
              </Link>
              <div>
                hoặc{' '}
                <Link
                  to="/register"
                  className="text-gray-900 font-medium hover:underline"
                >
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
