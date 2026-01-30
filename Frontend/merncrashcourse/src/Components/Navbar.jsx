import React, { useState } from "react";
import { Link } from "react-router-dom";
import { BsFillPlusSquareFill, BsShopWindow } from "react-icons/bs";
import { LogOut, User, Settings, Menu, X } from "lucide-react";
import { useAuthStore } from "../store/useAuthStore.js";

const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { logout, authUser } = useAuthStore();

  return (
    <nav className="sticky top-0 z-40 bg-base-100 border-b border-base-300 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex-shrink-0">
            <span className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-green-500 via-green-600 to-green-700 bg-clip-text text-transparent">
              SaveHeal
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-3">
            <Link
              to="/"
              className="p-2 rounded-lg bg-base-200 hover:bg-base-300 transition-colors"
              title="магазин"
            >
              <BsShopWindow size={20} className="text-base-content" />
            </Link>

            {authUser && (
              <>
                <Link
                  to="/create"
                  className="p-2 rounded-lg bg-base-200 hover:bg-base-300 transition-colors"
                  title="создать товар"
                >
                  <BsFillPlusSquareFill size={20} className="text-base-content" />
                </Link>
                <Link
                  to="/profile"
                  className="p-2 rounded-lg bg-base-200 hover:bg-base-300 transition-colors"
                  title="профиль"
                >
                  <User size={20} className="text-base-content" />
                </Link>
                <Link
                  to="/settings"
                  className="p-2 rounded-lg bg-base-200 hover:bg-base-300 transition-colors"
                  title="настройки"
                >
                  <Settings size={20} className="text-base-content" />
                </Link>
                <button
                  onClick={logout}
                  className="p-2 rounded-lg bg-error/10 hover:bg-error/20 transition-colors"
                  title="выйти"
                >
                  <LogOut size={20} className="text-error" />
                </button>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg bg-base-200 hover:bg-base-300 transition-colors"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 space-y-2 border-t border-base-300">
            <Link
              to="/"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-3 p-3 rounded-lg hover:bg-base-200 transition-colors"
            >
              <BsShopWindow size={20} />
              <span>магазин</span>
            </Link>

            {authUser && (
              <>
                <Link
                  to="/create"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-base-200 transition-colors"
                >
                  <BsFillPlusSquareFill size={20} />
                  <span>создать товар</span>
                </Link>

                <Link
                  to="/profile"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-base-200 transition-colors"
                >
                  <User size={20} />
                  <span>профиль</span>
                </Link>

                <Link
                  to="/settings"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-3 p-3 rounded-lg hover:bg-base-200 transition-colors"
                >
                  <Settings size={20} />
                  <span>настройки</span>
                </Link>

                <button
                  onClick={() => {
                    logout();
                    setMobileMenuOpen(false);
                  }}
                  className="flex items-center gap-3 p-3 w-full rounded-lg bg-error/10 hover:bg-error/20 transition-colors"
                >
                  <LogOut size={20} className="text-error" />
                  <span className="text-error">выйти</span>
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
