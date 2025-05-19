import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useLogin } from '../hooks/useLogin';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const loginMutation = useLogin();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const data = await loginMutation.mutateAsync({ email, password });
      console.log('Đăng nhập thành công:', data);
      
      // Lưu token và role vào localStorage
      localStorage.setItem('token', data.token);
      localStorage.setItem('role', data.role);

      // Điều hướng theo role
      if (data.role === 'admin') {
        navigate('/admin/dashboard');
      } else {
        navigate('/user/home');
      }
    } catch (error) {
      console.error('Lỗi đăng nhập:', error);
    }
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
          onSubmit={handleSubmit}
          className="w-full max-w-sm space-y-5"
        >
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-3 bg-gray-100 rounded focus:outline-none"
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Mật khẩu"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-3 bg-gray-100 rounded focus:outline-none"
            required
          />
          {loginMutation.isError && (
            <p className="text-red-500 text-sm">
              Đăng nhập thất bại. Vui lòng kiểm tra thông tin.
            </p>
          )}
          <div className="flex items-center justify-between">
            <button
              type="submit"
              disabled={loginMutation.isLoading}
              className="bg-black text-white px-6 py-3 font-semibold rounded hover:opacity-90"
            >
              {loginMutation.isLoading ? 'Đang đăng nhập...' : 'ĐĂNG NHẬP'}
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