import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  getAllFaculty,
  getAllAdmin,
  getAllCourse,
  getNotice,
} from "../../redux/actions/adminActions";
import Body from "./Body";
import Header from "./Header";
import Sidebar from "./Sidebar";

const AdminHome = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getAllFaculty());
    dispatch(getAllAdmin());
    dispatch(getAllCourse());
    dispatch(getNotice());
  }, [dispatch]);
  return (
    <div className="bg-[#d6d9e0] h-screen flex items-center justify-center">
      <div className="flex flex-col  bg-[#f4f6fa] h-screen w-screen rounded-2xl shadow-2xl space-y-6  overflow-y-hidden ">
        <Header />
        <div className="flex flex-[0.95] space-x-6">
          <Sidebar />
          <Body />
        </div>
      </div>
    </div>
  );
};

export default AdminHome;
