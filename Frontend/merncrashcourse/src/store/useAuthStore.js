import { create } from "zustand";
import { axiosInstance } from "../config/axios.config.js";
import toast from "react-hot-toast";
import { io } from "socket.io-client";

const BASE_URL = "http://localhost:5001";

export const useAuthStore = create((set, get) => ({
  authUser: null,
  onlineUsers: [],
  isSigningUp: false,
  isLogging: false,
  isUpdatingProfile: false,
  isCheckingAuth: true,
  socket: null,

  checkAuth: async () => {
    try {
      const res = await axiosInstance.get("/auth/check");
      set({ authUser: res.data });

      get().connectSocket();
    } catch (e) {
      set({ authUser: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  signup: async (user) => {
    try {
      console.log(user);
      set({ isSigningUp: true });
      const res = await axiosInstance.post("/auth/signup", user);
      set({ authUser: res.data });

      get().connectSocket();
      toast.success("Account created successfully");
    } catch (e) {
      toast.error(e.response?.data?.message || e.message);
      return {
        success: false,
        message: e.response?.data?.message || e.message,
      };
    } finally {
      set({ isSigningUp: false });
    }
  },

  login: async (credentials) => {
    try {
      set({ isLogging: true });
      const res = await axiosInstance.post("/auth/login", credentials);
      set({ authUser: res.data });

      get().connectSocket();
      toast.success("Login successful");
    } catch (e) {
      toast.error(e.response?.data?.message || e.message);
      return {
        success: false,
        message: e.response?.data?.message || e.message,
      };
    } finally {
      set({ isLogging: false });
    }
  },

  logout: async () => {
    try {
      await axiosInstance.post("/auth/logout");
      get().disconnectSocket();
      set({ authUser: null });
    } catch (e) {
      toast.error(e.response?.data?.message || e.message);
    }
  },

  updateProfile: async (userData) => {
    try {
      set({ isUpdatingProfile: true });
      const res = await axiosInstance.put("/auth/update-profile", userData);
      set({ authUser: res.data });
      toast.success("Profile updated successfully");
    } catch (e) {
      toast.error(e.response?.data?.message || e.message);
      return {
        success: false,
        message: e.response?.data?.message || e.message,
      };
    } finally {
      set({ isUpdatingProfile: false });
    }
  },
  connectSocket: () => {
    const { authUser, socket } = get();
    if (!authUser || socket?.connected) return;

    const newSocket = io(BASE_URL, {
      withCredentials: true,
      query: { userId: authUser._id },
    });

    set({ socket: newSocket });

    newSocket.on("getOnlineUsers", (users) => {
      set({ onlineUsers: users });
    });
  },
  disconnectSocket: () => {
    get().socket?.disconnect();
    set({ socket: null });
  },
}));
