import { create } from "zustand";
import { persist } from "zustand/middleware";
import { axiosInstance } from "../config/axios.config.js";
import { toast } from "react-hot-toast";
import { useAuthStore } from "./useAuthStore.js";

export const useChatStore = create(
  persist(
    (set, get) => ({
      users: [],
      messages: [],
      isMessagesLoading: false,
      isUsersLoading: false,
      selectedUser: null,
      getUsers: async () => {
        set({ isUsersLoading: true });
        try {
          const res = await axiosInstance.get("/chats/users");
          set({ users: res.data.data });
        } catch (err) {
          console.log(err);
          toast.error(err.response?.data?.message || "Failed to load messages");
        } finally {
          set({ isUsersLoading: false });
        }
      },

      getMessages: async () => {
        set({ isMessagesLoading: true });
        try {
          const res = await axiosInstance.get(
            "/chats/getChatMessages/" + get().selectedUser._id,
          );
          set({ messages: res.data });
        } catch (err) {
          console.log(err);
          toast.error(err.response?.data?.message || "Failed to load messages");
        } finally {
          set({ isMessagesLoading: false });
        }
      },
      sendMessage: async ({ text, image }) => {
        try {
          const res = await axiosInstance.post(
            "/chats/send/" + get().selectedUser._id,
            { text, image },
          );
          set((state) => ({ messages: [...state.messages, res.data.message] }));
        } catch (err) {
          console.log(err);
          toast.error(err.response?.data?.message || "Failed to send message");
        }
      },

      setSelectedUser: (user) => set({ selectedUser: user }),
      subscribeToMessages: () => {
        const socket = useAuthStore.getState().socket;
        socket.on("newMessage", (message) => {
          if(message.senderId !== get().selectedUser._id) return;
          set({ messages: [...get().messages, message] });
        });
      },
      unsubscribeToMessages: () => {
        const socket = useAuthStore.getState().socket;
        socket.off("newMessage");
      },
    }),
    {
      name: "chat-store",
      partialize: (state) => ({ selectedUser: state.selectedUser }),
    },
  ),
);
