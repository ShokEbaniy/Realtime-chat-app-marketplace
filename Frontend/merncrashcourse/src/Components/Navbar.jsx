import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { BsFillPlusSquareFill, BsShopWindow } from "react-icons/bs";
import { IoMoon } from "react-icons/io5";
import { LuSun } from "react-icons/lu";
import { LogOut, User, Settings, Menu, X } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore.js";

const Navbar = () => {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
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
    <nav className="sticky top-0 z-40 bg-gray-100 dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Логотип */}
          <Link to="/" className="flex-shrink-0">
            <span className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-green-500 via-green-600 to-green-700 dark:from-green-200 dark:to-green-500 bg-clip-text text-transparent">
              SaveHeal
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              to="/"
              className="p-2 rounded-lg bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors"
              title="магазин"
            >
              <BsShopWindow size={20} className="text-gray-900 dark:text-gray-100" />
            </Link>

            {authUser && (
              <>
                <Link
                  to="/create"
                  className="p-2 rounded-lg bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors"
                  title="создать товар"
                >
                  <BsFillPlusSquareFill size={20} className="text-gray-900 dark:text-gray-100" />
                </Link>

                <Link
                  to="/profile"
                  className="p-2 rounded-lg bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors"
                  title="профиль"
                >
                  <User size={20} className="text-gray-900 dark:text-gray-100" />
                </Link>

                <Link
                  to="/settings"
                  className="p-2 rounded-lg bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors"
                  title="настройки"
                >
                  <Settings size={20} className="text-gray-900 dark:text-gray-100" />
                </Link>

                <button
                  onClick={logout}
                  className="p-2 rounded-lg bg-red-100 dark:bg-red-900/30 hover:bg-red-200 dark:hover:bg-red-900/50 transition-colors"
                  title="выйти"
                >
                  <LogOut size={20} className="text-red-600 dark:text-red-400" />
                </button>
              </>
            )}

            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700 transition-colors"
              title={theme === "light" ? "темная тема" : "светлая тема"}
            >
              {theme === "light" ? (
                <IoMoon size={20} className="text-gray-900" />
              ) : (
                <LuSun size={20} className="text-yellow-400" />
              )}
            </button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-2">
            <button
              onClick={toggleTheme}
              className="p-2 rounded-lg bg-gray-200 dark:bg-gray-800"
            >
              {theme === "light" ? <IoMoon size={20} /> : <LuSun size={20} />}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-gray-200 dark:bg-gray-800"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 space-y-2 border-t border-gray-200 dark:border-gray-700">
            <Link
              to="/"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors"
            >
              <BsShopWindow size={20} />
              <span className="text-gray-900 dark:text-gray-100">магазин</span>
            </Link>

            {authUser && (
              <>
                <Link
                  to="/create"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors"
                >
                  <BsFillPlusSquareFill size={20} />
                  <span className="text-gray-900 dark:text-gray-100">создать товар</span>
                </Link>

                <Link
                  to="/profile"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors"
                >
                  <User size={20} />
                  <span className="text-gray-900 dark:text-gray-100">профиль</span>
                </Link>

                <Link
                  to="/settings"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-800 transition-colors"
                >
                  <Settings size={20} />
                  <span className="text-gray-900 dark:text-gray-100">настройки</span>
                </Link>

                <button
                  onClick={() => {
                    logout();
                    setMobileMenuOpen(false);
                  }}
                  className="flex items-center gap-3 p-3 w-full rounded-lg bg-red-100 dark:bg-red-900/30 hover:bg-red-200 dark:hover:bg-red-900/50 transition-colors"
                >
                  <LogOut size={20} className="text-red-600 dark:text-red-400" />
                  <span className="text-red-600 dark:text-red-400">выйти</span>
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
