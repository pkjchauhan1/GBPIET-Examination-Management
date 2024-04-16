import Admin from "../models/admin.js";
import Course from "../models/course.js";
import Faculty from "../models/faculty.js";
import Notice from "../models/notice.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import transporter from "../config/nodeMailerConfig.js";
import fs from "fs/promises";
import { fileURLToPath } from "url";
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function sendEmails(users) {
  const htmlTemplate = await fs.readFile(
    path.join(__dirname, "faculty_welcome_email.html"),
    "utf8"
  );

  for (const user of users) {
    let htmlContent = htmlTemplate
      .replace("{{user_email}}", user.email)
      .replace("{{user_pass}}", user.newPassword)
      .replace("{{user_name}}", user.name);

    try {
      const mailInfo = await transporter.sendMail({
        from: process.env.EMAIL_FROM,
        to: user.email,
        subject: "Welcome to GBPIET Result Management System",
        html: htmlContent,
      });
      return mailInfo;
    } catch (error) {
      console.error(`Failed to send email to ${user.email}:`, error);
    }
  }
}

async function sendStudentEmails(users) {
  const htmlTemplate = await fs.readFile(
    path.join(__dirname, "student_welcome_email .html"),
    "utf8"
  );

  for (const user of users) {
    let htmlContent = htmlTemplate
      .replace("{{user_college_id}}", user.college_id)
      .replace("{{user_pass}}", user.newPassword)
      .replace("{{user_name}}", user.name);

    try {
      const mailInfo = await transporter.sendMail({
        from: process.env.EMAIL_FROM,
        to: user.email,
        subject: "Welcome to GBPIET Result Management System",
        html: htmlContent,
      });
      return mailInfo;
    } catch (error) {
      console.error(`Failed to send email to ${user.email}:`, error);
    }
  }
}

export const adminLogin = async (req, res) => {
  const { username, password } = req.body;
  const errors = { usernameError: "", passwordError: "" };
  try {
    const existingAdmin = await Admin.findOne({
      username,
    });
    if (!existingAdmin) {
      errors.usernameError = "Admin doesn't exist.";
      return res.status(404).json(errors);
    }
    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingAdmin.password
    );

    if (!isPasswordCorrect) {
      errors.passwordError = "Invalid Credentials";
      return res.status(404).json(errors);
    }
    const token = jwt.sign(
      {
        username: existingAdmin.username,
        id: existingAdmin._id,
      },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );

    res.status(200).json({ result: existingAdmin, token: token });
  } catch (error) {
    console.log(error);
  }
};

export const updatedPassword = async (req, res) => {
  try {
    const { newPassword, confirmPassword, email } = req.body;
    const errors = { mismatchError: String };
    if (newPassword !== confirmPassword) {
      errors.mismatchError =
        "Your password and confirmation password do not match";
      return res.status(400).json(errors);
    }

    const admin = await Admin.findOne({ email });
    let hashedPassword;
    hashedPassword = await bcrypt.hash(newPassword, 10);
    admin.password = hashedPassword;
    await admin.save();
    if (admin.passwordUpdated === false) {
      admin.passwordUpdated = true;
      await admin.save();
    }

    res.status(200).json({
      success: true,
      message: "Password updated successfully",
      response: admin,
    });
  } catch (error) {
    const errors = { backendError: String };
    errors.backendError = error;
    res.status(500).json(errors);
  }
};

export const updateAdmin = async (req, res) => {
  try {
    const { name, course, contactNumber, email } = req.body;
    const updatedAdmin = await Admin.findOne({ email });
    if (name) {
      updatedAdmin.name = name;
      await updatedAdmin.save();
    }
    if (course) {
      updatedAdmin.course = course;
      await updatedAdmin.save();
    }
    if (contactNumber) {
      updatedAdmin.contactNumber = contactNumber;
      await updatedAdmin.save();
    }
    res.status(200).json(updatedAdmin);
  } catch (error) {
    const errors = { backendError: String };
    errors.backendError = error;
    res.status(500).json(errors);
  }
};

export const addAdmin = async (req, res) => {
  try {
    const { name, course, contactNumber, email } = req.body;
    const errors = { emailError: String };
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      errors.emailError = "Email already exists";
      return res.status(400).json(errors);
    } else if (contactNumber.toString().length != 10) {
      return res.status(400).json({ message: "Invalid contact number" });
    }
    // const existingCourse = await Course.findOne({ course });
    // let courseHelper = existingCourse?.courseCode;
    const admins = await Admin.find({ course });

    let helper;
    if (admins.length < 10) {
      helper = "0" + admins.length.toString();
    } else if (admins.length < 100 && admins.length > 9) {
      helper = "0" + admins.length.toString();
    } else {
      helper = admins.length.toString();
    }
    var date = new Date();
    var components = ["ADM", date.getFullYear(), helper];

    var username = components.join("");

    let newPassword = "@Abc12345";
    let hashedPassword = await bcrypt.hash(newPassword, 10);
    var passwordUpdated = false;

    const newAdmin = await new Admin({
      name,
      email,
      password: hashedPassword,
      joiningYear,
      username,
      course,
      contactNumber,
      passwordUpdated,
    });
    await newAdmin.save();
    sendEmails([{ username: username, newPassword: newPassword, name: name }]);

    return res.status(200).json({
      success: true,
      message: "Admin registerd successfully and email sent",
      response: newAdmin,
    });
  } catch (error) {
    const errors = { backendError: String };
    errors.backendError = error;
    res.status(500).json({ error: error.message });
  }
};

