import React from "react";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";
import defaultPic from "../images/profileDefaultPic.jpg";

const ChatsList = () => {
  const { users, setSelectedUser, isUsersLoading, getUsers, selectedUser } =
    useChatStore();

  const { onlineUsers } = useAuthStore();
  const [showOnlineUsersOnly, setShowOnlineUsersOnly] = React.useState(false);

  const filteredUsers = showOnlineUsersOnly
    ? users.filter((user) => onlineUsers.includes(user._id))
    : users;

  React.useEffect(() => {
    getUsers();
  }, [getUsers]);

  const handleSelectUser = (user) => {
    setSelectedUser(user);
  };

  if (isUsersLoading) {
    return (
      <div className="w-full md:w-80 border-r border-base-300 flex items-center justify-center">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="w-full md:w-80 border-r border-base-300 flex flex-col h-full overflow-hidden">
      <div className="p-4 border-b border-base-300 bg-base-100">
        <h2 className="text-xl font-semibold mb-4">чаты</h2>
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={showOnlineUsersOnly}
            onChange={() => setShowOnlineUsersOnly((v) => !v)}
            className="checkbox checkbox-sm checkbox-success"
          />
          <span className="text-sm">
            кто онлайн ({Math.max(0, onlineUsers.length - 1)})
          </span>
        </label>
      </div>

      <div className="flex-1 overflow-y-auto custom-scrollbar">
        {filteredUsers.length === 0 ? (
          <div className="text-center text-gray-500 mt-10 px-4">
            {showOnlineUsersOnly
              ? "никого нет онлайн"
              : "пользователей нет"}
          </div>
        ) : (
          filteredUsers.map((user) => (
            <div
              key={user._id}
              onClick={() => handleSelectUser(user)}
              className={`flex items-center gap-3 p-4 cursor-pointer transition-colors border-b border-base-200 hover:bg-base-200 ${
                selectedUser?._id === user._id ? "bg-base-300" : ""
              }`}
            >
              <div className="avatar relative">
                <div className="w-12 h-12 rounded-full">
                  <img
                    src={user.profilePic || defaultPic}
                    alt={user.userName}
                    className="object-cover"
                  />
                </div>
                {onlineUsers.includes(user._id) && (
                  <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-base-100 rounded-full"></span>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold truncate">{user.userName}</h3>
                <p className="text-sm text-gray-500">
                  {onlineUsers.includes(user._id) ? "онлайн" : "не в сети"}
                </p>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default ChatsList;
