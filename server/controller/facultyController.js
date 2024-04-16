import Faculty from "../models/faculty.js";
import Student from "../models/student.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";

export const facultyLogin = async (req, res) => {
  const { email, password } = req.body;
  const errors = { emailError: String, passwordError: String };
  try {
    const existingFaculty = await Faculty.findOne({ email });
    if (!existingFaculty) {
      errors.emailError = "Faculty doesn't exist.";
      return res.status(404).json(errors);
    }
    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingFaculty.password
    );
    if (!isPasswordCorrect) {
      errors.passwordError = "Invalid Credentials";
      return res.status(404).json(errors);
    }

    const token = jwt.sign(
      {
        email: existingFaculty.email,
        id: existingFaculty._id,
      },
      process.env.JWT_SECRET,
      { expiresIn: "24h" }
    );

    res.status(200).json({ result: existingFaculty, token: token });
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

    const faculty = await Faculty.findOne({ email });
    let hashedPassword;
    hashedPassword = await bcrypt.hash(newPassword, 10);
    faculty.password = hashedPassword;
    await faculty.save();
    if (faculty.passwordUpdated === false) {
      faculty.passwordUpdated = true;
      await faculty.save();
    }

    res.status(200).json({
      success: true,
      message: "Password updated successfully",
      response: faculty,
    });
  } catch (error) {
    const errors = { backendError: String };
    errors.backendError = error;
    res.status(500).json(errors);
  }
};

export const updateFaculty = async (req, res) => {
  try {
    const { name, course, contactNumber, email, designation } = req.body;
    const updatedFaculty = await Faculty.findOne({ email });
    if (name) {
      updatedFaculty.name = name;
      await updatedFaculty.save();
    }
    if (course) {
      updatedFaculty.course = course;
      await updatedFaculty.save();
    }
    if (contactNumber) {
      updatedFaculty.contactNumber = contactNumber;
      await updatedFaculty.save();
    }
    if (designation) {
      updatedFaculty.designation = designation;
      await updatedFaculty.save();
    }
    res.status(200).json(updatedFaculty);
  } catch (error) {
    const errors = { backendError: String };
    errors.backendError = error;
    res.status(500).json(errors);
  }
};

export const addStudent = async (req, res) => {
  try {
    const {
      name,
      course,
      gender,
      email,
      contact_number,
      father_name,
      year,
      semester,
      university_roll_no,
      university_enrollment_no,
      college_id,
    } = req.body;

    const errors = { studentError: String };
    const existingStudent = await Student.findOne({
      $or: [
        { email: email },
        { college_id: college_id },
        { university_roll_no: university_roll_no },
        { university_enrollment_no: university_enrollment_no },
        { contact_number: contact_number },
      ],
    });

    if (existingStudent) {
      errors.studentError = "Student already exists";
      return res.status(400).json(errors);
    } else if (college_id.length != 7) {
      return res.status(400).json({ message: "Invalid College ID" });
    } else if (university_roll_no.length != 12) {
      return res.status(400).json({ message: "Invalid University Rollno" });
    } else if (university_enrollment_no.length != 12) {
      return res
        .status(400)
        .json({ message: "Invalid University Enrollment Number" });
    } else if (contact_number.length != 10) {
      return res.status(400).json({ message: "Invalid Contact Number" });
    }
    let newPassword = "@Abc12345";
    let hashedPassword = await bcrypt.hash(newPassword, 10);
    var password_updated = false;

    const newStudent = await new Student({
      name,
      password: hashedPassword,
      course,
      gender,
      email,
      contact_number,
      father_name,
      year,
      semester,
      university_roll_no,
      university_enrollment_no,
      college_id,
      password_updated,
    });

    const subjects = await Subject.find({ course, year });
    if (subjects.length !== 0) {
      for (var i = 0; i < subjects.length; i++) {
        newStudent.subjects.push(subjects[i]._id);
      }
    }
    await newStudent.save();
    sendStudentEmails([
      {
        college_id: college_id,
        newPassword: newPassword,
        name: name,
        email: email,
      },
    ]);

    return res.status(200).json({
      success: true,
      message: "Student registerd successfully and email sent",
      response: newStudent,
    });
  } catch (error) {
    const errors = { backendError: String };
    errors.backendError = error;
    res.status(500).json(errors);
  }
};

