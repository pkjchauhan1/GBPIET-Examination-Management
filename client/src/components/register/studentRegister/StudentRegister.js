import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addStudent } from "../../../redux/actions/facultyActions.js";
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
    year: yup.string().required(),
    semester: yup.string().required(),
    university_roll_no: yup.string().required(),
    university_enrollment_no: yup.string().required(),
    father_name: yup.string(),
    contact_number: yup.string().required(),
    email: yup.string().email().required(),
    batch: yup.string().required(),
  })
  .required();

const defaultValues = {
  name: "",
  email: "",
  course: [],
  contact_number: "",
  year: "",
  semester: "",
  university_roll_no: "",
  university_enrollment_no: "",
  father_name: "",
  gender: "",
  batch: "",
};

Modal.setAppElement("#root");

const StudentRegister = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [year, setYear] = useState("");
  const [semester, setSemester] = useState("");
  const [error, setError] = useState({});
  const [loading, setLoading] = useState(false);
  const [gender, setGender] = useState("");
  const [course, selectCourse] = useState([]);
  const [father_name, setFatherName] = useState("");
  const [contact_number, setContactNumber] = useState("");
  const [university_roll_no, setUniversityRollNo] = useState("");
  const [university_enrollment_no, setUniversityEnrollmentNo] = useState("");
  const [translate, setTranslate] = useState(false);
  const [courses, setCourses] = useState([]);
  const [batch, setBatch] = useState("");
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
    const {
      name,
      email,
      course,
      contact_number,
      year,
      semester,
      university_roll_no,
      university_enrollment_no,
      father_name,
      gender,
      batch,
    } = data;

    const courseIds = course.map((c) => c.value);

    dispatch(
      addStudent({
        name,
        email,
        course: courseIds,
        contact_number,
        year,
        semester,
        university_roll_no,
        university_enrollment_no,
        father_name,
        gender,
        batch,
      })
    )
    .then(() => {
      setModalIsOpen(true);
    })
    .catch((error) => {
      console.error("Registration failed", error);
    });
};

  return (
    <>
    <div className="bg-[#04bd7d] h-screen w-screen flex items-center justify-center">
      <div className="flex">
 
        <form
          onSubmit={handleSubmit(onSubmit)}
          className={`h-[40rem] w-full bg-[#2c2f35] grid gap-4 p-[2rem] rounded-3xl shadow-2xl`}
        >
          <h1 className="text-white text-3xl font-semibold col-span-3">
            Student
          </h1>
          <div className="space-y-1">
            <p className="text-[#515966] font-bold text-sm">Name</p>
            <div className="bg-[#515966] rounded-lg w-[14rem] flex  items-center">
              <input
                required
                type="text"
                value={name}
                placeholder="Enter your name"
                onChange={(e) => setName(e.target.value)}
                className="bg-[#515966] text-white px-2 outline-none py-2 rounded-lg placeholder:text-sm"
              />
            </div>
          </div>
          <div className="space-y-1">
            <p className="text-[#515966] font-bold text-sm">Email</p>
            <div className="bg-[#515966] rounded-lg w-[14rem] flex  items-center">
              <input
                required
                type="email"
                value={email}
                placeholder="Enter Your Email"
                onChange={(e) => setEmail(e.target.value)}
                className="bg-[#515966] text-white px-2 outline-none py-2 rounded-lg placeholder:text-sm"
              />
            </div>
          </div>

<div className="space-y-1">
            <p className="text-[#515966] font-bold text-sm">Gender</p>
            <div className="bg-[#515966] rounded-lg w-[14rem] flex items-center">
              <select
                required
                className="bg-[#515966] text-white px-2 outline-none py-2 rounded-lg w-full"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
              >
              <option value="" disabled>
                        Select
                      </option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
              </select>
            </div>
          </div>

          <div className="space-y-1">
            <p className="text-[#515966] font-bold text-sm">Contact Number</p>
            <div className="bg-[#515966] rounded-lg w-[14rem] flex  items-center">
              <input
                value={contact_number}
                placeholder="10 Digit Number"
                onChange={(e) => setContactNumber(e.target.value)}
                className="bg-[#515966] text-white px-2 outline-none py-2 rounded-lg placeholder:text-sm"
              />
            </div>
          </div>

          <div className="space-y-1">
            <p className="text-[#515966] font-bold text-sm">Father Name</p>
            <div className="bg-[#515966] rounded-lg w-[14rem] flex  items-center">
              <input
                type="text"
                value={father_name}
                placeholder="Father Name"
                onChange={(e) => setFatherName(e.target.value)}
                className="bg-[#515966] text-white px-2 outline-none py-2 rounded-lg placeholder:text-sm"
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
            <p className="text-[#515966] font-bold text-sm">Year</p>
            <div className="bg-[#515966] rounded-lg w-[14rem] flex items-center">
              <select
                required
                className="bg-[#515966] text-white px-2 outline-none py-2 rounded-lg w-full"
                value={year}
                onChange={(e) => setYear(e.target.value)}
              >
                <option value="" disabled>
                  Select Year
                </option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
              </select>
            </div>
          </div>

          <div className="space-y-1">
            <p className="text-[#515966] font-bold text-sm">Semester</p>
            <div className="bg-[#515966] rounded-lg w-[14rem] flex items-center">
              <select
                required
                className="bg-[#515966] text-white px-2 outline-none py-2 rounded-lg w-full"
                value={semester}
                onChange={(e) => setSemester(e.target.value)}
              >
                <option value="" disabled>
                  Select Semester
                </option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
              </select>
            </div>
          </div>

          <div className="space-y-1">
            <p className="text-[#515966] font-bold text-sm">Batch</p>
            <div className="bg-[#515966] rounded-lg w-[14rem] flex  items-center">
              <input
                value={batch}
                placeholder="Enter Your Batch"
                onChange={(e) => setBatch(e.target.value)}
                className="bg-[#515966] text-white px-2 outline-none py-2 rounded-lg placeholder:text-sm"
              />
            </div>
          </div>

          <div className="space-y-1">
            <p className="text-[#515966] font-bold text-sm">
              University Roll No
            </p>
            <div className="bg-[#515966] rounded-lg w-[14rem] flex  items-center">
              <input
                value={university_roll_no}
                placeholder="12 Digit Number"
                onChange={(e) => setUniversityRollNo(e.target.value)}
                className="bg-[#515966] text-white px-2 outline-none py-2 rounded-lg placeholder:text-sm"
              />
            </div>
          </div>
          <div className="space-y-1">
            <p className="text-[#515966] font-bold text-sm">
              University Enrollment No
            </p>
            <div className="bg-[#515966] rounded-lg w-[14rem] flex  items-center">
              <input
                value={university_enrollment_no}
                placeholder="12 Digit Number"
                onChange={(e) => setUniversityEnrollmentNo(e.target.value)}
                className="bg-[#515966] text-white px-2 outline-none py-2 rounded-lg placeholder:text-sm"
              />
            </div>
          </div>

          <div className="col-span-3 flex items-center justify-between">
            <button
              type="submit"
              className="w-32 hover:scale-105 transition-all duration-150 rounded-lg flex items-center justify-center text-white text-base py-1 bg-[#04bd7d]"
            >
              Register
            </button>{" "}
            <a
              href="/"
              className="w-32 hover:scale-105 transition-all duration-150 rounded-lg flex items-right justify-center text-white text-base py-1 bg-[#FF2400]"
            >
              Home
            </a>
          </div>
          {(error.usernameError || error.passwordError) && (
            <p className="text-red-500">
              {error.usernameError || error.passwordError}
            </p>
          )}
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

export default StudentRegister;
