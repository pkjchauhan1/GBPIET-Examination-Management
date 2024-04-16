import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { addStudent } from "../../../redux/actions/adminActions.js";
import axios from "axios";
import Select from "react-select";

import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, Controller } from "react-hook-form";

const schema = yup
  .object({
    name: yup.string().required(),
    gender: yup.string().required(),
    course: yup.string().required(),
    year: yup.string().required(),
    semester: yup.string().required(),
    university_roll_no: yup.string().required(),
    university_enrollment_no: yup.string().required(),
    gender: yup.string(),
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

const StudentRegister = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [year, setYear] = useState("");
  const [semester, setSemester] = useState("");
  const [error, setError] = useState({});
  const [loading, setLoading] = useState(false);
  const [gender, setGender] = useState(undefined);
  const [course, selectCourse] = useState([]);
  const [father_name, setFatherName] = useState("");
  const [subjects, setSubjects] = useState(undefined);
  const [contact_number, setContactNumber] = useState("");
  const [university_roll_no, setUniversityRollNo] = useState("");
  const [university_enrollment_no, setUniversityEnrollmentNo] = useState("");
  const [translate, setTranslate] = useState(false);
  const [courses, setCourses] = useState([]);
  const [batch, setBatch] = useState("");

  const dispatch = useDispatch();

  const {
    control,
    setValue,
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

    dispatch(
      addStudent({
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
      })
    );
  };

  return (
    <div className="bg-[#04bd7d] h-screen w-screen flex items-center justify-center">
      <div className="grid grid-cols-2">
        <div
          className={`h-[40rem] w-full bg-white flex items-center justify-center ${
            translate ? "translate-x-[24rem]" : ""
          }  duration-1000 transition-all rounded-3xl shadow-2xl`}
        >
          <h1 className="text-[3rem]  font-bold text-center">
            Student
            <br />
            Register
          </h1>
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className={`h-[40rem] w-full bg-[#2c2f35] grid grid-cols-3 gap-4 p-[2rem] ${
            translate ? "-translate-x-[24rem]" : ""
          }  duration-1000 transition-all rounded-3xl shadow-2xl`}
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
                placeholder="John Doe"
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
                placeholder="johndoe@email.com"
                onChange={(e) => setEmail(e.target.value)}
                className="bg-[#515966] text-white px-2 outline-none py-2 rounded-lg placeholder:text-sm"
              />
            </div>
          </div>
          <div className="space-y-1">
            <p className="text-[#515966] font-bold text-sm">Gender</p>
            <div className="bg-[#515966] rounded-lg w-[14rem] flex  items-center">
              <select
                name="gender"
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                className="w-[13.5rem] bg-[#515966] text-white px-2 outline-none py-2 rounded-lg placeholder:text-sm"
              >
                <option value="male">Male</option>
                <option value="female">Female</option>
              </select>
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
                    onChange={(selectedOptions) => {
                      setValue(
                        "course",
                        selectedOptions.map((option) => option.value)
                      );
                    }}
                  />
                )}
              />
            </div>
          </div>

          <div className="space-y-1">
            <p className="text-[#515966] font-bold text-sm">Father Name</p>
            <div className="bg-[#515966] rounded-lg w-[14rem] flex  items-center">
              <input
                type="text"
                value={father_name}
                placeholder="John Doe"
                onChange={(e) => setFatherName(e.target.value)}
                className="bg-[#515966] text-white px-2 outline-none py-2 rounded-lg placeholder:text-sm"
              />
            </div>
          </div>

          <div className="space-y-1">
            <p className="text-[#515966] font-bold text-sm">Contact Number</p>
            <div className="bg-[#515966] rounded-lg w-[14rem] flex  items-center">
              <input
                required
                type="number"
                value={contact_number}
                placeholder="10 Digit Number"
                onChange={(e) => setContactNumber(e.target.value)}
                className="bg-[#515966] text-white px-2 outline-none py-2 rounded-lg placeholder:text-sm"
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
                  Select year
                </option>
                <option value="none">none</option>
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
                  Select semester
                </option>
                <option value="none">none</option>
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
            <p className="text-[#515966] font-bold text-sm">
              University Roll No
            </p>
            <div className="bg-[#515966] rounded-lg w-[14rem] flex  items-center">
              <input
                required
                type="number"
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
                required
                type="number"
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
  );
};

export default StudentRegister;
