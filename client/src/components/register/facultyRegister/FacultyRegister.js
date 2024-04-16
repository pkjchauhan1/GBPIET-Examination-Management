import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addFaculty } from "../../../redux/actions/facultyActions.js";
import axios from "axios";
import Select from "react-select";

import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, Controller } from "react-hook-form";

const schema = yup
  .object({
    name: yup.string().required(),
    avatar: yup.string(),
    gender: yup.string().required(),
    course: yup.array().required(),
    contact_number: yup.string().required(),
    email: yup.string().email().required(),
  })
  .required();

const defaultValues = {
  name: "",
  email: "",
  gender: "",
  avatar: "",
  contact_number: "",
  course: [],
};

const FacultyRegister = () => {
  const [loading, setLoading] = useState(false);
  const [translate, setTranslate] = useState(false);
  const [courses, setCourses] = useState([]);

  const dispatch = useDispatch();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues,
    resolver: yupResolver(schema),
  });

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4000/api/admin/getallcourse"
        );
        setCourses(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchCourses();
    setTimeout(() => {
      setTranslate(true);
    }, 1000);
  }, []);

  const onSubmit = (data) => {
    setLoading(true);
    const {
      name,
      avatar,
      gender,
      course: [],
      contact_number,
      email,
    } = data;

    dispatch(
      addFaculty({
        name,
        avatar,
        gender,
        course: [],
        contact_number,
        email,
      })
    );
  };

  return (
    <div className="bg-[#04bd7d] h-screen w-screen flex items-center justify-center">
      <div className="grid grid-cols-2">
        <div
          className={`h-[40rem] w-full bg-white flex items-center justify-center ${
            translate ? "translate-x-[21rem]" : ""
          }  duration-1000 transition-all rounded-3xl shadow-2xl`}
        >
          <h1 className="text-[3rem]  font-bold text-center">
            Faculty
            <br />
            Register
          </h1>
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className={`h-[40rem] w-full bg-[#2c2f35] grid grid-cols-2 gap-4 p-[2rem] ${
            translate ? "-translate-x-[12rem]" : ""
          }  duration-1000 transition-all rounded-3xl shadow-2xl`}
        >
          <h1 className="text-white text-3xl font-semibold col-span-2">
            Faculty
          </h1>
          <div className="space-y-1">
            <p className="text-[#515966] font-bold text-sm">Name</p>
            <div
              className={`bg-[#515966] rounded-lg w-[14rem] flex  items-center ${
                errors.name ? "border border-red-500" : ""
              }`}
            >
              <Controller
                name="name"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <input
                    type="text"
                    placeholder="John Doe"
                    className="bg-[#515966] text-white px-2 outline-none py-2 rounded-lg placeholder:text-sm"
                    {...field}
                  />
                )}
              />
            </div>
          </div>
          <div className="space-y-1">
            <p className="text-[#515966] font-bold text-sm">Email</p>
            <div
              className={`bg-[#515966] rounded-lg w-[14rem] flex  items-center ${
                errors.email ? "border border-red-500" : ""
              }`}
            >
              <Controller
                name="email"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <input
                    type="text"
                    placeholder="johndoe@email.com"
                    className="bg-[#515966] text-white px-2 outline-none py-2 rounded-lg placeholder:text-sm"
                    {...field}
                  />
                )}
              />
            </div>
          </div>
          <div className="space-y-1">
            <p className="text-[#515966] font-bold text-sm">Gender</p>
            <div
              className={`bg-[#515966] rounded-lg w-[14rem] flex  items-center ${
                errors.gender ? "border border-red-500" : ""
              }`}
            >
              <Controller
                name="gender"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <select
                    name="gender"
                    className="w-[13.5rem] bg-[#515966] text-white px-2 outline-none py-2 rounded-lg placeholder:text-sm"
                    {...field}
                  >
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </select>
                )}
              />
            </div>
          </div>
          <div className="space-y-1">
            <p className="text-[#515966] font-bold text-sm">Course</p>
            <div
              className={`bg-[#515966] rounded-lg w-[14rem] ${
                errors.course ? "border border-red-500" : ""
              }`}
            >
              <Controller
                name="course"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <Select
                    {...field}
                    options={courses.map((course) => ({
                      value: course.course,
                      label: course.course,
                    }))}
                    isMulti
                    className="text-black placeholder:text-sm"
                    classNamePrefix="select"
                    theme={(theme) => ({
                      ...theme,
                      borderRadius: 5,
                      colors: {
                        ...theme.colors,
                        primary25: "grey",
                        primary: "white",
                      },
                    })}
                  />
                )}
              />
            </div>
          </div>
          <div className="space-y-1">
            <p className="text-[#515966] font-bold text-sm">Contact Number</p>
            <div
              className={`bg-[#515966] rounded-lg w-[14rem] flex  items-center ${
                errors.contact_number ? "border border-red-500" : ""
              }`}
            >
              <Controller
                name="contact_number"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <input
                    type="number"
                    className="bg-[#515966] text-white px-2 outline-none py-2 rounded-lg placeholder:text-sm"
                    {...field}
                  />
                )}
              />
            </div>
          </div>
          <div className="space-y-1 col-span-2">
            <p className="text-[#515966] font-bold text-sm">Avatar</p>
            <div
              className={`bg-[#515966] rounded-lg w-full flex  items-center ${
                errors.avatar ? "border border-red-500" : ""
              }`}
            >
              <Controller
                name="avatar"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <input
                    type="file"
                    className="bg-[#515966] text-white px-2 outline-none py-2 rounded-lg placeholder:text-sm"
                    {...field}
                  />
                )}
              />
            </div>
          </div>
          <button
            type="submit"
            className="w-32 hover:scale-105 transition-all duration-150 rounded-lg flex items-center justify-center text-white text-base py-3 bg-[#04bd7d]"
          >
            Register
          </button>
          <a
            href="/"
            className="w-32 hover:scale-105 transition-all duration-150 rounded-lg flex items-center justify-center text-white text-base py-1 bg-[#FF2400]"
          >
            Home
          </a>
        </form>
      </div>
    </div>
  );
};

export default FacultyRegister;
