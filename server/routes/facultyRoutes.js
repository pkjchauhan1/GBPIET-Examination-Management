import express from "express";
import {
  facultyLogin,
  updatedPassword,
  updateFaculty,
  getStudent,
} from "../controller/facultyController.js";
import auth from "../middleware/auth.js";

const router = express.Router();

router.post("/login", facultyLogin);
router.post("/updatepassword", auth, updatedPassword);
router.post("/updateprofile", auth, updateFaculty);
router.post("/getstudent", auth, getStudent);

export default router;
