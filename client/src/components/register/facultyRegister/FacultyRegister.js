import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import Select from "react-select";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import Modal from "react-modal";

import { addFaculty } from "../../../redux/actions/adminActions.js";

Modal.setAppElement("#root");

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  gender: Yup.string().required("Gender is required"),
  contact_number: Yup.string()
    .matches(/^\d{10}$/, "Contact number must be 10 digits")
    .required("Contact number is required"),
  course: Yup.array()
    .min(1, "At least one course is required")
    .required("Course is required"),
});

const FacultyRegister = () => {
  const [courses, setCourses] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [errorModalIsOpen, setErrorModalIsOpen] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        const response = await axios.get(
          "http://localhost:4000/api/admin/getallcourse"
        );
        setCourses(
          response.data.map((course) => ({
            value: course._id,
            label: course.course,
          }))
        );
      } catch (error) {}
    };

    fetchCourses();
  }, []);

  const onSubmit = (values, { setSubmitting, setFieldError }) => {
    const courseIds = values.course.map((course) => course.value);
    const submissionData = {
      ...values,
      course: courseIds,
    };

    dispatch(addFaculty(submissionData))
      .then((response) => {
        setSubmitting(false);
        if (response && response.success) {
          setModalIsOpen(true);
        } else if (response && response.errors) {
          if (response.errors.email) {
            setFieldError("email", response.errors.email);
          }
          if (response.errors.contact_number) {
            setFieldError("contact_number", response.errors.contact_number);
          }
        } else {
          setErrorMessage("An unexpected error occurred.");
          setErrorModalIsOpen(true);
        }
      })
      .catch((error) => {
        setSubmitting(false);
        if (
          error.response &&
          error.response.data &&
          error.response.data.errors
        ) {
          if (error.response.data.errors.email) {
            setFieldError("email", error.response.data.errors.email);
          }
          if (error.response.data.errors.contact_number) {
            setFieldError(
              "contact_number",
              error.response.data.errors.contact_number
            );
          }
        } else {
          setErrorMessage("An unexpected error occurred. Please try again.");
          setErrorModalIsOpen(true);
        }
      });
  };

  return (
    <>
      <div className="bg-[#04bd7d] h-screen w-screen flex items-center justify-center">
        <div className="h-[40rem] w-[25rem] flex flex-col justify-center items-center">
          <Formik
            initialValues={{
              name: "",
              email: "",
              gender: "",
              contact_number: "",
              course: [],
            }}
            validationSchema={validationSchema}
            onSubmit={onSubmit}
          >
            {({ setFieldValue, isSubmitting }) => (
              <Form className="h-[40rem] w-full bg-[#2c2f35] flex flex-col justify-center items-center gap-4 rounded-3xl shadow-2xl md:p-6 md:h-auto sm:p-4 sm:h-auto">
                <h1 className="text-white text-3xl font-semibold col-span-2">
                  Faculty Register
                </h1>

                <div className="space-y-1">
                  <label
                    htmlFor="name"
                    className="text-[#515966] font-bold text-sm"
                  >
                    Name
                  </label>
                  <div className="bg-[#515966] rounded-lg w-[14rem] flex items-center">
                    <Field
                      name="name"
                      type="text"
                      placeholder="Enter Your Name"
                      className="bg-[#515966] text-white px-2 outline-none py-2 rounded-lg placeholder:text-sm"
                    />
                  </div>
                  <ErrorMessage
                    name="name"
                    component="div"
                    className="error text-red-500 text-sm"
                  />
                </div>

                <div className="space-y-1">
                  <label
                    htmlFor="email"
                    className="text-[#515966] font-bold text-sm"
                  >
                    Email
                  </label>
                  <div className="bg-[#515966] rounded-lg w-[14rem] flex items-center">
                    <Field
                      name="email"
                      type="text"
                      placeholder="Enter Your Email"
                      className="bg-[#515966] text-white px-2 outline-none py-2 rounded-lg placeholder:text-sm"
                    />
                  </div>
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="error text-red-500 text-sm"
                  />
                </div>

                <div className="space-y-1">
                  <label
                    htmlFor="gender"
                    className="text-[#515966] font-bold text-sm"
                  >
                    Gender
                  </label>
                  <div className="bg-[#515966] rounded-lg w-[14rem] flex items-center">
                    <Field
                      as="select"
                      name="gender"
                      className="bg-[#515966] text-white px-2 outline-none py-2 rounded-lg w-full cursor-pointer"
                    >
                      <option value="">Select Gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                    </Field>
                  </div>
                  <ErrorMessage
                    name="gender"
                    component="div"
                    className="error text-red-500 text-sm"
                  />
                </div>

                <div className="space-y-1">
                  <label
                    htmlFor="contact_number"
                    className="text-[#515966] font-bold text-sm"
                  >
                    Contact Number
                  </label>
                  <div className="bg-[#515966] rounded-lg w-[14rem] flex items-center">
                    <Field
                      name="contact_number"
                      type="text"
                      placeholder="10 Digit Number"
                      className="bg-[#515966] text-white px-2 outline-none py-2 rounded-lg placeholder:text-sm"
                    />
                  </div>
                  <ErrorMessage
                    name="contact_number"
                    component="div"
                    className="error text-red-500 text-sm"
                  />
                </div>

                <div className="space-y-1">
                  <label
                    htmlFor="course"
                    className="text-[#515966] font-bold text-sm"
                  >
                    Course
                  </label>
                  <div className="bg-[#515966] rounded-lg w-[14rem] flex items-center">
                    <Select
                      isMulti
                      name="course"
                      options={courses}
                      classNamePrefix="select"
                      onChange={(opt) => setFieldValue("course", opt)}
                      className="react-select-container w-full"
                    />
                  </div>
                  <ErrorMessage
                    name="course"
                    component="div"
                    className="error text-red-500 text-sm"
                  />
                </div>

                <div className="col-span-3 flex items-center justify-between">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="submit-button-class w-32 hover:scale-105 transition-all duration-150 rounded-lg flex items-center justify-center text-white text-base py-1 bg-[#04bd7d]"
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
              </Form>
            )}
          </Formik>
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
            className="close-button"
          >
            OK
          </button>
        </div>
      </Modal>
      <Modal
        isOpen={errorModalIsOpen}
        onRequestClose={() => setErrorModalIsOpen(false)}
        contentLabel="Registration Error"
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
          Registration Failed
        </h2>
        <p className="text-center">{errorMessage}</p>
        <div className="mt-4 flex justify-center">
          <button
            onClick={() => setErrorModalIsOpen(false)}
            className="close-button"
          >
            Close
          </button>
        </div>
      </Modal>
    </>
  );
};

export default FacultyRegister;
