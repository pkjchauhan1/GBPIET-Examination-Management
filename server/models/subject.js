import mongoose from "mongoose";
const { Schema } = mongoose;

const subjectSchema = new Schema({
  subjectName: {
    type: String,
    required: true,
    trim: true,
  },
  subjectCode: {
    type: String,
    required: true,
    index: true,
  },
  course: {
    type: String,
    required: true,
    index: true,
  },
  year: {
    type: String,
    required: true,
  },
  semester: {
    type: Number,
    required: true,
    enum: [1, 2],
  },
  totalLectures: {
    type: Number,
    default: 15,
    min: 0, //Ensure non-nagitive values
  },
  credits: {
    type: Number,
    required: true,
    min: 1,
  },
  externalMarks: {
    type: Number,
    required: true,
  },
  sessionalMarks: {
    type: Number,
    required: true,
  },
  totalMarks: {
    type: Number,
    required: true,
  },
  grade: {
    type: String,
    required: true,
    enum: ["A", "B", "C", "D", "F"],
  },
  gradePoint: {
    type: Number,
    required: true,
  },
});

export default mongoose.model("subject", subjectSchema);
