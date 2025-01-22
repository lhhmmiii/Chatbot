import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { login} from '../../services/auth';

const Login = () => {
  const [account, setAccount] = useState('');
  const [password, setPassword] = useState('');
  const [resetMessage, setResetMessage] = useState('');

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const data = await login(account, password);
      const token = data['access_token'];
      const user_id = data['user_id'];
      localStorage.setItem('user_id', user_id);
      localStorage.setItem('access_token', token);
      navigate('/');
    } catch (error) {
      console.log(error);
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    try {
      navigate('/reset_password');
    } catch (error) {
      setResetMessage('Failed to send reset link. Please try again.');
      console.log(error);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-br from-blue-400 to-purple-600">
      <form className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-700">Hello</h2>
        <input
          type="text"
          placeholder="Account"
          className="w-full mb-4 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={account}
          onChange={(e) => setAccount(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full mb-6 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-3 rounded-lg font-semibold text-lg hover:bg-blue-600 transition duration-200"
          onClick={handleLogin}
        >
          Login
        </button>

        <p className="mt-4 text-sm text-center text-gray-500">
          Bạn chưa có tài khoản?{' '}
          <a href="/register" className="text-blue-500 hover:underline">
            Đăng ký
          </a>
        </p>

        <div className="mt-6 text-center">
          <button
            className="text-sm text-blue-500 hover:underline"
            onClick={handleResetPassword}
          >
            Quên mật khẩu?
          </button>
        </div>

        {resetMessage && (
          <p className="mt-4 text-center text-sm text-green-500">
            {resetMessage}
          </p>
        )}
      </form>
    </div>
  );
};

export default Login;
