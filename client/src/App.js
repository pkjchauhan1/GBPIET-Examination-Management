import React from "react";
import { Routes, Route } from "react-router-dom";
import AddAdmin from "./components/admin/addAdmin/AddAdmin";
import AddCourse from "./components/admin/addCourse/AddCourse";
import AddFaculty from "./components/admin/addFaculty/AddFaculty";
import AddStudent from "./components/faculty/addStudent/AddStudent";
import AddSubject from "./components/faculty/addSubject/AddSubject";
import AdminHome from "./components/admin/AdminHome";

import GetFaculty from "./components/admin/getFaculty/GetFaculty";
import GetStudent from "./components/faculty/getStudent/GetStudent";
import GetSubject from "./components/faculty/getSubject/GetSubject";
import AdminProfile from "./components/admin/profile/Profile";
import AdminFirstTimePassword from "./components/admin/profile/update/firstTimePassword/FirstTimePassword";
import AdminPassword from "./components/admin/profile/update/password/Password";

import AdminUpdate from "./components/admin/profile/update/Update";
import CreateTest from "./components/faculty/createTest/CreateTest";
import FacultyHome from "./components/faculty/FacultyHome";
import FacultyProfile from "./components/faculty/profile/Profile";
import FacultyFirstTimePassword from "./components/faculty/profile/update/firstTimePassword/FirstTimePassword";
import FacultyPassword from "./components/faculty/profile/update/password/Password";
import FacultyUpdate from "./components/faculty/profile/update/Update";
import UploadMarks from "./components/faculty/uploadMarks/UploadMarks";
import AdminLogin from "./components/login/adminLogin/AdminLogin";
import AdminRegister from "./components/register/adminRegister/AdminRegister";
import FacultyLogin from "./components/login/facultyLogin/FacultyLogin";
import FacultyRegister from "./components/register/facultyRegister/FacultyRegister";
import Login from "./components/login/Login";
import Register from "./components/register/Register";

import StudentLogin from "./components/login/studentLogin/StudentLogin";
import StudentRegister from "./components/register/studentRegister/StudentRegister";
import StudentFirstTimePassword from "./components/student/profile/update/firstTimePassword/FirstTimePassword";
import StudentHome from "./components/student/StudentHome";
import StudentProfile from "./components/student/profile/Profile";
import StudentUpdate from "./components/student/profile/update/Update";
import StudentPassword from "./components/student/profile/update/password/Password";
import SubjectList from "./components/student/subjectList/SubjectList";
import TestResult from "./components/student/testResult/TestResult";
import DeleteAdmin from "./components/admin/deleteAdmin/DeleteAdmin";
import DeleteCourse from "./components/admin/deleteCourse/DeleteCourse";
import DeleteFaculty from "./components/admin/deleteFaculty/DeleteFaculty";
import DeleteStudent from "./components/faculty/deleteStudent/DeleteStudent";
import DeleteSubject from "./components/faculty/deleteSubject/DeleteSubject";
import CreateNotice from "./components/admin/createNotice/CreateNotice";

const App = () => {
  return (
    <Routes>
      <Route exact path="/" element={<Login />} />
      <Route exact path="/register" element={<Register />} />

      {/* Admin  */}

      <Route path="/login/adminlogin" element={<AdminLogin />} />
      <Route path="/register/admin-register" element={<AdminRegister />} />
      <Route path="/admin/home" element={<AdminHome />} />
      <Route path="/admin/profile" element={<AdminProfile />} />
      <Route path="/admin/update" element={<AdminUpdate />} />
      <Route path="/admin/update/password" element={<AdminPassword />} />
      <Route
        path="/admin/updatepassword"
        element={<AdminFirstTimePassword />}
      />
      <Route path="/admin/createnotice" element={<CreateNotice />} />
      <Route path="/admin/addadmin" element={<AddAdmin />} />
      <Route path="/admin/deleteadmin" element={<DeleteAdmin />} />
      <Route path="/admin/addcourse" element={<AddCourse />} />
      <Route path="/admin/deletecourse" element={<DeleteCourse />} />
      <Route path="/admin/addfaculty" element={<AddFaculty />} />
      <Route path="/admin/deletefaculty" element={<DeleteFaculty />} />
      <Route path="/faculty/deletestudent" element={<DeleteStudent />} />
      <Route path="/faculty/deletesubject" element={<DeleteSubject />} />
      <Route path="/admin/allfaculty" element={<GetFaculty />} />
      <Route path="/faculty/addstudent" element={<AddStudent />} />
      <Route path="/faculty/addsubject" element={<AddSubject />} />
      <Route path="/faculty/allsubject" element={<GetSubject />} />
      <Route path="/faculty/allstudent" element={<GetStudent />} />

      {/* Faculty  */}

      <Route path="/login/facultylogin" element={<FacultyLogin />} />
      <Route path="/register/faculty-register" element={<FacultyRegister />} />
      <Route path="/faculty/home" element={<FacultyHome />} />
      <Route path="/faculty/password" element={<FacultyFirstTimePassword />} />
      <Route path="/faculty/profile" element={<FacultyProfile />} />
      <Route path="/faculty/update" element={<FacultyUpdate />} />
      <Route path="/faculty/update/password" element={<FacultyPassword />} />
      <Route path="/faculty/createtest" element={<CreateTest />} />
      <Route path="/faculty/uploadmarks" element={<UploadMarks />} />

      {/* Student  */}

      <Route path="/login/studentlogin" element={<StudentLogin />} />
      <Route path="/register/student-register" element={<StudentRegister />} />
      <Route path="/student/home" element={<StudentHome />} />
      <Route path="/student/password" element={<StudentFirstTimePassword />} />
      <Route path="/student/profile" element={<StudentProfile />} />
      <Route path="/student/update" element={<StudentUpdate />} />
      <Route path="/student/update/password" element={<StudentPassword />} />
      <Route path="/student/subjectlist" element={<SubjectList />} />
      <Route path="/student/testresult" element={<TestResult />} />
    </Routes>
  );
};

export default App;
