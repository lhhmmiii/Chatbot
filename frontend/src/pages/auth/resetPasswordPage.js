import React, { useState } from 'react';
import { resetPassword } from '../../services/auth';

const ResetPassword = () => {
  const [account, setAccount] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');

  const handleResetPassword = async (e) => {
    e.preventDefault();

    // Validation (ensure all fields are filled)
    if (!account || !email || !phone) {
      setMessage('Please fill out all fields.');
      return;
    }

    try {
        const data = await resetPassword(account, email, phone);
        console.log(data)
    } catch (error) {
      console.error('Error during reset password:', error);
      setMessage('An error occurred. Please try again later.');
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-br from-purple-400 to-blue-500">
      <form className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md" onSubmit={handleResetPassword}>
        <h2 className="text-3xl font-bold mb-6 text-center text-gray-800">Reset Password</h2>

        {/* Display message */}
        {message && (
          <p className={`text-center mb-4 ${message.includes('sent') ? 'text-green-500' : 'text-red-500'}`}>
            {message}
          </p>
        )}

        {/* Account Field */}
        <input
          type="text"
          placeholder="Tài khoản"
          className="w-full mb-4 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 transition duration-200"
          value={account}
          onChange={(e) => setAccount(e.target.value)}
        />

        {/* Email Field */}
        <input
          type="email"
          placeholder="Email"
          className="w-full mb-4 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 transition duration-200"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        {/* Phone Field */}
        <input
          type="tel"
          placeholder="Số điện thoại"
          className="w-full mb-6 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400 transition duration-200"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-purple-500 text-white py-3 rounded-lg font-semibold text-lg hover:bg-purple-600 transition duration-200"
        >
          Đổi mật khẩu
        </button>

        {/* Back to Login */}
        <p className="mt-4 text-sm text-center text-gray-500">
          Bạn đã nhớ mật khẩu?{' '}
          <a href="/login" className="text-purple-500 hover:underline">
            Login
          </a>
        </p>
      </form>
    </div>
  );
};

export default ResetPassword;
