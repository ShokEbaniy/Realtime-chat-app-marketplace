import React from "react";
import { useChatStore } from "../store/useChatStore";
import MessageSkeleton from "./skeletons/MessageSkeleton";
import MessageHeader from "./ChatFol/MessageHeader";
import MessageInput from "./ChatFol/MessageInput";
import { useAuthStore } from "../store/useAuthStore";
import profileDefaultPic from "../images/profileDefaultPic.jpg";
import { formatTime } from "../utils/timeFormat";

const ChatContainer = () => {
  const { authUser } = useAuthStore();
  const {
    subscribeToMessages,
    unsubscribeToMessages,
    selectedUser,
    messages,
    isMessagesLoading,
    getMessages,
  } = useChatStore();

  const messagesEndRef = React.useRef(null);

  React.useEffect(() => {
    if (selectedUser) {
      getMessages();
    }
    subscribeToMessages();
    return () => {
      unsubscribeToMessages();
    };
  }, [
    selectedUser?._id,
    getMessages,
    subscribeToMessages,
    unsubscribeToMessages,
  ]);

  React.useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  if (isMessagesLoading) {
    return (
      <div className="flex-1 flex flex-col h-full">
        <MessageHeader user={selectedUser} />
        <div className="flex-1 overflow-y-auto">
          <MessageSkeleton />
        </div>
        <MessageInput />
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col h-full relative">
      {/* Header - Fixed */}
      <MessageHeader user={selectedUser} />

      {/* Messages - Scrollable */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 custom-scrollbar bg-base-200">
        {messages.length === 0 ? (
          <div className="text-center text-gray-500 mt-10">
            напиши что нибудь 💬
          </div>
        ) : (
          messages.map((message) => (
            <div
              key={message._id}
              className={`chat ${
                message.senderId === authUser._id ? "chat-end" : "chat-start"
              }`}
            >
              <div className="chat-image avatar">
                <div className="w-10 rounded-full">
                  <img
                    src={
                      message.senderId === authUser._id
                        ? authUser.profilePic || profileDefaultPic
                        : selectedUser.profilePic || profileDefaultPic
                    }
                    alt="avatar"
                  />
                </div>
              </div>
              <div className="chat-bubble flex-col items-start">
                {message.image && (
                  <img
                    src={message.image}
                    alt="attachment"
                    className="rounded-xl max-w-xs mb-2"
                  />
                )}
                {message.text && <p>{message.text}</p>}
              </div>
              <div className="chat-footer opacity-50 text-xs mt-1">
                {formatTime(message.createdAt)}
              </div>
            </div>
          ))
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input - Fixed */}
      <MessageInput />
    </div>
  );
};

export default ChatContainer;
