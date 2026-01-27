import React from "react";
import { useChatStore } from "../store/useChatStore";
import ChatsList from "../Components/ChatsList";
import ChatContainer from "../Components/ChatContainer";
import NoChatSelected from "../Components/NoChatSelected";

const ChatsPage = () => {
  const { selectedUser } = useChatStore();

  return (
    <div className="h-screen bg-base-200">
      <div className="flex items-center justify-center pt-5 px-4">
        <div className=" bg-base-200 rounded-lg shadow-cl w-full  h-[calc(100vh-20%)]">
          <div className="hidden md:flex h-full min-h-0 rounded-lg overflow-hidden">
            <ChatsList />
            {selectedUser ? <ChatContainer /> : <NoChatSelected />}
          </div>

          <div className="flex md:hidden h-full min-h-0 rounded-lg overflow-hidden">
            {selectedUser ? <ChatContainer /> : <ChatsList />}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatsPage;
