import express from "express";
import auth from "../middleware/auth.js";
import {
  adminLogin,
  updateAdmin,
  addAdmin,
  addFaculty,
  getFaculty,
  addSubject,
  getSubject,
  addStudent,
  getStudent,
  addCourse,
  getAllStudent,
  getAllFaculty,
  getAllAdmin,
  getAllCourse,
  getAllSubject,
  updatedPassword,
  getAdmin,
  deleteAdmin,
  deleteCourse,
  deleteFaculty,
  deleteStudent,
  deleteSubject,
  createNotice,
  getNotice,
} from "../controller/adminController.js";

const router = express.Router();

router.post("/login", adminLogin);

router.post("/updatepassword", auth, updatedPassword);
router.post("/addadmin", addAdmin);
router.post("/getadmin", auth, getAdmin);
router.get("/getalladmin", auth, getAllAdmin);
router.post("/updateprofile", auth, updateAdmin);
router.post("/deleteadmin", auth, deleteAdmin);

router.post("/createnotice", auth, createNotice);
router.post("/getnotice", auth, getNotice);

router.post("/addstudent", auth, addStudent);
router.post("/getstudent", auth, getStudent);
router.get("/getallstudent", auth, getAllStudent);
router.post("/deletestudent", auth, deleteStudent);

router.post("/addfaculty", auth, addFaculty);
router.post("/getfaculty", auth, getFaculty);
router.get("/getallfaculty", auth, getAllFaculty);
router.post("/deletefaculty", auth, deleteFaculty);

router.post("/addcourse", auth, addCourse);
router.get("/getallcourse", auth, getAllCourse);
router.post("/deletecourse", auth, deleteCourse);

router.post("/addsubject", auth, addSubject);
router.post("/getsubject", auth, getSubject);
router.get("/getallsubject", auth, getAllSubject);
router.post("/deletesubject", auth, deleteSubject);

export default router;
