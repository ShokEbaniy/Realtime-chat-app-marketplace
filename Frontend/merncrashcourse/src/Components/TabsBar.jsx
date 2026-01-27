import React from "react";
import { Newspaper, MessageCircle } from "lucide-react";
import { NavLink } from "react-router-dom";

const TabsBar = () => {
  return (
    <div className="fixed z-50 h-20 w-full bg-green-800 border-black border-t-4 left-0 bottom-0 flex justify-center items-center ">
      <NavLink
        to="/news"
        className="flex-1 flex flex-col text-white p-4 justify-center items-center"
      >
        {" "}
        <Newspaper className="size-10" /> News
      </NavLink>
      <NavLink
        to="/chats"
        className="flex-1 flex flex-col text-white p-4 justify-center items-center"
      >
        {" "}
        <MessageCircle className="size-10" /> Chats
      </NavLink>
    </div>
  );
};

export default TabsBar;
