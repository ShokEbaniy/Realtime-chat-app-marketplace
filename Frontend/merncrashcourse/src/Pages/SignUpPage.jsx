import React from "react";
import {
  MessageSquare,
  Eye,
  EyeOff,
  User,
  Mail,
  Lock,
  Loader2,
} from "lucide-react";
import { useAuthStore } from "../store/useAuthStore.js";
import { NavLink } from "react-router-dom";
import AuthImagePattern from "../Components/AuthImagePattern.jsx";
import toast from "react-hot-toast";
import { Toaster } from "react-hot-toast";

const SignUpPage = () => {
  // 1. ДОСТАЕМ signup ИЗ СТОРА (ты забыл это сделать)
  const { isSigningUp, signup } = useAuthStore();

  const [formData, setFormData] = React.useState({
    userName: "",
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = React.useState(false);

  // 2. ФУНКЦИЯ ОТПРАВКИ ФОРМЫ
  const handleSubmit = (e) => {
    e.preventDefault(); // Чтобы страница не перезагружалась
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      toast.error("Invalid email format");
      return false;
    }
    if (formData.password.trim().length < 6) {
      toast.error("Password must be at least 6 characters long");
      return false;
    }
    if (formData.userName.trim() === "") {
      toast.error("Username cannot be empty");
      return false;
    }
    signup(formData); // Вызываем функцию из zustand
  };

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      <div className="flex flex-col justify-center items-center p-6 sm:p-12 mt-20 lg:pt-0 relative">
        {/* 3. ОБЯЗАТЕЛЬНО: ЗАМЕНИЛ DIV НА FORM И ДОБАВИЛ onSubmit */}
        <form
          onSubmit={handleSubmit}
          className="flex flex-col gap-3 items-center w-full max-w-md border-8 border-green-700/25 bg-[#0b3d1a]/40 rounded-lg py-10 shadow-2xl"
        >
          <div className="flex flex-col items-center justify-center mb-2 h-16 w-16 bg-green-300/40 rounded-lg">
            <MessageSquare size={48} className="text-green-600" />
          </div>

          <h2 className="text-3xl font-bold mb-1 text-white">Create Account</h2>
          <h5 className="text-md mb-6 text-white/70 text-center px-4">
            Please fill in the form to create an account.
          </h5>

          {/* Username */}
          <label className="label w-full px-8 justify-start">
            <span className="label-text text-white font-bold">Username</span>
          </label>
          <div className="relative w-[90%]">
            <User className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 size-5 text-base-content/40" />
            <input
              className="input input-bordered w-full pl-10"
              type="text"
              placeholder="John Pork"
              value={formData.userName}
              onChange={(e) =>
                setFormData({ ...formData, userName: e.target.value })
              }
            />
          </div>

          {/* Email */}
          <label className="label w-full px-8 justify-start">
            <span className="label-text text-white font-bold">Email</span>
          </label>
          <div className="relative w-[90%]">
            <Mail className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 size-5 text-base-content/40" />
            <input
              className="input input-bordered w-full pl-10"
              type="email"
              placeholder="email@gmail.com"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
          </div>

          {/* Password */}
          <label className="label w-full px-8 justify-start">
            <span className="label-text text-white font-bold">Password</span>
          </label>
          <div className="relative w-[90%]">
            <Lock className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 size-5 text-base-content/40" />
            <button
              type="button" // Важно: type="button", чтобы эта кнопка НЕ отправляла форму
              className="absolute right-3 top-1/2 -translate-y-1/2 z-10 p-1"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <Eye className="size-5 text-base-content/40" />
              ) : (
                <EyeOff className="size-5 text-base-content/40" />
              )}
            </button>
            <input
              className="input input-bordered w-full pl-10 pr-10"
              type={showPassword ? "text" : "password"}
              placeholder="********"
              value={formData.password}
              onChange={(e) =>
                setFormData({ ...formData, password: e.target.value })
              }
            />
          </div>

          {/* Submit Button */}
          {/* Эта кнопка с type="submit" теперь сработает, потому что она внутри <form> */}
          <button
            type="submit"
            className="btn btn-green w-[90%] h-12 mt-6 font-bold text-lg"
            disabled={isSigningUp}
          >
            {isSigningUp ? (
              <Loader2 className="animate-spin" />
            ) : (
              "Create Account"
            )}
          </button>

          <div className="text-center mt-4">
            <p className="text-base-content/40">
              Already have an account?{" "}
              <NavLink
                to="/login"
                className={({ isActive }) =>
                  !isActive
                    ? "text-green-400 hover:text-green-300 font-bold"
                    : "text-white/80"
                }
              >
                Login
              </NavLink>
            </p>
          </div>
        </form>{" "}
        {/* Конец формы */}
        <div className="lg:absolute lg:bottom-4 mt-8 lg:mt-0 text-white/50 text-sm">
          &copy; 2026 SaveHeal Foods. All rights reserved.
        </div>
      </div>

      <AuthImagePattern
        title="Join our community"
        subtitle="Connect with friends, share moments, and stay in touch with your loved ones."
      />
      <Toaster />
    </div>
  );
};

export default SignUpPage;
