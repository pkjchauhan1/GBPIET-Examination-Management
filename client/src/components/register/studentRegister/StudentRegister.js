import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import axios from "axios";
import Select from "react-select";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";
import Modal from "react-modal";

import { addStudent } from "../../../redux/actions/facultyActions";

Modal.setAppElement("#root");

const validationSchema = Yup.object({
  name: Yup.string().required("Name Required"),
  email: Yup.string().email("Invalid Email Address").required("Email Required"),
  gender: Yup.string().required("Gender Required"),
  course: Yup.string()
    .matches(
      /^[0-9a-fA-F]{24}$/,
      "Invalid course ID. It should be a 24-character hexadecimal string."
    )
    .required("Course ID is required"),
  contact_number: Yup.string()
    .matches(/^\d{10}$/, "Invalid Contact Number")
    .required("Contact Number Required"),
  year: Yup.string().required("Year Required"),
  semester: Yup.string().required("Semester Required"),
  college_id: Yup.string()
    .matches(/^\d{7}$/, "Enter 7 Digit Number")
    .required("College ID is required"),
  university_roll_no: Yup.string()
    .matches(/^\d{12}$/, "Enter 12 Digit Number")
    .required("University Roll Number is required"),
  university_enrollment_no: Yup.string()
    .matches(/^\d{12}$/, "Enter 12 Digit Number")
    .required("University Enrollment Number is required"),
  father_name: Yup.string().required("Father Name Required"),
  batch: Yup.string()
    .matches(/^\d{4}$/, "Enter a valid 4-digit year")
    .required("Batch is required"),
});

