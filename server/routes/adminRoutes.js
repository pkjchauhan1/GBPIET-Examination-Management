import express from "express";
import auth from "../middleware/auth.js";
import {
  adminLogin,
  updateAdmin,
  addAdmin,
  addFaculty,
  getFaculty,
  addCourse,
  getAllFaculty,
  getAllAdmin,
  getAllCourse,
  updatedPassword,
  getAdmin,
  deleteAdmin,
  deleteCourse,
  deleteFaculty,
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

router.post("/addfaculty", addFaculty);
router.post("/getfaculty", auth, getFaculty);
router.get("/getallfaculty", auth, getAllFaculty);
router.post("/deletefaculty", auth, deleteFaculty);

router.post("/addcourse", auth, addCourse);
router.get("/getallcourse", getAllCourse);
router.post("/deletecourse", auth, deleteCourse);

export default router;
