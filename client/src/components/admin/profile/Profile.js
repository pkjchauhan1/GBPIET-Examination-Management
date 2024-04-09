import React from "react";
import Body from "./Body";
import Header from "../Header";
import Sidebar from "../Sidebar";

const Profile = () => {
  return (
    <div className="bg-[#d6d9e0] h-screen flex items-center justify-center">
      <div className="flex flex-col  bg-[#f4f6fa] h-screen w-screen rounded-2xl shadow-2xl space-y-6 ">
        <Header />
        <div className="flex flex-[0.95] space-x-5">
          <Sidebar />
          <Body />
        </div>
      </div>
    </div>
  );
};

export default Profile;
