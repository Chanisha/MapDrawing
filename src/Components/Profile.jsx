import React from "react";

const Profile = ({ user }) => {
  return (
    <div className="flex justify-center items-center h-screen bg-gray-900">
      <div className="p-8 w-80 text-center">
        <h1 className="text-3xl font-semibold text-white">
          {user.firstName ? user.firstName : "No Name Given"}
        </h1>
      </div>
    </div>
  );
};

export default Profile;
