// NoChatSelected.jsx
import React from "react";
import { MessageSquare } from "lucide-react"; // npm i lucide-react

const NoChatSelected = () => {
  return (
    <div className="flex-2 pt-36 h-full flex items-center justify-center p-6">
      <div className="text-center max-w-md">
        <div className="mx-auto w-20 h-20 rounded-2xl bg-zinc-700 flex items-center justify-center">
          <MessageSquare className="w-10 h-10 text-zinc-100 animate-bounce" />
        </div>

        <h2 className="mt-5 text-xl font-semibold text-zinc-100">
          No chat selected
        </h2>

        <p className="mt-2 text-zinc-600">
          Select a user to start or continue your conversation.
        </p>
      </div>
    </div>
  );
};

export default NoChatSelected;