export const createNotice = async (req, res) => {
  try {
    const { from, content, topic, date, noticeFor } = req.body;

    const errors = { noticeError: String };
    const exisitingNotice = await Notice.findOne({ topic, content, date });
    if (exisitingNotice) {
      errors.noticeError = "Notice already created";
      return res.status(400).json(errors);
    }
    const newNotice = await new Notice({
      from,
      content,
      topic,
      noticeFor,
      date,
    });
    await newNotice.save();
    return res.status(200).json({
      success: true,
      message: "Notice created successfully",
      response: newNotice,
    });
  } catch (error) {
    const errors = { backendError: String };
    errors.backendError = error;
    res.status(500).json(errors);
  }
};

export const addCourse = async (req, res) => {
  try {
    const { course } = req.body;
    const existingCourse = await Course.findOne({ course });
    if (existingCourse) {
      return res.status(400).json({ message: "Course already added" });
    }

    const newCourse = await new Course({
      course,
    });

    await newCourse.save();
    return res.status(200).json({
      success: true,
      message: "Course added successfully",
      response: newCourse,
    });
  } catch (error) {
    const errors = { backendError: String };
    errors.backendError = error;
    res.status(500).json(errors);
  }
};

export const addFaculty = async (req, res) => {
  try {
    const { name, course, contact_number, email, gender } = req.body;
    const errors = { facultyError: String };
    const existingFaculty = await Faculty.findOne({
      $or: [{ email: email }, { contact_number: contact_number }],
    });

    if (existingFaculty) {
      errors.facultyError = "Faculty already exists";
      return res.status(400).json(errors);
    } else if (contact_number.toString().length != 10) {
      return res.status(400).json({ message: "Invalid contact number" });
    } else {
      let newPassword = "@Abc12345";
      let hashedPassword = await bcrypt.hash(newPassword, 10);
      var passwordUpdated = false;

      const newFaculty = await new Faculty({
        name,
        password: hashedPassword,
        course,
        contact_number,
        email,
        gender,
        passwordUpdated,
      });
      await newFaculty.save();
      sendEmails([{ email: email, newPassword: newPassword, name: name }]);
      return res.status(200).json({
        success: true,
        message: "Faculty registerd successfully, email sent",
        response: newFaculty,
      });
    }
  } catch (error) {
    const errors = { backendError: String };
    errors.backendError = error;
    res.status(500).json(errors);
  }
};

export const getFaculty = async (req, res) => {
  try {
    const { course } = req.body;
    const errors = { noFacultyError: String };
    const faculties = await Faculty.find({ course });
    if (faculties.length === 0) {
      errors.noFacultyError = "No Faculty Found";
      return res.status(404).json(errors);
    }
    res.status(200).json({ result: faculties });
  } catch (error) {
    const errors = { backendError: String };
    errors.backendError = error;
    res.status(500).json(errors);
  }
};

export const getNotice = async (req, res) => {
  try {
    const errors = { noNoticeError: String };
    const notices = await Notice.find({});
    if (notices.length === 0) {
      errors.noNoticeError = "No Notice Found";
      return res.status(404).json(errors);
    }
    res.status(200).json({ result: notices });
  } catch (error) {
    const errors = { backendError: String };
    errors.backendError = error;
    res.status(500).json(errors);
  }
};

export const getAdmin = async (req, res) => {
  try {
    const { course } = req.body;

    const errors = { noAdminError: String };

    const admins = await Admin.find({ course });
    if (admins.length === 0) {
      errors.noAdminError = "No Subject Found";
      return res.status(404).json(errors);
    }
    res.status(200).json({ result: admins });
  } catch (error) {
    const errors = { backendError: String };
    errors.backendError = error;
    res.status(500).json(errors);
  }
};

export const deleteAdmin = async (req, res) => {
  try {
    const admins = req.body;
    const errors = { noAdminError: String };
    for (var i = 0; i < admins.length; i++) {
      var admin = admins[i];

      await Admin.findOneAndDelete({ _id: admin });
    }
    res.status(200).json({ message: "Admin Deleted" });
  } catch (error) {
    const errors = { backendError: String };
    errors.backendError = error;
    res.status(500).json(errors);
  }
};
export const deleteFaculty = async (req, res) => {
  try {
    const faculties = req.body;
    const errors = { noFacultyError: String };
    for (var i = 0; i < faculties.length; i++) {
      var faculty = faculties[i];

      await Faculty.findOneAndDelete({ _id: faculty });
    }
    res.status(200).json({ message: "Faculty Deleted" });
  } catch (error) {
    const errors = { backendError: String };
    errors.backendError = error;
    res.status(500).json(errors);
  }
};

export const deleteCourse = async (req, res) => {
  try {
    const { course } = req.body;

    await Course.findOneAndDelete({ course });

    res.status(200).json({ message: "Course Deleted" });
  } catch (error) {
    const errors = { backendError: String };
    errors.backendError = error;
    res.status(500).json(errors);
  }
};

export const getAllFaculty = async (req, res) => {
  try {
    const faculties = await Faculty.find();
    res.status(200).json(faculties);
  } catch (error) {
    console.log("Backend Error", error);
  }
};

export const getAllAdmin = async (req, res) => {
  try {
    const admins = await Admin.find();
    res.status(200).json(admins);
  } catch (error) {
    console.log("Backend Error", error);
  }
};

export const getAllCourse = async (req, res) => {
  try {
    const courses = await Course.find();
    res.status(200).json(courses);
  } catch (error) {
    console.log("Backend Error", error);
  }
};
