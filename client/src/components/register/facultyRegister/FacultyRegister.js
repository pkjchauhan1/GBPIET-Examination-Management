import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addFaculty } from "../../../redux/actions/adminActions.js";
import axios from "axios";
import Select from "react-select";

import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, Controller } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Modal from "react-modal";

const schema = yup
  .object({
    name: yup.string().required(),
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
  contact_number: "",
  course: [],
};

Modal.setAppElement("#root");

const FacultyRegister = () => {
  const [loading, setLoading] = useState(false);
  const [translate, setTranslate] = useState(false);
  const [courses, setCourses] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

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
    const { name, gender, course, contact_number, email } = data;

    const courseIds = course.map((c) => c.value);

    dispatch(
      addFaculty({
        name,
        gender,
        course: courseIds,
        contact_number,
        email,
      })
    )
      .then(() => {
        setModalIsOpen(true); // Open the modal on successful registration
        setLoading(false);
      })
      .catch((error) => {
        console.error("Registration failed", error);
        setLoading(false);
      });
  };

  return (
    <>
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
                      placeholder="Enter Your Name"
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
                      placeholder="Enter Your Email"
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
                      <option value="select">Select</option>
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
                        value: course._id,
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
                      placeholder="10 Digit Number"
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
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={() => setModalIsOpen(false)}
        contentLabel="Registration Successful"
        style={{
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.75)",
          },
          content: {
            top: "50%",
            left: "50%",
            right: "auto",
            bottom: "auto",
            marginRight: "-50%",
            transform: "translate(-50%, -50%)",
            border: "none",
            background: "#2c2f35",
            borderRadius: "10px",
            padding: "20px",
            color: "white",
            width: "30rem",
            boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
          },
        }}
      >
        <h2 className="text-xl font-bold text-center mb-4">
          Registration Successful!
        </h2>
        <p className="text-center">
          Please check your email for your login ID and password.
        </p>
        <div className="mt-4 flex justify-center">
          <button
            onClick={() => {
              setModalIsOpen(false);
              navigate("/");
            }}
            className="bg-[#04bd7d] text-white font-medium py-2 px-6 rounded hover:bg-green-600 transition duration-150"
          >
            OK
          </button>
        </div>
      </Modal>
    </>
  );
};

export default FacultyRegister;
