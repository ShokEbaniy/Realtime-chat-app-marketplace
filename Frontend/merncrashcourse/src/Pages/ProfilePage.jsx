import React from "react";
import { Camera, Mail, User, Check } from "lucide-react";

import { useAuthStore } from "../store/useAuthStore.js";
const ProfilePage = () => {
  const { isUpdatingProfile, updateProfile, authUser } = useAuthStore();
  const [form, setForm] = React.useState({
    userName: authUser.userName,
  });
  const [selectedImg, setSelectedImg] = React.useState(null);
  const handleProfilePicChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onloadend = async () => {
      setSelectedImg(reader.result);
      await updateProfile({ profilePic: reader.result });
    };

    const handleFormDataChange = async (e) => {
      setForm({ ...form, [e.target.name]: e.target.value });
      await updateProfile({ [e.target.type === "email" ? "email" : "userName"]: e.target.value });
    }
  };
  return (
    <div className="flex items-start justify-center h-screen">
      <div className="bg-white dark:bg-gray-800 p-8 rounded-lg  w-[80%] ">
        <div className="flex flex-col items-center">
          <h1 className="text-2xl font-bold ">Profile</h1>
          <h4 className="text-md mb-6 text-gray-600/50 dark:text-gray-300/50  text-center px-4">
            Your profile information
          </h4>
          <div className="relative">
            <img
              className="w-32 h-32 rounded-full object-cover border-4 border-green-500"
              src={selectedImg || authUser.profilePic}
              alt="ProfilePic"
            />
            <label
              htmlFor="profilePic"
              className="absolute bottom-[-10px] right-[-15px] cursor-pointer bg-gray-400 rounded-full p-1"
            >
              <Camera className="text-gray-700 size-12" />
              <input
                type="file"
                id="profilePic"
                className="hidden"
                accept="image/*"
                onChange={handleProfilePicChange}
              />
            </label>
          </div>
          <p>{isUpdatingProfile && "Updating..."}</p>
        </div>
        <div className="flex flex-col items-start justify-start mt-8">
          <div className="flex items-center justify-start gap-2 mb-6">
            <User className="text-gray-700 size-12 " />
            <span className="font-bold text-gray-700 dark:text-gray-300">
              {authUser.userName}
            </span>
            <button type="button" className="size-12" onClick={() => {}}>
              <Check className="text-gray-400 size-12 hover:text-green-500" />
            </button>
          </div>
          <div className="flex items-center gap-2">
            <Mail className="text-gray-700 size-12" />
            <input
              type="email"
              className="bg-transparent border-b border-gray-400 focus:outline-none focus:border-green-500 text-gray-700 dark:text-gray-300"
              value={authUser.email}
            />{" "}
            
          </div>
        </div>
        <div className="my-4 items-center text-center font-semibold ">
          Account additional info
        </div>
        <div className="flex gap-2 ">
          Account created at:{" "}
          <span className="font-semibold mx-2">
            {authUser.createdAt.split("T")[0]}
          </span>
        </div>
        <div className="flex gap-2 ">
          Last updated at:{" "}
          <span className="font-semibold mx-2">
            {authUser.updatedAt.split("T")[0]}
          </span>
        </div>
        <div className="flex gap-2 ">
          Account status:{" "}
          <span className="font-semibold mx-2">
            {authUser ? (
              <span className="text-green-600">Active</span>
            ) : (
              <span className="text-yellow-600">Restricted</span>
            )}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
