import React from "react";
import { useChatStore } from "../store/useChatStore";
import { ArrowLeft } from "lucide-react";
import MessageSkeleton from "./skeletons/MessageSkeleton";
import MessageHeader from "./ChatFol//MessageHeader";
import MessageInput from "./ChatFol//MessageInput";
import { useAuthStore } from "../store/useAuthStore";
import profileDefaultPic from "../images/profileDefaultPic.jpg";
import { formatTime } from "../utils/timeFormat";
const ChatContainer = () => {
  const { authUser } = useAuthStore();
  const {
    selectedUser,
    messages,
    isMessagesLoading,
    getMessages,
    setSelectedUser,
  } = useChatStore();

  const listRef = React.useRef(null);

  React.useLayoutEffect(() => {
    const el = listRef.current;
    if (!el) return;
    el.scrollTop = el.scrollHeight;
  }, [messages.length]);

  React.useEffect(() => {
    if (selectedUser) {
      getMessages();
    }
  }, [selectedUser._id, getMessages]);

  if (isMessagesLoading) {
    return (
      <div className="flex-1 relative flex flex-col overflow-auto">
        <MessageHeader user={selectedUser} />
        <MessageSkeleton />
        <MessageInput />
      </div>
    );
  }

  return (
    <div className="flex-1 min-h-0 flex flex-col overflow-x-hidden  ">
      <MessageHeader user={selectedUser} />
      <div
        ref={listRef}
        className="flex-1 min-h-0 overflow-y-auto p-4 space-y-4 mt-20 mb-32 "
      >
        {messages.map((message) => (
          <div
            key={message._id}
            className={`chat ${message.senderId === authUser._id ? "chat-end" : "chat-start"}`}
          >
            <div className="chat-image avatar">
              <div className="w-10 rounded-full">
                <img
                  src={
                    message.senderId === authUser._id
                      ? authUser.profilePic || profileDefaultPic
                      : selectedUser.profilePic || profileDefaultPic
                  }
                />
              </div>
            </div>
            <div className="chat-bubble flex-col">
              {message.image && (
                <img
                  src={message.image}
                  alt="message"
                  className="rounded-xl  py-2"
                />
              )}
              {message.text && <p>{message.text}</p>}
            </div>
            <div className="chat-footer opacity-50">
              {formatTime(message.createdAt)}
            </div>
          </div>
        ))}
      </div>
      <MessageInput />
    </div>
  );
};

export default ChatContainer;
