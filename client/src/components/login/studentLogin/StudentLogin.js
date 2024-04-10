import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import Spinner from "../../../utils/Spinner";
import { studentSignIn } from "../../../redux/actions/studentActions";

import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm, Controller } from "react-hook-form";

const schema = yup
  .object({
    college_id: yup.string().required(),
    password: yup.string().required(),
  })
  .required();

const defaultValues = {
  college_id: "",
  password: "",
};

const StudentLogin = () => {
  const [loading, setLoading] = useState(false);
  const [translate, setTranslate] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

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
    setTimeout(() => {
      setTranslate(true);
    }, 1000);
  }, []);

  const onSubmit = ({ college_id, password }) => {
    setLoading(true);

    dispatch(studentSignIn({ college_id, password }, navigate));
  };

  return (
    <div className="bg-[#04bd7d] h-screen w-screen flex items-center justify-center">
    
      <div className="grid grid-cols-2">
        <div
          className={`h-96 w-96 bg-white flex items-center justify-center ${
            translate ? "translate-x-[12rem]" : ""
          }  duration-1000 transition-all rounded-3xl shadow-2xl`}
        >
          <h1 className="text-[3rem]  font-bold text-center">
            Student
            <br />
            Login
          </h1>
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className={`${
            loading ? "h-[27rem]" : "h-96"
          } w-96 bg-[#2c2f35] flex flex-col items-center justify-center ${
            translate ? "-translate-x-[12rem]" : ""
          }  duration-1000 transition-all space-y-6 rounded-3xl shadow-2xl`}
        >
          <h1 className="text-white text-3xl font-semibold">Student</h1>
          <div className="space-y-1">
            <p className="text-[#515966] font-bold text-sm">College ID</p>
            <div
              className={`bg-[#515966] rounded-lg w-[14rem] flex  items-center ${
                errors.college_id ? "border border-red-500" : ""
              }`}
            >
              <Controller
                name="college_id"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <input
                    type="text"
                    placeholder="College ID"
                    className="bg-[#515966] text-white px-2 outline-none py-2 rounded-lg placeholder:text-sm"
                    {...field}
                  />
                )}
              />
            </div>
          </div>
          <div className="space-y-1">
            <p className="text-[#515966] font-bold text-sm">Password</p>
            <div
              className={`bg-[#515966] rounded-lg px-2 flex items-center ${
                errors.password ? "border border-red-500" : ""
              }`}
            >
              <Controller
                name="password"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <>
                    <input
                      placeholder="Password"
                      type={showPassword ? "text" : "password"}
                      pattern="^(?=.*[A-Z])(?=.*[@])(?=.*\d).{6,}$"
                      title="USE ONE : @-Number-UpperCase (at least 6 character)"
                      className="bg-[#515966] text-white rounded-lg outline-none py-2  placeholder:text-sm"
                      {...field}
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
                  </>
                )}
              />
            </div>
          </div>
          <button
            type="submit"
            className="w-32 hover:scale-105 transition-all duration-150 rounded-lg flex items-center justify-center text-white text-base py-1 bg-[#04bd7d]"
          >
            Login
          </button>
          <a href="/" className="w-32 hover:scale-105 transition-all duration-150 rounded-lg flex items-right justify-center text-white text-base py-1 bg-[#FF2400]">
          Home
        
      
      </a>
          {loading && (
            <Spinner
              message="Logging In"
              height={30}
              width={150}
              color="#ffffff"
              messageColor="#fff"
            />
          )}
          <ul className="mt-2">
            {errors.college_id ? (
              <li>
                <small className="text-red-500">
                  {errors.college_id.message}
                </small>
              </li>
            ) : null}
            {errors.password ? (
              <li>
                <small className="text-red-500">
                  {errors.password.message}
                </small>
              </li>
            ) : null}
          </ul>
        </form>
      </div>
    </div>
  );
};

export default StudentLogin;
