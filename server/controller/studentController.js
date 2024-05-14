import Student from "../models/student.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

import Student from "../models/student.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

export const studentLogin = async (req, res) => {
  const { college_id, password } = req.body;

  try {
    const existingStudent = await Student.findOne({ college_id });
    if (
      !existingStudent ||
      !(await bcrypt.compare(password, existingStudent.password))
    ) {
      // Generic message to avoid username enumeration
      return res
        .status(401)
        .json({ message: "Invalid credentials, please try again." });
    }

    const token = jwt.sign(
      { college_id: existingStudent.college_id, id: existingStudent._id },
      process.env.JWT_SECRET, // Ensure your environment variable is properly set
      { expiresIn: "1h" } // Token expiration set to 1 hour
    );

    res.status(200).json({ result: existingStudent, token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const updatedPassword = async (req, res) => {
  try {
    const { newPassword, confirmPassword, email } = req.body;
    if (newPassword !== confirmPassword) {
      return res.status(400).json({
        mismatchError: "Your password and confirmation password do not match.",
      });
    }

    const student = await Student.findOne({ email });
    if (!student) {
      return res.status(404).json({ message: "Student not found." });
    }

    // Optionally, add password strength validation here

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    student.password = hashedPassword;
    student.passwordUpdated = true; // Assuming you want to set this regardless of its previous value
    await student.save();

    // Consider what information needs to be sent back. For security, avoid sending sensitive data.
    res.status(200).json({
      success: true,
      message: "Password updated successfully",
      // Only send back necessary information
      student: {
        id: student._id,
        email: student.email,
        passwordUpdated: student.passwordUpdated,
      },
    });
  } catch (error) {
    console.error(error); // Log the error for server-side inspection.
    res
      .status(500)
      .json({ message: "An error occurred while updating the password." });
  }
};

export const updateStudent = async (req, res) => {
  try {
    const {
      name,
      course,
      contactNumber,
      email,
      batch,
      section,
      year,
      fatherName,
      motherName,
      fatherContactNumber,
    } = req.body;

    const updatedStudent = await Student.findOneAndUpdate({ email });
    if (name) {
      updatedStudent.name = name;
      await updatedStudent.save();
    }
    if (course) {
      updatedStudent.course = course;
      await updatedStudent.save();
    }
    if (contactNumber) {
      updatedStudent.contactNumber = contactNumber;
      await updatedStudent.save();
    }
    if (batch) {
      updatedStudent.batch = batch;
      await updatedStudent.save();
    }
    if (section) {
      updatedStudent.section = section;
      await updatedStudent.save();
    }
    if (year) {
      updatedStudent.year = year;
      await updatedStudent.save();
    }
    if (motherName) {
      updatedStudent.motherName = motherName;
      await updatedStudent.save();
    }
    if (fatherName) {
      updatedStudent.fatherName = fatherName;
      await updatedStudent.save();
    }
    if (fatherContactNumber) {
      updatedStudent.fatherContactNumber = fatherContactNumber;
      await updatedStudent.save();
    }
    res.status(200).json(updatedStudent);
  } catch (error) {
    res.status(500).json(error);
  }
};
