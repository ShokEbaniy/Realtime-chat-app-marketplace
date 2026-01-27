import React from "react";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";
import defaultPic from "../images/profileDefaultPic.jpg";
const ChatsList = () => {
  const { users, setSelectedUser, isUsersLoading, getUsers, selectedUser } =
    useChatStore();

  const { onlineUsers } = useAuthStore();

  React.useEffect(() => {
    getUsers();
  }, [getUsers]);

  const handleSelectUser = (user) => {
    setSelectedUser(user);
  };

  return (
    <>
      {isUsersLoading ? (
        <div className="text-center size-10">Loading users...</div>
      ) : (
        <div className="p-4 border-b flex-col w-full h-full gap-4 overflow-y-auto ">
          <h2 className="text-xl font-semibold mb-4">Chats</h2>
          <label className="cursor-pointer">
            <input type="radio" name="size" className="sr-only" />
            <span
              className={`px-2 py-2 rounded border select-none inline-block
               "bg-white text-gray-800 border-gray-300"}
            `}
            ></span>
          </label>
          <div>{/*TO DO: make a online users only filter */}</div>
          {users.map((user) => (
            <div
              key={user._id}
              onClick={() => handleSelectUser(user)}
              className={`p-4 relative border-b border-gray-200 cursor-pointer hover:bg-gray-600 ${
                selectedUser?._id === user._id ? "bg-green-900/70" : ""
              }`}
            >
              <div className="flex items-center space-x-3">
                <img
                  src={user.profilePic || defaultPic}
                  alt={user.userName}
                  className="w-12 h-12 rounded-full object-cover"
                />
                {onlineUsers.includes(user._id) ? (
                  <span className="ring-2 absolute left-10 top-4 ring-green-500 rounded-full size-4 bg-green-500"></span>
                ) : (
                  ""
                )}
                <div>
                  <h3 className="font-semibold">{user.userName}</h3>

                  <p className="text-sm text-gray-600">
                    {onlineUsers.includes(user._id) ? "Online" : "Offline"}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default ChatsList;
