import React, {lazy} from "react";
import MessageLoading from "./messageLoading";
const MessageItem = lazy(() => import("./messageItem"));

function MessageList ({messages}){
    return (
    <div className="h-72 overflow-y-auto border border-gray-300 rounded-xl p-6 mb-6 bg-gray-50">
        {messages.map((message, index) => {
            return (
                <React.Suspense fallback={<MessageLoading />}>
                    <MessageItem message={message} index={index}/>
                </React.Suspense>
            )
        })}
    </div>
    )
}

export default MessageList;