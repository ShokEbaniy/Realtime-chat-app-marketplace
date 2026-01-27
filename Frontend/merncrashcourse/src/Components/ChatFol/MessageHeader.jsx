import { useChatStore } from "../../store/useChatStore";
import { useAuthStore } from "../../store/useAuthStore";
import { ArrowLeft } from "lucide-react";
import defaultPic from "../../images/profileDefaultPic.jpg";
const MessageHeader = ({ user }) => {
  const { setSelectedUser } = useChatStore();
  const { onlineUsers } = useAuthStore();
  const isOnline = onlineUsers.includes(user._id);
  return (
    <div className="flex absolute items-center w-screen p-2 border-b border-gray-700">
      <button onClick={() => setSelectedUser(null)} className="p-2">
        <ArrowLeft className="w-10 h-10" />
      </button>
      <img
        src={user.profilePic ? user.profilePic : defaultPic}
        className="size-14 rounded-full object-cover"
      />
      <div className="ml-6">
        <h2 className="text-xl font-semibold">{user.userName}</h2>
        <p className={isOnline ? "text-green-500" : "text-gray-400"}>
          {isOnline ? "Online" : "Offline"}
        </p>
      </div>
    </div>
  );
};

export default MessageHeader;
