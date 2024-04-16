import React, { useEffect, useState } from "react";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import Spinner from "../../../utils/Spinner";
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
    university_roll_no:  yup.string().required(),
    university_enrollment_no:  yup.string().required(),
    avatar: yup.string(),
    gender: yup.string(),
    father_name: yup.string(),
    contact_number: yup.string().required(),
    email: yup.string().email().required(),
  })
  .required();

const defaultValues = {
  name: "",
  email: "",
  course: "",
  avatar: "",
  contact_number: "",
  course: "",
  year: "",
  semester: "",
  university_roll_no: "",
  university_enrollment_no: "",
  father_name: "",
  gender: "",
};

const StudentRegister = () => {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("");
  const [year, setYear] = useState("");
  const [semester, setSemester] = useState("");
  const [error, setError] = useState({});
  const [avatar, setAvatar] = useState("");
  const [loading, setLoading] = useState(false);
  const [gender, setGender] = useState(undefined);
  const [course, selectCourse] = useState("");
  const [fatherName, setFatherName] = useState("");
  const [subjects, setSubjects] = useState(undefined);
  const [contact_number, setContactNumber] = useState("");
  const [university_roll_no] = useState("");
  const [translate, setTranslate] = useState(false);
  const [courses, setCourses] = useState([]);

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
  };

  return (
    <div className="bg-[#04bd7d] h-screen w-screen flex items-center justify-center px-4">
      <div className="grid grid-cols-2">
        <div
          className={`h-[40rem] w-full bg-white flex items-center justify-center ${
            translate ? "translate-x-[25rem]" : ""
          }  duration-1000 transition-all rounded-3xl shadow-2xl`}
        >
          <h1 className="text-[3rem]  font-bold text-center">
            Student
            <br />
            Register
          </h1>
        </div>
        <form
          onSubmit={register}
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
   
          {/* <div className="space-y-1">
            <p className="text-[#515966] font-bold text-sm">Password</p>
            <div className="bg-[#515966] rounded-lg px-2 flex w-[14rem] items-center">
              <input
                required
                value={password}
                placeholder="Password"
                type={showPassword ? "text" : "password"}
                pattern="^(?=.*[A-Z])(?=.*[@])(?=.*\d).{6,}$"
                onChange={(e) => setPassword(e.target.value)}
                title="USE ONE : @-Number-UpperCase (at least 6 character)"
                className="bg-[#515966] text-white rounded-lg outline-none py-2  placeholder:text-sm"
              />
              {showPassword ? (
                <VisibilityIcon
                  onClick={() => setShowPassword(!showPassword)}
                  className="cursor-pointer"
                />
              ) : (
                <VisibilityOffIcon
                  onClick={() => setShowPassword(!showPassword)}
                  className="cursor-pointer"
                />
              )}
            </div>
          </div> */}
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
                    options={course.map((course) => ({
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
            <p className="text-[#515966] font-bold text-sm">Father Name</p>
            <div className="bg-[#515966] rounded-lg w-[14rem] flex  items-center">
              <input
                type="text"
                value={fatherName}
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
                value={contactNumber}
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
              value={year} // You need to define this state variable
              onChange={(e) => setYear(e.target.value)} // And the corresponding setState function
              >
              <option value="" disabled>Select year</option>
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
              value={semester} // You need to define this state variable
              onChange={(e) => setSemester(e.target.value)} // And the corresponding setState function
              >
              <option value="" disabled>Select semester</option>
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
            <p className="text-[#515966] font-bold text-sm">Avatar</p>
            <div className="bg-[#515966] rounded-lg flex items-center w-full">
              <input
                required
                type="file"
                value={avatar}
                onChange={(e) => setAvatar(e.target.value)}
                className="bg-[#515966] text-white px-2 outline-none py-2 rounded-lg placeholder:text-sm"
              />
            </div>
          </div>
         
          <div className="space-y-1">
            <p className="text-[#515966] font-bold text-sm">university_roll_no</p>
            <div className="bg-[#515966] rounded-lg w-[14rem] flex  items-center">
              <input
                required
                type="number"
                value={university_roll_no}
                onChange={(e) => (e.target.value)}
                className="bg-[#515966] text-white px-2 outline-none py-2 rounded-lg placeholder:text-sm"
              />
            </div>
          </div>
          
          <div className="space-y-1">
            <p className="text-[#515966] font-bold text-sm">university_enrollment_no</p>
            <div className="bg-[#515966] rounded-lg w-[14rem] flex  items-center">
              <input
                required
                type="number"
                value={university_enrollment_no}
                onChange={(e) => (e.target.value)}
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
            <a href="/"  className="w-36 hover:scale-105 transition-all duration-150 rounded-lg flex items-right justify-center text-white text-base py-1 bg-[#FF2400]">
               Home
            </a>
          </div>
          {loading && (
            <Spinner
              message="Logging In"
              height={30}
              width={150}
              color="#ffffff"
              messageColor="#fff"
            />
          )}
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