const StudentRegister = () => {
  const [courses, setCourses] = useState([]);
  const [modalIsOpen, setModalIsOpen] = useState(false);

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
      } catch (error) {
        console.error("Failed to load courses", error);
      }
    };

    fetchCourses();
  }, []);

  return (
    <>
      <div className="bg-[#04bd7d] h-screen w-screen flex items-center justify-center">
        <div className="flex">
          <Formik
            initialValues={{
              name: "",
              email: "",
              gender: "",
              course: "",
              contact_number: "",
              year: "",
              semester: "",
              college_id: "",
              university_roll_no: "",
              university_enrollment_no: "",
              father_name: "",
              batch: "",
            }}
            validationSchema={validationSchema}
            onSubmit={(values, { setSubmitting }) => {
              dispatch(addStudent(values))
                .then(() => {
                  setModalIsOpen(true);
                })
                .catch((error) => {
                  console.error("Registration failed", error);
                })
                .finally(() => setSubmitting(false));
            }}
          >
            {({ isSubmitting, setFieldValue, values }) => (
              <Form className="h-[40rem] w-full bg-[#2c2f35] grid gap-4 p-[2rem] rounded-3xl shadow-2xl">
                <h1 className="text-white text-3xl font-semibold col-span-3">
                  Student
                </h1>

                <div className="space-y-1">
                  <label
                    htmlFor="name"
                    className="text-[#515966] font-bold text-sm"
                  >
                    Name
                  </label>
                  <div className="bg-[#515966] rounded-lg w-[14rem] flex  items-center">
                    <Field
                      type="text"
                      name="name"
                      placeholder="Enter Name"
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
                  <div className="bg-[#515966] rounded-lg w-[14rem] flex  items-center">
                    <Field
                      type="text"
                      name="email"
                      placeholder="Enter Email"
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
                      <option value="" disabled>
                        Select Gender
                      </option>
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
                  <div className="bg-[#515966] rounded-lg w-[14rem] flex  items-center">
                    <Field
                      type="text"
                      name="contact_number"
                      placeholder="Contact Number"
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
                    htmlFor="father_name"
                    className="text-[#515966] font-bold text-sm"
                  >
                    Father Name
                  </label>
                  <div className="bg-[#515966] rounded-lg w-[14rem] flex  items-center">
                    <Field
                      type="text"
                      name="father_name"
                      placeholder="Enter Father Name"
                      className="bg-[#515966] text-white px-2 outline-none py-2 rounded-lg placeholder:text-sm"
                    />
                  </div>
                  <ErrorMessage
                    name="father_name"
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
                  <Select
                    options={courses}
                    classNamePrefix="select"
                    onChange={(option) =>
                      setFieldValue("course", option ? option.value : "")
                    }
                    value={courses.find(
                      (option) => option.value === values.course
                    )}
                    placeholder="Select Course"
                  />
                  <ErrorMessage
                    name="course"
                    component="div"
                    className="error text-red-500 text-sm"
                  />
                </div>

                <div className="space-y-1">
                  <label
                    htmlFor="year"
                    className="text-[#515966] font-bold text-sm"
                  >
                    Year
                  </label>
                  <div className="bg-[#515966] rounded-lg w-[14rem] flex  items-center">
                    <Field
                      as="select"
                      name="year"
                      className="bg-[#515966] text-white px-2 outline-none py-2 rounded-lg w-full cursor-pointer"
                    >
                      <option value="" disabled>
                        Select Year
                      </option>
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                    </Field>
                  </div>
                  <ErrorMessage
                    name="year"
                    component="div"
                    className="error text-red-500 text-sm"
                  />
                </div>

                <div className="space-y-1">
                  <label
                    htmlFor="semester"
                    className="text-[#515966] font-bold text-sm"
                  >
                    Semester
                  </label>
                  <div className="bg-[#515966] rounded-lg w-[14rem] flex  items-center">
                    <Field
                      as="select"
                      name="semester"
                      className="bg-[#515966] text-white px-2 outline-none py-2 rounded-lg w-full cursor-pointer"
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
                    </Field>
                  </div>
                  <ErrorMessage
                    name="semester"
                    component="div"
                    className="error text-red-500 text-sm"
                  />
                </div>

                <div className="space-y-1">
                  <label
                    htmlFor="batch"
                    className="text-[#515966] font-bold text-sm"
                  >
                    Batch
                  </label>
                  <div className="bg-[#515966] rounded-lg w-[14rem] flex  items-center">
                    <Field
                      type="text"
                      name="batch"
                      placeholder="Ex: 2022, 2024"
                      className="bg-[#515966] text-white px-2 outline-none py-2 rounded-lg placeholder:text-sm"
                    />
                  </div>
                  <ErrorMessage
                    name="batch"
                    component="div"
                    className="error text-red-500 text-sm"
                  />
                </div>

                <div className="space-y-1">
                  <label
                    htmlFor="college_id"
                    className="text-[#515966] font-bold text-sm"
                  >
                    College ID
                  </label>
                  <div className="bg-[#515966] rounded-lg w-[14rem] flex  items-center">
                    <Field
                      type="text"
                      name="college_id"
                      placeholder="Enter 07 Digit Number"
                      className="bg-[#515966] text-white px-2 outline-none py-2 rounded-lg placeholder:text-sm"
                    />
                  </div>
                  <ErrorMessage
                    name="college_id"
                    component="div"
                    className="error text-red-500 text-sm"
                  />
                </div>

                <div className="space-y-1">
                  <label
                    htmlFor="university_enrollment_no"
                    className="text-[#515966] font-bold text-sm"
                  >
                    University Enrollment Number
                  </label>
                  <div className="bg-[#515966] rounded-lg w-[14rem] flex  items-center">
                    <Field
                      type="text"
                      name="university_enrollment_no"
                      placeholder="Enter 12 Digit Number"
                      className="bg-[#515966] text-white px-2 outline-none py-2 rounded-lg placeholder:text-sm"
                    />
                  </div>
                  <ErrorMessage
                    name="university_enrollment_no"
                    component="div"
                    className="error text-red-500 text-sm"
                  />
                </div>

                <div className="space-y-1">
                  <label
                    htmlFor="university_roll_no"
                    className="text-[#515966] font-bold text-sm"
                  >
                    University Roll Number
                  </label>
                  <div className="bg-[#515966] rounded-lg w-[14rem] flex  items-center">
                    <Field
                      type="text"
                      name="university_roll_no"
                      placeholder="Enter 12 Digit Number"
                      className="bg-[#515966] text-white px-2 outline-none py-2 rounded-lg placeholder:text-sm"
                    />
                  </div>
                  <ErrorMessage
                    name="university_roll_no"
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
