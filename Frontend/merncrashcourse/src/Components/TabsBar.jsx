import React from "react";
import { Newspaper, MessageCircle } from "lucide-react";
import { NavLink } from "react-router-dom";
import { useAuthStore } from "../store/useAuthStore";

const TabsBar = () => {
  const { authUser } = useAuthStore();

  if (!authUser) return null;

  return (
    <div className="fixed z-50 bottom-0 left-0 w-full h-20 bg-gradient-to-r from-green-700 to-green-800 dark:from-green-900 dark:to-green-950 border-t-2 border-green-600 shadow-lg">
      <div className="flex h-full max-w-7xl mx-auto">
        <NavLink
          to="/"
          className={({ isActive }) =>
            `flex-1 flex flex-col justify-center items-center gap-1 transition-all ${
              isActive
                ? "text-white bg-green-600/30"
                : "text-green-100 hover:bg-green-600/20"
            }`
          }
        >
          <Newspaper className="size-7" />
          <span className="text-sm font-medium">магазин</span>
        </NavLink>
        
        <NavLink
          to="/chats"
          className={({ isActive }) =>
            `flex-1 flex flex-col justify-center items-center gap-1 transition-all ${
              isActive
                ? "text-white bg-green-600/30"
                : "text-green-100 hover:bg-green-600/20"
            }`
          }
        >
          <MessageCircle className="size-7" />
          <span className="text-sm font-medium">чаты</span>
        </NavLink>
      </div>
    </div>
  );
};

export default TabsBar;
