import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { register } from '../../services/auth';

const Register = () => {
  const [name, setName] = useState('');
  const [account, setAccount] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      if (password !== password2) {
        setMessage("Passwords do not match");
        return;
      }
      const data = await register(name, account, email, phone, password);
      console.log(data);
      setMessage("Registration successful! Redirecting to login...");
      setTimeout(() => navigate('/login'), 2000);
    } catch (error) {
      setMessage("Error during registration. Please try again.");
      console.log("Error during registration:", error);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-br from-green-400 to-blue-500">
      <form className="bg-white p-8 rounded-lg shadow-xl w-full max-w-md">
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">
          Tạo tài khoản
        </h2>

        {/* Thông báo */}
        {message && (
          <p className={`text-center mb-4 ${message.includes("successful") ? "text-green-500" : "text-red-500"}`}>
            {message}
          </p>
        )}

        {/* Trường nhập Name */}
        <input
          type="text"
          placeholder="Name"
          className="w-full mb-4 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 transition duration-200"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        {/* Trường nhập Account */}
        <input
          type="text"
          placeholder="Tài khoản"
          className="w-full mb-4 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 transition duration-200"
          value={account}
          onChange={(e) => setAccount(e.target.value)}
        />

        {/* Trường nhập Email */}
        <input
          type="email"
          placeholder="Email"
          className="w-full mb-4 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 transition duration-200"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        {/* Trường nhập Phone */}
        <input
          type="tel"
          placeholder="Số điện thoại"
          className="w-full mb-4 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 transition duration-200"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />

        {/* Trường nhập Password */}
        <input
          type="password"
          placeholder="Mật khẩu"
          className="w-full mb-4 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 transition duration-200"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {/* Trường nhập Password lần 2 */}
        <input
          type="password"
          placeholder="Nhập lại mật khẩu"
          className="w-full mb-6 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 transition duration-200"
          value={password2}
          onChange={(e) => setPassword2(e.target.value)}
        />

        {/* Nút submit */}
        <button
          type="submit"
          className="w-full bg-green-500 text-white py-3 rounded-lg font-semibold text-lg hover:bg-green-600 transition duration-200"
          onClick={handleRegister}
        >
          Đăng ký
        </button>

        {/* Liên kết đến trang đăng nhập */}
        <p className="mt-4 text-sm text-center text-gray-500">
          Bạn đã có tài khoản?{' '}
          <a href="/login" className="text-green-500 hover:underline">
            Đăng nhập
          </a>
        </p>
      </form>
    </div>
  );
};

export default Register;
