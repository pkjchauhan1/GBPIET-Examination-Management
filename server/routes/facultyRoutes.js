import express from "express";
import {
  facultyLogin,
  updatedPassword,
  updateFaculty,
  getStudent,
  addSubject,
  getSubject,
  getAllSubject,
  deleteSubject,
  addStudent,
  getAllStudent,
  deleteStudent,
} from "../controller/facultyController.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.post("/login", facultyLogin);
router.post("/updatepassword", auth, updatedPassword);
router.post("/updateprofile", auth, updateFaculty);

router.post("/addstudent", addStudent);
router.post("/getstudent", auth, getStudent);
router.get("/getallstudent", auth, getAllStudent);
router.post("/deletestudent", auth, deleteStudent);

router.post("/addsubject", auth, addSubject);
router.post("/getsubject", getSubject);
router.get("/getallsubject", getAllSubject);
router.post("/deletesubject", auth, deleteSubject);

export default router;
