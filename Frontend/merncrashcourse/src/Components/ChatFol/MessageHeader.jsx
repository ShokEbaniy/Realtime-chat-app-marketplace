import { useChatStore } from "../../store/useChatStore";
import { useAuthStore } from "../../store/useAuthStore";
import { ArrowLeft } from "lucide-react";
import defaultPic from "../../images/profileDefaultPic.jpg";
const MessageHeader = ({ user }) => {
  const { setSelectedUser } = useChatStore();
  const { onlineUsers } = useAuthStore();
  const isOnline = onlineUsers.includes(user._id);
  return (
    <div className="flex items-center gap-3 p-4 border-b border-base-300 bg-base-100">
      <button 
        onClick={() => setSelectedUser(null)} 
        className="md:hidden p-2 hover:bg-base-200 rounded-lg transition-colors"
      >
        <ArrowLeft className="w-6 h-6" />
      </button>
      <div className="avatar">
        <div className="w-12 h-12 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
          <img
            src={user.profilePic || defaultPic}
            alt={user.userName}
            className="object-cover"
          />
        </div>
      </div>
      <div className="flex-1">
        <h2 className="text-lg font-semibold">{user.userName}</h2>
        <p className={`text-sm ${isOnline ? "text-green-500" : "text-gray-400"}`}>
          {isOnline ? "онлайн" : "не в сети"}
        </p>
      </div>
    </div>
  );
};

export default MessageHeader;
