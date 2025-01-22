import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './pages/auth/loginPage';
import Register from './pages/auth/registerPage';
import ChatInterface from './pages/chatbot/chatPage';
import ResetPassword from './pages/auth/resetPasswordPage';

const App = () => {
  return (
    <div>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={<ChatInterface />} />
        <Route path="reset_password" element={<ResetPassword />} />
      </Routes>
    </div>
  );
};

export default App;