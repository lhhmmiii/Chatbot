import React from 'react'

function MessageItem ({ message, index }) {

    return (
        <div
            key={index}
            className={`p-4 mb-4 rounded-xl shadow-md ${
                message.role === 'user'
                ? 'bg-blue-200 text-blue-800 self-end'
                : 'bg-gray-200 text-gray-800 self-start'
            }`}
            >
            {message.text}
        </div>
    )
}

export default MessageItem;