export const getStudent = async (req, res) => {
  try {
    const { course, year, section } = req.body;
    const errors = { noStudentError: String };
    const students = await Student.find({ course, year, section });
    if (students.length === 0) {
      errors.noStudentError = "No Student Found";
      return res.status(404).json(errors);
    }

    res.status(200).json({ result: students });
  } catch (error) {
    const errors = { backendError: String };
    errors.backendError = error;
    res.status(500).json(errors);
  }
};

export const getAllStudent = async (req, res) => {
  try {
    const students = await Student.find();
    res.status(200).json(students);
  } catch (error) {
    console.log("Backend Error", error);
  }
};

export const deleteStudent = async (req, res) => {
  try {
    const students = req.body;
    for (var i = 0; i < students.length; i++) {
      var student = students[i];

      await Student.findOneAndDelete({ _id: student });
    }
    res.status(200).json({ message: "Student Deleted" });
  } catch (error) {
    const errors = { backendError: String };
    errors.backendError = error;
    res.status(500).json(errors);
  }
};

export const addSubject = async (req, res) => {
  try {
    const {
      subject_name,
      subject_code,
      course,
      year,
      semester,
      credits,
      external_marks,
      sessional_marks,
      total_marks,
      created_by,
    } = req.body;
    const existingSubject = await Subject.findOne({ subject_code });
    if (existingSubject) {
      return res
        .status(400)
        .json({ message: "Given Subject is already added" });
    }
    const newSubject = await new Subject({
      subject_name,
      subject_code,
      course,
      year,
      semester,
      credits,
      external_marks,
      sessional_marks,
      total_marks,
      created_by,
    });
    await newSubject.save();
    const students = await Student.find({
      course: course,
      year: year,
      semester: semester,
    });
    if (students.length !== 0) {
      for (var i = 0; i < students.length; i++) {
        students[i].subjects.push(newSubject._id);
        await students[i].save();
      }
    }
    return res.status(200).json({
      success: true,
      message: "Subject added successfully",
      response: newSubject,
    });
  } catch (error) {
    const errors = { backendError: String };
    errors.backendError = error;
    res.status(500).json(errors);
  }
};

export const getSubject = async (req, res) => {
  try {
    const { course, year, semester } = req.body;

    if (!req.userId) return res.json({ message: "Unauthenticated" });
    const errors = { noSubjectError: String };

    const subjects = await Subject.find({ course, year, semester });
    if (subjects.length === 0) {
      errors.noSubjectError = "No Subject Found";
      return res.status(404).json(errors);
    }
    res.status(200).json({ result: subjects });
  } catch (error) {
    const errors = { backendError: String };
    errors.backendError = error;
    res.status(500).json(errors);
  }
};

export const deleteSubject = async (req, res) => {
  try {
    const subjectIds = req.body;
    if (!Array.isArray(subjectIds) || subjectIds.length === 0) {
      return res
        .status(400)
        .json({ message: "No subjects provided for deletion." });
    }
    const result = await Subject.deleteMany({ _id: { $in: subjectIds } });
    if (result.deletedCount === 0) {
      return res
        .status(404)
        .json({ message: "No subjects found with the provided IDs." });
    }
    res.status(200).json({ message: "Subjects deleted successfully." });
  } catch (error) {
    console.error("Backend Error:", error);
    res
      .status(500)
      .json({ message: "Internal Server Error", error: error.message });
  }
};

export const getAllSubject = async (req, res) => {
  try {
    const subjects = await Subject.find();
    res.status(200).json({ success: true, data: subjects });
  } catch (error) {
    console.error("Backend Error", error);
    res.status(500).json({ success: false, message: "Internal Server Error" });
  }
};
