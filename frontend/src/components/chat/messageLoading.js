import React from 'react'

function MessageLoading (){
    return (
        <div
            className="p-4 mb-4 rounded-xl shadow-md bg-gray-300 animate-pulse"
        >
            <div className="w-3/4 h-4 bg-gray-400 mb-2"></div>
            <div className="w-1/2 h-4 bg-gray-400"></div>
        </div>
    )
}

export default MessageLoading