import { create } from "zustand";
import { axiosInstance } from "../config/axios.config.js";
import toast from "react-hot-toast";
import { io } from "socket.io-client";

const BASE_URL =
  import.meta.env.MODE === "development"
    ? "http://localhost:5001/api"
    : import.meta.env.VITE_API_URL;

const SOCKET_URL =
  import.meta.env.MODE === "development"
    ? "http://localhost:5001"
    : import.meta.env.VITE_SOCKET_URL || "https://saveheal-store.onrender.com";

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

    const newSocket = io(SOCKET_URL, {
      withCredentials: true,
      query: { userId: authUser._id },
      transports: ["websocket", "polling"],
      reconnection: true,
      reconnectionDelay: 1000,
      reconnectionAttempts: 5,
    });

    set({ socket: newSocket });

    newSocket.on("connect", () => {
      console.log("✅ Socket connected:", newSocket.id);
    });

    newSocket.on("connect_error", (error) => {
      console.error("❌ Socket connection error:", error);
    });

    newSocket.on("getOnlineUsers", (users) => {
      set({ onlineUsers: users });
    });
  },
  disconnectSocket: () => {
    get().socket?.disconnect();
    set({ socket: null });
  },
}));
