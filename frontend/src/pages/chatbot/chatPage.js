import React, { useState, useEffect, useRef } from 'react';
import { FiSend, FiUpload } from 'react-icons/fi'; // Icons from react-icons
import { FaUserCircle } from 'react-icons/fa'; // Default user avatar icon
import { useNavigate } from 'react-router-dom'; // For navigation
import { createIndex, query, getChatHistory } from '../../services/chatbot';
import MessageList from '../../components/chat/messageList';

function ChatInterface() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [file, setFile] = useState(null);
  const [uploadMessage, setUploadMessage] = useState('');
  const [userId, setUserId] = useState(null);
  const [showUserMenu, setShowUserMenu] = useState(false); // State for dropdown menu
  const ws = useRef(null);
  const navigate = useNavigate();
  const token = localStorage.getItem('access_token');

  // Check token
  useEffect(() => {
    if (!token) {
      navigate('/login');
      return;
    }

    // Check token valid time
    const payload = JSON.parse(atob(token.split('.')[1]));
    const expirationDate = new Date(payload.exp * 1000);
    if (expirationDate < new Date()) {
      alert('Token has expired');
      localStorage.removeItem('access_token');
      navigate('/login');
      return;
    }

    // If token is valid, proceed with fetching user ID
    const storedUserId = localStorage.getItem('user_id');
    if (storedUserId) {
      setUserId(storedUserId);
    }
  }, [token, navigate]);

  // Fetch chat history
  const _getChatHistory = async () => {
    try {
      const response = await getChatHistory(userId); // Fetch chat history
      const formattedMessages = response.map((item) => ({
        role: item.role,
        text: item.text,
      }));
      setMessages(formattedMessages); // Initialize messages state
    } catch (error) {
      console.error('Error fetching chat history:', error);
    }
  };

  // Fetch chat history when user ID is available
  useEffect(() => {
    if (userId) {
      _getChatHistory();
    }
  }, [userId]);

  // WebSocket setup
  useEffect(() => {
    if (userId && !ws.current) {
      ws.current = new WebSocket(`ws://localhost:8000/ws/${userId}`);
      ws.current.onopen = () => console.log('Connected to WebSocket server.');
      ws.current.onmessage = (event) => {
        try {
          const message = JSON.parse(event.data);
          setMessages((prevMessages) => [...prevMessages, message]);
        } catch (error) {
          console.error('Error parsing WebSocket message:', error);
        }
      };
      ws.current.onerror = (error) => console.error('WebSocket Error: ', error);
      ws.current.onclose = () => console.log('WebSocket closed');
    }
  }, [userId]);

  // Handle logout
  const handleLogout = () => {
    localStorage.removeItem('user_id');
    localStorage.removeItem('access_token');
    navigate('/login'); // Navigate to login page
  };

  // Toggle user menu
  const toggleUserMenu = () => {
    setShowUserMenu((prev) => !prev);
  };

  // User sends a message
  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (input.trim()) {
      const userMessage = { role: 'user', text: input };
      setMessages((prevMessages) => [...prevMessages, userMessage]);

      if (ws.current && ws.current.readyState === WebSocket.OPEN) {
        ws.current.send(JSON.stringify(userMessage));
      } else {
        console.error('Websocket is not open.');
      }

      setInput('');
      try {
        const response = await query(input, userId);
        const queryMessage = { role: 'system', text: response.response };
        setMessages((prevMessages) => [...prevMessages, queryMessage]);

        if (ws.current && ws.current.readyState === WebSocket.OPEN) {
          ws.current.send(JSON.stringify(queryMessage));
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setUploadMessage('');
    }
  };

  const handleFileUpload = async (e) => {
    e.preventDefault();
    if (!file) {
      setUploadMessage('No file selected.');
      return;
    }
    try {
      const data = await createIndex(file, userId);
      console.log('File uploaded successfully:', data);
      setUploadMessage(`File processed: ${file.name}`);
      setFile(null);
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500">
      <div className="w-full max-w-2xl bg-white rounded-3xl shadow-lg p-8">
        {/* Header Section */}
        <div className="flex justify-between items-center mb-6 relative">
          <div className="relative">
            <FaUserCircle
              size={40}
              className="text-gray-400 cursor-pointer hover:text-gray-600"
              onClick={toggleUserMenu}
            />
            {showUserMenu && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg border">
                <ul className="py-2">
                  <li className="px-4 py-2 hover:bg-gray-100 cursor-pointer">
                    Thông tin tài khoản
                  </li>
                  <li
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer text-red-500"
                    onClick={handleLogout}
                  >
                    Đăng xuất
                  </li>
                </ul>
              </div>
            )}
          </div>
          <h2 className="text-lg font-semibold text-gray-700">Chat Interface</h2>
        </div>

        <MessageList messages={messages} />
        <form className="flex items-center mb-6" onSubmit={handleSendMessage}>
          <input
            type="text"
            placeholder="Type a message..."
            className="flex-grow p-4 border border-gray-300 rounded-lg mr-3 focus:outline-none focus:ring-2 focus:ring-indigo-500"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          {uploadMessage && (
            <div className="mt-2 text-red-500 text-sm">{uploadMessage}</div>
          )}
          <button
            type="submit"
            className="bg-indigo-500 text-white p-4 rounded-lg hover:bg-indigo-600"
          >
            <FiSend size={22} />
          </button>
        </form>
        <form className="flex flex-col items-center" onSubmit={handleFileUpload}>
          <div className="flex items-center mb-4">
            <input
              type="file"
              id="file-upload"
              className="hidden"
              onChange={handleFileChange}
            />
            <label
              htmlFor="file-upload"
              className="cursor-pointer text-indigo-500 hover:text-indigo-700 flex items-center text-lg font-medium"
            >
              <FiUpload size={26} className="mr-3" />
              {file ? file.name : 'Upload a file'}
            </label>
          </div>
          <button
            type="submit"
            className="mt-4 bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600"
          >
            Submit File
          </button>
        </form>
      </div>
    </div>
  );
}

export default ChatInterface;
