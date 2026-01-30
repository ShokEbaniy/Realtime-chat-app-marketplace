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
  };

  const handleFormDataChange = async (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    await updateProfile({ 
      [e.target.type === "email" ? "email" : "userName"]: e.target.value 
    });
  };

  return (
    <div className="container mx-auto max-w-2xl px-4 mt-8 pb-28 md:pb-8">
      <div className="card bg-base-200 shadow-xl">
        <div className="card-body">
          <div className="flex flex-col items-center mb-6">
            <h1 className="text-3xl font-bold mb-2">профиль</h1>
            <p className="text-base-content/60 text-center">
              твоя инфа
            </p>
          </div>

          {/* Profile Picture */}
          <div className="flex flex-col items-center mb-8">
            <div className="relative">
              <div className="avatar">
                <div className="w-32 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                  <img
                    src={selectedImg || authUser.profilePic}
                    alt="профиль"
                  />
                </div>
              </div>
              <label
                htmlFor="profilePic"
                className="absolute bottom-0 right-0 btn btn-circle btn-sm btn-primary cursor-pointer"
              >
                <Camera className="size-4" />
                <input
                  type="file"
                  id="profilePic"
                  className="hidden"
                  accept="image/*"
                  onChange={handleProfilePicChange}
                />
              </label>
            </div>
            {isUpdatingProfile && (
              <p className="mt-2 text-sm text-base-content/60">обновление...</p>
            )}
          </div>

          {/* User Info */}
          <div className="space-y-6">
            <div className="form-control">
              <label className="label">
                <span className="label-text flex items-center gap-2">
                  <User className="size-5" />
                  имя
                </span>
              </label>
              <input
                type="text"
                className="input input-bordered"
                value={authUser.userName}
                readOnly
              />
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text flex items-center gap-2">
                  <Mail className="size-5" />
                  почта
                </span>
              </label>
              <input
                type="email"
                className="input input-bordered"
                value={authUser.email}
                readOnly
              />
            </div>
          </div>

          {/* Account Info */}
          <div className="divider mt-8">инфа об аккаунте</div>

          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-base-content/60">создан:</span>
              <span className="font-semibold">
                {authUser.createdAt.split("T")[0]}
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-base-content/60">обновлен:</span>
              <span className="font-semibold">
                {authUser.updatedAt.split("T")[0]}
              </span>
            </div>

            <div className="flex justify-between">
              <span className="text-base-content/60">статус:</span>
              <span className="badge badge-success">активен</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
