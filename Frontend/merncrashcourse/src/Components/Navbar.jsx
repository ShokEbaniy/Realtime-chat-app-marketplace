import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { BsFillPlusSquareFill, BsShopWindow } from "react-icons/bs";
import { IoMoon } from "react-icons/io5";
import { LuSun } from "react-icons/lu";
import { LogOut, User, Settings } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore.js";

const Navbar = () => {
  // Логика темной темы для Tailwind (без Chakra)
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const { logout, authUser } = useAuthStore();
  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    // Контейнер (Navbar)
    <div className="max-w-[1140px] mx-auto px-4 border-b border-gray-200 dark:border-gray-700 pb-4 mb-8 bg-gray-100 dark:bg-gray-900 transition-colors duration-300">
      {/* Flex Layout */}
      <div className="flex flex-col md:flex-row h-auto md:h-16 items-center justify-between">
        {/* Логотип с градиентом */}
        <div className="font-bold text-3xl md:text-2xl mt-4 md:mt-0">
          <Link to="/">
            <span className="bg-gradient-to-r from-green-500 via-green-600 to-green-700 dark:from-green-200 dark:to-green-500 bg-clip-text text-transparent">
              SaveHeal foods
            </span>
          </Link>
        </div>
        <div className="w-full relative">
          {authUser && (
            <>
              <LogOut
                size={24}
                className="size-[44px] absolute -top-2 right-[4%] text-white hover:cursor-pointer hover:text-gray-300 transition-colors duration-100"
                onClick={logout}
              />
              <NavLink to="/profile">
                <User
                  size={24}
                  className="size-[44px] absolute -top-2 left-[4%] text-white hover:cursor-pointer hover:text-gray-300 transition-colors duration-100"
                />
              </NavLink>
              <NavLink to="/settings">
                <Settings
                  size={24}
                  className="size-[44px] absolute -top-2 left-[16%] text-white hover:cursor-pointer hover:text-gray-300 transition-colors duration-100"
                />
              </NavLink>
            </>
          )}
        </div>

        {/* Правая часть (Кнопки) */}
        <div className="flex items-center gap-8 md:gap-4 mt-8 md:mt-2">
          {/* Кнопка Home */}
          <Link to="/">
            <div className="p-3 bg-gray-200 dark:bg-gray-800 rounded-md transition-all duration-300 hover:bg-gray-300 dark:hover:bg-gray-700 text-gray-900 dark:text-gray-100">
              <BsShopWindow size={24} className="md:size-[28px]" />
            </div>
          </Link>

          {/* Кнопка Create */}
          <Link to="/create">
            <div className="p-3 bg-gray-200 dark:bg-gray-800 rounded-md transition-all duration-300 hover:bg-gray-300 dark:hover:bg-gray-700 text-gray-900 dark:text-gray-100">
              <BsFillPlusSquareFill size={24} className="md:size-[28px]" />
            </div>
          </Link>

          {/* Переключатель темы */}
          <button
            onClick={toggleTheme}
            className="p-3 bg-gray-200 dark:bg-gray-800 rounded-md transition-all duration-300 hover:bg-gray-300 dark:hover:bg-gray-700 text-gray-900 dark:text-gray-100"
          >
            {theme === "light" ? <IoMoon size={24} /> : <LuSun size={24} />}
          </button>

          {/* Твоя DaisyUI кнопка (оставил как есть) */}
          <button className="btn btn-soft btn-accent btn-lg">=</button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
