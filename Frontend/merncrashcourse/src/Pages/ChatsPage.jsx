import React from "react";
import { useChatStore } from "../store/useChatStore";
import ChatsList from "../Components/ChatsList";
import ChatContainer from "../Components/ChatContainer";
import NoChatSelected from "../Components/NoChatSelected";

const ChatsPage = () => {
  const { selectedUser } = useChatStore();

  return (
    <div className="min-h-screen bg-base-200 pb-24">
      <div className="max-w-7xl mx-auto px-4 pt-4">
        <div className="bg-base-100 rounded-lg shadow-xl overflow-hidden" style={{ height: 'calc(100vh - 10rem)' }}>
          {/* Desktop View */}
          <div className="hidden md:flex h-full">
            <ChatsList />
            {selectedUser ? <ChatContainer /> : <NoChatSelected />}
          </div>

          {/* Mobile View */}
          <div className="flex md:hidden h-full">
            {selectedUser ? <ChatContainer /> : <ChatsList />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatsPage;
