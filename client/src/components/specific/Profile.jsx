import React from "react";
import { Avatar, Stack, Typography } from "@mui/material";
import {
  Face as FaceIcon,
  AlternateEmail as UserNameIcon,
  CalendarMonth as CalendarIcon,
} from "@mui/icons-material";
import moment from "moment";
import { transformImage } from "../../lib/features";

const Profile = ({ user }) => {
  return (
    <div className="flex flex-col items-center bg-gray-900 p-8 rounded-xl shadow-lg border-yellow-300 border-2 w-full max-w-sm mx-auto ">
      {/* Avatar */}
      <img
        src={transformImage(user?.avatar?.url)}
        alt="Profile"
        className="w-32 h-32 object-cover rounded-full border-4 border-white mb-6"
      />

      {/* Name */}
      <div className="text-center mb-4">
        <p className="text-2xl font-semibold text-white">{user?.name}</p>
      </div>

      {/* Username Block */}
      <div className="w-full mb-4">
        <div className="bg-gray-800 text-center py-2 px-4 rounded-lg">
          <p className="text-lg text-gray-300">@{user?.username}</p>
        </div>
      </div>

      {/* Bio Block */}
      <div className="w-full mb-4">
        <div className="bg-gray-800 text-center py-2 px-4 rounded-lg">
          <p className="text-base text-gray-300">{user?.bio || "No bio available"}</p>
        </div>
      </div>

      {/* Joined Date Block */}
      <div className="w-full">
        <div className="bg-gray-800 text-center py-2 px-4 rounded-lg">
          <p className="text-base text-gray-300">Joined {moment(user?.createdAt).fromNow()}</p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
